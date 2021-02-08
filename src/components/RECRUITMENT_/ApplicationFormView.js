import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class ApplicationFormView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            // selected: [],
            userinfo  :   [],
            isloading :   false,
            isshow    :   false,
            alerttype :   "",
            message   :   "",
            color     :   "",
            fade      :   true,

            positionList: [],
            firstName:"",
            date:"",
            middleName:"",
            lastName:"",
            nickName:"",
            homePhoneNo:"",
            officePhoneNo:"",
            mobileNo:"",
            emailAdd:"",
            facebook:"",
            twitter:"",
            CitizenshipList:[
                {"name":"Filipino","id":"1"},
                {"name":"Others","id":"2"}
            ],
            CitizenshipId:"",
            GenderId:"",
            GenderList:[
                {"name":"Male","id":"1"},
                {"name":"Female","id":"2"}
            ],
            ReligionId:"",
            ReligionList:[
                {"name":"Adventist","id":"1"},
                {"name":"Aglipay","id":"2"},
                {"name":"Alliance","id":"3"},
                {"name":"Apostolic Holiness","id":"4"},
                {"name":"Assembly Of God","id":"5"},
                {"name":"Baptist","id":"6"},
                {"name":"Bible Baptist","id":"7"},
                {"name":"Born Again","id":"8"},
                {"name":"Born Again Christian","id":"9"},
                {"name":"Catholic","id":"10"},
                {"name":"Christian","id":"11"},
                {"name":"Christian(Born Again)","id":"12"},
                {"name":"Church of God","id":"13"},
                {"name":"Evangilical","id":"14"},
                {"name":"Iemelif","id":"15"},
                {"name":"Iglesia Ni Christo","id":"16"},
                {"name":"Islam","id":"17"},
                {"name":"Jehova Witness","id":"18"},
                {"name":"Jehovah's Witness","id":"19"},
                {"name":"Jehova's Witness","id":"20"},
                {"name":"MCGI","id":"21"},
                {"name":"Methodist","id":"22"},
                {"name":"Mormon","id":"23"},
                {"name":"Mormons","id":"24"},
                {"name":"N/A","id":"25"},
                {"name":"Others","id":"26"},
                {"name":"Pentecostal","id":"27"},
                {"name":"PIC","id":"28"},
                {"name":"Pinicocs","id":"29"},
                {"name":"Protestant","id":"30"},
                {"name":"Roman Catholic","id":"31"},
                {"name":"SDA","id":"32"},
                {"name":"Seventh Day Adventist","id":"33"},
                {"name":"The Church Of Jesus Christ","id":"34"},
                {"name":"UCCP","id":"35"},
                {"name":"Union Espiritista","id":"36"},
                {"name":"UPC","id":"37"},
                {"name":"V.C.C.P","id":"38"}

            ],
            CivilStatusId:"",
            CivilStatusList:[
                {"name":"Single","id":"1"},
                {"name":"Married","id":"2"},
                {"name":"Divorced","id":"3"},
                {"name":"Seperated","id":"4"}

            ],
            dateOfBirth: "",
            getCurrentYear: new Date(),
            ageMonth:"",
            placeofbirth:"",
            height:"",
            weight:"",
            languageSpoken:"",
            specialskill:"",
            emergencyContactName:"",
            relationship:"",
            contactnumber:"",
            sss:"",
            tin:"",
            philhealth:"",
            pagibig:"",
            refferedBy:"",
            JobopeningId:"",
            JobOpeningList:[
                {"name":"BestJobs","id":"1"},
                {"name":"Classified Ad","id":"2"},
                {"name":"Field Collectors","id":"3"},
                {"name":"Jobstreet","id":"4"},
                {"name":"Others","id":"5"},
                {"name":"PESO","id":"6"},
                {"name":"Referral","id":"7"},
            ],
            relativeName:"",
            relationShip:"",
            jobTittle:"",
            crime:"",
            ChronicDiseaseId:"",
            chronicDiseaseList:[
                {"name":"Allergies","id":"1"},
                {"name":"Asthma","id":"2"},
                {"name":"Diabetes","id":"3"},
                {"name":"Hepa B","id":"4"},
                {"name":"Hypertension","id":"5"},
                {"name":"N/A","id":"6"},
                {"name":"Others","id":"7"}

            ],
            Age:"",
            details:"",
            clientList: [],
            fullName:"",
            applyDATE:"",
            applicationFormNo:"",
            clients:"",
            positionsApplied:"",
            status:"",
            command:"",
            regionList:[],
            selectedRegion:"",
            selectedRegionId:"",
            provinceList:[],
            selectedProvinceId:"",
            selectedProvince:"",
            citylist:[],
            selectedCity:"",
            selectedCityId:"",
            house:"",
            street:"",
            barangay:"",
            postalcode:"",
            levelList:[
                {"name":"College","id":"1"},
                {"name":"High School","id":"2"},
                {"name":"Elementary","id":"3"},
                {"name":"others","id":"4"}
            ],
            level:"",
            levelId:"",
            schoolName:"",
            course:"",
            startYear:"",
            endYear:"",
            honorsAward:"",
            companyName:"",
            companyAddress:"",
            position:"",
            periodCovered:"",
            salary:"",
            supervisor:"",
            companycontactNo:"",
            reasonforleaving:"",
            tax:"",
            withHeldTax:"",
            yearOF:"",
            month:"",
            deminimisBenefits:"",
            mandatoryDeduction:"",
            nonTaxable:"",
            basicSalary:"",
            taxable13thMonthPay:"",
            taxableSalary:"",
            basicPay:"",
            holiday:"",
            overtimePay:"",
            nightDif:"",
            remarks:"",
            occupations:"",
            referenceName:"",
            referenceOccupation:"",
            companyorschool:"",
            referencecontactNo:"",
            TypeList:[
                {"name":"Current Address","id":"1"},
                {"name":"Registered Address","id":"2"},
                {"name":"Provincial Address","id":"3"},
                {"name":"Correspondence Address","id":"4"},
                {"name":"Foreign Address","id":"5"},
            ],
            roleId:"",
            RoleList:[
                {"name":"Father","id":"1"},
                {"name":"Mother","id":"2"},
                {"name":"Spouse","id":"3"},
                {"name":"Brother","id":"4"},
                {"name":"Sister","id":"5"},
                {"name":"Child","id":"6"},
            ],
            selectedClientId:"",
            selectedPositionId:"",
            selectedPositionName:"",
            selectedDepartmentId:"",
            departmentCodeAutocomplete:[],
            selectedSectionId:"",
            sectionAutocomplete:[],
            // checked : false,
            LaborUnion: "false",
            Convicted: "false",
            Relative:"false",
            selectedReligion:"",
            selectedReligionId:"",
            dateApplied : "",
            ageYear : "0",
            ageMonth : "0",
            titleName : [
                { "name" : "MR." },
                { "name" : "MS." },
                { "name" : "MRS." }
            ]
        }
        
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
        this.GetClient();
        this.GetRegion();
        this.GetProvince();
        this.GetCity();
        this.GetPosition();
        // this.GetDepartment(); 

        this.state.firstName    =   this.props.location.params.data.firstName
        this.state.lastName     =   this.props.location.params.data.lastName
        this.state.middleName   =   this.props.location.params.data.middleName
        this.state.nickName     =   this.props.location.params.data.nickName
        this.state.dateApplieds =  this.props.location.params.data.dateApplied

        for(let i = 0; i < this.props.location.params.data.applicantAddresses.length; i++){
            console.log("From Application Form 2")
            console.log(this.props.location.params.data.applicantAddresses[i]["houseNumber"])
            this.state.house = this.props.location.params.data.applicantAddresses[i]["houseNumber"]
            this.state.street = this.props.location.params.data.applicantAddresses[i]["streetName"]
            this.state.province = this.props.location.params.data.applicantAddresses[i].province
        }
        console.log(this.state.province)
    }

    /* onChangeClient(e){
        //console.log(e)
        this.setState({client:e.target.value})
    } */


    /* onChangePositionApplied(e){
        //console.log(e)
        this.setState({positionApplied:e.target.value})
    } */

    onChangeFirstName(e){
        //console.log(e)
        this.setState({firstName:e.target.value.toUpperCase()})
    }

    onChangeMiddlename(e){
        //console.log(e)
        this.setState({middleName:e.target.value.toUpperCase()})
    }

    onChangeNickname(e){
        //console.log(e)
        this.setState({nickName:e.target.value.toUpperCase()})
    }

    onChangeLastname(e){
        //console.log(e)
        this.setState({lastName:e.target.value.toUpperCase()})
    }

    onChangeFullName(e){
        //console.log(e)
        this.setState({fullName:e.target.value.toUpperCase()})
    }

    onChangeAppliedDate(e){
        //console.log(e)
        this.setState({appliedDate:e.target.value.toUpperCase()})
    }

    onChangeApplicationFOrmNo(e){
        //console.log(e)
        this.setState({applicationFormNo:e.target.value})
    }

    onChangeClients(e){
        //console.log(e)
        this.setState({clients:e.target.value.toUpperCase()})
    }

    onChangePositionsApplied(e){
        //console.log(e)
        this.setState({positionsApplied:e.target.value.toUpperCase()})
    }

    onChangeStatus(e){
        //console.log(e)
        this.setState({status:e.target.value.toUpperCase()})
    }

    onChangeCommand(e){
        //console.log(e)
        this.setState({command:e.target.value.toUpperCase()})
    }

    handleChangeDate = date => {
        //console.log(date)
        this.setState({
            dateApplied: date
        });
    }

    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
        }

    handleChangeReligion= (e) => {
        //console.log(e)
        if (e.length > 0) {
            this.state.selectedReligion = e[0].name
            this.state.selectedReligionId = e[0].id
        } else {
            this.state.selectedReligion = ""
            this.state.selectedReligionId = ""
        }
        //console.log(this.state.selectedReligionId);
    }

    GetProvince() {
        const provinceParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Region": this.state.selectedRegion
        };

         axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  provinceParams)
        .then(res => {
            const data = res.data;
            this.setState({ provinceList: data.provinces });
        })

    }

    handleCoverChangeProvince = (e) => {
        if (e.length > 0) {
            this.state.selectedProvince = e[0].name
            this.state.selectedProvinceId = e[0].id
        } else {
            this.state.selectedProvince = ""
            this.state.selectedProvinceId = ""
        }
    }

    GetCity() {
        const cityParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedCity,
            "ProvinceName": this.state.selectedProvince
         };
 
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities",  cityParams
             )
             .then(res => {
                 const data = res.data;
                 this.setState({ citylist: data.cities });
             })

    }

    handleCoverChangeCity = (e) => {
        if (e.length > 0) {
            this.state.selectedCity = e[0].name
            this.state.selectedCityId=e[0].id
        } else {
            this.state.selectedCity = ""
            this.state.selectedCityId = ""
        }
        //console.log(this.state.selectedCity);
        
    }
    
    onChangeHouse(e){
        //console.log(e)
        this.setState({house:e.target.value.toUpperCase()})
    }

    onChangeStreet(e){
        //console.log(e)
        this.setState({street:e.target.value.toUpperCase()})
    }

    onChangeBarangay(e){
        //console.log(e)
        this.setState({barangay:e.target.value.toUpperCase()})
    }

    onChangePostalCode(e){
        //console.log(e)
        this.setState({postalcode:e.target.value.toUpperCase()})
    }
        
    onChangeHomePhoneNo(e){
        //console.log(e)
        this.setState({homePhoneNo:e.target.value.toUpperCase()})
    }

    onChangeOfficePhoneNo(e){
        //console.log(e)
        this.setState({officePhoneNo:e.target.value.toUpperCase()})
    }

    onChangeMobileNo(e){
        //console.log(e)
        this.setState({mobileNo:e.target.value.toUpperCase()})
    }

    onChangeEmailAdd(e){
        //console.log(e)
        this.setState({emailAdd:e.target.value.toUpperCase()})
    }

    onChangeFacebook(e){
        //console.log(e)
        this.setState({facebook:e.target.value.toUpperCase()})
    }

    onChangeTwitter(e){
        //console.log(e)
        this.setState({twitter:e.target.value.toUpperCase()})
    }

    handleChangeCitizenship= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.Citizenship = e[0].name
            this.state.CitizenshipId = e[0].id
            ////console.log(this.state.CitizenshipId = e[0].id)
        } else {
            this.state.Citizenship = ""
            this.state.CitizenshipId = ""
        }
    }

    handleChangeGender= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.Gender = e[0].name
            this.state.GenderId = e[0].id
        }else{
            this.state.Gender = ""
            this.state.GenderId = ""
        }
    }

    GetRegion() {
        const regionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedRegion
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  regionParams)
        .then(res => {
             const data = res.data;
             //console.log("Test region");
            //console.log(data);
             this.setState({ regionList: data.regions });
         })
    }
    handleCoverChangeRegion = (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedRegion = e[0].name
            this.state.selectedRegionId = e[0].id
        } else {
            this.state.selectedRegion = ""
            this.state.selectedRegionId = ""
        }
        //console.log(this.state.selectedRegion);
        
    }

    handleChangeCivilStatus= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.CivilStatus = e[0].name
            this.state.CivilStatusId = e[0].id
        }else{
            this.state.CivilStatus = ""
            this.state.CivilStatusId = ""
        }
    }

    handleChangeDateOfBirth = date => {
        var today = new Date();
        var birthDate = new Date(date);
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        this.state.totalAge = age_now
        console.log(age_now);
        /* return age_now; */
        this.setState({
            dateOfBirth: date,
            ageMonth    : date.getMonth()+1,
            ageYear     : date.getFullYear()
        });

    }

    onChangeAgeMonth(e){
        //console.log(e)
        this.setState({ageMonth:e.target.value.toUpperCase()})
    }

    onChangePlaceOfBirth(e){
        //console.log(e)
        this.setState({placeofbirth:e.target.value.toUpperCase()})
    }

    onChangeHeight(e){
        //console.log(e)
        this.setState({height:e.target.value.toUpperCase()})
    }

    onChangeweight(e){
        //console.log(e)
        this.setState({weight:e.target.value.toUpperCase()})
    }

    onChangeSpecialSkill(e){
        //console.log(e)
        this.setState({specialskill:e.target.value.toUpperCase()})
    }
    
    onChangeLanguageSpoken(e){
        //console.log(e)
        this.setState({languageSpoken:e.target.value.toUpperCase()})
    }

    onChangeEmergencyContactName(e){
        //console.log(e)
        this.setState({emergencyContactName:e.target.value.toUpperCase()})
    }

    onChangeRelationship(e){
        //console.log(e)
        this.setState({relationship:e.target.value.toUpperCase()})
    }

    onChangeContactNumber(e){
        //console.log(e)
        this.setState({contactnumber:e.target.value.toUpperCase()})
    }

    onChangeSSS(e){
        //console.log(e)
        this.setState({sss:e.target.value.toUpperCase()})
    }

    onChangeTin(e){
        //console.log(e)
        this.setState({tin:e.target.value.toUpperCase()})
    }

    onChangePhilHealth(e){
        //console.log(e)
        this.setState({philhealth:e.target.value.toUpperCase()})
    }

    onChangePagibig(e){
        //console.log(e)
        this.setState({pagibig:e.target.value.toUpperCase()})
    }

    handleChangeLevel= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.level = e[0].name
            this.state.levelId = e[0].id
        }else{
            this.state.level = ""
            this.state.levelId = ""
        }
    }

    onChangeSchoolName(e){
        //console.log(e)
        this.setState({schoolName:e.target.value.toUpperCase()})
    }

    onChangeCourse(e){
        //console.log(e)
        this.setState({course:e.target.value.toUpperCase()})
    }

    onChangeStartYear(e){
        //console.log(e)
        this.setState({startYear:e.target.value.toUpperCase()})
    }

    onChangeEndYear(e){
        //console.log(e)
        this.setState({endYear:e.target.value.toUpperCase()})
    }

    onChangeHonorsAward(e){
        //console.log(e)
        this.setState({honorsAward:e.target.value.toUpperCase()})
    }

    onChangeCompanyName(e){
        //console.log(e)
        this.setState({companyName:e.target.value.toUpperCase()})
    }

    onChangeCompanyAddress(e){
        //console.log(e)
        this.setState({companyAddress:e.target.value.toUpperCase()})
    }

    onChangePosition(e){
        //console.log(e)
        this.setState({position:e.target.value.toUpperCase()})
    }

    onChangePeriodCovered(e){
        //console.log(e)
        this.setState({periodCovered:e.target.value.toUpperCase()})
    }

    onChangeSalary(e){
        //console.log(e)
        this.setState({salary:e.target.value.toUpperCase()})
    }
    onChangeSupervisor(e){
        //console.log(e)
        this.setState({supervisor:e.target.value.toUpperCase()})
    }

    onChangeCompanyContactNo(e){
        //console.log(e)
        this.setState({companycontactNo:e.target.value.toUpperCase()})
    }

    onChangeReasonforLeaving(e){
        //console.log(e)
        this.setState({reasonforleaving:e.target.value.toUpperCase()})
    }

    /* onChangeTax(e){
        //console.log(e)
        this.setState({tax:e.target.value})
    } */
    onChangeTax(e){
        //console.log(e)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({tax: e.target.value})
        }
    }

    onChangeWithHeldTax(e){
        //console.log(e)
        this.setState({withHeldTax:e.target.value.toUpperCase()})
    }

    onChangeYearOf(e){
        //console.log(e)
        this.setState({yearOf:e.target.value.toUpperCase()})
    }

    onChange13thMonth(e){
        //console.log(e)
        this.setState({month:e.target.value.toUpperCase()})
    }

    onChangeDeminimisBenefits(e){
        //console.log(e)
        this.setState({deminimisBenefits:e.target.value.toUpperCase()})
    }

    onChangeMandatoryDeduction(e){
        //console.log(e)
        this.setState({mandatoryDeduction:e.target.value.toUpperCase()})
    }

    onChangeNonTaxable(e){
        //console.log(e)
        this.setState({nonTaxable:e.target.value.toUpperCase()})
    }

    onChangeBasicSalary(e){
        //console.log(e)
        this.setState({basicSalary:e.target.value.toUpperCase()})
    }

    onChangeTaxable13thMonth(e){
        //console.log(e)
        this.setState({taxable13thMonthPay:e.target.value.toUpperCase()})
    }

    onChangeTaxableSalary(e){
        //console.log(e)
        this.setState({taxableSalary:e.target.value.toUpperCase()})
    }

    onChangeBasicPay(e){
        //console.log(e)
        this.setState({basicPay:e.target.value.toUpperCase()})
    }

    onChangeHoliday(e){
        //console.log(e)
        this.setState({holiday:e.target.value.toUpperCase()})
    }

    onChangeOverTimePay(e){
        //console.log(e)
        this.setState({overtimePay:e.target.value.toUpperCase()})
    }

    onChangeNightDif(e){
        //console.log(e)
        this.setState({nightDif:e.target.value.toUpperCase()})
    }

    onChangeRemarks(e){
        //console.log(e)
        this.setState({remarks:e.target.value.toUpperCase()})
    }

    handleChangeJobOpening= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.Jobopening = e[0].name
            this.state.JobopeningId = e[0].id
        }else{
            this.state.Jobopening = ""
            this.state.JobopeningId = ""
        }
    }

    onChangeRefferedBy(e){
        //console.log(e)
        this.setState({refferedBy:e.target.value.toUpperCase()})
        //console.log(this.state.refferedBy)
    }

    onChangeRelativeName(e){
        //console.log(e)
        this.setState({relativeName:e.target.value.toUpperCase()})
    }

    onChangeRelationShip(e){
        //console.log(e)
        this.setState({relationShip:e.target.value.toUpperCase()})
    }

    onChangeJobTittle(e){
        //console.log(e)
        this.setState({jobTittle:e.target.value.toUpperCase()})
    }

    onChangeCrime(e){
        //console.log(e)
        this.setState({crime:e.target.value.toUpperCase()})
    }

    onChangeDetails(e){
        //console.log(e)
        this.setState({details:e.target.value.toUpperCase()})
    }

    handleChangeChronicDisease= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.ChronicDisease = e[0].name
            this.state.ChronicDiseaseId = e[0].id
        }else{
            this.state.ChronicDisease = ""
            this.state.ChronicDiseaseId = ""
        }
    }

    handleChangeType= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.type = e[0].name
            this.state.typeId = e[0].id
        }else{
            this.state.type = ""
            this.state.typeId = ""
        }
    }

    onChangeReferenceName(e){
        //console.log(e)
        this.setState({referenceName:e.target.value.toUpperCase()})
    }

     onChangeOccupations(e){
        //console.log(e)
        this.setState({occupations:e.target.value.toUpperCase()})
    }
    
    onChangeCompanyOrSchool(e){
        //console.log(e)
        this.setState({companyorschool:e.target.value.toUpperCase()})
    }
    onChangeReferenceContactNumber(e){
        //console.log(e)
        this.setState({referencecontactNo:e.target.value.toUpperCase()})
    }

    handleChangeRole= (e) => {
        ////console.log(e)
        if(e.length > 0) {
            this.state.role = e[0].name
            this.state.roleId = e[0].id
        }else{
            this.state.role = ""
            this.state.roleId = ""
        }
    }

    onChangeCompany(e){
        //console.log(e)
        this.setState({Company:e.target.value.toUpperCase()})
    }

    onChangeReferenceOccupation(e){
        //console.log(e)
        this.setState({referenceOccupation:e.target.value.toUpperCase()})
    }

    onChangeAges(e){
        //console.log(e)
        this.setState({Age:e.target.value.toUpperCase()})
    }

    onChangeName(e){
        //console.log(e)
        this.setState({Name:e.target.value.toUpperCase()})
    }

    handleCoverChangeClient = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id

    }

    GetClient() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        };

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList",  clientParams)
        .then(res => {
            const data = res.data;
            //console.log("Get Client List");
            //console.log(data);
            this.setState({
                clientList  :   data.clients,
                isloading   :   false
            });
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

    
    handleChangePosition = (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedPositionName = e[0].name
            this.state.selectedPositionId = e[0].id
        } else {
            this.state.selectedPositionName = ""
            this.state.selectedPositionId = ""
        }
    }

    
    
    handleChangeLaborUnion  = (e) =>{
        if(e.target.unchecked) 
            this.setState({LaborUnion: "false"})
        else
        {
            this.setState({LaborUnion: ""})
            
        }
    }

   
    handleChangeConvicted  = (e) =>{
        if(e.target.unchecked) 
            this.setState({Convicted: "false"})
        else
        {
            this.setState({Convicted: ""})
            
        }
    }

    handleChangeRelative  = (e) =>{
        if(e.target.unchecked) 
            this.setState({Relative: "false"})
        else
        {
            this.setState({Relative: ""})
            
        }
    }


    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
    }

    handleChangeTitleName = (e) => {
        //console.log(e)
        if (e.length > 0) {
            this.state.selectedTitle = e[0].name
        } else {
            this.state.selectedTitle = ""
        }
        //console.log(this.state.selectedReligionId);
    }


    handleSaveClick = event => {
        this.setState({isloading:true})
        /* if(this.state.ageMonth == "1"){
            this.state.monthAge = "January"
        }
        if(this.state.ageMonth == "2"){
            this.state.monthAge = "February"
        }
        if(this.state.ageMonth == "3"){
            this.state.monthAge = "March"
        }
        if(this.state.ageMonth == "4"){
            this.state.monthAge = "April"
        }
        if(this.state.ageMonth == "5"){
            this.state.monthAge = "May"
        }
        if(this.state.ageMonth == "6"){
            this.state.monthAge = "June"
        }
        if(this.state.ageMonth == "7"){
            this.state.monthAge = "July"
        }
        if(this.state.ageMonth == "8"){
            this.state.monthAge = "August"
        }
        if(this.state.ageMonth == "9"){
            this.state.monthAge = "September"
        }
        if(this.state.ageMonth == "10"){
            this.state.monthAge = "October"
        }
        if(this.state.ageMonth == "11"){
            this.state.monthAge = "November"
        }
        if(this.state.ageMonth == "12"){
            this.state.monthAge = "December"
        } */

        const formParams = {

        "IpAddress":"0.0.0.0",
        "ClientId": this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "StatusId":"1",
        "PositionID":this.state.selectedPositionId,
        "JobSourceId" :this.state.JobopeningId,
        "DiagnoseDeseaseId" : this.state.ChronicDiseaseId,
        "DateApplied" : this.formatDate(this.state.dateApplied),
        "SpecialSkills" : this.state.specialskill,
        "LanguageSpoken" : this.state.languageSpoken,
        "IsCrimeConvicted" : (this.state.Convicted)? "1" : "0",
        "CrimeDescription" : this.state.crime,
        "IsLaborUnion" : (this.state.LaborUnion)? "1" : "0",
        "LaborUnionDescription" : this.state.details,
        "EmergencyContactName" :this.state.emergencyContactName,
        "EmergencyContactRelation" : this.state.relationship,
        "EmergencyContactNumber" : this.state.contactnumber,
        "RelativeName" : this.state.relativeName,
        "RelativeRelation" : this.state.relationShip,
        "RelativePosition" : this.state.jobTittle,
        "RefferedBy" :this.state.refferedBy,
        "LastName" : this.state.lastName,
        "MiddleName" : this.state.middleName,
        "FirstName" : this.state.firstName,
        "NickName" : this.state.nickName,
        "Title" : this.state.selectedTitle,
        "AgeYear" : this.state.ageYear,
        "AgeMonth" : this.state.ageMonth,
        "DateOfBirth" : this.formatDate(this.state.dateOfBirth),
        "PlaceOfBirth" : this.state.placeofbirth,
        "Gender" : this.state.Gender,
        "CivilStatus" : this.state.CivilStatus,
        "Hobbies" : "1",
        "Height" : this.state.height,
        "Weight" : this.state.weight,
        "TINNumber" : this.state.tin,
        "SSSNumber" : this.state.sss,
        "PHICNumber" : this.state.philhealth,
        "HDMFNumber" : this.state.pagibig,
        "NationalityId" : this.state.CitizenshipId,
        "ReligionId" : this.state.selectedReligionId,
        "Facebook" : this.state.facebook,
        "Twitter" : this.state.twitter,
        "EmailAddress" : this.state.emailAdd,
        "MobileNumber" : this.state.mobileNo,
        "HomePhoneNumber" : this.state.homePhoneNo,
        "LivingArrangementId" : "1",
        "BloodTypeId" : "1",
        "HasCompanyRelative":(this.state.Relative)? "1" : "0",
        "applicantAddresses" :[{
                "TypeId":this.state.typeId,
                "HouseNumber":this.state.house,
                "StreetName":this.state.street,
                "Barangay":this.state.barangay,
                "PostalCode":this.state.postalcode,
                "RegionId":this.state.selectedRegionId,
                "Region":this.state.selectedRegion,
                "ProvinceId":this.state.selectedProvinceId,
                "Province":this.state.selectedProvince,
                "CityId":this.state.selectedCityId,
                "City":this.state.selectedCity,
        }],
        "educationAttainments":[{
                "LevelId":this.state.levelId,
                "SchoolName":this.state.schoolName,
                "Course":this.state.course,
                "StartYear":this.state.startYear,
                "EndYear":this.state.endYear,
                "HonorRecieved":this.state.honorsAward
        }],
        "employmentHistories":[{
                "CompanyName":this.state.companyName,
                "CompanyAddress":this.state.companyAddress,
                "Position":this.state.position,
                "Salary":this.state.salary,
                "Supervisor":this.state.supervisor,
                "ContactNumber":this.state.companycontactNo,
                "ReasonForLeaving":this.state.reasonforleaving,
                "PeriodCovered":this.state.periodCovered,
                "TaxableCompensationIncome":this.state.tax,
                "WithholdingTax":this.state.withHeldTax,
                "YearOfCompensation":this.state.yearOf,
                "NTThirteenMonthPay":this.state.month,
                "Deminimis":this.state.deminimisBenefits,
                "NTMandatoryDeduction":this.state.mandatoryDeduction,
                "NTSalaries":this.state.nonTaxable,
                "BasicSalary":this.state.basicSalary,
                "TaxableThirteenMonthPay":this.state.taxable13thMonthPay,
                "TaxableSalaries":this.state.taxableSalary,
                "BasicPayMWE":this.state.basicPay,
                "HolidayPayMWE":this.state.holiday,
                "OvertimePayMWE":this.state.overtimePay,
                "NightDiffPayMWE":this.state.nightDif,
                "Remarks":this.state.remarks
        }],
        "familyBackgrounds":[{
                "RoleId":this.state.roleId,
                "Name":this.state.Name,
                "Age":this.state.Age,
                "Occupation":this.state.occupations,
                "Company":this.state.Company,
                "UserId":this.state.userinfo.userId,
        }],
        "characterReferences":[{
                "Name":this.state.referenceName,
                "ContactNumber":this.state.referencecontactNo,
                "Occupation":this.state.referenceOccupation,
                "Company":this.state.companyorschool,
                 "UserId":this.state.userinfo.userId,
        }]
    }
    //console.log(formParams)
         axios
             .post(
                /* localStorage.setItem('formParams', JSON.stringify(formParams)) */
                  AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddApplicationForm",  formParams 
             )
             .then(res => {
                 const data = res.data;
                 //console.log("Get data");
                 //console.log(data)
                 if(data.status=="1"){
                    this.setState({
                            isloading:false,
                            alerttype:"Success!",
                            isshow:true,
                            color:"success",
                            message: data.message,
                            fade:true
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

        handleSubmitClick= event => {
            /* this.setState({isloading:true}) */
            /* if(this.state.ageMonth == "1"){
                this.state.monthAge = "January"
            }
            if(this.state.ageMonth == "2"){
                this.state.monthAge = "February"
            }
            if(this.state.ageMonth == "3"){
                this.state.monthAge = "March"
            }
            if(this.state.ageMonth == "4"){
                this.state.monthAge = "April"
            }
            if(this.state.ageMonth == "5"){
                this.state.monthAge = "May"
            }
            if(this.state.ageMonth == "6"){
                this.state.monthAge = "June"
            }
            if(this.state.ageMonth == "7"){
                this.state.monthAge = "July"
            }
            if(this.state.ageMonth == "8"){
                this.state.monthAge = "August"
            }
            if(this.state.ageMonth == "9"){
                this.state.monthAge = "September"
            }
            if(this.state.ageMonth == "10"){
                this.state.monthAge = "October"
            }
            if(this.state.ageMonth == "11"){
                this.state.monthAge = "November"
            }
            if(this.state.ageMonth == "12"){
                this.state.monthAge = "December"
            } */

            if(18 > this.state.totalAge){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Age is not valid",
                    fade:true
                });
                return
            } else {
                this.setState({
                    isshow:false,
                });
            }


            console.log(this.state.monthAge);
            const formParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "StatusId":"3",
            "PositionID":this.state.selectedPositionId,
            "JobSourceId" :this.state.JobopeningId,
            "DiagnoseDeseaseId" : this.state.ChronicDiseaseId,
            "DateApplied" : this.formatDate(this.state.dateApplied),
            "SpecialSkills" : this.state.specialskill,
            "LanguageSpoken" : this.state.languageSpoken,
            "IsCrimeConvicted" : (this.state.Convicted)? "1" : "0",
            "CrimeDescription" : this.state.crime,
            "IsLaborUnion" : (this.state.LaborUnion)? "1" : "0",
            "LaborUnionDescription" : this.state.details,
            "EmergencyContactName" :this.state.emergencyContactName,
            "EmergencyContactRelation" : this.state.relationship,
            "EmergencyContactNumber" : this.state.contactnumber,
            "RelativeName" : this.state.relativeName,
            "RelativeRelation" : this.state.relationShip,
            "RelativePosition" : this.state.jobTittle,
            "RefferedBy" :this.state.refferedBy,
            "LastName" : this.state.lastName,
            "MiddleName" : this.state.middleName,
            "FirstName" : this.state.firstName,
            "NickName" : this.state.nickName,
            "Title" : this.state.selectedTitle,
            "AgeYear" : this.state.ageYear,
            "AgeMonth" : this.state.ageMonth,
            "DateOfBirth" : this.formatDate(this.state.dateOfBirth),
            "PlaceOfBirth" : this.state.placeofbirth,
            "Gender" : this.state.Gender,
            "CivilStatus" : this.state.CivilStatus,
            "Hobbies" : "",
            "Height" : this.state.height,
            "Weight" : this.state.weight,
            "TINNumber" : this.state.tin,
            "SSSNumber" : this.state.sss,
            "PHICNumber" : this.state.philhealth,
            "HDMFNumber" : this.state.pagibig,
            "NationalityId" : this.state.CitizenshipId,
            "ReligionId" : this.state.selectedReligionId,
            "Facebook" : this.state.facebook,
            "Twitter" : this.state.twitter,
            "EmailAddress" : this.state.emailAdd,
            "MobileNumber" : this.state.mobileNo,
            "HomePhoneNumber" : this.state.homePhoneNo,
            "LivingArrangementId" : "1",
            "BloodTypeId" : "1",
            "HasCompanyRelative":(this.state.Relative)? "1" : "0",
            "applicantAddresses" :[{
                    "TypeId":this.state.typeId,
                    "HouseNumber":this.state.house,
                    "StreetName":this.state.street,
                    "Barangay":this.state.barangay,
                    "PostalCode":this.state.postalcode,
                    "RegionId":this.state.selectedRegionId,
                    "Region":this.state.selectedRegion,
                    "ProvinceId":this.state.selectedProvinceId,
                    "Province":this.state.selectedProvince,
                    "CityId":this.state.selectedCityId,
                    "City":this.state.selectedCity,
            }],
            "educationAttainments":[{
                    "LevelId":this.state.levelId,
                    "SchoolName":this.state.schoolName,
                    "Course":this.state.course,
                    "StartYear":this.state.startYear,
                    "EndYear":this.state.endYear,
                    "HonorRecieved":this.state.honorsAward
            }],
            "employmentHistories":[{
                    "CompanyName":this.state.companyName,
                    "CompanyAddress":this.state.companyAddress,
                    "Position":this.state.position,
                    "Salary":this.state.salary,
                    "Supervisor":this.state.supervisor,
                    "ContactNumber":this.state.companycontactNo,
                    "ReasonForLeaving":this.state.reasonforleaving,
                    "PeriodCovered":this.state.periodCovered,
                    "TaxableCompensationIncome":this.state.tax,
                    "WithholdingTax":this.state.withHeldTax,
                    "YearOfCompensation":this.state.yearOf,
                    "NTThirteenMonthPay":this.state.month,
                    "Deminimis":this.state.deminimisBenefits,
                    "NTMandatoryDeduction":this.state.mandatoryDeduction,
                    "NTSalaries":this.state.nonTaxable,
                    "BasicSalary":this.state.basicSalary,
                    "TaxableThirteenMonthPay":this.state.taxable13thMonthPay,
                    "TaxableSalaries":this.state.taxableSalary,
                    "BasicPayMWE":this.state.basicPay,
                    "HolidayPayMWE":this.state.holiday,
                    "OvertimePayMWE":this.state.overtimePay,
                    "NightDiffPayMWE":this.state.nightDif,
                    "Remarks":this.state.remarks
            }],
            "familyBackgrounds":[{
                    "RoleId":this.state.roleId,
                    "Name":this.state.Name,
                    "Age":this.state.Age,
                    "Occupation":this.state.occupations,
                    "Company":this.state.Company,
                    "UserId":this.state.userinfo.userId,
            }],
            "characterReferences":[{
                    "Name":this.state.referenceName,
                    "ContactNumber":this.state.referencecontactNo,
                    "Occupation":this.state.referenceOccupation,
                    "Company":this.state.companyorschool,
                     "UserId":this.state.userinfo.userId,
            }]
        }
        console.log(formParams)
             /* axios
                 .post(
                    //localStorage.setItem('formParams', JSON.stringify(formParams))
                      AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddApplicationForm",  formParams 
                 )
                 .then(res => {
                     const data = res.data;
                     //console.log("Get data");
                     //console.log(data)
                     if(data.status=="1"){
                        this.setState({
                                isloading:false,
                                alerttype:"Success!",
                                isshow:true,
                                color:"success",
                                message: data.message,
                                fade:true
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
                    }) */
        
            }

    render() {
        return(
            <div>
                <Banner />
                    <Container  className="mt-3" fluid>
                        <Card>
                            <Card.Header>Create Application Form</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                            <Typeahead 
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                                placeholder="Select Client"
                                                defaultSelected={[this.props.location.params.data.client]}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.positionList}
                                                placeholder="POSITION APPLIED"
                                                defaultSelected={[this.props.location.params.data.position]}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <DatePicker
                                                ref='dateApplied'
                                                selected={this.state.dateApplied}
                                                onChange={this.handleChangeDate}
                                                minDate={this.minDate}
                                                value={this.props.dateApplied}
                                                dateFormat={"MM/dd/yyyy"}
                                                placeholderText="Date Applied"
                                                className="form-control"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                <Tabs className="mt-2" defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                    <Tab eventKey="default" title="I. GENERAL INFORMATION">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row className="mt-3">
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id='basic-example'
                                                                    onChange={this.handleChangeTitleName}
                                                                    options={this.state.titleName}
                                                                    placeholder="SELECT TITLE"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="firstName"
                                                                    value={this.state.firstName}
                                                                    placeholder="FIRST NAME"
                                                                    onChange={this.onChangeFirstName.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="mt-3">
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="middleName"
                                                                    value={this.state.middleName}
                                                                    placeholder="MIDDLE NAME"
                                                                    onChange={this.onChangeMiddlename.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="nickName"
                                                                    value={this.state.nickName}
                                                                    placeholder="NICK NAME"
                                                                    onChange={this.onChangeNickname.bind(this)} 
                                                                    autoComplete="off" 
                                                                    
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="lastName"
                                                                    value={this.state.lastName}
                                                                    placeholder="LAST NAME"
                                                                    onChange={this.onChangeLastname.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>

                                    <Tab eventKey="address" title="ADDRESSES (CURRENT AND PROVINCIAL ADDRESS)">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                <Card>
                                                                    <Card.Body className="mt-3">
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Typeahead
                                                                                labelKey='name'
                                                                                id='basic-example'
                                                                                onChange={this.handleChangeType}
                                                                                options={this.state.TypeList}
                                                                                placeholder="TYPE"
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Typeahead
                                                                                labelKey='name'
                                                                                id="basic-example"
                                                                                onChange={this.handleCoverChangeRegion}
                                                                                options={this.state.regionList}
                                                                                placeholder="REGION"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Typeahead
                                                                                labelKey='name'
                                                                                id="basic-example"
                                                                                onChange = { this.handleCoverChangeProvince }
                                                                                options={this.state.provinceList}
                                                                                placeholder="PROVINCE"
                                                                                /* defaultSelected={this.state.province} */
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Typeahead                                  
                                                                                labelKey='name'
                                                                                id="basic-examplex"
                                                                                onChange={this.handleCoverChangeCity}
                                                                                options={this.state.citylist}
                                                                                placeholder="CITY/MUNICIPALITY"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="house"
                                                                                value={this.state.house}
                                                                                placeholder="HOUSE #"
                                                                                onChange={this.onChangeHouse.bind(this)} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="street"
                                                                                value={this.state.street}
                                                                                placeholder="STREET"
                                                                                onChange={this.onChangeStreet.bind(this)} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="barangay"
                                                                                value={this.state.barangay}
                                                                                placeholder="BARANGAY"
                                                                                onChange={this.onChangeBarangay.bind(this)} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="postalcode"
                                                                                value={this.state.postalcode}
                                                                                placeholder="POSTAL CODE"
                                                                                onChange={this.onChangePostalCode.bind(this)} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="homePhoneNo"
                                                                                value={this.state.homePhoneNo}
                                                                                placeholder="HOME PHONE NUMBER"
                                                                                onChange={this.onChangeHomePhoneNo.bind(this)} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="officePhoneNo"
                                                                                value={this.state.officePhoneNo}
                                                                                placeholder="OFFICE PHONE NUMBER"
                                                                                onChange={this.onChangeOfficePhoneNo.bind(this)} 
                                                                                autoComplete="off" 
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                value={this.state.mobileNo}
                                                                                name="mobileNo"
                                                                                placeholder="MOBILE NUMBER"
                                                                                onChange={this.onChangeMobileNo.bind(this)} 
                                                                                autoComplete="off" 
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="emailAdd"
                                                                                value={this.state.emailAdd}
                                                                                placeholder="EMAIL ADDRESS"
                                                                                onChange={this.onChangeEmailAdd.bind(this)} 
                                                                                autoComplete="off" 
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="facebook"
                                                                                value={this.state.facebook}
                                                                                placeholder="FACEBOOK"
                                                                                onChange={this.onChangeFacebook.bind(this)} 
                                                                                autoComplete="off" 
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                            <Form.Control 
                                                                                type="text"
                                                                                name="twitter"
                                                                                value={this.state.twitter}
                                                                                placeholder="TWITTER"
                                                                                onChange={this.onChangeTwitter.bind(this)}
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Card.Body>
                                                                 </Card>
                                                            </Form.Group>
                                                        </Form.Row>


                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                <Card>
                                                                    <Card.Body className="mt-3">
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeCitizenship}
                                                                                    options={this.state.CitizenshipList}
                                                                                    placeholder="CITIZENSHIP"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeReligion}
                                                                                    options={this.state.ReligionList}
                                                                                    placeholder="RELIGION"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeGender}
                                                                                    options={this.state.GenderList}
                                                                                    placeholder="GENDER"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeCivilStatus}
                                                                                    options={this.state.CivilStatusList}
                                                                                    placeholder="CIVIL STATUS"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <DatePicker
                                                                                    ref='dateOfBirth'
                                                                                    selected={this.state.dateOfBirth}
                                                                                    onChange={this.handleChangeDateOfBirth}
                                                                                    minDate={this.minDate}
                                                                                    value={this.props.dateOfBirth}
                                                                                    dateFormat={"MM/dd/yyyy"}
                                                                                    placeholderText="DATE OF BIRTH "
                                                                                    className="form-control"
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="totalAge"
                                                                                    value={this.state.totalAge}
                                                                                    placeholder="AGE"
                                                                                    onChange={this.onChangeAgeMonth.bind(this)}
                                                                                    autoComplete="off"
                                                                                    disabled
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="placeofbirth"
                                                                                    value={this.state.placeofbirth}
                                                                                    placeholder="PLACE OF BIRTH"
                                                                                    onChange={this.onChangePlaceOfBirth.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="height"
                                                                                    value={this.state.height}
                                                                                    placeholder="HEIGHT"
                                                                                    onChange={this.onChangeHeight.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="weight"
                                                                                    value={this.state.weight}
                                                                                    placeholder="WEIGHT"
                                                                                    onChange={this.onChangeweight.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="specialskill"
                                                                                    value={this.state.specialskill}
                                                                                    placeholder="SPECIAL SKILLS"
                                                                                    onChange={this.onChangeSpecialSkill.bind(this)} 
                                                                                    autoComplete="off"   
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="languageSpoken"
                                                                                    value={this.state.languageSpoken}
                                                                                    placeholder="LANGUAGE SPOKEN"
                                                                                    onChange={this.onChangeLanguageSpoken.bind(this)} 
                                                                                    autoComplete="off"    
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="emergencyContactName"
                                                                                    value={this.state.emergencyContactName}
                                                                                    placeholder="EMERGENCY CONTACT NAME"
                                                                                    onChange={this.onChangeEmergencyContactName.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="relationship"
                                                                                    value={this.state.relationship}
                                                                                    placeholder="RELATIONSHIP"
                                                                                    onChange={this.onChangeRelationship.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="contactnumber"
                                                                                    value={this.state.contactnumber}
                                                                                    placeholder="CONTACT NUMBER"
                                                                                    onChange={this.onChangeContactNumber.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="sss"
                                                                                    value={this.state.sss}
                                                                                    placeholder="SSS #"
                                                                                    onChange={this.onChangeSSS.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="tin"
                                                                                    value={this.state.tin}
                                                                                    placeholder="TIN #"
                                                                                    onChange={this.onChangeTin.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="philhealth"
                                                                                        value={this.state.philhealth}
                                                                                        placeholder="PHILHEALTH"
                                                                                        onChange={this.onChangePhilHealth.bind(this)} 
                                                                                        autoComplete="off"
                                                                                    />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="pagibig"
                                                                                    value={this.state.pagibig}
                                                                                    placeholder="PAGIBIG #"
                                                                                    onChange={this.onChangePagibig.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row> 
                                                                    </Card.Body>
                                                                </Card>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>

                                    <Tab eventKey="education" title="II. EDUCATION">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row className="mt-3">
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id='basic-example'
                                                                    onChange={this.handleChangeLevel}
                                                                    options={this.state.levelList}
                                                                    placeholder="LEVEL"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="schoolName"
                                                                    value={this.state.schoolName}
                                                                    placeholder="SCHOOL NAME"
                                                                    onChange={this.onChangeSchoolName.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="course"
                                                                    value={this.state.course}
                                                                    placeholder="COURSE"
                                                                    onChange={this.onChangeCourse.bind(this)} 
                                                                    autoComplete="off" 
                                                                    
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="startYear"
                                                                    value={this.state.startYear}
                                                                    placeholder="START YEAR"
                                                                    onChange={this.onChangeStartYear.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="endYear"
                                                                    value={this.state.endYear}
                                                                    placeholder="END YEAR"
                                                                    onChange={this.onChangeEndYear.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="honorsAward"
                                                                    value={this.state.honorsAward}
                                                                    placeholder="HONOR(s)/AWARD(s)"
                                                                    onChange={this.onChangeHonorsAward.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>


                                    <Tab eventKey="employement" title="III. EMPLOYMENT RECORD (START WITH LATEST EMPLOYER)">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row className="mt-3">
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="companyName"
                                                                    value={this.state.companyName}
                                                                    placeholder="COMPANY NAME"
                                                                    onChange={this.onChangeCompanyName.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="companyAddress"
                                                                    value={this.state.companyAddress}
                                                                    placeholder="COMPANY ADDRESS"
                                                                    onChange={this.onChangeCompanyAddress.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="position"
                                                                    value={this.state.position}
                                                                    placeholder="POSITION"
                                                                    onChange={this.onChangePosition.bind(this)} 
                                                                    autoComplete="off" 
                                                                    
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="periodCovered"
                                                                    value={this.state.periodCovered}
                                                                    placeholder="PERIOD COVERED"
                                                                    onChange={this.onChangePeriodCovered.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="salary"
                                                                    value={this.state.salary}
                                                                    placeholder="SALARY"
                                                                    onChange={this.onChangeSalary.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="supervisor"
                                                                    value={this.state.supervisor}
                                                                    placeholder="SUPERVISOR"
                                                                    onChange={this.onChangeSupervisor.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="companycontactNo"
                                                                    value={this.state.companycontactNo}
                                                                    placeholder="CONTACT NUMBER"
                                                                    onChange={this.onChangeCompanyContactNo.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="reasonforleaving"
                                                                    value={this.state.reasonforleaving}
                                                                    placeholder="REASON FOR LEAVING"
                                                                    onChange={this.onChangeReasonforLeaving.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="tax"
                                                                    value={this.state.tax}
                                                                    placeholder="TAXABLE COMPENSATION INCOME"
                                                                    onChange={this.onChangeTax.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="withHeldTax"
                                                                    value={this.state.withHeldTax}
                                                                    placeholder="WITHHELD TAX"
                                                                    onChange={this.onChangeWithHeldTax.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="yearOf"
                                                                    value={this.state.yearOf}
                                                                    placeholder="YEAR OF COMPENSATION"
                                                                    onChange={this.onChangeYearOf.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="month"
                                                                    value={this.state.month}
                                                                    placeholder="13TH MONTH PAY AND OTHER BENEFITS"
                                                                    onChange={this.onChange13thMonth.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="deminimisBenefits"
                                                                    value={this.state.deminimisBenefits}
                                                                    placeholder="DEMINIMIS BENEFITS"
                                                                    onChange={this.onChangeDeminimisBenefits.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="mandatoryDeduction"
                                                                    value={this.state.mandatoryDeduction}
                                                                    placeholder="MANDATORY DEDUCTION"
                                                                    onChange={this.onChangeMandatoryDeduction.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="nonTaxable"
                                                                    value={this.state.nonTaxable}
                                                                    placeholder="NON TAXABLE SALARIES & OTHER FORMS OF COMPENSATION"
                                                                    onChange={this.onChangeNonTaxable.bind(this)} 
                                                                    autoComplete="off" 
                                                                    
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="basicSalary"
                                                                    value={this.state.basicSalary}
                                                                    placeholder="BASIC SALARY"
                                                                    onChange={this.onChangeBasicSalary.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="taxable13thMonthPay"
                                                                    value={this.state.taxable13thMonthPay}
                                                                    placeholder="TAXABLE 13TH MONTH PAY & OTHER BENEFITS"
                                                                    onChange={this.onChangeTaxable13thMonth.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="taxableSalary"
                                                                    value={this.state.taxableSalary}
                                                                    placeholder="TAXABLE SALARIES & OTHER FORMS OF COMPENSATION"
                                                                    onChange={this.onChangeTaxableSalary.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="basicPay"
                                                                    value={this.state.basicPay}
                                                                    placeholder="BASIC PAY FOR MWE"
                                                                    onChange={this.onChangeBasicPay.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="holiday"
                                                                    value={this.state.holiday}
                                                                    placeholder="HOLIDAY PAY FOR HWE"
                                                                    onChange={this.onChangeHoliday.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="overtimePay"
                                                                    value={this.state.overtimePay}
                                                                    placeholder="OVERTIME PAY FOR HWE"
                                                                    onChange={this.onChangeOverTimePay.bind(this)} 
                                                                    autoComplete="off" 
                                                                    
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="nightDif"
                                                                    value={this.state.nightDif}
                                                                    placeholder="NIGHT DIFFERENTIAL PAY FOR HWE"
                                                                    onChange={this.onChangeNightDif.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="remarks"
                                                                    value={this.state.remarks}
                                                                    placeholder="REMARKS"
                                                                    onChange={this.onChangeRemarks.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>

                                    <Tab eventKey="family" title="IV. FAMILY BACKGROUND">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row className="mt-3">
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id='basic-example'
                                                                    onChange={this.handleChangeRole}
                                                                    options={this.state.RoleList}
                                                                    placeholder="ROLE"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="Name"
                                                                    value={this.state.Name}
                                                                    placeholder="NAME"
                                                                    onChange={this.onChangeName.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="Age"
                                                                    value={this.state.Age}
                                                                    placeholder="AGE"
                                                                    onChange={this.onChangeAges.bind(this)} 
                                                                    autoComplete="off" 
                                                                    
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="Occupations"
                                                                    value={this.state.occupations}
                                                                    placeholder="OCCUPATION"
                                                                    onChange={this.onChangeOccupations.bind(this)} 
                                                                    autoComplete="off" 
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                <Form.Control 
                                                                    type="text"
                                                                    name="Company"
                                                                    value={this.state.Company}
                                                                    placeholder="COMPANY OR SCHOOL"
                                                                    onChange={this.onChangeCompany.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>

                                    <Tab eventKey="other" title="V. OTHERS">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                <Card>
                                                                    <Card.Body className="mt-3">
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                            <Typeahead
                                                                                labelKey='name'
                                                                                id='basic-example'
                                                                                onChange={this.handleChangeJobOpening}
                                                                                options={this.state.JobOpeningList}
                                                                                placeholder="HOW DID YOU LEARN ABOUT THIS JOB OPENING?"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="refferedby"
                                                                                value={this.state.refferedBy}
                                                                                placeholder="REFERRED BY"
                                                                                onChange={this.onChangeRefferedBy.bind(this)} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Card.Body>
                                                                </Card>
                                                            </Form.Group>
                                                        </Form.Row>


                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                <Card>
                                                                    <Card.Body className="mt-3">
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                                <Form.Check type="checkbox" 
                                                                                    label="DO YOU HAVE RELATIVES OR FRIENDS PRESENTLY CONNECTED WITH THIS COOPERATIVE?" 
                                                                                    name="Relative"
                                                                                    onChange={this.handleChangeRelative}
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="relativeName"
                                                                                    value={this.state.relativeName}
                                                                                    placeholder="NAME"
                                                                                    onChange={this.onChangeRelativeName.bind(this)}
                                                                                    disabled = { this.state.Relative}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="relationShip"
                                                                                    value={this.state.relationShip}
                                                                                    placeholder="RELATIONSHIP"
                                                                                    onChange={this.onChangeRelationShip.bind(this)}
                                                                                    disabled = { this.state.Relative} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="jobTittle"
                                                                                    value={this.state.jobTittle}
                                                                                    placeholder="JOB TITLE"
                                                                                    onChange={this.onChangeJobTittle.bind(this)}
                                                                                    disabled = { this.state.Relative} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Form.Group>
                                                        </Form.Row>

                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                <Card>
                                                                    <Card.Body className="mt-3">
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                                <Form.Check type="checkbox" 
                                                                                    label="HAVE YOU BEEN CONVICTED OF A CRIME?" 
                                                                                    name="Convicted"
                                                                                    onChange={this.handleChangeConvicted}
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="crime"
                                                                                    value={this.state.crime}
                                                                                    placeholder="IF YES, PLEASE GIVE DETAILS:"
                                                                                    onChange={this.onChangeCrime.bind(this)}
                                                                                    disabled = { this.state.Convicted} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Form.Group>
                                                        </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group controlId="formGridPassword" as={Col}>
                                                            <Card>
                                                                <Card.Body className="mt-3">
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                            <Form.Check type="checkbox" 
                                                                                label="HAVE YOU BEEN A MEMBER OF A LABOR UNION?" 
                                                                                name="LaborUnion"
                                                                                onChange={this.handleChangeLaborUnion}
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="details"
                                                                                value={this.state.details}
                                                                                placeholder="IF YES, GIVE DETAILS:"
                                                                                onChange={this.onChangeDetails.bind(this)}
                                                                                disabled = { this.state.LaborUnion} 
                                                                                autoComplete="off"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                            <Typeahead
                                                                                labelKey='name'
                                                                                id='basic-example'
                                                                                onChange={this.handleChangeChronicDisease}
                                                                                options={this.state.chronicDiseaseList}
                                                                                placeholder="HAVE YOU SUFFERED OR BEEN DIAGNOSED TO HAVE ANY OF THE FF. CHRONIC DISEASE(S) OR LIKES?"
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Card.Body>
                                                            </Card>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>


                                    <Tab eventKey="reference" title="VI. REFERENCES (NOT RELATED TO YOUR FAMILY)">
                                        <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Row className="mt-3">
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="referenceName"
                                                                    value={this.state.referenceName}
                                                                    placeholder="name"
                                                                    onChange={this.onChangeReferenceName.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="referenceOccupation"
                                                                    value={this.state.referenceOccupation}
                                                                    placeholder="OCCUPATION"
                                                                    onChange={this.onChangeReferenceOccupation.bind(this)} 
                                                                    autoComplete="off"
                                                                /> 
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="companyorschool"
                                                                    value={this.state.companyorschool}
                                                                    placeholder="COMPANY OR SCHOOL"
                                                                    onChange={this.onChangeCompanyOrSchool.bind(this)} 
                                                                    autoComplete="off"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="referencecontactNo"
                                                                    value={this.state.referencecontactNo}
                                                                    placeholder="CONTACT NUMBER"
                                                                    onChange={this.onChangeReferenceContactNumber.bind(this)} 
                                                                    autoComplete="off"
                                                                /> 
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Card.Body>
                                                </Card>
                                            </Form.Group>
                                        </Form.Row>
                                    </Tab>

                                </Tabs>
                                                
                                <ButtonToolbar className="mt-3">
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                        Save
                                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="success" onClick={this.handleSubmitClick}>
                                        Submit
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/ApplicationForm">
                                        Back
                                    </Button>
                                </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                    <div style={{height: '20px'}}></div>
                    <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default ApplicationFormView;