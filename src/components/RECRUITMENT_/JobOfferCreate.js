import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Redirect
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class JobOfferCreate extends Component {
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

            clientAutocomplete	            :   [],
            memberNameAutocomplete	        :   [],
            positionAutocomplete	        :   [],
            locationAutocomplete            :   [],
            isDefaultBranch	                :   false,
            employeeStatusTypeAutocomplete	:   [],
            salaryOffered                   :   "",
            dateHired                       :   new Date(),
            contractDataStart               :   new Date(),
            contractDataEnd                 :   new Date(),
            payTypeAutocomplete             :   [],
            payModesAutocomplete            :   [],
            payCardTypesAutocomplete        :   [],
            payCardNumber                   :   "",
            tmnProfileIdAutocomplete        :   [],
            ecola                           :   "",
            sea                             :   "",
            cola                            :   "",
            taxExemptionAutocomplete        :   [],
            taxTypeAutocomplete             :   [],
            isBasisPay	                    :   false,
            taxCodeAutocomplete             :   [],
            basisSSSAutocomplete            :   [],
            basisHDMFAutocomplete           :   [],
            basisPHICAutocomplete           :   [],
            workingDaysPerMonth             :   "",
            workingDaysPerYear              :   "",
            preparedByAutocomplete          :   [],
            notedByAutocomplete             :   [],
            approvedByAutocomplete          :   [],
            basisFor13thMonthAutocomplete   :   [],
        }

    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.getPositionName();
        this.getEmployeePayTypesList();
        this.getEmployeePayModesList();
        this.getPayCardTypes();
        this.getTaxType();
        this.getTaxTemptation();
        this.getDeduction();
        this.getBasisFor13Month();
        this.getEmployeeStatusList();

            this.state.selectedClient           =   this.props.location.params.data.client
            this.state.selectedClientId         =   this.props.location.params.data.clientId
            this.state.selectedFullName         =   this.props.location.params.data.memberName
            this.state.selectedFullNameId       =   this.props.location.params.data.id
            this.state.selectedPositionApplied  =   this.props.location.params.data.position
            this.state.selectedPositionId       =   this.props.location.params.data.positionId
            this.state.currentAddress           =   this.props.location.params.data.applicantAddresses[0].houseNumber + " " + this.props.location.params.data.applicantAddresses[0].streetName+ " " + this.props.location.params.data.applicantAddresses[0].barangay + " " + this.props.location.params.data.applicantAddresses[0].city + " " + this.props.location.params.data.applicantAddresses[0].province
       
        
        //console.log("this.props.location.params")
        //console.log()
        this.getAssessedBy()
        this.getClientLocation()
        /* this.getCoorlist(); */
        this.getApplicationForm();
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
                //console.log("GetClientList")
                //console.log(data)
                this.setState({
                clientAutocomplete  :   data.clients, 
                    isloading        :   false
                })
            })
    }

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            this.state.selectedClient   =   null
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedClient   =   e[0].name
        this.getClientLocation()
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

        ////////////console.log("Start Get Params")
        ////////////console.log(getParams)
        ////////////console.log("End Get Params")

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms", getParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("Start Get Application Form")
                ////console.log(data)
                ////console.log("End Get Application Form")
                sleep(5000).then(() => {
                    this.setState({
                        memberNameAutocomplete  :   data.applicationForms,
                        isloading	            :   false
                    })
                })
                /* let addressData = []
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
                } */
            })
    }

    onChangeMemberNameList = (e) => {
        if(e.length == 0) {
            this.state.selectedApplicationId	=   ""
            this.state.selectedConforme	        =   ""
            return
        }

        this.setState({selectedConforme : e[0].memberName})
        this.state.selectedApplicationId	=   e[0].id
        /* this.state.selectedConforme	        =   e[0].memberName */
        ////console.log(this.state.selectedConforme)
 
    }

    onChangeConforme(e){
        this.setState({selectedConforme : e.target.value})
        ////console.log(e.target.value)
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
            ////////////console.log("Get Position Name");
            ////////////console.log(data);
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

    getClientLocation(){
        this.setState({isloading:true})

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClient,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClient,
            "City": "",
            "Province": "",
            "Region": ""
    
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
        .then(res => {
            const data = res.data;
            ////////////console.log("Client Location");
            ////////////console.log(data);
            this.setState({
                locationAutocomplete	:   res.data.locations ? res.data.locations : [],
                isloading	            :   false
            })
            /* if(data.locations.length=="0"){
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
    }

    onChangeLocation = (e) => {
        if(e.length == 0) {
            this.state.selectedLocationId     =   ""
            return
        }
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId= e[0].id
        this.setState({
            isshow:false,
        })
 
    }

    handleChangeCheckboxDefaultBranch = (e) => {
        this.setState({
            isDefaultBranch	: e.target.checked
        })
    }

    onChangeSalaryOffered = (e) => {
        this.setState({
            salaryOffered	:   e.target.value
        })
    }

    handleChangeContractDateStart = date => {
        this.setState({
            contractDataStart	:   date,
            isshow:false,
        });
    };

    handleChangeContractDateEnd = date => {
        this.setState({
            contractDataEnd     :   date,
            isshow:false,
        });
    };

    getEmployeePayTypesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollTypes", getParams)
            .then(res => {
                const data = res.data;
                ////////console.log("Get Pay Type");
                ////////console.log(data);
                this.setState({
                    payTypeAutocomplete : data.payrollTypes
                })
            })
    
    }

    onChangeEmployeesPayTypes = (e) => {
        if(e.length == 0) {
            this.state.selectedPayTypeId     =   ""
            return
        }
        this.state.selectedPayTypeId= e[0].id
        this.setState({
            isshow:false,
        })
 
    }

    getEmployeePayModesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollModes", getParams)
            .then(res => {
                const data = res.data;
                ////////console.log("Get Pay Mode");
                ////////console.log(data);
                this.setState({
                    payModesAutocomplete : data.payrollModes
                })
            })
    
    }

    onChangeEmployeesPayModes = (e) => {
        if(e.length == 0) {
            this.state.selectedPayModeId     =   ""
            return
        }
        this.state.selectedPayModeId= e[0].id
        this.setState({
            isshow:false,
        })
 
    }

    getPayCardTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPayCardTypes", getParams)
        .then(res => {
            const data = res.data
            ////////console.log("Get Pay Card Type");
            ////////console.log(data);
            this.setState(
                {
                    isloading:false,
                    payCardTypesAutocomplete : data.payCardTypes ? data.payCardTypes : []
                });
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    onChangePayCardType = (e) => {
        if(e.length == 0) {
            this.state.selectedPayCartTypeId     =   ""
            return
        }
        this.state.selectedPayCartTypeId= e[0].id
        this.setState({
            isshow:false,
        })
 
    }

    onChangePayCardNumber = (e) => {
        this.setState({
            payCardNumber	:   e.target.value,
            isshow:false,
        })
    }

    onChangeECOLA = (e) => {
        this.setState({
            ecola	:   e.target.value,
            isshow:false,
        })
    }

    onChangeSEA = (e) => {
        this.setState({
            sea	:   e.target.value,
            isshow:false,
        })
    }

    onChangeCOLA = (e) => {
        this.setState({
            cola	:   e.target.value,
            isshow:false,
        })
    }

    handleChangeCheckboxBasicPay = (e) => {
        this.setState({
            isBasisPay	: e.target.checked
        })
    }

    onChangeWorkingDaysPerMonth = (e) => {
        this.setState({
            workingDaysPerMonth	:   e.target.value,
            isshow:false,
        })
    }

    onChangeWorkingDaysPerYear = (e) => {
        this.setState({
            workingDaysPerYear	:   e.target.value,
            isshow:false,
        })
    }

    getTaxType() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0012"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //////////console.log("Get Tax Type");
            //////////console.log(data);
            this.setState({ taxTypeAutocomplete  : data.dataReferences });
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

    onChangeTaxType = (e) => {

        if(e.length == 0) {
            this.state.selectedTaxTypeId	=   ""
            return
        }
        this.state.selectedTaxTypeId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    getTaxTemptation() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0013"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //////////console.log("Get Tax Temptation");
            //////////console.log(data);
            this.setState({ taxExemptionAutocomplete  : data.dataReferences });
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

    onChangeTaxExemption = (e) => {

        if(e.length == 0) {
            this.state.selectedTaxExemptionId	=   ""
            return
        }
        this.state.selectedTaxExemptionId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    getDeduction() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0016"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //////console.log("Get Deduction");
            //////console.log(data);
            this.setState({
                basisSSSAutocomplete  : data.dataReferences,
                basisHDMFAutocomplete : data.dataReferences,
                basisPHICAutocomplete : data.dataReferences,
            });
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

    onChangeBasisSSS = (e) => {
        if(e.length == 0) {
            this.state.selectedBasisSSS	=   ""
            return
        }
        this.state.selectedBasisSSS	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    onChangeBasisHDMF = (e) => {
        if(e.length == 0) {
            this.state.selectedBasisHDMF	=   ""
            return
        }
        this.state.selectedBasisHDMF	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    onChangeBasisPHIC = (e) => {
        if(e.length == 0) {
            this.state.selectedBasisPHIC	=   ""
            return
        }
        this.state.selectedBasisPHIC	    =   e[0].id
        this.setState({
            isshow:false,
        })
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
            //////console.log("Coordinator List Autocomplete");
            //////console.log(data);
            this.setState({
                preparedByAutocomplete  : data.employees,
                notedByAutocomplete     : data.employees,
                approvedByAutocomplete  : data.employees,
                isloading:false
            }) 
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

    onChangePreparedBy = (e) => {

        if(e.length == 0) {
            this.state.selectedPreparedById	=   ""
            return
        }
        this.state.selectedPreparedById	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    onChangeNotedBy = (e) => {

        if(e.length == 0) {
            this.state.selectedNotedById	=   ""
            return
        }
        this.state.selectedNotedById	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    onChangeApprovedBy = (e) => {

        if(e.length == 0) {
            this.state.selectedApprovedById	=   ""
            return
        }
        this.state.selectedApprovedById	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    getBasisFor13Month() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0017"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //////console.log("Get Status Type");
            //////console.log(data);
            this.setState({
                basisFor13thMonthAutocomplete  : data.dataReferences,
            });
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

    onChangeBasisFor13thMonth = (e) => {
        if(e.length == 0) {
            this.state.selectedBasisFor13thMonthId	=   ""
            return
        }
        this.state.selectedBasisFor13thMonthId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    handleSaveClick = event => {
        let dateHired = moment(this.state.dateHired).format('MM/DD/YYYY');
        let contractDataStart = moment(this.state.contractDataStart).format('MM/DD/YYYY');
	    let contractDataEnd = moment(this.state.contractDataEnd).format('MM/DD/YYYY');
        this.setState({isloading:true})

        const saveParams = {
            "IpAddress"             :   "0.0.0.0",
            "ClientId"              :   this.state.selectedClientId,
            "UserId"                :   this.state.userinfo.userId,
            "ApplicationFormId"     :   this.state.selectedFullNameId,
            "LocationId"            :   this.state.selectedLocationId,
            "IsDefaultLocation"     :   (this.state.isDefaultBranch)? "1" : "0",
            "PositionId"            :   this.state.selectedPositionId,
            "SalaryOffered"         :   this.state.salaryOffered,
            "DateHired"             :   dateHired,
            "ContractDateStart"     :   contractDataStart,
            "ContractDateEnd"       :   contractDataEnd,
            "PayTypeId"             :   this.state.selectedPayTypeId,
            "PayModeId"             :   this.state.selectedPayModeId,
            "EcolaValue"            :   this.state.ecola,
            "SeaValue"              :   this.state.sea,
            "ColaValue"             :   this.state.cola,
            "TaxExemptionTypeId"    :   this.state.selectedTaxExemptionId,
            "TaxTypeId"             :   this.state.selectedTaxTypeId,
            "TaxCodeId"             :   "0",
            "IsOBP"                 :   (this.state.isBasisPay)? "1" : "0",
            "WorkingDaysPerMonth"   :   this.state.workingDaysPerMonth,
            "WorkingDaysPerYear"    :   this.state.workingDaysPerYear,
            "DeductionBasisSSS"     :   this.state.selectedBasisSSS,
            "DeductionBasisHDMF"    :   this.state.selectedBasisHDMF,
            "DeductionBasisPHIC"    :   this.state.selectedBasisPHIC,
            "BasisFor13thMonth"     :   this.state.selectedBasisFor13thMonthId,
            "EmployeeStatusTypeId"  :   this.state.selectedEmployeeStatusId,
            "PayCardTypeId"         :   this.state.selectedPayCartTypeId,
            "PayCardNumber"         :   this.state.payCardNumber,
            "TMNProfileId"          :   "N/A",
            "PreparedBy"            :   this.state.userinfo.userId,
            "NotedBy"               :   this.state.selectedNotedById,
            "ApprovedBy"            :   this.state.selectedApprovedById,
            "Conforme"              :   this.state.selectedConforme,
            "StatusId"              :   "1",
        };

        ////console.log("Save Params")
        ////console.log(saveParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddJobOffer",  saveParams
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
                        fade        :   true,
                        navigate    : true,
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

    handleSubmitClick = event => {

        if(!this.state.selectedLocationId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select branch",
                fade:true
            });
            return
        }

        if(!this.state.selectedEmployeeStatusId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select employee status type",
                fade:true
            });
            return
        }

        if(this.state.salaryOffered == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter salary offered",
                fade:true
            });
            return
        }

        if(this.state.dateHired == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter date hired",
                fade:true
            });
            return
        }

        if(this.state.contractDataStart == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter contract date start",
                fade:true
            });
            return
        }

        if(this.state.contractDataEnd == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter contract date end",
                fade:true
            });
            return
        }


        if(!this.state.selectedPayTypeId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select pay type",
                fade:true
            });
            return
        }


        if(!this.state.selectedPayModeId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select pay mode",
                fade:true
            });
            return
        }

        if(!this.state.selectedPayCartTypeId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select pay card type",
                fade:true
            });
            return
        }

        if(this.state.payCardNumber == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter pay card number",
                fade:true
            });
            return
        }

        if(this.state.ecola == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter ecola",
                fade:true
            });
            return
        }

        if(this.state.sea == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter sea",
                fade:true
            });
            return
        }

        if(this.state.cola == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter cola",
                fade:true
            });
            return
        }

        if(!this.state.selectedTaxExemptionId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select tax exemption",
                fade:true
            });
            return
        }

        if(!this.state.selectedTaxTypeId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select tax type",
                fade:true
            });
            return
        }

        if(!this.state.selectedBasisSSS){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select deduction basis sss",
                fade:true
            });
            return
        }

        if(!this.state.selectedBasisHDMF){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select deduction basis hdmf",
                fade:true
            });
            return
        }

        if(!this.state.selectedBasisPHIC){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select deduction basis phic",
                fade:true
            });
            return
        }

        if(!this.state.selectedBasisFor13thMonthId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select basis for 13th month",
                fade:true
            });
            return
        }

        if(this.state.workingDaysPerMonth == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter working days per month",
                fade:true
            });
            return
        }

        if(this.state.workingDaysPerYear == ""){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please enter working days per year",
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

        if(!this.state.selectedApprovedById){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select approved by",
                fade:true
            });
            return
        }

        let dateHired = moment(this.state.dateHired).format('MM/DD/YYYY');
        let contractDataStart = moment(this.state.contractDataStart).format('MM/DD/YYYY');
	    let contractDataEnd = moment(this.state.contractDataEnd).format('MM/DD/YYYY');
        this.setState({isloading:true})

        const submitParams = {
            "IpAddress"             :   "0.0.0.0",
            "ClientId"              :   this.state.selectedClientId,
            "UserId"                :   this.state.userinfo.userId,
            "ApplicationFormId"     :   this.state.selectedFullNameId,
            "LocationId"            :   this.state.selectedLocationId,
            "IsDefaultLocation"     :   (this.state.isDefaultBranch)? "1" : "0",
            "PositionId"            :   this.state.selectedPositionId,
            "SalaryOffered"         :   this.state.salaryOffered,
            "DateHired"             :   dateHired,
            "ContractDateStart"     :   contractDataStart,
            "ContractDateEnd"       :   contractDataEnd,
            "PayTypeId"             :   this.state.selectedPayTypeId,
            "PayModeId"             :   this.state.selectedPayModeId,
            "EcolaValue"            :   this.state.ecola,
            "SeaValue"              :   this.state.sea,
            "ColaValue"             :   this.state.cola,
            "TaxExemptionTypeId"    :   this.state.selectedTaxExemptionId,
            "TaxTypeId"             :   this.state.selectedTaxTypeId,
            "TaxCodeId"             :   "0",
            "IsOBP"                 :   (this.state.isBasisPay)? "1" : "0",
            "WorkingDaysPerMonth"   :   this.state.workingDaysPerMonth,
            "WorkingDaysPerYear"    :   this.state.workingDaysPerYear,
            "DeductionBasisSSS"     :   this.state.selectedBasisSSS,
            "DeductionBasisHDMF"    :   this.state.selectedBasisHDMF,
            "DeductionBasisPHIC"    :   this.state.selectedBasisPHIC,
            "BasisFor13thMonth"     :   this.state.selectedBasisFor13thMonthId,
            "EmployeeStatusTypeId"  :   this.state.selectedEmployeeStatusId,
            "PayCardTypeId"         :   this.state.selectedPayCartTypeId,
            "PayCardNumber"         :   this.state.payCardNumber,
            "TMNProfileId"          :   "N/A",
            "PreparedBy"            :   this.state.userinfo.userId,
            "NotedBy"               :   this.state.selectedNotedById,
            "ApprovedBy"            :   this.state.selectedApprovedById,
            "Conforme"              :   this.state.selectedConforme,
            "StatusId"              :   "8",
        };

        ////console.log("Submit Params")
        ////console.log(submitParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Recruitment/AddJobOffer",  submitParams
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

    getEmployeeStatusList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetEmployeeStatusTypes", getParams)
            .then(res => {
                ////console.log("Get Employee Status List ");
                ////console.log(res.data);
                this.setState({
                    employeeStatusTypeAutocomplete : res.data.statusTypes
                })
            })
    
    }

    onChangeEmployeeStatus = (e) => {
        if(e.length == 0) {
            this.state.selectedEmployeeStatusId	=   ""
            return
        }
        this.state.selectedEmployeeStatusId	    =   e[0].id
        this.setState({
            isshow:false,
        })
    }

    handleChangeDateHired = date => {
        ////console.log(date)
        this.setState({
            dateHired: date,
            isshow:false,
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
                            <Card.Header>RECRUITMENT >> JOB OFFER (CREATE)</Card.Header>
                            <Card.Body  className="mb-3">
                                <Form >
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedClient"
                                                value={this.state.selectedClient}
                                                
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
                                                
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        POSITION APPLIED
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="selectedPositionApplied"
                                                value={this.state.selectedPositionApplied}
                                                
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        BRANCH
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeLocation}
                                                options={this.state.locationAutocomplete}
                                                placeholder="Select Branch"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="5">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Is Default Branch" 
                                                onChange={e => this.handleChangeCheckboxDefaultBranch(e)}
                                                style={{fontWeight : "bold"}}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        EMPLOYEE STATUS TYPE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeeStatus}
                                                options={this.state.employeeStatusTypeAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        SALARY OFFERED
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="salaryOffered"
                                                name="salaryOffered"
                                                value={this.state.salaryOffered}
                                                onChange={this.onChangeSalaryOffered}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        DATE HIRED
                                        </Form.Label>
                                        <Col sm="2">
                                            <DatePicker
                                                ref='dateHired'
                                                selected={this.state.dateHired}
                                                onChange={this.handleChangeDateHired}
                                                minDate={this.minDate}
                                                value={this.props.dateHired}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        CONTRACT DATE START
                                        </Form.Label>
                                        <Col sm="3">
                                            <DatePicker
                                                ref='contractDataStart'
                                                selected={this.state.contractDataStart}
                                                onChange={this.handleChangeContractDateStart}
                                                minDate={this.minDate}
                                                value={this.props.contractDataStart}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        CONTRACT DATE END
                                        </Form.Label>
                                        <Col sm="3">
                                            <DatePicker
                                                ref='contractDataEnd'
                                                selected={this.state.contractDataEnd}
                                                onChange={this.handleChangeContractDateEnd}
                                                minDate={this.minDate}
                                                value={this.props.contractDataEnd}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        PAY TYPE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesPayTypes}
                                                options={this.state.payTypeAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        PAY MODE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesPayModes}
                                                options={this.state.payModesAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        PAY CARD TYPE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePayCardType}
                                                options={this.state.payCardTypesAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        PAY CARD NUMBER
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="payCardNumber"
                                                name="payCardNumber"
                                                value={this.state.payCardNumber}
                                                onChange={this.onChangePayCardNumber}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        TMN PROFILE ID
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTMNProfileID}
                                                options={this.state.tmnProfileIdAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        ECOLA
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="ecola"
                                                name="ecola"
                                                value={this.state.ecola}
                                                onChange={this.onChangeECOLA}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        SEA
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="sea"
                                                name="sea"
                                                value={this.state.sea}
                                                onChange={this.onChangeSEA}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        COLA
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="cola"
                                                name="cola"
                                                value={this.state.cola}
                                                onChange={this.onChangeCOLA}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        TAX EXEMPTION
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxExemption}
                                                options={this.state.taxExemptionAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        TAX TYPE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxType}
                                                options={this.state.taxTypeAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="5">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Is Optimized Basic Pay" 
                                                onChange={e => this.handleChangeCheckboxBasicPay(e)}
                                                style={{fontWeight : "bold"}}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        ALPHANUMERIC TAX CODE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxCode}
                                                options={this.state.taxCodeAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        DEDUCTION BASIS SSS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisSSS}
                                                options={this.state.basisSSSAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        DEDUCTION BASIS HDMF
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisHDMF}
                                                options={this.state.basisHDMFAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        DEDUCTION BASIS PHIC
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisPHIC}
                                                options={this.state.basisPHICAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        BASIS FOR 13th MONTH
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisFor13thMonth}
                                                options={this.state.basisFor13thMonthAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        WORKING DAYS PER MONTH
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="workingDaysPerMonth"
                                                name="workingDaysPerMonth"
                                                value={this.state.workingDaysPerMonth}
                                                onChange={this.onChangeWorkingDaysPerMonth}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        WORKING DAYS PER YEAR
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="workingDaysPerYear"
                                                name="workingDaysPerYear"
                                                value={this.state.workingDaysPerYear}
                                                onChange={this.onChangeWorkingDaysPerYear}
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
                                                value={this.state.userinfo.fullName}
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
                                                onChange={this.onChangeNotedBy}
                                                options={this.state.notedByAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        APPROVED BY
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeApprovedBy}
                                                options={this.state.approvedByAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        CONFORME
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Control 
                                                ref="conforme"
                                                name="conforme"
                                                value={this.state.selectedConforme}
                                                autoComplete="off"
                                                readOnly
                                                onChange={this.onChangeConforme.bind(this)}
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

export  default JobOfferCreate
