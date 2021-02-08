import React, { Component } from "react"
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
    
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { MdPictureAsPdf} from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';    

class PayrollGenerate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedClientId: "",
            selectedClient:"",
            clientList: [],
            selectedPayrollName:"",
            selectedPayrollId:"",
            payrollList:[],
            employeePayrollListGrid:[],
            selectedGetPayTypesId:'',
            PeriodTypesId : [],
            userinfo: [],
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            getEmployeeList : [],
            payPeriodList: [],
        }

    }

    searchGeneratePayroll = () => {
        this.setState({isLoading:true,loadingText:"Processing your request..."})
                const clientParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":this.state.selectedClientId,
                    "UserId":this.state.userinfo.userId,
                    "PayPeriodId": this.state.selectedPayPeriodId
            }
            axios
                .post(
                    AppConfiguration.Setting().noserapiendpoint + "Payroll/GetEmployeePayrolls", clientParams
                )
                .then(res => {
                    const data = res.data;
                    console.log("GetEmployeePayrolls");
                    console.log(data);
                    this.setState({employeePayrollListGrid: data.payrolls, isLoading:false})
                })
    }



    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        this.GetEmployeePayrolls();

    }
    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName = ""
            this.state.selectedClientId = ""
            return
        }
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name

        console.log(this.state.selectedClientName)
        this.GetPayPeriodList();
        
    }
    onChangePayPeriod = (e) => {
        if(e.length == 0) {
            this.state.selectedPayPeriodId=""
            this.state.selectedPayPeriodName=""
            return
        } 
        this.state.selectedPayPeriodId = e[0].periodId
        this.state.selectedPayPeriodName = e[0].payPeriod

        console.log(this.state.selectedPayPeriodName)

    }
    GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": ""
         };
         console.log("Get Pay Period List")
         
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
             )
             .then(res => {
                const data = res.data;
                console.log("data.payPeriodList")
                console.log(data)
                this.setState({payPeriodList: data.payrollPeriods,isLoading:false })
                //console.log("data.employees list count: " + this.state.employeeList.length)
             })
    }

    handleFinalizedClick = event => {
        console.log("Generate Payroll " + this.state.selectedClientName+ " " +this.state.selectedPayPeriodName +".csv")
        /* this.GetEmployeePayrolls() */
    }

    getClient() {
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
       }
       axios
           .post(
               AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
           )
           .then(res => {
               const data = res.data;
               console.log("GetClientList");
               console.log(data);
               this.setState({clientList: data.clients, isLoading:false})
           })
   }

   handleGenerateClick = event => {
        
    this.setState({isLoading:true,loadingText:"Processing your request..."})
        const generateParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId": this.state.selectedPayPeriodId
        };

        console.log(generateParams)

       axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/ProcessPayroll",  generateParams)
        .then(res => {
            const data = res.data;
                console.log(data)
                var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                {
                    isLoading:false,
                    AlertType:(data.status=="1") ? "Success! " : "Error! ",
                    show:true,
                    Color:alertType,
                    Message:data.message ,
                    Fade:true
                });
            })
            .catch(error=>{
            this.setState(
                {
                isLoading:false,
                AlertType:"Error! ",
                Show:true,
                Color:"danger",
                Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                Fade:true
            })
        })

    }
    
   GetEmployeePayrolls() {
        
        const employeeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId": this.state.selectedEmployeePayModesId
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Payroll/GetEmployeePayrolls",  employeeParams  
        )
        .then(res => {
            const data =res.data;
            console.log("GetEmployeePayrolls")
            console.log(data)
            this.setState({employeePayrollListGrid: data.payrolls})
        })
    } 
    
    
   
    
        
    render() {
        const { ExportCSVButton } = CSVExport;
        
        

        const clientName = this.state.selectedClientName+ " " +this.state.selectedPayPeriodName

        const cellEdit = {
            mode: 'click',
            blurToSave: true
            };  
        return(
            <div>
            <Banner />
            <Container className="mt-5">
                <Card>
                    <Card.Header>Generate Payroll</Card.Header>
                    <Card.Body>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.clientList}
                                        placeholder="Select Client"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='payPeriod'
                                        id="basic-example"
                                        onChange={this.onChangePayPeriod}
                                        options={this.state.payPeriodList}
                                        placeholder="Select Payroll Cut-Off"
                                    />
                                </Col>
                            </Form.Group>
                            <ButtonToolbar  >
                                <Button  className="ml-auto" variant="success"   onClick = { this.handleGenerateClick }>
                                    Generate
                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="info" onClick = { this.searchGeneratePayroll }>
                                    Search
                                </Button>
                            </ButtonToolbar>
                            <Form.Group  className="mt-5" controlId="formGridPassword">

                            <ToolkitProvider
                                keyField="id"   
                                data={ this.state.employeePayrollListGrid }
                               // columns={ columns }
                                exportCSV={ {
                                    fileName: "Generate Payroll " + this.state.selectedClientName+ " " +this.state.selectedPayPeriodName +".csv",
                                  } }
                                >
                                {
                                    props => (
                                    <div>
                                        <ExportCSVButton className="btn btn-info ml-auto" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                        <hr />
                                        <BootstrapTable data={ this.state.employeePayrollListGrid } striped={true} hover={true}
                                cellEdit={ cellEdit }>
                            
                            <TableHeaderColumn row='0' rowSpan='3' dataField='hC' headerAlign='center'  isKey={true} width='75'>HC</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='memberName' width='75' headerAlign='center'>NAME OF MEMBER</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='cashcard' width='75'  >CASH CARD</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='position' width='75'  >POSITION</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='store' width='75'  >STORE</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='colaRate' width='75' headerAlign='center' >COLA RATE</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3'  dataField='seaRate' width='75'  >SEA RATE</TableHeaderColumn>

                            <TableHeaderColumn row='0' colSpan='13' headerAlign='center' >BASIC PAY</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='3' headerAlign='center' width='75' >BASIC PAY</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='basicPayDays'  dataAlign='center'>DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='basicPayHrs'  dataAlign="center">HRS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='basicPayAmount'  dataAlign="center">AMOUNT</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' headerAlign='center' width='75'>COLA</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='colaDays'  dataAlign='center'>DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='colaAmount'  dataAlign="center">AMOUNT</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' headerAlign='center' width='75' >SEA</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='seaDays'  dataAlign='center'>DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='seaAmount'  dataAlign="center">AMOUNT</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' headerAlign='center' width='75'>LATE</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='lateMins'  dataAlign='center'>MINS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='lateAmount'  dataAlign="center">AMOUNT</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' headerAlign='center' width='75' >UNDERTIME/HALF DAY</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='undertimeMins'  dataAlign='center'>MINS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='undertimeAmount'  dataAlign="center">AMOUNT</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' headerAlign='center' width='75' >ABSENT</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='absentDays'  dataAlign='center'>DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='absentAmount'  dataAlign="center">AMOUNT</TableHeaderColumn>

                            <TableHeaderColumn row='0' rowSpan='3' headerAlign='center' dataField='netRegularPay' width='75'  >NET REGULAR PAY</TableHeaderColumn>

                            <TableHeaderColumn row='0' colSpan='31' headerAlign='center' >PREMIUMS</TableHeaderColumn>

                             <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_ND' width='75' >NIGHT DIFF</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_OT' width='75' >REGULAR OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_NDOT' width='75' >NIGHT DIFF OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_DOD' width='75' >REST DAY</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_DODOT' width='75' >REST DAY OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_DODND' width='75' >REST DAY W/ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_DODNDOT' width='75' >REST DAY W/ND OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOL' width='75' >SHOL</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLOT' width='75' >SHOL OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLND' width='75' >SHOL ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLNDOT' width='75' >SHOL ND OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLDOD' width='75' >SHOL DOD</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLDODOT' width='75' >SHOL DOD OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLDODND' width='75' >SHOL DOD ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_SHOLDODNDOT' width='75' >SHOL DOD ND OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_LHOL' width='75' >LHOL</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLOT' width='75' >LHOL OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_LHOLND' width='75' >LHOL ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2'  dataField='pREMIUM_LHOLNDOT' width='75' >LHOL ND OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLDOD' width='75' >LHOL DOD</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLDODOT' width='75' >LHOL DOD OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLDODND' width='75' >LHOL DOD ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLDODNDOT' width='75' >LHOL DOD ND OT</TableHeaderColumn>

                             <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOL' width='75' >LHOL SHOL</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLND' width='75' >LHOL SHOL ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLNDOT' width='75' >LHOL SHOL NDOT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLOT' width='75' >LHOL SHOL OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLDOD' width='75' >LHOL SHOL DOD</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLDODOT' width='75' >LHOL SHOL DOD OT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLDODNDOT' width='75' >LHOL SHOL DOD NDOT</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_LHOLSHOLDODND' width='75' >LHOL SHOL DOD ND</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_VACATIONLEAVE' width='75' >VACATION LEAVE</TableHeaderColumn>
                            
                             <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_SICKLEAVE' width='75' >SICK LEAVE</TableHeaderColumn>
                            

                            <TableHeaderColumn row='1' rowSpan='2' dataField='pREMIUM_PATERNITYLEAVE' width='75' >PATERNITY LEAVE</TableHeaderColumn>
                            

                            <TableHeaderColumn row='0' rowSpan='3' dataField='totalGrossPay' width='75'  >GROSS PAY</TableHeaderColumn>

                            <TableHeaderColumn row='0' colSpan='22' headerAlign='center' >INCLUSION</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' >MEAL ALLOWANCE</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_MA_NOOFDAYS'  dataAlign='center'>No. of DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_MA_AMOUNT'  dataAlign="center">ATM</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' headerAlign='center'>ALLOWANCE(delivery Helper,etc.)</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_DA_NOOFDAYS'  dataAlign='center'>No. of DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_DA_AMOUNT'  dataAlign="center">ATM</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' >SKILLS PAY ALLOWANCE</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_SPA_NOOFDAYS'  dataAlign='center'>No. of DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_SPA_AMOUNT'  dataAlign="center">ATM</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' >TEAM LEADER'S ALLOWANCE</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_TL_NOOFDAYS'  dataAlign='center'>No. of DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_TL_AMOUNT'  dataAlign="center">ATM</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' >HAZARD PAY</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_HP_NOOFDAYS'  dataAlign='center'>No. of DAYS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='iNCLUSION_HP_AMOUNT'  dataAlign="center">ATM</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_ALLOWANCE_AMOUNT' width='75'  >ALLOWANCE</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_SL_AMOUNT' width='75' headerAlign='center' >SHIFT LEADER</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_GM_AMOUNT' width='75' headerAlign='center' >GROSS MARGIN</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_SG_AMOUNT' width='75' headerAlign='center' >SALES GROWTH</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_PA_AMOUNT' width='75'  headerAlign='center'>PERFECT ATTENDANCE</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_LBC_AMOUNT' width='75'  headerAlign='center'>LBC</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_BDAY_AMOUNT' width='75'  headerAlign='center'>BIRTHDAY INCENTIVE(ppl only)</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_TRANSPO_AMOUNT' width='75'  headerAlign='center'>TRANSPO</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_WER_AMOUNT' width='75'  headerAlign='center'>WEEKLY EXPENSE REPORT(adg)</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_LOAD_AMOUNT' width='75'  headerAlign='center'>LOAD ALLOWANCE</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_MRP_AMOUNT' width='75'  headerAlign='center'>MRP INCENTIVE(PHRMPC EXPENSE)</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='iNCLUSION_OPUP_ADJ' width='75'  headerAlign='center'>ADJ(OP/UP)</TableHeaderColumn>

                            <TableHeaderColumn row='0' rowSpan='3' dataField='totalinclusion' width='75'  >TOTAL INCLUSION</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='totalgrosspay' width='75'  >TOTAL GROSS PAY</TableHeaderColumn>

                            <TableHeaderColumn row='0' colSpan='14' headerAlign='center' >DEDUCTIONS</TableHeaderColumn>
                            <TableHeaderColumn row='1' colSpan='1' width='75' >SSS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_SSS_EE'  dataAlign='center'>EE</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='1' width='75' >PHIC</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_PHIC_EE'  dataAlign='center'>EE</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='1' width='75' >HDMF</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_HDMF_EE'  dataAlign='center'>EE</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='1' width='75' >SSS</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_SSS_LOAN'  dataAlign='center'>LOAN</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='1' width='75' >HDMF</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_HDMF_LOAN'  dataAlign='center'>LOAN</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='1' width='75' >COOP</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_COOP_LOAN'  dataAlign='center'>LOAN</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' headerAlign='center' >MEMBERSHIP FEE</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_NRF'  dataAlign='center'>MRF</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='dEDUCTION_AAP'  dataAlign='center'>AAP</TableHeaderColumn>

                            <TableHeaderColumn row='1' rowSpan='2' dataField='dEDUCTION_CBU' width='75'  headerAlign='center'>CAPITAL BUILD UP</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='dEDUCTION_EMPLOYEE_CHARGES' width='75'  headerAlign='center'>EMPLOYEE CHARGES</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='dEDUCTION_BANK_FEES' width='75'  headerAlign='center'>BANK TRANS FEE</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='dEDUCTION_PENALTY' width='75'  headerAlign='center'>PENALTY</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='dEDUCTION_TMK' width='75'  headerAlign='center'>TRUE MONEY KIT</TableHeaderColumn>
                            <TableHeaderColumn row='1' rowSpan='2' dataField='dEDUCTION_PARAMOUNT_ID' width='75' headerAlign='center' >PARAMOUNT ID</TableHeaderColumn>

                            <TableHeaderColumn row='0' rowSpan='3' dataField='totalDeductions' width='75' headerAlign='center' >TOTAL DEDUCTION</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='netPay' width='75' headerAlign='center' >NET PAY</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='mLCharged' width='75'  headerAlign='center'>ML CHARGE</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='actualNetPay' width='75'  headerAlign='center'>ACTUAL NET PAY</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='remarks' width='75'  headerAlign='center'>REMARKS</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='pAYCARD_BDO' width='75' headerAlign='center' >BDO</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='pAYCARD_TM' width='75' headerAlign='center' >TRUE MONEY</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='pAYCARD_ML' width='75' headerAlign='center' >ML</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='pAYCARD_HOLD' width='75'  headerAlign='center'>HOLD</TableHeaderColumn>
                            <TableHeaderColumn row='0' rowSpan='3' dataField='pAYCARD_NOATM' width='75' headerAlign='center' >NO ATM</TableHeaderColumn>

                             <TableHeaderColumn row='1' colSpan='2' width='75' headerAlign='center' >MEM FEE</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='mBeg'  dataAlign='center'>BEG</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='mEnd'  dataAlign="center">END</TableHeaderColumn>

                             <TableHeaderColumn row='1' colSpan='2' width='75' headerAlign='center'>EE CHARGES</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='ecBeg'  dataAlign='center'>BEG</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='ecEnd'  dataAlign="center">END</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' headerAlign='center'>OP</TableHeaderColumn>
                            <TableHeaderColumn row='2'  dataField='opBeg'  dataAlign='center'>BEG</TableHeaderColumn>
                            <TableHeaderColumn row='2'  dataField='opEnd'  dataAlign="center">END</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' headerAlign='center'>UNIFORM</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='uBeg'  dataAlign='center'>BEG</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='uEnd'  dataAlign="center">END</TableHeaderColumn>

                            <TableHeaderColumn row='1' colSpan='2' width='75' headerAlign='center'>COOP LOAN</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='coopBeg'  dataAlign='center'>BEG</TableHeaderColumn>
                            <TableHeaderColumn row='2' dataField='coopEnd'  dataAlign="center">END</TableHeaderColumn>

                            </BootstrapTable>&nbsp;&nbsp;
                                    </div>
                                    )
                                }
                            </ToolkitProvider>

                            
                                
                            </Form.Group>
                            <ButtonToolbar sm={12}>
                                <Button variant="primary" className="ml-auto" onClick = { this.handleFinalizedClick }>
                                    Finalized
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger" href="/banner" >
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
        </div>
    );
}

}
export  default PayrollGenerate
