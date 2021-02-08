import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class FinalInterviewCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            navigate    : false,

            clientAutocomplete	        :   [],
            memberNameAutocomplete	    :   [],
            addressAutocomplete	        :   [],
            assessedByAutocomplete	    :   [],
            finalAssessmentAutocomplete	:   [],
            comments	                :   "",
        } 
        /* this.onChangeClientype=this.onChangeClientype.bind(this);  */

    
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.getFinalAssessed();
        this.state.selectedClient = this.props.location.params.data.client
        this.state.selectedClientId = this.props.location.params.data.clientId
        this.state.selectedFullName = this.props.location.params.data.memberName
        this.state.selectedFullNameId = this.props.location.params.data.id
        this.state.selectedPositionApplied = this.props.location.params.data.position
        this.state.selectedPositionId = this.props.location.params.data.positionId
        this.state.currentAddress = this.props.location.params.data.applicantAddresses[0].houseNumber + " " + this.props.location.params.data.applicantAddresses[0].streetName+ " " + this.props.location.params.data.applicantAddresses[0].barangay + " " + this.props.location.params.data.applicantAddresses[0].city + " " + this.props.location.params.data.applicantAddresses[0].province
        /* this.getStaffingSpecialist() */
        //console.log("this.props.location.params.data.clientId")
        //console.log(this.state.selectedFullNameId)
        this.getAssessedBy()
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
                ////console.log(data)
                ////console.log("Client Data")
                this.setState({
                clientAutocomplete	:   data.clients, 
                    isloading       :   false
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
        this.getAssessedBy();
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
                }
            })
    }

    onChangeMemberNameList = (e) => {
        if(e.length == 0) {
            this.state.selectedApplicationId	=   ""
            return
        }
        this.state.selectedApplicationId	    =   e[0].id
 
    }

    getAssessedBy(){
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
                this.setState({assessedByAutocomplete : data.employees,isloading:false}) 
            else
                this.setState({assessedByAutocomplete : [],isloading:false}) 
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

    onChangeAssessedBy = (e) => {

        if(e.length == 0) {
            this.state.selectedAssessedById	=   ""
            return
        }
        this.state.selectedAssessedById	    =   e[0].id
    }

    getFinalAssessed() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0011"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            ////console.log("Get Response");
            ////console.log(data);
            this.setState({ finalAssessmentAutocomplete  : data.dataReferences });
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

    onChangeFinalAssessment = (e) => {

        if(e.length == 0) {
            this.state.selectedFinalAssessmentId	=   ""
            return
        }
        this.state.selectedFinalAssessmentId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    onChangeComments = (e) => {
        this.setState({
            comments	:   e.target.value,
            isshow:false,
        })
    }

    handleSaveClick = event => {
        this.setState({isloading:true})

        const addParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.selectedClientId,
            "UserId"            :   this.state.userinfo.userId,
            "ApplicationFormId" :   this.state.selectedFullNameId,
            "AssessmentId"      :   this.state.selectedFinalAssessmentId,
            "AssessedBy"        :   this.state.userinfo.userId,
            "Comments"          :   this.state.comments,
            "StatusId"          :   "1",
         };

        //console.log("Save Params")
        //console.log(addParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddFinalInterview",  addParams
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

        if(!this.state.selectedFinalAssessmentId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter select assesment",
                fade:true
            });
            return
        }

        if(this.state.comments == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter comments",
                fade:true
            });
            return
        }

        this.setState({isloading:true})

        const submitParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.selectedClientId,
            "UserId"            :   this.state.userinfo.userId,
            "ApplicationFormId" :   this.state.selectedFullNameId,
            "AssessmentId"      :   this.state.selectedFinalAssessmentId,
            "AssessedBy"        :   this.state.userinfo.userId,
            "Comments"          :   this.state.comments,
            "StatusId"          :   "7",
         };

        //console.log("Submit Params")
        //console.log(submitParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddFinalInterview",  submitParams
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
                            <Card.Header>RECRUITMENT >> FINAL INTERVIEWS (CREATE)</Card.Header>
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
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedClient"
                                                value={this.state.selectedClient}
                                                /* onChange={this.onChangeClient.bind(this)} */
                                                
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedFullName"
                                                value={this.state.selectedFullName}
                                                /* onChange={this.onChangeClient.bind(this)} */
                                                
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
                                                /* onChange={this.onChangeClient.bind(this)} */
                                                
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        FINAL ASSESSMENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeFinalAssessment}
                                                options={this.state.finalAssessmentAutocomplete}
                                                placeholder="Select Final Assessment"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        ASSESSED BY
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
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        FINAL ASSESSMENT
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                placeholder="Enter Comments"
                                                onChange={this.onChangeComments}
                                                autoComplete="off"
                                                value={this.state.comments}
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

export  default FinalInterviewCreate
