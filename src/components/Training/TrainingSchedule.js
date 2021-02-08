import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class TrainingSchedule extends Component {
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

            clientAutocomplete                  :   [],
            positionAutocomplete                :   [],
            trainingAutocomplete                :   [],
            trainingScheduleTableList           :   [],

            dateFrom    :   "",
            dateTo      :   "",

            tblFacilitatedArrLst    :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetClient()
        this.GetPosition()
        this.GetTrainingName()
        this.GetFacilitator()
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
        this.GetTrainingName()
    }
    
    GetTrainingName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.selectedClientId,
            "Name"              :   "",
            "TrainingTypeId"    :   "",
            "PositionId"        :  this.state.selectedPositionId
        };

        console.log("Search Params")
        console.log(searchParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainings",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTraining")
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

    handleChangeDateFrom = date => {
        ////console.log(date)
        this.setState({
            dateFrom: date,
            isshow:false,
        })
    }

    handleChangeDateTo = date => {
        ////console.log(date)
        this.setState({
            dateTo: date,
            isshow:false,
        })
    }
    
    onChangeTraining = (e) => {
        if(e.length == 0) {
            this.state.selectedTrainingId     =   ""
            return
        }
        this.state.selectedTrainingId    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    handleSearchClick = () => {
        let dateFrom    =   moment(this.state.dateFrom).format('MM/DD/YYYY');
        let dateTo      =   moment(this.state.dateTo).format('MM/DD/YYYY');
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.selectedClientId,
            "PositionId"    :   this.state.selectedPositionId,
            "TrainingId"    :   this.state.selectedTrainingId,
            "FromDate"      :   dateFrom,
            "ToDate"        :   dateTo,
        };

        console.log("Search Params")

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Training/GetTrainingSchedules",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainingSchedules")
                 console.log(data)
                 this.setState({ trainingScheduleTableList     :   data.trainingSchedules, isloading : false })
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

    GetFacilitator(){
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetCoorEmployees", getParams)
        .then(res => {
            const data = res.data
            console.log("Coordinator List Autocomplete");
            console.log(data);
            /* this.setState({
                facilitatorAutocomplete  : data.employees,
                isloading:false
            })  */
            for (let i = 0; i < data.employees.length; i++) {
                const obj = {
                    value : data.employees[i]["id"],
                    label : data.employees[i]["employeeName"],
                };
                this.state.tblFacilitatedArrLst.push(obj);
            }
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


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.trainingScheduleTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        
        const trainingScheduleColumn = [
            {
                dataField: 'training',
                text: 'Training',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'date',
                text        : 'Date',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'time',
                text        : 'Time',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            /* {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'client',
                text        : 'Client',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            }, */
            {
                dataField   : 'venue',
                text        : 'Venue',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'facilitatorId',
                text        : 'Facilitator',
                headerStyle : () => {
                    return { width  : "20%" };
                },
                formatter: (cell, row) => {
                    if(row.facilitatorId!='' && row.facilitatorId!=null){
                        return this.state.tblFacilitatedArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblFacilitatedArrLst
                }
            },
            {
                dataField   : 'batchNo',
                text        : 'Batch No.',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'participantLimit',
                text        : 'Limit No. of Participants',
                headerStyle : () => {
                    return { width  : "10%" };
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
                            <Card.Header>TRAINING >> TRAINING SCHEDULE</Card.Header>
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
                                            TRAINING
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
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            DATE FROM
                                        </Form.Label>
                                        <Col sm="1">
                                            <DatePicker
                                                ref='dateFrom'
                                                selected={this.state.dateFrom}
                                                onChange={this.handleChangeDateFrom}
                                                minDate={this.minDate}
                                                value={this.props.dateFrom}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            DATE TO
                                        </Form.Label>
                                        <Col sm="1">
                                            <DatePicker
                                                ref='dateTo'
                                                selected={this.state.dateTo}
                                                onChange={this.handleChangeDateTo}
                                                minDate={this.minDate}
                                                value={this.props.dateTo}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/trainingschedulecreate" >
                                            <Button  variant="success">
                                                Create
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">List Training Schedule</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.trainingScheduleTableList }
                                            columns = { trainingScheduleColumn }
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

export  default TrainingSchedule 
