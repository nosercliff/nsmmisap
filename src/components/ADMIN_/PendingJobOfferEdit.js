import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class PendingJobOfferEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            userinfo: [],
            isLoading: true,
            AlertType: "",
            Show: false,
            Message: "",
            Color: "",
            Fade: true,

            taxTypeList:[
                {"name":"TAX TABLE","id":"0"},
                {"name":"FINAL TAX","id":"1"},
            ],
            taxTypeId:"",
            taxType:"",
            newjobOfferList:[],
            taxExemptionList:[
                {"name":"ZERO EXEMPTION","id":"0"},
                {"name":"SINGLE","id":"1"},
                {"name":"MARRIED","id":"2"},
                {"name":"MARRIED WITH ONE DEPENDENT","id":"3"},
                {"name":"SINGLE WITH ONE DEPENDENT","id":"4"},
                {"name":"MARRIED WITH TWO DEPENDENT","id":"5"},
                {"name":"SINGLE WITH TWO DEPENDENT","id":"6"},
                {"name":"MARRIED WITH THREE DEPENDENT","id":"7"},
            ],
            alphanumericTaxCode:"",
            taxExemption:"",
            taxExemptionId:"",
            deductionBasisList:[
                {"name":"GROSS PAY","id":"0"},
                {"name":"BASIC PAY","id":"1"},
            ],
            basisSSSId:"",
            basisSSS:"",
            deductionBasisHDMFList:[
                {"name":"GROSS PAY","id":"0"},
                {"name":"BASIC PAY","id":"1"},
            ],
            deductionBasisHDMF:"",
            deductionBasisHDMFId:"",
            basisFor13thMonthList:[
                {"name":"INTERNAL","id":"0"},
                {"name":"DEPLOYED","id":"1"},
            ],
            basisFor13thMonthId:"",
            basisFor13thMonth:"",
            basisPHICId:"",
            basisPHIC:"",
            clientList:[],
            workingDaysPerMonth:"",
            workingDaysPerYear:"",
            selectedNotedBy:"",
            selectedNotedById:"",
            selectedPreparedById:"",
            selectedPreparedBy:"",
            selectedApproveById:"",
            selectedApproveBy:"",
            selectedConforme:"",
            TaxExemptionId:"",
            TaxExemption:"",
            getEmployeesCoordinatorList:[],
            employeeStatusTypeAutocomplete:[],
            clientList:[],
            positionList:[],
            locationList:[],
            selectedLocation:"",
            selectedLocationId:"",
            getPayTypesList:[],
            getPayModesList:[],
            getPayCardTypesList:[],
            selectedDateOfBirth:"",
            selectedProfileId:"",
            selectedJobOfferId:"",
            navigate    : false,
            filterJobList:[],
            selectedClient:"",
            selectedClientId:"",
            selectedApplicationFormId:"",
            selectedJobPosition:"",
            jobOfferList:[],
            applicationList:[],
            membersDate:"",
            IsBranch: false,
            OptimizeBasicPay: false,
            employeeStatusTypeId:"",
            employeeStatusType:"",
            selectedEducationAttainment:"",
            selectedSalaryOffered:"",
            contractDateStart:new Date(),
            contractDateEnd:new Date(),
            payType:"",
            selectedEmployeePayTypesId:"",
            selectedEmployeePayMode:"",
            selectedEmployeePayModesId:"",
            payCardType:"",
            selectedPayCardTypeId:"",
            selectedPayCardNumber:"",
            dateHired: new Date(),
            selectedTmnPtofileid:"",
            selectedSEA:"",
            selectedECOLA:"",
            selectedCOLA:"",
            clientLocationList: [],


        }
       
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
            this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
            //this.GetJobOffers(); 
            this.getEmployeesCoordinator();
            this. getEmployeeStatusList();
            this.getClient();
            //this. getLocation();
            this. GetEmployeePayTypesList();
            this. GetEmployeePayModesList();
            //this.GetPayCardTypes();

            this.state.dateOfBirth = this.props.location.params.data.dateOfBirth
            this.state.selectedFullName = this.props.location.params.data.memberName
            this.state.selectedFullNameId = this.props.location.params.data.memberName
            this.state.selectedDateOfBirth = this.props.location.params.data.dateOfBirth
            this.state.selectedApplicationFormId= this.props.location.params.data.applicationFormId
            this.state.selectedProfileId = this.props.location.params.data.profileId
            this.state.selectedJobOfferId= this.props.location.params.data.id
            this.state.selectedClient = this.props.location.params.data.client
            this.state.selectedClientId = this.props.location.params.data.clientId
            this.state.selectedJobPosition = this.props.location.params.data.position
            this.state.selectedJobPositionId =this.props.location.params.data.positionId
            this.state.selectedSalaryOffered = this.props.location.params.data.salaryOffered
            this.state.selectedECOLA = this.props.location.params.data.ecolaValue
            this.state.selectedSEA = this.props.location.params.data.seaValue
            this.state.selectedCOLA = this.props.location.params.data.colaValue
            this.state.workingDaysPerYear = this.props.location.params.data.workingDaysPerYear
            this.state.workingDaysPerMonth = this.props.location.params.data.workingDaysPerMonth
            this.state.selectedConforme = this.props.location.params.data.conforme
            this.state.selectedPayCardNumber = this.props.location.params.data.payCardNumber
            this.state.basisFor13thMonth = this.props.location.params.data.basisFor13thMonth
            this.state.basisFor13thMonthId = this.props.location.params.data.basisFor13thMonthId
            this.state.basisPHIC = this.props.location.params.data.deductionBasisPHIC
            this.state.basisPHICId = this.props.location.params.data.deductionBasisPHICId
            this.state.basisSSS = this.props.location.params.data.deductionBasisSSS
            this.state.basisSSSId = this.props.location.params.data.deductionBasisSSSId
            this.state.deductionBasisHDMF = this.props.location.params.data.deductionBasisHDMF
            this.state.deductionBasisHDMFId = this.props.location.params.data.deductionBasisHDMFId
            this.state.TaxExemptionId = this.props.location.params.data.taxExemptionTypeId
            this.state.selectedNotedBy = this.props.location.params.data.notedBy
            this.state.selectedNotedById = this.props.location.params.data.notedById
            this.state.taxTypeId = this.props.location.params.data.taxTypeId
            this.state.selectedPreparedBy = this.props.location.params.data.preparedBy
            this.state.selectedApproveBy = this.props.location.params.data.approvedBy
            this.state.selectedApproveById = this.props.location.params.data.approvedById
            this.state.employeeStatusTypeId = this.props.location.params.data.employeeStatusTypeId
            this.state.employeeStatusType = this.props.location.params.data.employeeStatusType
            this.state.selectedEducationAttainment = this.props.location.params.data.selectedEducationAttainment
            this.state.selectedTmnPtofileid = this.props.location.params.data.tmnProfileId
            this.state.alphanumericTaxCode = this.props.location.params.data.taxCode
            this.state.selectedConforme = this.props.location.params.data.memberName
            this.state.selectedLocationName=this.props.location.params.data.location
           this.state.dateHired = new Date(this.props.location.params.data.dateHired)
           this.state.contractDateStart = new Date(this.props.location.params.data.contractDateStart)
           this.state.contractDateEnd = new Date(this.props.location.params.data.contractDateEnd)
           
           this.state.selectedEmployeePayModesId = this.props.location.params.data.payModeId
           this.state.selectedEmployeePayTypesId = this.props.location.params.data.payTypeId
           this.state.selectedPayCardTypeId = this.props.location.params.data.payCardTypeId
           this.state.selectedLocationId = this.props.location.params.data.locationId

        sleep(1000).then(() => {
            this.setState({isloading:false})
            this.GetFilterJobList();
            })
            console.log("this.props.location.params.data")
          console.log(this.props.location.params.data)
    }


    GetFilterJobList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/GetJobOfferFilter", getParams)
            .then(res => {
                console.log("Get filter List ");
                console.log(res.data);
                const data = res.data;
                this.setState({
                    filterJobList : res.data.jobOffers});

                    
            })

    }

    onChangeClient(e){
        this.setState({selectedClient : e.target.value})
        //console.log(e.target.value)
    }

    onChangeJobPosition(e){
        this.setState({selectedJobPosition : e.target.value})
        //console.log(e.target.value)
    }


    handleCoverChangeFullName = (e) => {
        //console.log(e)
        /* if (e.length > 0) {
            
            this.setState   ({
                selectedFullName: null, 
                selectedFullNameId:"",selectedClient:'' ,dateOfBirth:'',selectedLocationName:"",
                selectedClientId:'', selectedProfileId: '', selectedLocationId:'',selectedLocation:"",
                selectedApplicationFormId:'', selectedJobPosition:'',selectedJobPositionId:'',
                basisHDMF:'',selectedSalaryOffered:'',selectedDateOfBirth:'',
                selectedECOLA:'',selectedSEA:'',selectedCOLA:'',basisSSS:'',
                workingDaysPerYear:'',workingDaysPerMonth:'',deductionBasisHDMF:'',
                selectedConforme:'',basisFor13thMonthId:'',basisPHIC:'',
                TaxExemptionId:'',selectedPayCardNumber:'',basisFor13thMonthId:'',
                contractDateEnd:'',contractDateStart:'',selectedApproveBy:'',
                employeeStatusType:'',selectedEducationAttainment:'',
                taxTypeId:'',selectedNotedBy:'',selectedPreparedBy:'',
                selectedTmnPtofileid:'',alphanumericTaxCode:'',selectedEmployeePayModesId:'',selectedPayCardTypeId:'',
                selectedEmployeePayTypesId:'',selectedProfileId:'',selectedJobOfferId:'',dateHired:"",
                contractDateStart:"",contractDateEnd:"",selectedPreparedById:""


            })
            

        } else {
            this.state.dateOfBirth = this.props.location.params.data.dateOfBirth
            this.state.selectedFullName = this.props.location.params.data.memberName
            this.state.selectedFullNameId = this.props.location.params.data.memberName
            this.state.selectedDateOfBirth = this.props.location.params.data.dateOfBirth
            this.state.selectedApplicationFormId= this.props.location.params.data.applicationFormId
            this.state.selectedClient = this.props.location.params.data.client
            this.state.selectedClientId = this.props.location.params.data.clientId
            this.state.selectedProfileId = this.props.location.params.data.profileId
            this.state.selectedJobOfferId= this.props.location.params.data.id
            this.state.selectedJobPosition = this.props.location.params.data.position
            this.state.selectedJobPositionId =this.props.location.params.data.positionId
            this.state.selectedSalaryOffered = this.props.location.params.data.salaryOffered
            this.state.selectedECOLA = this.props.location.params.data.ecolaValue
            this.state.selectedSEA = this.props.location.params.data.seaValue
            this.state.selectedCOLA = this.props.location.params.data.colaValue
            this.state.workingDaysPerYear = this.props.location.params.data.workingDaysPerYear
            this.state.workingDaysPerMonth = this.props.location.params.data.workingDaysPerMonth
            this.state.selectedConforme = this.props.location.params.data.conforme
            this.state.basisFor13thMonthId = this.props.location.params.data.basisFor13thMonth
            this.state.basisPHIC = this.props.location.params.data.deductionBasisPHIC
            this.state.deductionBasisHDMF = this.props.location.params.data.deductionBasisHDMF
            this.state.basisSSS = this.props.location.params.data.deductionBasisSSS
            this.state.selectedPayCardNumber = this.props.location.params.data.payCardNumber
            this.state.TaxExemptionId = this.props.location.params.data.taxExemptionTypeId
            this.state.taxTypeId = this.props.location.params.data.taxTypeId
            this.state.selectedNotedBy = this.props.location.params.data.notedBy
            this.state.selectedPreparedBy = this.props.location.params.data.preparedBy
            this.state.selectedApproveBy = this.props.location.params.data.approvedBy
            this.state.employeeStatusType = this.props.location.params.data.employeeStatusType
            this.state.employeeStatusTypeId = this.props.location.params.data.employeeStatusTypeId
           this.state.selectedEducationAttainment = this.props.location.params.data.selectedEducationAttainment
           this.state.selectedTmnPtofileid = this.props.location.params.data.tmnProfileId
           this.state.alphanumericTaxCode = this.props.location.params.data.taxCode
           this.state.selectedConforme = this.props.location.params.data.memberName
           this.state.dateHired = new Date(this.props.location.params.data.dateHired)
           this.state.contractDateStart = new Date(this.props.location.params.data.contractDateStart)
           this.state.contractDateEnd = new Date(this.props.location.params.data.contractDateEnd)

           this.state.selectedEmployeePayModesId = this.props.location.params.data.payModeId
           this.state.selectedEmployeePayTypesId = this.props.location.params.data.payTypeId
           this.state.selectedPayCardTypeId = this.props.location.params.data.payCardTypeId
           this.state.selectedLocationId = this.props.location.params.data.locationId
           

        } */
    }  

    formatDate(date) {
        let m = moment(date).format("MM/dd/yyyy");
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
        }
   
        handleChangeMembersDate = date => {
            ////console.log(date)
            this.setState({
                dateHired: date
            });
        }
    
        handleChangeContractDateStart = date => {
            ////console.log(date)
            this.setState({
                contractDateStart: date
            });
        }
        handleChangeContractDateEnd= date => {
            ////console.log(date)
            this.setState({
                contractDateEnd: date
            });
        }
    
   
        onChangeFullName(e){
            //console.log(e.target.value)
            this.setState({selectedFullName : e.target.value})
           
        }
    

    handleChangeIsDefaultBranch  = (e) =>{
        //console.log(e)
        this.setState({
            IsBranch: e.target.checked
        })
    }

    handleChangeOptimizeBasicPay= (e) =>{
        //console.log(e)
        this.setState({
            OptimizeBasicPay: e.target.checked
        })
    }

    onChangeEducationAttainment(e){
        //console.log(e.target.value)
        this.setState({selectedEducationAttainment : e.target.value})
       
    }

    onChangeSalaryOffered(e){
        this.setState({selectedSalaryOffered : e.target.value})
       //console.log(e.target.value)
    }

//****** PAY TYPE START*/

    GetEmployeePayTypesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollTypes", getParams)
            .then(res => {
                //console.log("Get Employee Payroll Types List ");
                //console.log(res.data);
                this.setState({
                    getPayTypesList : res.data.payrollTypes
                })
            })
    
    }
       
    handleCoverChangeEmployeesPayTypesList = (e) => {
        if(e.length==0) return;
            this.setState({ selectedEmployeePayTypesId: e[0].id });
        
    }
    

    // handleCoverChangePayType= (e) => {
    //     console.log( this.state.payTypeId)
    //     if(e.length > 0) {
    //         this.state.payType =  e[0].name
    //         this.state.payTypeId =  e[0].id 
    //     }
    //     else{
    //         this.state.payType = ""
    //         this.state.payTypeId = ""  
    //     }
    // }


//****** PAY TYPE END*/


// ******    PAY MODE START *****

    GetEmployeePayModesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollModes", getParams)
            .then(res => {
                //console.log("Get Employee Payroll Modes List ");
                //console.log(res.data);
                this.setState({
                    getPayModesList : res.data.payrollModes
                })
            })
    
    }

 

    onChangeEmployeesPayModesList = (e) => {

        if(e.length==0) {
            this.setState({ selectedEmployeePayModesId: '', selectedEmployeePayMode:'' });
            return;
        }
        this.setState({selectedEmployeePayModesId: e[0].id, selectedEmployeePayMode: e[0].name})
        
    }
 
    // ******    PAY MODE END *****

    // ******    PAY CARD TYPE START *****


    onChangePayCardType = (e) => {
        if(e.length == 0) {
            this.state.selectedPayCardTypeId=""
            return
        } 
        this.state.selectedPayCardTypeId = e[0].id
        
    }

    GetPayCardTypes(){
        
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPayCardTypes", getParams)
        .then(res => {
            //console.log("Get Pay Card Types List Data")
            //console.log(res.data)
            const data = res.data
            this.setState(
                {
                    isloading:false,
                    getPayCardTypesList : data.payCardTypes 
                });
                
        })
        
    }

    // ******    PAY MODE END *****

    onChangePayCardNumber(e){
        this.setState({selectedPayCardNumber : e.target.value})
       //console.log(e.target.value)
    }

    onChangeTmnPtofileid(e){
        //console.log(e.target.value)
        this.setState({
            selectedTmnPtofileid: e.target.value
        })
    }

    onChangeSEA(e){
        //console.log(e.target.value)
        this.setState({selectedSEA: e.target.value
        })
    }

    onChangeECOLA(e){
        //console.log(e.target.value)
        this.setState ({selectedECOLA: e.target.value
        })
    }
    
    onChangeCOLA(e){
        //console.log(e.target.value)
        this.setState({
            selectedCOLA: e.target.value
        })
    }

    onChangeAlphanumericCode(e){
        //console.log(e.target.value)
        this.setState({
            alphanumericTaxCode: e.target.value
        })
    }

    onChangeWorkingDays(e){
        //console.log(e.target.value)
        this.setState({
            workingDaysPerMonth: e.target.value
        })
    }

    onChangeWorkingDaysPerYear(e){
        //console.log(e.target.value)
        this.setState({
            workingDaysPerYear: e.target.value
        })
    }

    onChangeConforme(e){
        //console.log(e.target.value)
        this.setState({
            selectedConforme: e.target.value
        })
    }


    handleCoverChangeEmployeeStatusType= (e) => {
        console.log(this.state.employeeStatusTypeId)
        if(e.length > 0) {
            this.state.employeeStatusType = e[0].name
            this.state.employeeStatusTypeId = e[0].id
        }
        else{
            this.state.employeeStatusType = ""
            this.state.employeeStatusTypeId = ""
            
            }   
    }
    

    handleCoverChangeTaxType= (e) => {
        console.log(this.state.taxTypeId)
        if(e.length > 0) {
            this.state.taxType = e[0].name
            this.state.taxTypeId = e[0].id
        }
        else {
            this.state.taxType = ""
            this.state.taxTypeId = ""
       
        }
    }

    handleCoverChangeDeductionBasisSSS= (e) => {
        //console.log(e)
        if(e.length > 0) {
            this.state.basisSSS = e[0].name
            this.state.basisSSSId = e[0].id
        }else{
            this.state.basisSSS = ""
            this.state.basisSSSId = ""
        }
    }

    handleCoverChangeDeductionBasisHDMF= (e) => {
        //console.log(e)
        if(e.length > 0) {
            this.state.deductionBasisHDMF = e[0].name
            this.state.deductionBasisHDMFId = e[0].id
        }else{
            this.state.deductionBasisHDMF = ""
            this.state.deductionBasisHDMFId = ""
        }
    }

    handleCoverChangeDeductionBasisPHIC= (e) => {
        //console.log(e)
        if(e.length > 0) {
            this.state.basisPHIC = e[0].name
            this.state.basisPHICId = e[0].id
        }else{
            this.state.basisPHIC = ""
            this.state.basisPHICId = ""
        }
    }

    handleCoverChangeBasisfor13thMonth= (e) => {
        //console.log(e)
        if(e.length > 0) {
            this.state.basisFor13thMonth = e[0].name
            this.state.basisFor13thMonthId = e[0].id
        }else{
            this.state.basisFor13thMonth = ""
            this.state.basisFor13thMonthId = ""
        }
    }

    onChangeClient(e){
        this.setState({selectedClient : e.target.value})
       //console.log(e.target.value)
    }

    handleCoverChangeNotedBy= (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedNotedBy = e[0].name
            this.state.selectedNotedById = e[0].id
        } else {
            this.state.selectedNotedBy = ""
            this.state.selectedNotedById = ""
        }
    }

    handleCoverChangePreparedBy= (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedPreparedBy = e[0].name
            this.state.selectedPreparedById = e[0].id
        } else {
            this.state.selectedPreparedBy = ""
            this.state.selectedPreparedById = ""
        }
    }

    handleCoverChangeApproveBy= (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedApproveBy = e[0].name
            this.state.selectedApproveById = e[0].id
        } else {
            this.state.selectedApproveBy = ""
            this.state.selectedApproveById = ""
        }
    }

    handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient = e[0].client
            this.state.selectedClientId = e[0].clientId
        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = ""
        }
             
        console.log(this.state.selectedClient);
        console.log(this.state.selectedClientId);
    }

    // handleCoverChangeLocation = (e) => {
    //     if (e.length > 0) {
    //         this.state.selectedLocation = e[0].name
    //         this.state.selectedLocationId = e[0].id
    //     } else {
    //         this.state.selectedLocation = ""
    //         this.state.selectedLocationId = ""
    //     }
            
    // }
// *******   LOCATION START*****
    GetLocation(name) {
        //console.log("Client ID List ");
        let GetLocationName = ''
        for (let i = 0; i <= this.state.clientLocationList.length; i++) {
            if (this.state.clientLocationList[i]["name"] === name) {
                GetLocationName = this.state.clientLocationList[i]['id']; 
                //console.log(GetLocationName);
                break;
            }
        }
        return GetLocationName
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
            this.setState({clientLocationList : res.data.locations ? res.data.locations : []})
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
    
    onChangeLocation = (e) => {
        if(e.length == 0) {
                this.state.selectedLocationName = ""
                this.state.selectedLocationId = ""
                return
        }  
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId = e[0].id
    }

// *******   LOCATION END*****

   

    handleCoverChangeTaxExemption= (e) => {
        //console.log(e)
        if (e.length > 0) {
            this.state.TaxExemption = e[0].name
            this.state.TaxExemptionId = e[0].id
        } else {
            this.state.TaxExemption = ""
            this.state.TaxExemptionId = ""
        }
             
        //console.log(this.state.selectedClient);
       
    }


    getEmployeeStatusList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetEmployeeStatusTypes", getParams)
            .then(res => {
                //console.log("Get Employee Status List ");
                //console.log(res.data);
                this.setState({
                    employeeStatusTypeAutocomplete : res.data.statusTypes
                })
            })
    
    }

    GetPosition() {
        const positionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1",
            "SectionId":"",
            "DepartmentId":"",
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Position Name");
            //console.log(data);
            this.setState({ positionList  : data.positions });
        })
        
    }
    getEmployeesCoordinator(){
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
            //console.log("Coordinator List Autocomplete");
            //console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({getEmployeesCoordinatorList : data.employees,isloading:false}) 
            else
                this.setState({getEmployeesCoordinatorList : [],isloading:false}) 
        })
        
    }

    getClient(){
        //console.log("getClient");
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
                    //  //console.log("Get 5");
                     //console.log(res.data); 
                    this.setState({clientList : data.clients})
                })
    } 

    GetJobOffers() {
        this.setState({ isloading: true,});
        const jobParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "ReferenceNo":"",
            "ApplicationFormId":"",
            "PositionId":"",
            "StatusId":""
        };
        //console.log(jobParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetJobOffers",  jobParams)
            .then(res => {
                const data = res.data;
                 console.log("jobParams");
                console.log(data);
                this.setState({ jobOfferList: data.jobOffers, isloading:false});
           
        })
    }

    // handleApproveClick = event => {
    //     const approveParams = {
    //         "IpAddress":"0.0.0.0",
    //         "UserId":this.state.userinfo.userId,
    //         "ClientId":this.state.selectedClientId,
    //         "jobOffers":[{
    //             "ProfileId":this.state.selectedProfileId,
    //             "ApplicationFormId":this.state.selectedApplicationFormId,
    //             "JobOfferId":this.state.selectedJobOfferId,
    //             "MemberName":this.state.selectedFullName,
    //             "DateOfBirth":this.state.selectedDateOfBirth,
    //             "DateHired":this.state.dateHired,
    //             "Client":this.state.selectedClient,
    //             "Position":this.state.selectedJobPosition,
    //             "SalaryOffered":this.state.selectedSalaryOffered,
    //             "ContractDateStart":moment(this.state.contractDateStart).format("MM-DD-YYYY" ),
    //             "ContractDateEnd":moment(this.state.contractDateEnd).format("MM-DD-YYYY" ),
    //         }],
    //     }
    //     //console.log(approveParams)
    //     axios
    //         .post(
    //             AppConfiguration.Setting().noserapiendpoint + "Administrator/ApproveJobOffer",  approveParams
    //         )
    //         .then(res => {
    //             const data = res.data;
    //             //console.log("Get data");
    //             //console.log(data)
    //             if(data.status=="1"){
    //                 this.setState({
    //                         isloading:false,
    //                         alerttype:"Success!",
    //                         isshow:true,
    //                         color:"success",
    //                         message: data.message,
    //                         fade:true,
    //                         navigate    :   true
    //                     });
    //                 }
    //                 else {
    //                     this.setState({
    //                         isloading:false,
    //                         alerttype:"Error!",
    //                         isshow:true,
    //                         color:"danger",
    //                         message: data.message,
    //                         fade:true
    //                     });
    //                 }
    //             })
    
    //     }

    handleApproveClick = event => {
        console.log("approve")
        console.log(this.state.employeeStatusTypeId)
        console.log(this.state.payModeId)
        console.log( this.state.payTypeId)
        console.log(this.state.selectedPayCardTypeId)
        console.log(this.state.selectedLocationId)
        
        const approveParams = {
           
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "jobOffers":[{
                    "ClientId":this.state.selectedClientId,
                    "ProfileId":this.state.selectedProfileId,
                    "ApplicationFormId":this.state.selectedApplicationFormId,
                    "JobOfferId":this.state.selectedJobOfferId,
                    "LocationId":this.state.selectedLocationId,
                    "IsDefaultLocation":(this.state.IsBranch)? "1" : "0",
                    "PositionId": this.state.selectedJobPositionId,
                    "SalaryOffered":this.state.selectedSalaryOffered,
                    "DateHired":moment(this.state.dateHired).format("MM/DD/YYYY" ),
                    "ContractDateStart":moment(this.state.contractDateStart).format("MM/DD/YYYY" ),
                    "ContractDateEnd":moment(this.state.contractDateEnd).format("MM/DD/YYYY" ),
                    "PayTypeId": this.state.selectedEmployeePayTypesId,
                    "PayModeId":this.state.selectedEmployeePayModesId,
                    "EcolaValue": this.state.selectedECOLA,
                    "SeaValue":this.state.selectedSEA,
                    "ColaValue": this.state.selectedCOLA,
                    "TaxExemptionTypeId": this.state.TaxExemptionId,
                    "TaxTypeId": this.state.taxTypeId,
                    "TaxCodeId":"0",
                    "IsOBP":(this.state.OptimizeBasicPay)? "1" : "0",
                    "WorkingDaysPerMonth":this.state.workingDaysPerMonth,
                    "WorkingDaysPerYear": this.state.workingDaysPerYear,
                    "DeductionBasisSSS":this.state.basisSSSId,
                    "DeductionBasisHDMF":this.state.deductionBasisHDMFId,
                    "DeductionBasisPHIC":this.state.basisPHICId,
                    "BasisFor13thMonth":this.state.basisFor13thMonthId,
                    "EmployeeStatusTypeId":this.state.employeeStatusTypeId,
                    "PayCardTypeId":this.state.selectedPayCardTypeId,
                    "PayCardNumber": this.state.selectedPayCardNumber,
                    "TMNProfileId":this.state.selectedTmnPtofileid,
                    "MemberName":this.state.selectedFullName,
                    "DateOfBirth":this.state.dateOfBirth,
                    "Position": this.state.selectedJobPosition,
                    "PreparedBy" : this.state.userinfo.userId,
                    "NotedBy" :this.state.selectedNotedById,
                    "ApprovedBy": this.state.selectedApproveById,
                    "Conforme" :this.state.selectedConforme,
                    "StatusId" :   "15",
                    "Client":this.state.selectedClient,
                    
                }],
            }
        console.log(approveParams)
    //    return
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Administrator/ApproveJobOffer",  approveParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get data");
                console.log(data)
                if(data.status=="1"){
                    this.setState({
                            isloading:false,
                            alerttype:"Success!",
                            isshow:true,
                            color:"success",
                            message: data.message,
                            fade:true,
                            navigate    :   true
                        });
                    }
                    else {
                        this.setState({
                            isloading:false,
                            alerttype:"Error!",
                            isshow:true,
                            color:"danger",
                            message: data.message,
                            fade:true
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
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>JOB OFFER CREATE</Card.Header>
                            <Card.Body  className="mb-3">
                                <Form >
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Card>
                                        <Card.Body >
                                        <Form.Row>
                                            <Col sm={12} className="mt-3">
                                            <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                 FULL NAME
                                            </label>
                                             <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeFullName}
                                                options={this.state.jobOfferList}
                                                type="text" 
                                                //placeholder=""
                                                defaultSelected={[this.props.location.params.data.memberName]}
                                               
                                            />  
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    CLIENT
                                                </label>
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                                type="text" 
                                                //placeholder="CLIENT"
                                                 defaultSelected={[this.props.location.params.data.client]}
                                               
                                            /> 
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    JOB POSITION
                                                </label>
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeJobPosition}
                                                    options={this.state.positionList}
                                                    type="text" 
                                                   // placeholder="JOB POSITION"
                                                    defaultSelected={[this.props.location.params.data.position]}
                                                
                                                /> 
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                            <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    BRANCH
                                                </label>
                                                {/* <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeLocation}
                                                    options={this.state.locationList}
                                                    type="text" 
                                                    defaultSelected={[this.props.location.params.data.location]}
                                                /> */}
                                               <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.onChangeLocation}
                                                    options={this.state.clientLocationList}
                                                    defaultSelected={[this.props.location.params.data.location]}
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-5">
                                            <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    MEMBERSHIP DATE
                                                </label>
                                                <DatePicker
                                                    ref='dateHired'
                                                    selected={this.state.dateHired}
                                                    onChange={this.handleChangeMembersDate}
                                                    minDate={this.minDate}
                                                    value={this.state.dateHired}
                                                    dateFormat={"MM/dd/yyyy"}
                                                    //placeholderText="MEMBERSHIP DATE"
                                                    className="form-control"
                                                    readOnly
                                                    
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col sm={12} className="mt-3">
                                                <Form.Check type="checkbox" 
                                                    style={{fontSize:"10px",fontWeight : "bold"}}
                                                    label="IS DEFAULT BRANCH" 
                                                    name="Isbranch"
                                                    onChange={this.handleChangeIsDefaultBranch}
                                                    
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    EMPLOYEE STATUS TYPE
                                                </label>
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleCoverChangeEmployeeStatusType}
                                                    options={this.state.employeeStatusTypeAutocomplete}
                                                    type="text" 
                                                    //placeholder="EMPLOYEE STATUS TYPE"
                                                    defaultSelected={[this.props.location.params.data.employeeStatusType]}
                                                
                                                /> 
                                            </Col>
                                        
                                            <Col sm={6} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    EDUCATION ATTAINMENT
                                                </label>
                                                <Form.Control 
                                                    type="text" 
                                                    //placeholder="EDUCATION ATTAINMENT" 
                                                    value={this.state.selectedEducationAttainment}
                                                    onChange={this.onChangeEducationAttainment.bind(this)}
                                                    autoComplete="off" 
                                                    name="EducationAttainment"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col sm={3} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    SALARY OFFERED
                                                </label>
                                                <Form.Control 
                                                    type="text" 
                                                    //placeholder="SALARY OFFERED" 
                                                    value={this.state.selectedSalaryOffered}
                                                    onChange={this.onChangeSalaryOffered.bind(this)}
                                                    autoComplete="off" 
                                                    name="SalaryOffered"
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row  >

                                            <Col sm={4} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    CONTRACT DATE START 
                                                </label>
                                                <DatePicker
                                                    ref='contractDateStart'
                                                    selected={this.state.contractDateStart}
                                                    onChange={this.handleChangeContractDateStart}
                                                    minDate={this.minDate}
                                                    value={this.state.contractDateStart}
                                                    dateFormat={"MM/dd/yyyy"}
                                                    className="form-control"
                                                    readOnly
                                                   // defaultSelected={[this.state.contractDateStart = this.props.location.params.data.contractDateStart]}
                                                />
                                            </Col>
                                            <Col sm={4} className="mt-3">
                                                <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                    CONTRACT DATE END
                                                </label>
                                                <DatePicker
                                                    ref='contractDateEnd'
                                                    selected={this.state.contractDateEnd}
                                                    onChange={this.handleChangeContractDateEnd}
                                                    minDate={this.minDate}
                                                    value={this.state.contractDateEnd}
                                                    dateFormat={"MM/dd/yyyy"}
                                                    //placeholderText="CONTRACT DATE END"
                                                    className="form-control"
                                                    //defaultSelected={[this.state.contractDateEnd = this.props.location.params.data.contractDateEnd]}
                                                    
                                                />
                                            </Col>
                                        </Form.Row>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body >
                                            <Form.Row>
                                                <Col sm={6} className="mt-3">
                                                    <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                        PAY TYPE
                                                    </label>
                                                    <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.handleCoverChangeEmployeesPayTypesList}
                                                        options={this.state.getPayTypesList}
                                                        defaultSelected={[this.props.location.params.data.payType]}
                                                    />
                                                    {/* <Typeahead
                                                        type="text" 
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.handleCoverChangePayType}
                                                        options={this.state.getPayTypesList}
                                                        //placeholder="PAY TYPE"
                                                        defaultSelected={[this.props.location.params.data.payType]}
                                                    
                                                    />  */}
                                                </Col>
                                                <Col sm={6} className="mt-3">
                                                    <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                        PAY MODE
                                                    </label>
                                                    <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.onChangeEmployeesPayModesList}
                                                        options={this.state.getPayModesList}
                                                        defaultSelected={[this.props.location.params.data.payMode]}
                                                    />
                                                    {/* <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        type="text"
                                                        onChange={this.handleCoverChangePayMode}
                                                        options={this.state.getPayModesList}
                                                        //placeholder="PAY MODE"
                                                        defaultSelected={[this.props.location.params.data.payMode]}
                                                    
                                                    />  */}
                                                </Col>
                                                <Col sm={6} className="mt-3">
                                                    <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                        PAY CARD TYPE
                                                    </label>
                                                    <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.onChangePayCardType}
                                                        options={this.state.getPayCardTypesList}
                                                        defaultSelected={[this.props.location.params.data.payCardType]} 
                                                    />
                                                    {/* <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        type="text"
                                                        onChange={this.handleCoverChangePayCardType}
                                                        options={this.state.getPayCardTypesList}
                                                        //placeholder="PAY CARD TYPE"
                                                        defaultSelected={[this.props.location.params.data.payCardType]} 
                                                        
                                                    />  */}
                                                </Col>
                                                {/* <Col sm={6} className="mt-3">
                                                    <label style={{fontSize:"10px"}}>
                                                        PAY CARD NUMBER
                                                    </label>
                                                    <Form.Control 
                                                        type="text" 
                                                        //placeholder="PAY CARD NUMBER" 
                                                        value={this.state.selectedPayCardNumber}
                                                        onChange={this.onChangePayCardNumber.bind(this)}
                                                        autoComplete="off" 
                                                        name="PayCardNumber"
                                                    />
                                                </Col> */}
                                                {/* <Col sm={6} className="mt-3">
                                                    <label style={{fontSize:"10px"}}>
                                                        TMN PROFILEID
                                                    </label>
                                                    <Form.Control 
                                                        type="text" 
                                                        //placeholder="TMN PROFILEID" 
                                                        value={this.state.selectedTmnPtofileid}
                                                        onChange={this.onChangeTmnPtofileid.bind(this)}
                                                        autoComplete="off" 
                                                        name="TmnPtofileid"
                                                    />
                                                </Col> */}
                                            </Form.Row>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body >
                                                <Form.Row>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            ECOLA
                                                        </label>
                                                        <Form.Control 
                                                            type="text" 
                                                           // placeholder="ECOLA" 
                                                            value={this.state.selectedECOLA}
                                                            onChange={this.onChangeECOLA.bind(this)}
                                                            autoComplete="off" 
                                                            name="ecolaValue"
                                                        />
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            SEA
                                                        </label>
                                                        <Form.Control 
                                                            type="text" 
                                                            //placeholder="SEA" 
                                                            value={this.state.selectedSEA}
                                                            onChange={this.onChangeSEA.bind(this)}
                                                            autoComplete="off" 
                                                            name="seaValue"
                                                        />
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            COLA
                                                        </label>
                                                         <Form.Control 
                                                            type="text" 
                                                            //placeholder="COLA" 
                                                            value={this.state.selectedCOLA}
                                                            onChange={this.onChangeCOLA.bind(this)}
                                                            autoComplete="off" 
                                                            name="colaValue"
                                                        />
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            TAX EXEMPTION
                                                        </label>
                                                         <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeTaxExemption}
                                                            options={this.state.taxExemptionList}
                                                            type="text" 
                                                            //placeholder="TAX EXEMPTION"
                                                            defaultSelected={[ this.props.location.params.data.taxExemptionType]}
                                                        
                                                        /> 
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            TAX TYPE
                                                        </label>
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeTaxType}
                                                            options={this.state.taxTypeList}
                                                            //placeholder="TAX TYPE"
                                                            defaultSelected={[this.props.location.params.data.taxType]}
                                                        
                                                        /> 
                                                    </Col>
                                                    <Col sm={6} className="mt-5">
                                                        <Form.Check type="checkbox" 
                                                            style={{fontSize:"10px",fontWeight : "bold"}}
                                                            label="OPTIMIZED BASIC PAY" 
                                                            name="OptimizeBasicPay"
                                                            onChange={this.handleChangeOptimizeBasicPay}
                                                        />
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            ALPHANUMERIC TAX CODE
                                                        </label>
                                                        <Form.Control 
                                                            type="text" 
                                                            //placeholder="ALPHANUMERIC TAX CODE" 
                                                            value={this.state.alphanumericTaxCode}
                                                            onChange={this.onChangeAlphanumericCode.bind(this)}
                                                            autoComplete="off" 
                                                            name="alphanumericTaxCode"
                                                        />
                                                    </Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </Form.Row>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Body >
                                                <Form.Row >
                                                     <Col sm={3} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            DEDUCTION BASIS SSS
                                                        </label>
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeDeductionBasisSSS}
                                                            options={this.state.deductionBasisList}
                                                            //placeholder="DEDUCTION BASIS SSS"
                                                            defaultSelected={[this.props.location.params.data.deductionBasisSSS]}
                                                        
                                                        /> 
                                                    </Col>
                                                    <Col sm={3} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            DEDUCTION BASIS HDMF
                                                        </label>
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeDeductionBasisHDMF}
                                                            options={this.state.deductionBasisHDMFList}
                                                            p//laceholder="DEDUCTION BASIS HDMF"
                                                            defaultSelected={[ this.props.location.params.data.deductionBasisHDMF]}
                                                            
                                                        />
                                                        
                                                    </Col>  
                                                    <Col sm={3} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            DEDUCTION BASIS PHIC
                                                        </label>
                                                            <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeDeductionBasisPHIC}
                                                            options={this.state.deductionBasisList}
                                                            //placeholder="DEDUCTION BASIS PHIC"
                                                            defaultSelected={[ this.props.location.params.data.deductionBasisPHIC]}
                                                        />
                                                    </Col>
                                                    <Col sm={3} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            BASIS FOR 13TH MONTH
                                                        </label>
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeBasisfor13thMonth}
                                                            options={this.state.basisFor13thMonthList}
                                                            //placeholder="BASIS FOR 13TH MONTH"
                                                            defaultSelected={[this.props.location.params.data.basisFor13thMonth]}
                                                        />
                                                    </Col>  
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            WORKING DAYS PER MONTH
                                                        </label>
                                                         <Form.Control 
                                                            type="text" 
                                                            //placeholder="WORKING DAYS PER MONTH" 
                                                            value={this.state.workingDaysPerMonth}
                                                            onChange={this.onChangeWorkingDays.bind(this)}
                                                            autoComplete="off" 
                                                            name="workingDaysPerMonth"
                                                        />
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            WORKING DAYS PER YEAR
                                                        </label>
                                                        <Form.Control 
                                                            type="text" 
                                                            //placeholder="WORKING DAYS PER YEAR" 
                                                            value={this.state.workingDaysPerYear}
                                                            onChange={this.onChangeWorkingDaysPerYear.bind(this)}
                                                            autoComplete="off" 
                                                            name="workingDaysPerYear"
                                                        />
                                                    </Col> 
                                                    </Form.Row>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Body >
                                                <Form.Row >
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            PREPARED BY
                                                        </label>
                                                        <Form.Control 
                                                            type="text" 
                                                            autoComplete="off" 
                                                            /* name="selectedClient" */
                                                            value={this.state.userinfo.fullName}
                                                            readOnly
                                                        /> 
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            NOTED BY
                                                        </label>
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeNotedBy}
                                                            options={this.state.getEmployeesCoordinatorList}
                                                            type="text" 
                                                            //placeholder="NOTED BY"
                                                            defaultSelected={[this.props.location.params.data.notedBy]}
                                                        /> 
                                                    </Col>
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            APPROVED BY
                                                        </label>
                                                        <Typeahead
                                                            labelKey='name'
                                                            id="basic-example"
                                                            onChange={this.handleCoverChangeApproveBy}
                                                            options={this.state.getEmployeesCoordinatorList}
                                                            type="text" 
                                                            //placeholder="APPROVED BY"
                                                            defaultSelected={[this.props.location.params.data.approvedBy]}
                                                        /> 
                                                    </Col> 
                                                    <Col sm={6} className="mt-3">
                                                        <label style={{fontSize:"10px",fontWeight : "bold"}}>
                                                            CONFORME
                                                        </label>
                                                       <Form.Control 
                                                            type="text" 
                                                            //placeholder=" CONFORME" 
                                                            autoComplete="off" 
                                                            name="conforme"
                                                            value={this.state.selectedConforme}
                                                            onChange={this.onChangeConforme.bind(this)}
                                                            disabled = { this.state.selectedConforme}
                                                        />  
                                                    </Col>
                                                </Form.Row>
                                            </Card.Body>
                                        </Card>
                                        <ButtonToolbar sm={12} className="mt-3">
                                            <Button style={{minWidth:"60px",marginRight:"1pt"}} variant="success" className="ml-auto" onClick={this.handleApproveClick}>
                                                Approve
                                            </Button>&nbsp;&nbsp;
                                            <NavLink  to="/PendingJobOffer">
                                                <Button style={{minWidth:"60px",marginRight:"1pt"}}  variant="danger"  href="/PendingJobOffer">
                                                    Back
                                                </Button>
                                            </NavLink>
                                        </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
            </div> 
        )
    }

}

export  default PendingJobOfferEdit
