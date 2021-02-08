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

class ClientEndorsementsCreate extends Component {
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
        this.getStaffingSpecialist()
        /* ////console.log("this.props.location.params.data.clientId")
        ////console.log(this.state.selectedFullNameId) */
    }


    onChangeClient(e){
        this.setState({selectedClient : e.target.value})
        ////console.log(e.target.value)

        
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
        this.setState({
            isshow:false,
        })
 
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

        ////console.log("Start Get Params")
        ////console.log(getParams)
        ////console.log("End Get Params")

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms", getParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("Start Get Application")
                ////console.log(data)
                ////console.log("End Get Application")
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
                    ////console.log("Start Get Address")
                    ////console.log(this.state.addressAutocomplete)
                }
            })
    }

    onChangeMemberNameList = (e) => {
        if(e.length == 0) {
            this.state.selectedFullNameId	=   ""
            return
        }
        this.state.selectedFullNameId	    =   e[0].id
        this.setState({
            isshow:false,
        })
 
    }

    onChangeCurrentAddress = (e) => {
        if(e.length == 0) {
            this.state.selectedCity	=   ""
            return
        }
        this.state.selectedCity	    =   e[0].city
        this.setState({
            isshow:false,
        })
 
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
            ////console.log("Get Position Name");
            ////console.log(data);
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
        this.setState({
            isshow:false,
        })
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
            ////console.log("Coordinator List Autocomplete");
            ////console.log(data);
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
            ////console.log("Get Response");
            ////console.log(data);
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
        ////////console.log(this.state.EffectivityMonth)
    };

    onChangeAttention = (e) => {
        this.setState({
            attention	:  e.target.value.toUpperCase() ,
            isshow:false,
        })
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

        ////console.log("Save Params")
        ////console.log(addParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddEndorsement",  addParams
             )
             .then(res => {
                 const data = res.data;
                 ////console.log("Save Results")
                 ////console.log(data)
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

        if(!this.state.selectedClientId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select client",
                fade:true
            });
            return
        }

        if(!this.state.selectedFullNameId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select full name",
                fade:true
            });
            return
        }

        if(!this.state.selectedPositionId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select position",
                fade:true
            });
            return
        }

        if(!this.state.selectedCity){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select current address",
                fade:true
            });
            return
        }

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

        ////console.log("Submit Params")
        ////console.log(submitParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddEndorsement",  submitParams
             )
             .then(res => {
                 const data = res.data;
                 ////console.log("Submit Results")
                 ////console.log(data)
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
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeClientList}
                                                options={this.state.clientAutocomplete}
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        FULL NAME
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.onChangeMemberNameList}
                                                options={this.state.memberNameAutocomplete}
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        POSITION
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePositionList}
                                                options={this.state.positionAutocomplete}
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CURRENT ADDRESS
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='city'
                                                id="basic-example"
                                                onChange={this.onChangeCurrentAddress}
                                                options={this.state.addressAutocomplete}
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

export  default ClientEndorsementsCreate
