import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState, Tabs, Tab, DatePicker
} 
from '../../noser-hris-component';

class EmployeeConfig extends Component {
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

            addModalShow: false,
            addModalShowRestDay: false,
            employeeLeaveTable : [],
            employeeRestDayTable : [],
            employeeWorkScheduleTable : [],
            getClientAutocomplete : [],
            GetClientLocationsAutocomplete: [],
            clientLocationList: [],
            getEmployeeList : [],
            getClientList : [],
            selectedClientName: "",
            selectedEmployeeName: "",
            selectedEmployeeId: "",
            periodId: "",
            getPayrollPeriodId: [],
            selectedClientId: [],
            employeeList: "",
            rpcList: "",
            filterLocation:"",
            EmployeeNoList: "",
            getEmployeeNoList: [],
            EemployeeListselected: [],
            selectedClient: [],
            selectedClientLocation: [],
            payTypeDate: "",
            PayModesDate: "",
            BranchDate: "",
            PeriodTypesDate: "",
            SalaryRateDate: "",
            StatusDate: "",
            TeamLeadDate: "",
            CoordinatorDate: "",
            WorkScheduleDate: "",
            RestDate: new Date(),
            FromDate: new Date(),
            getPayTypesList: [],
            getPayModesList: [],
            getPayStatusList: [],
            allDays: [],
            employeeConfigAuto : [
                { name: "Coffee" }
            ],
            checked : false,
            date: "1990-06-05",
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            getEmployeesTeamLeadList: [
                { employeeName: "N/A" },
            ],
            getEmployeesCoordinatorList: [],
            salaryRate : '',
            getWorkScheduleList: [],
            selectedWorkScheduleIdParam: "",
            payPeriodList: [],
            payPeriodSelectedId: '',
            payPeriodSelected: '',
            getCurrentMonthly: '',
            getEmployeeListData: [],
            getPayTypes: '',
            getPayModes: '',
            getLocationNames: '',
            getEmployeeStatusTypes: '',
            getSalaryOffered: '',
            PeriodTypesId: [],
            currentrestdateAdded: [],
            FromDate: new Date(),
            ToDate: new Date(),
            LeavedayDataList: [],
            leaveList: [],
            getEmployeeLeaveList: [],
            isChecked: "1",
            duration: "",
            reason: "",
            currentLeavedateAdded: [],

            currentTeamLead:"",
            currentCoordinator:"",
            getPayCardTypeList: [
                { name: "BDO" },
                { name: "Metrobank" },
                { name: "MLhuillier" },
            ],
            getPayCardTypesList:[],
            PayCardType: "",
            PayCardNumber: "",
            txtpayCardNumber: "",

            sssAmount: '',
            sssAmountDate   : '',
            phicAmount: '',
            phicAmountDate: '',
            hdmfAmount: '',
            hdmfAmountDate: '',

            sssBrackets : [],

            colaValue : '',
            colaValueDate : '',
            seaRate : '',
            seaValueDate : '',

            positionAutocomplete    :   [],
            PositionDate            :   '',
            reasonToLeave : [
                { "name" : "SICK LEAVE" },
                { "name" : "VACATION LEAVE" },
                { "name" : "PATERNITY LEAVE" },
                { "name" : "MATERNITY LEAVE" },
            ],
            required:true,
        }
}

/**************************** START LEAVE **************************************/

handleChangeFromDate = date => {
    this.setState({
        FromDate: date,
        isshow          :   false,
    });
    //console.log(this.formatDate(this.state.FromDate));
};



onChangeDuration = (e) => {
    this.setState({
        duration: e.target.value,
        isshow          :   false,
    });
}

onChangeReason = (e) => {
    this.setState({ reason: e.target.value} );
}

handleChangeCheckboxLeave(e) {
    let isChecked = e.target.checked ? "0" : "1";
    //console.log(isChecked)
    this.setState({
        isChecked: isChecked
    })
    
}

handleChangeToDate = date => {

    this.setState({
        ToDate: date,
    });
};


onChangeReasonToLeave = (e) => {
    if(e.length == 0) {
        this.state.selectedReasonToLeave = []
        return
    }  
    this.state.selectedReasonToLeave = e[0].name
    this.setState({
        isshow          :   false,
    })
}

onSubmitAddLeave = (e) => {

    const {LeavedayDataList} = this.state
    /* const sDate = new Date(this.state.FromDate.getDate()+1 + this.state.FromDate.getMonth()+1 + this.state.FromDate.getFullYear()) */
    let fromThisDate = moment(this.state.FromDate).format('MM/DD/YYYY');
    let lstLeaveday = this.state.LeavedayDataList
    let wholeday = Math.floor(this.state.duration)
    let halfday = this.state.duration % 1
    let totalduration = 0
    let duration =0

    if(this.state.duration=="")
    {
        this.setState({
            isloading       :   false,
            alerttype       :   "Warning!",
            isshow          :   true,
            color           :   "warning",
            message         :   "Please enter leave duration.",
            fade            :   true
        })
        return
    }
    if(this.state.fromThisDate=="")
    {
        this.setState({
            isloading       :   false,
            alerttype       :   "Warning!",
            isshow          :   true,
            color           :   "warning",
            message         :   "Please enter leave date.",
            fade            :   true
        })
        return
    }
    /* if(this.state.selectedReasonToLeave == '')
    {
        this.setState({
            isloading       :   false,
            alerttype       :   "Warning!",
            isshow          :   true,
            color           :   "warning",
            message         :   "Pleas select reason for leave.",
            fade            :   true
        })
        return
    } */
    
    if(halfday>0)
        totalduration = wholeday+1
    else
        totalduration = wholeday

    
    for(let i=1;i<=totalduration;i++)
    {
        if(i==totalduration && halfday>0)
        duration = halfday
        else
        duration=1
        const obj = {
            "EmployeeId":this.state.selectedEmployeeId,
            "leaveDate" : fromThisDate,
            "mandays" : duration.toString(),
            "reason" : this.state.selectedReasonToLeave,
            "isPaid" : this.state.isChecked,
            "isPaidLabel" : this.state.isChecked=="1" ? "PAID" : "UNPAID",
            "isDeleted" : "0"
        }
        if(lstLeaveday.length>0)
        {
            for(let i=0;i<lstLeaveday.length;i++)
            {
                if(lstLeaveday[i].leaveDate==fromThisDate){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Warning!",
                        isshow          :   true,
                        color           :   "warning",
                        message         :   "Selected date already exist.",
                        fade            :   true
                    })
                    return 
                }
            }
        }
        LeavedayDataList.push(obj)
        this.setState({LeavedayDataList: LeavedayDataList})
        fromThisDate = moment(fromThisDate).add(1, 'day').format('MM/DD/YYYY');
        ////console.log("fromDate: " + fromThisDate)
        
        //this.setState({ leaveList : obj } );
        ////console.log("totaldays List: " + this.state.totaldays)
        //this.setState({ totaldays : totaldays } );
        //this.setState({ restDateDay : LeavedayDataList } );

        
        
    }
}

onSubmitLeaveRemove =() => {
  
    let lstleaveday = this.state.LeavedayDataList
    for( var i = 0; i < lstleaveday.length; i++){ 
        //console.log(lstleaveday[i].IsSelected)
        if ( lstleaveday[i].IsSelected === 1) {
            lstleaveday.splice(i, 1); 
          i--;
        }
     }
    
    this.setState({LeavedayDataList:lstleaveday})
    //console.log(lstleaveday)
    //console.log("t")
    //console.log(this.state.LeavedayDataList)
}

onSubmitRemove =()=>{
    /*this.state.employeeRestDayTable.map(function(item,index){
        if(item.IsSelected==1)
        this.state.employeeRestDayTable[index].splice(index,1)
    })*/
    let lstRestday = this.state.employeeRestDayTable
    for( var i = 0; i < lstRestday.length; i++){ 
        //console.log(lstRestday[i].IsSelected)
        if ( lstRestday[i].IsSelected === 1) {
            lstRestday.splice(i, 1); 
          i--;
        }
     }
    
    this.setState({employeeRestDayTable:lstRestday})
    //console.log(lstRestday)
    //console.log("t")
    //console.log(this.state.employeeRestDayTable)
}

/**************************** END LEAVE **************************************/

GetPeriodTypesId(id) {
    //console.log("Get payMode Id ");
    let GetpayTypesId = ''
    for (let i = 0; i <= this.state.PeriodTypesId.length; i++) {
        if (this.state.PeriodTypesId[i]["id"] === id) {
            GetpayTypesId = this.state.PeriodTypesId[i]['id']; 
            //console.log(GetpayTypesId);
            break;
        }
    }
    return GetpayTypesId
}

handleChangePeriodTypesId = (e) => {
    if(e.length === "") {
        this.setState({
            PeriodTypesId : ""
        })
    } else {
        if (e.length > 0) {
            this.state.selectedGetPayTypesId = this.GetPeriodTypesId(e[0].id)
            //console.log("Get payMode Id", this.state.selectedGetPayTypesId)
        }
    }
}

GetPeriodTypes(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "PayModeId":this.state.selectedEmployeePayModesId,
    }
    axios
    .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPeriodTypes", getParams)
    .then(res => {
        //console.log("Get Period Types");
        //console.log(res.data); 
        const data = res.data
        if(data.status=="1")
            this.setState({PeriodTypesId : data.periodTypes,isloading:false}) 
        else
            this.setState({PeriodTypesId : [],isloading:false}) 
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

componentDidMount(){
    this.setState({isloading:true})
    this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
  /*   this.employeeLeaveTable(); */
    this.getClientList();
    this.GetPayCardTypes();
    this.GetEmployeeStatusList();
    this.GetEmployeePayTypesList();
    this.GetEmployeePayModesList();
    this.getSSSBackets();
    this.GetPosition();
    
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
                getPayCardTypesList : data.payCardTypes ? data.payCardTypes : []
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
        this.state.selectedPayCardTypeId=""
        return
    } 
    this.state.selectedPayCardTypeId = e[0].id
    //console.log("Client selectedPayCardTypeId " + this.state.selectedPayCardTypeId );
    
}


onChangeEmployees = (e) => {
    if(e.length ==0) {
        this.setState({
            employeeList : ""
        })
        return
    }

}

handleChangeCheckbox = () => {
    this.setState({
        checked: !this.state.checked
    })
}

getParamountEmployees(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":"111",
        "UserId":this.state.userinfo.userId,
        "EmployeeName":"",
        "EmployeeNo":"",
        "ClientName":""
    }
    axios
    .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
    .then(res => {
        //console.log("Paramount Employee List ");
        //console.log(res.data);
        const data = res.data
        if(data.status=="1")
        {
            let employees = this.state.getEmployeeList
            let teamLeadEmployees = employees.concat(res.data.employees)
            //console.log("loading of merging")
            //console.log(teamLeadEmployees)
            this.setState({getEmployeesCoordinatorList : data.employees,getEmployeesTeamLeadList: teamLeadEmployees,isloading:false}) 
        }
        else
            this.setState({getEmployeesCoordinatorList : [],getEmployeesTeamLeadList:[],isloading:false}) 
        
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

onChangeClientList = (e) => {
    if(e.length == 0) {
        this.state.selectedClientName=""
        this.state.selectedClientId=""
        return
    } 
    this.state.selectedClientId = e[0].id
    this.state.selectedClientName = e[0].name
    //console.log("Client selectedClientName " + this.state.selectedClientName );
    this.setState({isloading:true})
    
    this.getEmployees();
    /* this.getParamountEmployees(); */

    this.getWorkSchedule();
    this.getClientLocation();
    
}

onChangePayPeriod = (e) => {

    if(e.length == 0) {
        this.state.payPeriodSelected = ""
        this.state.payPeriodSelectedId = ""
        return
    } 

    this.state.payPeriodSelectedId = e[0].periodId
    this.state.payPeriodSelected = e[0].payPeriod
    ////console.log("payPeriodSelectedId : " + this.state.payPeriodSelectedId)
    ////console.log("payPeriodSelected : " + this.state.payPeriodSelected)
}


getEmployeesData(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeName":this.state.selectedEmployeeName,
        "EmployeeNo":this.state.selectedEmployeeNo,
        "ClientName":this.state.selectedClientName
    }
    axios
    .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
    .then(res => {
        //console.log("Employee List Data");
        //console.log(res.data);
        const data = res.data
        if(data.status=="1")
        {
            this.setState({getEmployeeListData : data.employees, isloading:false})             
            /* this.setEmployeeCurrentInfo() */
        }
        else
        {
            this.setState({getEmployeeListData : [],isloading:false}) 
        }

        
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

/* setEmployeeCurrentInfo() { */

    /* if (this.state.getEmployeeListData != null || this.state.getEmployeeListData.length > 0)
    {
        this.setState({
            getPayTypes : this.state.getEmployeeListData[0].payType, 
            getPayModes: this.state.getEmployeeListData[0].payMode, 
            getLocationNames: this.state.getEmployeeListData[0].locationName, 
            getEmployeeStatusTypes: this.state.getEmployeeListData[0].employeeStatusType, 
            getSalaryOffered: this.state.getEmployeeListData[0].salaryOffered,
            getWorkSchedule: this.state.getEmployeeListData[0].workSchedule,

            getSSSAmount : this.state.getEmployeeListData[0].sssAmount, 
            getPHICAmount: this.state.getEmployeeListData[0].phicAmount, 
            getHDMFAmount: this.state.getEmployeeListData[0].hdmfAmount, 
            gePayCardType: this.state.getEmployeeListData[0].payCardType, 
            getPeriodType: this.state.getEmployeeListData[0].periodType,
            getPayCardNumber: this.state.getEmployeeListData[0].payCardNumber,
            getPosition: this.state.getEmployeeListData[0].position
        })

    } */

   

    /*
    for(let i=0;i<this.state.getEmployeeListData.length;i++)
    {
        const payTypes = this.state.getEmployeeListData[i].payType
        const payModes = this.state.getEmployeeListData[i].payMode
        const locationNames = this.state.getEmployeeListData[i].locationName
        const employeeStatusTypes = this.state.getEmployeeListData[i].employeeStatusType
        const salaryOffer = this.state.getEmployeeListData[i].salaryOffered
        const workSchedules = this.state.getEmployeeListData[i].workSchedule
        
        

        this.setState({
            getPayTypes : payTypes, 
            getPayModes: payModes, 
            getLocationNames: locationNames, 
            getEmployeeStatusTypes: employeeStatusTypes, 
            getSalaryOffered: salaryOffer,
            getWorkSchedule: workSchedules
        })
    } 
    */

/* } */


clearCurrentEmployeeData() {
    this.setState({
        getPayTypes : "",
        getPayModes: "",
        getLocationNames: "",
        getEmployeeStatusTypes: "",
        getSalaryOffered: "",
        getWorkSchedule: "",

        getSSSAmount : "",
        getPHICAmount: "",
        getHDMFAmount: "",
        gePayCardType: "",
        getPeriodType: "",
        getPayCardNumber: "",
        getPosition :   "",
        currentTeamLead : "",
        currentCoordinator: "",
    })
}

onChangeEmployeesNo(e){
    this.setState({selectedEmployeeNo : e.target.value})
    //console.log(e.target.value)
}

onChangeEmployeesList = (e) => {


    if(e.length==0)
    {
        this.setState({getEmployeeListData: null, selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
        this.clearCurrentEmployeeData()
        return
    }
    this.setState({isloading:true})
    this.state.selectedEmployeeId = e[0].id
    this.state.selectedPayrollPeriodsId = e[0].payPeriodId
    this.state.selectedEmployeeName = e[0].employeeName
    this.state.selectedEmployeeNo = e[0].employeeNo
    this.state.selectedWorkScheduleIdParam = e[0].id

    this.state.getPayTypes = e[0].payType
    this.state.getPayModes = e[0].payMode
    this.state.getLocationNames = e[0].locationName
    this.state.getEmployeeStatusTypes = e[0].employeeStatusType
    this.state.getSalaryOffered  = e[0].salaryOffered
    this.state.getWorkSchedule = e[0].workSchedule

    this.state.getSSSAmount = e[0].sssAmount
    this.state.getPHICAmount = e[0].phicAmount
    this.state.getHDMFAmount = e[0].hdmfAmount
    this.state.gePayCardType = e[0].payCardType
    this.state.getPeriodType = e[0].periodType
    this.state.getPayCardNumber = e[0].payCardNumber
    this.state.getPosition = e[0].position
    this.state.getPosition = e[0].position
    this.state.getPosition = e[0].position

   

    this.GetEmployeePayrollPeriods();
    this.employeeWorkScheduleTable();
    this.GetPayperiodPeriodsId(e[0].payPeriodId);
    this.GetPayPeriodList()
    this.getEmployeesData();
    this.getEmployeesTeamLead();
    this.getEmployeesCoordinator();
    this.GetEmployeeConfiguration();
    this.setState({isloading:false,})
}
GetEmployeeConfiguration(){
    const configParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeId": this.state.selectedEmployeeId
     };

     //console.log("Get Configurations Params")
     axios
         .post(
             AppConfiguration.Setting().noserapiendpoint + "Employee/GetConfigurations",  configParams
         )
         .then(res => {
            //console.log("Configuration xxx")
            const data = res.data
            //console.log(data)
            if(data.status=="1"){
                this.setState({currentTeamLead: data.teamLead, 
                    currentCoordinator: data.coordinator,
                    employeeRestDayTable:data.restdays,
                    LeavedayDataList:data.leaves
                })

            }else
            {
                this.setState({currentTeamLead: [], 
                    currentCoordinator: [],
                    employeeRestDayTable: [],
                    LeavedayDataList: []
                })
            }
            /*, 
                            employeeRestDayTable:data.restDays,
                            LeavedayDataList:data.leaves*/
         })
}
GetPayPeriodList() {
    const periodListParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeId": this.state.selectedEmployeeId
     };
     //console.log("periodListParams")
     //console.log(periodListParams)
     axios
         .post(
             AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
         )
         .then(res => {
            const data = res.data;
            //console.log("data.payPeriodList")
            //console.log(data)
            this.setState({payPeriodList: data.payrollPeriods})
            ////console.log("data.employees list count: " + this.state.employeeList.length)
         })
}

getWorkSchedule(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "Location": this.state.selectedLocationName,
    }

    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/GetWorkingSchedules", getParams)
        .then(res => {
            //console.log("Get Work Schedule");
            //console.log(res.data.workSchedules);
            this.setState({
                getWorkScheduleList : res.data.workSchedules
            })
        })
    }

    GetWorkScheduleId(id) {
        //console.log("Work Schedule ID List ");
        let GetWorkScheduleId = ''
        for (let i = 0; i <= this.state.getWorkScheduleList.length; i++) {
            if (this.state.getWorkScheduleList[i]["id"] === id) {
                GetWorkScheduleId = this.state.getWorkScheduleList[i]['id']; 
                //console.log(GetWorkScheduleId);
                break;
            }
        }
        return GetWorkScheduleId
    }
    
    onChangeWorkScheduleIdList = (e) => {
        if(e.length === "") {
            this.setState({
                getWorkScheduleList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedWorkScheduleId = this.GetWorkScheduleId(e[0].id)
                //console.log("Get Work Schedule  Id", this.state.selectedWorkScheduleId)
            }
        }
    }

getClientList(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
    }
    axios
    .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
    .then(res => {
        this.setState(
            {
                isloading:false,
                getClientList : res.data.clients ? res.data.clients : []
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
        //console.log("Client Location");
        //console.log(res.data.locations);
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

onChangeLocation = (e) => {
    if(e.length == 0) {
            this.state.selectedLocationName = ""
            this.state.selectedLocationId = ""
            return
    }  
    this.state.selectedLocationName = e[0].name
    this.state.selectedLocationId = e[0].id
}



getEmployeesTeamLead(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
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
    //console.log("Team Lead ID List ");
    let GetEmployeeTeamLeadId = ''
    for (let i = 0; i <= this.state.getEmployeesTeamLeadList.length; i++) {
        if (this.state.getEmployeesTeamLeadList[i]["id"] === id) {
            GetEmployeeTeamLeadId = this.state.getEmployeesTeamLeadList[i]['id']; 
            //console.log(GetEmployeeTeamLeadId);
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
            //console.log("Get Team Lead Id", this.state.selectedEmployeeTeamLeadId)
        }
    }
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
        //console.log("Coordinator List Autocomplete");
        //console.log(res.data);
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

GetEmployeeCoordinator(id) {
    //console.log("Coordinator ID List ");
    let GetEmployeeCoordinatorId = ''
    for (let i = 0; i <= this.state.getEmployeesCoordinatorList.length; i++) {
        if (this.state.getEmployeesCoordinatorList[i]["id"] === id) {
            GetEmployeeCoordinatorId = this.state.getEmployeesCoordinatorList[i]['id']; 
            //console.log(GetEmployeeCoordinatorId);
            break;
        }
    }
    return GetEmployeeCoordinatorId
}

onChangeEmployeesCoordinatorList = (e) => {
    if(e.length === "") {
        this.setState({
            getEmployeesCoordinatorList : ""
        })
    } else {
        if (e.length > 0) {
            this.state.selectedEmployeeCoordinatorId = this.GetEmployeeCoordinator(e[0].id)
            //console.log("Get Coordinator Id", this.state.selectedEmployeeCoordinatorId)
        }
    }
}

employeeWorkScheduleTable() {
        
    const getParams = {
        "IpAddress"     :   "0.0.0.0",
        "ClientId"      :   this.state.selectedClientId,
        "UserId"        :   this.state.userinfo.userId,
        "EmployeeId"    :   this.state.selectedEmployeeId,
        "PayPeriodId"   :   this.state.selectedPayrollPeriodsId
    }
    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetEmployeePayPeriodWorkSchedules", getParams)
        .then(res => {
            const data      =   res.data
            //console.log("Get Employee PayPeriod Work Schedules Table ");
            //console.log(data)
            var obj         =   {}
            var schedule    =   []
            var isValid     =   true;
            if(data.status  =   "1"){
                
                if(data.payPeriodWorkSchedule   ==  null)
                {
                    isValid = false
                    data.payPeriodWorkSchedule  =   []
                }
                data.payPeriodWorkSchedule.map(function(item, idx){
                    if(item.periodWorkSchedule  ==  null)
                    {
                        isValid = false
                    }
                    else
                    {
                        obj = {
                            date                :   item.date,
                            branch              :   item.periodWorkSchedule.location,
                            workSchedule        :   item.periodWorkSchedule.description,
                            timeIn              :   item.periodWorkSchedule.startTime,
                            timeOut             :   item.periodWorkSchedule.endTime,
                            firstBreakOut       :   '',
                            firstBreakIn        :   '',
                            secondBreakOut      :   '',
                            secondBreakIn       :   '',
                            thirdBreakOut       :   '',
                            thirdBreakIn        :   '',
                            fourthBreakOut      :   '',
                            fourthBreakIn       :   '',
                            overtime            :   '00:00',
                        }
                        item.periodWorkSchedule.workScheduleDetails.map(function(item, idx){
                            if(idx==1){
                                obj.firstBreakOut = item.startTime
                                obj.firstBreakIn = item.endTime
                            }
                            if(idx==2){
                                obj.secondBreakOut = item.startTime
                                obj.secondBreakIn = item.endTime
                            }
                            if(idx==3){
                                obj.thirdBreakOut = item.startTime
                                obj.thirdBreakIn = item.endTime
                            }
                        })
                        schedule.push(obj)
                    }
                })
                if(!isValid){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Information!",
                        isshow          :   true,
                        color           :   "info",
                        message         :   "Employee has no working schedule.",
                        fade            :   true,
                        employeeWorkScheduleTable:[]
                    })
                }
                else
                this.setState({
                    employeeWorkScheduleTable   :   schedule,
                    isShow                      :   false,
                    isloading                   :   false
                })
            }
        })
}

GetClientId(name) {
    //console.log("Client ID List ");
    let GetClientId = ''
    for (let i = 0; i <= this.state.getClientList.length; i++) {
        if (this.state.getClientList[i]["name"] === name) {
            GetClientId = this.state.getClientList[i]['id'];
            //console.log(GetClientId);
            break;
        }
    }
    return GetClientId
}

getEmployees(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeName":"",
        "EmployeeNo":"",
        "ClientName":""
    }
    axios
    .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
    .then(res => {
        console.log("Employee List ");
        console.log(res.data);
        const data = res.data
        if(data.status=="1")
            this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isloading:false, getCurrentMonthly: data.employeespayPeriod})
        else
            this.setState({getEmployeeList : [], getEmployeeNoList : [],isloading:false})
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

GetEmployeeId(id) {

    //console.log("Get Employee Id");
    let GetEmployeeId = ''
    for (let i = 0; i <= this.state.getEmployeeList.length; i++) {
        if (this.state.getEmployeeList[i]["id"] === id) {
            GetEmployeeId = this.state.getEmployeeList[i]['id'];
            //console.log(GetEmployeeId);
            break;
        }
    }
    return GetEmployeeId
}



GetEmployeePayrollPeriods(){
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeId":this.state.selectedEmployeeId,
    }

    //console.log("Get Payroll Periods Params " + getParams);

    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods", getParams)
        .then(res => {
            //console.log("Get Employee Data table ");
            //console.log(res.data);
            this.setState({
                getPayrollPeriodId : res.data.payrollPeriods
            })
        })
}

GetPayperiodPeriodsId(periodId){
    //console.log("Get Payroll Periods Id");
    let PayPeriodName =''
    //console.log(this.state.getPayrollPeriodId)
    this.state.getPayrollPeriodId.map(function(item,idx){
        if(periodId==item.periodId)
        PayPeriodName = item.payPeriod
    })
    this.setState({selectedPayrollPeriodsName:PayPeriodName})
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
            //console.log("Get Employee Status List ");
            //console.log(res.data);
            this.setState({
                getPayStatusList : res.data.statusTypes
            })
        })

}

GetEmployeeStatus(id) {
    //console.log("Status ID List ");
    let GetEmployeeStatusId = ''
    for (let i = 0; i <= this.state.getPayStatusList.length; i++) {
        if (this.state.getPayStatusList[i]["id"] === id) {
            GetEmployeeStatusId = this.state.getPayStatusList[i]['id']; 
            //console.log(GetEmployeeStatusId);
            break;
        }
    }
    return GetEmployeeStatusId
}

onChangeEmployeesStatusList = (e) => {
    if(e.length === "") {
        this.setState({
            getPayStatusList : ""
        })
    } else {
        if (e.length > 0) {
            this.state.selectedEmployeeStatusId = this.GetEmployeeStatus(e[0].id)
            //console.log("Get Status  Id", this.state.selectedEmployeeStatusId)
        }
    }
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
            //console.log("Get Employee Payroll Types List ");
            //console.log(res.data);
            this.setState({
                getPayTypesList : res.data.payrollTypes
            })
        })

}

/* GetEmployeePayTypes(id) {
    //console.log("Pay Types ID List ");
    let GetEmployeePayTypesId = ''
    for (let i = 0; i <= this.state.getPayTypesList.length; i++) {
        if (this.state.getPayTypesList[i]["id"] === id) {
            GetEmployeePayTypesId = this.state.getPayTypesList[i]['id']; 
            //console.log(GetEmployeePayTypesId);
            break;
        }
    }
    return GetEmployeePayTypesId
} */

onChangeEmployeesPayTypesList = (e) => {
    if(e.length==0) return;
        this.setState({ selectedEmployeePayTypesId: e[0].id });
        //console.log("Get Pay Types  Id", this.state.selectedEmployeePayTypesId)
    /* if(e.length === "") {
        this.setState({
            getPayTypesList : ""
        })
    } else {
        if (e.length > 0) {
            this.state.selectedEmployeePayTypesId = this.GetEmployeePayTypes(e[0].id)
            //console.log("Get Pay Types  Id", this.state.selectedEmployeePayTypesId)
        }
    } */
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
            //console.log("Get Employee Payroll Modes List ");
            //console.log(res.data);
            this.setState({
                getPayModesList : res.data.payrollModes
            })
        })

}

/* GetEmployeePayModes(id) {
    //console.log("Pay Types ID List ");
    let GetEmployeePayModesId = ''
    for (let i = 0; i <= this.state.getPayModesList.length; i++) {
        if (this.state.getPayModesList[i]["id"] === id) {
            GetEmployeePayModesId = this.state.getPayModesList[i]['id']; 
            //console.log(GetEmployeePayModesId);
            break;
        }
    }
    return GetEmployeePayModesId
} */

onChangeEmployeesPayModesList = (e) => {

    if(e.length==0) {
        this.setState({ selectedEmployeePayModesId: '' });
        return;
    }
    //console.log("Get Pay Mode  Id", this.state.selectedEmployeePayModesId)
    this.setState({selectedEmployeePayModesId: e[0].id,isloading:true})
    const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
    sleep(1000).then(() => {
        this.GetPeriodTypes()
      })
}



onChangeSalaryRate = (e) => {
    this.setState({ salaryRate: e.target.value} );
}

handleChangeRestDate = date => {
    this.setState({
        RestDate    :   date,
        isshow      :   false,
    });
    ////console.log(this.formatDate(this.state.WorkScheduleDate));
};
formatDate(date) {
    let m = moment(date, 'MM-DD-YYYY');
    return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
  }

  onSubmitSaveEmployee = () => {
    //console.log("Get Pay Types  Id", this.state.selectedEmployeePayTypesId)
    //console.log("Get Pay Mode  Id", this.state.selectedEmployeePayModesId)
    
    //console.log("Rest Day Table List " + (this.state.payTypeDate ? this.state.payTypeDate : "test"));
    this.setState({isloading:true})
    
    const getParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeId":this.state.selectedEmployeeId,
        "ApproverId1":this.state.selectedEmployeeTeamLeadId ? this.state.selectedEmployeeTeamLeadId : "",
        "ApproverId2":this.state.selectedEmployeeCoordinatorId ? this.state.selectedEmployeeCoordinatorId : "",
        "PayTypeId":this.state.selectedEmployeePayTypesId ? this.state.selectedEmployeePayTypesId : "",
        "PayModeId":this.state.selectedEmployeePayModesId ? this.state.selectedEmployeePayModesId : "",
        "LocationId":this.state.selectedLocationId ? this.state.selectedLocationId : "",
        "WorkScheduleId":this.state.selectedWorkScheduleId ? this.state.selectedWorkScheduleId : "",
        "StatusTypeId":this.state.selectedEmployeeStatusId ? this.state.selectedEmployeeStatusId : "",
        "PeriodTypeId": this.state.selectedGetPayTypesId ? this.state.selectedGetPayTypesId : "",
        "Salary":this.state.salaryRate ? this.state.salaryRate : "",
        "EmployeeNo":this.state.selectedEmployeeNo ? this.state.selectedEmployeeNo : "",
        "PayTypeEffectivity": (this.state.payTypeDate ? this.formatDate(this.state.payTypeDate) : ""),
        "PayModeEffectivity": (this.state.PayModesDate ? this.formatDate(this.state.PayModesDate) : ""),
        "LocationEffectivity": (this.state.BranchDate ? this.formatDate(this.state.BranchDate) : ""),
        "WorkScheduleEffectivity": (this.state.WorkScheduleDate ? this.formatDate(this.state.WorkScheduleDate) : ""),
        "PeriodTypeEffectivity": (this.state.PeriodTypesDate ? this.formatDate(this.state.PeriodTypesDate) : ""),
        "StatusTypeEffectivity": (this.state.StatusDate ? this.formatDate(this.state.StatusDate) : ""),
        "SalaryEffectivity": (this.state.SalaryRateDate ? this.formatDate(this.state.SalaryRateDate) : ""),
        "Approver1": (this.state.TeamLeadDate ? this.formatDate(this.state.TeamLeadDate) : ""),
        "Approver2": (this.state.CoordinatorDate ? this.formatDate(this.state.CoordinatorDate) : ""),
        "Restdays" : this.state.employeeRestDayTable,
        "Leaves" : this.state.LeavedayDataList, 
        "PayCardTypeId" : this.state.selectedPayCardTypeId,
        "PayCardTypeEffectivity" : (this.state.PayCardType ? this.formatDate(this.state.PayCardType) : ""),
        "PayCardNumber" : this.state.txtpayCardNumber,
        "PayCardNumberEffectivity" : (this.state.PayCardNumber ? this.formatDate(this.state.PayCardNumber) : ""),
        
        "SSSAmount" : this.state.selectedsceeShare,
        "SSSEffectivity" : (this.state.sssAmountDate ? this.formatDate(this.state.sssAmountDate) : ""),

        "PHICAmount" : this.state.phicAmount,
        "PHICEffectivity" : (this.state.phicAmountDate ? this.formatDate(this.state.phicAmountDate) : ""),

        "HDMFAmount" : this.state.hdmfAmount,
        "HDMFEffectivity" : (this.state.hdmfAmountDate ? this.formatDate(this.state.hdmfAmountDate) : ""),
        "ColaRate" : this.state.colaValue,
        "ColaRateEffectivity": (this.state.colaValueDate ? this.formatDate(this.state.colaValueDate) : ""),
        "SeaRate" : this.state.seaRate,
        "SeaRateEffectivity" : (this.state.seaValueDate ? this.formatDate(this.state.seaValueDate) : ""),

        "PositionId"            :   this.state.selectedPositionId,
        "PositionEffectivity"   :   (this.state.PositionDate ? this.formatDate(this.state.PositionDate) : ""),
    }
    
    console.log("Save Employee Configuration Parameter");
    console.log(getParams)
    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/SaveEmployeeConfiguration", getParams)
        .then(res => {
            //console.log("Add Employee List ");
            //console.log(res.data);
            /* this.getEmployees(); */
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

        //console.log("Date " + this.formatDate(this.state.payTypeDate));
  }

onSubmitAdd = () => {

    let fromThisDate = moment(this.state.RestDate).format('MM/DD/YYYY');
    //console.log("fromThisDate ");
    //console.log(fromThisDate);

    let lstRestday = this.state.employeeRestDayTable
    let restArr = []
    const {employeeRestDayTable} = this.state

    let restDay = this.formatDate(this.state.RestDate)

    const rest = {
        "EmployeeId":this.state.selectedEmployeeId,
        "restdate" : fromThisDate,
        "isDeleted":"0"
    }

    if(lstRestday.length>0)
    {
        for(let i=0;i<lstRestday.length;i++)
        {
            if(lstRestday[i].restdate==fromThisDate){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   "Selected date already exist.",
                    fade            :   true
                })
                return 
            }
        }
    }
    employeeRestDayTable.push(rest)
    this.setState({employeeRestDayTable: employeeRestDayTable})
   

}

    handleChangePayTypeDate = date => {
        this.setState({
            payTypeDate: date
        });
    };

    handleChangePayModesDate = date => {
        this.setState({
            PayModesDate: date
        });
    };

    handleChangePayBranchDate = date => {
        this.setState({
            BranchDate: date
        });
    };

    handleChangePeriodTypesDate = date => {
        this.setState({
            PeriodTypesDate: date
        });

    };

    handleChangeSalaryRateDate = date => {
        this.setState({
            SalaryRateDate: date
        });
    };

    handleChangeStatusDate = date => {
        this.setState({
            StatusDate: date
        });
    };

    handleChangeTeamLeadDate = date => {
        this.setState({
            TeamLeadDate: date
        });
    };

    handleChangeCoordinatorDate = date => {
        this.setState({
            CoordinatorDate: date
            
        });
    };
    
    handleChangeWorkScheduleDate = date => {
        this.setState({
            WorkScheduleDate: date
            
        });
    };
    

    handleChangePayCardType = date => {
        this.setState({
            PayCardType: date
            
        });
    };

    

    handleChangePayCardNumber = date => {
        this.setState({
            PayCardNumber: date
            
        });
    };

    

    /* handleChangeRestDate = date => {
        this.setState({
            RestDate: date
            
        });
        //console.log(this.formatDate(this.state.WorkScheduleDate));
    }; */

    handleModalClose = (e) => {
        this.setState({
            /* checked: false, */
            employeeLeaveTable: e
        });
        //console.log("employee Leave Table")
        //console.log(this.state.employeeLeaveTable)

    }

    IsNumeric(evt)
    {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /^\d+(.\d+)?$/;
        if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    

    onChangePayCardNumber = (e) => {
        this.setState({ txtpayCardNumber: e.target.value} );
    }

  
    handleChangeSSSAmountDate = date => {
        this.setState({
            sssAmountDate: date
            
        });
    };

    onChangePHICAmount = (e) => {
        this.setState({ phicAmount: e.target.value} );
    }

    handleChangePHICAmountDate = date => {
        this.setState({
            phicAmountDate: date
            
        });
    };

    onChangeHDMFAmount = (e) => {
        this.setState({ hdmfAmount: e.target.value} );
    }

    handleChangeHDMFAmountDate = date => {
        this.setState({
            hdmfAmountDate: date
            
        });
    };
    
    onChangeColaValue = (e) => {
        this.setState({ colaValue: e.target.value} );
    }

    handleChangeColaValueDate = date => {
        this.setState({
            colaValueDate: date
            
        });
    };

    onChangeSeaValue = (e) => {
        this.setState({ seaRate: e.target.value} );
    }

    handleChangeSeaValueDate = date => {
        this.setState({
            seaValueDate: date
            
        });
    };


        getSSSBackets(){
            const getParams = {
                "IpAddress":"0.0.0.0",
                "ClientId":this.state.userinfo.clientId,
                "UserId":this.state.userinfo.userId,
            }
        
            axios
                .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSSSBrackets", getParams)
                .then(res => {
                    //console.log("Get SSS Brackets");
                    const data = res.data
                    //console.log(data)
                    this.setState({
                        sssBrackets : data.brackets
                    })
                })
        }
    
        onChangeSSSBrackets = (e) => {
            if(e.length == 0) {
                this.state.selectedsceeShare  = ''
                return
            } 
            this.state.selectedsceeShare = e[0].sceeShare
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
                //console.log("Get Position Name");
                //console.log(data);
                this.setState({ positionAutocomplete  : data.positions });
             })
        }

        onChangePosition = (e) => {
            //console.log(e)
                if (e.length > 0) {
                this.state.selectedPositionId = e[0].id
            } else {
                this.state.selectedPositionId = ""
            }
        }

        handleChangePositionDate = date => {
            this.setState({
                PositionDate: date
                
            });
        };

    render() {

        const sizePerPageRenderer = ({
            options,
            currSizePerPage,
            onSizePerPageChange
            }) => (
            <div className="btn-group" role="group">
                {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                    <button
                        key={ option.text }
                        type="button"
                        onClick={ () => onSizePerPageChange(option.page) }
                        className={ `btn ${isSelect ? 'btn-primary' : 'btn-success'}` }
                    >
                        { option.text }
                    </button>
                    );
                })
                }
            </div>
            );
        const options = {
            sizePerPageRenderer
        };


        const columnLeaveTable = [
            {
                dataField: 'leaveDate',
                text: 'Date',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'mandays',
                text: 'Duration',
                align:"center",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'isPaidLabel',
                text: 'Paid',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'reason',
                text: 'Reason',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left' ,width:'68%'}},
                style:{textAlign:'left'}
            }
        ]

        const employeeLeaveRow = {
            /* mode: 'checkbox',
            clickToSelect: true,
            clickToSelectAndEditCell: true */

            mode: 'checkbox',
            clickToSelectAndEditCell: false,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.LeavedayDataList.map(function(item,idx){
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                }) 
                //console.log(this.state.LeavedayDataList)
            }
        };

        const columnRestDay = [
            {
                dataField: 'restdate',
                text: 'Date',
                editable: false,
                headerStyle: () => {
                    return { width: "100%" };
                  }
            },
        ]

        const restDayRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.employeeRestDayTable
                this.state.employeeRestDayTable.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                //console.log(this.state.employeeRestDayTable)
              }
        };

        const columnWorkSchedule = [
            { dataField: 'date', text: 'Date',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'6%' }},
                style:{textAlign:'center'} },
            { dataField: 'location', text: 'Location',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'16%'}},
                style:{textAlign:'left'} },
            { dataField: 'workSchedule', text: 'Work Schedule',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'14%' }},
                style:{textAlign:'center'} },
            { dataField: 'timeIn', text: 'Time-In',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign:'center',width:'6%' }},
                style:{textAlign:'center'} },
            { dataField: 'firstBreakOut', text: '1st Break-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'9%' }},
            style:{textAlign:'center'} },
            { dataField: 'firstBreakIn', text: '1st Break-In',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'8%' }},
            style:{textAlign:'center'} },
            { dataField: 'secondBreakOut', text: '2nd Break-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'9%' }},
            style:{textAlign:'center'} },
            { dataField: 'secondBreakIn', text: '2nd Break-In',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'8%' }},
            style:{textAlign:'center'} },
            { dataField: 'thirdBreakOut', text: '3rd Break-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'9%' }},
            style:{textAlign:'center'} },
            { dataField: 'thirdBreakIn', text: '3rd Break-In',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'8%' }},
            style:{textAlign:'center'} },
            { dataField: 'timeOut', text: 'Time-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'7%' }},
            style:{textAlign:'center'} },
        ]

        const workScheduleRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };


         /* let addModalClose = () =>
            this.setState({
                checked: false
            }); */

            /* const content = this.state.checked
                ? <LeaveModal set//console={this.handleModalClose}  show={this.state.checked} onHide={addModalClose} selectedEmployeeIdvalue={this.state.selectedEmployeeId} />
            : null; */

            const minDate = new Date();

          return(
                <div>
                <Banner />
                    <Container fluid>
                    <Card className="mt-5">
                    <Card.Header>Timekeeping >> Employee Configuration</Card.Header>
                    <Card.Body>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.getClientList}
                                        placeholder="Select Client"

                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='employeeName'
                                        id="basic-example"
                                        onChange={this.onChangeEmployeesList}
                                        options={this.state.getEmployeeList}
                                        placeholder="Select Employee"
                                        autocomplete="false"
                                    />
                                </Form.Group>
                                
                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Employee No" 
                                        autoComplete="off" 
                                        name="employeeNo"
                                        value={this.state.selectedEmployeeNo}
                                        onChange={this.onChangeEmployeesNo.bind(this)}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Tabs className="mt-2" defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                <Tab eventKey="default" title="Default Configurations">
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12}>
                                            <Card className="card-tab">
                                                <div className="card-header-tab"></div>
                                                <Card.Body>
                                                <Form.Group as={Col} sm={12}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getLocationNames}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                                                        onChange={this.onChangeLocation}
                                                                        options={this.state.clientLocationList}
                                                                        placeholder="Select Branch"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>Effectivity Date :</Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='BranchDate'
                                                                        selected={this.state.BranchDate}
                                                                        onChange={this.handleChangePayBranchDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.BranchDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getPayTypes}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        onChange={this.onChangeEmployeesPayTypesList}
                                                                        options={this.state.getPayTypesList}
                                                                        placeholder="Select Pay Type"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0}>
                                                                    <Form.Label>Effectivity Date :</Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                                                    <DatePicker
                                                                        ref='payTypeDate'
                                                                        selected={this.state.payTypeDate}
                                                                        onChange={this.handleChangePayTypeDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.payTypeDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getPayModes}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        onChange={this.onChangeEmployeesPayModesList}
                                                                        options={this.state.getPayModesList}
                                                                        placeholder="Select Pay Mode"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0}  controlId="formGridPassword">
                                                                    <Form.Label>Effectivity Date :</Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='PayModesDate'
                                                                        selected={this.state.PayModesDate}
                                                                        onChange={this.handleChangePayModesDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.PayModesDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getPeriodType}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        onChange={this.handleChangePeriodTypesId}
                                                                        options={this.state.PeriodTypesId}
                                                                        placeholder="Select Period Type"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0}  controlId="formGridPassword">
                                                                    <Form.Label>Effectivity Date :</Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='PeriodTypesDate'
                                                                        selected={this.state.PeriodTypesDate}
                                                                        onChange={this.handleChangePeriodTypesDate}
                                                                        minDate={this.minDate}
                                                                        value={this.state.PeriodTypesDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getSalaryOffered}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Form.Control 
                                                                        type="text" 
                                                                        placeholder="Enter Salary Rate" 
                                                                        ref="salaryRate"
                                                                        autoComplete="off" 
                                                                        name="salaryRate"
                                                                        value={this.state.salaryRate}
                                                                        onChange={this.onChangeSalaryRate}/>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                        Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='SalaryRateDate'
                                                                        selected={this.state.SalaryRateDate}
                                                                        onChange={this.handleChangeSalaryRateDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.SalaryRateDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getEmployeeStatusTypes}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        onChange={this.onChangeEmployeesStatusList}
                                                                        options={this.state.getPayStatusList}
                                                                        placeholder="Select Status"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                            Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='StatusDate'
                                                                        selected={this.state.StatusDate}
                                                                        onChange={this.handleChangeStatusDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.StatusDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col><label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.currentTeamLead}</span></label></Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='employeeName'
                                                                        id="basic-example"
                                                                        onChange={this.onChangeEmployeesTeamLeadList}
                                                                        options={this.state.getEmployeesTeamLeadList}
                                                                        placeholder="Select Team Lead"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                            Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='TeamLeadDate'
                                                                        selected={this.state.TeamLeadDate}
                                                                        onChange={this.handleChangeTeamLeadDate}
                                                                        minDate={this.minDate}
                                                                        value={this.state.TeamLeadDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.currentCoordinator}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='employeeName'
                                                                        id="basic-example"
                                                                        onChange={this.onChangeEmployeesCoordinatorList}
                                                                        options={this.state.getEmployeesCoordinatorList}
                                                                        placeholder="Select Coordinator"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                            Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='CoordinatorDate'
                                                                        selected={this.state.CoordinatorDate}
                                                                        onChange={this.handleChangeCoordinatorDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.CoordinatorDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getWorkSchedule}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='description'
                                                                        id="basic-example"
                                                                        onChange={this.onChangeWorkScheduleIdList}
                                                                        options={this.state.getWorkScheduleList}
                                                                        placeholder="Select Work Schedule"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                        Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='WorkScheduleDate'
                                                                        selected={this.state.WorkScheduleDate}
                                                                        onChange={this.handleChangeWorkScheduleDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.WorkScheduleDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.gePayCardType}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        onChange={this.onChangePayCardType}
                                                                        options={this.state.getPayCardTypesList}
                                                                        placeholder="Select Pay Card Type"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                        Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='PayCardType'
                                                                        selected={this.state.PayCardType}
                                                                        onChange={this.handleChangePayCardType}
                                                                        minDate={this.minDate}
                                                                        value={this.props.PayCardType}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>   
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getPayCardNumber}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Enter Pay Card Number" 
                                                                        ref="txtpayCardNumber"
                                                                        autoComplete="off"
                                                                        name="txtpayCardNumber"
                                                                        value={this.state.txtpayCardNumber}
                                                                        onChange={this.onChangePayCardNumber}/>
                                                                </Form.Group>
                                                                <Form.Group as={Col}sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                        Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='PayCardNumber'
                                                                        selected={this.state.PayCardNumber}
                                                                        onChange={this.handleChangePayCardNumber}
                                                                        minDate={this.minDate}
                                                                        value={this.props.PayCardNumber}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>
                                                            </Form.Row>
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={6}>
                                                            <Form.Row>
                                                                <Col>
                                                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getPosition}</span></label>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                    <Typeahead
                                                                        labelKey='name'
                                                                        id="basic-example"
                                                                        onChange={this.onChangePosition}
                                                                        options={this.state.positionAutocomplete}
                                                                        placeholder="Select Job Position"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                    <Form.Label>
                                                                        Effectivity Date :
                                                                    </Form.Label>
                                                                </Form.Group>
                                                                <Form.Group as={Col} sm={2}>
                                                                    <DatePicker
                                                                        ref='PositionDate'
                                                                        selected={this.state.PositionDate}
                                                                        onChange={this.handleChangePositionDate}
                                                                        minDate={this.minDate}
                                                                        value={this.props.PositionDate}
                                                                        dateFormat={"MM/dd/yyyy"}
                                                                        className="form-control"
                                                                    />
                                                                </Form.Group>   
                                                            </Form.Row>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card> 
                                        </Form.Group>
                                    </Form.Row>      
                                </Tab>
                                <Tab eventKey="payroll" title="Payroll Configurations">
                                    <Form.Row>
                                    <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                        <Card className="card-tab">
                                            <div className="card-header-tab"></div>
                                            <Card.Body>
                                            <Form.Group as={Col} sm={12}>
                                                <Form.Row>
                                                    <Form.Group as={Col} sm={6}>
                                                        <Form.Row>
                                                            <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getSSSAmount}</span></label>
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                <Typeahead
                                                                    labelKey='sceeShare'
                                                                    id="basic-example"
                                                                    onChange={this.onChangeSSSBrackets}
                                                                    options={this.state.sssBrackets}
                                                                    placeholder="Select SSS Bracket"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                <Form.Label>
                                                                    Effectivity Date :
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={2}>
                                                                <DatePicker
                                                                    ref='sssAmountDate'
                                                                    selected={this.state.sssAmountDate}
                                                                    onChange={this.handleChangeSSSAmountDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.sssAmountDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} sm={6}>
                                                        <Form.Row>
                                                            <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getPHICAmount}</span></label>
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter PHIC Amount" 
                                                                    ref="phicAmount"
                                                                    autoComplete="off"
                                                                    name="phicAmount"
                                                                    value={this.state.phicAmount}
                                                                    onChange={this.onChangePHICAmount}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                <Form.Label>
                                                                    Effectivity Date :
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={2}>
                                                                <DatePicker
                                                                    ref='phicAmountDate'
                                                                    selected={this.state.phicAmountDate}
                                                                    onChange={this.handleChangePHICAmountDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.phicAmountDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} sm={6}>
                                                        <Form.Row>
                                                            <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getHDMFAmount}</span></label>
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter HDMF Amount" 
                                                                    ref="hdmfAmount"
                                                                    autoComplete="off"
                                                                    name="hdmfAmount"
                                                                    value={this.state.hdmfAmount}
                                                                    onChange={this.onChangeHDMFAmount}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                <Form.Label>
                                                                    Effectivity Date :
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={2}>
                                                                <DatePicker
                                                                    ref='hdmfAmountDate'
                                                                    selected={this.state.hdmfAmountDate}
                                                                    onChange={this.handleChangeHDMFAmountDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.hdmfAmountDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} sm={6}>
                                                        <Form.Row>
                                                            <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getHDMFAmount}</span></label>
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Cola Rate" 
                                                                    ref="colaValue"
                                                                    autoComplete="off"
                                                                    name="colaValue"
                                                                    value={this.state.colaValue}
                                                                    onChange={this.onChangeColaValue}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                <Form.Label>
                                                                    Effectivity Date :
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={2}>
                                                                <DatePicker
                                                                    ref='colaValueDate'
                                                                    selected={this.state.colaValueDate}
                                                                    onChange={this.handleChangeColaValueDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.colaValueDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} sm={6}>
                                                        <Form.Row>
                                                            <Col>
                                                                <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current:</span> <span style={{color: 'red'}}>{this.state.getHDMFAmount}</span></label>
                                                            </Col>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Sea Rate" 
                                                                    ref="seaRate"
                                                                    autoComplete="off"
                                                                    name="seaRate"
                                                                    value={this.state.seaRate}
                                                                    onChange={this.onChangeSeaValue}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                <Form.Label>
                                                                    Effectivity Date :
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={2}>
                                                                <DatePicker
                                                                    ref='seaValueDate'
                                                                    selected={this.state.seaValueDate}
                                                                    onChange={this.handleChangeSeaValueDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.seaValueDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </Form.Row>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Form.Group>
                                    </Form.Row>
                                </Tab>
                                <Tab eventKey="restday" title="Employee Restday">
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                            <Card className="card-tab">
                                                <div className="card-header-tab"></div>
                                                <Card.Body>
                                                    <Form.Group as={Col} sm={12}>
                                                        <Form.Row className="mt-2">
                                                            <Form.Group as={Col} sm={0} controlId="formGridEmail">
                                                                <DatePicker
                                                                    ref='RestDate'
                                                                    selected={this.state.RestDate}
                                                                    onChange={this.handleChangeRestDate}
                                                                    value={this.state.RestDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridPassword">
                                                                <Button style={{minWidth:'60px'}} className="ml-auto" variant="success" onClick={this.onSubmitAdd}>Add</Button>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridEmail">
                                                                <Card.Header>Restday List</Card.Header>
                                                                <BootstrapTable
                                                                    keyField = "restdate"
                                                                    data = { this.state.employeeRestDayTable}
                                                                    columns = { columnRestDay}
                                                                    selectRow = { restDayRow }
                                                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                                    rowClasses="noser-table-row-class"
                                                                    striped
                                                                    hover
                                                                    condensed
                                                                    />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>
                                <Tab eventKey="leave" title="Employee Leaves">
                                <Form.Row>
                                        <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                            <Card className="card-tab">
                                                <div className="card-header-tab"></div>
                                                <Card.Body>
                                                    <Form.Group as={Col} sm={12}>
                                                        <Form.Row className="mt-2">
                                                        <Form.Group as={Col} sm={0} controlId="formGridEmail">
                                                            <DatePicker
                                                                ref='FromDate'
                                                                selected={this.state.FromDate}
                                                                onChange={this.handleChangeFromDate}
                                                                value={this.state.FromDate}
                                                                dateFormat={"MM/dd/yyyy"}
                                                                style={{height:'40px !important'}}
                                                                size="40"
                                                                className="form-control"
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={2} controlId="formGridEmail">
                                                            <Form.Control 
                                                                type="number" 
                                                                min="0.5"
                                                                max="90"
                                                                step={0.5} precision={2}
                                                                value={this.state.duration}
                                                                onChange={this.onChangeDuration}
                                                                autoComplete="off"
                                                                //onKeyPress={e => /^[0-9]*\.?[0-9]*$/.test(e.key) && e.preventDefault()}
                                                                onKeyPress={this.IsNumeric.bind(this)}
                                                                placeholder="Duration"/>
                                                        </Form.Group>

                                                        <Form.Group as={Col} sm={3} controlId="formGridEmail">
                                                            <Typeahead
                                                                labelKey='name'
                                                                id="basic-example"
                                                                onChange={this.onChangeReasonToLeave}
                                                                options={this.state.reasonToLeave}
                                                                placeholder="Select Reason for Leave/ Absent"
                                                                inputProps={{ required: true }}
                                                            />
                                                            {/* <Form.Control 
                                                                type="text" 
                                                                placeholder="Reason for Leave/ Absent" 
                                                                value={this.state.reason}
                                                                onChange={this.onChangeReason}
                                                                autoComplete="off"/> */}
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm={0} controlId="formGridEmail">
                                                            <Form.Check label="Unpaid" onChange={e => this.handleChangeCheckboxLeave(e)}/>
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="formGridPassword">
                                                            <ButtonToolbar>
                                                                <Button style={{minWidth:'60px'}}  variant="success" onClick={this.onSubmitAddLeave}>Add</Button>
                                                            </ButtonToolbar>
                                                        </Form.Group>
                                                        </Form.Row>
                                                        <div>
                                                        <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridPassword">
                                                            <Card.Header>Leaves List</Card.Header>
                                                            <BootstrapTable
                                                                    keyField = "leaveDate"
                                                                    data = { this.state.LeavedayDataList }
                                                                    columns = { columnLeaveTable }
                                                                    selectRow = { employeeLeaveRow }
                                                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                                    rowClasses="noser-table-row-class"
                                                                    striped
                                                                    hover
                                                                    condensed
                                                                />
                                                        </Form.Group>
                                                        </Form.Row>
                                                        </div>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>
                                <Tab eventKey="schedule" title="Employee Schedules">
                                    <Form.Row>
                                    <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                        <Card className="card-tab">
                                            <div className="card-header-tab"></div>
                                            <Card.Body>
                                                <Form.Group as={Col} sm={12}>
                                                    <Form.Row className="mt-2">
                                                        <Form.Group as={Col} sm={3} >
                                                            <Typeahead
                                                                labelKey='payPeriod'
                                                                id="basic-example"
                                                                onChange={this.onChangePayPeriod}
                                                                options={this.state.payPeriodList}
                                                                placeholder="Select Payroll Period"
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                    <Form.Group  controlId="formGridPassword" as={Col}>
                                                        <Card.Header>Schedule List</Card.Header>
                                                        <BootstrapTable
                                                            wrapperClasses="table-responsive"
                                                            rowClasses="noser-table-row-class"
                                                            keyField = "id"
                                                            data = { this.state.employeeWorkScheduleTable }
                                                            columns = { columnWorkSchedule }
                                                            selectRow = { workScheduleRow }
                                                            cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                            rowClasses="noser-table-row-class"
                                                            striped
                                                            hover
                                                            condensed
                                                            expandRow
                                                            pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true}) }
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Form.Group>
                                    </Form.Row>
                                </Tab>
                            </Tabs>
                            
                        </Form>
                        <ButtonToolbar className="mt-2" style={{marginLeft:"-8px"}}>
                            <Button style={{minWidth:'60px'}} variant="success" onClick={this.onSubmitSaveEmployee}>Save</Button>&nbsp;&nbsp;&nbsp;
                            <Button style={{minWidth:'60px'}} variant="danger" href="/banner">Close</Button>
                        </ButtonToolbar>
                    </Card.Body>
                </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                </div>
        )
    }

}

export  default EmployeeConfig
