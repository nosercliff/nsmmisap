
import BreakTimeModal from  "./BreakTimeModal"

import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';

const DateToformat = 'h:mm';
const DateFromformat = 'h:mm';

let Tonow = moment().hour(0).minute(0);
let Fromnow = moment().hour(0).minute(0);

/*  function onChangeTo(Tovalue) {
     console.log("format");
     console.log(Tovalue);
   Tovalue && Tovalue.format(DateToformat)
} */
 
/*  function onChangeFrom(Fromvalue) {
    console.log("format");
     console.log(Fromvalue);
   Fromvalue && Fromvalue.format(DateFromformat)
  } 
 */
/* function onChangeOut(value) {
    console.log(value && value.format(format));
  }
 */
class WorkScheduleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            addModalShow: false,
            getClientAutocomplete : [],
            restList: [],
            clientLocationList: [],
            GetClientLocationsAutocomplete: [],
            filterClientType:"",
            clientType: "",
            clientLocationId:"",
            GetClientLocationId: "",
            selectedClientLocation : '',
            selectedClientLocationId : '',
            Fromvalue: '',
            Tovalue: '',
            templateName: '',
            getClientList: '',
            getClientLists: [],
            checked : false,
            workSchedDetail:[],
            newEditworkscheduleList: [],
            WorkSchedParam: [],
            WorkSchedDetailParam: [],
            selectedBraktimeListValueParam:[],
            clientListNew: [],
            SetClientId: [],
            SetId : '',
            SetDescription : '',
            SetStartTime : '',
            SetEndTime: '',
            SetIsDeleted : '',

        };
        this.textInput = React.createRef();
        this.onChangeClientLocation=this.onChangeClientLocation.bind(this);
        this.onChangeTo=this.onChangeTo.bind(this);
        this.onChangeFrom=this.onChangeFrom.bind(this);
        this.onChangeWorkSchedule=this.onChangeWorkSchedule.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.onChangeClientList=this.onChangeClientList.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
    }

    state = {
        selected: [],
    };

    handleChangeCheckbox() {
        this.setState({
            checked: !this.state.checked
        })
    }

    onChangeWorkSchedule(e) {
        this.setState({ templateName: e.target.value} );
    }

    onChangeTo(Tovalue) {
        console.log("format");
        console.log(Tovalue);
        this.state.Tovalue = Tovalue && Tovalue.format(DateToformat)
    }

    onChangeFrom(Fromvalue) {
        console.log("format");
        console.log(Fromvalue);
        this.state.Fromvalue = Fromvalue && Fromvalue.format(DateFromformat)
    } 


    handleChange() {
        this.state.selectedTemplateName = this.textInput.current.value;
    }

    onChangeClientLocation(e) {
        console.log("On Change Get Client Location")
       if (e.length > 0) {
            this.state.selectedClientLocation = e[0].name
            this.state.selectedClientLocationId = this.GetClientLocationId(e[0].name)
        }
    }

    
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        

        const rest = [
            {"particular" : "Time-In", "time" : "08:00 am"},
        ]
        this.setState({ restList: rest });


         this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        let ws = JSON.parse(sessionStorage.getItem("ws" + this.state.userinfo.employeeId))
        this.state.editworkscheduleList = ws
        console.log("dsds")
        console.log(this.state.editworkscheduleList)

        console.log(" end time " + ws[0].endTime)

        

        for(let i=0;i<ws.length;i++)
        {
           const templateNames = ws[i].description
           const startTimes = ws[i].startTime
                
            this.setState({
                templateName : templateNames,
                Fromvalue : startTimes
            })
            
            console.log("Fromvalue " + this.state.Fromvalue)

            console.log(this.state.Fromvalue)

            console.log("client Id New" + this.state.clientListNew) 

            console.log("client Id " + ws[i].clientId) 
           console.log("id " + ws[i].id) 
           console.log("description " + ws[i].description) 
           console.log("start time " + ws[i].startTime) 
           console.log("end Time" + ws[i].endTime) 
           console.log("is Deleted " + ws[i].isDeleted) 
           console.log("location" + ws[i].location) 

                const obj ={
                    Description: ws[i].description,
                    StartTime: ws[i].startTime,
                    EndTime: ws[i].endTime,
                    IsDeleted: ws[i].isDeleted,
                }
                this.state.WorkSchedParam.push(obj)

            console.log("Wor kSched Param " ) 
            console.log(this.state.WorkSchedParam) 


           let wsDetails = ws[i]

           {wsDetails.workScheduleDetails.map((item, i) => {     
                console.log("id " + item.id)
               console.log("scheduleId " + item.scheduleId) 
               console.log("breaktimeId " + item.breaktimeId)
               console.log("startTime " + item.startTime) 
               console.log("endTime " + item.endTime)
               console.log("isDeleted " + item.isDeleted)     

                     const object = {
                         Id: item.id,
                        ScheduleId: item.scheduleId,
                        BreaktimeId: item.breaktimeId,
                        StartTime: item.startTime,
                        EndTime: item.endTime,
                        IsDeleted: item.isDeleted
                     }

                     console.log(object)
                     this.state.selectedBraktimeListValueParam.push(object)
                     console.log(this.state.WorkSchedDetailParam)
            })}


           /* wsDetails.workScheduleDetails.map(function(item,idx){
               console.log("id " + item.id)
               console.log("scheduleId " + item.scheduleId) 
               console.log("breaktimeId " + item.breaktimeId)
               console.log("startTime " + item.startTime) 
               console.log("endTime " + item.endTime)
               console.log("isDeleted " + item.isDeleted) 
                
               

               }) */

           
        }


        /* let test = this.state.WorkSchedParam[0]
        this.setState({
            SetDescription : test.Description,
            SetStartTime: test.StartTime,
            SetEndTime: test.EndTime,
            SetIsDeleted: test.IsDeleted,
        })
        console.log("Work Sched Param")
        console.log(this.state.SetClientId) */

        Tonow = moment().hour(0).minute(this.state.editworkscheduleList.endTime);
        Fromnow = moment().hour(0).minute(this.state.editworkscheduleList.startTime);
        console.log("Work Sched Param Tonow")
        /* this.getClient(); */

        
    } 


    getClient(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": "111",
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
            .then(res => {
                console.log("Client List ");
                console.log(res.data);
                this.setState({
                    getClientLists : res.data.clients
                })
            })
    }

    GetClientId(name) {
        console.log("Client ID List ");
        let GetClientId = ''
        for (let i = 0; i <= this.state.getClientList.length; i++) {
            if (this.state.getClientList[i]["name"] === name) {
                GetClientId = this.state.getClientList[i]['id']; 
                console.log(GetClientId);
                break;
            }
        }
        return GetClientId
    }

    onChangeClientList(e) {
        if(e.length === "") {
            this.setState({
                clientLocationList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedClientName = e[0].name
                this.state.selectedClientId = this.GetClientId(e[0].name)
                console.log("Get Client Id", this.state.selectedClientId)
                console.log("Get Client Name", this.state.selectedClientName)
            }
        }
        this.getClientLocation();
        
    }

    getClientLocation(){
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
                console.log("Client Location");
                console.log(res.data.locations);
                this.setState({
                    clientLocationList : res.data.locations, 
                })
            })
            
    }

    GetLocation(name) {
        console.log("Client ID List ");
        let GetLocationName = ''
        for (let i = 0; i <= this.state.clientLocationList.length; i++) {
            if (this.state.clientLocationList[i]["name"] === name) {
                GetLocationName = this.state.clientLocationList[i]['id']; 
                console.log(GetLocationName);
                break;
            }
        }
        return GetLocationName
    }

    onChangeLocation(e) {
        if(e.length === "") {
            this.setState({
                clientLocationList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedLocationName = e[0].name
                this.state.selectedLocationId = this.GetLocation(e[0].name)
                console.log("Get Location Id", this.state.selectedLocationId)
                console.log("Get Location Name", this.state.selectedLocationName)
            }
        }
    }

    handleSaveClick = () => {

        console.log("Testing Session")
        console.log(this.state.editworkscheduleList)
        /* this.setState({isLoading:true}) */


        /* this.setState({newEditworkscheduleList: []})
        for (let i = 0; i < this.state.editworkscheduleList.length; i++) {
            if (this.state.editworkscheduleList[i]["isModified"] == 1) {
                const obj = {
                    ClientId: this.state.editworkscheduleList[i]["clientId"],
                    Id:  this.state.editworkscheduleList[i]["id"],
                    Description: this.state.editworkscheduleList[i]["isDeleted"],
                    StartTime: this.state.editworkscheduleList[i]["startTime"],
                    EndTime: this.state.editworkscheduleList[i]["endTime"],
                    IsDeleted: this.state.editworkscheduleList[i]["isDeleted"],
                };

                this.state.newEditworkscheduleList.push(obj);
            }
        } */

        const addParam = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "WorkSchedules":[
                    {
                        "ClientId": "0",
                        "Id":this.state.Id,
                        "Description":"8AM-5PM Schedules add break",
                        "StartTime":"08:00",
                        "EndTime":"05:00",
                        "IsDeleted":"0",
                        "WorkScheduleDetails":[{
                            "Id":"1",
                            "ScheduleId":"1",
                            "BreaktimeId":"1",
                            "StartTime":"09:15",
                            "EndTime":"09:20",
                            "IsDeleted":"0"
                        },
                        {
                            "Id":"0",
                            "ScheduleId":"1",
                            "BreaktimeId":"2",
                            "StartTime":"03:15",
                            "EndTime":"03:30",
                            "IsDeleted":"0"
                        }]
                    }
                ]
        }
       
        axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/EditWorkingSchedule",  addParam
             )
             /* .then(res => {
                const data = res.data;
                console.log("Save Result Message");
                console.log(data);
            }) */
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            isLoading:false,
                            templateName: "",
                            show:true,
                            Color:"success",
                            Message:data.message ,
                            Fade:true
                        });
                }
                else
                {
                    this.setState(
                        { 
                            isLoading:false,
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            },2000)

    }

    /* GetClientLocationId(name) {
        console.log("Get Client Location Id")
        let locationId = ''
        for (let i = 0; i <= this.state.clientLocationList.length; i++) {
            if (this.state.clientLocationList[i]["name"] === name) {
                locationId = this.state.clientLocationList[i]['id'];
                break;
            }
        }
        return locationId
    } */

    
     handleModalClose = (e) => {
         this.setState({
            checked: false,
            workSchedDetail: e
        });

     }
    render() {
        let addModalClose = () =>
            this.setState({
                checked: false
            });

            const columnWorkSched = [
                {
                    dataField: 'particular',
                    text: 'Particular'
                },
                {
                    dataField: 'time',
                    text: 'Time',
                    editable: false
                },
    
            ]
    
            const selectRow = {
                mode: 'checkbox',
                //clickToSelect: true,
                clickToSelectAndEditCell: true
            };

            const content = this.state.checked 
                ? <BreakTimeModal setConsole={this.handleModalClose} show={this.state.checked} onHide={addModalClose} selectedBraktimeListValue={this.state.selectedBraktimeListValueParam}/>
            : null;


        return(
            <div>
            <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Edit Work Schedule</Card.Header>
                        <Card.Body>
                            <Form  onSubmit={ this.onSubmitSave} ref={form => this.form = form}>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                                {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.getClientLists}
                                            placeholder="Select Client"
                                            onInputChange={this.handleInputChange}
                                            value={this.state.clientType}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                             onChange={this.onChangeLocation}
                                            options={this.state.clientLocationList}
                                            placeholder="Select Location"
                                        />
                                    </Col>
                                </Form.Group> */}
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Work Schedule Template Name" 
                                            ref="templateName"
                                            autoComplete="off" 
                                            name="templateName"
                                            value={this.state.templateName}
                                            /* onChange={() => this.handleChange()} */
                                            onChange={this.onChangeWorkSchedule}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                    <Form.Label column sm={4}>
                                    From
                                    </Form.Label>
                                    <TimePicker 
                                        showSecond={false}
                                        defaultValue={moment()}
                                        className="xxx"
                                        onChange={this.onChangeFrom}
                                        format={DateFromformat}
                                        use24Hours
                                        />
                                    </Col>
                                    <Col sm={4}>
                                    <Form.Label column sm={4}>
                                    To
                                    </Form.Label>
                                    <TimePicker 
                                        showSecond={false}
                                        defaultValue={moment()}
                                        className="xxx"
                                        onChange={this.onChangeTo}
                                        format={DateToformat}
                                        use24Hours/>
                                    </Col>
                                </Form.Group>
                                <div className="mt-2">
                                    <Form.Group id="formGridCheckbox">
                                        <Form.Check 
                                        /* onClick={() => this.setState({ addModalShow: true }) }  */
                                        checked={ this.state.checked } 
                                        onChange={ this.handleChangeCheckbox }

                                        type="checkbox" 
                                        label="Breaktime" />
                                    </Form.Group>
                                </div>
                                <div className="mt-5">
                                    <h5>Work Schedule (Preview):</h5>
                                    <BootstrapTable
                                    keyField = "id"
                                    data = { this.state.restList }
                                    columns = { columnWorkSched }
                                    selectRow = { selectRow }
                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                    />
                                    <ButtonToolbar>
                                    <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    
                                        <Button  href="/workschedule" variant="danger" onClick={ this.handleCloseClick }>Back</Button>
                                    </ButtonToolbar>
                                </div>
                            </Form>
                            {/* <BreakTimeModal show={this.state.addModalShow} onHide={addModalClose} /> */}
                            { content }
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} />
            </div>
        )
    }
}

export default WorkScheduleEdit;
