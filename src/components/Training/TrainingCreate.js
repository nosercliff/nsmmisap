import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class TrainingCreate extends Component {
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

            trainingName                :   "",
            clientAutocomplete          :   [],
            positionAutocomplete        :   [],
            trainingTypeAutocomplete    :   [],

            clientTableList     :   [],
            clientIdTableList   :   [],
            positionTableList   :   [],
            positionIdTableList :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetTrainingTypeName()
        this.GetClient()
        this.GetPosition()
    }

    GetTrainingTypeName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   ""
        };

        console.log("Search Params")
        console.log(searchParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainingTypes",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainingTypes")
                 console.log(data)
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
            ////console.log("Get Client List");
            ////console.log(data);
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

    }

    GetPosition() {
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
            ////console.log("Get Position Name");
            ////console.log(data);
            this.setState({ positionAutocomplete  : data.positions });
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

    onChangeTrainingName = (e) => {
        this.setState({
            trainingName	:  e.target.value.toUpperCase() ,
            isshow:false,
        })
    }

    GetTrainingTypeName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   ""
        };

        console.log("Search Params")
        console.log(searchParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainingTypes",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainingTypes")
                 console.log(data)
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

    handleSaveClick = event => {
        this.setState({isloading:true})

        const saveParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.userinfo.clientId,
            "TrainingTypeId"    :   this.state.selectedTrainingTypeId,
            "Name"              :   this.state.trainingName,
            "trainingClients"   :   this.state.clientIdTableList,
            "trainingPositions" :   this.state.positionIdTableList,
        };

        console.log("Save Params")
        console.log(saveParams)

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddTraining",  saveParams
            )
            .then(res => {
            const data = res.data;
            console.log("Save Results")
            console.log(data)
            if(data.status=="1"){
            this.setState({
                    isloading   :   false,
                    alerttype   :   "Success!",
                    isshow      :   true,
                    color       :   "success",
                    message     :   data.message,
                    fade        :   true
                });
            
            }
            else {
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

    handleAddClient = () => {
        let clientIdListTable=this.state.clientIdTableList
        const clientIdObj = {
            "ClientId"  :   this.state.selectedClientId,
        }
        clientIdListTable.push(clientIdObj)
        this.setState({clientIdTableList: clientIdListTable})

        let clientListTable=this.state.clientTableList
        const clientObj = {
            "client"    :this.state.selectedClientName,
        }
        clientListTable.push(clientObj)
        this.setState({clientTableList: clientListTable})
    }

    handleAddPosition = () => {

        let positionIdListTable=this.state.positionIdTableList
        const positionIdObj = {
            "PositionId"    :   this.state.selectedPositionId,
        }
        positionIdListTable.push(positionIdObj)
        this.setState({positionIdTableList: positionIdListTable})

        let positionListTable=this.state.positionTableList
        const positionObj = {
            "position"      :this.state.selectedPositionName,
        }
        positionListTable.push(positionObj)
        this.setState({positionTableList: positionListTable})
    }

    render() {

        const clientColumn = [
            {
                dataField: 'client',
                text: 'Client',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const clientSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.clientTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const clientRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };


        const positionColumn = [
            {
                dataField: 'position',
                text: 'Position',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const positionSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.positionTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const positionRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };

    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE >> TRAINING (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
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
                                            <Form.Control 
                                                ref="trainingName"
                                                name="trainingName"
                                                value={this.state.trainingName}
                                                onChange={this.onChangeTrainingName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="1">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="SPECIFIC CLIENT" 
                                                checked={this.state.specificClient}
                                                onChange={this.onChangeSpecificClient}
                                                style={{fontWeight : "bold"}}
                                            />
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            CLIENT
                                        </Form.Label>
                                        <Col sm="9">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeClient}
                                                options={this.state.clientAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="1">
                                            <Button variant="success" onClick = { this.handleAddClient }>ADD CLIENT</Button>
                                        </Col>
                                    </Form.Group>

                                    <Card.Header className="mt-3">List of Client</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.clientTableList }
                                            columns = { clientColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.ClientGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ clientRowEvents }
                                            selectRow = { clientSelectRow }

                                        />
                                    </div>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="1">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="SPECIFIC POSITION" 
                                                name="specificPosition"
                                                checked={this.state.specificPosition}
                                                onChange={this.onChangeSpecificPosition}
                                                style={{fontWeight : "bold"}}
                                            />
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            POSITION
                                        </Form.Label>
                                        <Col sm="9">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePosition}
                                                options={this.state.positionAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="1">
                                            <Button variant="success" onClick = { this.handleAddPosition }>ADD POSITION</Button>
                                        </Col>
                                    </Form.Group>

                                    <Card.Header className="mt-3">List of Position</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.positionTableList }
                                            columns = { positionColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.PositionGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ positionRowEvents }
                                            selectRow = { positionSelectRow }

                                        />
                                    </div>
                                        
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button  href="/trainings" variant="danger">Back</Button>
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

export  default TrainingCreate 
