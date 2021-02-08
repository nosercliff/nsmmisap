import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import CreateLocation from './Modal/CreateLocation';

class Location extends Component {
    state = {
        userinfo        :   [],
        isloading       :   false,
        isshow          :   false,
        alerttype       :   "",
        message         :   "",
        color           :   "",
        fade            :   true,
        disableBtn      :   true,
        openModal       :   false,
        cityListDDL     :   [],
        cityListDDLGrid :   [],
        clientList      :   [],
        locationListDDL :   [],
        locationListGrid:   [],

        clientName      :   "",
        locationName    :   "",
    }

    componentDidMount() {
            const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
             this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
            this.GetClients();
            this.GetCity();
            this.GetLocations();
            this.GetLocationDDL()
            //this.getRegion();
            //this.getProvince();
            sleep(1000).then(() => {
                this.setState({isloading:false})
              })
    }
    handleModalShow = (e) =>{
        this.setState({openModal:true})
        let obj = {}
        this.child.initialize(obj)
    }
    handleModalClose = (e) =>{
        this.setState({isloading:true})
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.GetClients();
        this.GetCity();
        this.GetLocations();
        this.GetLocationDDL()
        sleep(1000).then(() => {
        this.setState({isLoading:false,openModal:false})})
    }
    GetClients(){
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
                .then(res => {
                    const data = res.data;
                    this.setState({clientList : data.clients})
                })
    }
    GetCity(){
        const cityParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedCity,
            "ProvinceName":this.state.selectedProvince
        }

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities", cityParams)
            .then(res => {
                const data = res.data;
                let cities = []
                data.cities.map(function(itm){
                    cities.push({
                        "value":itm.id,
                        "label":itm.name
                    })
                })
                this.setState({cityListDDLGrid:cities})
            })
    }
    GetLocations(){
        this.setState({isloading:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.clientName,
            "Name": this.state.locationName
        };
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", params)
            .then(res => {
                const data = res.data;
                this.setState({locationListGrid: data.locations,isloading:false});
                if(data.status=="0")
                {
                    this.setState(
                        {
                            isshow:true,
                            color:"error",
                            message:data.message ,
                            fade:true,
                            isloading:false
                        });
                }
             })
             .catch(error=>{
                this.setState(
                {
                    isloading:false,
                    alerttype:"Error! ",
                    show:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                })
            })
    }
    GetLocationDDL(){
        const params = {
            "IpAddress":"0.0.0.0",
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.clientName,
        }

        axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", params)
            .then(res => {
                const data = res.data;
                this.setState({locationListDDL : data.locations})  
            })
            .catch(error=>{
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade        :   true,
                })
            })
    }
    handleChangeClient = (e) => {
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        this.state.clientName = e.length === 0 ? "" : e[0].name
        this.GetLocationDDL()
    }
    handleChangeLocation = (e) => {
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        this.state.locationName = e.length === 0 ? "" : e[0].name
    }
    handleSearchClick = event => {
        this.setState({isloading:true});
        this.GetLocations()
    }
    handleSaveClick = event => {
        this.setState({isloading:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Locations":this.state.locationListGrid.filter(x=>x.isModified==="1")
        };
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/EditClientLocation", params)
             .then(res => {
                const data = res.data;
                if(data.status=="1"){
                    this.GetLocations()
                }
                this.setState({
                    isloading   :   false,
                    alerttype   :   data.status=="1" ? "Success!" : "Error!",
                    isshow      :   true,
                    color       :   data.status=="1" ? "success" : "danger",
                    message     :   data.message,
                    fade        :   true,
                    disableBtn:true
                });      
             })
             .catch(error=>{
                this.setState(
                { 
                    isloading:false,
                    alerttype:"Error! ", 
                    show:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                }) 
            })    
    }
    GridDataModified(oldValue, newValue, locationid, column) {
        let isDisable = true
        this.state.locationListGrid.map(function(item,i){
            if(item.id===locationid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            if(item.isModified=="1")
                isDisable = false
        })
        this.setState({disableBtn:isDisable})
    }
    render() {
        const cols = [
            {
                dataField: 'clientName',
                text: 'Client',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'40%' }},
                style:{textAlign:'left',width:'40%'}
            },
            {
                dataField: 'cityId',
                text: 'City',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left',width:'20%'},
                formatter: (cell, row) => {
                    if(row.cityId!=='' && row.cityId!==null){
                        if(this.state.cityListDDLGrid.filter(x => x.value === cell).length==0)
                        return ""
                    else
                        return this.state.cityListDDLGrid.find(x => x.value === cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.cityListDDLGrid.sort((a, b) => (a.label > b.label) ? 1 : -1)
                }
            },
            {
                dataField: 'name',
                text: 'Location',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'40%' }},
                style:{textAlign:'left',width:'40%'}
                
            },
            
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let isDisable = true
                this.state.locationListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    if(item.isDeleted=="1")
                        isDisable=false
                })
                this.setState({disableBtn:isDisable})
            }
        };
        return(
            <div>
            <Banner />
            <Container className="themed-container" fluid={true}>
                <Card className="mt-5">
                    <Card.Header>COMMON MAINTENANCE >> CLIENT LOCATIONS</Card.Header>
                    <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                    </Form.Label>
                                    <Col sm="11">
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleChangeClient}
                                            options={this.state.clientList}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        LOCATION
                                    </Form.Label>
                                    <Col sm="11">
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleChangeLocation}
                                            options={this.state.locationListDDL}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto noser-button"  onClick={ this.handleSearchClick }>Search</Button>&nbsp;
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>

                            <div className="mt-1">
                                <Card.Header>List Of Client Locations</Card.Header>
                                <BootstrapTable
                                    keyField = "id"
                                    data = { this.state.locationListGrid }
                                    columns = { cols }
                                    selectRow = { selectRow }
                                    cellEdit = { cellEditFactory({ 
                                            mode: 'dbclick', 
                                            blurToSave: true,
                                            afterSaveCell: (oldValue, newValue, row, column) => { 
                                                this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                            }
                                        })
                                    }
                                    //rowEvents={ rowEvents }
                                    striped
                                    hover
                                    condensed
                                    loading={true}
                                    wrapperClasses="table-responsive"
                                    pagination={ paginationFactory({sizePerPageRenderer})}
                                    noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> } 
                                />
                                <ButtonToolbar sm={12}>
                                    <Button variant="success" className="ml-auto noser-button-mr1" disabled={this.state.disableBtn} onClick = { this.handleSaveClick }>Save</Button>
                                    <Button variant="primary" className="noser-button" onClick = { this.handleModalShow }>CREATE</Button>
                                </ButtonToolbar>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <NoserLoading show={this.state.isloading} />
            <CreateLocation
                    show={this.state.openModal}
                    onHide={this.handleModalClose}
                    onRefModal={ref => (this.child = ref)}
                />
            </div>
        )
    }

}
export  default Location
            

  
