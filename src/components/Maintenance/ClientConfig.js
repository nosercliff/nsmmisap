
import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState, Tabs, Tab
} 
from '../../noser-hris-component';
import 'rc-time-picker/assets/index.css';


const DateToformat = 'h:mm';
const DateFromformat = 'h:mm';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const now = moment().hour(0).minute(0);

class ClientConfig extends Component {
 
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

            getClientList: [],
            isCheckedLate: "0",
            isCheckedSunday: "0",
            lateAllowanceMins: '10',
            isCheckedPermanent: "0",
            isCheckedDeduction: "0",
            payableOvertimeMins: '10',
            holidayGridList: [],
            setHolidayId: [],
            DateHired: '',
            txtMaxLeaves: '',
            txtRangeFrom: '',
            txtRangeTo: '',
            OBBracket: [],
            OBBracketDetails: [],
            PayrollConfiguration: [],
            PayrollConfigurationTable: [],

            checkIsBasic: true,
            disabledIsBasic: true,
            IsBasic: true,
            IsPremium: false,
            workingDays: '',
            payDay: '',
            ceilingAmount: '',
            FirstCutOff: false,
            SecondCutOff: false,
            ThirdCutOff: false,
            FourthCutOff: false,


            contributionTypeList: [],
            payModesList: [],
            periodTypesList: [],
            disabledPeriodType: false,
            
            checkFirst : false,
            checkSecond : false,
            checkThird : false,
            checkFourth : false,

            isDateHired : false,
            isFistOfTheYear : false,

            isExcessDeduction   :   true,
            isLateDeduction     :   false,
            LateDeduction       :   '',

            disabledFirst: true,
            disabledSecond: true,
            disabledThird: true,
            disabledFourth: true,

            disabledPayDay: true,
            disabledWorkingDays: true,

            selectedLateAllowance    : '',
            selectedPayableOvertime  : '',
            selectedNightDiffStart   : '',
            selectedNightDiffEnd     : '',
            selectedMaxLeaves        : '',
            selectedContributionType : '',
            periodTyped : '',
            selectedPeriodType : [],

            valueFrom: moment(),
            valueTo: moment(),

            DateHired : "",
            PayrollConfigurationAddList : [],
            CreatedOBBracket : [],

            semiMonthly: '',
            valueTimeFrom : '',
            valueTimeTo : '',
            CreatedOBBrackets:[],
            PayrollConfigurations : [],
            checkIsAllLateDeduction     :   true,

            selectedPeriodTypeId:"",
            selectedPeriodTypeName:""
        }
    }

    state = {
        selectedClient: [],
    };
    handleChangeCheckbox(e) {
        /* let isCheckedIsBasicSalary = e.target.checked ? "1" : "0";
        console.log(isCheckedIsBasicSalary) */
        this.setState({[e.target.name]: e.target.checked})

        console.log(e.target.name + " " + e.target.checked)
    }

    handleChangeCheckboxIsBasicSalary(e) {
        /* let isCheckedIsBasicSalary = e.target.checked ? "1" : "0";
        console.log(isCheckedIsBasicSalary) */
        this.setState({
            IsBasicSalary: e.target.checked
        })
    }

    handleChangeCheckboxIsPremium(e) {
        /* let isCheckedIsPremium = e.target.checked ? "1" : "0";
        console.log(isCheckedIsPremium) */
        this.setState({
            IsPremium: e.target.checked
        })
    }

    handleChangeCheckboxFirstCutOff(e) {
        /* let isCheckedSSSFirstCutOff = e.target.checked ? "1" : "0";
        console.log(isCheckedSSSFirstCutOff) */
        
        this.setState({
            FirstCutOff: e.target.checked
        })
    }

    handleChangeCheckboxSecondCutOff(e) {
        /* let isCheckedSSSecondCutOff = e.target.checked ? "1" : "0";
        console.log(isCheckedSSSecondCutOff) */
        this.setState({
            SecondCutOff: e.target.checked
        })
    }

    handleChangeCheckboxThirdCutOff(e) {
        /* let isCheckedSSSThirdCutOff = e.target.checked ? "1" : "0";
        console.log(isCheckedSSSThirdCutOff) */
        this.setState({
            ThirdCutOff: e.target.checked
        })
    }

    handleChangeCheckboxFourthCutOff(e) {
        /* let isCheckedSSSFourthCutOff = e.target.checked ? "1" : "0";
        console.log(isCheckedSSSFourthCutOff) */
        this.setState({
            FourthCutOff: e.target.checked
        })
    }

    OnChangeIsFistOfTheYear = () =>{
        this.setState({
            isDateHired : false,
            isFistOfTheYear : true,
            DateHired : "0"
        })
    }

    OnChangeIsDateHired = (e) => {
        this.setState({
            isFistOfTheYear : false,
            isDateHired : true,
            DateHired : e.target.value
        })
    }

    handleChangeCheckboxUse(e) {
        this.setState({
            Use: e.target.checked
        })
    }

    OnChangeIsExcessDeduction = () =>{
        this.setState({
            isExcessDeduction : true,
            isLateDeduction : false,
            LateDeduction : "0"
        })
    }

    OnChangeIsLateDeduction = (e) => {
        this.setState({
            isExcessDeduction : false,
            isLateDeduction : true,
            LateDeduction : e.target.value
        })
    }

    /* handleCheckboxIsAllLateDeduction(e) {
        this.setState({
            lateDeduction: e.target.checked
        })

        if(this.state.checkIsAllLateDeduction == true) {
            this.setState({
                checkIsAllLateDeduction     :   false
            })
        }
        if(this.state.checkIsAllLateDeduction == false) {
            this.setState({
                checkIsAllLateDeduction     :   true
            })
        }
    } */


    getClientConfigRefresh(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId ,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientConfigurations", getParams)
            .then(res => {
                console.log("Get Client Configurations");
                const data = res.data
                console.log(data);
                
                console.log("Get contributions Data");
                console.log(data.contributions);
                console.log(this.state.selectedContributionType)
                console.log(this.state.ceilingAmount)
                this.setState({

                    lateAllowanceMins           :   data.lateAllowance,
                    payableOvertimeMins         :   data.payableOvertime,
                    valueTimeFrom               :   data.nightDiffStart,
                    valueTimeTo                 :   data.nightDiffEnd,
                    txtMaxLeaves                :   data.maxLeaves,
                    PayrollConfigurationTable   :   data.contributions,
                    OBBracket                   :   data.overbreakBrackets,
                    isloading                   :   false,
                })
                /* let valueTimeFrom = moment(this.state.valueTimeFrom).format('HH:mm'); */
                /* this.setState({
                    valueFrom : valueTimeFrom
                }) */
                console.log("valueTimeFrom")
                console.log(this.state.valueTimeFrom)

                if(data.isDateHired == 0){
                    this.setState({
                        isFistOfTheYear : true,
                        DateHired : "0"
                    })
                }
                if(data.isDateHired == 1){
                    this.setState({
                        isDateHired : true,
                        DateHired : "1"
                    })
                }
                var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                {
                    isloading   :   false,
                    AlertType   :   "Success!", 
                    show        :   true,
                    color       :   alertType,
                    message     :   data.message ,
                    fade        :   true,
                });
            })
    }


    onSubmitSaveClientConfig = () => {

        /* this.setState({isloading:true,}) */
        

        if(this.state.lateAllowanceMins=="")
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter minutes for late allowance.",
                fade        :   true
            });
            return
        }
        if(this.state.payableOvertimeMins=="")
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter range minutes payable overtime",
                fade        :   true
            });
            return
        }
        if(this.state.txtMaxLeaves=="")
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter max day leaves for allowable leaves",
                fade        :   true
            });
            return
        }
        if(this.state.checkIsAllLateDeduction == true){
            this.state.lateDeduction = "0"
        }else {
            this.state.lateDeduction = "1"
        }

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "LateAllowance":this.state.lateAllowanceMins,
            "PayableOvertime": this.state.payableOvertimeMins,
            "NightDiffStart": this.state.Fromvalue,
            "NightDiffEnd": this.state.Tovalue,
            "MaxLeaves": this.state.txtMaxLeaves,
            /* "IsDateHired": (this.state.DateHired)? "1" : "0", */
            "IsDateHired": this.state.DateHired,
            "OverbreakBrackets":this.state.CreatedOBBrackets,
            "Contributions": this.state.PayrollConfigurationTable,
            "IsAllLateDeduction" : this.state.LateDeduction,
        }

        console.log("Submit Parameters")
        console.log(getParams)
        

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/SaveClientConfiguration", getParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    isloading       :   false,
                    isshow          :   false,
                })
                this.getClientConfig()
                if(data.status=="1")
                {
                    this.setState({ 
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
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


    onChangetxtMaxLeaves = (e) => {
        this.setState({ txtMaxLeaves: e.target.value} )
    }

    onChangeRangeFrom = (e) => {
        this.setState({ txtRangeFrom: e.target.value} );
    }

    onChangeRangeTo = (e) => {
        this.setState({ txtRangeTo: e.target.value} );
    }
    FormatCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
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

    /* handleChangeCheckboxPermanent = (e) => {
        let Permanent = e.target.checked ? "1" : "0";
        this.setState({
            isCheckedPermanent: Permanent
        })
        
    } */

    /* handleChangeCheckboxDeduction = (e) => {
        let Deduction = e.target.checked ? "1" : "0";
        this.setState({
            isCheckedDeduction: Deduction
        })
        
    } */

    /* handleChangeCheckboxLate = (e) => {
        let Late = e.target.checked ? "1" : "0";
        this.setState({
            isCheckedLate: Late
        })
        
    } */

    /* handleChangeCheckboxSunday = (e) => {
        let Sunday = e.target.checked ? "1" : "0";
        this.setState({
            isCheckedSunday: Sunday
        })
        
    } */

    getContributionType(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetMandatoryContributionTypes", getParams)
            .then(res => {
                console.log("Get Mandatory Contribution Types");
                const data = res.data
                console.log(data);
                this.setState({
                    isloading:false,
                    contributionTypeList : data.contributionTypes
                })
            })
    }

    onChangeContributionType = (e) => {

        if(e.length == 0) {
            this.state.selectedContributionTypeId=""
            this.state.selectedContributionTypeName=""
            return
        } 
        this.state.selectedContributionTypeId = e[0].id
        this.state.selectedContributionTypeName = e[0].name

        if(this.state.selectedContributionTypeName == "HDMF") {
            this.setState({ceilingAmount : "100"})
        }
        if(this.state.selectedContributionTypeName == "SSS") {
            this.setState({ceilingAmount : "0"})
        }
        if(this.state.selectedContributionTypeName == "PHIC") {
            this.setState({ceilingAmount : "0"})
        }
    }

    GetEmployeePayModesList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollModes", getParams)
            .then(res => {
                console.log("Get Employee Payroll Modes List ");
                console.log(res.data);
                this.setState({
                    payModesList : res.data.payrollModes
                })
            })
    
    }



    onChangeEmployeesPayModesList = (e) =>{
        if(e.length == 0) {
            this.state.selectedPayModeId=""
            this.state.selectedPayModeName=""
            return
        } 
        this.state.selectedPayModeId = e[0].id
        this.state.selectedPayModeName = e[0].name
        this.GetPeriodTypes();
        if(this.state.selectedPayModeId == 1){
            this.setState({
                workingDays : "26",
                payDay : "",
                disabledPeriodType : false,
                disabledFirst: true,
                disabledSecond: true,
                disabledThird: true,
                disabledFourth: true,

                disabledPayDay: false,
                disabledWorkingDays: false,

                FirstCutOff : false,
                SecondCutOff : false,
                ThirdCutOff : false,
                FourthCutOff : false,

                checkFirst : false,
                checkSecond : false,
                checkThird : false,
                checkFourth : false,
            })
        }
      
        if(this.state.selectedPayModeId == 2){
            this.setState({
                periodTypesList: [],
                /* selectedPeriodTypeId : "", */
                workingDays : "0",
                payDay : "0",
                disabledPeriodType : true,
                disabledFirst: false,
                disabledSecond: false,
                disabledThird: false,
                disabledFourth: false,

                disabledPayDay: true,
                disabledWorkingDays: true,

                checkFirst : true,
                checkSecond : true,
                checkThird : true,
                checkFourth : true,

                FirstCutOff : true,
                SecondCutOff : true,
                ThirdCutOff : true,
                FourthCutOff : true,

            })
        }

        if(this.state.selectedPayModeId == 3){
            this.setState({
                periodTypesList: [],
                workingDays : "0",
                payDay : "0",
                disabledPeriodType : true,
                disabledFirst: false,
                disabledSecond: false,
                disabledThird: false,
                disabledFourth: false,

                disabledPayDay: true,
                disabledWorkingDays: true,

                checkFirst : true,
                checkSecond : true,
                checkThird : true,
                checkFourth : true,

                FirstCutOff : true,
                SecondCutOff : true,
                ThirdCutOff : true,
                FourthCutOff : true,
            })
        }

        if(this.state.selectedPayModeId == 4){
            this.setState({
                periodTypesList: [],
                workingDays : "0",
                payDay : "0",
                disabledPeriodType : true,
                disabledFirst: false,
                disabledSecond: false,
                disabledThird: false,
                disabledFourth: false,

                disabledPayDay: true,
                disabledWorkingDays: true,

                checkFirst : true,
                checkSecond : true,
                checkThird : true,
                checkFourth : true,

                FirstCutOff : true,
                SecondCutOff : true,
                ThirdCutOff : true,
                FourthCutOff : true,
            })
        }
    }

    GetPeriodTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "PayModeId":this.state.selectedPayModeId,
            
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPeriodTypes", getParams)
        .then(res => {
            console.log("Get Period Types");
            const data = res.data
            console.log(data); 
            this.setState({periodTypesList : data.periodTypes}) 
        })
    }

    handleChangePeriodTypes = (e) =>{
        if(e.length == 0) {
            this.state.selectedPeriodTypeId=""
            this.state.selectedPeriodTypeName=""
            this.state.selectedPayout = ""
            return
        } 
        this.state.selectedPeriodTypeId = e[0].id
        this.state.selectedPeriodTypeName = e[0].name
        this.state.selectedPayout = e[0].payOut

    }
    
    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isloading:false})
        })
        
        this.getClient();
    }


    getClientData(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId ,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientConfigurations", getParams)
            .then(res => {
                console.log("Get Client Configurations");
                const data = res.data
                console.log(data);
            })
    }

    getClient(){
        this.setState({isloading:true,})

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
            .then(res => {
                console.log("Client List ");
                console.log(res.data);
                this.setState({
                    isloading:false,
                    getClientList : res.data.clients
                })
            })
    }

    GetClientId(name) {
        console.log("Client ID List ");
        let GetClientId = ''
        for (let i = 0; i <= this.state.getClientList.length; i++) {
            if (this.state.getClientList[i]["name"] === name) {
                GetClientId = this.state.getClientList[i]['id'];
                console.log(GetClientId);
                break;
            }
        }
        return GetClientId
    }

    getClientConfig(){
        /* this.setState({isloading:true,loadingText:"Processing your request..."}) */
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId ,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientConfigurations", getParams)
            .then(res => {
                console.log("Get Client Configurations");
                const data = res.data
                console.log(data);
                
                console.log("Get contributions Data");
                console.log(data.contributions);
                console.log(this.state.selectedContributionType)
                console.log(this.state.ceilingAmount)


                let today = new Date();
                let valueFrom = new moment();
                let valueTo = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();

                valueFrom = moment(mm + '/' + dd + '/' + yyyy + ' ' + data.nightDiffStart);
                valueTo = moment(mm + '/' + dd + '/' + yyyy + ' ' + data.nightDiffEnd);

                this.setState({

                    lateAllowanceMins           :   data.lateAllowance,
                    payableOvertimeMins         :   data.payableOvertime,
                    valueFrom                   :   valueFrom,//data.nightDiffStart,
                    valueTo                     :   valueTo,//data.nightDiffEnd,
                    txtMaxLeaves                :   data.maxLeaves,
                    PayrollConfigurationTable   :   data.contributions,
                    OBBracket                   :   data.overbreakBrackets,
                    isloading                   :   false,
                })
                /* let valueTimeFrom = moment(this.state.valueTimeFrom).format('HH:mm'); */
                /* this.setState({
                    valueFrom : valueTimeFrom
                }) */
                console.log("valueTimeFrom")
                console.log(this.state.valueTimeFrom)

                if(data.isDateHired == 0){
                    this.setState({
                        isFistOfTheYear : true,
                        DateHired : "0"
                    })
                }
                if(data.isDateHired == 1){
                    this.setState({
                        isDateHired : true,
                        DateHired : "1"
                    })
                }
                
                if(data.isAllLateDeduction == 0){
                    this.setState({
                        isExcessDeduction : true,
                        isLateDeduction : false,
                        LateDeduction : "0"
                    })
                    /* this.state.checkIsAllLateDeduction = true */
                }
                if(data.isAllLateDeduction == 1){
                    this.setState({
                        isLateDeduction : true,
                        isExcessDeduction : false,
                        LateDeduction : "1"
                    })
                    /* this.state.checkIsAllLateDeduction = false */
                }
                /* var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                {
                    isloading   :   false,
                    AlertType   :   "Success!", 
                    show        :   true,
                    color       :   alertType,
                    message     :   data.message ,
                    fade        :   true,
                }); */
            })
    }

    onChangeClientList = (e) => {
       
        if(e.length == 0) {
            this.state.selectedClientId         =''
            this.state.lateAllowanceMins        = ''
            this.state.selectedPayableOvertime  = ''
            this.state.selectedNightDiffStart   = ''
            this.state.selectedNightDiffEnd     = ''
            this.state.selectedMaxLeaves        = ''
            this.state.selectedContributionType = ''

            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.lateAllowanceMins = e[0].lateAllowance

        this.getClientConfig();
        this.getContributionType();
        this.GetEmployeePayModesList();
    }

    onChangelateAllowanceMins = (e) => {
        this.setState({ lateAllowanceMins: e.target.value} );
    }

    onChangeWorkingDays = (e) => {
        this.setState({ workingDays: e.target.value} );
    }

    

    onChangePayDay = (e) => {
        this.setState({ payDay: e.target.value} );
    }


    onChangepayableOvertimeMins = (e) => {
        this.setState({ payableOvertimeMins: e.target.value} );
    }
  

    onChangeFrom = (Fromvalue) => {
        console.log("format");
        console.log(Fromvalue);
        this.state.Fromvalue = Fromvalue && Fromvalue.format(str)
    } 

    onChangeTo = (Tovalue) => {
        console.log("format");
        console.log(Tovalue);
        this.state.Tovalue = Tovalue && Tovalue.format(str)
    }
    
    

    onSubmitOB = (e) => {

        let RangeFrom = this.state.txtRangeFrom
        let RangeTo = this.state.txtRangeTo
        if(RangeFrom=="")
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter range from overbreak brackets.",
                fade        :   true
            });
            return
        }
        if(RangeTo=="")
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter range to overbreak brackets.",
                fade        :   true
            });
            return
        }

        if(this.state.txtRangeFrom == "" || this.state.txtRangeTo == ""){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter Overbreak bracket",
                fade        :   true
            });
            return
        }
        if(this.state.txtRangeFrom==this.state.txtRangeTo ){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "From and To not valid same value.",
                fade        :   true
            });
            return
        }


        let lstRange = this.state.OBBracket
        let lstRangeTow = this.state.OBBracket
    
        if(lstRange.length>0 || lstRangeTow.length>0)
        {
            for(let i=0;i<lstRange.length;i++)
            {
                if(lstRange[i].RangeFrom==RangeFrom){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   "Range From already exist.",
                        fade        :   true
                    });
                    return 
                }

                if(lstRange[i].RangeTo==RangeTo){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   "Range To already exist.",
                        fade        :   true
                    });
                    return 
                }

            }

            for(let i=0;i<lstRangeTow.length;i++)
            {

                if(lstRangeTow[i].rangeTo==RangeTo & lstRangeTow[i].rangeTo==RangeTo){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   "Range already exist in Overbreak Brackets List.",
                        fade        :   true
                    });
                    return 
                }

            }


        }

        const {CreatedOBBracket} = this.state
        const Detail = []
        const {OBBracket} = this.state

        const obj = {
            "Id":"0",
            "RangeFrom" : RangeFrom,
            "RangeTo" : RangeTo,
            "isDeleted" : "0"
        }


        if(lstRange.length>0)
        {
            for(let i=0;i<lstRange.length;i++)
            {
                if(lstRange[i].RangeFrom==RangeFrom){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   "Range From already exist in Overbreak Brackets List.",
                        fade        :   true
                    });
                    return 
                }
                if(lstRange[i].RangeTo==RangeTo){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   "Range To already exist in Overbreak Brackets List.",
                        fade        :   true
                    });
                    return 
                }
            }
        }

        for(let i=0;i<this.state.CreatedOBBrackets.length;i++)
        {
            if(this.state.CreatedOBBrackets[i].RangeFrom==RangeFrom){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Range From already added.",
                    fade        :   true
                });
                return 
            }
            if(this.state.CreatedOBBrackets[i].RangeTo==RangeTo){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Range To already added.",
                    fade        :   true
                });
                return 
            }
        }
        CreatedOBBracket.push(obj)

        
        console.log(obj.RangeFrom)
        console.log(obj.RangeTo)
        console.log("Object Array List")
        console.log(obj)

        this.setState({CreatedOBBrackets: CreatedOBBracket})
        this.setState({
            isloading   :   false,
            alerttype   :   "Success!",
            isshow      :   true,
            color       :   "success",
            message     :   "Overbreak Configuration successfully added.",
            fade        :   true
        });

    }


    setMaxDayLeaves(event) {
        this.setState({
            DateHired : event.target.value
        })
        console.log(this.state.DateHired);
      }

    onChangeCeilingAmount = (e) => {
        this.setState({ ceilingAmount: e.target.value} );
    }

    onSubmitPayrollConfig = (e) => {
        
        if(!this.state.selectedClientId){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select client.",
                fade        :   true
            });
            return
        }

        if(!this.state.selectedContributionTypeId){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select contribution type.",
                fade        :   true
            });
            return
        }

        if(!this.state.selectedPayModeId){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select pay mode.",
                fade        :   true
            });
            return
        }

        if(this.state.selectedPayModeId == 1){
            if(!this.state.selectedPeriodTypeId) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select period type.",
                    fade        :   true
                });
                return
            }

            if(this.state.payDay == "") {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Invalid pay day.",
                    fade        :   true
                });
                return
            }

            let payout1st = this.state.selectedPayout.toString().split('/')[0]
            let payout2nd = this.state.selectedPayout.toString().split('/')[1]
            
            if(this.state.payDay!=payout1st && this.state.payDay!=payout2nd){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Invalid pay day. Please enter either " + payout1st + " or " + payout2nd,
                    fade        :   true
                });
                return
            }

            if(this.state.workingDays == "" || parseInt(this.state.workingDays)<=0) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Invalid working days in 1 Month.",
                    fade        :   true
                });
                return
            }
        }
        
        const obj = {
            "id":"0",
            "contributionTypeId" : this.state.selectedContributionTypeId,
            "payModeId" : this.state.selectedPayModeId,
            "periodTypeId" : this.state.selectedPeriodTypeId,
            "isBasic" : (this.state.IsBasic)? "1" : "0",
            "isPremium" : (this.state.IsPremium)? "1" : "0",
            "ceilingAmount" : this.state.ceilingAmount ? this.FormatCommas(parseFloat(this.state.ceilingAmount).toFixed(2)) : "0",
            "workingDaysInMonth" : this.state.workingDays,
            "payDay" : this.state.payDay,
            "firstCutOff" : (this.state.FirstCutOff)? "1" : "0",
            "secondCutOff" : (this.state.SecondCutOff)? "1" : "0",
            "thirdCutOff" : (this.state.ThirdCutOff)? "1" : "0",
            "fourthCutOff" : (this.state.FourthCutOff)? "1" : "0",
            "isDeleted" : "0",

            "contributionType":this.state.selectedContributionTypeName,
            "payrollMode":this.state.selectedPayModeName,
            "periodType":this.state.selectedPeriodTypeName,
            "basic":(this.state.IsBasic)? "YES" : "NO",
            "premium":(this.state.IsPremium)? "YES" : "NO",
            "firstCutOffLabel":(this.state.FirstCutOff)? "YES" : "NO",
            "secondCutOffLabel":(this.state.SecondCutOff)? "YES" : "NO",
            "thirdCutOffLabel":(this.state.ThirdCutOff)? "YES" : "NO",
            "fourthCutOffLabel":(this.state.FourthCutOff)? "YES" : "NO",
        }
        let isNew = true;
        const lstRange = this.state.PayrollConfigurationTable
        lstRange.forEach(itm => {
            if(itm.contributionTypeId==obj.contributionTypeId &&
                itm.payModeId==obj.payModeId)
                {
                    itm.periodTypeId=obj.periodTypeId
                    itm.isBasic=obj.isBasic
                    itm.isPremium=obj.isPremium
                    itm.ceilingAmount=obj.ceilingAmount
                    itm.workingDaysInMonth=obj.workingDaysInMonth
                    itm.payDay=obj.payDay
                    itm.FirstCutOff=obj.firstCutOff
                    itm.SecondCutOff=obj.secondCutOff
                    itm.ThirdCutOff=obj.thirdCutOff
                    itm.FourthCutOff=obj.fourthCutOff

                    itm.contributionType = obj.contributionType
                    itm.payrollMode = obj.payrollMode
                    itm.periodType = obj.periodType
                    itm.basic = obj.basic
                    itm.premium = obj.premium
                    itm.firstCutOffLabel = obj.firstCutOffLabel
                    itm.secondCutOffLabel = obj.secondCutOffLabel
                    itm.thirdCutOffLabel = obj.thirdCutOffLabel
                    itm.fourthCutOffLabel = obj.fourthCutOffLabel
                    isNew=false
                }
        });
        if(isNew){
            lstRange.push(obj)
        }
        this.setState({PayrollConfigurationTable: lstRange}) 
    }

    LeavePagewithoutSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.PayrollConfigurationTable.length; i++) {
            if(this.state.PayrollConfigurationTable[i]["isModified"] ==1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }
    GridDataModified(oldValue, newValue, id, column) {
        this.state.PayrollConfigurationTable.map(function(item,i) {
            if(item.id===id)
            item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    onRemovePayrollConfig = () => {

        let listPayroll = this.state.PayrollConfigurationAddList
        for( var i = 0; i < listPayroll.length; i++){ 
            console.log(listPayroll[i].IsSelected)
            if ( listPayroll[i].IsSelected === 1) {
                listPayroll.splice(i, 1); 
                i--;
            }
            }
        
        this.setState({PayrollConfigurationAddList:listPayroll})
    }

    render() {
        const columnOBBracket = [
            {
                dataField: 'rangeFrom',
                text: 'From',
                headerStyle: () => {
                    return { width: "6%", textAlign:'center' };
                  },
                style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'rangeTo',
                text: 'To',
                headerStyle: () => {
                    return { width: "94%",textAlign:'left' };
                  },
                  style:()=>{
                    return {textAlign:'left'}
                }
            },
        ]

        const columnCreatedOBBracket = [
            {
                dataField: 'RangeFrom',
                text: 'From',
                headerStyle: () => {
                    return { width: "10%" };
                  }
            },
            {
                dataField: 'RangeTo',
                text: 'To',
                headerStyle: () => {
                    return { width: "90%", textAlign:'left' };
                  }
            },
        ]

        const employeeOBBracketRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                
             }
        };

        const payrollConfigurationColumn = [
            {
                dataField: 'contributionType',
                text: 'Contribution',
                headerStyle: () => {
                    return { width:'8%',textAlign:'center' };
                  },
                style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'payrollMode',
                text: 'Pay Mode',
                headerStyle: () => {
                    return { width: "12%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            ,
            {
                dataField: 'periodType',
                text: 'Period Type',
                headerStyle: () => {
                    return { width: "22%",textAlign:'left' };
                  },
                  style:()=>{
                    return {textAlign:'left'}
                }
            },
            {
                dataField: 'basic',
                text: 'Basic',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'premium',
                text: 'Premium',
                headerStyle: () => {
                    return { width: "8%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'ceilingAmount',
                text: 'Ceiling',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'right'}
                }
            },
            {
                dataField: 'workingDaysInMonth',
                text: 'Day',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'payDay',
                text: 'Pay Day',
                headerStyle: () => {
                    return { width: "8%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'firstCutOffLabel',
                text: '1st',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'secondCutOffLabel',
                text: '2nd',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'thirdCutOffLabel',
                text: '3rd',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            },
            {
                dataField: 'fourthCutOffLabel',
                text: '4th',
                headerStyle: () => {
                    return { width: "6%",textAlign:'center' };
                  },
                  style:()=>{
                    return {textAlign:'center'}
                }
            }
        ]

        const selectRowPayrollConfig = {
            mode: 'checkbox',
            clickToSelectAndEditCell: false,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log(isSelect)
                this.state.PayrollConfigurationTable.map(function(item,idx){
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                }) 
                console.log(this.state.PayrollConfigurationTable)
            }
        };


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

        const formatFromTime = 'HH:mm';
        
    return(
        <div>
            <Banner />
            <Container fluid>
                <Card className="mt-5" >
                    <Card.Header>Timekeeping >> Client Configuration</Card.Header>
                    <Card.Body>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={5}>
                                    <Typeahead
                                    
                                        labelKey='name'
                                        id="basic-example"
                                        /* value={this.state.clientType} */
                                        onChange={this.onChangeClientList}
                                        options={this.state.getClientList}
                                        placeholder="Select Client"
                                    />
                                </Col>
                            </Form.Group>
                            <Tabs defaultActiveKey="default" transition={false} id="noanim-tab-example">
                            <Tab eventKey="default" title="Default Configurations">
                                <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                    <Card className="card-tab">
                                        <div className="card-header-tab"></div>
                                        <Card.Body>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={3}>
                                                <fieldset className="border p-2">
                                                    <legend className="w-auto">Late Allowance</legend>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                            <Form.Control 
                                                                type="text"
                                                                onKeyPress={this.IsNumeric.bind(this)}
                                                                ref="lateAllowanceMins"
                                                                autoComplete="off" 
                                                                name="lateAllowanceMins"
                                                                value={this.state.lateAllowanceMins}
                                                                onChange={this.onChangelateAllowanceMins.bind(this)}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm="0" controlId="formGridPassword">
                                                            <Form.Label>
                                                                mins
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col}>
                                                        <div >
                                                            <input 
                                                                type="radio" 
                                                                value="0" 
                                                                name="excessDeduction" 
                                                                checked={this.state.isExcessDeduction}
                                                                onChange={this.OnChangeIsExcessDeduction}
                                                            /> Excess GP Deduction &nbsp;&nbsp;&nbsp;
                                                            <input 
                                                                type="radio" 
                                                                value="1" 
                                                                name="lateDeduction"
                                                                checked={this.state.isLateDeduction}
                                                                onChange={this.OnChangeIsLateDeduction}
                                                                />All Late Deduction
                                                        </div>
                                                            {/* <Form.Check 
                                                                type="checkbox" 
                                                                label="Is All Late Deduction"
                                                                onChange={e => this.handleCheckboxIsAllLateDeduction(e)}
                                                                checked={this.state.checkIsAllLateDeduction}
                                                                
                                                            /> */}
                                                        </Form.Group>
                                                    </Form.Row>
                                                </fieldset>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={3}>
                                                <fieldset className="border p-2">
                                                    <legend className="w-auto">Payable Overtime</legend>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridEmail">
                                                                <Form.Control 
                                                                    onKeyPress={this.IsNumeric.bind(this)}
                                                                    type="text" 
                                                                    ref="payableOvertimeMins"
                                                                    autoComplete="off" 
                                                                    name="payableOvertimeMins"
                                                                    value={this.state.payableOvertimeMins}
                                                                    onChange={this.onChangepayableOvertimeMins.bind(this)}
                                                                />
                                                        </Form.Group>
                                                        <Form.Group as={Col} sm="0" controlId="formGridPassword">
                                                            <Form.Label>
                                                                mins
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Form.Row>
                                                </fieldset>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={3}>
                                                <fieldset className="border p-2">
                                                    <legend className="w-auto">Night Differential</legend>
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Row>
                                                            <Form.Group as={Col} sm={0} controlId="formGridEmail">
                                                                <Form.Label>
                                                                    From
                                                                </Form.Label>
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={3} controlId="formGridEmail">
                                                                <TimePicker 
                                                                    showSecond={showSecond}
                                                                    value={this.state.valueFrom}
                                                                    defaultValue={this.state.valueFrom}
                                                                    className="xxx"
                                                                    onChange={this.onChangeFrom}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} sm={2} controlId="formGridEmail">
                                                            </Form.Group>

                                                            <Form.Group as={Col} sm={0} controlId="formGridPassword">
                                                                <Form.Label>
                                                                    To
                                                                </Form.Label>
                                                            </Form.Group>
                                                            
                                                            <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                                                <TimePicker 
                                                                    showSecond={showSecond}
                                                                    value={this.state.valueTo}
                                                                    defaultValue={this.state.valueTo}
                                                                    className="xxx"
                                                                    onChange={this.onChangeTo}
                                                                />
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form.Group>
                                                </fieldset>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={3}>
                                                <fieldset className="border p-2">
                                                    <legend className="w-auto">Allowable Leaves</legend>
                                                    <Form.Group as={Col}controlId="formGridPassword">
                                                        {/* <Form.Label>Max Leaves</Form.Label> */}
                                                        <Form.Control 
                                                            type="text" 
                                                            onKeyPress={this.IsNumeric.bind(this)}
                                                            ref="txtMaxLeaves"
                                                            autoComplete="off" 
                                                            name="txtMaxLeaves"
                                                            value={this.state.txtMaxLeaves}
                                                            onChange={this.onChangetxtMaxLeaves.bind(this)}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                    <div >
                                                        <input 
                                                            type="radio" 
                                                            value="0" 
                                                            name="MaxDayLeaves" 
                                                            checked={this.state.isFistOfTheYear}
                                                            onChange={this.OnChangeIsFistOfTheYear}
                                                        /> 1st of the year &nbsp;&nbsp;&nbsp;
                                                        <input 
                                                            type="radio" 
                                                            value="1" 
                                                            name="MaxDayLeaves"
                                                            checked={this.state.isDateHired}
                                                            onChange={this.OnChangeIsDateHired}
                                                            /> Date Hired
                                                    </div>
                                                    </Form.Group>
                                                </fieldset>
                                            </Form.Group>
                                        </Form.Row>
                                        </Card.Body>
                                    </Card>
                                </Form.Group>
                            </Form.Row>
                            </Tab>
                            <Tab eventKey="payroll" title="Payroll Configurations">
                            <Card className="card-tab">
                                <div className="card-header-tab"></div>
                                <Card.Body>
                                    <Form.Group as={Col} sm={12}>
                                        <fieldset className="border p-2" sm={6}>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={6} controlId="formHorizontalEmail">
                                                <Typeahead
                                                        
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.onChangeContributionType}
                                                        options={this.state.contributionTypeList}
                                                        placeholder="Select Contribution Type"
                                                    />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={6} controlId="formHorizontalEmail">
                                                <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.onChangeEmployeesPayModesList}
                                                        options={this.state.payModesList}
                                                        placeholder="Select Pay Mode"
                                                    />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={6} controlId="formHorizontalEmail">
                                                <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.handleChangePeriodTypes}
                                                        options={this.state.periodTypesList}
                                                        placeholder="Select Period Type"
                                                        disabled={this.state.disabledPeriodType}
                                                    />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Check 
                                                    type="checkbox" 
                                                    label="Basic"
                                                    onChange={e => this.handleChangeCheckbox(e)}
                                                    checked={this.state.IsBasic}
                                                    disabled={true}
                                                    name="IsBasicSalary"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                            <Form.Check 
                                                    type="checkbox" 
                                                    label="Premium"
                                                    onChange={e => this.handleChangeCheckbox(e)}
                                                    name="IsPremium"
                                                    checked={this.state.IsPremium}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={0}>
                                                <Form.Label >Ceiling Amount :</Form.Label>        
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Control 
                                                    type="text"
                                                    ref="ceilingAmount"
                                                    autoComplete="off" 
                                                    name="ceilingAmount"
                                                    value={this.state.ceilingAmount}
                                                    onChange={this.onChangeCeilingAmount.bind(this)}
                                                    onKeyPress={this.IsNumeric.bind(this)}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Check 
                                                    type="checkbox" 
                                                    label="1st"
                                                    onChange={e => this.handleChangeCheckbox(e)}
                                                    checked={this.state.FirstCutOff}
                                                    disabled={this.state.disabledFirst}
                                                    name="FirstCutOff"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Check 
                                                    type="checkbox" 
                                                    label="2nd"
                                                    onChange={e => this.handleChangeCheckbox(e)}
                                                    checked={this.state.SecondCutOff}
                                                    disabled={this.state.disabledSecond}
                                                    name="SecondCutOff"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Check 
                                                    type="checkbox" 
                                                    label="3rd" 
                                                    onChange={e => this.handleChangeCheckbox(e)}
                                                    checked={this.state.ThirdCutOff}
                                                    disabled={this.state.disabledThird}
                                                    name="ThirdCutOff"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Check 
                                                    type="checkbox" 
                                                    label="4th"
                                                    onChange={e => this.handleChangeCheckbox(e)}
                                                    checked={this.state.FourthCutOff}
                                                    disabled={this.state.disabledFourth}
                                                    name="FourthCutOff"
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={0}>
                                                <Form.Label >Pay Day :</Form.Label>        
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Control 
                                                    type="text"
                                                    ref="payDay"
                                                    autoComplete="off" 
                                                    name="payDay"
                                                    value={this.state.payDay}
                                                    onChange={this.onChangePayDay}
                                                    disabled={this.state.selectedPayModeId=="1" ? false : true }//{this.state.disabledPayDay}
                                                    onKeyPress={this.IsNumeric.bind(this)}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={0}>
                                                <Form.Label >Working Days in 1 Month :</Form.Label>        
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Control 
                                                    type="text"
                                                    ref="workingDays"
                                                    autoComplete="off" 
                                                    name="workingDays"
                                                    value={this.state.workingDays}
                                                    onChange={this.onChangeWorkingDays}
                                                    className="ml-auto"
                                                    disabled={this.state.selectedPayModeId=="1" ? false : true }//{this.state.disabledWorkingDays}
                                                    onKeyPress={this.IsNumeric.bind(this)}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        </fieldset>
                                        <Form.Row>
                                                <Form.Group as={Col} sm={12}>
                                                    <ButtonToolbar className="mt-2">
                                                        <Button style={{minWidth:'60px'}} variant="success" onClick={this.onSubmitPayrollConfig}>Add</Button>
                                                    </ButtonToolbar>
                                                </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} sm={12}>
                                                <Card.Header>Payroll Configuration List</Card.Header>
                                                <BootstrapTable
                                                    striped
                                                    hover
                                                    condensed
                                                    keyField = "id"
                                                    data = { this.state.PayrollConfigurationTable }
                                                    columns = { payrollConfigurationColumn }
                                                    selectRow = { selectRowPayrollConfig }
                                                    pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                                    cellEdit = { cellEditFactory({ 
                                                            mode: 'dbclick', 
                                                            blurToSave: true,
                                                            afterSaveCell: (oldValue, newValue, row, column) => { 
                                                                this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                            }
                                                        })
                                                    }
                                                    /> 
                                            </Form.Group>
                                        </Form.Row>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            </Tab>
                            <Tab eventKey="overbreak" title="Overbreak Configurations">
                                <Card className="card-tab">
                                        <div className="card-header-tab"></div>
                                        <Card.Body>
                                            <Form.Row>
                                            <Form.Group as={Col} sm={0}>
                                                <Form.Label>
                                                    From :
                                                </Form.Label>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Control 
                                                    type="text" 
                                                    onKeyPress={this.IsNumeric.bind(this)}
                                                    ref="txtRangeFrom"
                                                    autoComplete="off" 
                                                    name="txtRangeFrom"
                                                    value={this.state.txtRangeFrom}
                                                    onChange={this.onChangeRangeFrom}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={0}>
                                                <Form.Label>
                                                    To :
                                                </Form.Label>
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <Form.Control 
                                                    type="text" 
                                                    onKeyPress={this.IsNumeric.bind(this)}
                                                    ref="txtRangeTo"
                                                    autoComplete="off" 
                                                    name="txtRangeTo"
                                                    value={this.state.txtRangeTo}
                                                    onChange={this.onChangeRangeTo}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} sm={1}>
                                                <ButtonToolbar>
                                                    <Button style={{minWidth:'60px'}} variant="success" onClick={this.onSubmitOB}>Add</Button>
                                                </ButtonToolbar>
                                            </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} sm={12}>
                                                    <Card.Header>Overbreak Bracker List</Card.Header>
                                                    <BootstrapTable
                                                        keyField = "id"
                                                        data = { this.state.OBBracket }
                                                        columns = { columnOBBracket }
                                                        selectRow = { employeeOBBracketRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                        pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                    />
                                                </Form.Group>
                                            </Form.Row>
                                        </Card.Body>
                                    </Card>
                                </Tab>
                            </Tabs>
                        </Form>
                        <ButtonToolbar className="mt-2" style={{marginLeft:"-8px"}}>
                            <Button variant="success" style={{minWidth:'60px'}} onClick={this.onSubmitSaveClientConfig}>Save</Button>&nbsp;&nbsp;
                            <Button variant="danger"  style={{minWidth:'60px'}} href="/banner" >Close</Button>
                        </ButtonToolbar>
                    </Card.Body>
                </Card>
            </Container>
                <NoserLoading show={this.state.isloading} />

        </div>
        )
    }

}

export  default ClientConfig
