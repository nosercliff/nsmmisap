import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

class TrainingScheduleCreate extends Component {
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

            valueFrom: "",
            valueTo: "",

            dateFrom                    :   "",
            dateTo                      :   "",
            venue                       :   "",
            facilitated                 :   "",
            trainingName                :   "",
            trainingAutocomplete        :   [],
            description                 :   "",
            facilitatorAutocomplete     :   [],
            batchNo                     :   "",
            participantLimit            :   "",

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetTrainingName()
        this.GetFacilitator()
    }
    
    GetTrainingName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.userinfo.clientId,
            "Name"              :   "",
            "TrainingTypeId"    :   "",
            "PositionId"        :   ""
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
  

    onChangeFrom = (Fromvalue) => {
        this.state.Fromvalue = Fromvalue && Fromvalue.format(str) 
    } 

    onChangeTo = (Tovalue) => {
        this.state.Tovalue = Tovalue && Tovalue.format(str)
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value.toUpperCase()
        })
    }

    onChangeVenue = (e) => {
        this.setState({
            venue : e.target.value.toUpperCase()
        })
    }

    onChangeFacilitated = (e) => {
        this.setState({
            facilitated : e.target.value.toUpperCase()
        })
    }

    onChangeBatchNo = (e) => {
        this.setState({
            batchNo : e.target.value.toUpperCase()
        })
    }

    onChangeParticipantLimit = (e) => {
        this.setState({
            participantLimit : e.target.value.toUpperCase()
        })
    }


    handleSaveClick = event => {
        let dateFrom    =   moment(this.state.dateFrom).format('MM/DD/YYYY');
        let dateTo      =   moment(this.state.dateTo).format('MM/DD/YYYY');
        this.setState({
            isloading   :   true
        })

        const saveParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.userinfo.clientId,
            "TrainingId"        :   this.state.selectedTrainingId,
            "PartNo"            :   this.state.description,
            "BatchNo"           :   this.state.batchNo,
            "FacilitatorId"     :   this.state.selectedAFacilitatorId,
            "Venue"             :   this.state.venue,
            "ParticipantLimit"  :   this.state.participantLimit,
            "FromDate"          :   dateFrom,
            "FromTime"          :   this.state.Fromvalue,
            "ToDate"            :   dateTo,
            "ToTime"            :   this.state.Tovalue
        };

        console.log("Save Params")
        console.log(saveParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Training/AddTrainingSchedule",  saveParams
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
            //////console.log("Coordinator List Autocomplete");
            //////console.log(data);
            this.setState({
                facilitatorAutocomplete  : data.employees,
                isloading:false
            }) 
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

    onChangeFacilitator = (e) => {

        if(e.length == 0) {
            this.state.selectedAFacilitatorId	=   ""
            return
        }
        this.state.selectedAFacilitatorId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    render() {
        return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>TRAINING >> TRAINING SCHEDULE (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            TRAINING NAME
                                        </Form.Label>
                                        <Col sm="10">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTraining}
                                                options={this.state.trainingAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            DESCRIPTION
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                ref="description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.onChangeDescription}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            BATCH NO.
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                ref="batchNo"
                                                name="batchNo"
                                                value={this.state.batchNo}
                                                onChange={this.onChangeBatchNo}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            FACILITATOR
                                        </Form.Label>
                                        <Col sm="10">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeFacilitator}
                                                options={this.state.facilitatorAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            VENUE
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                ref="venue"
                                                name="venue"
                                                value={this.state.venue}
                                                onChange={this.onChangeVenue}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            LIMIT NO. OF PARTICIPANTS
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control 
                                                ref="participantLimit"
                                                name="participantLimit"
                                                value={this.state.participantLimit}
                                                onChange={this.onChangeParticipantLimit}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
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
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TIME FROM
                                        </Form.Label>
                                        <Col sm="1">
                                            <TimePicker 
                                                showSecond={showSecond}
                                                defaultValue={this.state.valueFrom}
                                                className="xxx"
                                                onChange={this.onChangeFrom}
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TIME TO
                                        </Form.Label>
                                        <Col sm="1">
                                            <TimePicker 
                                                showSecond={showSecond}
                                                defaultValue={this.state.valueTo}
                                                className="xxx"
                                                onChange={this.onChangeTo}
                                            />
                                        </Col>
                                    </Form.Group>
                                        
                                    <ButtonToolbar className="mt-5">
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button  href="/trainingschedule" variant="danger">Back</Button>
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

export  default TrainingScheduleCreate 
