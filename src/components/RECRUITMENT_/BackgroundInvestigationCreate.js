import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab, Accordion, Redirect
}
from '../../noser-hris-component';
import {DropdownButton, Dropdown} from 'react-bootstrap';

class BackgroundInvestigationCreate extends Component {
    constructor(props) {
        super(props);
        this.minDate = new moment(props.minDate)
        this.state = {
            startDate: new Date(),
            isloading:false,
            isshow:false,
            alerttype:"",
            message:"",
            color:"",
            fade:true,
            navigate    : false,
            DateInvestigate:"",
            investigateDate:"",
            date: "1990-06-05",
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            investigationList:[
                {"name" : "N/A", 
                "address" : "", 
                "contactNumber" : "",
                },
            ] ,
            currentAddress:"",
            applicationList:[],
            selectedFullName:"",
            selectedFullNameId:"",
            selectedPositionApplied:"",
            selectedApplicationFormId:"",
            provincialAddress:"",date: "1990-06-05",
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            subjectKnown:false,
            subjectKnownList:[
                {"name":"1 To 6 Mos","id":"1"},
                {"name":"7 To 12 Mos","id":"2"},
                {"name":"1 Year","id":"3"},
            ],
            selectedSubjectKnown:"",
            selectedSubjectKnownId:"",
            familyKnown:false,
            hasBadRecord:false,
            HasCrime:"false",
            natureOfCrime:"",
            hasVices:false,
            selectedChildren:"",
            selectedChildrenId:"",
            childrenList:[
                {"name":"1 - 3?","id":"1"},
                {"name":"4 - 6?","id":"2"},
            ],
            spouseWorking:"false",
            spouseJobNature:"",
            spouseCompanyName:"",
            doesSubjectOwnHouse:false,
            doesSubjectRentHouse:false,
            rentcostList:[
                {"name":"1  3k?","id":"1"},
                {"name":"4 - 6K?","id":"2"},
                {"name":"7 - 10K?","id":"1"},
            ],
            selectedRentCost:"",
            selectedRentCostId:"",
            checkedSubjectRecommended:false,
            stateReason:"",
            lastJob:"",
            howLongInPreviousJob:"",
            statusUponResignation:"",
            bestQualities:"",
            companyRecognition:"",
            companyViolation:"",
            natureOfViolation:"",
            workingRelationship:"",
            supervisorAndPosition:"",
            recommendSubject:"",
            subjectForRehire:"",
            cIRecommendation:"",
            investigationSummary:"",
            selectedPreparedBy:"",
            selectedPreparedById:"",
            selectedNotedBy:"",
            selectedNotedById:"",
            getEmployeesCoordinatorList:[],
            resourcePersonsList:[
                {
                    "id":"0",
                    "name":"N/A",
                    "Address":"",
                    "ContactNumber":"",
                    "isDeleted":"0"
                },
                {
                    "id":"0",
                    "name":"N/A",
                    "Address":"",
                    "ContactNumber":"",
                    "isDeleted":"0"
                },
                {
                    "id":"0",
                    "name":"N/A",
                    "Address":"",
                    "ContactNumber":"",
                    "isDeleted":"0"
                },
            ],
            resourcePersonGrid:[],
            resourceContactNo:"",
            resourceAddress:"",
            clientList: [],
            investigateList:[],
            selectedClientName:"",
            selectedClientId:"",
            resourceName:"",
            applicationFormNo:"",
            selectedApplicationFormId:"",
            

            subjectYes : false,
            subjectNo : false,
            disablesSubjectKnownList : true,

            familyKnownYes : false,
            familyKnownNo : false,

            hasBadRecordYes : false,
            hasBadRecordYes : false,

            checkHasCrimeYes : false,
            checkHasCrimeNo : false,
            HasCrime : true,

            checkVicesYes : false,
            checkVicesNo : false,
            disableKindOfVices : true,

            checkSpouseWorkingYes : false,
            checkSpouseWorkingNo : false,
            disableSpouseCompanyName : true,
            disableChildren : true,
            disableSpouseJobNature : true,

            checkHouseOwn : false,
            checkSharer : false,
            checkRenter : false,
            disableAmountOfRent : true,

            checkRecommendYes : false,
            checkRecommendNo : false,
            disableSubjectRecommended : true,
            subjectRelationship : "",
            kindOfVices : "",
            memberNameAutocomplete : [],
        }
    }

    componentDidMount(){
        window.onbeforeunload = function() {
            this.onUnload();
            return "";
        }.bind(this);
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getApplicationForm();
        //this.getClient();
        /* this.GetInvestigation(); */
        this.getEmployeesCoordinator();
        this.state.selectedFullName = this.props.location.params.data.memberName
        this.state.selectedFullNameId = this.props.location.params.data.fullNameId
        this.state.selectedPositionApplied = this.props.location.params.data.position
        //this.state.currentAddress = this.props.location.params.data.applicantAddresses[0].houseNumber + " " + this.props.location.params.data.applicantAddresses[0].streetName 
        //this.state.provincialAddress =this.props.location.params.data.applicantAddresses[0].city + " " + this.props.location.params.data.applicantAddresses[0].province
        this.state.selectedApplicationFormId = this.props.location.params.data.id
        this.state.applicationFormNo = this.props.location.params.data.applicationFormNo
        this.state.selectedClient = this.props.location.params.data.client
        this.state.selectedClientId = this.props.location.params.data.clientId
        /* sleep(1000).then(() => {
        this.setState({isLoading:false})}) */
        console.log("this.state.selectedApplicationFormId");
        console.log(this.state.selectedApplicationFormId);
        this.state.assessedBy = this.state.userinfo.fullName
    }
    
    GetInvestigation() {
        this.setState({
            investigationList:[],
            isloading:true
        })
        const investParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "ReferenceNo":"",
            "ApplicationFormId":"",
            "PositionId":"",
            "StatusId":"6"
        };
        ////console.log(investParams)
        axios.post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetInvestigations",  investParams)
        .then(res => {
            const data = res.data;
            ////console.log("Get investigation");
            ////console.log(data);
            this.setState({ investigationList  : data.investigations, isloading:false});
            if(data.status=="1"){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Success!",
                    isshow          :   true,
                    color           :   "success",
                    message         :   data.message,
                    fade            :   true
                });
            }
            else{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   data.message,
                    fade            :   true
                })
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

    getApplicationForm() {

        this.setState({
            applicationList:[],
            isloading:true
        })
        const applicationParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ProfileId": "",
            "PositionId":"",
            "StatusId":"6",
            "TINNumber":"",
            "StatusId":""
        };
        
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms",  applicationParams)
        .then(res => {
             const data = res.data;
             ////console.log("Test app");
            ////console.log(data);
            this.setState({ applicationList: data.applicationForms, isloading:false});
            /* if(data.status=="1"){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Success!",
                    isshow          :   true,
                    color           :   "success",
                    message         :   data.message,
                    fade            :   true
                });
            }
            else{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   data.message,
                    fade            :   true
                })
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
                this.setState({selectedFullName: null, selectedPositionApplied: '', currentAddress : '', provincialAddress: '',selectedApplicationFormId:'',applicationFormNo:'', selectedClient:'', selectedClientId:''})
            return
        }
        this.state.selectedFullName = this.props.location.params.data.memberName
        this.state.selectedFullNameId = this.props.location.params.data.FullNameId
        this.state.selectedPositionApplied = this.props.location.params.data.position
        //this.state.currentAddress = this.props.location.params.data.applicantAddresses[0].houseNumber + " " + this.props.location.params.data.applicantAddresses[0].streetName 
        //this.state.provincialAddress =this.props.location.params.data.applicantAddresses[0].city + " " + this.props.location.params.data.applicantAddresses[0].province
        this.state.applicationFormNo = this.props.location.params.data.applicationFormNo
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
                if(data.status=="1"){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Success!",
                        isshow          :   true,
                        color           :   "success",
                        message         :   data.message,
                        fade            :   true
                    });
                }
                else{
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
                    })
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
        
    } */
    onChangeClient(e){
        this.setState({selectedClient : e.target.value})
        ////console.log(e.target.value)
    }

    onChangeCurrentAddress(e){
        this.setState({currentAddress : e.target.value})
        //////console.log(e.target.value)
    }

    onChangeProvincialAddress(e){
        this.setState({provincialAddress : e.target.value})
        //////console.log(e.target.value)
    }

    onChangePositionApplied(e){
        this.setState({selectedPositionApplied : e.target.value})
        //////console.log(e.target.value)
    }

    handleChangeDate = date => {
        ////console.log(date)
        this.setState({
            investigateDate: date
        });
    }

     formatDate(date) {
        let m = moment(date, 'MM/dd/yyyy');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
    } 

    onChangeSubjectKnown= (e) => {
        ////console.log(e)
        this.setState({subjectKnown:e.target.checked})
    }

    handleCoverChangeHowLongSubjectKnown = (e) => {
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedSubjectKnown = e[0].name
            this.state.selectedSubjectKnownId = e[0].id
        } else {
            this.state.selectedSubjectKnown = ""
            this.state.selectedSubjectKnownId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    onChangeFamilyKnown= (e) => {
        ////console.log(e)
        this.setState({familyKnown:e.target.checked})
    }

    onChangeHasBadRecord= (e) => {
        ////console.log(e)
        this.setState({hasBadRecord:e.target.checked})
    }

    onChangeHasCrime= (e) =>{
        ////console.log(e)
        this.setState({HasCrime:e.target.checked})
        /* if(e.target.unchecked) 
            this.setState({HasCrime: "false"})
        else
        {
            this.setState({HasCrime: ""})
            
        } */
    }

    onChangeNatureOfCrime(e){
        ////console.log(e)
        this.setState({
            natureOfCrime:e.target.value.toUpperCase()})
    }

    onChangeHasVices= (e) => {
        ////console.log(e)
        this.setState({hasVices:e.target.checked})
    }

    handleCoverChangeChildren= (e) => {
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedChildren = e[0].name
            this.state.selectedChildrenId = e[0].id
        } else {
            this.state.selectedChildren = ""
            this.state.selectedChildrenId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    onChangeSpouseWorking= (e) =>{
        this.setState({checkSpouseWorking:e.target.checked})
        ////console.log(e)
        /* if(e.target.unchecked) 
            this.setState({spouseWorking: "false"})
        else
        {
            this.setState({spouseWorking: ""})
            
        } */
    }

    onChangeSpouseJobNature (e){
        ////console.log(e)
        this.setState({spouseJobNature:e.target.value.toUpperCase()})
        this.setState({
            isshow:false,
        })
    }
    
    onChangeSpouseCompanyName (e){
        ////console.log(e)
        this.setState({spouseCompanyName:e.target.value.toUpperCase()})
        this.setState({
            isshow:false,
        })
    }

    onChangeDoesSubjectOwnHouse= (e) => {
        ////console.log(e)
        this.setState({doesSubjectOwnHouse:e.target.checked})
    }

    onChangeDoesSubjectRentHouse= (e) => {
        ////console.log(e)
        this.setState({doesSubjectRentHouse:e.target.checked})
    }

    handleCoverChangeRentCost= (e) => {
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedRentCost = e[0].name
            this.state.selectedRentCostId = e[0].id
        } else {
            this.state.selectedRentCost = ""
            this.state.selectedRentCostId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    onChangeSubjectRecommended= (e) =>{
        this.setState({checkedSubjectRecommended:e.target.checked})
        ////console.log(e)
        /* if(e.target.unchecked) 
            this.setState({subjectRecommended: "false"})
        else
        {
            this.setState({subjectRecommended: ""})
            
        } */
    }

    onChangeStateReason(e){
        ////console.log(e)
        this.setState({stateReason:e.target.value.toUpperCase()})
    }

    onChangeLastJob(e){
        ////console.log(e)
        this.setState({lastJob:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeHowLongInPreviousJob(e){
        ////console.log(e)
        this.setState({howLongInPreviousJob:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeStatusUponResignation(e){
        ////console.log(e)
        this.setState({statusUponResignation:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeBestQualities(e){
        ////console.log(e)
        this.setState({bestQualities:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeCompanyRecognition(e){
        ////console.log(e)
        this.setState({companyRecognition:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeCompanyViolation(e){
        ////console.log(e)
        this.setState({companyViolation:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeNatureOfViolation(e){
        ////console.log(e)
        this.setState({natureOfViolation:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeWorkingRelationship(e){
        ////console.log(e)
        this.setState({workingRelationship:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeSupervisorAndPosition(e){
        ////console.log(e)
        this.setState({supervisorAndPosition:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeRecommendSubject(e){
        ////console.log(e)
        this.setState({recommendSubject:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeSubjectForRehire(e){
        ////console.log(e)
        this.setState({subjectForRehire:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeInvestigationSummary(e){
        ////console.log(e)
        this.setState({investigationSummary:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeCIRecommendation(e){
        ////console.log(e)
        this.setState({cIRecommendation:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeResourceContactNo(e){
        ////console.log(e)
        this.setState({resourceContactNo:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeResourceName(e){
        ////console.log(e)
        this.setState({resourceName:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

    onChangeResourceAddress(e){
        ////console.log(e)
        this.setState({resourceAddress:e.target.value.toUpperCase() ,isshow:false })
        this.setState({
            isshow:false,
        })
    }

  
    onSubmitAdd = () => {
        let resource=this.state.resourcePersonsList
            let obj = {
                    "name" : "NA",
                    "address ": "", 
                    "contactNumber" : "",
                    "isModified":"0",
                    "isDeleted" : "0"
                }
        
        resource.push(obj)
        this.setState({resourcePersonsList: resource})
    }

    getEmployeesCoordinator(){
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
            ////console.log("Coordinator List Autocomplete");
            ////console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({getEmployeesCoordinatorList : data.employees,isloading:false}) 
            else
                this.setState({getEmployeesCoordinatorList : [],isloading:false}) 
        })
        
    }

    handleCoverChangePreparedBy= (e) => {
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedPreparedBy = e[0].employeeName
            this.state.selectedPreparedById = e[0].id
        } else {
            this.state.selectedPreparedBy = ""
            this.state.selectedPreparedById = ""
        }
    }
    
    handleCoverChangeNotedBy= (e) => {
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedNotedBy = e[0].employeeName
            this.state.selectedNotedById = e[0].id
        } else {
            this.state.selectedNotedBy = ""
            this.state.selectedNotedById = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleSaveClick = event => {
        this.setState({isloading:true})
        const saveParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "StatusId":"1",
            "ApplicationFormId" : this.state.selectedApplicationFormId,
            "DateInvestigation" :(this.state.investigateDate ? this.formatDate(this.state.investigateDate) : ""),
            "SubjectKnown " : this.state.subjectRelationship,
            "HowLongSubjectKnown " : this.state.selectedSubjectKnown,
            "IsFamilyKnown " : (this.state.familyKnownYes)? "1" : "0",
            "HasBadRecord " : (this.state.hasBadRecordYes)? "1" : "0",
            "HasCrime " : (this.state.checkHasCrimeYes)? "1" : "0",
            "NatureOfCrime " : this.state.natureOfCrime,
            "HasVices " : (this.state.checkVicesYes)? "1" : "0",
            "Children " : this.state.selectedChildren,
            "IsSpouseWorking " : (this.state.spouseWorking)? "1" : "0",
            "SpouseJobNature " : this.state.spouseJobNature,
            "SpouseCompanyName " : this.state.spouseCompanyName,
            "DoesSubjectOwnHouse " : (this.state.checkHouseOwn)? "1" : "0",
            "DoesSubjectRentHouse " : (this.state.checkRenter)? "1" : "0",
            "RentCost" : this.state.amountOfRent,
            "IsSubjectRecommended " : (this.state.checkRecommendYes)? "1" : "0",
            "IfNoStateReason " : this.state.stateReason,
            "LastJob " : this.state.lastJob,
            "HowLongInPreviousJob " : this.state.howLongInPreviousJob,
            "EmploymentStatusUponResignation " : this.state.statusUponResignation,
            "BestQualities " : this.state.bestQualities,
            "PreviousCompanyRecognition " : this.state.companyRecognition,
            "PreviousCompanyViolation " : this.state.companyViolation,
            "NatureOfViolation " : this.state.natureOfViolation,
            "WorkingRelationship " : this.state.workingRelationship,
            "ImmediateSupervisorAndPosition " :this.state.supervisorAndPosition,
            "RecommendSubject " : this.state.recommendSubject,
            "SubjectForRehire " : this.state.subjectForRehire,
            "InvestigationSummary " : this.state.investigationSummary,
            "CIRecommendation " : this.state.cIRecommendation,
            "PreparedBy " : this.state.userinfo.userId,
            "NotedBy " : this.state.selectedNotedById,     
            "resourcePersons" : [{
                    "Name":"",
                    "Address":"",
                    "ContactNumber":""
            }]
        }
        ////console.log(saveParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddInvestigation",  saveParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("Get save");
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

    onChangeSubjectRelationship = (e) => {
        this.setState({
            subjectRelationship : e.target.value.toUpperCase(),isshow:false,
        })
    }

    handleSubmitClick = () => {
        this.setState({isloading:true})

        

        if(this.state.subjectRelationship == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter What Is Your Relationship With The Subject under I. NEIGHBORHOOD CHECKING",
                fade:true
            });
            return
        }

        if(!this.state.selectedSubjectKnownId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please Select How Long Have You Known The Subject",
                fade:true
            });
            return
        }

        
        if(this.state.checkHasCrimeYes == true){
            if(this.state.natureOfCrime == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please Enter If Yes, Nature Of Crime Or Offense",
                    fade:true
                });
                return
            }
            
        }
        
        if(this.state.checkSpouseWorkingYes == true){
            if(this.state.spouseCompanyName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please Enter If Yes, Company Name Of Spouse",
                    fade:true
                });
                return
            }
            
        }
        
        if(this.state.checkSpouseWorkingYes == true){
            if(this.state.spouseCompanyName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please Enter If Yes, Company Name Of Spouse",
                    fade:true
                });
                return
            }

            if(!this.state.selectedChildrenId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "PLEASE ENTER IF THE SUBJECT IS MARRIED, HOW MANY CHILDREN DOES SHE/HE HAVE",
                    fade:true
                });
                return
            }

            if(this.state.spouseJobNature == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "PLEASE ENTER IF YES, NATURE OF SPOUSE JOB",
                    fade:true
                });
                return
            }
            
        }

        if(this.state.howLongInPreviousJob == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter how long had he/she worked in the previous job",
                fade:true
            });
            return
        }

        if(this.state.statusUponResignation == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter what was the subject’s employment status at the time of resignation",
                fade:true
            });
            return
        }

        if(this.state.bestQualities == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter what are the subject’s best qualities or notable traits",
                fade:true
            });
            return
        }

        if(this.state.companyRecognition == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter did subject receive any distinguish mark or recognition during this entire stay in the cmpany",
                fade:true
            });
            return
        }

        if(this.state.natureOfViolation == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter if yes, state the nature of offense commited",
                fade:true
            });
            return
        }

        if(this.state.workingRelationship == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter how was the subject working relationship with superiors and co - employees",
                fade:true
            });
            return
        }

        if(this.state.supervisorAndPosition == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter who were the subject’s immediate supervisor and the position",
                fade:true
            });
            return
        }

        if(this.state.recommendSubject == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter would you recommend the subject to us",
                fade:true
            });
            return
        }

        if(this.state.subjectForRehire == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter if given the chance, are you willing to re-hire the subject? if yes, why? if no, why",
                fade:true
            });
            return
        }

        if(this.state.investigationSummary == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter investigation summarry",
                fade:true
            });
            return
        }

        if(this.state.cIRecommendation == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter ci investigation",
                fade:true
            });
            return
        }

        if(!this.state.selectedNotedById){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select noted by",
                fade:true
            });
            return
        }
 
       /*  alert("Test") */

        const submitParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "StatusId":"11",
            "ApplicationFormId" : this.state.selectedApplicationFormId,
            "DateInvestigation" :(this.state.investigateDate ? this.formatDate(this.state.investigateDate) : ""),
            "SubjectKnown" : this.state.subjectRelationship,
            "HowLongSubjectKnown" : this.state.selectedSubjectKnown,
            "IsFamilyKnown" : (this.state.familyKnownYes)? "1" : "0",
            "HasBadRecord" : (this.state.hasBadRecordYes)? "1" : "0",
            "HasCrime" : (this.state.checkHasCrimeYes)? "1" : "0",
            "NatureOfCrime" : this.state.natureOfCrime,
            "HasVices" : (this.state.checkVicesYes)? "1" : "0",
            "Vices" : this.state.kindOfVices,
            "Children" : this.state.selectedChildren,
            "IsSpouseWorking" : (this.state.spouseWorking)? "1" : "0",
            "SpouseJobNature" : this.state.spouseJobNature,
            "SpouseCompanyName" : this.state.spouseCompanyName,
            "DoesSubjectOwnHouse" : (this.state.checkHouseOwn)? "1" : "0",
            "DoesSubjectRentHouse" : (this.state.checkRenter)? "1" : "0",
            "RentCost" : this.state.amountOfRent,
            "IsSubjectRecommended" : (this.state.checkRecommendYes)? "1" : "0",
            "IfNoStateReason" : this.state.stateReason,
            "LastJob" : this.state.lastJob,
            "HowLongInPreviousJob" : this.state.howLongInPreviousJob,
            "EmploymentStatusUponResignation" : this.state.statusUponResignation,
            "BestQualities" : this.state.bestQualities,
            "PreviousCompanyRecognition" : this.state.companyRecognition,
            "PreviousCompanyViolation" : this.state.companyViolation,
            "NatureOfViolation" : this.state.natureOfViolation,
            "WorkingRelationship" : this.state.workingRelationship,
            "ImmediateSupervisorAndPosition" :this.state.supervisorAndPosition,
            "RecommendSubject" : this.state.recommendSubject,
            "SubjectForRehire" : this.state.subjectForRehire,
            "InvestigationSummary" : this.state.investigationSummary,
            "CIRecommendation" : this.state.cIRecommendation,
            "PreparedBy" : this.state.userinfo.userId,
            "NotedBy" : this.state.selectedNotedById,     
            "resourcePersons" : [{
                    "Name":"",
                    "Address":"",
                    "ContactNumber":""
            }]
        }
        console.log(submitParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddInvestigation", submitParams
            )
            .then(res => {
                const data = res.data;
                //console.log("Get submit");
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

    onChangeKindOfVices = (e) => {
        this.setState({
            kindOfVices : e.target.value.toUpperCase(),
        })
        this.setState({
            isshow:false,
        })
    }
    
    onChangeSubjectYes  = (e) =>{
        this.state.subjectYes = e.target.checked
        if(this.state.subjectYes == true) {
            this.setState({
                disablesSubjectKnownList  :   false,
                subjectNo  		  :   false,
            })
        }
        /* else{
            this.setState({
                subjectNo  		  :   false,
	    })
            
        } */
    }
    
    onChangeSubjectNo  = (e) =>{
        this.state.subjectNo = e.target.checked
        if(this.state.subjectNo == true) {
            this.setState({
                disablesSubjectKnownList  :   true,
                subjectYes  		  :   false,
		        selectedSubjectKnown : "",
            })
        }
        /* else{
            this.setState({
                subjectYes  		  :   false,
	        })  
        } */
    }
    
    onChangeFamilySubjectYes  = (e) =>{
        this.state.familyKnownYes = e.target.checked
        if(this.state.familyKnownYes == true) {
            this.setState({
                familyKnownNo  :   false,
            })
        }
    }
    
    onChangeFamilySubjectNo  = (e) =>{
        this.state.familyKnownNo = e.target.checked
        if(this.state.familyKnownNo == true) {
            this.setState({
                familyKnownYes  :   false,
            })
        }
    }
    
    onChangeHasBadRecordYes  = (e) =>{
        this.state.hasBadRecordYes = e.target.checked
        if(this.state.hasBadRecordYes == true) {
            this.setState({
                hasBadRecordNo  :   false,
            })
        }
    }
    
    onChangeHasBadRecordNo  = (e) =>{
        this.state.hasBadRecordNo = e.target.checked
        if(this.state.hasBadRecordNo == true) {
            this.setState({
                hasBadRecordYes  :   false,
            })
        }
    }
    
    onChangeHasCrimeYes  = (e) =>{
        this.state.checkHasCrimeYes = e.target.checked
        if(this.state.checkHasCrimeYes == true) {
            this.setState({
                checkHasCrimeNo  :   false,
                HasCrime  		  :   false,
            })
        }
    }
    
    onChangeHasCrimeNo  = (e) =>{
        this.state.checkHasCrimeNo = e.target.checked
        if(this.state.checkHasCrimeNo == true) {
            this.setState({
                HasCrime  :   true,
                checkHasCrimeYes  		  :   false,
		        natureOfCrime : "",
            })
        }
    }
    
    onChangeHasVicesYes  = (e) =>{
        this.state.checkVicesYes = e.target.checked
        if(this.state.checkVicesYes == true) {
            this.setState({
                checkVicesNo  :   false,
                disableKindOfVices  		  :   false,
            })
        }
    }
    
    onChangeHasVicesNo  = (e) =>{
        this.state.checkVicesNo = e.target.checked
        if(this.state.checkVicesNo == true) {
            this.setState({
                disableKindOfVices  :   true,
                checkVicesYes  		  :   false,
		        kindOfVices : "",
            })
        }
    }
    
    onChangeSpouseWorkingYes  = (e) =>{
        this.state.checkSpouseWorkingYes = e.target.checked
        if(this.state.checkSpouseWorkingYes == true) {
            this.setState({
                checkSpouseWorkingNo  :   false,
                disableSpouseCompanyName  		  :   false,
                disableChildren  		  :   false,
                disableSpouseJobNature  		  :   false,
            })
        }
    }
    
    onChangeSpouseWorkingNo  = (e) =>{
        this.state.checkSpouseWorkingNo = e.target.checked
        if(this.state.checkSpouseWorkingNo == true) {
            this.setState({
                disableSpouseCompanyName  		  :   true,
                disableChildren  		  :   true,
                disableSpouseJobNature  		  :   true,
                checkSpouseWorkingYes  		  :   false,
		        spouseCompanyName : "",
		        selectedChildren : "",
		        spouseJobNature : "",
            })
        }
    }
    
    onChangeHouseOwn  = (e) =>{
        this.state.checkHouseOwn = e.target.checked
        if(this.state.checkHouseOwn == true) {
            this.setState({
                checkSharer  :   false,
                checkRenter  :   false,
		        disableAmountOfRent : true,
                amountOfRent : "",
            })
        }
    }
    
    onChangeSharer  = (e) =>{
        this.state.checkSharer = e.target.checked
        if(this.state.checkSharer == true) {
            this.setState({
                checkHouseOwn  :   false,
                checkRenter  :   false,
		        disableAmountOfRent : true,
                amountOfRent : "",
            })
        }
    }
    
    onChangeRenter  = (e) =>{
        this.state.checkRenter = e.target.checked
        if(this.state.checkRenter == true) {
            this.setState({
                checkHouseOwn  :   false,
                checkSharer  :   false,
		        disableAmountOfRent : false,
            })
        }
    }
    
    onChangeAmountOfRent  = (e) =>{
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({amountOfRent: e.target.value})
        }
       /*  this.setState({
            amountOfRent : e.target.value,
        }) */
    }
    
    onChangeRecommendYes  = (e) =>{
        this.state.checkRecommendYes = e.target.checked
        if(this.state.checkRecommendYes == true) {
            this.setState({
                checkRecommendNo  :   false,
                spouseJobNature : "",
                disableSubjectRecommended : true,
                stateReason : "",
            })
        }
    }
    
    onChangeRecommendNo  = (e) =>{
        this.state.checkRecommendNo = e.target.checked
        if(this.state.checkRecommendNo == true) {
            this.setState({
                checkRecommendYes  		  :   false,
                disableSubjectRecommended : false,
            })
        }
    }

    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/applicationform" push={true} />;
        }

        const resourceperson = [
            {
                dataField: 'name',
                text: 'NAME',
                headerStyle: (colum, colIndex) => {
                    return { width: '35%'};
                   }},
            
            {
                dataField: 'address',
                text: 'ADDRESS',
                headerStyle: (colum, colIndex) => {
                    return { width: '30%'};
                   }},
            
            {
                dataField: 'contactNumber',
                text: 'CONTACT NUMBER',
                headerStyle: (colum, colIndex) => {
                    return { width: '35%'};
                   }},
            
        ] 
        /* const resource = [
            {"name" : "N/A", 
            "address" : "", 
            "contactNumber" : "",
            },
        ] 
         */
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.resourcePersonsList
                this.state.resourcePersonsList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
              }
        };
        
        /* const fullName = this.state.userinfo.fullName */
        return(
            <div>
                <Banner />
                <Container  className="mt-5" fluid>
                    <Card>
                        <Card.Header>RECRUITMENT >> BACKGROUND INVESTIGATION (CREATE)</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    CLIENT
                                    </Form.Label>
                                    <Col sm="3">
                                       {/*  <Typeahead
                                            labelKey='memberName'
                                            id="basic-example"
                                            onChange={this.handleCoverChangeFullName}
                                            options={this.state.applicationList}
                                            type="text" 
                                            placeholder="FULL NAME"
                                            defaultSelected={[this.state.selectedFullNameId = this.props.location.params.data.memberName]}
                                            //disabled = { this.state.selectedFullNameId}
                                        />  */}
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
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    FULL NAME
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                            type="text" 
                                            autoComplete="off" 
                                            name="selectedFullName"
                                            value={this.state.selectedFullName}
                                            disabled = { this.state.selectedClient}
                                            
                                        /> 
                                        {/* <Form.Control 
                                            type="text" 
                                            placeholder=" CLIENT" 
                                            autoComplete="off" 
                                            name="positionApplied"
                                            value={this.state.selectedFullName}
                                            onChange={this.onChangeClient.bind(this)}
                                            disabled = { this.state.selectedClient}
                                        />  */}
                                    </Col>
                                </Form.Group>
                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    HOUSE ADDRESS
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="CURRENT ADDRESS"
                                            value={this.state.currentAddress} 
                                            onChange={this.onChangeCurrentAddress.bind(this)} 
                                            autoComplete="off" 
                                            disabled = { this.state.currentAddress}
                                        />
                                    </Col>
                                    <Col sm="2">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    CITY PROVINCE
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="PROVINCIAL ADDRESS"
                                            value={this.state.provincialAddress} 
                                            onChange={this.onChangeProvincialAddress.bind(this)} 
                                            autoComplete="off" 
                                            disabled = { this.state.provincialAddress}
                                        />
                                    </Col>
                                </Form.Group> */}
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    POSITION
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="POSITION APPLIED" 
                                            autoComplete="off" 
                                            name="positionApplied"
                                            value={this.state.selectedPositionApplied}
                                            onChange={this.onChangePositionApplied.bind(this)}
                                            disabled = { this.state.selectedPositionApplied}
                                        />
                                    </Col>
                                    <Col sm="2">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    Date
                                    </Form.Label>
                                    <Col sm="3">
                                        <DatePicker
                                            ref='investigateDate'
                                            selected={this.state.investigateDate}
                                            onChange={this.handleChangeDate}
                                            minDate={this.minDate}
                                            value={this.props.investigateDate}
                                            dateFormat={"MM/dd/yyyy"}
                                            className="form-control"
                                            /* placeholderText="Date " */
                                        />
                                    </Col>
                                </Form.Group>

                                <Accordion className="mt-2">
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color: "#FFFFFF"}}>
                                            I. NEIGHBORHOOD CHECKING
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                    WHAT IS YOUR RELATIONSHIP WITH THE SUBJECT?
                                                    </Form.Label>
                                                    <Col sm="9">
                                                        <Form.Control
                                                            type="text"
                                                            name="subjectRelationship"
                                                            value={this.state.subjectRelationship}
                                                            onChange={this.onChangeSubjectRelationship}
                                                            /* disabled = { this.state.disabledSubjectRelationship} */
                                                            autoComplete="off"
                                                        />
                                                        {/* <Form.Check
                                                            inline 
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="subjectYes"
                                                            checked={this.state.subjectYes}
                                                            onChange={this.onChangeSubjectYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
                                                            inline 
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="subjectNo"
                                                            checked={this.state.subjectNo}
                                                            onChange={this.onChangeSubjectNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />  */}
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                    HOW LONG HAVE YOU KNOWN THE SUBJECT?
                                                    </Form.Label>
                                                    <Col sm="9">
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeHowLongSubjectKnown}
                                                            options={this.state.subjectKnownList}
                                                            /* disabled={this.state.disablesSubjectKnownList} */
                                                            type="text" 
                                                        /> 
                                                    </Col>
                                                </Form.Group>
                                                <div style={{height : "10px"}}></div>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="12" style={{fontWeight : "bold"}}>
                                                    DOES THE FAMILY OF THE SUBJECT KNOWN TO THE RESOURCE PERSON? &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <Form.Check 
                                                            inline
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="familyKnownYes"
                                                            checked={this.state.familyKnownYes}
                                                            onChange={this.onChangeFamilySubjectYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
                                                            inline
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="familyKnownNo"
                                                            checked={this.state.familyKnownNo}
                                                            onChange={this.onChangeFamilySubjectNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                    IS THE SUBJECT KNOWN FOR ANY BAD RECORD IN THE COMMUNITY?
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Form.Check
                                                            inline 
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="hasBadRecordYes"
                                                            checked={this.state.hasBadRecordYes}
                                                            onChange={this.onChangeHasBadRecordYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
                                                            inline
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="hasBadRecordNo"
                                                            checked={this.state.hasBadRecordNo}
                                                            onChange={this.onChangeHasBadRecordNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Col> 
                                                </Form.Group>
                                                <div style={{height : "10px"}}></div>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                    INVOLVEMENT IN CRIME OR SOCIAL OFFENSE?
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Form.Check 
                                                            inline
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="checkHasCrimeYes"
                                                            checked={this.state.checkHasCrimeYes}
                                                            onChange={this.onChangeHasCrimeYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check
                                                            inline
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="checkHasCrimeNo"
                                                            checked={this.state.checkHasCrimeNo}
                                                            onChange={this.onChangeHasCrimeNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, NATURE OF CRIME OR OFFENSE
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control
                                                            type="text"
                                                            name="natureOfCrime"
                                                            value={this.state.natureOfCrime}
                                                            /* placeholder="IF YES, NATURE OF CRIME OR OFFENSE" */
                                                            onChange={this.onChangeNatureOfCrime.bind(this)}
                                                            disabled = { this.state.HasCrime}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <div style={{height : "10px"}}></div>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="4" style={{fontWeight : "bold"}}>
                                                    IF THE SUBJECT KNOWN FOR VICES LIKE GAMBLING, DRINKING, USE OF ILLEGAL DRUGS?
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Form.Check 
                                                            inline
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="checkVicesYes"
                                                            checked={this.state.checkVicesYes}
                                                            onChange={this.onChangeHasVicesYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
                                                            inline
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="checkVicesNo"
                                                            checked={this.state.checkVicesNo}
                                                            onChange={this.onChangeHasVicesNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Col>
                                                </Form.Group>
						                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, WHAT KIND OF VICES?
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control
                                                            type="text"
                                                            name="kindOfVices"
                                                            value={this.state.kindOfVices}
                                                            onChange={this.onChangeKindOfVices}
                                                            disabled = { this.state.disableKindOfVices}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <div style={{height : "10px"}}></div>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label inline column sm="3" style={{fontWeight : "bold"}}>
                                                    IF THE SUBJECT IS MARRIED, IS THE SPOUSE WORKING?
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="checkSpouseWorkingYes"
                                                            checked={this.state.checkSpouseWorkingYes}
                                                            onChange={this.onChangeSpouseWorkingYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="checkSpouseWorkingNo"
                                                            checked={this.state.checkSpouseWorkingNo}
                                                            onChange={this.onChangeSpouseWorkingNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Col> 
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, COMPANY NAME OF SPOUSE
                                                    </Form.Label>
                                                    <Col sm="2">
                                                        <Form.Control
                                                            type="text"
                                                            name="spouseCompanyName"
                                                            value={this.state.spouseCompanyName}
                                                            onChange={this.onChangeSpouseCompanyName.bind(this)}
                                                            autoComplete="off"
                                                            disabled = { this.state.disableSpouseCompanyName}
                                                        />
                                                    </Col>
                                                    <Form.Label column sm="4" style={{fontWeight : "bold"}}>
                                                    IF THE SUBJECT IS MARRIED, HOW MANY CHILDREN DOES SHE/HE HAVE
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeChildren}
                                                            options={this.state.childrenList}
                                                            type="text" 
                                                            disabled = { this.state.disableChildren}
                                                        /> 
                                                    </Col>
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, NATURE OF SPOUSE JOB
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Form.Control
                                                            type="text"
                                                            name="spouseJobNature"
                                                            value={this.state.spouseJobNature}
                                                            /* placeholder="IF YES, NATURE OF SPOUSE JOB" */
                                                            onChange={this.onChangeSpouseJobNature.bind(this)}
                                                            /* disabled = { this.state.spouseWorking} */
                                                            autoComplete="off"
                                                            disabled = { this.state.disableSpouseJobNature}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <div style={{height : "10px"}}></div>
                                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                    IF THE SUBJECT IS MARRIED, HOW MANY CHILDREN DOES SHE/HE HAVE
                                                    </Form.Label>
                                                    <Col sm="3">
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeChildren}
                                                            options={this.state.childrenList}
                                                            type="text" 
                                                        /> 
                                                    </Col>
                                                </Form.Group> */}
                                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Col sm="6">
                                                        <Form.Check 
                                                            type="checkbox" 
                                                            label="IF THE SUBJECT IS MARRIED, IS THE SPOUSE WORKING?" 
                                                            name="spouseWorking"
                                                            onChange={this.onChangeSpouseWorking}
                                                            checked={this.state.checkSpouseWorkingYes}
                                                            disabled
                                                            style={{fontWeight : "bold"}}
                                                        />
                                                    </Col>
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, NATURE OF SPOUSE JOB
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="spouseJobNature"
                                                            value={this.state.spouseJobNature}
                                                            placeholder="IF YES, NATURE OF SPOUSE JOB"
                                                            onChange={this.onChangeSpouseJobNature.bind(this)}
                                                            disabled = { this.state.spouseWorking}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group> */}
                                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, COMPANY NAME OF SPOUSE
                                                    </Form.Label>
                                                    <Col sm="3">
                                                        <Form.Control
                                                            type="text"
                                                            name="spouseCompanyName"
                                                            value={this.state.spouseCompanyName}
                                                            onChange={this.onChangeSpouseCompanyName.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group> */}
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                    WHAT IS THE SUBJECT'S CURRENT HOME OWNERSHIP STATUS?
                                                    </Form.Label>
                                                    <Col sm="2">
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="HOUSE OWNER" 
                                                            name="checkHouseOwn"
                                                            checked={this.state.checkHouseOwn}
                                                            onChange={this.onChangeHouseOwn}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="SHARER" 
                                                            name="checkSharer"
                                                            checked={this.state.checkSharer}
                                                            onChange={this.onChangeSharer}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="RENTER" 
                                                            name="checkRenter"
                                                            checked={this.state.checkRenter}
                                                            onChange={this.onChangeRenter}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Col>
                                                </Form.Group>
						                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF RENTER, HOW MUCH IS THE RENT?
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control
                                                            type="text"
                                                            name="amountOfRent"
                                                            value={this.state.amountOfRent}
                                                            /* placeholder="IF YES, COMPANY NAME OF SPOUSE" */
                                                            onChange={this.onChangeAmountOfRent}
                                                            disabled = { this.state.disableAmountOfRent}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <div style={{height : "10px"}}></div>
                                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Col sm="5">
                                                        <Form.Check 
                                                            type="checkbox" 
                                                            label="DOES THE SUBJECT RENT THE HOUSE WHERE HE/SHE LIVES?" 
                                                            name="doesSubjectRentHouse"
                                                            checked={this.state.doesSubjectRentHouse}
                                                            onChange={this.onChangeDoesSubjectRentHouse}
                                                            style={{fontWeight : "bold"}}
                                                        />
                                                    </Col>
                                                    <Col sm="1">
                                                    </Col>
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF YES, HOW MUCH IS THE RENT
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeRentCost}
                                                            options={this.state.rentcostList}
                                                            type="text" 
                                                        /> 
                                                    </Col>
                                                </Form.Group> */}
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="4" style={{fontWeight : "bold"}}>
                                                    WILL YOU RECOMMEND THE SUBJECT FOR THE POSITION HE IS APPLYING WITH US?
                                                    </Form.Label>
                                                    <Col sm="1">
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="YES" 
                                                            name="checkRecommendYes"
                                                            checked={this.state.checkRecommendYes}
                                                            onChange={this.onChangeRecommendYes}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                        <Form.Check 
								                            inline
                                                            type="checkbox" 
                                                            label="NO" 
                                                            name="checkRecommendNo"
                                                            checked={this.state.checkRecommendNo}
                                                            onChange={this.onChangeRecommendNo}
                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                        />
                                                    </Col>
                                                </Form.Group>
						                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF NO, PLEASE STATE THE REASON
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control
                                                            type="text"
                                                            name="stateReason"
                                                            value={this.state.stateReason}
                                                            /* placeholder="IF NO, PLEASE STATE THE REASON:" */
                                                            onChange={this.onChangeStateReason.bind(this)}
                                                            disabled = { this.state.disableSubjectRecommended}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Col sm="5">
                                                        <Form.Check 
                                                            type="checkbox" 
                                                            label="WILL YOU RECOMMEND THE SUBJECT FOR THE POSITION HE IS APPLYING WITH US?" 
                                                            name="subjectRecommended"
                                                            onChange={this.onChangeSubjectRecommended}
                                                            style={{fontWeight : "bold"}}
                                                        />
                                                    </Col>
                                                    <Col sm="1">
                                                    </Col>
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    IF NO, PLEASE STATE THE REASON
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="stateReason"
                                                            value={this.state.stateReason}
                                                            onChange={this.onChangeStateReason.bind(this)}
                                                            disabled = { this.state.subjectRecommended}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group> */}
                                                {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    PLEASE STATE THE REASON
                                                    </Form.Label>
                                                    <Col sm="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="stateReason"
                                                            value={this.state.stateReason}
                                                            onChange={this.onChangeStateReason.bind(this)}
                                                            disabled = { this.state.subjectRecommended}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group> */}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{color: "#FFFFFF"}}>
                                            II. EMPLOYMENT CHECKING
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <Form.Row className="mt-3">
                                                    <Form.Group as={Col} md={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>WHAT’S THE SUBJECT LAST’S JOB</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="WHAT’S THE SUBJECT LAST’S JOB?" */
                                                            value={this.state.lastJob}
                                                            onChange={this.onChangeLastJob.bind(this)}
                                                            autoComplete="off"
                                                        /> 
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                    </Form.Group>
                                                    <Form.Group as={Col} md={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>HOW LONG HAD HE/SHE WORKED IN THE PREVIOUS JOB</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="HOW LONG HAD HE/SHE WORKED IN THE PREVIOUS JOB?" */
                                                            value={this.state.howLongInPreviousJob}
                                                            onChange={this.onChangeHowLongInPreviousJob.bind(this)}
                                                            autoComplete="off"
                                                        /> 
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row style={{marginTop : "4px"}}>
                                                    <Form.Group as={Col} md={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>WHAT WAS THE SUBJECT’S EMPLOYMENT STATUS AT THE TIME OF RESIGNATION</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="WHAT WAS THE SUBJECT’S EMPLOYMENT STATUS AT THE TIME OF RESIGNATION?" */
                                                            value={this.state.statusUponResignation}
                                                            onChange={this.onChangeStatusUponResignation.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>WHAT ARE THE SUBJECT’S BEST QUALITIES OR NOTABLE TRAITS</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="WHAT ARE THE SUBJECT’S BEST QUALITIES OR NOTABLE TRAITS?" */
                                                            value={this.state.bestQualities}
                                                            onChange={this.onChangeBestQualities.bind(this)}
                                                            autoComplete="off"
                                                        /> 
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row style={{marginTop : "4px"}}>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>DID SUBJECT RECEIVE ANY DISTINGUISH MARK OR RECOGNITION DURING THIS ENTIRE STAY IN THE COMPANY</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="DID SUBJECT RECEIVE ANY DISTINGUISH MARK OR RECOGNITION DURING THIS ENTIRE STAY IN THE COMPANY?" */
                                                            value={this.state.companyRecognition}
                                                            onChange={this.onChangeCompanyRecognition.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>DID THE SUBJECT COMMIT ANY VIOLATIONS OF THE COMPANY POLICIES</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="DID THE SUBJECT COMMIT ANY VIOLATIONS OF THE COMPANY POLICIES?" */
                                                            value={this.state.companyViolation}
                                                            onChange={this.onChangeCompanyViolation.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row style={{marginTop : "4px"}}>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>IF YES, STATE THE NATURE OF OFFENSE COMMITTED</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="IF YES, STATE THE NATURE OF OFFENSE COMMITTED?" */
                                                            value={this.state.natureOfViolation}
                                                            onChange={this.onChangeNatureOfViolation.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>HOW WAS THE SUBJECT WORKING RELATIONSHIP WITH SUPERIORS AND CO - EMPLOYEES</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="HOW WAS THE SUBJECT WORKING RELATIONSHIP WITH SUPERIORS AND CO - EMPLOYEES?" */
                                                            value={this.state.workingRelationship}
                                                            onChange={this.onChangeWorkingRelationship.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row style={{marginTop : "4px"}}>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>WHO WERE THE SUBJECT’S IMMEDIATE SUPERVISOR AND THE POSITION</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="WHO WERE THE SUBJECT’S IMMEDIATE SUPERVISOR AND THE POSITION?" */
                                                            value={this.state.supervisorAndPosition}
                                                            onChange={this.onChangeSupervisorAndPosition.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                    </Form.Group>
                                                    <Form.Group as={Col} sm={5} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>WOULD YOU RECOMMEND THE SUBJECT TO US</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="WOULD YOU RECOMMEND THE SUBJECT TO US?" */
                                                            value={this.state.recommendSubject}
                                                            onChange={this.onChangeRecommendSubject.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row style={{marginTop : "4px"}}>
                                                    <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                        <Form.Label style={{fontWeight : "bold"}}>IF GIVEN THE CHANCE, ARE YOU WILLING TO RE-HIRE THE SUBJECT? IF YES, WHY? IF NO, WHY</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            /* placeholder="IF GIVEN THE CHANCE, ARE YOU WILLING TO RE-HIRE THE SUBJECT? IF YES, WHY? IF NO, WHY?" */
                                                            value={this.state.subjectForRehire}
                                                            onChange={this.onChangeSubjectForRehire.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{color: "#FFFFFF"}}>
                                            RESOURCE PERSONS
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <Form.Row className="mt-3">
                                                    <Form.Group as={Col} sm={612} controlId="formGridPassword">
                                                        <Button style={{minWidth:'60px'}}  variant="success" onClick={this.onSubmitAdd}>Add Row</Button>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                        <BootstrapTable
                                                            keyField = "resource"
                                                            data = { this.state.resourcePersonsList}
                                                            columns = { resourceperson}
                                                            selectRow = { selectRow }
                                                            cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                            rowClasses="noser-table-row-class"
                                                            striped
                                                            hover
                                                            condensed
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="3" style={{color: "#FFFFFF"}}>
                                            III. INVESTIGATION SUMMARY
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    INVESTIGATION SUMMARY
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control 
                                                            type="textarea" 
                                                            /* placeholder="INVESTIGATION SUMMARY" */
                                                            value={this.state.investigationSummary}
                                                            onChange={this.onChangeInvestigationSummary.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>

                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="4" style={{color: "#FFFFFF"}}>
                                            IV. CI RECOMMENDATION
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    CI RECOMMENDATION
                                                    </Form.Label>
                                                    <Col sm="10">
                                                        <Form.Control 
                                                            type="textarea" 
                                                            /* placeholder="CI RECOMMENDATION" */
                                                            value={this.state.cIRecommendation}
                                                            onChange={this.onChangeCIRecommendation.bind(this)}
                                                            autoComplete="off"
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    ASSESSED BY
                                                    </Form.Label>
                                                    <Col sm="3">
                                                        <Form.Control 
                                                            type="text" 
                                                            autoComplete="off" 
                                                            /* name="selectedClient" */
                                                            value={this.state.assessedBy}
                                                            readOnly
                                                        /> 
                                                    </Col>
                                                    <Col sm="2">
                                                    </Col>
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    NOTED BY
                                                    </Form.Label>
                                                    <Col sm="3">
                                                        <Typeahead
                                                            labelKey='employeeName'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeNotedBy}
                                                            options={this.state.getEmployeesCoordinatorList}
                                                            type="text" 
                                                            /* placeholder="NOTED BY" */
                                                        /> 
                                                    </Col>
                                                </Form.Group>

                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>




                                </Accordion>
                                
                                <ButtonToolbar className="mt-3">
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                        Save
                                    </Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="success" onClick={this.handleSubmitClick}>
                                        Submit
                                    </Button>&nbsp;&nbsp;&nbsp;
                                    <NavLink to="/applicationform">
                                        <Button variant="danger" href="/applicationform">
                                            Close
                                        </Button>
                                    </NavLink>
                                </ButtonToolbar >
                            </Form>
                        </Card.Body>
                    </Card>
                    
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        )
    }
}

export default BackgroundInvestigationCreate



