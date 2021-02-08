import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';
import CreateCity from './Modal/CreateCity';

class City extends Component { 

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
        regionDDLGrid   :   [],
        regionListDDL   :   [],
        provinceListDDL :   [],
        provinceDDLGrid :   [],
        cityListGrid    :   [],
        cityListDDL     :   [],
        
        regionId        :   "",
        regionName      :   "",
        provinceId      :   "",
        cityName        :   ""
    }

    componentDidMount(){
        this.setState({isloading:true})
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetProvinceDDL()
        this.GetRegion()
        this.GetProvince()
        sleep(1000).then(() => {this.GetCity()}) 
        this.GetCityFilter()
        sleep(1000).then(() => {this.setState({isLoading:false})})  
    }
    handleModalShow = (e) =>{
        this.setState({openModal:true})
        let obj = {}
        this.child.initialize(obj)
    }
    handleModalClose = (e) =>{
        this.setState({isloading:true})
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.GetProvinceDDL()
        this.GetRegion()
        this.GetProvince()
        sleep(1000).then(() => {this.GetCity()}) 
        this.GetCityFilter()
        sleep(1000).then(() => {
        this.setState({isLoading:false,openModal:false})})
    }
    GetRegion() {
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  params)
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
            this.setState({ provinceListDDL : data.provinces });
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
    GetProvinceDDL() {
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
            if(data.status==="1"){
                let province = []
                data.provinces.map(function(itm){
                    province.push({
                            "value" : itm.id,
                            "label": itm.name
                        })
                })
                this.setState({provinceDDLGrid:province})
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
    
    GetCityFilter() {
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "RegionId": this.state.regionId,
            "ProvinceId": this.state.provinceId
        };

         axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities",  params)
        .then(res => {
            const data = res.data;
            this.setState({ cityListDDL: data.cities });
            
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
    GetCity() {
        this.setState({isloading:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "RegionId": this.state.regionId,
            "ProvinceId": this.state.provinceId,
            "Name":this.state.cityName
        };

         axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities",  params)
        .then(res => {
            const data = res.data;
            
            this.setState({ cityListGrid: data.cities,isloading:false });
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
    handleSearchClick = (e) =>{
        this.GetCity()
    }
    handleChangeRegion = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length===0)
        {
            this.state.regionId = ""
            this.state.regionName = ""
            this.GetProvince()
            this.GetCityFilter()
            return
        }
        this.state.regionId = e[0].id
        this.state.regionName = e[0].name
        this.GetProvince()
        this.GetCityFilter()
    }
    handleChangeProvince = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length===0)
        {
            this.state.provinceId = ""
            this.GetCityFilter()
            return
        }
        this.state.provinceId = e[0].id
        this.GetCityFilter()
    }
    handleChangeCity = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length===0)
        {
            this.state.cityName = ""
            return
        }
        this.state.cityName = e[0].name
    }
    GridDataModified(oldValue, newValue,cityid, column) {
        let isDisable = true
        this.state.cityListGrid.map(function(item,i){
            if(item.id===cityid)
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
                    
                    if(row.regionId!='' && row.regionId!=null)
                    return this.state.regionDDLGrid.find(x => x.value == cell).label;
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.regionDDLGrid.sort((a, b) => (a.label > b.label) ? 1 : -1)
                }
            },
            {
                dataField: 'provinceId',
                text: 'Province',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left',width:'20%'},
                //sort:true,
                editable:true,
                formatter: (cell, row) => {
                    if(row.provinceId!=='' && row.provinceId!==null){
                        if(this.state.provinceDDLGrid.filter(x => x.value === cell).length==0)
                        return ""
                    else
                        return this.state.provinceDDLGrid.find(x => x.value === cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.provinceDDLGrid.sort((a, b) => (a.label > b.label) ? 1 : -1)
                }
            },
            {
                dataField: 'name',
                text: 'City',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'65%' }},
                style:{textAlign:'left',width:'65%'},
                sort:true
            }
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let isDisable = true
                this.state.cityListGrid.map(function(item,i){
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
                    <Card.Header>COMMON MAINTENANCE >> CITIES</Card.Header>
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
                                        onChange={ this.handleChangeRegion }
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
                                        onChange={ this.handleChangeProvince }
                                        options={this.state.provinceListDDL}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    CITY
                                </Form.Label>
                                <Col sm="11">
                                    <Typeahead                                  
                                        labelKey='name'
                                        id="basic-examplex"
                                        onChange={this.handleChangeCity}
                                        options={this.state.cityListDDL}
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
                            <div className="mt-1">
                                <Card.Header>LIST OF CITIES</Card.Header>
                                    <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.cityListGrid }
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
                                <ButtonToolbar>
                                    <Button variant="success" className="ml-auto noser-button-mr1" disabled={this.state.disableBtn} onClick = { this.handleSaveClick }>Save</Button>
                                    <Button variant="primary" className="noser-button" onClick = { this.handleModalShow }>CREATE</Button>
                                </ButtonToolbar>
                            </div>
                        </Form>
                        
                    </Card.Body>
                </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                <CreateCity
                    show={this.state.openModal}
                    onHide={this.handleModalClose}
                    onRefModal={ref => (this.child = ref)}
                />
                </div>
        )
    }

}

export  default City