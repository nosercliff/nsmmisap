import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeFileEdit extends Component {
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
            
            statusAutocomplete          :   [],
            deactivationDate            :   new Date(),
            dateOfBirth                 :   new Date(),
            jobPositionAutocomplete     :   [],
            contractDateStart           :   new Date(),
            contractDateEnd             :   new Date(),
            salary 	                    :	"",
            payCardAutocomplete 	    :	[],
            payCardNumber 	            :	"",
            tmnProfileId 	            :	"",
            payTypeAutocomplete 	    :	[],
            payModeAutocomplete 	    :	[],
            ecola 	                    :	"",
            sea 	                    :	"",
            cola 	                    :	"",
            taxExemptionAutocomplete 	:	[],
            taxCodeAutocomplete         :   [],
            taxTypeAutocomplete 	    :	[],
            basisSSSAutocomplete 	    :	[],
            basisHDMFAutocomplete 	    :	[],
            basisPHICAutocomplete       :   [],
            basis13thMonthAutocomplete  :   [],
            /* statusAutocompleted         :   "", */
            isActive                    :   false,
            isDefaultBranch             :   false,
            basicPay                    :   false,
            getEmployeesTeamLeadList    :   [ { employeeName: "N/A" } ],
            employeeCoordinatorAutocomplete :   [],
            periodTypesId               :   [],
            sssAmount 	                :	"",
            phicAmount 	                :	"",
            hdmfAmount 	                :	"",
            workScheduleAutocomplete    :   [],
            taxWithHeldAutocomplete     :   [],
            workingDaysPerMonth         :   "",
            workingDaysPerYear          :   "",
            teamLeadData	            :   "",
            coordinatorName             :   "",
            selectedCoordinatorName     :   "",
        }

    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        /* this.setState({teamLeadData : "Cordero, Orleeh",}) */
        /* this.state.payTypeId = this.props.location.params.data.payTypeId
        this.state.payModeId = this.props.location.params.data.payModeId
        this.state.jobPositionId = this.props.location.params.data.jobPositionId
        this.state.clientId = this.props.location.params.data.clientId
        this.state.firstName = this.props.location.params.data.firstName
        this.state.middleName = this.props.location.params.data.middleName
        this.state.lastName = this.props.location.params.data.lastName
        this.state.employeeNumber = this.props.location.params.data.employeeNo
        this.state.client = this.props.location.params.data.clientName
        this.state.employeeId = this.props.location.params.data.id
        this.state.branch = this.props.location.params.data.locationName
        this.state.locationId = this.props.location.params.data.locationId
        this.state.phicAmount = this.props.location.params.data.phicAmount
        this.state.sssAmount = this.props.location.params.data.sssAmount
        this.state.hdmfAmount = this.props.location.params.data.hdmfAmount
        this.state.salary = this.props.location.params.data.salaryOffered
        this.state.payCardNumber = this.props.location.params.data.payCardNumber
        this.state.tmnProfileId = this.props.location.params.data.tmnProfileId
        this.state.sea = this.props.location.params.data.seaValue
        this.state.cola = this.props.location.params.data.colaValue
        this.state.ecola = this.props.location.params.data.ecolaValue
        this.state.workingDaysPerMonth = this.props.location.params.data.workingDaysPerMonth
        this.state.workingDaysPerYear = this.props.location.params.data.workingDaysPerYear */
        /* this.state.statusTypeFromRow = this.props.location.params.data.employeeStatusType */
        /* this.state.locationId = this.props.location.params.data.locationId */

        /* this.setState({
            firstName : this.props.location.params.data.firstName,
            middleName : this.props.location.params.data.middleName,
            lastName : this.props.location.params.data.lastName,
            employeeNumber : this.props.location.params.data.employeeNo,
            client : this.props.location.params.data.clientName,
            branch : this.props.location.params.data.locationName,
            locationId : this.props.location.params.data.locationId,
            employeeId : this.props.location.params.data.id,
        }) */
        //console.log("this.props.location.params.data.employeeStatusType")
        //console.log(this.props.location.params.data.employeeStatusType)
        this.getEmployeesTeamLead();
        this.GetPeriodTypes();
        this.getWorkSchedule();

        this.GetEmployeeStatusList();
        this.GetPosition();
        this.GetPayCardTypes();
        this.GetEmployeePayTypesList();
        this.GetEmployeePayModesList();
        this.GetTaxType();
        this.GetTaxExemption();
        this.GetTaxCode();
        this.GetTaxWithHeld();
        this.GetDeductionBasisSSS();
        this.GetDeductionBasisHDMF();
        this.GetDeductionBasisPHIC();
        this.Get13Month();


        this.getEmployeesCoordinator();

        /* this.Coor(); */
        
    }

    componentWillMount(){
        this.state.statusTypeFromRow = this.props.location.params.data.employeeStatusType
        this.state.payTypeId = this.props.location.params.data.payTypeId
        this.state.payModeId = this.props.location.params.data.payModeId
        this.state.jobPositionId = this.props.location.params.data.jobPositionId
        this.state.clientId = this.props.location.params.data.clientId
        this.state.firstName = this.props.location.params.data.firstName
        this.state.middleName = this.props.location.params.data.middleName
        this.state.lastName = this.props.location.params.data.lastName
        this.state.employeeNumber = this.props.location.params.data.employeeNo
        this.state.client = this.props.location.params.data.clientName
        this.state.employeeId = this.props.location.params.data.id
        this.state.branch = this.props.location.params.data.locationName
        this.state.locationId = this.props.location.params.data.locationId
        this.state.phicAmount = this.props.location.params.data.phicAmount
        this.state.sssAmount = this.props.location.params.data.sssAmount
        this.state.hdmfAmount = this.props.location.params.data.hdmfAmount
        this.state.salary = this.props.location.params.data.salaryOffered
        this.state.payCardNumber = this.props.location.params.data.payCardNumber
        this.state.tmnProfileId = this.props.location.params.data.tmnProfileId
        this.state.sea = this.props.location.params.data.seaValue
        this.state.cola = this.props.location.params.data.colaValue
        this.state.ecola = this.props.location.params.data.ecolaValue
        this.state.workingDaysPerMonth = this.props.location.params.data.workingDaysPerMonth
        this.state.workingDaysPerYear = this.props.location.params.data.workingDaysPerYear
        
    }
    

    getEmployeesCoordinator(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetCoorEmployees", getParams)
        .then(res => {
            console.log("Coordinator List Autocomplete");
            console.log(res.data);
            const data = res.data
            this.setState({
                employeeCoordinatorAutocomplete     :   data.employees,
                isloading	                        :   false,
                selectedCoordinatorName                     :   data.employees.find(x=>x.id==this.props.location.params.data.approverId2).employeeName
            }) 
            if(data.status=="1"){
                this.setState({
                    employeeCoordinatorAutocomplete     :   data.employees,
                    isloading	                        :   false,
                    selectedCoordinatorName                     :   data.employees.find(x=>x.id==this.props.location.params.data.approverId2).employeeName
                }) 
            }
            else {
                this.setState({employeeCoordinatorAutocomplete : [],isloading:false}) 
            }
            this.state.selectedCoordinatorName = data.employees.find(x=>x.id==this.props.location.params.data.approverId2).employeeName
            
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

    /* Coor(){
        for (let i = 0; i < this.state.employeeCoordinatorAutocomplete.length; i++) {

            console.log("Inside if");
            console.log(this.state.employeeCoordinatorAutocomplete[i]['employeeName'])
            
        } 
    } */

    GetEmployeeCoordinator(id) {
        ////////console.log("Coordinator ID List ");
        let GetEmployeeCoordinatorId = ''
        for (let i = 0; i <= this.state.employeeCoordinatorAutocomplete.length; i++) {
            if (this.state.employeeCoordinatorAutocomplete[i]["id"] === id) {
                GetEmployeeCoordinatorId = this.state.employeeCoordinatorAutocomplete[i]['id']; 
                ////////console.log(GetEmployeeCoordinatorId);
                break;
            }
        }
        return GetEmployeeCoordinatorId
    }
    
    onChangeEmployeesCoordinatorList = (e) => {
        if(e.length === "") {
            this.setState({
                employeeCoordinatorAutocomplete : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedEmployeeCoordinatorId = this.GetEmployeeCoordinator(e[0].id)
                ////////console.log("Get Coordinator Id", this.state.selectedEmployeeCoordinatorId)
            }
        }
    }

    GetEmployeeStatusList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetEmployeeStatusTypes", getParams)
            .then(res => {
                const data = res.data
                //console.log("Get Employee Status List ");
                //console.log(data);
                this.setState({
                    statusAutocomplete : res.data.statusTypes
                })
                /* let statusAutocompleted = "" */
                
                
            })
    
    }

    onChangeEmployeesStatusList= (e) => {
        if(e.length > 0) {
            this.state.statusId = e[0].id
        }else{
            this.state.statusId = ""
        }
        //console.log(this.state.statusId)
    }

    GetPosition() {
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
            //////console.log("Get Position Name");
            //////console.log(data);
            this.setState({ jobPositionAutocomplete  : data.positions });
         })
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
            //////console.log("Get Pay Card Types List Data")
            //////console.log(res.data)
            const data = res.data
            this.setState(
                {
                    isloading:false,
                    payCardAutocomplete : data.payCardTypes ? data.payCardTypes : []
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

    GetEmployeePayTypesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollTypes", getParams)
            .then(res => {
                //////console.log("Get Employee Payroll Types List ");
                //////console.log(res.data);
                this.setState({
                    payTypeAutocomplete : res.data.payrollTypes
                })
            })
    
    }

    GetEmployeePayModesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollModes", getParams)
            .then(res => {
                //////console.log("Get Employee Payroll Modes List ");
                //////console.log(res.data);
                this.setState({
                    payModeAutocomplete : res.data.payrollModes
                })
            })
    
    }

    onChangeDateDeactivation = date => {
        this.setState({
            deactivationDate: date
        });
    };

    onChangeDateOfBirth = date => {
        this.setState({
            dateOfBirth: date
        });
    };

    handleChangeCheckbox(e) {
        /* let isCheckedIsBasicSalary = e.target.checked ? "1" : "0";
        //////console.log(isCheckedIsBasicSalary) */
        this.setState({[e.target.name]: e.target.checked})
    }

    onChangeContractDateStart = date => {
        this.setState({
            contractDateStart: date
        });
    };

    onChangeContractDateEnd = date => {
        this.setState({
            contractDateEnd: date
        });
    };

    onChangeSalary(e) {
        this.setState({salary : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeFirstName(e) {
        this.setState({firstName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeMiddleName(e) {
        this.setState({middleName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeLastName(e) {
        this.setState({lastName : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeIsActiveCheckBox(e) {
        this.setState({/* [e.target.name]: e.target.checked,  */isActive: true,})
    }

    onChangeEmployeeNumber(e) {
        this.setState({employeeNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeJobPositionList= (e) => {
        if(e.length == 0) {
            this.state.jobPositionId     =   ""
            return
        }
        this.state.jobPositionId     =   e[0].id

    }

    onChangeClient(e) {
        this.setState({client : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeBranch(e) {
        this.setState({branch : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeIsDefaultBranchCheckBox(e) {
        /* let isCheckedIsBasicSalary = e.target.checked ? "1" : "0";
        //////console.log(isCheckedIsBasicSalary) */
        this.setState({/* [e.target.name]: e.target.checked */isDefaultBranch: true,})
    }

    onChangeMembershipDate(e) {
        this.setState({membershipDate : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeTenure(e) {
        this.setState({tenure : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangePayCardTypeList= (e) => {
        if(e.length > 0) {
            this.state.payCardTypeId = e[0].id
        }else{
            this.state.payCardTypeId = ""
        }
    }

    onChangePayCardNumber(e) {
        this.setState({payCardNumber : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangeTmnProfileId(e) {
        this.setState({tmnProfileId : e.target.value})
        ////////console.log(e.target.value)
    }

    onChangePayTypeList = (e) => {
        if(e.length == 0) {
            this.state.payTypeId     =   ""
            return
        }
        this.state.payTypeId     =   e[0].id
    }

    onChangePayModeList= (e) => {
        if(e.length > 0) {
            this.state.payModeId = e[0].id
        }else{
            this.state.payModeId = ""
        }
        this.GetPeriodTypes()
    }

    IsDecimal(val)
    {
        var regexp = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
        return !regexp.test(val)
    }

    onChangeEcola(e) {
        
        if(e.target.value.length>0){if(this.IsDecimal(e.target.value)) return}
        this.setState({ ecola: e.target.value} );
        ////////console.log(e.target.value)
    }

    onChangeSea(e) {
        
        if(e.target.value.length>0){if(this.IsDecimal(e.target.value)) return}
        this.setState({ sea: e.target.value} );
        ////////console.log(e.target.value)
    }

    onChangeola(e) {
        
        if(e.target.value.length>0){if(this.IsDecimal(e.target.value)) return}
        this.setState({ cola: e.target.value} );
        ////////console.log(e.target.value)
    }

    onChangeTaxExemptionList= (e) => {
        if(e.length > 0) {
            this.state.taxExemptionId = e[0].id
        }else{
            this.state.taxExemptionId = ""
        }
    }

    onChangeTaxCodeList= (e) => {
        if(e.length > 0) {
            this.state.taxCodeId = e[0].id
        }else{
            this.state.taxCodeId = ""
        }
    }

    onChangeTaxWithHeldList= (e) => {
        if(e.length > 0) {
            this.state.taxWithHeldId = e[0].id
        }else{
            this.state.taxWithHeldId = ""
        }
    }

    onChangeTaxTypeList= (e) => {
        if(e.length > 0) {
            this.state.taxTypeId = e[0].id
        }else{
            this.state.taxTypeId = ""
        }
    }

    onChangeBasicPayCheckBox(e) {
        /* let isCheckedIsBasicSalary = e.target.checked ? "1" : "0";
        //////console.log(isCheckedIsBasicSalary) */
        this.setState({/* [e.target.name]: e.target.checked} */basicPay: true,})
    }

    onChangeBasisSSSList= (e) => {
        if(e.length > 0) {
            this.state.basisSSSId = e[0].id
        }else{
            this.state.basisSSSId = ""
        }
    }

    onChangeBasisHDMFList= (e) => {
        if(e.length > 0) {
            this.state.basisHDMFId = e[0].id
        }else{
            this.state.basisHDMFId = ""
        }
    }

    onChangeBasisPHICList= (e) => {
        if(e.length > 0) {
            this.state.basisPHICId = e[0].id
        }else{
            this.state.basisPHICId = ""
        }
    }

    onChangeBasis13thMonthList= (e) => {
        if(e.length > 0) {
            this.state.basis13thMonthId = e[0].id
        }else{
            this.state.basis13thMonthId = ""
        }
    }

    onChangeSSSAmount(e) {
           this.setState({sssAmount : e.target.value})
           ////////console.log(e.target.value)
       }
   
    onChangePHICAmount(e) {
           this.setState({phicAmount : e.target.value})
           ////////console.log(e.target.value)
       }
   
    onChangeHDMFAmount(e) {
           this.setState({hdmfAmount : e.target.value})
           ////////console.log(e.target.value)
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

    handleSaveClick = () => {
      this.setState({isloading:true})
      
    const getParams = {
        "IpAddress"             :   "0.0.0.0",
        "ClientId"              :   this.state.clientId,
        "UserId"                :   this.state.userinfo.userId,
        "EmployeeId"            :   this.state.employeeId, /* --> Required */
        "EmployeeNo"            :   this.state.employeeNumber, /* --> Required */
        "DateOfBirth"           :   (this.state.dateOfBirth ? this.formatDate(this.state.dateOfBirth) : ""), /* --> Required */
        "PayTypeId"             :   this.state.payTypeId ? this.state.payTypeId : "",
        "PayModeId"             :   this.state.payModeId ? this.state.payModeId : "",
        "PeriodTypeId"          :   this.state.selectedGetPayTypesId ? this.state.selectedGetPayTypesId : "",
        "LocationId"            :   this.state.locationId ? this.state.locationId : "",
        "WorkScheduleId"        :   this.state.selectedWorkScheduleId,
        "StatusTypeId"          :   this.state.statusId ? this.state.statusId : "",
        "ApproverId1"           :   this.state.selectedEmployeeTeamLeadId ? this.state.selectedEmployeeTeamLeadId : "",
        "ApproverId2"           :   this.state.selectedEmployeeCoordinatorId ? this.state.selectedEmployeeCoordinatorId : "",
        "DateOfDeactivation"    :   (this.state.deactivationDate ? this.formatDate(this.state.deactivationDate) : ""),
        "IsDefaultBranch"       :   (this.state.isDefaultBranch)? "1" : "0",
        "PositionId"            :   this.state.jobPositionId ? this.state.jobPositionId : "",
        "ContractDateStart"     :   (this.state.contractDateStart ? this.formatDate(this.state.contractDateStart) : ""),
        "ContractDateEnd"       :   (this.state.contractDateEnd ? this.formatDate(this.state.contractDateEnd) : ""),
        "Salary"                :   this.state.salary ? this.state.salary : "",
        "PayCardTypeId"         :   this.state.payCardTypeId ? this.state.payCardTypeId : "",
        "PayCardNumber"         :   this.state.payCardNumber ? this.state.payCardNumber : "",
        "TMNProfileId"          :   this.state.tmnProfileId ? this.state.tmnProfileId : "",
        "EColaRate"             :   this.state.ecola ? this.state.ecola : "",
        "ColaRate"              :   this.state.cola ? this.state.cola : "",
        "SeaRate"               :   this.state.sea ? this.state.sea : "",
        "TaxExemptionTypeId"    :   this.state.taxExemptionId ? this.state.taxExemptionId : "",
        "TaxTypeId"             :   this.state.taxTypeId ? this.state.taxTypeId : "",
        "TaxCodeId"             :   this.state.taxCodeId ? this.state.taxCodeId : "",
        "TaxWithHeldByTypeId"   :   this.state.taxWithHeldId ? this.state.taxWithHeldId : "",
        "IsOBP"                 :   (this.state.basicPay)? "1" : "0",
        "WorkingDaysPerMonth"   :   this.state.workingDaysPerMonth ? this.state.workingDaysPerMonth : "",
        "WorkingDaysPerYear"    :   this.state.workingDaysPerYear ? this.state.workingDaysPerYear : "",
        "DeductionBasisSSS"     :   this.state.basisSSSId ? this.state.basisSSSId : "",
        "DeductionBasisHDMF"    :   this.state.basisHDMFId ? this.state.basisHDMFId : "",
        "DeductionBasisPHIC"    :   this.state.basisPHICId ? this.state.basisPHICId : "",
        "BasisFor13thMonth"     :   this.state.basis13thMonthId ? this.state.basis13thMonthId : "",
        "SSSAmount"             :   this.state.sssAmount ? this.state.sssAmount : "",
        "PHICAmount"            :   this.state.phicAmount ? this.state.phicAmount : "",
        "HDMFAmount"            :   this.state.hdmfAmount ? this.state.hdmfAmount : "",
        "IsDeleted"             :   (this.state.isActive)? "1" : "0", /* --> Is Active field */

    }
      
      //console.log("Save Employee Configuration Parameter");
      //console.log(getParams)
      axios
          .post(AppConfiguration.Setting().noserapiendpoint + "Employee/EditEmployeeRecord", getParams)
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
          })
    }

    GetTaxType() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0012"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ taxTypeAutocomplete  : data.dataReferences});
        })
        
    } 

    GetTaxExemption() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0013"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ taxExemptionAutocomplete  : data.dataReferences});
        })
        
    } 

    GetTaxCode() {
        const dataParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0012"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ taxCodeAutocomplete  : data.dataReferences});
        })
        
    } 

    GetTaxWithHeld() {
        const dataParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0022"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ taxWithHeldAutocomplete  : data.dataReferences});
        })
        
    }

    GetDeductionBasisSSS() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0016"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ basisSSSAutocomplete  : data.dataReferences});
        })
        
    } 

    GetDeductionBasisHDMF() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0016"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ basisHDMFAutocomplete  : data.dataReferences});
        })
        
    }  

    GetDeductionBasisPHIC() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0016"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ basisPHICAutocomplete  : data.dataReferences});
        })
        
    }  

    Get13Month() {
        const dataParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code":"0017"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  dataParams)
        .then(res => {
            const data = res.data;
            this.setState({ basis13thMonthAutocomplete  : data.dataReferences});
        })
        
    } 

    getEmployeesTeamLead(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetTeamLeadEmployees", getParams)
        .then(res => {
            //console.log("Team Lead List Autocomplete");
            //console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({getEmployeesTeamLeadList : data.employees,isloading:false}) 
            else
                this.setState({getEmployeesTeamLeadList : [],isloading:false}) 

                for (let i = 0; i < data.employees.length; i++) {
                    if (data.employees[i]["id"] === this.state.teamLeadfromRow) {

                        this.state.getTeamLeadData = data.employees[i]['employeeName']

                        //console.log("Inside if");
                        //console.log(this.state.getTeamLeadData)

                    }
                    
                }
                //console.log("Outside for loop");
                //console.log(this.state.getTeamLeadData)
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

    GetEmployeeTeamLead(id) {
        ////////console.log("Team Lead ID List ");
        let GetEmployeeTeamLeadId = ''
        for (let i = 0; i <= this.state.getEmployeesTeamLeadList.length; i++) {
            if (this.state.getEmployeesTeamLeadList[i]["id"] === id) {
                GetEmployeeTeamLeadId = this.state.getEmployeesTeamLeadList[i]['id']; 
                ////////console.log(GetEmployeeTeamLeadId);
                break;
            }
        }
        return GetEmployeeTeamLeadId
    }
    
    onChangeEmployeesTeamLeadList = (e) => {
        if(e.length === "") {
            this.setState({
                getEmployeesTeamLeadList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedEmployeeTeamLeadId = this.GetEmployeeTeamLead(e[0].id)
                ////////console.log("Get Team Lead Id", this.state.selectedEmployeeTeamLeadId)
            }
        }
    }
    
    GetPeriodTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "PayModeId":this.state.payModeId,
        }
        ////console.log("Get Period Types Params");
        ////console.log(getParams); 
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPeriodTypes", getParams)
        .then(res => {
            ////console.log("Get Period Types");
            ////console.log(res.data); 
            const data = res.data
            if(data.status=="1")
                this.setState({periodTypesId : data.periodTypes,isloading:false}) 
            else
                this.setState({periodTypesId : [],isloading:false}) 
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

    GetPeriodTypesId(id) {
        ////////console.log("Get payMode Id ");
        let GetpayTypesId = ''
        for (let i = 0; i <= this.state.periodTypesId.length; i++) {
            if (this.state.periodTypesId[i]["id"] === id) {
                GetpayTypesId = this.state.periodTypesId[i]['id']; 
                ////////console.log(GetpayTypesId);
                break;
            }
        }
        return GetpayTypesId
    }
    
    handleChangePeriodTypesId = (e) => {
        if(e.length === "") {
            this.setState({
                periodTypesId : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedGetPayTypesId = this.GetPeriodTypesId(e[0].id)
                ////////console.log("Get payMode Id", this.state.selectedGetPayTypesId)
            }
        }
    }

    getWorkSchedule(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "Location": this.state.branch,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/GetWorkingSchedules", getParams)
            .then(res => {
                ////console.log("Get Work Schedule");
                ////console.log(res.data.workSchedules);
                this.setState({
                    workScheduleAutocomplete : res.data.workSchedules
                })
            })
        }
    
        /* GetWorkScheduleId(id) {
            ////console.log("Work Schedule ID List ");
            let GetWorkScheduleId = ''
            for (let i = 0; i <= this.state.getWorkScheduleList.length; i++) {
                if (this.state.getWorkScheduleList[i]["id"] === id) {
                    GetWorkScheduleId = this.state.getWorkScheduleList[i]['id']; 
                    ////console.log(GetWorkScheduleId);
                    break;
                }
            }
            return GetWorkScheduleId
        } */
        
        onChangeWorkScheduleIdList = (e) => {

            if(e.length > 0) {
                this.state.selectedWorkScheduleId = e[0].id
            }else{
                this.state.selectedWorkScheduleId = ""
            }

            /* if(e.length === "") {
                this.setState({
                    getWorkScheduleList : ""
                })
            } else {
                if (e.length > 0) {
                    this.state.selectedWorkScheduleId = this.GetWorkScheduleId(e[0].id)
                    ////console.log("Get Work Schedule  Id", this.state.selectedWorkScheduleId)
                }
            } */
        }

        onChangeWorkingDaysPerMonth = (e) => {
            this.setState({
                workingDaysPerMonth	:   e.target.value,
            })
        }
    
        onChangeWorkingDaysPerYear = (e) => {
            this.setState({
                workingDaysPerYear	:   e.target.value,
                isshow:false,
            })
        }
  


    render() {

        return(
            <div>
                <Banner />
                    <Container  className="mt-3" fluid>
                        <Card>
                            <Card.Header>201 File</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesStatusList}
                                                options={this.state.statusAutocomplete}
                                                placeholder="SELECT STATUS"
                                                defaultSelected={[this.props.location.params.data.employeeStatusType]}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <DatePicker
                                                ref='deactivationDate'
                                                selected={this.state.deactivationDate}
                                                onChange={this.onChangeDateDeactivation}
                                                minDate={this.minDate}
                                                value={this.props.deactivationDate}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                                placeholderText="SELECT DATE DEACTIVATION"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={this.onChangeFirstName.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="middleName"
                                                value={this.state.middleName}
                                                onChange={this.onChangeMiddleName.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.onChangeLastName.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Check 
                                                type="checkbox"
                                                label="IS ACTIVE"
                                                onChange={e => this.onChangeIsActiveCheckBox(e)}
                                                /* checked={this.state.isActive}
                                                name={this.state.isActive} */
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="employeeNumber"
                                                value={this.state.employeeNumber}
                                                onChange={this.onChangeEmployeeNumber.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeJobPositionList}
                                                options={this.state.jobPositionAutocomplete}
                                                placeholder="SELECT JOB POSITION"
                                                defaultSelected={[this.props.location.params.data.position]}
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="client"
                                                value={this.state.client}
                                                onChange={this.onChangeClient.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="branch"
                                                value={this.state.branch}
                                                onChange={this.onChangeBranch.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Check 
                                                type="checkbox"
                                                label="IS DEFAULT BRANCH"
                                                onChange={e => this.onChangeIsDefaultBranchCheckBox(e)}
                                                /* checked={this.state.isDefaultBranch}
                                                name={this.state.isDefaultBranch} */
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <DatePicker
                                                ref='dateOfBirth'
                                                selected={this.state.dateOfBirth}
                                                onChange={this.onChangeDateOfBirth}
                                                minDate={this.minDate}
                                                value={this.props.dateOfBirth}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                                placeholderText="SELECT DATE OF BIRTH"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <DatePicker
                                                ref='contractDateStart'
                                                selected={this.state.contractDateStart}
                                                onChange={this.onChangeContractDateStart}
                                                minDate={this.minDate}
                                                value={this.props.contractDateStart}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                                placeholderText="SELECT CONTRACT DATE START"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <DatePicker
                                                ref='contractDateEnd'
                                                selected={this.state.contractDateEnd}
                                                onChange={this.onChangeContractDateEnd}
                                                minDate={this.minDate}
                                                value={this.props.contractDateEnd}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                                placeholderText="SELECT CONTRACT DATE END"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="membershipDate"
                                                value={this.state.membershipDate}
                                                onChange={this.onChangeMembershipDate.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="tenure"
                                                value={this.state.tenure}
                                                onChange={this.onChangeTenure.bind(this)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="salary"
                                                value={this.state.salary}
                                                onChange={this.onChangeSalary.bind(this)}
                                                placeholder="ENTER SALARY"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePayCardTypeList}
                                                options={this.state.payCardAutocomplete}
                                                placeholder="SELECT PAY CARD TYPE"
                                                defaultSelected={[this.props.location.params.data.payCardType]}
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="payCardNumber"
                                                value={this.state.payCardNumber}
                                                onChange={this.onChangePayCardNumber.bind(this)}
                                                placeholder="ENTER PAY CARD NUMBER"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="tmnProfileId"
                                                value={this.state.tmnProfileId}
                                                onChange={this.onChangeTmnProfileId.bind(this)}
                                                placeholder="ENTER TMN PROFILEID"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePayTypeList.bind(this)}
                                                options={this.state.payTypeAutocomplete}
                                                placeholder="SELECT PAY TYPE"
                                                defaultSelected={[this.props.location.params.data.payType]}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePayModeList}
                                                options={this.state.payModeAutocomplete}
                                                placeholder="SELECT PAY MODE"
                                                defaultSelected={[this.props.location.params.data.payMode]}
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePeriodTypesId}
                                                options={this.state.periodTypesId}
                                                placeholder="SELECT PERIOD TYPE"
                                                defaultSelected={[this.props.location.params.data.periodType]}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesTeamLeadList}
                                                options={this.state.getEmployeesTeamLeadList}
                                                placeholder="SELECT TEAM LEAD"
                                                defaultSelected={this.state.teamLeadData}   
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesCoordinatorList}
                                                options={this.state.employeeCoordinatorAutocomplete}
                                                placeholder="SELECT COORDINATOR"
                                                defaultInputValue={this.state.selectedCoordinatorName || ""}  
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="ecola"
                                                value={this.state.ecola}
                                                onChange={this.onChangeEcola.bind(this)}
                                                placeholder="ENTER ECOLA"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="sea"
                                                value={this.state.sea}
                                                onChange={this.onChangeSea.bind(this)}
                                                placeholder="ENTER SEA"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="cola"
                                                value={this.state.cola}
                                                onChange={this.onChangeola.bind(this)}
                                                placeholder="ENTER COLA"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxExemptionList}
                                                options={this.state.taxExemptionAutocomplete}
                                                placeholder="SELECT TAX EXEMPTION"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxCodeList}
                                                options={this.state.taxCodeAutocomplete}
                                                placeholder="SELECT TAX CODE"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxWithHeldList}
                                                options={this.state.taxWithHeldAutocomplete}
                                                placeholder="SELECT TAX WITH HELD"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTaxTypeList}
                                                options={this.state.taxTypeAutocomplete}
                                                placeholder="SELECT TAX TYPE"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Check 
                                                type="checkbox"
                                                label="OPTIMIZED BASIC PAY"
                                                onChange={e => this.onChangeBasicPayCheckBox(e)}
                                                /* checked={this.state.basicPay}
                                                name={this.state.basicPay} */
                                            />
                                        </Form.Group>
                                    </Form.Row>


                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="sssAmount"
                                                value={this.state.sssAmount}
                                                onChange={this.onChangeSSSAmount.bind(this)}
                                                placeholder="ENTER SSS AMOUNT"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="phicAmount"
                                                value={this.state.phicAmount}
                                                onChange={this.onChangePHICAmount.bind(this)}
                                                placeholder="ENTER PHIC AMOUNT"
                                            />
                                        </Form.Group>
                                    </Form.Row>

				                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                type="text" 
                                                autoComplete="off" 
                                                name="hdmfAmount"
                                                value={this.state.hdmfAmount}
                                                onChange={this.onChangeHDMFAmount.bind(this)}
                                                placeholder="ENTER HDMF AMOUNT"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisSSSList}
                                                options={this.state.basisSSSAutocomplete}
                                                placeholder="SELECT DEDUCTION BASIS SSS"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisHDMFList}
                                                options={this.state.basisHDMFAutocomplete}
                                                placeholder="SELECT DEDUCTION BASIS HDMF"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasisPHICList}
                                                options={this.state.basisPHICAutocomplete}
                                                placeholder="SELECT DEDUCTION BASIS PHIC"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBasis13thMonthList}
                                                options={this.state.basis13thMonthAutocomplete}
                                                placeholder="SELECT BASIS FOR 13TH MONTH"
                                            />
                                        </Form.Group>
                                            <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                <Typeahead
                                                    labelKey='description'
                                                    id="basic-example"
                                                    onChange={this.onChangeWorkScheduleIdList}
                                                    options={this.state.workScheduleAutocomplete}
                                                    placeholder="Select Work Schedule"
                                                    defaultSelected={[this.props.location.params.data.workSchedule]}
                                                />
                                            </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                ref="workingDaysPerMonth"
                                                name="workingDaysPerMonth"
                                                value={this.state.workingDaysPerMonth}
                                                onChange={this.onChangeWorkingDaysPerMonth}
                                                autoComplete="off"
                                                placeholder="Enter Working Days Per Month"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Form.Control 
                                                ref="workingDaysPerYear"
                                                name="workingDaysPerYear"
                                                value={this.state.workingDaysPerYear}
                                                onChange={this.onChangeWorkingDaysPerYear}
                                                autoComplete="off"
                                                placeholder="Enter Working Days Per Year"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <ButtonToolbar className="mt-3">
                                        <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        {/* <Button variant="success" onClick={this.handleSubmitClick}>
                                            Submit
                                        </Button>&nbsp;&nbsp; */}
                                        <Button variant="danger" href="/Home">
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

export  default EmployeeFileEdit;