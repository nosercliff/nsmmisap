import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import NoserGrid from './Modal/PayrollSummaryTable'

class ReportPayrollSummary extends Component {
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

            selectedClientId            :   "",
            selectedClient              :   "",
            clientList                  :   [],
            employeeList                :   [],
            multiSelected               :   [],
            payPeriodList               :   [],
            selectedEmployeeId          :   '',
            selectedEmployeeName        :   '',
            cutOffDate                  :   '',
            month                       :   '',
            payrollSummaryListTable     :   [],
            periodLists                 :   [],
            payrollCardSummaryListTable :   [],
            locationList                :   [],
        }

    }


    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();

    }

    getClient() {
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
               //console.log("GetClientList");
               //console.log(data);
               this.setState({
                   clientList   :   data.clients, 
                   isloading    :false
                })
           })
   }

   onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedClientName   = e [0].name

        //console.log("Selected Client Id")
        //console.log(this.state.selectedClientId)
        this.setState({
            isshow  :   false,
        })

        /* this.getClientLocation(); */
        this.getEmployees();
        this.GetPayPeriodList();

    }
    
    /* getClientLocation(){
        this.setState({isloading:true})

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
            const data = res.data;
            this.setState({locationList : res.data.locations ? res.data.locations : [], isloading:false})
            if(data.locations.length=="0"){
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
    }

    onChangeLocation = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedLocationId   :   '',
                selectedLocationName   :   ''
            })
            return
        }
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId= e[0].id
    } */

    getEmployees(){
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   "",
            "EmployeeNo"    :   "",
            "ClientName"    :   ""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            //console.log("Employee List ");
            //console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({
                    employeeList        :   data.employees,
                    getEmployeeNoList   :   data.employees,
                    isloading           :   false,
                }) 
            else
                this.setState({
                    employeeList        :   [],
                    getEmployeeNoList   :   [],
                    isloading           :   false
                }) 
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
        
    }

    onChangeEmployeesList = (e) => {


        if(e.length==0)
        {
            this.setState({
                getEmployeeListData             :   null,
                disableNoOfIns                  :   true,
                selectedEmployeeLeadTime        :   '',
                selectedEmployeePayMode         :   '',
                selectedEmployeePayModeId       :   '',
                selectedWorkScheduleIdParam     :   '',
                selectedPayrollPeriodsId        :   '',
                selectedEmployeeId              :   '',
                selectedEmployeeName            :   '',
                selectedPayrollPeriodsName      :   '',
                selectedWorkScheduleId          :   ''
            })
            this.GetPayPeriodList();
            return
        }

        this.setState({
            isLoading   :   true
        })

        this.state.selectedEmployeeId           =   e[0].id
        this.state.selectedEmployeePayModeId    =   e[0].payModeId
        this.state.selectedEmployeePayMode      =   e[0].payMode
        this.state.selectedPayrollPeriodsId     =   e[0].payPeriodId
        this.state.selectedEmployeeName         =   e[0].employeeName
        this.state.selectedEmployeeNo           =   e[0].employeeNo
        this.state.selectedEmployeeBranch       =   e[0].locationName
        this.state.selectedEmployeeLeadTime     =   e[0].leadTime
        this.setState({
            isloading   :   false,
            isshow      :   false
        })

        this.GetPayPeriodList();
    
    }

    onChangeEmployeesNo(e){
        this.setState({
            selectedEmployeeNo  :   e.target.value
        })
        //console.log(e.target.value)
    }

    onChangeEmployeeBranch(e){
        this.setState({
            selectedEmployeeBranch  :   e.target.value
        })
        //console.log(e.target.value)
    }


    GetPayPeriodList() {
        this.setState({isloading:true})
        const periodListParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeId"    :   this.state.selectedEmployeeId ? this.state.selectedEmployeeId : "",
            "IsProcessed"   :   "1"
         };
         console.log("Get Pay Period Params")
         console.log(periodListParams)
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
             )
             .then(res => {
                const data = res.data;
                //console.log("data.payPeriodList")
                //console.log(data)
                this.setState({
                    payPeriodList   :   data.payrollPeriods,
                    isloading       :   false 
                })
             })
    }

    /* onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        //console.log(e.target.value)
    }

    onChangeEmployeeBranch(e){
        this.setState({selectedEmployeeBranch : e.target.value})
        //console.log(e.target.value)
    } */
    
    handleChangeCutOffDate = date => {
        this.setState({
            cutOffDate  :   date
        });
        //console.log(this.state.cutOffDate)
    };

    handleChangeMonth = date => {
        this.setState({
            month   :   date
        });
    }

    handleGenerate = () => {
        if(this.state.cutOffDate == ""){
            alert("Please select cut-off month")
            return
        }

        if(this.state.month == ""){
            alert("Please select month")
            return
        }
    }
    

    onChangePayPeriod = (e) => {
        let periodList = [];
        for(let i = 0; i < e.length; i++){
            const obj = {
                "PayPeriodId" : e[i]["periodId"]
            }
            periodList.push(obj)
            this.setState({
                periodLists : periodList,
                isshow      :   false
            })
        }
        
    }

    handleSearchClick = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeId"    :   this.state.selectedEmployeeId,
            "Periods"       :   this.state.periodLists,
            "LocationId"    :   this.state.selectedLocationId
        }
        //console.log("Submit search params")
        //console.log(getParams)
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/GetPayrollSummaryReport", getParams)
        .then(res => {
            console.log("GetPayrollSummaryReport")
            console.log(res.data)
            const data = res.data
            this.setState({
                payrollSummaryListTable     :   data.payrolls,
                payrollCardSummaryListTable :   data.paycardSummary,
                isloading                   :   false,
            })
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
    }

    handleClickInvoke = () => {
        const getParams = {
            "PayrollType":"1"
        }
        //console.log("Submit search params")
        //console.log(getParams)
        axios
        /* .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/DownloadPayrollFile", getParams, Content-Disposition: attachment) */
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/DownloadPayrollFile", getParams, {'Content-Disposition': 'attachment'} )
        .then(res => {
            const data = res.data
            console.log(data)
        })
    }

    render() {
        const { ExportCSVButton } = CSVExport;
        /* const columnPayrollSummary = [
            { dataField: 'hc', text: 'HC'},
            { dataField: 'memberName', text: 'MEMBER NAME' },
            { dataField: 'colaRate', text: 'COLA RATE'},
            { dataField: 'seaRate', text: 'SEA RATE' },

            { dataField: 'basicPayDays', text: 'BASIC PAY DAYS' },
            { dataField: 'basicPayHrs', text: 'BASIC PAY HRS' },
            { dataField: 'basicPayAmount', text: 'BASIC PAY AMOUNT' },

            { dataField: 'colaDays', text: 'COLA DAYS' },
            { dataField: 'colaAmount', text: 'COLA AMOUNT' },

            { dataField: 'seaDays', text: 'SEA DAYS' },
            { dataField: 'seaAmount', text: 'SEA AMOUNT' },

            { dataField: 'lateMins', text: 'LATE MINS' },
            { dataField: 'lateAmount', text: 'LATE AMOUNT' },

            { dataField: 'undertimeMins', text: 'UNDERTIME / HALF DAY MINS' },
            { dataField: 'undertimeAmount', text: 'UNDERTIME / HALF DAY AMOUNT' },

            { dataField: 'absentDays', text: 'ABSENT DAYS' },
            { dataField: 'absentAmount', text: 'ABSENT AMOUNT' },

            { dataField: 'netRegularPay', text: 'NET REGULAR PAY' },

            { dataField: 'premiuM_OT_HOURS', text: 'OT HRS'},
            { dataField: 'premiuM_OT', text: 'OT AMOUNT' },   
            { dataField: 'premiuM_ND_HOURS', text: 'ND HRS' },
            { dataField: 'premiuM_ND', text: 'ND AMOUNT' },   
            { dataField: 'premiuM_NDOT_HOURS', text: 'ND OT HRS' },
            { dataField: 'premiuM_NDOT', text: 'ND OT AMOUNT' },   
            
            { dataField: 'premiuM_DOD_HOURS', text: 'RESTDAY HRS' },
            { dataField: 'premiuM_DOD', text: 'REST DAY' },
            { dataField: 'premiuM_DODOT_HOURS', text: 'REST DAY OT HRS' },
            { dataField: 'premiuM_DODOT', text: 'REST DAY OT' },
            { dataField: 'premiuM_DODND_HOURS', text: 'REST DAY ND HRS' },
            { dataField: 'premiuM_DODND', text: 'REST DAY ND' },
            { dataField: 'premiuM_DODNDOT_HOURS', text: 'REST DAY NDOT HRS' },
            { dataField: 'premiuM_DODNDOT', text: 'REST DAY NDOT' },

            { dataField: 'premiuM_SHOL_HOURS', text: 'SHOL HRS' },
            { dataField: 'premiuM_SHOL', text: 'SHOL' },
            { dataField: 'premiuM_SHOLOT_HOURS', text: 'SHOL OT HRS' },
            { dataField: 'premiuM_SHOLOT', text: 'SHOL OT' },
            { dataField: 'premiuM_SHOLND_HOURS', text: 'SHOL ND HRS' },
            { dataField: 'premiuM_SHOLND', text: 'SHOL ND' },
            { dataField: 'premiuM_SHOLNDOT_HOURS', text: 'SHOL NDOT HRS' },
            { dataField: 'premiuM_SHOLNDOT', text: 'SHOL NDOT' },

            { dataField: 'premiuM_SHOLDOD_HOURS', text: 'SHOL DOD HRS' },
            { dataField: 'premiuM_SHOLDOD', text: 'SHOL DOD' },
            { dataField: 'premiuM_SHOLDODOT_HOURS', text: 'SHOL DOD OT HRS' },
            { dataField: 'premiuM_SHOLDODOT', text: 'SHOL DOD OT' },
            { dataField: 'premiuM_SHOLDODND_HOURS', text: 'SHOL DOD ND HRS' },
            { dataField: 'premiuM_SHOLDODND', text: 'SHOL DOD ND' },
            { dataField: 'premiuM_SHOLDODNDOT_HOURS', text: 'SHOL DOD NDOT HRS' },
            { dataField: 'premiuM_SHOLDODNDOT', text: 'SHOL DOD NDOT' },

            { dataField: 'premiuM_LHOL_HOURS', text: 'LHOL HRS' },
            { dataField: 'premiuM_LHOL', text: 'LHOL' },
            { dataField: 'premiuM_LHOLOT_HOURS', text: 'LHOL OT HRS' },
            { dataField: 'premiuM_LHOLOT', text: 'LHOL OT' },
            { dataField: 'premiuM_LHOLND_HOURS', text: 'LHOL ND HRS' },
            { dataField: 'premiuM_LHOLND', text: 'LHOL ND' },
            { dataField: 'premiuM_LHOLNDOT_HOURS', text: 'LHOL NDOT HRS' },
            { dataField: 'premiuM_LHOLNDOT', text: 'LHOL NDOT' },

            { dataField: 'premiuM_LHOLDOD_HOURS', text: 'LHOL DOD HRS' },
            { dataField: 'premiuM_LHOLDOD', text: 'LHOL DOD' },
            { dataField: 'premiuM_LHOLDODOT_HOURS', text: 'LHOL DOD OT HRS' },
            { dataField: 'premiuM_LHOLDODOT', text: 'LHOL DOD OT' },
            { dataField: 'premiuM_LHOLDODND_HOURS', text: 'LHOL DOD ND HRS' },
            { dataField: 'premiuM_LHOLDODND', text: 'LHOL DOD ND' },
            { dataField: 'premiuM_LHOLDODNDOT_HOURS', text: 'LHOL DOD NDOT HRS' },
            { dataField: 'premiuM_LHOLDODNDOT', text: 'LHOL DOD NDOT' },

            { dataField: 'premiuM_LHOLSHOL_HOURS', text: 'LHOL SHOL HRS' },
            { dataField: 'premiuM_LHOLSHOL', text: 'LHOL SHOL' },
            { dataField: 'premiuM_LHOLSHOLOT_HOURS', text: 'LHOL SHOL OT HRS' },
            { dataField: 'premiuM_LHOLSHOLOT', text: 'LHOL SHOL OT' },
            { dataField: 'premiuM_LHOLSHOLND_HOURS', text: 'LHOL SHOL ND HRS' },
            { dataField: 'premiuM_LHOLSHOLND', text: 'LHOL SHOL ND' },
            { dataField: 'premiuM_LHOLSHOLNDOT_HOURS', text: 'LHOL SHOL NDOT HRS' },
            { dataField: 'premiuM_LHOLSHOLNDOT', text: 'LHOL SHOL NDOT' },

            { dataField: 'premiuM_LHOLSHOLDOD_HOURS', text: 'LHOL SHOL DOD HRS' },
            { dataField: 'premiuM_LHOLSHOLDOD', text: 'LHOL SHOL DOD' },
            { dataField: 'premiuM_LHOLSHOLDODOT_HOURS', text: 'LHOL SHOL DOD OT HRS' },
            { dataField: 'premiuM_LHOLSHOLDODOT', text: 'LHOL SHOL DOD OT' },
            { dataField: 'premiuM_LHOLSHOLDODND_HOURS', text: 'LHOL SHOL DOD ND HRS' },
            { dataField: 'premiuM_LHOLSHOLDODND', text: 'LHOL SHOL DOD ND' },
            { dataField: 'premiuM_LHOLSHOLDODNDOT_HOURS', text: 'LHOL SHOL DOD NDOT HRS' },
            { dataField: 'premiuM_LHOLSHOLDODNDOT', text: 'LHOL SHOL DOD NDOT' },

            { dataField: 'premiuM_VACATIONLEAVE_HOURS', text: 'SICK LEAVE HRS' },
            { dataField: 'premiuM_VACATIONLEAVE', text: 'SICK LEAVE' },
            { dataField: 'premiuM_SICKLEAVE_HOURS', text: 'VACATION LEAVE HRS' },
            { dataField: 'premiuM_SICKLEAVE', text: 'VACATION LEAVE' },
            { dataField: 'premiuM_PATERNITYLEAVE_HOURS', text: 'PATERNITY LEAVE HRS' },
            { dataField: 'premiuM_PATERNITYLEAVE', text: 'PATERNITY LEAVE' },

            { dataField: 'grossPay', text: 'GROSS PAY' },
            { dataField: 'totalPremiums', text: 'TOTAL_PREMIUMS' },
            
            { dataField: 'inclusioN_MA_NOOFDAYS', text: 'MEAL ALLOWANCE NO OF DAYS' },
            { dataField: 'inclusioN_MA_AMOUNT', text: 'MEAL ALLOWANCE' },
            
            { dataField: 'inclusioN_DA_NOOFDAYS', text: 'ALLOWANCE NO OF DAYS' },
            { dataField: 'inclusioN_DA_AMOUNT', text: 'ALLOWANCE' },   
         
            { dataField: 'inclusioN_SPA_NOOFDAYS', text: 'SKILLS PAY ALLOWANCE NO OF DAYS' },
            { dataField: 'inclusioN_SPA_AMOUNT', text: 'SKILLS PAY ALLOWANCE' },

            { dataField: 'inclusioN_TL_NOOFDAYS', text: 'TEAM LEADER ALLOWANCE NO OF DAYS' },
            { dataField: 'inclusioN_TL_AMOUNT', text: 'TEAM LEADER ALLOWANCE' },

            { dataField: 'inclusioN_HP_NOOFDAYS', text: 'HAZARD PAY NO OF DAYS' },
            { dataField: 'inclusioN_HP_AMOUNT', text: 'HAZARD PAY' },

           { dataField: 'inclusioN_ALLOWANCE_AMOUNT', text: 'ALLOWANCE' },
            { dataField: 'inclusioN_SL_AMOUNT', text: 'SHIFT LEADER' },
            { dataField: 'inclusioN_GM_AMOUNT', text: 'GROSS MARGIN' },
            { dataField: 'inclusioN_SG_AMOUNT', text: 'SALES GROWTH' },
            { dataField: 'inclusioN_PA_AMOUNT', text: 'PERFECT ATTENDANCE' },
            { dataField: 'inclusioN_LBC_AMOUNT', text: 'LBC' },
            { dataField: 'inclusioN_BDAY_AMOUNT', text: 'BIRTHDAY' },
            { dataField: 'inclusioN_TRANSPO_AMOUNT', text: 'TRANSPORTATION ALLOWANCE' },
            { dataField: 'inclusioN_WER_AMOUNT', text: 'WEEKLY EXPENSE REPORT' },
            { dataField: 'inclusioN_LOAD_AMOUNT', text: 'LOAD ALLOWANCE' },
            { dataField: 'inclusioN_MRP_AMOUNT', text: 'MRP INCENTIVE' },
            { dataField: 'inclusioN_OPUP_ADJ', text: 'ADJ (OP / UP)' },
            { dataField: 'totalInclusions', text: 'TOTAL INCLUSIONS' },

            { dataField: 'totalGrossPay', text: 'TOTAL GROSS PAY' },

            { dataField: 'deductioN_SSS_EE', text: 'SSS' },
            { dataField: 'deductioN_PHIC_EE', text: 'PHIC' },
            { dataField: 'deductioN_HDMF_EE', text: 'HDMF' },

            { dataField: 'deductioN_SSS_LOAN', text: 'SSS LOAN' },
            { dataField: 'deductioN_HDMF_LOAN', text: 'HDMF LOAN' },
            { dataField: 'deductioN_COOP_LOAN', text: 'COOP LOAN' },

            { dataField: 'deductioN_NRF', text: 'NRF' },
            { dataField: 'deductioN_AAP', text: 'AAP' },
            { dataField: 'deductioN_CBU', text: 'CBU' },
            { dataField: 'deductioN_EMPLOYEE_CHARGES', text: 'EMPLOYEE CHARGES' },
            { dataField: 'deductioN_BANK_FEES', text: 'BANK TRAN FEE' },
            { dataField: 'deductioN_PENALTY', text: 'PENALTY' },
            { dataField: 'deductioN_TMK', text: 'TRUE MONEY KIT' },
            { dataField: 'deductioN_PARAMOUNT_ID', text: 'PARAMOUNT ID' },
            { dataField: 'deductioN_HMO', text: 'HMO' },

            { dataField: 'totalDeductions', text: 'TOTAL DEDUCTIONS' },
            { dataField: 'netPay', text: 'NET PAY' },
            { dataField: 'mlCharged', text: 'ML CHARGE' },
            { dataField: 'actualNetPay', text: 'ACTUAL NET PAY' },
            { dataField: 'remarks', text: 'REMARKS' },

            { dataField: 'paycarD_BDO', text: 'BDO' },
            { dataField: 'paycarD_GCASH', text: 'GCASH' },
            { dataField: 'paycarD_RCBC', text: 'RCBC' },
            { dataField: 'paycarD_ML', text: 'ML' },
            { dataField: 'paycarD_TM', text: 'TRUE MONEY' },
            { dataField: 'paycarD_METROBANK', text: 'METROBANK' },
            { dataField: 'paycarD_HOLD', text: 'HOLD' },
            { dataField: 'paycarD_NOATM', text: 'NO ATM' },
        ]*/

        const columnPayrollCardSummary = [
            {
                dataField   :   'name',
                text        :   'Pay Card Type',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },
            {
                dataField   :   'count',
                text        :   'Count',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },

        ] 
        return(
            <div>
                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>Generate Report Payroll Summary</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.clientList}
                                            placeholder="Select Client"
                                            /* clearButton */
                                            /* multiple */
                                        />
                                    </Col>
                                </Form.Group>
                                {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeLocation}
                                            options={this.state.locationList}
                                            placeholder="Select Branch"
                                        />
                                    </Col>
                                </Form.Group> */}
                                <Form.Row>
                                    <Form.Group as={Col} sm={4} controlId="formGridEmail">
                                        <Typeahead
                                            labelKey='employeeName'
                                            id="basic-example"
                                            onChange={this.onChangeEmployeesList}
                                            options={this.state.employeeList}
                                            placeholder="Select Employee"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={4} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Employee No" 
                                            autoComplete="off" 
                                            name="employeeNo"
                                            value={this.state.selectedEmployeeNo}
                                            onChange={this.onChangeEmployeesNo.bind(this)}
                                            readOnly/>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={4} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Employee Branch" 
                                            autoComplete="off" 
                                            name="employeeBranch"
                                            value={this.state.selectedEmployeeBranch}
                                            onChange={this.onChangeEmployeeBranch.bind(this)}
                                            readOnly/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='payPeriod'
                                            id="basic-example"
                                            onChange={this.onChangePayPeriod}
                                            options={this.state.payPeriodList}
                                            placeholder="Select Payroll Cut-Off"
                                            multiple
                                            clearButton
                                        />
                                    </Col>
                                </Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSearchClick }>
                                        SEARCH
                                    </Button>
                                </ButtonToolbar>
                                <Form.Group controlId="formGridPassword">

                                <NoserGrid
                                    data = { this.state.payrollSummaryListTable }
                                    exportCSV={true}
                                    pageSize={20}

                                />
                                        
                                </Form.Group>
                                <div className="mt-5">
                                    <BootstrapTable
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        /* pagination={ paginationFactory(options) } */
                                        keyField = "id"
                                        data = { this.state.payrollCardSummaryListTable }
                                        columns = { columnPayrollCardSummary}
                                        /* selectRow = { selectRow } */
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                        /* rowEvents={ rowEvents } */

                                    />
                                </div>
                                <ButtonToolbar className="mt-5" sm={12}>
                                    <Button className="ml-auto" variant="danger" href="/home" >
                                        Close
                                    </Button>
                                    <Button className="ml-auto" variant="danger" onClick={this.handleClickInvoke} >
                                        Invoke
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

export default ReportPayrollSummary;