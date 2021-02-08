import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fade            :   true, 
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",

            trainingTableList           :   [],
            clientAutocomplete          :   [],
            positionAutocomplete        :   [],
            trainingAutocomplete        :   [],
            trainingTypeAutocomplete    :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetClient()
        this.GetPosition()
    }

    GetClient() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        };

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList",  clientParams)
        .then(res => {
            const data = res.data;
            //////console.log("Get Client List");
            //////console.log(data);
            this.setState({
                clientAutocomplete  :   data.clients,
                isloading   :   false
            });
        })
        .catch(error=>{
            this.setState(  {
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade            :   true
            })
        })
    }

    onChangeClient = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            this.state.selectedClientName    =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedClientName     =   e[0].name
        this.setState({
            isshow:false,
        })
        this.GetTrainingTypeName()

    }

    GetPosition() {
        this.setState({isloading:true})
        const positionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId":"",
            "DepartmentId":"",
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionParams)
        .then(res => {
            const data = res.data;
            //////console.log("Get Position Name");
            //////console.log(data);
            this.setState({ positionAutocomplete  : data.positions, isloading:false });
        })
        
    }
    
    onChangePosition = (e) => {
        if(e.length == 0) {
            this.state.selectedPositionId     =   ""
            this.state.selectedPositionName    =   ""
            return
        }
        this.state.selectedPositionId     =   e[0].id
        this.state.selectedPositionName     =   e[0].name
        this.setState({
            isshow:false,
        })
    }

    GetTrainingTypeName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.selectedClientId,
            "Name"          :   ""
        };

        //console.log("Search Params")
        //console.log(searchParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainingTypes",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 //console.log("GetTrainingTypes")
                 //console.log(data)
                 this.setState({ trainingTypeAutocomplete     :   data.trainingTypes, isloading : false })
                 if(data.status=="0"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                
                }
                    
            })
            .catch(error=>{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade            :   true
                })
            })
        
    }
    
    onChangeTrainingType = (e) => {
        if(e.length == 0) {
            this.state.selectedTrainingTypeId     =   ""
            return
        }
        this.state.selectedTrainingTypeId     =   e[0].id
        this.setState({
            isshow:false,
        })
        this.GetTrainingName()
    }


    GetTrainingName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.selectedClientId,
            "Name"              :   "",
            "TrainingTypeId"    :   this.state.selectedTrainingTypeId,
            "PositionId"        :   this.state.selectedPositionId,
        };

        console.log("Search Params")

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainings",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainings")
                 console.log(data)
                 this.setState({ trainingAutocomplete     :   data.trainings, isloading : false })
                 if(data.status=="0"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                
                }
                    
            })
            .catch(error=>{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade            :   true
                })
            })
        
    }
    
    onChangeTraining = (e) => {
        if(e.length == 0) {
            this.state.selectedTrainingName     =   ""
            return
        }
        this.state.selectedTrainingName    =   e[0].name
        this.setState({
            isshow:false,
        })
    }

    handleSearchClick = () => {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.selectedClientId,
            "Name"              :   this.state.selectedTrainingName,
            "TrainingTypeId"    :   this.state.selectedTrainingTypeId,
            "PositionId"        :   this.state.selectedPositionId,
        };

        console.log("Search Params")

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainings",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainings")
                 console.log(data)
                 this.setState({ trainingTableList     :   data.trainings, isloading : false })
                 if(data.status=="0"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                
                }
                    
            })
            .catch(error=>{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade            :   true
                })
            })
    }

    GridDataModified(oldValue, newValue, id, column) {
        //////console.log(id)
        this.state.trainingTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        
        const trainingColumn = [
            {
                dataField: 'name',
                text: 'Training',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField   : 'trainingType',
                text        : 'Type',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField   : 'client',
                text        : 'Client',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.trainingTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };
    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE >> TRAINING</Card.Header>
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
                                                onChange={this.onChangeClient}
                                                options={this.state.clientAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            POSITION
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePosition}
                                                options={this.state.positionAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING TYPE
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTrainingType}
                                                options={this.state.trainingTypeAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING NAME
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTraining}
                                                options={this.state.trainingAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/trainingcreate" >
                                            <Button  variant="success">
                                                Create
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">List Training</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.trainingTableList }
                                            columns = { trainingColumn }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ rowEvents }
                                            selectRow = { selectRow }

                                        />
                                    </div>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleUpdateClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/home">
                                            <Button variant="danger" href="/home" style={{minWidth:'60px'}}>
                                                Close
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                       
                    </Container>
                    <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default Training 
