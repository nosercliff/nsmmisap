import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import CreateRegion from './Modal/CreateRegion';


class Region extends Component {
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
        regionListGrid  :   [],
        regionListDDL   :   [],
        selectedRegion  :   ""            
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetRegion()
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
        }
    handleModalShow = (e) =>{
        this.setState({openModal:true})
        let obj = {}
        this.child.initialize(obj)
    }
    handleModalClose = (e) =>{
        this.setState({openModal:false})
        this.GetRegion()
    }
    GetRegion() {
        this.setState({isloading:true,disableBtn:true});
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedRegion
        };
        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  params)
        .then(res => {
             const data = res.data
            if(data.status=="1"){
                this.setState({isloading:false,regionListDDL:data.regions,regionListGrid:data.regions});
            }
            else{
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   data.message,
                    fade        :   true,
                    regionListDDL:   [],
                    regionListGrid:   [],
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
    handleCoverChangeRegion = (e) => {
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length===0)
        {
            this.state.selectedRegion= ''
            return
        }
        this.state.selectedRegion = e[0].name
    }
    handleSearchClick = event => {
        this.setState({isloading:true,disableBtn:true});
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedRegion
        };
        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  params)
        .then(res => {
            const data = res.data
            if(data.status=="1"){
                this.setState({
                    isloading     :   false,
                    regionListGrid:   data.regions,
                });
            }
            else{
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   data.message,
                    fade        :   true,
                    regionListGrid: []
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
        this.setState({isloading:true,disableBtn:true});
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Regions":this.state.regionListGrid.filter(x=>x.isModified=="1")
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditRegion", params)
            .then(res => {
                const data = res.data;
                if(data.status=="1"){
                    this.GetRegion()
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
    
    GridDataModified(oldValue, newValue, regionid, column) {
        let isDisable = true
        this.state.regionListGrid.map(function(item,i) {
            if (item.id===regionid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            if(item.isModified=="1")
                isDisable = false
        })
        this.setState({disableBtn:isDisable})
    }

    render() {
        const cols = [
            {
                dataField: 'name',
                text: 'Region',
                editable: true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'100%' }},
                style:{textAlign:'left',width:'100%'},
                sort:true
            }
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let isDisable = true
                this.state.regionListGrid.map(function(item,i){
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

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
        }
    };

    return(
            <div>
                <Banner />
                    <Container className="themed-container" fluid={true}>
                        <Card className="mt-5">
                            <Card.Header>COMMON MAINTENANCE >> REGIONS</Card.Header>
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
                                                onChange={this.handleCoverChangeRegion}
                                                options={this.state.regionListDDL}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto noser-button" onClick={ this.handleSearchClick }>Search</Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <div className="mt-1">
                                    <Card.Header>LIST OF REGIONS</Card.Header>
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.regionListGrid }
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
                                            rowEvents={ rowEvents }
                                            striped
                                            hover
                                            condensed
                                            loading={true}
                                            wrapperClasses="table-responsive"
                                            pagination={ paginationFactory({sizePerPageRenderer})}
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                        />
                                        <ButtonToolbar sm={12}>
                                            <Button variant="success" className="ml-auto noser-button-mr1" disabled={this.state.disableBtn} onClick={this.handleSaveClick}>Save</Button>
                                            <Button variant="primary" className="noser-button" onClick={this.handleModalShow}>CREATE</Button>
                                        </ButtonToolbar>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                <NoserLoading show={this.state.isloading} />
                <CreateRegion 
                    show={this.state.openModal}
                    onHide={this.handleModalClose}
                    onRefModal={ref => (this.child = ref)}
                />
            </div> 
        )
    }

}

export  default Region 