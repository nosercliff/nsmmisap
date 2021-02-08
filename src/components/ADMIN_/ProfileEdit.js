import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class ProfileEdit extends Component {
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
            remarks	                :   "",
            /* selectedClient	        :   "",
            selectedFullName	    :   "",
            selectedPositionApplied	:   "",
            currentAddress		    :   "", */
            /* selectedFirstName     :   "", */
            CitizenshipList:[
                {"name":"FILIPINO","id":"1"},
                {"name":"OTHERS","id":"2"}
            ],
            religionAutocompleteList:[
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
            genderAutocompleteList:[
                {"name":"MALE","id":"1"},
                {"name":"FEMALE","id":"2"}
            ],
            civilStatusAutocompleteList:[
                {"name":"SINGLE","id":"1"},
                {"name":"MARRIED","id":"2"},
                {"name":"DIVORCED","id":"3"},
                {"name":"SEPARATED","id":"4"}

            ],
            typeList:[
                {"name":"CURRENT ADDRESS","id":"1"},
                {"name":"REGISTERED ADDRESS","id":"2"},
                {"name":"PROVINCIAL ADDRESS","id":"3"},
                {"name":"CORRESPONDENCE ADDRESS","id":"4"},
                {"name":"FOREIGN ADDRESS","id":"5"},
            ],
            levelList:[
                {"name":"COLLEGE","id":"1"},
                {"name":"HIGH SCHOOL","id":"2"},
                {"name":"ELEMENTARY","id":"3"},
                {"name":"OTHERS","id":"4"}
            ],
            roleList:[
                {"name":"FATHER","id":"1"},
                {"name":"MOTHER","id":"2"},
                {"name":"SPOUSE","id":"3"},
                {"name":"BROTHER","id":"4"},
                {"name":"SISTER","id":"5"},
                {"name":"CHILD","id":"6"},
            ],
            tblRoleArrLst               :   [],
            tblLevelArrLst              :   [],
            applicationListGrid         :   [],
            employmentListGrid          :   [],
            documentsListGrid           :   [],
            tblTypeArrLst               :   [],
            educationListGrid           :   [],
            profileStatusAutocomplete   :   [],
            tblProfileArrLst            :   [],
            bloodTypeAutocomplete       :   [],
            livingArrangeAutocomplete   :   [],
            remarksAutocomplete         :   [],
            selectedUserFullName        :   "",
            selectedManagerName         :   "",
            relativeListGrid            :   [],
            addressListGrid             :   [],
            applicationFormListGrid     :   [],
            trainingsListGrid           :   [
                {
                    "trainingId"        :   "",
                    "dateCompleted"     :   "",
                    "presenter"         :   "",
                }
            ],
            regionList                  :   [],
            provinceList                :   [],
            tblRegionArrLst             :   [],
            tblProvincesArrLst          :   [],
            tblCitiesArrLst             :   [],
            citylist                    :   [],

            employmentListGrid : [],
            backgroundListGrid : [],
        }

    }

    
    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.state.employeeProfileData = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["profileStatus"]
        this.GetProvince();
        this.GetRegion();
        this.GetCity();
        this.getTypeList();
        this.getLevelList();
        this.getRoleList();
        this.GetProfileStatus();
        this.GetLivingArrange();
        this.GetBloodType();
        this.GetRemarks();
        console.log("this.state.employeeProfileData")
        console.log(JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["profileStatus"])

        console.log("dateOfBirth")
        console.log(new Date(JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["dateOfBirth"]))




        // FAMILY DATA

        /* for (let i = 0; i < JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeFamilyBackgrounds.length; i++) {
            const obj = {
                "roleId"        :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeFamilyBackgrounds[i]["roleId"],
                "name"          :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeFamilyBackgrounds[i]["name"],
                "age"           :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeFamilyBackgrounds[i]["age"],
                "occupation"    :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeFamilyBackgrounds[i]["occupation"],
                "company"       :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeFamilyBackgrounds[i]["company"],
            };

            this.state.backgroundListGrid.push(obj);
        } */

        // ApplicationRecords DATA
        /* for (let i = 0; i < JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords.length; i++) {
                const obj = {
                    "memberName"        :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords[i]["memberName"],
                    "dateApplied"       :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords[i]["dateApplied"],
                    "applicationFormNo" :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords[i]["referenceNo"],
                    "client"            :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords[i]["client"],
                    "position"          :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords[i]["position"],
                    "status"            :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeApplicationRecords[i]["status"],
                };

                this.state.applicationListGrid.push(obj);
        } */

        // EDUCATION DATA

        /* for (let i = 0; i < JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations.length; i++) {
            const obj = {
                "levelId"       :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations[i]["levelId"],
                "schoolName"    :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations[i]["schoolName"],
                "course"        :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations[i]["course"],
                "startYear"     :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations[i]["startYear"],
                "endYear"       :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations[i]["endYear"],
                "honorRecieved" :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employeeEducations[i]["honorRecieved"],
            };

            this.state.educationListGrid.push(obj);
        } */



        // employmentHistories DATA

        /* for (let i = 0; i < JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories.length; i++) {
            const obj = {
                "companyName"               :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["companyName"],
                "companyAddress"            :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["companyAddress"],
                "position"                  :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["position"],
                "workNature"                :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["natureOfWorkId"],
                "periodCovered"             :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["periodCovered"],
                "salary"                    :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["salary"],
                "supervisor"                :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["supervisor"],
                "contactNumber"             :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["contactNumber"],
                "reasonForLeaving"          :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["reasonForLeaving"],
                "taxableCompensationIncome" :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["taxableCompensationIncome"],
                "withholdingTax"            :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["withHoldingTax"],
                "yearOfCompensation"        :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["yearofCompensation"],
                "ntThirteenMonthPay"        :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["ntThirteenMonthPay"],
                "deminimis"                 :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["deminimis"],
                "ntMandatoryDeduction"      :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["ntMandatoryDeduction"],
                "ntSalaries"                :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["ntSalaries"],
                "basicSalary"               :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["basicSalary"],
                "taxableThirteenMonthPay"   :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["taxableThirteenMonthPay"],
                "taxableSalaries"           :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["taxableSalaries"],
                "basicPayMWE"               :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["basicPayMWE"],
                "holidayPayMWE"             :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["holidayPayMWE"],
                "overtimePayMWE"            :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["overtimePayMWE"],
                "nightDiffPayMWE"           :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["nightDiffPayMWE"],
                "remarks"                   :   JSON.parse(sessionStorage.getItem("employeeProfileDetails")).employmentHistories[i]["remarks"],
            };

            this.state.employmentListGrid.push(obj);
        } */

        for (let i = 0; i < JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles.length; i++) {
            this.state.selectedPlaceOfBirth	            =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["placeOfBirth"]
            this.state.employeeId                       =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["id"]
            this.state.livingArrangementId              =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["livingArrangementId"]
            this.state.bloodTypeId                      =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["bloodTypeId"]
            //this.state.dateOfBirth                    =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["dateOfBirth"]
            this.state.profileStatusId                  =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["profileStatusId"]
            this.state.selectedFirstName                =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["firstName"]
            
            this.state.selectedMiddleName               =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["middleName"]
            this.state.selectedNickName                 =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["nickName"]
            this.state.selectedLastName                 =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["lastName"]
            this.state.selectedTitle                    =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["title"]
            this.state.selectedDateOfBirth              =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["dateOfBirth"]
            this.state.selectedAge                      =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["age"]
            //this.state.selectedNationality              =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["nationality"]
            this.state.nationalityId                    =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["nationalityId"]
            this.state.selectedHomePhoneNumber          =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["homePhoneNumber"]
            this.state.selectedMobileNumber             =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["mobileNumber"]
            //this.state.selectedReligion                 =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["religion"]
            this.state.religionId                       =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["religionId"]
            this.state.selectedEmailAddress             =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["emailAddress"]
            this.state.selectedFacebook                 =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["facebook"]
            this.state.selectedTwitter                  =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["twitter"]
            this.state.selectedGender                   =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["gender"]
            this.state.selectedCivilStatus              =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["civilStatus"]
            this.state.selectedSSSNumber                =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["sssNumber"]
            this.state.selectedTinNumber                =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["tinNumber"]
            this.state.selectedPhicNumber               =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["philHealthNumber"]
            this.state.selectedHdmfNumber               =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["pagibigNumber"]
            this.state.selectedHeight                   =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["height"]
            this.state.selectedWeight                   =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["weight"]
            this.state.selectedHobbies                  =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["hobbies"]
            this.state.selectedLanguageSpoken           =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["languageSpoken"]
            this.state.selectedEmergencyContactName     =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["emergencyContactName"]
            this.state.selectedRelationship             =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["emergencyContactRelationship"]
            this.state.selectedEmergencyContactNumber   =   JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[i]["emergencyContactNumber"]

        }

        console.log("this.state.profileStatus")
        console.log(this.state.profileStatus)
        /* this.setState({
            profileStatus : this.state.profileStatus
        }) */

       
        this.getDateOfBirth();
        /* this.getApplicationForm(); */
    }

    getApplicationForm() {
        this.setState({
            isloading   :   true,
        })

        const applicationParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ProfileId":this.state.selectedProfileId,
            "PositionId":this.state.selectedPositionId,
            "StatusId":this.state.selectedStatusId,
            "TINNumber":this.state.selectedTinNo
        };
        //console.log(applicationParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms",  applicationParams)
            /* .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationFormDetails",  applicationParams) */
            .then(res => {
            const data = res.data;
            //console.log("GetApplicationForms")
            //console.log(data)
            this.setState({
                relativeListGrid    :   data.applicationForms,
                isloading	        :   false,
                applicationListGrid :   data.applicationForms,
            })

            /* for (let i = 0; i < data.applicationForms.length; i++) {
                for (let applicant = 0; applicant < data.applicationForms[i].applicantAddresses.length; applicant++) {
                    const addressObj = {
                        "typeId"        :   data.applicationForms[i].applicantAddresses[applicant]["typeId"],
                        "regionId"      :   data.applicationForms[i].applicantAddresses[applicant]["regionId"],
                        "provinceId"    :   data.applicationForms[i].applicantAddresses[applicant]["provinceId"],
                        "cityId"        :   data.applicationForms[i].applicantAddresses[applicant]["cityId"],
                        "houseNumber"   :   data.applicationForms[i].applicantAddresses[applicant]["houseNumber"],
                        "streetName"    :   data.applicationForms[i].applicantAddresses[applicant]["streetName"],
                        "barangay"      :   data.applicationForms[i].applicantAddresses[applicant]["barangay"],
                        "postalCode"    :   data.applicationForms[i].applicantAddresses[applicant]["postalCode"],
                    };
                    this.state.addressListGrid.push(addressObj);
                }

                for (let education = 0; education < data.applicationForms[i].educationAttainments.length; education++) {
                    const educationObj = {
                        "levelId"           :   data.applicationForms[i].educationAttainments[education]["levelId"],
                        "schoolName"        :   data.applicationForms[i].educationAttainments[education]["schoolName"],
                        "course"            :   data.applicationForms[i].educationAttainments[education]["course"],
                        "startYear"         :   data.applicationForms[i].educationAttainments[education]["startYear"],
                        "endYear"           :   data.applicationForms[i].educationAttainments[education]["endYear"],
                        "honorRecieved"     :   data.applicationForms[i].educationAttainments[education]["honorRecieved"],
                    };
                    this.state.educationListGrid.push(educationObj);
                }

                for (let employment = 0; employment < data.applicationForms[i].employmentHistories.length; employment++) {
                    const employmentObj = {
                        "companyName"                   :   data.applicationForms[i].employmentHistories[employment]["companyName"],
                        "companyAddress"                :   data.applicationForms[i].employmentHistories[employment]["companyAddress"],
                        "position"                      :   data.applicationForms[i].employmentHistories[employment]["position"],
                        //"workNature"                 :   data.applicationForms[i].employmentHistories[employment]["workNature"],
                        "periodCovered"                 :   data.applicationForms[i].employmentHistories[employment]["periodCovered"],
                        "salary"                        :   data.applicationForms[i].employmentHistories[employment]["salary"],
                        "supervisor"                    :   data.applicationForms[i].employmentHistories[employment]["supervisor"],
                        "contactNumber"                 :   data.applicationForms[i].employmentHistories[employment]["contactNumber"],
                        "reasonForLeaving"              :   data.applicationForms[i].employmentHistories[employment]["reasonForLeaving"],
                        "taxableCompensationIncome"     :   data.applicationForms[i].employmentHistories[employment]["taxableCompensationIncome"],
                        "withholdingTax"                :   data.applicationForms[i].employmentHistories[employment]["withholdingTax"],
                        "yearOfCompensation"            :   data.applicationForms[i].employmentHistories[employment]["yearOfCompensation"],
                        "ntThirteenMonthPay"            :   data.applicationForms[i].employmentHistories[employment]["ntThirteenMonthPay"],
                        "deminimis"                     :   data.applicationForms[i].employmentHistories[employment]["deminimis"],
                        "ntMandatoryDeduction"          :   data.applicationForms[i].employmentHistories[employment]["ntMandatoryDeduction"],
                        "ntSalaries"                    :   data.applicationForms[i].employmentHistories[employment]["ntSalaries"],
                        "basicSalary"                   :   data.applicationForms[i].employmentHistories[employment]["basicSalary"],
                        "taxableThirteenMonthPay"       :   data.applicationForms[i].employmentHistories[employment]["taxableThirteenMonthPay"],
                        "taxableSalaries"               :   data.applicationForms[i].employmentHistories[employment]["taxableSalaries"],
                        "basicPayMWE"                   :   data.applicationForms[i].employmentHistories[employment]["basicPayMWE"],
                        "holidayPayMWE"                 :   data.applicationForms[i].employmentHistories[employment]["holidayPayMWE"],
                        "overtimePayMWE"                :   data.applicationForms[i].employmentHistories[employment]["overtimePayMWE"],
                        "nightDiffPayMWE"               :   data.applicationForms[i].employmentHistories[employment]["nightDiffPayMWE"],
                        "remarks"                       :   data.applicationForms[i].employmentHistories[employment]["remarks"],
                    };
                    this.state.employmentListGrid.push(employmentObj);
                }
            } */
            // this.processGrid();
            if(data.status=="0"){
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

    getDateOfBirth(){
        
        ////console.log("JSON.parse(sessionStorage.getItem("employeeProfileDetails"))")
        ////console.log((JSON.parse(sessionStorage.getItem("employeeProfileDetails")).dateOfBirth ? this.formatDate(JSON.parse(sessionStorage.getItem("employeeProfileDetails")).dateOfBirth) : ""))
        //this.state.birthOfDate = (JSON.parse(sessionStorage.getItem("employeeProfileDetails")).dateOfBirth ? this.formatDate(JSON.parse(sessionStorage.getItem("employeeProfileDetails")).dateOfBirth) : "")
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [month, day, year].join('/');
    }

    onChangeUserFullName(e) {
        this.setState({selectedUserFullName : e.target.value})
        ////////console.log(e.target.value)
    }  

    onChangeManagerName(e) {
        this.setState({selectedManagerName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeEmergencyContactName(e) {
        this.setState({selectedEmergencyContactName : e.target.value})
        ////////console.log(e.target.value)
    }   

    onChangeRelationship(e) {
        this.setState({selectedRelationship : e.target.value})
        ////////console.log(e.target.value)
    }  

    onChangeContactNumber(e) {
        this.setState({selectedEmergencyContactNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeLanguageSpoken(e) {
        this.setState({selectedLanguageSpoken : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeHeight(e) {
        this.setState({selectedHeight : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeWeight(e) {
        this.setState({selectedWeight : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeHobbies(e) {
        this.setState({selectedHobbies : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeFirstName(e) {
        this.setState({selectedFirstName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeMiddleName(e) {
        this.setState({selectedMiddleName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeNickName(e) {
        this.setState({selectedNickName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeLastName(e) {
        this.setState({selectedLastName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeTitle(e) {
        this.setState({selectedTitle : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangePlaceOfBirth(e) {
        this.setState({selectedPlaceOfBirth : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeHomePhoneNumber(e) {
        this.setState({selectedHomePhoneNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeMobileNumber(e) {
        this.setState({selectedMobileNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    handleChangeCitizenship= (e) => {
        if(e.length == 0) {
            this.state.nationalityId     =   ""
            return
        }
        this.state.nationalityId     =   e[0].id
    }

    handleChangeReligion= (e) => {
        if(e.length == 0) {
            this.state.religionId     =   ""
            return
        }
        this.state.religionId     =   e[0].id
    }

    onChangeEmailAddress(e) {
        this.setState({selectedEmailAddress : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeFacebook(e) {
        this.setState({selectedFacebook : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeTwitter(e) {
        this.setState({selectedTwitter : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeSSSNumber(e) {
        this.setState({selectedSSSNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeTinNumber(e) {
        this.setState({selectedTinNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangePhicNumber(e) {
        this.setState({selectedPhicNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeHdmfNumber(e) {
        this.setState({selectedHdmfNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    handleChangeGender= (e) => {
        if(e.length == 0) {
            this.state.selectedGender     =   ""
            return
        }
        this.state.selectedGender     =   e[0].name
    }

    handleChangeCivilStatus= (e) => {
        if(e.length == 0) {
            this.state.selectedCivilStatus     =   ""
            return
        }
        this.state.selectedCivilStatus     =   e[0].name
    }

    GetProfileStatus() {
        const dataParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0018"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            ////////console.log("GetProfileStatus")
            ////////console.log(data)
            this.setState({ profileStatusAutocomplete  : data.dataReferences}); 
        })
        
    } 

    handleCoverProfileStatus= (e) => {
        if(e.length == 0) {
            this.state.profileStatusId     =   ""
            return
        }
        this.state.profileStatusId     =   e[0].id

        console.log("ProfileStatus")
        console.log(this.state.profileStatusId)
    }

    GetLivingArrange() {
        const dataParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLivingArrangements",  dataParams)
        .then(res => {
            const data = res.data;
            ////////console.log("GetLivingArrangements")
            ////////console.log(data)
            this.setState({ livingArrangeAutocomplete  : data.livingArrangements}); 
            
        })
        
    } 

    handleCoverLivingArrangement= (e) => {
        if(e.length == 0) {
            this.state.livingArrangementId     =   ""
            return
        }
        this.state.livingArrangementId     =   e[0].id
    }

    GetBloodType() {
        const dataParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetBloodTypes",  dataParams)
        .then(res => {
            const data = res.data;
            ////////console.log("GetBloodTypes")
            ////////console.log(data)
            this.setState({ bloodTypeAutocomplete  : data.bloodTypes});
        })
        
    } 

    handleCoverBloodType= (e) => {
        if(e.length == 0) {
            this.state.bloodTypeId     =   ""
            return
        }
        this.state.bloodTypeId     =   e[0].id
    }

    GetRemarks() {
        const dataParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0020"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            ////////console.log("GetRemarks")
            ////////console.log(data)
            this.setState({ remarksAutocomplete  : data.dataReferences}); 
            //let profileGetName = ""
            //return profileGetName
        })
        
    } 

    handleCoverSSSRemarks= (e) => {
        ////////////console.log(e)
        if(e.length > 0) {
            this.state.sssRemarksId = e[0].id
        }else{
            this.state.sssRemarksId = ""
        }
    }

    handleCoverTINRemarks= (e) => {
        ////////////console.log(e)
        if(e.length > 0) {
            this.state.tinRemarksId = e[0].id
        }else{
            this.state.tinRemarksId = ""
        }
    }

    handleCoverPHILHEALTHRemarks= (e) => {
        ////////////console.log(e)
        if(e.length > 0) {
            this.state.phicRemarksId = e[0].id
        }else{
            this.state.phicRemarksId = ""
        }
    }

    handleCoverPAGIBIGRemarks= (e) => {
        ////////////console.log(e)
        if(e.length > 0) {
            this.state.pagibigRemarksId = e[0].id
        }else{
            this.state.pagibigRemarksId = ""
        }
    }


    handleSubmitClick = () => {
        ////////console.log(this.state.selectedFirstName)
    }
         
    getTypeList(){
        ////////console.log("getTypeList")
        ////////console.log(this.state.typeList)
        for (let i = 0; i < this.state.typeList.length; i++) {
            const objType = {
                value : this.state.typeList[i]["id"],
                label : this.state.typeList[i]["name"],
            };
            this.state.tblTypeArrLst.push(objType);
        }
    }
         
    getLevelList(){
        ////////console.log("getLevelList")
        ////////console.log(this.state.levelList)
        for (let i = 0; i < this.state.levelList.length; i++) {
            const objType = {
                value : this.state.levelList[i]["id"],
                label : this.state.levelList[i]["name"],
            };
            this.state.tblLevelArrLst.push(objType);
        }
    }
         
    getRoleList(){
        for (let i = 0; i < this.state.roleList.length; i++) {
            const objType = {
                value : this.state.roleList[i]["id"],
                label : this.state.roleList[i]["name"],
            };
            this.state.tblRoleArrLst.push(objType);
        }
    }

    /* LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.addressListGrid.length; i++) {
            if (this.state.addressListGrid[i]["isModified"] == 1) {
                this.setState({
                    isGridDataChanged   :   true
                })
                isChanged=true
                break;
            }
        }
        return isChanged
    } */
  
    addAddress = () => {
        let address = this.state.addressListGrid
        let obj = {
            "typeId"        :   "",
            "region"        :   "",
            "province"      :   "",
            "city"          :   "",
            "houseNumber"   :   "",
            "streetName"    :   "",
            "barangay"      :   "",
            "postalCode"    :   "",
        }
    
        address.push(obj)
        this.setState({addressListGrid: address})
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
            //////console.log("Test region");
            //////console.log(data);
            this.setState({ regionList: data.regions });
            for (let i = 0; i < data.regions.length; i++) {
                const regionObj = {
                    value : data.regions[i]["id"],
                    label : data.regions[i]["name"],
                };
                this.state.tblRegionArrLst.push(regionObj);
            }
         })
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
            //////console.log("GetProvinces");
            //////console.log(data);
            this.setState({ provinceList: data.provinces });
            for (let i = 0; i < data.provinces.length; i++) {
                const provinceObj = {
                    value : data.provinces[i]["id"],
                    label : data.provinces[i]["name"],
                };
                this.state.tblProvincesArrLst.push(provinceObj);
            }
        })

    }

    GetCity() {

        const cityParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
            "ProvinceName": ""
        };

        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities",  cityParams
        )
        .then(res => {
        const data = res.data;
        //////console.log("GetCities");
        //////console.log(data);
        this.setState({ citylist: data.cities });
            for (let i = 0; i < data.cities.length; i++) {
                const cityObj = {
                    value : data.cities[i]["id"],
                    label : data.cities[i]["name"],
                };
                this.state.tblCitiesArrLst.push(cityObj);
            }
            //////console.log(this.state.tblCitiesArrLst)

        })

    }

    handleSaveClick = () => {
        /* this.setState({
            newAddressListGrid   :   [],
            isloading           :   true,
        })

        for (let i = 0; i < this.state.addressListGrid.length; i++) {
            if (this.state.addressListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id              :   this.state.employeeId,
                    TypeId          :   this.state.addressListGrid[i]["typeId"],
                    HouseNumber     :   this.state.addressListGrid[i]["houseNumber"],
                    StreetName      :   this.state.addressListGrid[i]["streetName"],
                    Barangay        :   this.state.addressListGrid[i]["barangay"],
                    PostalCode      :   this.state.addressListGrid[i]["postalCode"],
                    RegionId        :   this.state.addressListGrid[i]["regionId"],
                    Region          :   this.state.addressListGrid[i]["region"],
                    ProvinceId      :   this.state.addressListGrid[i]["provinceId"],
                    Province        :   this.state.addressListGrid[i]["province"],
                    CityId          :   this.state.addressListGrid[i]["cityId"],
                    City            :   this.state.addressListGrid[i]["city"]
                };

                this.state.newAddressListGrid.push(obj);
            }
        } */
        ////console.log(this.state.newAddressListGrid)
      
    const getParams = {
        "IpAddress"                     :   "0.0.0.0",
        "ClientId"                      :   this.state.userinfo.clientId,
        "UserId"                        :   this.state.userinfo.userId,
        "Id"                            :   this.state.employeeId, /* id from GetEmployeeProfiles */
        "LastName"                      :   this.state.selectedLastName,
        "FirstName"                     :   this.state.selectedFirstName,
        "MiddleName"                    :   this.state.selectedMiddleName,
        "NickName"                      :   this.state.selectedNickName,
        "Title"                         :   this.state.selectedTitle,
        "DateOfBirth"                   :   this.state.selectedDateOfBirth,
        "PlaceOfBirth"                  :   this.state.selectedPlaceOfBirth,
        "Gender"                        :   this.state.selectedGender,
        "CivilStatus"                   :   this.state.selectedCivilStatus,
        "LivingArrangementId"           :   this.state.livingArrangementId,
        "BloodTypeId"                   :   this.state.bloodTypeId,
        "Hobbies"                       :   this.state.selectedHobbies,
        "Height"                        :   this.state.selectedHeight,
        "Weight"                        :   this.state.selectedWeight,
        "TINNumber"                     :   this.state.selectedTinNumber,
        "SSSNumber"                     :   this.state.selectedSSSNumber,
        "PhilHealthNumber"              :   this.state.selectedPhicNumber,
        "PAGIBIGNumber"                 :   this.state.selectedHdmfNumber,
        "EmailAddress"                  :   this.state.selectedEmailAddress,
        "ProfileStatusId"               :   this.state.profileStatusId,
        "NationalityId"                 :   this.state.nationalityId,
        "ReligionId"                    :   this.state.religionId,
        "Facebook"                      :   this.state.selectedFacebook,
        "Twitter"                       :   this.state.selectedTwitter,
        "HomePhoneNumber"               :   this.state.selectedHomePhoneNumber,
        "MobileNumber"                  :   this.state.selectedMobileNumber,
        "LanguageSpoken"                :   this.state.selectedLanguageSpoken,
        "EmergencyContactName"          :   this.state.selectedEmergencyContactName,
        "EmergencyContactRelationship"  :   this.state.selectedRelationship,
        "EmergencyContactNumber"        :   this.state.selectedEmergencyContactNumber,
        "employeeAddresses"             :   this.state.newAddressListGrid,
        "employeeCompanyRelatives":[
            {
                "Id":"",
                "Name":"",
                "RelationShip":"",
                "JobTitle":""
            }
        ],
        "employmentHistories":[
            {
                "Id":"",
                "CompanyName":"",
                "CompanyAddress":"",
                "Position":"",
                "NatureOfWorkId":"",
                "Salary":"",
                "Supervisor":"",
                "ContactNumber":"",
                "ReasonForLeaving":"",
                "PeriodCovered":"",
                "TaxableCompensationIncome":"",
                "WithHoldingTax":"",
                "YearofCompensation":"",
                "NTThirteenMonthPay":"",
                "Deminimis":"",
                "NTMandatoryDeduction":"",
                "NTSalaries":"",
                "BasicSalary":"",
                "TaxableThirteenMonthPay":"",
                "TaxableSalaries":"",
                "BasicPayMWE":"",
                "HolidayPayMWE":"",
                "OvertimePayMWE":"",
                "NightDiffPayMWE":"",
                "Remarks":""
            }
        ],
        "employeeFamilyBackgrounds":[
            {
                "Id":"",
                "RoleId":"",
                "Name":"",
                "Age":"",
                "Occupation":"",
                "Company":""
            }
        ],
        "employeeEducations":[
            {
                "Id":"",
                "LevelId":"",
                "SchoolName":"",
                "Course":"",
                "StartYear":"",
                "EndYear":"",
                "HonorRecieved":""
            }
        ],
        "employeeDocuments":[
            {
                "Id":"",
                "TypeId":"",
                "FileName":"",
                "Tags":"",
                "SubmittedDate":""
            }
        ],
        "employeeTrainings":[
            {
                "Id":"",
                "TrainingId":"",
                "Presenter":"",
                "DateCompleted":""
            }
        ]
      }
      
      console.log("Save Profile Parameter");
      console.log(getParams)
     /*  axios
          .post(AppConfiguration.Setting().noserapiendpoint + "Employee/SaveEmployeeConfiguration", getParams)
          .then(res => {
              const data = res.data;
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
          }) */
    }

    onChangeDateOfBirth = date => {
        this.setState({
            dateOfBirth: date
        });
    };

    AddressGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.addressListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    CompanyRelativeGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.relativeListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    FamilyGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.backgroundListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    EducationGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.educationListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    ApplicationGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.applicationListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    EmploymentGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.employmentListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    TrainingsGridDataModified(oldValue, newValue, id, column) {
        ////////console.log(id)
        this.state.trainingsListGrid.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    render() {

        const relativeColumn = [
            {
                dataField: 'relativeName',
                text: 'NAME',
                headerStyle: () => {
                    return { width: "40%" };
                },
            },
            {
                dataField: 'relativeRelation',
                text: 'RELATIONSHIP',
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'relativePosition',
                text: 'JOB TITLE',
                headerStyle: () => {
                    return { width: "40%" };
                },
            }
        ] 

        const relativeSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.relativeListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const relativeRowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };

        const addressColumn = [
            {
                dataField: 'typeId',
                text: 'TYPE',
                editable    : true,
                formatter: (cell, row) => {
                    if(row.typeId!='' && row.typeId!=null){
                        return this.state.tblTypeArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblTypeArrLst
                },
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'regionId',
                text: 'REGION',
                headerStyle: () => {
                    return { width: "15%" };
                },
                formatter: (cell, row) => {
                    if(row.regionId!='' && row.regionId!=null){
                        return this.state.tblRegionArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblRegionArrLst
                },
            },
            {
                dataField: 'provinceId',
                text: 'PROVINCE',
                headerStyle: () => {
                    return { width: "15%" };
                },
                formatter: (cell, row) => {
                    if(row.provinceId!='' && row.provinceId!=null){
                        return this.state.tblProvincesArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblProvincesArrLst
                },
            },
            {
                dataField: 'cityId',
                text: 'CITY/MUNICIPALITY',
                headerStyle: () => {
                    return { width: "15%" };
                },
                formatter: (cell, row) => {
                    //////console.log(cell)
                    if(row.cityId!='' && row.cityId!=null){
                        //return this.state.tblCitiesArrLst.find(x => x.value == cell).label;
                        return this.state.tblCitiesArrLst.includes(x => x.value == cell).label ? this.state.tblCitiesArrLst.find(x => x.value == cell).label : ''
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblCitiesArrLst
                },
            },
            {
                dataField: 'houseNumber',
                text: 'HOUSE#',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'streetName',
                text: 'STREET',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'barangay',
                text: 'BARANGAY',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'postalCode',
                text: 'POSTAL CODE',
                headerStyle: () => {
                    return { width: "10%" };
                },
            }
        ] 
        const addressSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.addressListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
            const addressRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        };

        const educationColumn = [
            {
                dataField: 'levelId',
                text: 'EDUCATION LEVEL',
                headerStyle: () => {
                    return { width: "25%" };
                },
                editable    : true,
                formatter: (cell, row) => {
                    if(row.levelId!='' && row.levelId!=null){
                        return this.state.tblLevelArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblLevelArrLst
                },
            },
            {
                dataField: 'schoolName',
                text: 'SCHOOL NAME',
                headerStyle: () => {
                    return { width: "25%" };
                },
            },
            {
                dataField: 'course',
                text: 'COURSE',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'startYear',
                text: 'START YEAR',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'endYear',
                text: 'END YEAR',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            /* {
                dataField: 'generalAverage',
                text: 'GENERAL AVERAGE'
            }, */
            {
                dataField: 'honorRecieved',
                text: 'HONOR(S)/AWARD(S)',
                headerStyle: () => {
                    return { width: "15%" };
                },
            
            }
        ] 

        const educationSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.educationListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const educationRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        };

        const backgroundColumn = [
            {
                dataField: 'roleId',
                text: 'ROLE',
                headerStyle: () => {
                    return { width: "7%" };
                },
                editable    : true,
                formatter: (cell, row) => {
                    if(row.roleId!='' && row.roleId!=null){
                        return this.state.tblRoleArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblRoleArrLst
                },
            },
            {
                dataField: 'name',
                text: 'NAME',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'bday',
                text: 'BDAY',
                headerStyle: () => {
                    return { width: "7%" };
                },
                editable    : false,
            },
            {
                dataField: 'age',
                text: 'AGE',
                headerStyle: () => {
                    return { width: "5%" };
                },
            },
            {
                dataField: 'occupation',
                text: 'OCCUPATION',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'company',
                text: 'CMPNY/SCHL',
                headerStyle: () => {
                    return { width: "15%" };
                },
            
            },
            {
                dataField: 'phoneNo',
                text: 'PHONE NO.',
                headerStyle: () => {
                    return { width: "10%" };
                },
                editable    : false,
            
            },
            {
                dataField: 'address',
                text: 'ADDRESS',
                headerStyle: () => {
                    return { width: "10%" };
                },
                editable    : false,
            
            },
            {
                dataField: 'sss',
                text: 'SSS',
                headerStyle: () => {
                    return { width: "5%" };
                },
                editor: {
                  type: Type.CHECKBOX,
                  /* value: 'Y:N' */
                },
                editable    : false,
            
            },
            {
                dataField: 'phic',
                text: 'PHIC',
                headerStyle: () => {
                    return { width: "5%" };
                },
                editor: {
                  type: Type.CHECKBOX,
                  /* value: 'Y:N' */
                },
                editable    : false,
            
            },
            {
                dataField: 'aap',
                text: 'AAP',
                headerStyle: () => {
                    return { width: "5%" };
                },
                editor: {
                  type: Type.CHECKBOX,
                  /* value: 'Y:N' */
                },
                editable    : false,
            
            },
            {
                dataField: 'pagibig',
                text: 'PAGIBIG',
                headerStyle: () => {
                    return { width: "6%" };
                },
                editor: {
                  type: Type.CHECKBOX,
                  /* value: 'Y:N' */
                },
                editable    : false,
            
            },
        ] 

        const backgroundSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.backgroundListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const backgroundRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        };


        const applicationColumn = [
            {
                dataField: 'memberName',
                text: 'FULL NAME',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'dateApplied',
                text: 'APPLY DATE',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'applicationFormNo',
                text: 'APPLICATION FORM NO.',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'client',
                text: 'CLIENT/S',
                headerStyle: () => {
                    return { width: "28%" };
                },
            },
            {
                dataField: 'position',
                text: 'POSITION/S APPLIED',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'status',
                text: 'STATUS',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                headerStyle: () => {
                    return { width: "7%" };
                },
            
            }
	    ] 

        const applicationSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.educationListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const applicationRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        };

        const employmentColumn = [
            {
                dataField: 'companyName',
                text: 'COMPANY'
            },
            {
                dataField: 'companyAddress',
                text: 'ADDRESS'
            },
            {
                dataField: 'position',
                text: 'POSITION'
            },
            {
                dataField: 'workNature',
                text: 'WORK_NATURE',
            },
            {
                dataField: 'periodCovered',
                text: 'PERIOD_COVERED',
            },
            {
                dataField: 'salary',
                text: 'SALARY'
            },
            {
                dataField: 'supervisor',
                text: 'SUPERVISOR'
            
            },
            {
                dataField: 'contactNumber',
                text: 'CONTACT #'
            },
            {
                dataField: 'reasonForLeaving',
                text: 'REASON_FOR_LEAVING'
            },
            {
                dataField: 'taxableCompensationIncome',
                text: 'TAXABLE_COMPENSATION_INCOME'
            
            },
            {
                dataField: 'withholdingTax',
                text: 'WITHHELD_TAX '
            },
            {
                dataField: 'yearOfCompensation',
                text: 'YEAR_OF_COMPENSATION'
            },
            {
                dataField: 'ntThirteenMonthPay',
                text: '13th_MONTH_PAY_AND_OTHER_BENEFITS',
            
            },
            {
                dataField: 'deminimis',
                text: 'DEMINIMIS_BENEFITS'
            },
            {
                dataField: 'ntMandatoryDeduction',
                text: 'MANDATORY_DEDUCTIONS'
            },
            {
                dataField: 'ntSalaries',
                text: 'NON-TAXABLE_SALARIES_&_OTHER_FORMS_OF_COMPENSATION',
            
            },
            {
                dataField: 'basicSalary',
                text: 'BASIC_SALARY'
            },
            {
                dataField: 'taxableThirteenMonthPay',
                text: 'TAXABLE_13th_MONTH_PAY_&_OTHER_BENEFITS',
            },
            {
                dataField: 'taxableSalaries',
                text: 'TAXABLE_SALARIES_&_OTHER_FORMS_OF_COMPENSATION',
                /* headerStyle: () => {
                    return { width: "45%" };
                }, */
            
            },
            {
                dataField: 'basicPayMWE',
                text: 'BASIC_PAY_FOR_MWE'
            },
            {
                dataField: 'holidayPayMWE',
                text: 'HOLIDAY_PAY_FOR_MWE'
            },
            {
                dataField: 'overtimePayMWE',
                text: 'OVERTIME_PAY_FOR_MWE'
            
            },
            {
                dataField: 'nightDiffPayMWE',
                text: 'NIGHT_DIFFERENTIAL_PAY_FOR_MWE'
            },
            {
                dataField: 'remarks',
                text: 'REMARKS'
            }
	    ] 

        const employmentSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.employmentListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const employmentRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        };

        const documentsColumn = [
            
	    ] 

        /* const documentsSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.documentsListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const documentsRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        }; */

        const trainingsColumn = [
            {
                dataField: 'trainingId',
                text: 'TRAINING ID',
                headerStyle: () => {
                    return { width: "50%" };
                },
            },
            {
                dataField: 'dateCompleted',
                text: 'DATE COMPLETED',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'presenter',
                text: 'PRESENTER',
                headerStyle: () => {
                    return { width: "40%" };
                },
            
            },
            
	    ] 

        const trainingsSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.trainingsListGrid.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        
        const trainingsRowEvents = {
                onClick: (e, row, rowIndex) => {
            }
        };

        return(
            <div>
                <Banner />
                    <Container  className="mt-3" fluid>
                        <Card>
                            <Card.Header>EDIT PROFILE</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Tabs className="mt-2" defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                        <Tab eventKey="default" title="I. GENERAL INFORMATION">
                                          <Form.Row>
                                            <Form.Group controlId="formGridPassword" as={Col}>
                                                <Card className="card-tab-no-border">
                                                    <Card.Body>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                PROFILE STATUS
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id="basic-example"
                                                                    onChange={this.handleCoverProfileStatus}
                                                                    options={this.state.profileStatusAutocomplete}
                                                                    type="text" 
                                                                    // defaultSelected={[this.state.nationalityId = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["profileStatus"]]}
                                                                     defaultSelected={[this.state.profileStatusId = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["profileStatus"]]}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                FIRST NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedFirstName"
                                                                    value={this.state.selectedFirstName}
                                                                    onChange={this.onChangeFirstName.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                MIDDLE NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedMiddleName"
                                                                    value={this.state.selectedMiddleName}
                                                                    onChange={this.onChangeMiddleName.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                NICK NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedNickName"
                                                                    value={this.state.selectedNickName}
                                                                    onChange={this.onChangeNickName.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                LAST NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedLastName"
                                                                    value={this.state.selectedLastName}
                                                                    onChange={this.onChangeLastName.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                TITLE
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedTitle"
                                                                    value={this.state.selectedTitle}
                                                                    onChange={this.onChangeTitle.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                DATE OF BIRTH
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <DatePicker
                                                                    ref='dateOfBirth'
                                                                    selected={this.state.dateOfBirth}
                                                                    onChange={this.onChangeDateOfBirth}
                                                                    minDate={this.minDate}
                                                                    //value={this.props.dateOfBirth}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                    defaultValue={JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["dateOfBirth"] }
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                AGE
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedAge"
                                                                    value={this.state.selectedAge}
                                                                    readOnly
                                                                    //onChange={this.onChangeAge.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                PLACE OF BIRTH
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedPlaceOfBirth"
                                                                    value={this.state.selectedPlaceOfBirth}
                                                                    onChange={this.onChangePlaceOfBirth.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                NATIONALITY
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id="basic-example"
                                                                    onChange={this.handleChangeCitizenship}
                                                                    options={this.state.CitizenshipList}
                                                                    type="text" 
                                                                    defaultSelected={[this.state.nationalityId = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["nationality"]]}
                                                                /> 
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                HOME PHONE NUMBER
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedHomePhoneNumber"
                                                                    value={this.state.selectedHomePhoneNumber}
                                                                    onChange={this.onChangeHomePhoneNumber.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                MOBILE NUMBER
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedMobileNumber"
                                                                    placeholder="Enter Mobile Number" 
                                                                    value={this.state.selectedMobileNumber}
                                                                    onChange={this.onChangeMobileNumber.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                RELIGION
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id='basic-example'
                                                                    onChange={this.handleChangeReligion}
                                                                    options={this.state.religionAutocompleteList}
                                                                     defaultSelected={[this.state.religionId = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["religion"]]}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                EMAIL ADDRESS
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedEmailAddress"
                                                                    value={this.state.selectedEmailAddress}
                                                                    onChange={this.onChangeEmailAddress.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                FACEBOOK
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedFacebook"
                                                                    value={this.state.selectedFacebook}
                                                                    onChange={this.onChangeFacebook.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                TWITTER
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedTwitter"
                                                                    placeholder="Enter Twitter"
                                                                    value={this.state.selectedTwitter}
                                                                    onChange={this.onChangeTwitter.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                GENDER
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id='basic-example'
                                                                    onChange={this.handleChangeGender}
                                                                    options={this.state.genderAutocompleteList}
                                                                    placeholder="GENDER"
                                                                     defaultSelected={[this.state.selectedGender = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["gender"]]}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                CIVIL STATUS
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id='basic-example'
                                                                    onChange={this.handleChangeCivilStatus}
                                                                    options={this.state.civilStatusAutocompleteList}
                                                                    placeholder="CIVIL STATUS"
                                                                     defaultSelected={[this.state.selectedCivilStatus = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["civilStatus"]]}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                SSS
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedSSSNumber"
                                                                    value={this.state.selectedSSSNumber}
                                                                    onChange={this.onChangeSSSNumber.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                TIN
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedTinNumber"
                                                                    value={this.state.selectedTinNumber}
                                                                    onChange={this.onChangeTinNumber.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                PHIC
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedPhicNumber"
                                                                    value={this.state.selectedPhicNumber}
                                                                    onChange={this.onChangePhicNumber.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                PAG-IBIG
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedHdmfNumber"
                                                                    value={this.state.selectedHdmfNumber}
                                                                    onChange={this.onChangeHdmfNumber.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                LIVING ARRANGEMENT
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id="basic-example"
                                                                    onChange={this.handleCoverLivingArrangement}
                                                                    options={this.state.livingArrangeAutocomplete}
                                                                    type="text" 
                                                                     defaultSelected={[this.state.livingArrangementId = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["livingArrangement"]]}
                                                                /> 
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                BLOOD TYPE
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Typeahead
                                                                    labelKey='name'
                                                                    id="basic-example"
                                                                    onChange={this.handleCoverBloodType}
                                                                    options={this.state.bloodTypeAutocomplete}
                                                                    type="text" 
                                                                     defaultSelected={[this.state.bloodTypeId = JSON.parse(sessionStorage.getItem("employeeProfileData")).employeeProfiles[0]["bloodType"]]}
                                                                /> 
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                HEIGHT
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedHeight"
                                                                    value={this.state.selectedHeight}
                                                                    onChange={this.onChangeHeight.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                WEIGHT
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedWeight"
                                                                    placeholder="Enter Weight"
                                                                    value={this.state.selectedWeight}
                                                                    onChange={this.onChangeWeight.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                HOBBIES
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedHobbies"
                                                                    value={this.state.selectedHobbies}
                                                                    onChange={this.onChangeHobbies.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                LANGUAGE SPOKEN
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedLanguageSpoken"
                                                                    placeholder="Enter Language Spoken"
                                                                    value={this.state.selectedLanguageSpoken}
                                                                    onChange={this.onChangeLanguageSpoken.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                EMERGENCY CONTACT NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedEmergencyContactName"
                                                                    value={this.state.selectedEmergencyContactName}
                                                                    onChange={this.onChangeEmergencyContactName.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                RELATIONSHIP
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedRelationship"
                                                                    value={this.state.selectedRelationship}
                                                                    onChange={this.onChangeRelationship.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                CONTACT NUMBER
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedEmergencyContactNumber"
                                                                    value={this.state.selectedEmergencyContactNumber}
                                                                    onChange={this.onChangeContactNumber.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                USER FULL NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedUserFullName"
                                                                    value={this.state.selectedUserFullName}
                                                                    onChange={this.onChangeUserFullName.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                MANAGER NAME
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    type="text" 
                                                                    autoComplete="off" 
                                                                    name="selectedManagerName"
                                                                    value={this.state.selectedManagerName}
                                                                    onChange={this.onChangeManagerName.bind(this)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                            <div>
                                                                <Form.Row className="mt-5">
                                                                    <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                                                        <Button style={{minWidth:'60px'}}  variant="success" onClick={this.addAddress}>Add Row</Button>
                                                                    </Form.Group>
                                                                </Form.Row>
                                                                <Card.Header>Address</Card.Header>
                                                                 <BootstrapTable
                                                                    rowClasses="noser-table-row-class"
                                                                    striped
                                                                    hover
                                                                    condensed
                                                                    pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                    keyField = "id"
                                                                    data = { this.state.addressListGrid }
                                                                    columns = { addressColumn}
                                                                    selectRow = { addressSelectRow }
                                                                    cellEdit = { cellEditFactory({
                                                                    mode: 'dbclick',
                                                                    blurToSave: true,
                                                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                                                        this.AddressGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                        }
                                                                    })
                                                                        }
                                                                    rowEvents={ addressRowEvents }

                                                                /> 
                                                            </div>

                                                            <div>
                                                                <Card.Header  className="mt-5">Company Relative</Card.Header>
                                                                 <BootstrapTable
                                                                    rowClasses="noser-table-row-class"
                                                                    striped
                                                                    hover
                                                                    condensed
                                                                    pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                    keyField = "id"
                                                                    data = { this.state.relativeListGrid }
                                                                    columns = { relativeColumn}
                                                                    selectRow = { relativeSelectRow }
                                                                    cellEdit = { 
                                                                        cellEditFactory({
                                                                            mode: 'dbclick',
                                                                            blurToSave: true,
                                                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                                                this.CompanyRelativeGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                            }
                                                                        })
                                                                    }
                                                                    rowEvents={ relativeRowEvents }

                                                                /> 
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>

                                        <Tab eventKey="family" title="II. FAMILY BACKGROUND">
                                            <Form.Row>
                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                    <Card className="card-tab-no-border">
                                                        <Card.Body>
                                                            <BootstrapTable
                                                                rowClasses="noser-table-row-class"
                                                                striped
                                                                hover
                                                                condensed
                                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                                                keyField = "id"
                                                                data = { this.state.backgroundListGrid }
                                                                columns = { backgroundColumn}
                                                                selectRow = { backgroundSelectRow }
                                                                cellEdit = { cellEditFactory({
                                                                mode: 'dbclick',
                                                                blurToSave: true,
                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                    this.FamilyGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                    }
                                                                })
                                                                    }
                                                                rowEvents={ backgroundRowEvents }

                                                            />
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>

                                        <Tab eventKey="education" title="III. EDUCATION">
                                            <Form.Row>
                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                    <Card className="card-tab-no-border">
                                                        <Card.Body>
                                                            <Card.Header  className="mt-5">Education</Card.Header>
                                                            <BootstrapTable
                                                                rowClasses="noser-table-row-class"
                                                                striped
                                                                hover
                                                                condensed
                                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                                                keyField = "id"
                                                                data = { this.state.educationListGrid }
                                                                columns = { educationColumn}
                                                                selectRow = { educationSelectRow }
                                                                cellEdit = { cellEditFactory({
                                                                mode: 'dbclick',
                                                                blurToSave: true,
                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                    this.EducationGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                    }
                                                                })
                                                                    }
                                                                rowEvents={ educationRowEvents }

                                                            /> 
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>

                                        <Tab eventKey="application" title="IV. APPLICATION RECORD">
                                            <Form.Row>
                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                    <Card className="card-tab-no-border">
                                                        <Card.Body>
                                                            <Card.Header  className="mt-5">Application Record</Card.Header>
                                                            <BootstrapTable
                                                                rowClasses="noser-table-row-class"
                                                                striped
                                                                hover
                                                                condensed
                                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                                                keyField = "id"
                                                                data = { this.state.applicationListGrid }
                                                                columns = { applicationColumn}
                                                                selectRow = { applicationSelectRow }
                                                                cellEdit = { cellEditFactory({
                                                                mode: 'dbclick',
                                                                blurToSave: true,
                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                    this.ApplicationGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                    }
                                                                })
                                                                    }
                                                                rowEvents={ applicationRowEvents }

                                                            /> 
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>
                                        
                                        <Tab eventKey="employment" title="V. EMPLOYMENT RECORD">
                                            <Form.Row>
                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                    <Card className="card-tab-no-border">
                                                        <Card.Body>
                                                            <Card.Header  className="mt-5">Employment Record</Card.Header>
                                                            <BootstrapTable
                                                                rowClasses="noser-table-row-class"
                                                                striped
                                                                hover
                                                                condensed
                                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                                                keyField = "id"
                                                                data = { this.state.employmentListGrid }
                                                                columns = { employmentColumn}
                                                                selectRow = { employmentSelectRow }
                                                                cellEdit = { cellEditFactory({
                                                                mode: 'dbclick',
                                                                blurToSave: true,
                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                    this.EmploymentGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                    }
                                                                })
                                                                    }
                                                                rowEvents={ employmentRowEvents }

                                                            /> 
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>

                                        <Tab eventKey="documents" title="VI. DOCUMENTS">
                                            <Form.Row>
                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                    <Card className="card-tab-no-border">
                                                        <Card.Body>
                                                            {/* <Card.Header  className="mt-5">Education</Card.Header>
                                                            <BootstrapTable
                                                                rowClasses="noser-table-row-class"
                                                                striped
                                                                hover
                                                                condensed
                                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                                                keyField = "id"
                                                                data = { this.state.documentsListGrid }
                                                                columns = { documentsColumn}
                                                                selectRow = { documentsSelectRow }
                                                                cellEdit = { cellEditFactory({
                                                                mode: 'dbclick',
                                                                blurToSave: true,
                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                    this.DocumentsGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                    }
                                                                })
                                                                    }
                                                                rowEvents={ documentsRowEvents }

                                                            />  */}
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>

                                        <Tab eventKey="trainings" title="VII. TRAININGS ATTENDED">
                                            <Form.Row>
                                                <Form.Group controlId="formGridPassword" as={Col}>
                                                    <Card className="card-tab-no-border">
                                                        <Card.Body>
                                                            <Card.Header  className="mt-5">Education</Card.Header>
                                                            <BootstrapTable
                                                                rowClasses="noser-table-row-class"
                                                                striped
                                                                hover
                                                                condensed
                                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                                noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                                                keyField = "id"
                                                                data = { this.state.trainingsListGrid }
                                                                columns = { trainingsColumn}
                                                                selectRow = { trainingsSelectRow }
                                                                cellEdit = { cellEditFactory({
                                                                mode: 'dbclick',
                                                                blurToSave: true,
                                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                                    this.TrainingsGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                                    }
                                                                })
                                                                    }
                                                                rowEvents={ trainingsRowEvents }

                                                            /> 
                                                        </Card.Body>
                                                    </Card>
                                                </Form.Group>
                                            </Form.Row>
                                        </Tab>
                                    </Tabs>
                                    
                                    <ButtonToolbar className="mt-3">
                                            <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            {/* <Button variant="success" onClick={this.handleSubmitClick}>
                                                Submit
                                            </Button>&nbsp;&nbsp; */}
                                            <Button variant="danger" href="/profile">
                                                Back
                                            </Button>
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

export  default ProfileEdit;