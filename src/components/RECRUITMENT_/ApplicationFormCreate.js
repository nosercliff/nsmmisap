import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, ReactDOM,
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab, Accordion,Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

class ApplicationFormCreate extends Component {
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
            navigate    : false,

            positionList	:   [],
            firstName       :   "",
            date            :   "",
            middleName      :   "",
            lastName        :   "",
            nickName        :   "",
            homePhoneNo     :   "",
            officePhoneNo   :   "",
            mobileNo        :   "",
            emailAdd        :   "",
            facebook        :   "",
            twitter         :   "",
            CitizenshipList :   [
                {"name":"FILIPINO","id":"1"},
                {"name":"OTHERS","id":"2"}
            ],
            CitizenshipId   :   "",
            GenderId        :   "",
            GenderList      :   [
                {"name":"MALE","id":"1"},
                {"name":"FEMALE","id":"2"}
            ],
            ReligionId      :   "",
            ReligionList    :   [
                {"name":"ADVENTIST","id":"1"},
                {"name":"AGLIPAY","id":"2"},
                {"name":"ALLIANCE","id":"3"},
                {"name":"APOSTLIC HOLINESS","id":"4"},
                {"name":"ASSEMBLY OF GOD","id":"5"},
                {"name":"BAPTIST","id":"6"},
                {"name":"BIBLE BAPTIST","id":"7"},
                {"name":"BORN AGAIN","id":"8"},
                {"name":"BORN AGAIN CHRISTIAN","id":"9"},
                {"name":"CATHOLIC","id":"10"},
                {"name":"CHRISTIAN","id":"11"},
                {"name":"CHRISTIAN(BORN AGAIN)","id":"12"},
                {"name":"CHURCH OF GOD","id":"13"},
                {"name":"EVANGILICAL","id":"14"},
                {"name":"IEMELIF","id":"15"},
                {"name":"IGLESIA NI CHRISTO","id":"16"},
                {"name":"ISLAM","id":"17"},
                {"name":"JEHOVA WITNESS","id":"18"},
                {"name":"JEHOVAH'S WITNESS","id":"19"},
                {"name":"JEHOVA'S WITNESS","id":"20"},
                {"name":"MCGI","id":"21"},
                {"name":"METHODIST","id":"22"},
                {"name":"MORMON","id":"23"},
                {"name":"MORMONS","id":"24"},
                {"name":"N/A","id":"25"},
                {"name":"OTHERS","id":"26"},
                {"name":"PENTECOSTAL","id":"27"},
                {"name":"PIC","id":"28"},
                {"name":"PINICOCS","id":"29"},
                {"name":"PROTESTANT","id":"30"},
                {"name":"ROMAN CATHOLIC","id":"31"},
                {"name":"SDA","id":"32"},
                {"name":"SEVENTH DAYA ADVENTIST","id":"33"},
                {"name":"THE CHURCH OF JESUS CHRIST","id":"34"},
                {"name":"UCCP","id":"35"},
                {"name":"UNION ESPIRITISTA" ,"id":"36"},
                {"name":"UPC","id":"37"},
                {"name":"V.C.C.P","id":"38"}

            ],
            CivilStatusId   :   "",
            CivilStatusList :   [
                {"name":"SINGLE","id":"1"},
                {"name":"MARRIED","id":"2"},
                {"name":"DIVORCED","id":"3"},
                {"name":"SEPERATED","id":"4"}

            ],
            dateOfBirth             :   "",
            getCurrentYear          :   new Date(),
            placeofbirth            :   "",
            height                  :   "",
            weight                  :   "",
            languageSpoken          :   "",
            specialskill            :   "",
            emergencyContactName    :  "",
            relationship            :   "",
            contactnumber	        :   "",
            sss                     :   "",
            tin                     :   "",
            philhealth              :   "",
            pagibig                 :   "",
            refferedBy              :   "",
            JobopeningId            :   "",
            JobOpeningList          :   [
                {"name":"BESTJOBS","id":"1"},
                {"name":"CLASSIFIED ADD","id":"2"},
                {"name":"FIELD COLLECTORS","id":"3"},
                {"name":"JOBSTREET","id":"4"},
                {"name":"OTHERS","id":"5"},
                {"name":"PESO","id":"6"},
                {"name":"REFERRAL","id":"7"},
            ],
            relativeName        :   "",
            relationShip        :   "",
            jobTittle           :   "",
            crime               :   "",
            ChronicDiseaseId    :   "",
            chronicDiseaseList  :   [
                {"name":"ALLERGIES","id":"1"},
                {"name":"ASTHMA","id":"2"},
                {"name":"DIABETES","id":"3"},
                {"name":"HEPA B","id":"4"},
                {"name":"HYPERTENSION","id":"5"},
                {"name":"N/A","id":"6"},
                {"name":"OTHERS","id":"7"}

            ],
            Age                 :   "",
            details             :   "",
            clientList          :   [],
            fullName            :   "",
            applyDATE           :   "",
            applicationFormNo   :   "",
            clients             :   "",
            positionsApplied    :   "",
            status              :   "",
            command             :   "",
            regionList          :   [],
            selectedRegion      :   "",
            selectedRegionId    :   "",
            provinceList        :   [],
            selectedProvinceId  :   "",
            selectedProvince    :   "",
            citylist            :   [],
            selectedCity        :   "",
            selectedCityId      :   "",
            house               :   "",
            street              :   "",
            barangay            :   "",
            postalcode          :   "",
            levelList  :    [
                {"name":"COLLEGE","id":"1"},
                {"name":"HIGH SCHOOL","id":"2"},
                {"name":"ELEMENTARY","id":"3"},
                {"name":"OTHERS","id":"4"}
            ],
            level               :   "",
            levelId	            :   "",
            schoolName          :   "",
            course              :   "",
            startYear	        :   "",
            endYear             :   "",
            honorsAward         :   "",
            companyName         :   "",
            companyAddress      :   "",
            position            :   "",
            periodCovered       :   "",
            salary              :   "",
            supervisor          :   "",
            companycontactNo    :   "",
            reasonforleaving    :   "",
            tax                 :   "",
            withHeldTax         :   "",
            yearOF              :   "",
            month               :   "",
            deminimisBenefits   :   "",
            mandatoryDeduction  :   "",
            nonTaxable          :   "",
            basicSalary         :   "",
            taxable13thMonthPay :   "",
            taxableSalary       :   "",
            basicPay	        :   "",
            holiday             :   "",
            overtimePay         :   "",
            nightDif            :   "",
            remarks             :   "",
            occupations         :   "",
            referenceName       :   "",
            referenceOccupation :   "",
            companyorschool     :   "",
            referencecontactNo  :   "",
            TypeList:[
                {"name":"CURRENT ADDRESS","id":"1"},
                {"name":"REGISTERED ADDRESS","id":"2"},
                {"name":"PROVINCIAL ADDRESS","id":"3"},
                {"name":"CORRESPONDENCE ADDRESS","id":"4"},
                {"name":"FOREIGN ADDRESS","id":"5"},
            ],
            roleId:"",
            RoleList:[
                {"name":"FATHER","id":"1"},
                {"name":"MOTHER","id":"2"},
                {"name":"SPOUSE","id":"3"},
                {"name":"BROTHER","id":"4"},
                {"name":"SISTER","id":"5"},
                {"name":"CHILD","id":"6"},
            ],
            selectedClientId            :   "",
            selectedPositionId          :   "",
            selectedPositionName        :   "",
            selectedDepartmentId        :   "",
            departmentCodeAutocomplete  :   [],
            selectedSectionId           :   "",
            sectionAutocomplete         :   [],
            // checked : false,
            LaborUnion                  :   "false",
            Convicted                   :   "false",
            /* Relative                    :   false, */
            selectedReligion            :   "",
            selectedReligionId          :   "",
            dateApplied                 :   "",
            ageYear                     :   new Date().getFullYear(),
            ageMonth                    :   new Date().getMonth()+1,
            titleName : [
                { "name" : "MR." },
                { "name" : "MS." },
                { "name" : "MRS." }
            ],
            educationTableList      :   [],
            employmentTableList     :   [],
            referenceTableList      :   [],
            informationTableList    :   [],
            tblLevelArrLst          :   [],
            newEducationTableList   :   [],
            newEmploymentTableList  :   [],
            familyTableList         :   [],
            tblRoleArrLst           :   [],
            newFamilyTableList      :   [],
            newReferenceTableList   :   [],
            checkOthersRelativeYes           :   false,
            disabledRelative        :   true,
            checkConvictedYes          :   false,
            disabledConvicted       :   true,
            checkLaborUnionYes         :   false,
            disabledChronicDisease      :   true,
            othersTableList         :   [],
            otherRelationShip       :   "",
            firstNameFocus : true,
            educationContactName : "",
            educationContactNumber : "",
            familyContactNumber : "",
            othersRelativeContactNumber : "",
            
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
        this.GetLevel();
        this.GetRoleList();
        // this.GetDepartment(); 
    }



    GetLevel() {
        //console.log("this.state.levelList")
        //console.log(this.state.levelList)

        for (let i = 0; i < this.state.levelList.length; i++) {
            const obj = {
                value : this.state.levelList[i]["id"],
                label : this.state.levelList[i]["name"],
            };
            this.state.tblLevelArrLst.push(obj);
        }
        
    }

    GetRoleList() {
        //console.log("this.state.RoleList")
        //console.log(this.state.RoleList)

        for (let i = 0; i < this.state.RoleList.length; i++) {
            const obj = {
                value : this.state.RoleList[i]["id"],
                label : this.state.RoleList[i]["name"],
            };
            this.state.tblRoleArrLst.push(obj);
        }
        
    }

    /* onChangeClient(e){
        ////console.log(e)
        this.setState({client:e.target.value})
    } */


    /* onChangePositionApplied(e){
        ////console.log(e)
        this.setState({positionApplied:e.target.value})
    } */

    onChangeFirstName(e){
        ////console.log(e)
        this.setState({
            firstName:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeMiddlename(e){
        ////console.log(e)
        this.setState({
            middleName:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeNickname(e){
        ////console.log(e)
        this.setState({nickName:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeLastname(e){
        ////console.log(e)
        this.setState({lastName:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeFullName(e){
        ////console.log(e)
        this.setState({fullName:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeAppliedDate(e){
        ////console.log(e)
        this.setState({appliedDate:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeApplicationFOrmNo(e){
        ////console.log(e)
        this.setState({applicationFormNo:e.target.value})
    }

    onChangeClients(e){
        ////console.log(e)
        this.setState({clients:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangePositionsApplied(e){
        ////console.log(e)
        this.setState({positionsApplied:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeStatus(e){
        ////console.log(e)
        this.setState({status:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeCommand(e){
        ////console.log(e)
        this.setState({command:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    handleChangeDate = date => {
        ////console.log(date)
        this.setState({
            dateApplied: date,
            isshow:false,
        })
    }

    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
        }

    handleChangeReligion= (e) => {
        ////console.log(e)
        if (e.length > 0) {
            this.state.selectedReligion = e[0].name
            this.state.selectedReligionId = e[0].id
        } else {
            this.state.selectedReligion = ""
            this.state.selectedReligionId = ""
        }
        this.setState({
            isshow:false,
        })
        ////console.log(this.state.selectedReligionId);
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
        this.setState({
            isshow:false,
        })
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
        this.setState({
            isshow:false,
        })
        ////console.log(this.state.selectedCity);
        
    }
    
    onChangeHouse(e){
        ////console.log(e)
        /* this.setState({house:e.target.value.toUpperCase(),
            isshow:false,
        }) */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({house: e.target.value})
        }
    }

    onChangeStreet(e){
        ////console.log(e)
        this.setState({street:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeBarangay(e){
        ////console.log(e)
        this.setState({barangay:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangePostalCode(e){
        ////console.log(e)
        /* this.setState({postalcode:e.target.value.toUpperCase(),
            isshow:false,
        }) */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({postalcode: e.target.value})
        }
    }
        
    onChangeHomePhoneNo(e){
        ////console.log(e)
       /*  this.setState({homePhoneNo:e.target.value.toUpperCase(),
            isshow:false,
        }) */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({homePhoneNo: e.target.value,isshow:false,})
        }

        if(this.state.homePhoneNo.length > 11){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter Home Phone Number Max Lenght 11 under I. GENERAL INFORMATION",
                fade:true
            });
            return
        }
    }

    onChangeOfficePhoneNo(e){
        ////console.log(e)
        /* this.setState({officePhoneNo:e.target.value.toUpperCase(),
            isshow:false,
        }) */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({officePhoneNo: e.target.value})
        }
    }

    onChangeMobileNo(e){
        ////console.log(e)
        /* this.setState({mobileNo:e.target.value.toUpperCase(),
            isshow:false,
        }) */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({mobileNo: e.target.value})
        }
    }

    onChangeEmailAdd(e){
        ////console.log(e)
        this.setState({emailAdd:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeFacebook(e){
        ////console.log(e)
        this.setState({facebook:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    onChangeTwitter(e){
        ////console.log(e)
        this.setState({twitter:e.target.value.toUpperCase(),
            isshow:false,
        })
    }

    handleChangeCitizenship= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.Citizenship = e[0].name
            this.state.CitizenshipId = e[0].id
            //////console.log(this.state.CitizenshipId = e[0].id)
        } else {
            this.state.Citizenship = ""
            this.state.CitizenshipId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    handleChangeGender= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.Gender = e[0].name
            this.state.GenderId = e[0].id
        }else{
            this.state.Gender = ""
            this.state.GenderId = ""
        }
        this.setState({
            isshow:false,
        })
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
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedRegion = e[0].name
            this.state.selectedRegionId = e[0].id
        } else {
            this.state.selectedRegion = ""
            this.state.selectedRegionId = ""
        }
        this.setState({
            isshow:false,
        })
        ////console.log(this.state.selectedRegion);
        
    }

    handleChangeCivilStatus= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.CivilStatus = e[0].name
            this.state.CivilStatusId = e[0].id
        }else{
            this.state.CivilStatus = ""
            this.state.CivilStatusId = ""
        }
        this.setState({
            isshow:false,
        })
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
        //console.log(age_now);
        /* return age_now; */
        this.setState({
            dateOfBirth: date,
           /*  ageMonth    : date.getMonth()+1,
            ageYear     : date.getFullYear(), */
            isshow:false,
        });

        if(date > null) {
            this.state.ageMonth = date.getMonth()+1
            this.state.ageYear = date.getFullYear()
        }else{
            this.state.ageMonth = ""
            this.state.ageYear = ""
            this.state.totalAge = "0"
        }

        /* if(this.state.dateOfBirth == "") {
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "Date of birth cannot be empty",
                fade            :   true
            })
            return;
        } */
        
       /*  if(date.length > 0) {
            this.state.ageMonth    = date.getMonth()+1
            this.state.ageYear     = date.getFullYear()
        }else{
            this.state.ageMonth    = date.getMonth()+1
            this.state.ageYear     = date.getFullYear()
        } */
        /* if(this.state.dateOfBirth === "") {
            this.state.ageMonth  = "";
            this.state.ageYear  = "";
        }else {
            this.state.ageMonth  = date.getMonth()+1;
            this.state.ageYear  = date.getFullYear();
        }
        */

    }

    onChangeAgeMonth(e){
        ////console.log(e)
        this.setState({totalAge:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangePlaceOfBirth(e){
        ////console.log(e)
        this.setState({placeofbirth:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeHeight(e){
        ////console.log(e)
        this.setState({height:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeweight(e){
        ////console.log(e)
        this.setState({weight:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeSpecialSkill(e){
        ////console.log(e)
        this.setState({specialskill:e.target.value.toUpperCase(),
            isshow:false,
        });
    }
    
    onChangeLanguageSpoken(e){
        ////console.log(e)
        this.setState({languageSpoken:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeEmergencyContactName(e){
        ////console.log(e)
        this.setState({emergencyContactName:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeRelationship(e){
        ////console.log(e)
        this.setState({relationship:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeContactNumber(e){
        ////console.log(e)
        /* this.setState({contactnumber:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({contactnumber: e.target.value})
        }
    }

    onChangeSSS = (e) => {
        this.setState({sss: e.target.value})
        //const re = /^[0-9\b]+$/;
        /* if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({sss: e.target.value})
        } */

        ////console.log(e)
        /* this.setState({sss	 :  e.target.value,
            isshow:false,
        }); */

        /* let sss = e.target.value;

        if (!Number(sss)) {
        return;
        }

        this.setState({ [e.target.name]: sss, isshow:false}); */
    }

    onChangeTin(e){
        ////console.log(e)
        /* this.setState({tin:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        this.setState({tin: e.target.value})
        /* const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({tin: e.target.value})
        } */
    }

    onChangePhilHealth(e){
        ////console.log(e)
        /* this.setState({philhealth:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        this.setState({philhealth: e.target.value})
        const re = /^[0-9\b]+$/;
        /* if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({philhealth: e.target.value})
        } */
    }

    onChangePagibig(e){
        ////console.log(e)
        /* this.setState({pagibig:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        //const re = /^[0-9\b]+$/;
        //const re = /[0–9]{3}[\-\.\s]/;
        /* const re = /(\d{3})(\d{3})(\d{4})/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({pagibig: e.target.value})
        } */
        this.setState({pagibig: e.target.value})
        
    }

    handleChangeLevel= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.level = e[0].name
            this.state.levelId = e[0].id
        }else{
            this.state.level = ""
            this.state.levelId = ""
        }
        this.setState({
            isshow:false,
        });
    }

    onChangeSchoolName(e){
        ////console.log(e)
        this.setState({schoolName:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeCourse(e){
        ////console.log(e)
        this.setState({course:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeStartYear(e){
        ////console.log(e)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({startYear: e.target.value})
        }
        /* this.setState({startYear:e.target.value.toUpperCase(),
            isshow:false,
        }); */
    }

    onChangeEndYear(e){
        ////console.log(e)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({endYear: e.target.value})
        }
        /* this.setState({endYear:e.target.value.toUpperCase(),
            isshow:false,
        }); */
    }

    onChangeHonorsAward(e){
        ////console.log(e)
        this.setState({honorsAward:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeCompanyName(e){
        ////console.log(e)
        this.setState({companyName:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeCompanyAddress(e){
        ////console.log(e)
        this.setState({companyAddress:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangePosition(e){
        ////console.log(e)
        this.setState({position:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangePeriodCovered(e){
        ////console.log(e)
        this.setState({periodCovered:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeSalary(e){
        ////console.log(e)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({salary: e.target.value})
        }
        /* this.setState({salary:e.target.value.toUpperCase(),
            isshow:false,
        }); */
    }
    onChangeSupervisor(e){
        ////console.log(e)
        this.setState({supervisor:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeCompanyContactNo(e){
        ////console.log(e)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({companycontactNo: e.target.value})
        }
    }

    onChangeReasonforLeaving(e){
        ////console.log(e)
        this.setState({reasonforleaving:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    /* onChangeTax(e){
        ////console.log(e)
        this.setState({tax:e.target.value})
    } */
    onChangeTax(e){
        ////console.log(e)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({tax: e.target.value})
        }
    }

    onChangeWithHeldTax(e){
        ////console.log(e)
        /* this.setState({withHeldTax:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({withHeldTax: e.target.value})
        }
    }

    onChangeYearOf(e){
        ////console.log(e)
        /* this.setState({yearOf:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({yearOf: e.target.value})
        }
    }

    onChange13thMonth(e){
        ////console.log(e)
        /* this.setState({month:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({month: e.target.value})
        }
    }

    onChangeDeminimisBenefits(e){
        ////console.log(e)
        /* this.setState({deminimisBenefits:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({deminimisBenefits: e.target.value})
        }
    }

    onChangeMandatoryDeduction(e){
        ////console.log(e)
        /* this.setState({mandatoryDeduction:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({mandatoryDeduction: e.target.value})
        }
    }

    onChangeNonTaxable(e){
        ////console.log(e)
        /* this.setState({nonTaxable:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({nonTaxable: e.target.value})
        }
    }

    onChangeBasicSalary(e){
        ////console.log(e)
        /* this.setState({basicSalary:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({basicSalary: e.target.value})
        }
    }

    onChangeTaxable13thMonth(e){
        ////console.log(e)
        /* this.setState({taxable13thMonthPay:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({taxable13thMonthPay: e.target.value})
        }
    }

    onChangeTaxableSalary(e){
        ////console.log(e)
        /* this.setState({taxableSalary:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({taxableSalary: e.target.value})
        }
    }

    onChangeBasicPay(e){
        ////console.log(e)
        /* this.setState({basicPay:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({basicPay: e.target.value})
        }
    }

    onChangeHoliday(e){
        ////console.log(e)
        /* this.setState({holiday:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({holiday: e.target.value})
        }
    }

    onChangeOverTimePay(e){
        ////console.log(e)
        /* this.setState({overtimePay:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({overtimePay: e.target.value})
        }
    }

    onChangeNightDif(e){
        ////console.log(e)
        /* this.setState({nightDif:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({nightDif: e.target.value})
        }
    }

    onChangeRemarks(e){
        ////console.log(e)
        this.setState({remarks:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    handleChangeOthersJobOpening= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.Jobopening = e[0].name
            this.state.JobopeningId = e[0].id
        }else{
            this.state.Jobopening = ""
            this.state.JobopeningId = ""
        }
        this.setState({
            isshow:false,
        });
    }

    onChangeOthersRefferedBy(e){
        ////console.log(e)
        this.setState({refferedBy:e.target.value.toUpperCase(),
            isshow:false,
        });
        ////console.log(this.state.refferedBy)
    }

    onChangeOthersRelativeName(e){
        ////console.log(e)
        this.setState({relativeName:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeOthersRelationShip(e){
        ////console.log(e)
        this.setState({otherRelationShip:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeJobTittle(e){
        ////console.log(e)
        this.setState({jobTittle:e.target.value.toUpperCase()})
    }

    onChangeCrime(e){
        ////console.log(e)
        this.setState({crime:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeDetails(e){
        ////console.log(e)
        this.setState({details:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    handleChangeChronicDisease= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.ChronicDisease = e[0].name
            this.state.ChronicDiseaseId = e[0].id
        }else{
            this.state.ChronicDisease = ""
            this.state.ChronicDiseaseId = ""
        }
        this.setState({
            isshow:false,
        });
    }

    handleChangeType= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.type = e[0].name
            this.state.typeId = e[0].id
        }else{
            this.state.type = ""
            this.state.typeId = ""
        }
        this.setState({
            isshow:false,
        });
    }

    onChangeReferenceName(e){
        ////console.log(e)
        this.setState({referenceName:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

     onChangeOccupations(e){
        ////console.log(e)
        this.setState({occupations:e.target.value.toUpperCase(),
            isshow:false,
        });
    }
    
    onChangeCompanyOrSchool(e){
        ////console.log(e)
        this.setState({companyorschool:e.target.value.toUpperCase(),
            isshow:false,
        });
    }
    onChangeReferenceContactNumber(e){
        ////console.log(e)
        this.setState({referencecontactNo:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    handleChangeRole= (e) => {
        //////console.log(e)
        if(e.length > 0) {
            this.state.role = e[0].name
            this.state.roleId = e[0].id
        }else{
            this.state.role = ""
            this.state.roleId = ""
        }
        this.setState({
            isshow:false,
        });
    }

    onChangeCompany(e){
        ////console.log(e)
        this.setState({Company:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeReferenceOccupation(e){
        ////console.log(e)
        this.setState({referenceOccupation:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    onChangeAges(e){
        ////console.log(e)
        /* this.setState({Age:e.target.value.toUpperCase(),
            isshow:false,
        }); */
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({Age: e.target.value})
        }
    }

    onChangeName(e){
        ////console.log(e)
        this.setState({Name:e.target.value.toUpperCase(),
            isshow:false,
        });
    }

    handleCoverChangeClient = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.setState({
            isshow:false,
        })

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
            ////console.log("Get Client List");
            ////console.log(data);
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
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId":"",
            "DepartmentId":"",
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionParams)
        .then(res => {
            const data = res.data;
            ////console.log("Get Position Name");
            ////console.log(data);
            this.setState({ positionList  : data.positions });
        })
        
    }

    
    handleChangePosition = (e) => {
        ////console.log(e)
            if (e.length > 0) {
            this.state.selectedPositionName = e[0].name
            this.state.selectedPositionId = e[0].id
        } else {
            this.state.selectedPositionName = ""
            this.state.selectedPositionId = ""
        }
        this.setState({
            isshow:false,
        })
    }

    
    
    /* handleChangeLaborUnion  = (e) =>{
        this.state.checkLaborUnionYes = e.target.checked
        if(this.state.checkLaborUnionYes == true) {
            this.setState({
                disabledLaborUnion  :   false,
                details             :   "",
            })
        }
        else{
            this.setState({disabledLaborUnion: true})
            
        }
    } */


    
    onChangeOthersRelativeYes  = (e) =>{
        this.state.checkOthersRelativeYes = e.target.checked
        if(this.state.checkOthersRelativeYes == true) {
            this.setState({
                checkOthersRelativeNo  :   false,
                disabledRelative  		  :   false,
            })
        }
    }
    
    onChangeOthersRelativeNo  = (e) =>{
        this.state.checkOthersRelativeNo = e.target.checked
        if(this.state.checkOthersRelativeNo == true) {
            this.setState({
                disabledRelative  :   true,
                checkOthersRelativeYes  		  :   false,
                relativeName : "",
                othersRelativeContactNumber : "",
                otherRelationShip : "",
                jobTittle : "",
            })
        }
    }
    
    onChangeOthersConvictedYes  = (e) =>{
        this.state.checkConvictedYes = e.target.checked
        if(this.state.checkConvictedYes == true) {
            this.setState({
                checkConvictedNo  :   false,
                disabledConvicted  		  :   false,
            })
        }
    }
    
    onChangeOthersConvictedNo  = (e) =>{
        this.state.checkConvictedNo = e.target.checked
        if(this.state.checkConvictedNo == true) {
            this.setState({
                disabledConvicted  :   true,
                checkConvictedYes  		  :   false,
                crime : "",
            })
        }
    }
    
    onChangeOthersLaborUnionYes  = (e) =>{
        this.state.checkLaborUnionYes = e.target.checked
        if(this.state.checkLaborUnionYes == true) {
            this.setState({
                checkLaborUnionNo  :   false,
                disabledLaborUnion  		  :   false,
            })
        }
    }
    
    onChangeOthersLaborUnionNo  = (e) =>{
        this.state.checkLaborUnionNo = e.target.checked
        if(this.state.checkLaborUnionNo == true) {
            this.setState({
                checkLaborUnionYes  :   false,
                disabledLaborUnion  		  :   true,
                details : "",
            })
        }
    }
    
    onChangeOthersChronicDiseaseYes  = (e) =>{
        this.state.checkChronicDiseaseYes = e.target.checked
        if(this.state.checkChronicDiseaseYes == true) {
            this.setState({
                checkChronicDiseaseNo  :   false,
                disabledChronicDisease  		  :   false,
            })
        }
    }
    
    onChangeOthersChronicDiseaseNo  = (e) =>{
        this.state.checkChronicDiseaseNo = e.target.checked
        if(this.state.checkChronicDiseaseNo == true) {
            this.setState({
                checkChronicDiseaseYes  :   false,
                disabledChronicDisease  		  :   true,
                ChronicDiseaseId : "",
            })
        }
    }

    

    /* handleChangeOthersRelative  = (e) =>{
        this.state.checkOthersRelativeYes = e.target.checked
        if(this.state.checkOthersRelativeYes == true) {
            this.setState({
                disabledRelative    :   false,
                relativeName        :   "",
                relationShip        :   "",
                jobTittle           :   "",
            })
        }
        else{
            this.setState({disabledRelative: true})
            
        }
    } */
   
    /* handleChangeConvicted  = (e) =>{
        this.state.checkConvictedYes = e.target.checked
        if(this.state.checkConvictedYes == true) {
            this.setState({
                disabledConvicted   :   false,
                crime               :   "",
            })
        }
        else{
            this.setState({disabledConvicted: true})
            
        }
    } */


    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
    }

    handleChangeTitleName = (e) => {
        ////console.log(e)
        if (e.length > 0) {
            this.state.selectedTitle = e[0].name
            this.state.selectedTitleId = e[0].id
        } else {
            this.state.selectedTitle = ""
            this.state.selectedTitleId = ""
        }
        this.setState({
            isshow:false,
        })
        ////console.log(this.state.selectedReligionId);
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
            "StatusId":"3",
            "PositionID":this.state.selectedPositionId,
            "DateApplied" : this.formatDate(this.state.dateApplied),
            "SpecialSkills" : this.state.specialskill,
            "LanguageSpoken" : this.state.languageSpoken,
            "EmergencyContactName" :this.state.emergencyContactName,
            "EmergencyContactRelation" : this.state.relationship,
            "EmergencyContactNumber" : this.state.contactnumber,
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
            "educationAttainments": this.state.educationTableList/* [{
                    "LevelId":this.state.levelId,
                    "SchoolName":this.state.schoolName,
                    "Course":this.state.course,
                    "StartYear":this.state.startYear,
                    "EndYear":this.state.endYear,
                    "HonorRecieved":this.state.honorsAward
            }] */,
            "employmentHistories":this.state.employmentTableList/* [{
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
            }] */,
            "familyBackgrounds":this.state.familyTableList/* [{
                    "RoleId":this.state.roleId,
                    "Name":this.state.Name,
                    "Age":this.state.Age,
                    "Occupation":this.state.occupations,
                    "Company":this.state.Company,
                    "UserId":this.state.userinfo.userId,
            }] */,
            "others" :this.state.othersTableList,
            "characterReferences":this.state.referenceTableList,/* [{
                    "Name":this.state.referenceName,
                    "ContactNumber":this.state.referencecontactNo,
                    "Occupation":this.state.referenceOccupation,
                    "Company":this.state.companyorschool,
                    "UserId":this.state.userinfo.userId,
            }] */
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

            /* this.setState({
                isloading   :   true,
            })  */

            // Start General Informatio Validation

            /* if(!this.state.selectedClientId){
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

            if(this.state.dateApplied == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Date Applied",
                    fade:true
                });
                return
            }

            if(!this.state.selectedTitle){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Title under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.firstName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter First Name under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.middleName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Middle Name under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.lastName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Last Name under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.nickName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Nick Name",
                    fade:true
                });
                return
            }

            if(!this.state.typeId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Type  under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(!this.state.selectedRegionId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Region under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(!this.state.selectedProvinceId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Province under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(!this.state.selectedCityId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Cit/Municipality under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.house == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter House Number under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.street == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Street under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.barangay == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Barangay under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.postalcode == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Postal Code under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            } */

            if(this.state.mobileNo == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Mobile Number under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            } else {
                if(this.state.mobileNo.length < 11){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Mobile Number Max Lenght 11 under I. GENERAL INFORMATION",
                        fade:true
                    });
                    return
                }
            }

            /* if(!this.state.CitizenshipId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Ctizenship under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(!this.state.selectedReligionId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Religion under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(!this.state.GenderId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Gender under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(!this.state.CivilStatusId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Civil Status under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.dateOfBirth == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Date of Birth under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.placeofbirth == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Place of Birth under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.height == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Height under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.weight == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Weight under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.languageSpoken == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Language Spoken under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.emergencyContactName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Emergency Contact Name under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.relationship == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Relationship under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.contactnumber == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Contact Number under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.sss == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter SSS under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.tin == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter TIN under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.philhealth == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Philhealth under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            if(this.state.pagibig == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Pag-ibig under I. GENERAL INFORMATION",
                    fade:true
                });
                return
            }

            // End General Information Validation


            // Start Education Validation

            if(!this.state.levelId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please select Level under II. EDUCATION",
                    fade:true
                });
                return
            }
            if(this.state.schoolName == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter School Name under II. EDUCATION",
                    fade:true
                });
                return
            }
            if(this.state.course == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Course under II. EDUCATION",
                    fade:true
                });
                return
            }
            if(this.state.startYear == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Start Year under II. EDUCATION",
                    fade:true
                });
                return
            }
            if(this.state.endYear == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter End Year under II. EDUCATION",
                    fade:true
                });
                return
            }

            // End Education Validation


            //Start Family Background Validation

            if(!this.state.roleId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Role under IV. FAMILY BACKGROUND",
                    fade:true
                });
                return
            }	

            if(this.state.Name == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Name under IV. FAMILY BACKGROUND",
                    fade:true
                });
                return
            }	

            if(this.state.Age == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Age under IV. FAMILY BACKGROUND",
                    fade:true
                });
                return
            }	

            if(this.state.familyContactNumber == ""){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Contact Number under IV. FAMILY BACKGROUND",
                    fade:true
                });
                return
            }	

            // End Family Background Validation


            // Start Others Validation

            if(!this.state.JobopeningId){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please enter Job Opening Union under V. OTHERS",
                    fade:true
                });
                return
            }

            if(this.state.checkOthersRelativeYes == true){
                if(this.state.relativeName == ""){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Name under V. OTHERS",
                        fade:true
                    });
                    return
                }

                if(this.state.othersRelativeContactNumber == ""){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Contact Number under V. OTHERS",
                        fade:true
                    });
                    return
                }

                if(this.state.otherRelationShip == ""){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter relationship under V. OTHERS",
                        fade:true
                    });
                    return
                }

                if(this.state.jobTittle == ""){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Job Title under V. OTHERS",
                        fade:true
                    });
                    return
                }
                
            }

            if(this.state.checkConvictedYes == true){
                if(this.state.crime == ""){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Convicted of a Crime under V. OTHERS",
                        fade:true
                    });
                    return
                }
                
            }

            if(this.state.checkLaborUnionYes == true){
                if(this.state.details == ""){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Memberof a Labour Union under V. OTHERS",
                        fade:true
                    });
                    return
                }
                
            }

            if(this.state.checkChronicDiseaseYes == true){
                if(!this.state.ChronicDiseaseId){
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: "Please enter Chronic Disease(s) under V. OTHERS",
                        fade:true
                    });
                    return
                }
                
            }

            //End Others Validation


            if(!this.state.referenceTableList.length){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Please input Reference",
                    fade:true
                });
                return
            } */

            if(18 > this.state.totalAge){
                this.setState({
                    isloading:false,
                    alerttype:"Error!",
                    isshow:true,
                    color:"danger",
                    message: "Age below 18 is not valid",
                    fade:true
                });
                return
            } /* else {
                this.setState({
                    isshow:false,
                });
            } */



            //console.log(this.state.monthAge);
            const formParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "StatusId":"3",
            "PositionID":this.state.selectedPositionId,
            "DateApplied" : this.formatDate(this.state.dateApplied),
            "SpecialSkills" : this.state.specialskill,
            "LanguageSpoken" : this.state.languageSpoken,
            "EmergencyContactName" :this.state.emergencyContactName,
            "EmergencyContactRelation" : this.state.relationship,
            "EmergencyContactNumber" : this.state.contactnumber,
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
            "educationAttainments": this.state.educationTableList/* [{
                    "LevelId":this.state.levelId,
                    "SchoolName":this.state.schoolName,
                    "Course":this.state.course,
                    "StartYear":this.state.startYear,
                    "EndYear":this.state.endYear,
                    "HonorRecieved":this.state.honorsAward
            }] */,
            "employmentHistories":this.state.employmentTableList/* [{
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
            }] */,
            "familyBackgrounds":this.state.familyTableList/* [{
                    "RoleId":this.state.roleId,
                    "Name":this.state.Name,
                    "Age":this.state.Age,
                    "Occupation":this.state.occupations,
                    "Company":this.state.Company,
                    "UserId":this.state.userinfo.userId,
            }] */,
            "others" : this.state.othersTableList,
            "characterReferences":this.state.referenceTableList,/* [{
                    "Name":this.state.referenceName,
                    "ContactNumber":this.state.referencecontactNo,
                    "Occupation":this.state.referenceOccupation,
                    "Company":this.state.companyorschool,
                    "UserId":this.state.userinfo.userId,
            }] */
        }
        console.log(formParams)
        /* this.setState({
            navigate    :   true,
        }); */
             /* axios
                .post(
                //localStorage.setItem('formParams', JSON.stringify(formParams))
                    AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddApplicationForm",  formParams 
                )
                .then(res => {
                    const data = res.data;
                    //console.log("AddApplicationForm");
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
                            isloading:false,
                            alerttype:"Error!",
                            isshow:true,
                            color:"danger",
                            message: data.message,
                            fade:true
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
                }) */
        
            } 

            onChangeEducationContactName(e){
                ////console.log(e)
                this.setState({educationContactName:e.target.value.toUpperCase(),
                    isshow:false,
                })
            }
        
            onChangeEducationContactNumber(e){
                ////console.log(e)
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({educationContactNumber: e.target.value})
                }
                /* this.setState({educationContactNumber:e.target.value.toUpperCase(),
                    isshow:false,
                }) */
            }

            handleAddEducationClick = () => {
                let education=this.state.educationTableList
                /* const {educationTableList} = this.state */
                const eduactionObj = {
                    /* "level":, */
                    "levelId"       :   this.state.levelId,
                    "ContactPerson" :   this.state.educationContactName,
                    "ContactNumber" :   this.state.educationContactNumber,
                    "SchoolName"    :   this.state.schoolName,
                    "Course"        :   this.state.course,
                    "StartYear"     :   this.state.startYear,
                    "EndYear"       :   this.state.endYear,
                    "HonorRecieved" :   this.state.honorsAward,
                    "isModified"    :   "0",

                    "level":this.state.level,
                    /* "isDeleted":"0" */
                }
                education.push(eduactionObj)
                this.setState({educationTableList: education})
                //console.log(this.state.educationTableList)
            }

            EducationGridDataModified(oldValue, newValue, id, column) {
                //////console.log(id)
                this.state.educationTableList.map(function(item,i) {
                    if (item.id===id)
                        item.isModified = newValue!=oldValue ? "1" : "0"
                        //console.log(item.isModified)
                    })
            }

            handleAddEmploymentClick = () => {
                const {employmentTableList} = this.state
                const employmentObj = {
                    "CompanyName"               :   this.state.companyName,
                    "CompanyAddress"            :   this.state.companyAddress,
                    "Position"                  :   this.state.position,
                    "Salary"                    :   this.state.salary,
                    "Supervisor"                :   this.state.supervisor,
                    "ContactNumber"             :   this.state.companycontactNo,
                    "ReasonForLeaving"          :   this.state.reasonforleaving,
                    "PeriodCovered"             :   this.state.periodCovered,
                    "TaxableCompensationIncome" :   this.state.tax,
                    "WithholdingTax"            :   this.state.withHeldTax,
                    "YearOfCompensation"        :   this.state.yearOf,
                    "NTThirteenMonthPay"        :   this.state.month,
                    "Deminimis"                 :   this.state.deminimisBenefits,
                    "NTMandatoryDeduction"      :   this.state.mandatoryDeduction,
                    "NTSalaries"                :   this.state.nonTaxable,
                    "BasicSalary"               :   this.state.basicSalary,
                    "TaxableThirteenMonthPay"   :   this.state.taxable13thMonthPay,
                    "TaxableSalaries"           :   this.state.taxableSalary,
                    "BasicPayMWE"               :   this.state.basicPay,
                    "HolidayPayMWE"             :   this.state.holiday,
                    "OvertimePayMWE"            :   this.state.overtimePay,
                    "NightDiffPayMWE"           :   this.state.nightDif,
                    "Remarks"                   :   this.state.remarks,
                    "isModified"                :   "0"
                }
                employmentTableList.push(employmentObj)
                this.setState({employmentTableList: employmentTableList})
                //console.log(this.state.employmentTableList)
            }

            EmploymentGridDataModified(oldValue, newValue, id, column) {
                //////console.log(id)
                this.state.employmentTableList.map(function(item,i) {
                    if (item.id===id)
                        item.isModified = newValue!=oldValue ? "1" : "0"
                        //console.log(item.isModified)
                    })
            }
        
            onChangeFamilyContactNumber(e){
                ////console.log(e)
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({familyContactNumber: e.target.value})
                }
                /* this.setState({familyContactNumber:e.target.value.toUpperCase(),
                    isshow:false,
                }) */
            }

            handleAddFamilyClick = () => {

                const {familyTableList} = this.state
                const familyObj = {
                    "RoleId"        :   this.state.roleId,
                    "Name"          :   this.state.Name,
                    "ContactNumber" :   this.state.familyContactNumber,
                    "Age"           :   this.state.Age,
                    "Occupation"    :   this.state.occupations,
                    "Company"       :   this.state.Company,
                    "isModified"    :   "0",
                    "Role"          :   this.state.role,
                }
                familyTableList.push(familyObj)
                this.setState({familyTableList: familyTableList})
                //console.log(this.state.familyTableList)
            }

            FamilyGridDataModified(oldValue, newValue, id, column) {
                //////console.log(id)
                this.state.familyTableList.map(function(item,i) {
                    if (item.id===id)
                        item.isModified = newValue!=oldValue ? "1" : "0"
                        //console.log(item.isModified)
                    })
            }
        
            onChangeOthersContactNumber(e){
                ////console.log(e)
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    this.setState({othersRelativeContactNumber: e.target.value})
                }
                /* this.setState({othersRelativeContactNumber:e.target.value.toUpperCase(),
                    isshow:false,
                }) */
            }

            handleAddOthersClick = () => {

                let othersTableList=this.state.othersTableList
                const otherObj = {
                    "ApplicationFormId":"1",
                    "JobSourceId":this.state.JobopeningId,
                    "RefferedBy":this.state.refferedBy,
                    "HasCompanyRelative":(this.state.checkOthersRelativeYes)? "1" : "0",
                    "RelativeName":this.state.relativeName,
                    "RelativeRelation":this.state.otherRelationShip,
                    "ContactNumber":this.state.othersRelativeContactNumber,
                    "RelativePosition":this.state.jobTittle,
                    "IsCrimeConvicted":(this.state.checkConvictedYes)? "1" : "0",
                    "CrimeDescription":this.state.crime,
                    "IsLaborUnion":(this.state.checkLaborUnionYes)? "1" : "0",
                    "LaborUnionDescription":this.state.details,
                    "DiagnoseDeseaseId":this.state.ChronicDiseaseId,
                    "UserId":this.state.userinfo.userId,


                    "Jobopening"       :   this.state.Jobopening,
                    "DiagnoseDesease":this.state.ChronicDisease
                }
                othersTableList.push(otherObj)
                this.setState({othersTableList: othersTableList})
                //console.log(this.state.othersTableList)
            }

            OthersGridDataModified(oldValue, newValue, id, column) {
                //////console.log(id)
                this.state.othersTableList.map(function(item,i) {
                    if (item.id===id)
                        item.isModified = newValue!=oldValue ? "1" : "0"
                        //console.log(item.isModified)
                    })
            }

            handleAddReferenceClick = () => {
                const {referenceTableList} = this.state
                const referenceObj = {
                    "Name"          :  this.state.referenceName,
                    "ContactNumber" :   this.state.referenceOccupation,
                    "Occupation"    :   this.state.companyorschool,
                    "Company"       :   this.state.referencecontactNo,
                }
                referenceTableList.push(referenceObj)
                this.setState({referenceTableList: referenceTableList})
                //console.log(this.state.referenceTableList)
            }

            ReferenceGridDataModified(oldValue, newValue, id, column) {
                this.state.referenceTableList.map(function(item,i) {
                    if (item.id===id)
                        item.isModified = newValue!=oldValue ? "1" : "0"
                    })
            }

            handleAddInformationClick = () => {
                const {informationTableList} = this.state
                const informationObj = {
                    "Title":this.state.selectedTitle,
                    "FirstName":this.state.firstName,
                    "NickName":this.state.nickName,
                    "MiddleName":this.state.middleName,
                    "Type":this.state.type,
                    "Region":this.state.selectedRegion,
                    "Province":this.state.selectedProvince,
                    "City":this.state.selectedCity,

                    "HouseNumber":this.state.house,
                    "Street":this.state.street,
                    "Barangay":this.state.barangay,
                    "PostalCode":this.state.postalcode,
                    "HomePhoneNumber":this.state.homePhoneNo,
                    "OfficePhoneNo":this.state.officePhoneNo,
                    "MobileNo":this.state.mobileNo,
                    "EmailAdd":this.state.emailAdd,

                    "Facebook":this.state.facebook,
                    "Twitter":this.state.twitter,
                    "Citizenship":this.state.Citizenship,
                    "Religion":this.state.selectedReligion,
                    "Gender":this.state.Gender,
                    "CivilStatus":this.state.CivilStatus,
                    "DateOfBirth":this.formatDate(this.state.dateOfBirth),
                    "Age":this.state.totalAge,

                    "PlaceOfBirth":this.state.placeofbirth,
                    "Height":this.state.height,
                    "Weight":this.state.weight,
                    "SpecialSkill":this.state.specialskill,
                    "LanguageSpoken":this.state.languageSpoken,
                    "EmergencyContactName":this.state.emergencyContactName,
                    "Relationship":this.state.relationship,
                    "ContactNumber":this.state.contactnumber,

                    "SSS":this.state.sss,
                    "TIN":this.state.tin,
                    "PHIC":this.state.philhealth,
                    "HDMF":this.state.pagibig,
                }
                informationTableList.push(informationObj)
                this.setState({informationTableList: informationTableList})
                //console.log(this.state.informationTableList)
            }

    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/applicationform" push={true} />;
        } 

        const columnInformation = [
            {
                dataField: 'Title',
                text: 'Title',
            },
            {
                dataField: 'FirstName',
                text: 'First Name',
            },
            {
                dataField: 'NickName',
                text: 'Nick Name',
            },
            {
                dataField: 'MiddleName',
                text: 'Middle Name',
            },
            {
                dataField: 'Type',
                text: 'Type',
            },
            {
                dataField: 'Region',
                text: 'Region',
            },
            {
                dataField: 'Province',
                text: 'Province',
            },
            {
                dataField: 'City',
                text: 'City',
                editable: false,
            },
            {
                dataField: 'HouseNumber',
                text: 'House Number',
                editable: false,
            },
            {
                dataField: 'Street',
                text: 'Street',
                editable: false, 
            },
            {
                dataField: 'Barangay',
                text: 'Barangay',
                editable: false, 
            },
            {
                dataField: 'PostalCode',
                text: 'Postal Code',
                editable: false, 
            },
            {
                dataField: 'HomePhoneNumber',
                text: 'Home Phone Number',
                editable: false, 
            },
            {
                dataField: 'OfficePhoneNo',
                text: 'Office Phone Number',
                editable: false, 
            },
            {
                dataField: 'MobileNo',
                text: 'Mobile Number',
                editable: false, 
            },
            {
                dataField: 'EmailAdd',
                text: 'Email Address',
                editable: false, 
            },
            {
                dataField: 'Facebook',
                text: 'Facebook',
                editable: false, 
            },
            {
                dataField: 'Twitter',
                text: 'Twitter',
                editable: false, 
            },
            {
                dataField: 'Citizenship',
                text: 'Citizenship',
                editable: false, 
            },
            {
                dataField: 'Religion',
                text: 'Religion',
                editable: false, 
            },
            {
                dataField: 'Gender',
                text: 'Gender',
                editable: false, 
            },
            {
                dataField: 'CivilStatus',
                text: 'Civil Status',
                editable: false, 
            },
            {
                dataField: 'DateOfBirth',
                text: 'Date Of Birth',
                editable: false, 
            },
            {
                dataField: 'Age',
                text: 'Age',
                editable: false, 
            },

            {
                dataField: 'PlaceOfBirth',
                text: 'Place Of Birth',
                editable: false, 
            },
            {
                dataField: 'Height',
                text: 'Height',
                editable: false, 
            },
            {
                dataField: 'Weight',
                text: 'Weight',
                editable: false, 
            },
            {
                dataField: 'SpecialSkill',
                text: 'Special Skill',
                editable: false, 
            },
            {
                dataField: 'LanguageSpoken',
                text: 'Language Spoken',
                editable: false, 
            },
            {
                dataField: 'EmergencyContactName',
                text: 'Emergency Contact Name',
                editable: false, 
            },
            {
                dataField: 'Relationship',
                text: 'Relationship',
                editable: false, 
            },
            {
                dataField: 'ContactNumber',
                text: 'ContactNumber',
                editable: false, 
            },

            {
                dataField: 'SSS',
                text: 'SSS',
                editable: false, 
            },
            {
                dataField: 'TIN',
                text: 'TIN',
                editable: false, 
            },
            {
                dataField: 'PHIC',
                text: 'PHIC',
                editable: false, 
            },
            {
                dataField: 'HDMF',
                text: 'HDMF',
                editable: false, 
            },
        ]


        const informationRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.informationTableList
                this.state.informationTableList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                ////console.log(this.state.employeeRestDayTable)
              }
        };

        const columnEducation = [
            {
                dataField: 'levelId',
                text: 'Level',
                headerStyle: () => {
                    return { width: "10%" };
                },
                formatter: (cell, row) => {
                    if(row.levelId!='' && row.levelId!=null){
                        return this.state.tblLevelArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblLevelArrLst
                }
            },
            {
                dataField: 'ContactPerson',
                text: 'Contact Person',
                headerStyle: () => {
                    return { width: "15%" };
                  }
            },
            {
                dataField: 'ContactNumber',
                text: 'Contact Number',
                headerStyle: () => {
                    return { width: "15	%" };
                  }
            },
            {
                dataField: 'SchoolName',
                text: 'School Name',
                headerStyle: () => {
                    return { width: "20%" };
                  }
            },
            {
                dataField: 'Course',
                text: 'Course',
                headerStyle: () => {
                    return { width: "10%" };
                  }
            },
            {
                dataField: 'StartYear',
                text: 'Start Year',
                headerStyle: () => {
                    return { width: "10%" };
                  }
            },
            {
                dataField: 'EndYear',
                text: 'End Year',
                headerStyle: () => {
                    return { width: "10%" };
                  }
            },
            {
                dataField: 'HonorRecieved',
                text: 'Honor Recieved',
                headerStyle: () => {
                    return { width: "10%" };
                  }
            },
        ]

        const educationRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.educationTableList
                this.state.educationTableList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                ////console.log(this.state.employeeRestDayTable)
              }
        };

        const columnEmployment = [
            {
                dataField: 'CompanyName',
                text: 'Company_Name',
            },
            {
                dataField: 'CompanyAddress',
                text: 'Company_Address',
            },
            {
                dataField: 'Position',
                text: 'Position',
            },
            {
                dataField: 'Salary',
                text: 'Salary',
            },
            {
                dataField: 'Supervisor',
                text: 'Supervisor',
            },
            {
                dataField: 'ContactNumber',
                text: 'Contact_Number',
            },
            {
                dataField: 'ReasonForLeaving',
                text: 'Reason_For_Leaving',
            },
            {
                dataField: 'PeriodCovered',
                text: 'Period_Covered',
            },
            {
                dataField: 'TaxableCompensationIncome',
                text: 'Taxable_Compensation_Income',
            },
            {
                dataField: 'WithholdingTax',
                text: 'With_Holding_Tax',
            },
            {
                dataField: 'YearOfCompensation',
                text: 'Year_Of_Compensation',
            },
            {
                dataField: 'NTThirteenMonthPay',
                text: 'NT_13_Month_Pay',
            },
            {
                dataField: 'Deminimis',
                text: 'Deminimis',
            },
            {
                dataField: 'NTMandatoryDeduction',
                text: 'NT_Mandatory_Deduction',
            },
            {
                dataField: 'NTSalaries',
                text: 'NT_Salaries',
            },
            {
                dataField: 'BasicSalary',
                text: 'Basic_Salary',
            },
            {
                dataField: 'TaxableThirteenMonthPay',
                text: 'Taxable_13_Month_Pay',
            },
            {
                dataField: 'TaxableSalaries',
                text: 'Taxable_Salaries',
            },
            {
                dataField: 'BasicPayMWE',
                text: 'Basic_Pay_MWE',
            },
            {
                dataField: 'HolidayPayMWE',
                text: 'Holiday_Pay_MWE',
            },
            {
                dataField: 'OvertimePayMWE',
                text: 'Overtime_Pay_MWE', 
            },
            {
                dataField: 'NightDiffPayMWE',
                text: 'Night_Diff_Pay_MWE',
            },
            {
                dataField: 'Remarks',
                text: 'Remarks',
            },
        ]


        const employmentRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.employmentTableList
                this.state.employmentTableList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                ////console.log(this.state.employeeRestDayTable)
              }
        };

        const columnFamily = [
            {
                dataField: 'RoleId',
                text: 'Role',
                headerStyle: () => {
                    return { width: "15%" };
                },
                formatter: (cell, row) => {
                    if(row.RoleId!='' && row.RoleId!=null){
                        return this.state.tblRoleArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblRoleArrLst
                }
            },
            {
                dataField: 'Name',
                text: 'Name',
                headerStyle: () => {
                    return { width: "20%" };
                },
                editCellStyle: {
                  fontWeight: 'bold'
                }
            },
            {
                dataField: 'ContactNumber',
                text: 'Contact Number',
                headerStyle: () => {
                    return { width: "15%" };
                    }
            },
            {
                dataField: 'Age',
                text: 'Age',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
            {
                dataField: 'Occupation',
                text: 'Occupation',
                headerStyle: () => {
                    return { width: "20%" };
                    }
            },
            {
                dataField: 'Company',
                text: 'Company',
                headerStyle: () => {
                    return { width: "20%" };
                    }
            },
        ]

        const familyRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.familyTableList
                this.state.familyTableList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                ////console.log(this.state.familyTableList)
                }
        };

        const columnOthers = [
            {
                dataField: 'Jobopening',
                text: 'Job Opening',headerStyle: () => {
                    return { width: "10%" };
                },
                /* headerStyle: () => {
                    return { width: "10%" };
                },
                formatter: (cell, row) => {
                    if(row.RoleId!='' && row.RoleId!=null){
                        return this.state.tblRoleArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblRoleArrLst
                } */
            },
            {
                dataField: 'RefferedBy',
                text: 'Preffered By',
                headerStyle: () => {
                    return { width: "15%" };
                    }
            },
            /* {
                dataField: 'presentlyConnected',
                text: 'Presently Connected',
                headerStyle: () => {
                    return { width: "5%" };
                    }
            }, */
            {
                dataField: 'RelativeName',
                text: 'Name',
                headerStyle: () => {
                    return { width: "15%" };
                    }
            },
            {
                dataField: 'RelativeRelation',
                text: 'Relationship',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
            {
                dataField: 'RelativePosition',
                text: 'Job Title',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
            {
                dataField: 'ContactNumber',
                text: 'Contact Number',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
            /* {
                dataField: 'convictedWithACrime',
                text: 'Convicted With A Crime',
                headerStyle: () => {
                    return { width: "5%" };
                    }
            }, */
            {
                dataField: 'CrimeDescription',
                text: 'Give Details Crime',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
            /* {
                dataField: 'labourUnion',
                text: 'Member Of A Labour Union',
                headerStyle: () => {
                    return { width: "5%" };
                    }
            }, */
            {
                dataField: 'LaborUnionDescription',
                text: 'Give Details Union',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
            {
                dataField: 'DiagnoseDesease',
                text: 'Suffered or Diagnosed',
                headerStyle: () => {
                    return { width: "10%" };
                    }
            },
        ]

        const othersRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.familyTableList
                this.state.othersTableList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                ////console.log(this.state.othersTableList)
                }
        };

        const columnReference = [
            {
                dataField: 'Name',
                text: 'Name',
                headerStyle: () => {
                    return { width: "25%" };
                  }
            },
            {
                dataField: 'ContactNumber',
                text: 'Contact Number',
                headerStyle: () => {
                    return { width: "20%" };
                  }
            },
            {
                dataField: 'Occupation',
                text: 'Occupation',
                headerStyle: () => {
                    return { width: "25%" };
                  }
            },
            {
                dataField: 'Company',
                text: 'Company',
                headerStyle: () => {
                    return { width: "30%" };
                  }
            },
        ]

        const referenceRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.referenceTableList
                this.state.referenceTableList.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                ////console.log(this.state.employeeRestDayTable)
              }
        };

        return(
            <div>
                <Banner />
                    <Container  className="mt-3" fluid>
                        <Card>
                            <Card.Header>RECRUITMENT >> APPLICATION FORM (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                                CLIENT
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={10} controlId="formGridPassword">
                                            <Typeahead 
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                                /* placeholder="SELECT CLIENT" */
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                                POSITION APPLIED
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.positionList}
                                                /* placeholder="POSITION APPLIED" */
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                                DATE APPLIED
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <DatePicker
                                                ref='dateApplied'
                                                selected={this.state.dateApplied}
                                                onChange={this.handleChangeDate}
                                                minDate={this.minDate}
                                                value={this.props.dateApplied}
                                                dateFormat={"MM/dd/yyyy"}
                                                /* placeholderText="DATE APPLIED" */
                                                className="form-control"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row className="mt-2">
                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                            <Accordion>
                                                <Card>
                                                    <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color: "#FFFFFF"}}>
                                                    I. GENERAL INFORMATION
                                                    </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="0">

                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                {/* <Card> */}
                                                                    <Card.Body>
                                                                        <Form.Row className="mt-3">
                                                                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                TITLE
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeTitleName}
                                                                                    options={this.state.titleName}
                                                                                   /*  placeholder="SELECT TITLE" */
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                FIRST NAME
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="firstName"
                                                                                    value={this.state.firstName}
                                                                                   /*  placeholder="FIRST NAME" */
                                                                                    onChange={this.onChangeFirstName.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    autoFocus={this.state.firstNameFocus}
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                NICK NAME
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="nickName"
                                                                                    value={this.state.nickName}
                                                                                    /* placeholder="NICK NAME" */
                                                                                    onChange={this.onChangeNickname.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row >
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                MIDDLE NAME
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="middleName"
                                                                                    value={this.state.middleName}
                                                                                    /* placeholder="MIDDLE NAME" */
                                                                                    onChange={this.onChangeMiddlename.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                LAST NAME
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="lastName"
                                                                                    value={this.state.lastName}
                                                                                    /* placeholder="LAST NAME" */
                                                                                    onChange={this.onChangeLastname.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>

                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                TYPE
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeType}
                                                                                    options={this.state.TypeList}
                                                                                    /* placeholder="TYPE" */
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                REGION
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id="basic-example"
                                                                                    onChange={this.handleCoverChangeRegion}
                                                                                    options={this.state.regionList}
                                                                                    /* placeholder="REGION" */
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                PROVINCE
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id="basic-example"
                                                                                    onChange = { this.handleCoverChangeProvince }
                                                                                    options={this.state.provinceList}
                                                                                    /* placeholder="PROVINCE" */
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                CITY/MUNICIPALITY
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead                                  
                                                                                    labelKey='name'
                                                                                    id="basic-examplex"
                                                                                    onChange={this.handleCoverChangeCity}
                                                                                    options={this.state.citylist}
                                                                                    /* placeholder="CITY/MUNICIPALITY" */
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                HOUSE NUMBER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="house"
                                                                                    value={this.state.house}
                                                                                    /* placeholder="HOUSE #" */
                                                                                    onChange={this.onChangeHouse.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                STREET
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="street"
                                                                                    value={this.state.street}
                                                                                    /* placeholder="STREET" */
                                                                                    onChange={this.onChangeStreet.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                BARANGAY
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="barangay"
                                                                                    value={this.state.barangay}
                                                                                    /* placeholder="BARANGAY" */
                                                                                    onChange={this.onChangeBarangay.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                POSTAL CODE
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="postalcode"
                                                                                    value={this.state.postalcode}
                                                                                    /* placeholder="POSTAL CODE" */
                                                                                    onChange={this.onChangePostalCode.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                HOME PHONE NUMBER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="homePhoneNo"
                                                                                    value={this.state.homePhoneNo}
                                                                                    /* placeholder="HOME PHONE NUMBER" */
                                                                                    onChange={this.onChangeHomePhoneNo.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                    maxLenght="11"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                OFFICE PHONE NUMBER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="officePhoneNo"
                                                                                    value={this.state.officePhoneNo}
                                                                                    /* placeholder="OFFICE PHONE NUMBER" */
                                                                                    onChange={this.onChangeOfficePhoneNo.bind(this)} 
                                                                                    autoComplete="off"   
                                                                                    maxLenght="11"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                MOBILE NUMBER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    value={this.state.mobileNo}
                                                                                    name="mobileNo"
                                                                                    /* placeholder="MOBILE NUMBER" */
                                                                                    onChange={this.onChangeMobileNo.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                    maxLenght="11"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                EMAIL ADDRESS
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="email"
                                                                                    name="emailAdd"
                                                                                    value={this.state.emailAdd}
                                                                                    /* placeholder="EMAIL ADDRESS" */
                                                                                    onChange={this.onChangeEmailAdd.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                FACEBOOK
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="facebook"
                                                                                    value={this.state.facebook}
                                                                                    /* placeholder="FACEBOOK" */
                                                                                    onChange={this.onChangeFacebook.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                TWITTER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="twitter"
                                                                                    value={this.state.twitter}
                                                                                   /*  placeholder="TWITTER" */
                                                                                    onChange={this.onChangeTwitter.bind(this)}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>


                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                CITIZENSHIP
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeCitizenship}
                                                                                    options={this.state.CitizenshipList}
                                                                                    /* placeholder="CITIZENSHIP" */
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                RELIGION
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeReligion}
                                                                                    options={this.state.ReligionList}
                                                                                    /* placeholder="RELIGION" */
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                GENDER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeGender}
                                                                                    options={this.state.GenderList}
                                                                                    /* placeholder="GENDER" */
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                CIVIL STATUS
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeCivilStatus}
                                                                                    options={this.state.CivilStatusList}
                                                                                    /* placeholder="CIVIL STATUS" */
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                DATE OF BIRTH
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <DatePicker
                                                                                    ref='dateOfBirth'
                                                                                    selected={this.state.dateOfBirth}
                                                                                    onChange={this.handleChangeDateOfBirth}
                                                                                    minDate={this.minDate}
                                                                                    value={this.props.dateOfBirth}
                                                                                    dateFormat={"MM/dd/yyyy"}
                                                                                    /* placeholderText="DATE OF BIRTH " */
                                                                                    className="form-control"
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                AGE
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="totalAge"
                                                                                    value={this.state.totalAge}
                                                                                   /*  placeholder="AGE" */
                                                                                    onChange={this.onChangeAgeMonth.bind(this)}
                                                                                    autoComplete="off"
                                                                                    disabled
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                PLACE OF BIRTH
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="placeofbirth"
                                                                                    value={this.state.placeofbirth}
                                                                                    /* placeholder="PLACE OF BIRTH" */
                                                                                    onChange={this.onChangePlaceOfBirth.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                HEIGHT
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="height"
                                                                                    value={this.state.height}
                                                                                   /*  placeholder="HEIGHT" */
                                                                                    onChange={this.onChangeHeight.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                WEIGHT
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="weight"
                                                                                    value={this.state.weight}
                                                                                    /* placeholder="WEIGHT" */
                                                                                    onChange={this.onChangeweight.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                SPECIAL SKILLS
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="specialskill"
                                                                                    value={this.state.specialskill}
                                                                                    /* placeholder="SPECIAL SKILLS" */
                                                                                    onChange={this.onChangeSpecialSkill.bind(this)} 
                                                                                    autoComplete="off"   
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                LANGUAGE SPOKEN
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="languageSpoken"
                                                                                    value={this.state.languageSpoken}
                                                                                    /* placeholder="LANGUAGE SPOKEN" */
                                                                                    onChange={this.onChangeLanguageSpoken.bind(this)} 
                                                                                    autoComplete="off"    
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                EMERGENCY CONTACT NAME
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="emergencyContactName"
                                                                                    value={this.state.emergencyContactName}
                                                                                    /* placeholder="EMERGENCY CONTACT NAME" */
                                                                                    onChange={this.onChangeEmergencyContactName.bind(this)} 
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                RELATIONSHIP
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="relationship"
                                                                                    value={this.state.relationship}
                                                                                    /* placeholder="RELATIONSHIP" */
                                                                                    onChange={this.onChangeRelationship.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                CONTACT NUMBER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="contactnumber"
                                                                                    value={this.state.contactnumber}
                                                                                    /* placeholder="CONTACT NUMBER" */
                                                                                    onChange={this.onChangeContactNumber.bind(this)} 
                                                                                    autoComplete="off"  
                                                                                    maxLenght="11"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                SSS #
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <NumberFormat
                                                                                    name="sss"
                                                                                    value={this.state.sss}
                                                                                    onChange={this.onChangeSSS} 
                                                                                    autoComplete="off"
                                                                                    format="##-#######-#"
                                                                                    className="form-control"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                TIN #
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <NumberFormat
                                                                                    name="tin"
                                                                                    value={this.state.tin}
                                                                                    onChange={this.onChangeTin.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    format="###-###-###-###"
                                                                                    className="form-control"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                PHILHEALTH #
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <NumberFormat
                                                                                    name="philhealth"
                                                                                    value={this.state.philhealth}
                                                                                    onChange={this.onChangePhilHealth.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    format="##-#########-#"
                                                                                    className="form-control"
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                PAGIBIG #
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <NumberFormat
                                                                                    name="pagibig"
                                                                                    value={this.state.pagibig}
                                                                                    onChange={this.onChangePagibig.bind(this)} 
                                                                                    autoComplete="off"
                                                                                    format="####-####-####"
                                                                                    className="form-control"
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row> 
                                
                                                                        <ButtonToolbar className="mt-3">
                                                                            <Button variant="success" onClick={this.handleAddInformationClick}>
                                                                                Add General Information
                                                                            </Button>
                                                                        </ButtonToolbar>
                                                                        <Form.Row>
                                                                            <Form.Group className="mt-1" as={Col} controlId="formGridEmail">
                                                                                <Card.Header>General Information List</Card.Header>
                                                                                    <BootstrapTable
                                                                                        keyField = "CompanyName"
                                                                                        data = { this.state.informationTableList}
                                                                                        columns = { columnInformation}
                                                                                        selectRow = { informationRow }
                                                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                                                        rowClasses="noser-table-row-class"
                                                                                        striped
                                                                                        hover
                                                                                        condensed
                                                                                    />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        
                                                                    </Card.Body>
                                                                {/* </Card> */}
                                                            </Form.Group>
                                                        </Form.Row>
                                                        
                                                    
                                                    </Accordion.Collapse>
                                                </Card>

                                                <Card>
                                                    <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{color: "#FFFFFF"}}>
                                                        II. EDUCATION
                                                    </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="1">
                                                        <Form.Row>
                                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                                {/* <Card className="card-tab-no-border"> */}
                                                                    <Card.Body>
                                                                        <Form.Row className="mt-3">
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                LEVEL
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeLevel}
                                                                                    options={this.state.levelList}
                                                                                    /* placeholder="LEVEL" */
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                SCHOOL NAME
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="schoolName"
                                                                                    value={this.state.schoolName}
                                                                                    /* placeholder="SCHOOL NAME" */
                                                                                    onChange={this.onChangeSchoolName.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                COURSE
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="course"
                                                                                    value={this.state.course}
                                                                                   /*  placeholder="COURSE" */
                                                                                    onChange={this.onChangeCourse.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                    
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                HONOR(s)/AWARD(s)
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="honorsAward"
                                                                                    value={this.state.honorsAward}
                                                                                    /* placeholder="HONOR(s)/AWARD(s)" */
                                                                                    onChange={this.onChangeHonorsAward.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                START YEAR
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="startYear"
                                                                                    value={this.state.startYear}
                                                                                    /* placeholder="START YEAR" */
                                                                                    onChange={this.onChangeStartYear.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                END YEAR
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="endYear"
                                                                                    value={this.state.endYear}
                                                                                    /* placeholder="END YEAR" */
                                                                                    onChange={this.onChangeEndYear.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        {/* <Form.Row className="mt-3">
                                                                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                CONTACT NUMBER
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Control 
                                                                                    type="text"
                                                                                    name="educationContactNumber"
                                                                                    value={this.state.educationContactNumber}
                                                                                    onChange={this.onChangeEducationContactNumber.bind(this)} 
                                                                                    autoComplete="off" 
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row> */}
                                                
                                                                        <ButtonToolbar className="mt-3">
                                                                            <Button variant="success" onClick={this.handleAddEducationClick}>
                                                                                Add Education
                                                                            </Button>
                                                                        </ButtonToolbar>
                                                                        <Form.Row>
                                                                            <Form.Group className="mt-1" as={Col} controlId="formGridEmail">
                                                                                <Card.Header>Education List</Card.Header>
                                                                                    <BootstrapTable
                                                                                        keyField = "LevelId"
                                                                                        data = { this.state.educationTableList}
                                                                                        columns = { columnEducation}
                                                                                        selectRow = { educationRow }
                                                                                        cellEdit = { cellEditFactory({
                                                                                        mode: 'dbclick',
                                                                                        blurToSave: true,
                                                                                        afterSaveCell: (oldValue, newValue, row, column) => {
                                                                                            this.EducationGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                                            }
                                                                                        })
                                                                                            }
                                                                                        rowClasses="noser-table-row-class"
                                                                                        striped
                                                                                        hover
                                                                                        condensed
                                                                                    />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                   </Card.Body>
                                                                {/*  </Card> */}
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Accordion.Collapse>
                                                </Card>


                                                <Card>
                                                    <Card.Header>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{color: "#FFFFFF"}}>
                                                        III. EMPLOYMENT RECORD (START WITH LATEST EMPLOYER)
                                                    </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="2">
                                                        <Card.Body>
                                                            <Form.Row className="mt-3">
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    COMPANY NAME
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="companyName"
                                                                        value={this.state.companyName}
                                                                       /*  placeholder="COMPANY NAME" */
                                                                        onChange={this.onChangeCompanyName.bind(this)} 
                                                                        autoComplete="off"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    COMPANY ADDRESS
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="companyAddress"
                                                                        value={this.state.companyAddress}
                                                                        /* placeholder="COMPANY ADDRESS" */
                                                                        onChange={this.onChangeCompanyAddress.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    POSITION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="position"
                                                                        value={this.state.position}
                                                                       /*  placeholder="POSITION" */
                                                                        onChange={this.onChangePosition.bind(this)} 
                                                                        autoComplete="off" 
                                                                        
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    PERIOD COVERED
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="periodCovered"
                                                                        value={this.state.periodCovered}
                                                                      /*   placeholder="PERIOD COVERED" */
                                                                        onChange={this.onChangePeriodCovered.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    SALARY
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="salary"
                                                                        value={this.state.salary}
                                                                        /* placeholder="SALARY" */
                                                                        onChange={this.onChangeSalary.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    SUPERVISOR
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="supervisor"
                                                                        value={this.state.supervisor}
                                                                        /* placeholder="SUPERVISOR" */
                                                                        onChange={this.onChangeSupervisor.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    CONTACT NUMBER
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="companycontactNo"
                                                                        value={this.state.companycontactNo}
                                                                        /* placeholder="CONTACT NUMBER" */
                                                                        onChange={this.onChangeCompanyContactNo.bind(this)} 
                                                                        autoComplete="off" 
                                                                        maxLenght="11"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    REASON FOR LEAVING
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="reasonforleaving"
                                                                        value={this.state.reasonforleaving}
                                                                        /* placeholder="REASON FOR LEAVING" */
                                                                        onChange={this.onChangeReasonforLeaving.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    TAXABLE COMPENSATION INCOME
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="tax"
                                                                        value={this.state.tax}
                                                                        /* placeholder="TAXABLE COMPENSATION INCOME" */
                                                                        onChange={this.onChangeTax.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    WITH HELD TAX
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="withHeldTax"
                                                                        value={this.state.withHeldTax}
                                                                        /* placeholder="WITHHELD TAX" */
                                                                        onChange={this.onChangeWithHeldTax.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    YEAR OF COMPENSATION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="yearOf"
                                                                        value={this.state.yearOf}
                                                                       /*  placeholder="YEAR OF COMPENSATION" */
                                                                        onChange={this.onChangeYearOf.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    13TH MONTH PAY AND OTHER BENEFITS
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="month"
                                                                        value={this.state.month}
                                                                        /* placeholder="13TH MONTH PAY AND OTHER BENEFITS" */
                                                                        onChange={this.onChange13thMonth.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    DEMINIMIS BENEFITS
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="deminimisBenefits"
                                                                        value={this.state.deminimisBenefits}
                                                                        /* placeholder="DEMINIMIS BENEFITS" */
                                                                        onChange={this.onChangeDeminimisBenefits.bind(this)} 
                                                                        autoComplete="off"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    MANDATORY DEDUCTION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="mandatoryDeduction"
                                                                        value={this.state.mandatoryDeduction}
                                                                        /* placeholder="MANDATORY DEDUCTION" */
                                                                        onChange={this.onChangeMandatoryDeduction.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    NON TAXABLE SALARIES & OTHER FORMS OF COMPENSATION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="nonTaxable"
                                                                        value={this.state.nonTaxable}
                                                                        /* placeholder="NON TAXABLE SALARIES & OTHER FORMS OF COMPENSATION" */
                                                                        onChange={this.onChangeNonTaxable.bind(this)} 
                                                                        autoComplete="off" 
                                                                        
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    BASIC SALARY
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="basicSalary"
                                                                        value={this.state.basicSalary}
                                                                        /* placeholder="BASIC SALARY" */
                                                                        onChange={this.onChangeBasicSalary.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    TAXABLE 13TH MONTH PAY & OTHER BENEFITS
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="taxable13thMonthPay"
                                                                        value={this.state.taxable13thMonthPay}
                                                                        /* placeholder="TAXABLE 13TH MONTH PAY & OTHER BENEFITS" */
                                                                        onChange={this.onChangeTaxable13thMonth.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    TAXABLE SALARIES & OTHER FORMS OF COMPENSATION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="taxableSalary"
                                                                        value={this.state.taxableSalary}
                                                                        /* placeholder="TAXABLE SALARIES & OTHER FORMS OF COMPENSATION" */
                                                                        onChange={this.onChangeTaxableSalary.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    BASIC PAY FOR MWE
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="basicPay"
                                                                        value={this.state.basicPay}
                                                                        /* placeholder="BASIC PAY FOR MWE" */
                                                                        onChange={this.onChangeBasicPay.bind(this)} 
                                                                        autoComplete="off"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    HOLIDAY PAY FOR HWE
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="holiday"
                                                                        value={this.state.holiday}
                                                                        /* placeholder="HOLIDAY PAY FOR HWE" */
                                                                        onChange={this.onChangeHoliday.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    OVERTIME PAY FOR HWE
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="overtimePay"
                                                                        value={this.state.overtimePay}
                                                                        /* placeholder="OVERTIME PAY FOR HWE" */
                                                                        onChange={this.onChangeOverTimePay.bind(this)} 
                                                                        autoComplete="off" 
                                                                        
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    NIGHT DIFFERENTIAL PAY FOR HWE
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="nightDif"
                                                                        value={this.state.nightDif}
                                                                        /* placeholder="NIGHT DIFFERENTIAL PAY FOR HWE" */
                                                                        onChange={this.onChangeNightDif.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    REMARKS
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={10} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="remarks"
                                                                        value={this.state.remarks}
                                                                        /* placeholder="REMARKS" */
                                                                        onChange={this.onChangeRemarks.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                    
                                                            <ButtonToolbar className="mt-3">
                                                                <Button variant="success" onClick={this.handleAddEmploymentClick}>
                                                                    Add Employment
                                                                </Button>
                                                            </ButtonToolbar>
                                                            <Form.Row>
                                                                <Form.Group className="mt-1" as={Col} controlId="formGridEmail">
                                                                    <Card.Header>Employment List</Card.Header>
                                                                        <BootstrapTable
                                                                            keyField = "id"
                                                                            data = { this.state.employmentTableList}
                                                                            columns = { columnEmployment}
                                                                            selectRow = { employmentRow }
                                                                            cellEdit = { cellEditFactory({
                                                                            mode: 'dbclick',
                                                                            blurToSave: true,
                                                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                                                this.EmploymentGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                                }
                                                                            })
                                                                                }
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
                                                        IV. FAMILY BACKGROUND
                                                    </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="3">
                                                        <Card.Body>
                                                            <Form.Row className="mt-3">
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    ROLE
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id='basic-example'
                                                                        onChange={this.handleChangeRole}
                                                                        options={this.state.RoleList}
                                                                        /* placeholder="ROLE" */
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    NAME
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="Name"
                                                                        value={this.state.Name}
                                                                        /* placeholder="NAME" */
                                                                        onChange={this.onChangeName.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    AGE
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="Age"
                                                                        value={this.state.Age}
                                                                        /* placeholder="AGE" */
                                                                        onChange={this.onChangeAges.bind(this)} 
                                                                        autoComplete="off" 
                                                                        maxLenght="2"
                                                                        
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    OCCUPATION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="Occupations"
                                                                        value={this.state.occupations}
                                                                        /* placeholder="OCCUPATION" */
                                                                        onChange={this.onChangeOccupations.bind(this)} 
                                                                        autoComplete="off" 
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    COMPANY OR SCHOOL
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="Company"
                                                                        value={this.state.Company}
                                                                        /* placeholder="COMPANY OR SCHOOL" */
                                                                        onChange={this.onChangeCompany.bind(this)} 
                                                                        autoComplete="off"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    CONTACT NUMBER
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control 
                                                                        type="text"
                                                                        name="familyContactNumber"
                                                                        value={this.state.familyContactNumber}
                                                                        /* placeholder="SCHOOL NAME" */
                                                                        onChange={this.onChangeFamilyContactNumber.bind(this)} 
                                                                        autoComplete="off"  
                                                                        maxLenght="11"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                    
                                                            <ButtonToolbar className="mt-3">
                                                                <Button variant="success" onClick={this.handleAddFamilyClick}>
                                                                    Add Family Background
                                                                </Button>
                                                            </ButtonToolbar>
                                                            <Form.Row>
                                                                <Form.Group className="mt-1" as={Col} controlId="formGridEmail">
                                                                    <Card.Header>Family Background List</Card.Header>
                                                                        <BootstrapTable
                                                                            keyField = "id"
                                                                            data = { this.state.familyTableList}
                                                                            columns = { columnFamily}
                                                                            selectRow = { familyRow }
                                                                            cellEdit = { cellEditFactory({
                                                                                mode: 'dbclick',
                                                                                blurToSave: true,
                                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                                    this.FamilyGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                                }
                                                                            })}
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
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="4" style={{color: "#FFFFFF"}}>
                                                        V. OTHERS
                                                    </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="4">
                                                        <Card.Body>
                                                            <Form.Row>
                                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                                    <Card>
                                                                        <Card.Body className="mt-3">
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                HOW DID YOU LEARN ABOUT THIS JOB OPENING?
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={9} controlId="formGridPassword">
                                                                                <Typeahead
                                                                                    labelKey='name'
                                                                                    id='basic-example'
                                                                                    onChange={this.handleChangeOthersJobOpening}
                                                                                    options={this.state.JobOpeningList}
                                                                                    /* placeholder="HOW DID YOU LEARN ABOUT THIS JOB OPENING?" */
                                                                                />
                                                                            </Form.Group>
                                                                        </Form.Row>
                                                                        <Form.Row>
                                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                                <Form.Label style={{fontWeight : "bold"}}>
                                                                                REFERRED BY
                                                                                </Form.Label>
                                                                            </Form.Group>
                                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="refferedby"
                                                                                    value={this.state.refferedBy}
                                                                                    /* placeholder="REFERRED BY" */
                                                                                    onChange={this.onChangeOthersRefferedBy.bind(this)} 
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
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="4" style={{fontWeight : "bold"}}>
                                                                                DO YOU HAVE RELATIVES OR FRIENDS PRESENTLY CONNECTED WITH THIS COOPERATIVE?
                                                                                </Form.Label>
                                                                                <Col sm="1">
                                                                                    <Form.Check
                                                                                        inline 
                                                                                        type="checkbox" 
                                                                                        label="YES" 
                                                                                        name="checkOthersRelativeYes"
                                                                                        checked={this.state.checkOthersRelativeYes}
                                                                                        onChange={this.onChangeOthersRelativeYes}
                                                                                        style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                    />
                                                                                    <Form.Check 
                                                                                        inline
                                                                                        type="checkbox" 
                                                                                        label="NO" 
                                                                                        name="checkOthersRelativeNo"
                                                                                        checked={this.state.checkOthersRelativeNo}
                                                                                        onChange={this.onChangeOthersRelativeNo}
                                                                                        style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                    />
                                                                                </Col> 
                                                                            </Form.Group>
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                NAME
                                                                                </Form.Label>
                                                                                <Col sm="3">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="relativeName"
                                                                                    value={this.state.relativeName}
                                                                                /*  placeholder="NAME" */
                                                                                    onChange={this.onChangeOthersRelativeName.bind(this)}
                                                                                    disabled = { this.state.disabledRelative}
                                                                                    autoComplete="off"
                                                                                />
                                                                                </Col>
                                                                                <Col sm="2">
                                                                                </Col>
                                                                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                CONTACT NUMBER
                                                                                </Form.Label>
                                                                                <Col sm="3">
                                                                                        <Form.Control 
                                                                                            type="text"
                                                                                            name="othersRelativeContactNumber"
                                                                                            value={this.state.othersRelativeContactNumber}
                                                                                            /* placeholder="SCHOOL NAME" */
                                                                                            onChange={this.onChangeOthersContactNumber.bind(this)} 
                                                                                            autoComplete="off" 
                                                                                            disabled = { this.state.disabledRelative} 
                                                                                            maxLenght="11"
                                                                                        />
                                                                                </Col>
                                                                            </Form.Group>

                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                RELATIONSHIP
                                                                                </Form.Label>
                                                                                <Col sm="3">
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="otherRelationShip"
                                                                                            value={this.state.otherRelationShip}
                                                                                            /* placeholder="RELATIONSHIP" */
                                                                                            onChange={this.onChangeOthersRelationShip.bind(this)}
                                                                                            disabled = { this.state.disabledRelative} 
                                                                                            autoComplete="off"
                                                                                        />
                                                                                </Col>
                                                                                <Col sm="2">
                                                                                </Col>
                                                                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                JOB TITLE"                  
                                                                                </Form.Label>
                                                                                <Col sm="3">
                                                                                        <Form.Control
                                                                                            type="text"
                                                                                            name="jobTittle"
                                                                                            value={this.state.jobTittle}
                                                                                            /* placeholder="JOB TITLE" */
                                                                                            onChange={this.onChangeJobTittle.bind(this)}
                                                                                            disabled = { this.state.disabledRelative} 
                                                                                            autoComplete="off"
                                                                                        />
                                                                                </Col>
                                                                            </Form.Group>

                                                                        </Card.Body>
                                                                    </Card>
                                                                </Form.Group>
                                                            </Form.Row>

                                                            <Form.Row>
                                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                                    <Card>
                                                                        <Card.Body className="mt-3">
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                HAVE YOU BEEN CONVICTED OF A CRIME?
                                                                                </Form.Label>
                                                                                <Col sm="1">
                                                                                    <Form.Check
                                                                                        inline 
                                                                                        type="checkbox" 
                                                                                        label="YES" 
                                                                                        name="checkConvictedYes"
                                                                                        checked={this.state.checkConvictedYes}
                                                                                        onChange={this.onChangeOthersConvictedYes}
                                                                                        style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                    />
                                                                                    <Form.Check 
                                                                                        inline
                                                                                        type="checkbox" 
                                                                                        label="NO" 
                                                                                        name="checkConvictedNo"
                                                                                        checked={this.state.checkConvictedNo}
                                                                                        onChange={this.onChangeOthersConvictedNo}
                                                                                        style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                    />
                                                                                </Col> 
                                                                            </Form.Group>
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                IF YES, PLEASE GIVE DETAILS
                                                                                </Form.Label>
                                                                                <Col sm="9">
                                                                                    <Form.Control 
                                                                                        type="text"
                                                                                        name="crime"
                                                                                        value={this.state.crime}
                                                                                        /* placeholder="IF YES, PLEASE GIVE DETAILS:" */
                                                                                        onChange={this.onChangeCrime.bind(this)}
                                                                                        disabled = { this.state.disabledConvicted} 
                                                                                        autoComplete="off"
                                                                                    />
                                                                                </Col> 
                                                                            </Form.Group>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Form.Group>
                                                            </Form.Row>

                                                            <Form.Row>
                                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                                    <Card>
                                                                        <Card.Body className="mt-3">
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                HAVE YOU BEEN A MEMBER OF A LABOR UNION?
                                                                                </Form.Label>
                                                                                <Col sm="1">
                                                                                    <Form.Check
                                                                                        inline 
                                                                                        type="checkbox" 
                                                                                        label="YES" 
                                                                                        name="checkLaborUnionYes"
                                                                                        checked={this.state.checkLaborUnionYes}
                                                                                        onChange={this.onChangeOthersLaborUnionYes}
                                                                                        style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                    />
                                                                                    <Form.Check 
                                                                                        inline
                                                                                        type="checkbox" 
                                                                                        label="NO" 
                                                                                        name="checkLaborUnionNo"
                                                                                        checked={this.state.checkLaborUnionNo}
                                                                                        onChange={this.onChangeOthersLaborUnionNo}
                                                                                        style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                    />
                                                                                </Col> 
                                                                            </Form.Group>
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                IF YES, GIVE DETAILS
                                                                                </Form.Label>
                                                                                <Col sm="9">
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name="details"
                                                                                        value={this.state.details}
                                                                                    /*  placeholder="IF YES, GIVE DETAILS:" */
                                                                                        onChange={this.onChangeDetails.bind(this)}
                                                                                        disabled = { this.state.disabledLaborUnion} 
                                                                                        autoComplete="off"
                                                                                    />
                                                                                </Col> 
                                                                            </Form.Group>

                                                                        </Card.Body>
                                                                    </Card>
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                                    <Card>
                                                                        <Card.Body className="mt-3">
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                                                                HAVE YOU SUFFERED OR BEEN DIAGNOSED TO HAVE ANY OF THE FF. CHRONIC DISEASE(S) OR LIKES?
                                                                                </Form.Label>
                                                                                    <Col sm="1">
                                                                                        <Form.Check
                                                                                            inline 
                                                                                            type="checkbox" 
                                                                                            label="YES" 
                                                                                            name="checkChronicDiseaseYes"
                                                                                            checked={this.state.checkChronicDiseaseYes}
                                                                                            onChange={this.onChangeOthersChronicDiseaseYes}
                                                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                        />
                                                                                        <Form.Check 
                                                                                            inline
                                                                                            type="checkbox" 
                                                                                            label="NO" 
                                                                                            name="checkChronicDiseaseNo"
                                                                                            checked={this.state.checkChronicDiseaseNo}
                                                                                            onChange={this.onChangeOthersChronicDiseaseNo}
                                                                                            style={{fontWeight : "bold", marginTop : "3px"}}
                                                                                        />
                                                                                    </Col> 
                                                                            </Form.Group>
                                                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                                    <Col sm="3">
                                                                                        <Typeahead
                                                                                            labelKey='name'
                                                                                            id='basic-example'
                                                                                            onChange={this.handleChangeChronicDisease}
                                                                                            options={this.state.chronicDiseaseList}
                                                                                            style={{fontWeight : "bold"}}
                                                                                            disabled = { this.state.disabledChronicDisease} 
                                                                                            /* placeholder="HAVE YOU SUFFERED OR BEEN DIAGNOSED TO HAVE ANY OF THE FF. CHRONIC DISEASE(S) OR LIKES?" */
                                                                                        />
                                                                                    </Col> 
                                                                            </Form.Group>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Form.Group>
                                                            </Form.Row>
                                    
                                                            <ButtonToolbar className="mt-3">
                                                                <Button variant="success" onClick={this.handleAddOthersClick}>
                                                                    Add Others
                                                                </Button>
                                                            </ButtonToolbar>
                                                            <Form.Row>
                                                                <Form.Group className="mt-1" as={Col} controlId="formGridEmail">
                                                                    <Card.Header>Others List</Card.Header>
                                                                        <BootstrapTable
                                                                            keyField = "id"
                                                                            data = { this.state.othersTableList}
                                                                            columns = { columnOthers}
                                                                            selectRow = { othersRow }
                                                                            cellEdit = { cellEditFactory({
                                                                                mode: 'dbclick',
                                                                                blurToSave: true,
                                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                                    this.OthersGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                                }
                                                                            })}
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
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="5" style={{color: "#FFFFFF"}}>
                                                        VI. REFERENCES (NOT RELATED TO YOUR FAMILY)
                                                    </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="5">
                                                        <Card.Body>
                                                            <Form.Row className="mt-3">
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    NAME
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="referenceName"
                                                                        value={this.state.referenceName}
                                                                        /* placeholder="NAME" */
                                                                        onChange={this.onChangeReferenceName.bind(this)} 
                                                                        autoComplete="off"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    OCCUPATION
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="referenceOccupation"
                                                                        value={this.state.referenceOccupation}
                                                                        /* placeholder="OCCUPATION" */
                                                                        onChange={this.onChangeReferenceOccupation.bind(this)} 
                                                                        autoComplete="off"
                                                                    /> 
                                                                </Form.Group>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    COMPANY OR SCHOOL
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="companyorschool"
                                                                        value={this.state.companyorschool}
                                                                       /*  placeholder="COMPANY OR SCHOOL" */
                                                                        onChange={this.onChangeCompanyOrSchool.bind(this)} 
                                                                        autoComplete="off"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <Form.Label style={{fontWeight : "bold"}}>
                                                                    CONTACT NUMBER
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="referencecontactNo"
                                                                        value={this.state.referencecontactNo}
                                                                        /* placeholder="CONTACT NUMBER" */
                                                                        onChange={this.onChangeReferenceContactNumber.bind(this)} 
                                                                        autoComplete="off" 
                                                                        maxLenght="11"
                                                                    /> 
                                                                </Form.Group>
                                                            </Form.Row>
                                    
                                                            <ButtonToolbar className="mt-3">
                                                                <Button variant="success" onClick={this.handleAddReferenceClick}>
                                                                    Add Reference
                                                                </Button>
                                                            </ButtonToolbar>
                                                            <Form.Row>
                                                                <Form.Group className="mt-1" as={Col} controlId="formGridEmail">
                                                                    <Card.Header>Reference List</Card.Header>
                                                                        <BootstrapTable
                                                                            keyField = "id"
                                                                            data = { this.state.referenceTableList}
                                                                            columns = { columnReference}
                                                                            selectRow = { referenceRow }
                                                                            cellEdit = { cellEditFactory({
                                                                                mode: 'dbclick',
                                                                                blurToSave: true,
                                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                                    this.ReferenceGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                                }
                                                                            })}
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



                                            </Accordion>
                                        </Form.Group>
                                    </Form.Row>

                                    {/* <Tab eventKey="address" title="ADDRESSES (CURRENT AND PROVINCIAL ADDRESS)">
                                    </Tab> */}

                                        
                                                
                                <ButtonToolbar className="mt-3">
                                    <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>
                                        Save
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="success" onClick={this.handleSubmitClick}>
                                        Submit
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/applicationform">
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

export  default ApplicationFormCreate;