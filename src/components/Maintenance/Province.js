import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';
import CreateProvince from './Modal/CreateProvince';

class Province extends Component {
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
        provinceListGrid:   [],
        provinceListDDL :   [],
        regionListDDL   :   [],
        regionDDLGrid   :   [],
        regionName      :   "",
        provinceName    :   ""
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetRegion()
        this.GetProvince()
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }
    handleModalShow = (e) =>{
        this.setState({openModal:true})
        let obj = {}
        this.child.initialize(obj)
    }
    handleModalClose = (e) =>{
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.GetRegion()
        this.GetProvince()
        sleep(1000).then(() => {
        this.setState({isLoading:false,openModal:false})})
    }
    GetRegion() {
        const regionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  regionParams)
        .then(res => {
            const data = res.data;
            this.setState({ regionListDDL:data.regions});
            let regions = []
            data.regions.map(function(itm){
                regions.push({
                    "value" : itm.id,
                    "label": itm.name
                })
            })
            this.state.regionDDLGrid = regions
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
    GetProvince() {
        const provinceParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Region": this.state.regionName
        };

         axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  provinceParams)
        .then(res => {
            const data = res.data;
            this.setState({ provinceListGrid: data.provinces,provinceListDDL : data.provinces });
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
    GetProvinceByRegion(regionName) {
        this.setState({isloading:true});
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Region": this.state.regionName
        };

         axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  params)
        .then(res => {
            const data = res.data;
            this.setState({ provinceListDDL : data.provinces,isloading:false });
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
    handleChangeRegion = (e) => {
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        this.state.regionName = e.length===0 ? "" : e[0].name
        this.GetProvinceByRegion()
    }
    handleChangeProvince = (e) => {
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        this.state.provinceName = e.length===0 ? "" :e[0].name
    }
    handleSearchClick = event => {
        this.setState({isloading:true,disableBtn:true})
        const provinceParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Region":this.state.regionName,
            "Name":this.state.provinceName
         };
         
         axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  provinceParams
            )
            .then(res => {
                const data = res.data
                if(data.status=="1"){
                    this.setState({isloading:false,provinceListGrid:data.provinces});
                }
                else{
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true,
                        provinceListGrid: []
                    });
                }
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

    handleSaveClick = event => {
        this.setState({isloading:true,disableBtn:true})
        
       const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Provinces":this.state.provinceListGrid.filter(x=>x.isModified=="1")
        };
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditProvince", params)
            .then(res => {
                const data = res.data;
                if(data.status=="1"){
                    this.GetProvince()
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
    GridDataModified(oldValue, newValue,provinceid, column) {
        let isDisable = true
        this.state.provinceListGrid.map(function(item,i){
            if(item.id===provinceid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            if(item.isModified=="1")
                isDisable = false
        })
        this.setState({disableBtn:isDisable})
    }
    render() {

        const cols = [
            {
                dataField: 'regionId',
                text: 'Region',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'15%' }},
                style:{textAlign:'left',width:'15%'},
                //sort:true,
                editable:true,
                formatter: (cell, row) => {
                    if(row.regionId!=='' && row.regionId!==null){
                        if(this.state.regionDDLGrid.filter(x => x.value === cell).length==0)
                        return ""
                    else
                        return this.state.regionDDLGrid.find(x => x.value === cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.regionDDLGrid.sort((a, b) => (a.label > b.label) ? 1 : -1)
                }
            },
            {
                dataField: 'name',
                text: 'Province',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'85%' }},
                style:{textAlign:'left',width:'85%'},
                sort:true
            }
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let isDisable = true
                this.state.provinceListGrid.map(function(item,i){
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
                        <Card.Header>COMMON MAINTENANCE >> PROVINCES</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        REGION
                                    </Form.Label>
                                    <Col sm="11">
                                        <Typeahead 
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleChangeRegion}
                                            options={this.state.regionListDDL}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        PROVINCE
                                    </Form.Label>
                                    <Col sm="11">
                                        <Typeahead                         
                                            labelKey='name'
                                            id="basic-example"
                                            onChange = { this.handleChangeProvince }
                                            options={this.state.provinceListDDL}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto noser-button" onClick = { this.handleSearchClick }>Search</Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <div className="mt-1">
                                <Card.Header>LIST OF PROVINCES</Card.Header>
                                <BootstrapTable
                                    keyField = "id"
                                    data = { this.state.provinceListGrid }
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
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                <CreateProvince
                    show={this.state.openModal}
                    onHide={this.handleModalClose}
                    onRefModal={ref => (this.child = ref)}
                />
            </div>
        )
    }

}

export  default Province