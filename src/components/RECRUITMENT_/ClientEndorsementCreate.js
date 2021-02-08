import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import { ja } from 'date-fns/locale';

class ClientEndorsementCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            navigate    : false,

            clientAutocomplete	    :   [],
            memberNameAutocomplete	:   [],
            addressAutocomplete	    :   [],
            positionAutocomplete	:   [],
            dateEndorsed	        :   new Date(),
            attention	            :   "",
            staffingAutocomplete	:   [],
            responseAutocomplete	:   [],
            remarks	                :   "",
            /* selectedClient	        :   "",
            selectedFullName	    :   "",
            selectedPositionApplied	:   "",
            currentAddress		    :   "", */
        }

    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.GetPositionName();
        this.getResponse();
        this.state.selectedClient           =   this.props.location.params.data.client
        this.state.selectedClientId	        =   this.props.location.params.data.clientId
        this.state.selectedFullName         =   this.props.location.params.data.memberName
        this.state.selectedFullNameId       =   this.props.location.params.data.id
        this.state.selectedPositionApplied  =   this.props.location.params.data.position
        this.state.selectedPositionId       =   this.props.location.params.data.positionId
        this.state.currentAddress           =   this.props.location.params.data.applicantAddresses[0].houseNumber + " " + this.props.location.params.data.applicantAddresses[0].streetName+ " " + this.props.location.params.data.applicantAddresses[0].barangay + " " + this.props.location.params.data.applicantAddresses[0].city + " " + this.props.location.params.data.applicantAddresses[0].province
        
        
        this.getStaffingSpecialist()
        /* //console.log("this.props.location.params.data.clientId")
        //console.log(this.state.selectedFullNameId) */
    }


    onChangeClient(e){
        this.setState({selectedClient : e.target.value})
        //console.log(e.target.value)

        
       /*  this.getApplicationForm(); */
    }

    getClientList() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
            )
            .then(res => {
                const data = res.data;
                this.setState({
                clientAutocomplete  :   data.clients, 
                    isloading        :   false
                })
            })
    }

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedClientName   =   e[0].name
        this.getStaffingSpecialist()
        this.getApplicationForm();
 
    }

    getApplicationForm() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.selectedClientId,
            "ProfileId"     :   "",
            "PositionId"    :   "",
            "StatusId"      :   "",
            "TINNumber"     :   "",
        }

        //console.log("Start Get Params")
        //console.log(getParams)
        //console.log("End Get Params")

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms", getParams
            )
            .then(res => {
                const data = res.data;
                //console.log("Start Get Application")
                //console.log(data)
                //console.log("End Get Application")
                sleep(5000).then(() => {
                    this.setState({
                        memberNameAutocomplete  :   data.applicationForms,
                        isloading	            :   false
                    })
                })
                let addressData = []
                for(let i = 0; i < data.applicationForms.length; i++) {
                    
                    for(let j = 0; j < data.applicationForms[i].applicantAddresses.length; j++){
                        let obj = {
                            'city' :   data.applicationForms[i].applicantAddresses[j]['houseNumber'].concat(', ', data.applicationForms[i].applicantAddresses[j]['barangay'], ', ', data.applicationForms[i].applicantAddresses[j]['city'], ', ', data.applicationForms[i].applicantAddresses[j]['province']),
                            
                          }
                          addressData.push(obj)
                    }
                    this.setState({
                        addressAutocomplete : addressData
                    })
                }
            })
    }

    onChangeMemberNameList = (e) => {
        if(e.length == 0) {
            this.state.selectedFullNameId	=   ""
            return
        }
        this.state.selectedFullNameId	    =   e[0].id
 
    }

    GetPositionName() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   "",
            "DepartmentId"  :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Position Name");
            //console.log(data);
            this.setState({ positionAutocomplete  : data.positions });
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

    onChangePositionList = (e) => {

        if(e.length == 0) {
            this.state.selectedPositionId	=   ""
            return
        }
        this.state.selectedPositionId	    =   e[0].id
    }

    getStaffingSpecialist(){
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetCoorEmployees", getParams)
        .then(res => {
            const data = res.data
            //console.log("Coordinator List Autocomplete");
            //console.log(data);
            if(data.status=="1")
                this.setState({staffingAutocomplete : data.employees,isloading:false}) 
            else
                this.setState({staffingAutocomplete : [],isloading:false}) 
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

    onChangeStaffingList = (e) => {

        if(e.length == 0) {
            this.state.selectedStaffingId	=   ""
            return
        }
        this.state.selectedStaffingId	    =   e[0].id
    }

    getResponse() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0010"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Response");
            //console.log(data);
            this.setState({ responseAutocomplete  : data.dataReferences });
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

    onChangeResponseList = (e) => {

        if(e.length == 0) {
            this.state.selectedResponseId	=   ""
            return
        }
        this.state.selectedResponseId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    handleChangeDateEndorsed = date => {
        this.setState({
            dateEndorsed: date,
            isshow:false,
        });
        //////console.log(this.state.EffectivityMonth)
    };

    onChangeAttention = (e) => {
        this.setState({
            attention	:  e.target.value.toUpperCase() ,
            isshow:false,
        });
    }

    onChangeRemarks = (e) => {
        this.setState({
            remarks	:  e.target.value.toUpperCase() ,
            isshow:false,
        })
    }

    handleSaveClick = event => {
        let dateEndorsed = moment(this.state.dateEndorsed).format('MM/DD/YYYY');
        this.setState({isloading:true})

        const addParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.selectedClientId,
            "UserId"            :   this.state.userinfo.userId,
            "ApplicationFormId" :   this.state.selectedFullNameId,
            "PositionId"        :   this.state.selectedPositionId,
            "Attention"         :   this.state.attention,
            "StaffingId"        :   this.state.userinfo.userId,
            "ResponseId"        :   this.state.selectedResponseId,
            "DateEndorsed"      :   dateEndorsed,
            "Remarks"           :   this.state.remarks,
            "StatusId"          :   "1",
         };

        //console.log("Save Params")
        //console.log(addParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddEndorsement",  addParams
             )
             .then(res => {
                 const data = res.data;
                 //console.log("Save Results")
                 //console.log(data)
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

    }
    handleSubmitClick = event => {

        if(this.state.dateEndorsed == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter date endorsed",
                fade:true
            });
            return
        }

        if(this.state.attention == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter attention",
                fade:true
            });
            return
        }

        if(!this.state.selectedResponseId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select response",
                fade:true
            });
            return
        }

        if(this.state.remarks == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter remarks",
                fade:true
            });
            return
        }

        let dateEndorsed = moment(this.state.dateEndorsed).format('MM/DD/YYYY');
        this.setState({isloading:true})

        const submitParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.selectedClientId,
            "UserId"            :   this.state.userinfo.userId,
            "ApplicationFormId" :   this.state.selectedFullNameId,
            "PositionId"        :   this.state.selectedPositionId,
            "Attention"         :   this.state.attention,
            "StaffingId"        :   this.state.userinfo.userId,
            "ResponseId"        :   this.state.selectedResponseId,
            "DateEndorsed"      :   dateEndorsed,
            "Remarks"           :   this.state.remarks,
            "StatusId"          :   "13",
         };

        //console.log("Submit Params")
        //console.log(submitParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddEndorsement",  submitParams
             )
             .then(res => {
                 const data = res.data;
                 //console.log("Submit Results")
                 //console.log(data)
                 if(data.status=="1"){
                this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true,
                        navigate    :   true,
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

    }

    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/applicationform" push={true} />;
        } 
        return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>RECRUITMENT >> CLIENT ENDORSEMENT (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    {/* <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.clientAutocomplete}
                                                options={this.state.clientAutocomplete}
                                                placeholder="Select Client"
                                                defaultSelected={[this.state.selectedClientId = this.props.location.params.data.client]}
                                            /> 
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.onChangeMemberNameList}
                                                options={this.state.memberNameAutocomplete}
                                                placeholder="Select Client"
                                                defaultSelected={[this.state.selectedFullNameId = this.props.location.params.data.memberName]}
                                            /> 
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePositionList}
                                                options={this.state.positionAutocomplete}
                                                placeholder="Select Client"
                                                defaultSelected={[this.state.selectedPositionId = this.props.location.params.data.position]}
                                            /> 
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='city'
                                                id="basic-example"
                                                onChange={this.onChangeMemberNameList}
                                                options={this.state.memberNameAutocomplete}
                                                placeholder="Select Client"
                                            /> 
                                        </Form.Group>
                                    </Form.Row>  */}
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedClient"
                                                value={this.state.selectedClient}
                                                
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        FULL NAME
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedFullName"
                                                value={this.state.selectedFullName}
                                                
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        POSITION APPLIED
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedPositionApplied"
                                                value={this.state.selectedPositionApplied}
                                                
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CURRENT ADDRESS
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="currentAddress"
                                                value={this.state.currentAddress}
                                                
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        DATE ENDORSED
                                        </Form.Label>
                                        <Col sm="4">
                                            <DatePicker
                                                ref='dateEndorsed'
                                                selected={this.state.dateEndorsed}
                                                onChange={this.handleChangeDateEndorsed}
                                                minDate={this.minDate}
                                                value={this.props.dateEndorsed}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        ATTENTION
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                ref="attention"
                                                name="attention"
                                                value={this.state.attention}
                                                onChange={this.onChangeAttention}
                                                autoComplete="off"
                                                placeholder="Enter Attention"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        STAFFING
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                /* name="selectedClient" */
                                                value={this.state.userinfo.fullName}
                                                readOnly
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        RESPONSE
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeResponseList}
                                                options={this.state.responseAutocomplete}
                                                placeholder="Select Response"
                                                /* clearButton */
                                                /* multiple */
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        REMARKS
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                placeholder="Enter Remarks"
                                                onChange={this.onChangeRemarks}
                                                autoComplete="off"
                                                value={this.state.remarks}
                                            />
                                        </Col>
                                    </Form.Group>
                                        
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button variant="success" onClick = { this.handleSubmitClick }>Submit</Button>&nbsp;&nbsp;&nbsp;
                                        <Button  href="/applicationform" variant="danger">Back</Button>
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

export  default ClientEndorsementCreate
