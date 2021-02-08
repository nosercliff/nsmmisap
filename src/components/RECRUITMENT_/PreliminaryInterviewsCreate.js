import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab, Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class PreliminaryInterviewsCreate extends Component {
        constructor(props) {
            super(props);
            this.state = {
                userinfo: [],
                isloading: true,
                AlertType: "",
                Show: false,
                Message: "",
                Color: "",
                Fade: true,
                navigate    : false,
                selectedBodyBuilt:"",
                selectedBodyBuiltId:"",
                bodyBuiltList:[],
                complexionList:[],
                hairList:[],
                postureList:[],
                mentalList:[],
                workExperienceList:[],
                selectedHairId:"",
                selectedHair:"",
                selectedComplexionId:"",
                selectedComplexion:"",
                selectedPosture:"",
                selectedPostureId:"",
                personalityList:[],
                selectedPersonalityId:"",
                selectedPersonality:"",
                selectedMentalId:"",
                selectedMental:"",
                selectedWorkExperienceId:"",
                selectedWorkExperience:"",
                educationAttainmentList:[
                    {"name":"HIGH SCHOOL GRADUATE","id":"1"},
                    {"name":"2 YEAR COLLEGE LEVEL","id":"2"},
                    {"name":"COLLEGE GRADUATE","id":"3"},
                    {"name":"POST GRADUATE STUDIES","id":"4"},
                    {"name":"PROFESSIONAL LICENCE","id":"1"},
                ],
                selectedEducationAttainmentId:"",
                selectedEducationAttainment:"",
                selectedPreFinalId:"",
                selectedPreFinal:"",
                preFinalList:[],
                applicationList:[],
                selectedFullName:"",
                selectedFullNameId:"",
                selectedPositionApplied:"",
                selectedPositionAppliedId:"",
                selectedCurrentAddressId:"",
                selectedCurrentAddress:"",
                selectedContactNOId:"",
                selectedContactNO:"",
                selectedSexId:"",
                selectedSex:"",
                selectedCivilStatus:"",
                selectedCivilStatusId:"",
                selectedAge:"",
                selectedAgeId:"",
                assessedBy:"",
                workExperienceYear:"",
                workExperienceMonths:"",
                comments:"",
                freshGraduate:false,
                withWorkExperience:false,
                currentAddressList:[],
                currentAddress:"",
                selectedApplicationFormId:"",
                assessmentlList:[],
                selectedAssessmentId:"",
                selectedAssessment:"",
                selectedSupportGroupId:"",
                selectedSupportGroup:"",
                supportGroupList:[],
                selectedTechnicalExperienceId:"",
                selectedTechnicalExperience:"",
                technicalExperienceList:[],
                selectedStoreOperationId:"",
                selectedStoreOperation:"",
                storeOperationList:[],
                getEmployeesCoordinatorList:[],
                selectedAssessedBy:"",
                selectedAssessedById:"",
                clientList: [],
                selectedClientName:"",
                selectedClientId:"",
                preliminaryList:[],
                clientAutocomplete : [],
                memberNameAutocomplete : [],
                positionAutocomplete : [],
                addressAutocomplete : [],

            }
            this.onChangeWorkExperienceYear=this.onChangeWorkExperienceYear.bind(this)
            this.onChangeWorkExperienceMonths=this.onChangeWorkExperienceMonths.bind(this)
            this.onChangeComments=this.onChangeComments.bind(this)
        }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
            this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        /* this.getApplicationForm(); */
        this.GetDataReferences();
        this.GetDataPreFinal();
        this.GetDataAssessment();
        this.GetSupportGroup();
        this.GetTechnicalExperience();
        this.GetStoreOperation();
        this.getEmployeesCoordinator();
        this.GetPreliminaryInterview();
        this.getClientList();
        // this.state.selectedClient = this.props.location.params.data.client
        
       

        sleep(1000).then(() => {
            this.setState({isloading:false})
            })
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
                //////console.log(data)
                //////console.log("Client Data")
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
        this.getPositionName();
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

        //////console.log("Start Get Params")
        //////console.log(getParams)
        //////console.log("End Get Params")

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms", getParams
            )
            .then(res => {
                const data = res.data;
                //////console.log("Start Get Application")
                //////console.log(data)
                //////console.log("End Get Application")
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
                    console.log(this.state.addressAutocomplete)
                }
            })
    }

    onChangeMemberNameList = (e) => {
        if(e.length == 0) {
            this.state.selectedApplicationId	=   ""
            return
        }
        this.state.selectedApplicationId	    =   e[0].id
        this.setState({
            isshow:false,
        })
 
    }

    onChangeCurrentAddress = (e) => {
        if(e.length == 0) {
            this.state.selectedCurrentAddressId	=   ""
            return
        }
        this.state.selectedCurrentAddressId	    =   e[0].city
        this.setState({
            isshow:false,
        })
 
    }

    getPositionName() {
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
            const data = res.data
            if(data.status=="1")
                this.setState({getEmployeesCoordinatorList : data.employees,isloading:false}) 
            else
                this.setState({getEmployeesCoordinatorList : [],isloading:false}) 
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

    GetPreliminaryInterview() {
        this.setState({ preliminaryList:[], isloading:true })

        const preliminaryParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ProfileId":"",
            "PositionId":"",
            "StatusId":"4",
            "ReferenceNo":"",
            "StoreOperataionId":""
        };
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetPreliminaryInterviews",  preliminaryParams)
            .then(res => {
                const data = res.data;
                ////console.log("preliminary");
                ////console.log(data);
                this.setState({ preliminaryList: data.preliminaryInterviews , isloading:false});
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

    handleCoverChangeAssessedBy= (e) => {
            if (e.length > 0) {
            this.state.selectedAssessedBy = e[0].name
            this.state.selectedAssessedById = e[0].id
        } else {
            this.state.selectedAssessedBy = ""
            this.state.selectedAssessedById = ""
        }
        this.setState({
            isshow:false,
        })
    }

    onChangeAssessedBy(e){
        this.setState({assessedBy : e.target.value,
            isshow:false,
        });
        // ////console.log(e.target.value)
    }


    GetDataReferences() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0002"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Position Name");
            //console.log(data);
            this.setState({ 
                bodyBuiltList  : data.dataReferences, 
                complexionList : data.dataReferences,
                hairList : data.dataReferences,
                postureList: data.dataReferences,
                personalityList: data.dataReferences,
                mentalList: data.dataReferences,
                workExperienceList: data.dataReferences
            });
        })
        
    }

    GetDataPreFinal() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0003"
        };
        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            ////console.log("Get pre final");
            ////console.log(data);
            this.setState({ preFinalList  : data.dataReferences});
        })
        
    } 

    GetDataAssessment() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0005"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            ////console.log("Get assess");
            ////console.log(data);
            this.setState({ assessmentlList  : data.dataReferences});
        })
        
    } 

    handleCoverChangeAssessment= (e) => {
            if (e.length > 0) {
            this.state.selectedAssessment = e[0].name
            this.state.selectedAssessmentId = e[0].id
        } else {
            this.state.selectedAssessment = ""
            this.state.selectedAssessmentId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    GetSupportGroup() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0004"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            // ////console.log("Get assess");
            // ////console.log(data);
            this.setState({ supportGroupList  : data.dataReferences});
        })
        
    } 

    handleCoverChangeSupportGroup= (e) => {
            if (e.length > 0) {
            this.state.selectedSupportGroup = e[0].name
            this.state.selectedSupportGroupId = e[0].id
        } else {
            this.state.selectedSupportGroup = ""
            this.state.selectedSupportGroupId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    GetTechnicalExperience() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0002"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ technicalExperienceList  : data.dataReferences});
        })
        
    } 

    handleCoverChangeTechnicalExperience = (e) => {
            if (e.length > 0) {
            this.state.selectedTechnicalExperience = e[0].name
            this.state.selectedTechnicalExperienceId = e[0].id
        } else {
            this.state.selectedTechnicalExperience = ""
            this.state.selectedTechnicalExperienceId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    GetStoreOperation() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0006"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ storeOperationList  : data.dataReferences});
        })
        
    } 

    handleCoverChangeStoreOperation = (e) => {
            if (e.length > 0) {
            this.state.selectedStoreOperation = e[0].name
            this.state.selectedStoreOperationId = e[0].id
        } else {
            this.state.selectedStoreOperation = ""
            this.state.selectedStoreOperationId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangeBodyBuilt = (e) => {
            if (e.length > 0) {
            this.state.selectedBodyBuilt = e[0].name
            this.state.selectedBodyBuiltId = e[0].id
        } else {
            this.state.selectedBodyBuilt = ""
            this.state.selectedBodyBuiltId = ""
        }

        this.setState({
            isshow:false,
        })

        /* if(this.state.selectedBodyBuiltId == 1) {
            //console.log("1")
        } */
    }


    handleCoverChangeHair = (e) => {
            if (e.length > 0) {
            this.state.selectedHair = e[0].name
            this.state.selectedHairId = e[0].id
        } else {
            this.state.selectedHair = ""
            this.state.selectedHairId = ""
        }
        this.setState({
            isshow:false,
        })
    }
    handleCoverChangeComplexion = (e) => {
            if (e.length > 0) {
            this.state.selectedComplexion = e[0].name
            this.state.selectedComplexionId = e[0].id
        } else {
            this.state.selectedComplexion = ""
            this.state.selectedComplexionId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangePosture = (e) => {
            if (e.length > 0) {
            this.state.selectedPosture = e[0].name
            this.state.selectedPostureId = e[0].id
        } else {
            this.state.selectedPosture = ""
            this.state.selectedPostureId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangePersonality = (e) => {
            if (e.length > 0) {
            this.state.selectedPersonality = e[0].name
            this.state.selectedPersonalityId = e[0].id
        } else {
            this.state.selectedPersonality = ""
            this.state.selectedPersonalityId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangeMental = (e) => {
            if (e.length > 0) {
            this.state.selectedMental = e[0].name
            this.state.selectedMentalId = e[0].id
        } else {
            this.state.selectedMental = ""
            this.state.selectedMentalId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangeWorkExprience = (e) => {
            if (e.length > 0) {
            this.state.selectedWorkExperience = e[0].name
            this.state.selectedWorkExperienceId = e[0].id
        } else {
            this.state.selectedWorkExperience = ""
            this.state.selectedWorkExperienceId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangeEducationAttainment = (e) => {
            if (e.length > 0) {
            this.state.selectedEducationAttainment = e[0].name
            this.state.selectedEducationAttainmentId = e[0].id
        } else {
            this.state.selectedEducationAttainment = ""
            this.state.selectedEducationAttainmentId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleCoverChangePreFinal = (e) => {
            if (e.length > 0) {
            this.state.selectedPreFinal = e[0].name
            this.state.selectedPreFinalId = e[0].id
        } else {
            this.state.selectedPreFinal = ""
            this.state.selectedPreFinalId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    onChangeWorkExperienceYear(e){
        // ////console.log(e)
        /* this.setState({workExperienceYear:e.target.value,
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({workExperienceYear: e.target.value})
        }
    }

    onChangeWorkExperienceMonths(e){
        // ////console.log(e)
        /* this.setState({workExperienceMonths:e.target.value,
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({workExperienceMonths: e.target.value})
        }
    }
    onChangeComments(e){
        // ////console.log(e)
        this.setState({comments:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeFreshGraduate= (e) => {
        // ////console.log(e)
        this.state.freshGraduate = e.target.checked
        if(this.state.freshGraduate == true)
        this.setState({
            withWorkExperience : false,
            workExperienceYear : "0",
            workExperienceMonths : "0",
            isshow:false,
        })
    }

    onChangeWithWorkExperience= (e) => {
        // ////console.log(e)
        this.state.withWorkExperience = e.target.checked
        if(this.state.withWorkExperience == true)
        this.setState({
            freshGraduate : false,
            workExperienceYear : "",
            workExperienceMonths : "",
            isshow:false,
        })
    }


    handleSaveClick = event => {

        const preliminaryParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ApplicationFormId":this.state.selectedApplicationId,
            "EducationalId":this.state.selectedEducationAttainmentId,
            "IsFreshGrad":(this.state.freshGraduate)? "1" : "0",
            "WorkExperienceMonths":this.state.workExperienceMonths,
            "WorkExperienceYears":this.state.workExperienceYear,
            "WithWorkExperience":(this.state.withWorkExperience)? "1" : "0",
            "BodyBuiltId":this.state.selectedBodyBuiltId,
            "HairId":this.state.selectedHairId,
            "ComplexionId":this.state.selectedComplexionId,
            "PostureId": this.state.selectedPostureId,
            "PersonalityId":this.state.selectedPersonalityId,
            "MentalId":this.state.selectedMentalId,
            "WorkExperienceId":this.state.selectedWorkExperienceId,
            "TechnicalExperienceId":this.state.selectedTechnicalExperienceId,
            "SupportGroupId":this.state.selectedSupportGroupId,
            "AssessmentId":this.state.selectedAssessmentId,
            "Comments":this.state.comments,
            "RecommendationId":this.state.selectedPreFinalId,
            "AssessedBy":this.state.selectedAssessedById,
            "StoreOperationId":this.state.selectedStoreOperationId,
            "StatusId":"1"
        }
        // ////console.log(preliminaryParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddPreliminaryInterview",  preliminaryParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("Get data");
                ////console.log(data)
                this.setState({isloading:false})

                    var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isloading:false,
                        AlertType:"Success!",
                        show:true,
                        Color:alertType,
                        Message:data.message ,
                        Fade:true
                    });
            })
            .catch(error=>{
                this.setState(
                {
                    isloading:false,
                    AlertType:"Error! ",
                    Show:true,
                    Color:"danger",
                    Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    Fade:true
            })
        })

    }

    handleSubmitClick = event => {
        this.setState({isloading:false});


        if(!this.state.selectedClientId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Client",
                fade:true
            });
            return
        }

        if(!this.state.selectedApplicationId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Full Name",
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
                message: "Please select Position",
                fade:true
            });
            return
        }

        if(!this.state.selectedCurrentAddressId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Current Address",
                fade:true
            });
            return
        }

        /* if(this.state.freshGraduate == false || this.state.withWorkExperience == false) {
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Fresh Graduate or With Work Experience",
                fade:true
            });
            return
        } */

        if(this.state.withWorkExperience == true) {
            if(this.state.workExperienceYear == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Work Experience Year",
                    fade:true
                });
                return
            }

            if(this.state.workExperienceMonths == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Work Experience Months",
                    fade:true
                });
                return
            }

        }

        if(!this.state.selectedBodyBuiltId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Body Build",
                fade:true
            });
            return
        }

        if(!this.state.selectedHairId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Hair",
                fade:true
            });
            return
        }

        if(!this.state.selectedComplexionId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Complexion",
                fade:true
            });
            return
        }

        if(!this.state.selectedPostureId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Posture",
                fade:true
            });
            return
        }

        if(!this.state.selectedPersonalityId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Personality",
                fade:true
            });
            return
        }

        if(!this.state.selectedMentalId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Mental",
                fade:true
            });
            return
        }

        if(!this.state.selectedEducationAttainmentId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Education Attainment",
                fade:true
            });
            return
        }

        if(!this.state.selectedWorkExperienceId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Work Experience",
                fade:true
            });
            return
        }

        if(!this.state.selectedTechnicalExperienceId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Technical Experience",
                fade:true
            });
            return
        }

        if(!this.state.selectedStoreOperationId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Store Operation",
                fade:true
            });
            return
        }

        if(!this.state.selectedSupportGroupId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Support Group",
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
                message: "Please enter Comments",
                fade:true
            });
            return
        }

        if(!this.state.selectedAssessmentId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Assessment",
                fade:true,
            });
            return
        }

        if(!this.state.selectedPreFinalId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Pre Final Recommendation",
                fade:true
            });
            return
        }

        const submitParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ApplicationFormId":this.state.selectedApplicationId,
            "EducationalId":this.state.selectedEducationAttainmentId,
            "IsFreshGrad":(this.state.freshGraduate)? "1" : "0",
            "WorkExperienceMonths":this.state.workExperienceMonths,
            "WorkExperienceYears":this.state.workExperienceYear,
            "WithWorkExperience":(this.state.withWorkExperience)? "1" : "0",
            "BodyBuiltId":this.state.selectedBodyBuiltId,
            "HairId":this.state.selectedHairId,
            "ComplexionId":this.state.selectedComplexionId,
            "PostureId": this.state.selectedPostureId,
            "PersonalityId":this.state.selectedPersonalityId,
            "MentalId":this.state.selectedMentalId,
            "WorkExperienceId":this.state.selectedWorkExperienceId,
            "TechnicalExperienceId":this.state.selectedTechnicalExperienceId,
            "SupportGroupId":this.state.selectedSupportGroupId,
            "AssessmentId":this.state.selectedAssessmentId,
            "Comments":this.state.comments,
            "RecommendationId":this.state.selectedPreFinalId,
            "AssessedBy":this.state.selectedAssessedById,
            "StoreOperationId":this.state.selectedStoreOperationId,
            "StatusId":"3"
        }
        console.log(submitParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddPreliminaryInterview",  submitParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("Get data");
                ////console.log(data)
                this.setState({isloading:false})

                    var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isloading:false,
                        AlertType:"Success!",
                        show:true,
                        Color:alertType,
                        Message:data.message ,
                        Fade:true,
                        navigate    :   true
                    });
            })
            .catch(error=>{
                this.setState(
                {
                    isloading:false,
                    AlertType:"Error! ",
                    Show:true,
                    Color:"danger",
                    Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    Fade:true
            })
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
                        <Card.Header>RECRUITMENT >> PRELIMINARY INTERVIEWS (CREATE)</Card.Header>
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
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeClientList}
                                                options={this.state.clientAutocomplete}
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        FULL NAME
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.onChangeMemberNameList}
                                                options={this.state.memberNameAutocomplete}
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        POSITION
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePositionList}
                                                options={this.state.positionAutocomplete}
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        CURRENT ADDRESS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='city'
                                                id="basic-example"
                                                onChange={this.onChangeCurrentAddress}
                                                options={this.state.addressAutocomplete}
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="3">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="FRESH GRADUATE?" 
                                                name="freshGraduate"
                                                checked={this.state.freshGraduate}
                                                onChange={this.onChangeFreshGraduate}
                                                style={{fontWeight : "bold"}}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="3">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="WITH WORK EXPERIENCE?" 
                                                name="withWorkExperience"
                                                checked={this.state.withWorkExperience}
                                                onChange={this.onChangeWithWorkExperience}
                                                style={{fontWeight : "bold"}}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        WORK EXPERIENCE YEARS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                type="text"
                                                name="workExperienceYear"
                                                value={this.state.workExperienceYear}
                                                onChange={this.onChangeWorkExperienceYear} 
                                                autoComplete="off"
                                                maxLength="3"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        WORK EXPERIENCE MONTHS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                type="text"
                                                name="workExperienceMonths"
                                                value={this.state.workExperienceMonths}
                                                onChange={this.onChangeWorkExperienceMonths} 
                                                autoComplete="off"
                                                maxLength="3"
                                            />
                                        </Col>
                                    </Form.Group>

                                <Card className="mt-3">
                                    <Card.Header>APPEARANCE</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            BODY BUILT
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeBodyBuilt}
                                                    options={this.state.bodyBuiltList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                            <Col sm="2">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            HAIR
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeHair}
                                                    options={this.state.hairList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            COMPLEXION
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeComplexion}
                                                    options={this.state.complexionList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                            <Col sm="2">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            POSTURE
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangePosture}
                                                    options={this.state.postureList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <Card className="mt-3">
                                    <Card.Header>PERSONALITY</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            PERSONALITY
                                            </Form.Label>
                                            <Col sm="10">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangePersonality}
                                                    options={this.state.personalityList}
                                                    type="text" 
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <Card className="mt-3">
                                    <Card.Header>MENTAL/EDUCATIONAL/PROFESSIONAL</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            MENTAL
                                            </Form.Label>
                                            <Col sm="10">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeMental}
                                                    options={this.state.mentalList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <Card className="mt-3">
                                    <Card.Header>EDUCATION</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            EDUCATION ATTAINMENT
                                            </Form.Label>
                                            <Col sm="10">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeEducationAttainment}
                                                    options={this.state.educationAttainmentList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <Card className="mt-3">
                                    <Card.Header>PROFESSIONAL/WORK EXPERIENCE</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            WORK EXPERIENCE
                                            </Form.Label>
                                            <Col sm="10">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeWorkExprience}
                                                    options={this.state.workExperienceList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <Card className="mt-3">
                                    <Card.Header>TECHNICAL EXPERIENCE/REQUIREMENTS</Card.Header>
                                    <Card.Body>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            TECHNICAL EXPERIENCE
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeTechnicalExperience}
                                                    options={this.state.technicalExperienceList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                            <Col sm="2">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            STORE OPERATIONS
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeStoreOperation}
                                                    options={this.state.storeOperationList}
                                                    type="text" 
                                                /> 
                                            </Col>
                                        </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        SUPPORT GROUPS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeSupportGroup}
                                                options={this.state.supportGroupList}
                                                type="text" 
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        COMMENTS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                type="text"
                                                name="comments"
                                                value={this.state.comments}
                                                onChange={this.onChangeComments} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        ASSESSMENT
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeAssessment}
                                                options={this.state.assessmentlList}
                                                type="text" 
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        PRE FINAL RECOMMENDATION
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangePreFinal}
                                                options={this.state.preFinalList}
                                                type="text" 
                                            /> 
                                        </Col>
                                    </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            ASSESSED BY
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control 
                                                    type="text" 
                                                    autoComplete="off" 
                                                    /* name="selectedClient" */
                                                    value={this.state.userinfo.fullName}
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>

                                <ButtonToolbar className="mt-4">
                                    <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>
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

export  default PreliminaryInterviewsCreate