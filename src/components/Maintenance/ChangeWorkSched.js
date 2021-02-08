

import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab
} 
from '../../noser-hris-component';

const isshowSecond = false;
const str = isshowSecond ? 'HH:mm:ss' : 'HH:mm';

const Tonow = moment().hour(0).minute(0);
const Fromnow = moment().hour(0).minute(0);

class ChangeWorkSched extends Component {
        constructor(props) {
            super(props);
            this.minDate = new moment(props.minDate)
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            workList : [],
            startDate: new Date(),
            holidayData : [],
            getEmployeeList : [],
            moment: moment(),
            getWorkScheduleList: [],
            clientLocationList: [],
            permanentDate: new Date(),
            ScheduleDate: new Date(),
            StartTimevalue: '',
            TovalueDate: new Date(),
            EndTimevalue: '',
            ChangeWorkSchedList:[],
            newChangeWorkSchedList:[],
            getClient : [],
            selectedClientId: "",
            selectedGetEmployeeId:"",
            selectedLocationId:"",
            selectedWorkSchedId:""
        }
        this.handleChange = this.handleChange.bind(this);
    }
 
     /* state = {
        workList : [],
    };  */
    state = {
        date: new Date(), 
    }


    handleChangepermanentDate = date => {
        this.setState({
            permanentDate: date
        });

        //console.log("permanentDate")
        //console.log(this.formatDate(this.state.permanentDate))
    };

    handleChangeScheduleDate = date => {
        this.setState({
            ScheduleDate: date
        });

        //console.log("ScheduleDate")
        //console.log(this.formatDate(this.state.ScheduleDate))
    };

    /* handleChangeToValueDate = date => {
        this.setState({
            TovalueDate: date
        });

        //console.log("TovalueDate")
        //console.log(this.formatDate(this.state.TovalueDate))
    }; */


    /* onChangeStartTime = (StartTimevalue) => {
        //console.log("format");
        //console.log(StartTimevalue);
        this.state.StartTimevalue = StartTimevalue && StartTimevalue.format(str)
    }

    onChangeEndTime = (EndTimevalue) => {
        //console.log("format");
        //console.log(EndTimevalue);
        this.state.EndTimevalue = EndTimevalue && EndTimevalue.format(str)
    }
 */
    
    handleSearchClick =(e)=>{
        this.getChangeWorkSchedule();
    }


    handleAddClick = (e) => {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true,})
        let fromThisDate = moment(this.state.ScheduleDate).format('MM/DD/YYYY');
        //console.log("fromThisDate ");
        //console.log(fromThisDate);
        
        e.preventDefault()
        this.setState({isloading:true})
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedGetEmployeeId,
            "LocationId":this.state.selectedLocationId,
            "WorkScheduleId":this.state.selectedWorkSchedId,
            "ScheduleDate":fromThisDate,
            "Startime":"00:00",
            "EndTime":"00:00",
            /* "Startime":this.state.StartTimevalue,
            "EndTime":this.state.EndTimevalue */
        };

        //console.log(typeParams)

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Employee/AddChangeSchedule",  typeParams
            )
            .then(res => {
                const data = res.data;
                var alerttype = (data.status=="1") ? "success" : "danger"
                this.getChangeWorkSchedule();
                sleep(1000).then(() => {
                    this.setState({
                        isloading:false,
                        alerttype:"Success!",
                        isshow:true,
                        color:alerttype,
                        message:data.message ,
                        fade:true
                    })
                })
            })
            .catch(error=>{
            this.setState(
            {
                isloading:false,
                alerttype:"Error! ",
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })
        })

         /* //console.log("Tovalue");
        //console.log(this.state.Tovalue); */
    }

    formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
    }

      componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        //this.getChangeWorkSchedule();
      }

      getClient() {
        this.setState({isloading:true,})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
       }
       axios
           .post(
               AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
           )
           .then(res => {
               const data = res.data;
               console.log("GetClientList");
               console.log(data);
               this.setState({getClient: data.clients, isloading:false})
           })
   }

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        //console.log("Client selectedClientName " + this.state.selectedClientName );
        //console.log("Client selectedClientId " + this.state.selectedClientId );
        this.setState({isloading:true,})
        
        
        this.getEmployees();
        this.getWorkSchedule();
        this.getClientLocation();
    }

    getChangeWorkSchedule(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedGetEmployeeId,
            "LocationId":this.state.selectedLocationId,
            "ScheduleId":this.state.selectedWorkSchedId
    
        }
        console.log(getParams)
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetChangeSchedules", getParams)
        .then(res => {
            console.log("Get Change Work Schedule");
            console.log(res.data);
            this.setState({ChangeWorkSchedList : res.data.changeSchedules})
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alerttype:"Error! ", 
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })

    }

      getClientLocation(){
        this.setState({isloading:true,})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClientName,
            "City": "",
            "Province": "",
            "Region": ""
    
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
        .then(res => {
            //console.log("Client Location");
            //console.log(res.data.locations);
            this.setState({clientLocationList : res.data.locations ? res.data.locations : [],isloading:false,})
        })
    }

    onChangeLocation = (e) => {
        if(e.length == 0) {
            this.state.selectedLocationName = ""
            this.state.selectedLocationId = ""
            return
        }  
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId = e[0].id
    }


      getWorkSchedule(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "Location": this.state.selectedLocationName,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/GetWorkingSchedules", getParams)
            .then(res => {
                console.log("Get Work Schedule");
                console.log(res.data.workSchedules);
                this.setState({
                    getWorkScheduleList : res.data.workSchedules
                })
            })
        }

        GetWorkSchedId(id) {
            //console.log("Client ID List ");
            let WorkSchedId = ''
            for (let i = 0; i <= this.state.getWorkScheduleList.length; i++) {
                if (this.state.getWorkScheduleList[i]["id"] === id) {
                    WorkSchedId = this.state.getWorkScheduleList[i]['id']; 
                    //console.log(WorkSchedId);
                    break;
                }
            }
            return WorkSchedId
        }
        
        onChangeWorkScheduleIdList = (e) => {
            if(e.length == 0) {
                this.setState({
                    selectedWorkSchedId:"",
                    WorkSchedIdselected:""
                })
                return
            } 
            this.state.selectedWorkSchedId = e[0].id
            this.state.WorkSchedIdselected = e[0].id
        }

      getEmployees(){
        

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            //console.log("Employee List ");
            //console.log(res.data);
            const data = res.data
            if(data.stats==0)
            {
                this.setState({getEmployeeList: [], })
            } else {
                this.setState({ isloading:false, getEmployeeList : data.employees});
            }
        }) 
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alerttype:"Error! ", 
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    GetEmpId(id) {
        //console.log("Client ID List ");
        let GetEmployeeId = ''
        for (let i = 0; i <= this.state.getEmployeeList.length; i++) {
            if (this.state.getEmployeeList[i]["id"] === id) {
                GetEmployeeId = this.state.getEmployeeList[i]['id']; 
                //console.log(GetEmployeeId);
                break;
            }
        }
        return GetEmployeeId
    }
    
    onChangeEmployeesList = (e) => {
        
        if (e.length == 0) {
            this.setState({
                selectedGetEmployeeId : "",
                selectedEmployeeIdId : ""
            })
            return
        }
        this.state.selectedGetEmployeeId = e[0].id
        this.state.selectedEmployeeIdId = e[0].id
    }

    onChange = date => this.setState({ date })

    handleChange = date => {
        this.setState({
        startDate: date
        });
    };
    
    handleCreateClick = event => {
        alert("handleCreateClick");
    }

    handleCloseClick = event => {
        alert("handleCloseClick");
    }

    handleSubmit = event => {
        alert("handleSubmit");
        event.preventDefault();
    }

    handleChange = (moment) => {
        this.setState({
          moment
        });
    }

    handleSaveClick = event => {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({newChangeWorkSchedList: [],isloading:true,})

        for (let i = 0; i < this.state.ChangeWorkSchedList.length; i++) {
            if (this.state.ChangeWorkSchedList[i]["isModified"] == 1) {
                //console.log(this.state.ChangeWorkSchedList)
                const obj = {
                    Id: this.state.ChangeWorkSchedList[i]["id"],
                    EmployeeId: this.state.ChangeWorkSchedList[i]["employeeId"],
                    LocationId: this.state.ChangeWorkSchedList[i]["locationId"],
                    ScheduleDate: this.state.ChangeWorkSchedList[i]["scheduleDate"],
                    Startime: this.state.ChangeWorkSchedList[i]["startTime"],
                    EndTime: this.state.ChangeWorkSchedList[i]["endTime"],
                    IsDeleted: this.state.ChangeWorkSchedList[i]["isDeleted"].toString()
                };
                this.state.newChangeWorkSchedList.push(obj);

            }
        }


        
       const Params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ChangeSchedules":this.state.newChangeWorkSchedList
        };
        //console.log("Params")
        //console.log(Params)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Employee/EditChangeSchedule", Params)
            .then(res => {
                const data = res.data;
                //console.log(data)
                this.setState({isloading:false})
                var alerttype = (data.status=="1") ? "success" : "danger"
                this.getChangeWorkSchedule();
                sleep(1000).then(() => {
                    this.setState({
                        isloading:false,
                        alerttype:"Success!",
                        isshow:true,
                        color:alerttype,
                        message:data.message ,
                        fade:true
                    })
                })
            })
            .catch(error=>{
                this.setState(
                {
                    isloading:false,
                    alerttype:"Error! ",
                    isshow:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                })
            })
            /* this.getChangeWorkSchedule(); */
    }
    
    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.ChangeWorkSchedList.length; i++) {
            if (this.state.ChangeWorkSchedList[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue,id, column) {
        //console.log(id)
        this.state.ChangeWorkSchedList.map(function(item,i){
            if(item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {

        const sizePerPageRenderer = ({
            options,
            currSizePerPage,
            onSizePerPageChange
            }) => (
            <div className="btn-group" role="group">
                {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                    <button
                        key={ option.text }
                        type="button"
                        onClick={ () => onSizePerPageChange(option.page) }
                        className={ `btn ${isSelect ? 'btn-primary' : 'btn-success'}` }
                    >
                        { option.text }
                    </button>
                    );
                })
                }
            </div>
            );
        const options = {
            sizePerPageRenderer
        };


        const columns = [
            /* {
                dataField: 'from',
                text: 'From'
            },
            {
                dataField: 'to',
                text: 'To'
            }, */
            {
                dataField: 'employeeName',
                text: 'Employee Name',
                editable: false,
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField: 'scheduleDate',
                text: 'Date',
                editable: false,
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField: 'workSchedule',
                text: 'Work Schedule',
                editable: false,
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField: 'location',
                text: 'Location',
                editable: false,
                headerStyle : () => {
                    return { width  : "30%" };
                }
            }
            
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.ChangeWorkSchedList.map(function(item,i){
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
              //alert(e.row);
            }
        };

        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
            'Clear': ''
        };

        return(
                <div>
                <Banner />
                 <Container className="mt-5">
                 <Card>
                    <Card.Header>Timekeeping >> Change Work Schedule / Location</Card.Header>
                    <Card.Body>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group controlId="formGridEmail">
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.onChangeClientList}
                                    options={this.state.getClient}
                                    placeholder="Select Client"

                                />
                            </Form.Group>

                            <Form.Group controlId="formGroupEmail">
                                <Typeahead
                                    labelKey='employeeName'
                                    id="basic-example"
                                    onChange={this.onChangeEmployeesList}
                                    options={this.state.getEmployeeList}
                                    placeholder="Select Employee"
                                    autocomplete="false"
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                    onChange={this.onChangeLocation}
                                    options={this.state.clientLocationList}
                                    placeholder="Select Branch"
                                />
                            </Form.Group>

                            {/* <Row>
                                <Col>
                                    <Form.Check type="checkbox" label="Permanent" />
                                </Col>
                                <Col>
                                <DatePicker
                                    ref='permanentDate'
                                    selected={this.state.permanentDate}
                                    onChange={this.handleChangepermanentDate}
                                    minDate={this.minDate}
                                    value={this.state.permanentDate}
                                    dateFormat={"MM/dd/yyyy"}
                                />
                                 
                                </Col>
                            </Row> */}
                            <Form.Group controlId="formGroupEmail">
                                <Typeahead
                                    labelKey='description'
                                    id="basic-example"
                                    onChange={this.onChangeWorkScheduleIdList}
                                    options={this.state.getWorkScheduleList}
                                    placeholder="Select Work Schedule"
                                />
                            </Form.Group>

                             

                            <Form.Group as={Row}>
                                <Col sm={6}>
                                <Form.Label column sm={3}>
                                Schedule Date
                                </Form.Label>
                                    <DatePicker
                                        ref='ScheduleDate'
                                        selected={this.state.ScheduleDate}
                                        onChange={this.handleChangeScheduleDate}
                                        minDate={this.minDate}
                                        value={this.state.ScheduleDate}
                                        dateFormat={"MM/dd/yyyy"}
                                        className="form-control"
                                    />
                                </Col>

                                {/* <Col sm={4}>
                                <Form.Label column sm={4}>
                                To
                                </Form.Label>
                                <DatePicker
                                    ref='TovalueDate'
                                    selected={this.state.TovalueDate}
                                    onChange={this.handleChangeToValueDate}
                                    minDate={this.minDate}
                                    value={this.state.TovalueDate}
                                    dateFormat={"MM/dd/yyyy"}
                                />
                                </Col> */}
                            </Form.Group>

                            {/* <Form.Group as={Row}>
                                <Col sm={6}>
                                <Form.Label column sm={4}>
                                Start Time
                                </Form.Label>
                                <TimePicker 
                                    isshowSecond={isshowSecond}
                                    defaultValue={moment()}
                                    className="xxx"
                                    onChange={this.onChangeStartTime}
                                    />
                                </Col>

                                <Col sm={4}>
                                <Form.Label column sm={4}>
                                End Time
                                </Form.Label>
                                <TimePicker 
                                    isshowSecond={isshowSecond}
                                    defaultValue={moment()}
                                    className="xxx"
                                    onChange={this.onChangeEndTime}/>
                                </Col>
                            </Form.Group> */}

                            <ButtonToolbar sm={12}>
                                <Button variant="primary" style={{minWidth:'60px'}} className="ml-auto" onClick = { this.handleSearchClick }>Search</Button>&nbsp;
                                <Button variant="success" style={{minWidth:'60px'}} onClick = { this.handleAddClick }>Add</Button>
                            </ButtonToolbar>
                            
                        </Form>
                        <div className="mt-5">
                         <BootstrapTable
                            keyField = "id"
                            data = { this.state.ChangeWorkSchedList}
                            columns = { columns }
                            rowClasses="noser-table-row-class"
                            striped
                            hover
                            condensed
                            expandRow
                            pagination={ paginationFactory(options) }
                            selectRow = { selectRow }
                            cellEdit = { cellEditFactory({
                                mode: 'dbclick',
                                blurToSave: true,
                                afterSaveCell: (oldValue, newValue, row, column) => {
                                            this.GridDataModified(oldValue, newValue, row.id, column)
                                }
                            })
                        }
                        rowEvents={ rowEvents }

                        />
                        <ButtonToolbar sm={12}>
                            <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                Save
                            </Button>&nbsp;&nbsp;
                            <NavLink to="/home">
                                <Button variant="danger">
                                    Close
                                </Button>
                            </NavLink>
                        </ButtonToolbar>
                        </div>
                    </Card.Body>
                </Card>
                <NoserLoading show={this.state.isloading} />
            </Container>

            </div>
        )
    }

}

export  default ChangeWorkSched
