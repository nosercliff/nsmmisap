import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer,DatePicker, Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';
// import { DropDownList } from '@progress/kendo-react-dropdowns';

class ExamResultCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading:false,
            isshow:false,
            alerttype:"",
            message:"",
            color:"",
            fade:true,
            navigate    : false,
            startDate: new Date(),
            date:"",
            applicationList:[],
            selectedApplicationFormId:"",
            selectedPositionApplied:"",
            selectedFullName:"",
            selectedFullNameId:"",
            examList:[],
            selectedExamName:"",
            selectedExamId:"",
            categoryList:[],
            selectedCategoryName:"",
            selectedCategoryId:"",
            score:"",
            clientList: [],
            selectedClientName:"",
            selectedClientId:"",
            remarks:"",
            typeOfTest : [
                {   "name"  :   "SRA",              "id" :   "1" },
                {   "name"  :   "ENGLISH GRAMMAR",  "id" :   "2" },
                {   "name"  :   "RAVEN",            "id" :   "3" },
                {   "name"  :   "MATH EXAM",        "id" :   "4" },
                {   "name"  :   "ACCOUNTING EXAM",  "id" :   "5" },
                {   "name"  :   "SSCT",             "id" :   "6" }
            ]

        }
        
    }
    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
            this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getApplicationForm();
        //this.getClient();
        this.GetCategory();
        this.state.selectedFullName = this.props.location.params.data.memberName
        this.state.selectedFullNameId = this.props.location.params.data.FullNameId
        this.state.selectedPositionApplied = this.props.location.params.data.position
        this.state.selectedApplicationFormId = this.props.location.params.data.id
        this.state.selectedClient = this.props.location.params.data.client
        this.state.selectedClientId = this.props.location.params.data.clientId
        this.GetExam();
        this.getExamCategories()
        sleep(1000).then(() => {
            this.setState({isloading:false})
            })
    }

    getApplicationForm() {

        this.setState({
            isloading:true
        })
        const applicationParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ProfileId": "",
            "PositionId":"",
            "StatusId":"4",
            "TINNumber":"",
            "StatusId":""
        };
        ////console.log(applicationParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms",  applicationParams)
        .then(res => {
             const data = res.data;
             ////console.log("Test app");
            ////console.log(data);
            this.setState({ applicationList: data.applicationForms});
            /* if(data.status=="1"){
                this.setState({
                    isloading : false,
                    alerttype : "Success!",
                    isshow : true,
                    color : "success",
                    message:data.message,
                    fade :true
                });
            }else {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   data.message,
                    fade        :   true
                });
            } */
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

    handleCoverChangeFullName= (e) => {
        ////console.log(e)
            if (e.length == 0) {
                this.setState({selectedFullName: null, selectedPositionApplied: '',selectedApplicationFormId:'', selectedClient:'', selectedClient:''})
            return
        }
        this.state.selectedFullName = this.props.location.params.data.memberName
        this.state.selectedFullNameId = this.props.location.params.data.FullNameId
        this.state.selectedPositionApplied = this.props.location.params.data.position
        this.state.selectedApplicationFormId = this.props.location.params.data.id
        this.state.selectedClient = this.props.location.params.data.client
        this.state.selectedClientId = this.props.location.params.data.clientId

        this.getApplicationForm();
        this.setState({isloading:false,})
    }

    /* handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient = e[0].name
            this.state.selectedClientId = e[0].id

        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = ""
        }
        this.getApplicationForm();
        ////console.log(this.state.selectedClient);
       
    }

    getClient(){
        //////console.log("getClient");
        const clientParams = {
            "IpAddress":"0.0.0.0",
           "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
                .then(res => {
                    const data = res.data;
                     ////console.log("Get 5");
                    ////console.log(res.data.clients); 
                    this.setState({clientList : data.clients})
                })
    } */
    onChangeClient(e){
        this.setState({selectedClient : e.target.value})
        ////console.log(e.target.value)
    }


    onChangePositionApplied(e){
        this.setState({selectedPositionApplied : e.target.value})
        //////console.log(e.target.value)
    }

    handleChangeDate = date => {
        ////console.log(date)
        this.setState({
            Date: date
        });
    }

    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
        }

    getExamCategories() {
        const examParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        }
        //console.log(examParams)
        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetExamCategories",  examParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Exam Categories")
            //console.log(data)
            /* this.setState({ examList  : data.exams }) */
        })
        
    }

    GetExam() {
        const examParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        }
        //console.log(examParams)
        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetExams",  examParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Exams")
            //console.log(data)
            this.setState({ examList  : data.exams })
        })
        
    }

    /* getTypeOfTest() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0017"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            ////console.log("Get Type of Test");
            ////console.log(data);
            this.setState({ examList  : data.dataReferences })
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
    } */

    /* handleCoverChangeExam = (event) => {
        this.setState({
            value: event.target.value
        });
    } */

    
    handleCoverChangeTypeOfTest = (e) => {
        if(e.length == 0) {
            this.state.selectedTypeOfTestName=""
            this.state.selectedTypeOfTestId=""
            return
        } else {
            this.state.selectedTypeOfTestName = e[0].name
            this.state.selectedTypeOfTestId = e[0].id
        }
        this.setState({
            isshow:false,
        })
            
    } 

    GetCategory() {
        const categParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetExamCategories",  categParams)
        .then(res => {
            const data = res.data;
            ////console.log("Test cat");
            ////console.log(data);
            this.setState({ categoryList: data.examCategories });
        })
    }

    onChangeScore(e){
        this.setState({score : e.target.value,
            isshow:false,
        });
        ////console.log(e.target.value)
    }

    onChangeRemarks(e){
        this.setState({remarks : e.target.value.toUpperCase(),
            isshow:false,
        });
        ////console.log(e.target.value)
    }
    
    handleCoverChangeCategory= (e) => {
        ////console.log(e)
        ////console.log(this.state.selectedCategoryId)
        if(e.length == 0) {
            this.state.selectedCategoryName=""
            this.state.selectedCategoryId=""
            return
        } 
            this.state.selectedCategoryName = e[0].name
            this.state.selectedCategoryId = e[0].id
            this.setState({
                isshow:false,
            })
    }

    handleSaveClick = event => {
        const saveParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ApplicationFormId":this.state.selectedApplicationFormId,
            "ExamCategoryId":this.state.selectedCategoryId,
            "ExamId":this.state.selectedTypeOfTestId,
            "Score":this.state.score,
            "DateTaken":this.state.Date,
            "Remarks":this.state.remarks,
            "StatusId":"1"
        }
        ////console.log(saveParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddApplicantExam",  saveParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("Get data");
                ////console.log(data)
                if(data.status=="1"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true,
                        navigate    :   true
                    });
                }else {
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

    handleSubmitClick= event => {
        this.setState({
            isloading   :   true,
        });

        if(!this.state.selectedTypeOfTestId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Type of Test",
                fade:true
            });
            return
        }

        if(this.state.score == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter Score",
                fade:true
            });
            return
        }

        if(!this.state.selectedCategoryId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Category",
                fade:true
            });
            return
        }

        if(this.state.remarks == ""){
            this.state.remarksFocus = true
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter Remarks",
                fade:true,
            });
            return
        }

        const submitParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ApplicationFormId":this.state.selectedApplicationFormId,
            "ExamCategoryId":this.state.selectedCategoryId,
            "ExamId":this.state.selectedTypeOfTestId,
            "Score":this.state.score,
            "DateTaken":this.state.Date,
            "Remarks":this.state.remarks,
            "StatusId":"11"
        }
        ////console.log(submitParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddApplicantExam",  submitParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("submitParams");
                ////console.log(data)
                if(data.status=="1"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true,
                        navigate    :   true
                    });
                }else {
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
    
    handleCoverChangeTypeOfTest = (e) => {
        if(e.length == 0) {
            this.state.selectedTypeOfTestName=""
            this.state.selectedTypeOfTestId=""
            return
        } else {
            this.state.selectedTypeOfTestName = e[0].name
            this.state.selectedTypeOfTestId = e[0].id
            this.setState({
                isshow:false,
            })
        }
            
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
                        <Card.Header>RECRUITMENT >> EXAM RESULTS (CREATE)</Card.Header>
                        <Card.Body>
                            <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                <Card>
                                    <Card.Body>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                                <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="positionApplied"
                                                value={this.state.selectedClient}
                                                onChange={this.onChangeClient.bind(this)}
                                                disabled = { this.state.selectedClient}
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
                                                onChange={this.handleCoverChangeFullName}
                                                options={this.state.applicationList}
                                                type="text" 
                                                //disabled = { this.state.selectedFullNameId}
                                                defaultSelected={[this.state.selectedFullNameId = this.props.location.params.data.memberName]}
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        DATE
                                        </Form.Label>
                                        <Col sm="4">
                                            <DatePicker
                                                ref='Date'
                                                selected={this.state.Date}
                                                onChange={this.handleChangeDate}
                                                minDate={this.minDate}
                                                value={this.props.Date}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        POSITION APPLIED
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="positionApplied"
                                                disabled = { this.state.selectedPositionApplied}
                                                value={this.state.selectedPositionApplied}
                                                onChange={this.onChangePositionApplied.bind(this)}
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    </Card.Body>
                                </Card>
                                    <Card className="mt-3">
                                        <Card.Body>
                                            <Form>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                    TYPE OF TEST
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeTypeOfTest}
                                                            options={this.state.typeOfTest}
                                                            /* onChange={this.handleCoverChangeExam} */
                                                            /* options={this.state.examList} */
                                                            type="text" 
                                                        /> 
                                                    </Col>
                                                    <Col sm="2">
                                                    </Col>
                                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                    SCORE
                                                    </Form.Label>
                                                    <Col sm="4">
                                                            <Form.Control 
                                                                type="text"
                                                                name="score"
                                                                value={this.state.score}
                                                                onChange={this.onChangeScore.bind(this)} 
                                                                autoComplete="off" 
                                                            />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                    CATEGORY
                                                    </Form.Label>
                                                    <Col sm="4">
                                                            <Typeahead
                                                                labelKey='name'
                                                                id="basic-example"
                                                                onChange={this.handleCoverChangeCategory}
                                                                options={this.state.categoryList}
                                                                type="text" 
                                                            /> 
                                                    </Col>
                                                    <Col sm="2">
                                                    </Col>
                                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                    REMARKS
                                                    </Form.Label>
                                                    <Col sm="4">
                                                            <Form.Control 
                                                                type="text"
                                                                name="remarks"
                                                                value={this.state.remarks}
                                                                onChange={this.onChangeRemarks.bind(this)} 
                                                                autoComplete="off" 
                                                            />
                                                    </Col>
                                                </Form.Group>
                                                <ButtonToolbar sm={12} className="mt-3">
                                                    <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                                        Save
                                                    </Button>&nbsp;&nbsp;&nbsp;
                                                    <Button variant="primary" onClick={this.handleSubmitClick}>
                                                        Submit
                                                    </Button>&nbsp;&nbsp;&nbsp;
                                                    <NavLink to="/applicationform">
                                                        <Button variant="danger" href="/applicationform">
                                                            Close
                                                        </Button>
                                                    </NavLink>
                                                </ButtonToolbar>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Form>
                            </Card.Body>
                        </Card>
                        <NoserLoading show={this.state.isloading} />
                    </Container>
            </div> 
        )
    }

}

export  default ExamResultCreate 
