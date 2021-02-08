import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';
import  PayrollSSSDeductionsModal  from './Modal/PayrollSSSDeductionsModal';
import  PayrollPHICDeductionsModal  from './Modal/PayrollPHICDeductionsModal';
import  PayrollHDMFDeductionsModal  from './Modal/PayrollHDMFDeductionsModal';
import  PayrollLoansModal  from './Modal/PayrollLoansModal';
/* import  PayrollTransactionInclusionModal  from './Modal/PayrollTransactionInclusionModal'; */
import  PayrollInclusionsModal  from './Modal/PayrollInclusionsModal';
import  PayrollDeductionsModal  from './Modal/PayrollDeductionsModal';

import  PayrollLoanAdjustmentsModal  from './Modal/PayrollLoanAdjustmentsModal';

import  LedgerModal  from './Modal/LedgerModal';

import  PayrollInclusionLedgerModal  from './Modal/PayrollInclusionLedgerModal';

class PayrollConfiguration extends Component {
    constructor(props) {
        super(props)
        this.state ={
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            inclusionModalShow:false,
            contributionModalShow:false,
            contributionPHICModalShow: false,
            contributionHDMFModalShow: false,
            loanModalShow: false,
            modalInclusionsShow:false,
            modalDeductionShow: false,
            cutOffInclusion: [
                { name: "Feb 01-15,2020" },
                { name: "Feb 16-30,2020" },
            ],
            cutOffMandatory: [
                { name: "Feb 01-15,2020" },
                { name: "Feb 16-30,2020" },
            ],
            cutOffLoans: [
                { name: "Feb 01-15,2020" },
                { name: "Feb 16-30,2020" },
            ],
            cutOffCharges: [
                { name: "Feb 01-15,2020" },
                { name: "Feb 16-30,2020" },
            ],
            getClientList : [],
            getEmployeeList : [],
            getEmployeeNoList: [],
            selectedClientId: [],
            getRow: [],
            payPeriodList: [],

            contributionsDataList: [],
            deductionsDataList: [],
            inclusionsDataList: [],
            loansDataList: [],

            modalAdjustmentShow: false,

            modalInclusionLedgerShow: false,

            inclusionLedgerList: [],

            totalInclusions : 0,
            totalDeductions : 0,
            totalContributions : 0,
            totalLoans : 0,
        }
        
    }

    state = {
        nameDateSelected: []
    }
   /*  handleModal()
    {
        this.setState({show:true})
    } */



    componentDidMount(){
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();;
    }

    getClientList(){
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            this.setState({
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

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        console.log("Client selectedClientId " + this.state.selectedClientId );
        console.log("Client selectedClientName " + this.state.selectedClientName );
        this.setState({isloading:true,isshow:false,color:"",message:"",fade:true})
        
        this.getEmployees();
    }

    getEmployees(){
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
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            console.log("Employee List ");
            console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isloading:false,}) 
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

    onChangeEmployeesList = (e) => {


        if(e.length==0)
        {
            this.setState({getEmployeeListData: null, selectedPayrollpayPeriod: '', selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
          
            return
        }
        this.setState({isloading:true,isshow:false,color:"",message:"",fade:true})
        
        this.state.selectedPayrollPeriodsId = e[0].lastPayPeriodId
        this.state.selectedPayrollpayPeriod = e[0].lastPayPeriod
        this.state.selectedPayrollPayMode = e[0].payMode
        this.state.selectedPayrollPayModeId = e[0].payModeId

        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeId = e[0].id
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.state.selectedEmployeeBranch = e[0].locationName
       
        console.log("Work selectedEmployeeName   " + this.state.selectedEmployeeNo );

        if(this.state.selectedPayrollpayPeriod == ""){
            this.state.selectedPayrollPeriodsId = e[0].payPeriodId
            this.state.selectedPayrollpayPeriod = e[0].payPeriod
        }

        this.employeeTransactionsList();
    }

    onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        console.log(e.target.value)
    }

    onSubmitContribution = () => {
        console.log(this.state.getRow);
    }
    
    /* handleChangeMandatoryShowModal(row){
        if(row.name == "SSS"){
            this.setState({contributionModalShow: true})
        } 
        else if(row.name == "Philhealth"){
            this.setState({contributionPHICModalShow: true})
        } 
        else if(row.name == "HDMF"){
            this.setState({contributionHDMFModalShow: true})
        }else {
            alert("Error")
        }
        
    } */

    handleChangeInclusionLedgerShowModal = (row) => {
        console.log("inclusion row")
        console.log(row)
        this.setState({modalInclusionLedgerShow : true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId,
        }
        this.childLedger.initialize(obj)
    }

    handleChangeDeductionShowModal = (row) => {
        this.setState({modalInclusionLedgerShow : true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId,
        }
        this.childLedger.initialize(obj)
    }

    handleChangeMandatoryShowModal = (row) =>{
        this.setState({modalInclusionLedgerShow : true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId,
        }
        this.childLedger.initialize(obj)
    }

    handleLoanModalShow = (row) => {

        this.setState({modalInclusionLedgerShow: true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId,
        }
        this.childLedger.initialize(obj)
    }




    handleChangeInclusionCreateModal = () => {
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.selectedEmployeeName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        this.setState({modalInclusionsShow: true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            employeePayModeFromParent  :   this.state.selectedPayrollPayMode,
            employeePayModeIdFromParent   :   this.state.selectedPayrollPayModeId,
            employeePayPeriodIdFromParent  :   this.state.selectedPayrollpayPeriod,
            /* ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId, */
        }
        this.childInclusion.initialize(obj)
    }

    handleChangeDeductionCreateModal = () => {
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.selectedEmployeeName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        this.setState({modalDeductionShow: true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            employeePayModeFromParent  :   this.state.selectedPayrollPayMode,
            employeePayModeIdFromParent   :   this.state.selectedPayrollPayModeId,
            employeePayPeriodIdFromParent  :   this.state.selectedPayrollpayPeriod,
            /* ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId, */
        }
        this.childDeduction.initialize(obj)
    }

    handleChangeLoansCreateModal = () => {
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.selectedEmployeeName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        this.setState({loanModalShow: true})

        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            employeePayModeFromParent  :   this.state.selectedPayrollPayMode,
            employeePayModeIdFromParent   :   this.state.selectedPayrollPayModeId,
            employeePayPeriodIdFromParent  :   this.state.selectedPayrollpayPeriod,
            /* ledgerTypeIdFromParent  :   row.ledgerTypeId,
            referenceIdFromParent   :   row.referenceId, */
        }
        this.childLoans.initialize(obj)

        
    }

/*     handleChangeDeductionShowModal(row){
        console.log("Deduction")
        console.log(row)

    } */

    employeeTransactionsList(){
        this.setState({isloading:true})
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            /* "ClientId":this.state.selectedClientId, */
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId": this.state.selectedPayrollPeriodsId,
            "PayPeriod": this.state.selectedPayrollpayPeriod,
            "PayMode":this.state.selectedPayrollpayPeriod,
            "EmployeeId": this.state.selectedEmployeeId,
         };
         console.log("Get Pay Period List")
         
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetPayrollConfigurations",  periodListParams
             )
             .then(res => {
                const data = res.data;
                console.log("Get Payroll Configurations")
                console.log(data)
                this.setState({
                    contributionsDataList   :   data.contributions,
                    deductionsDataList      :   data.deductions,
                    inclusionsDataList      :   data.inclusions,
                    loansDataList           :   data.loans,
                    totalInclusions         :   data.totalInclusions,
                    totalDeductions         :   data.totalDeductions,
                    totalContributions      :   data.totalContributions,
                    totalLoans              :   data.totalLoans,
                    isloading               :   false
                })
                /* if(data.contributions.length=="0" && data.deductions.length=="0" && data.inclusions.length=="0" && data.loans.length=="0"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                } */
                //console.log("data.employees list count: " + this.state.employeeList.length)
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

    /* searchPayrollConfig = () => {
        this.setState({isLoading:true,loadingText:"Processing your request..."})
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId": this.state.selectedPayrollPeriodsId,
            "PayPeriod": this.state.selectedPayrollpayPeriod,
            "PayMode":this.state.selectedPayrollpayPeriod,
            "EmployeeId": this.state.selectedEmployeeId,
         };
         console.log("Get Pay Period List")
         
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetPayrollConfigurations",  periodListParams
             )
             .then(res => {
                const data = res.data;
                console.log("Get Payroll Configurations")
                console.log(data)
                this.setState({
                    contributionsDataList: data.contributions,
                    deductionsDataList: data.deductions,
                    inclusionsDataList: data.inclusions,
                    loansDataList: data.loans,
                    isLoading:false 
                })
                console.log("data.employees list count: " + this.state.employeeList.length)
             })
    } */




    handleChangeInclusionAdjustmentShowModal = () => {
        this.setState({modalAdjustmentShow: true})
        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
        }
        this.childAdjustment.initialize(obj)
    }

 

    handleChangeMandatoryAdjustmentShowModal(){
        this.setState({modalAdjustmentShow: true})
    }

    handleChangeLoanAdjustmentShowModal(){
        this.setState({modalAdjustmentShow: true})
    }

    handleChangeDeductionAdjustmentShowModal(){
        this.setState({modalAdjustmentShow: true})
    }
handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({
            loanModalShow           :   false,
            modalAdjustmentShow     :   false,
            modalInclusionLedgerShow    :   false,
            modalInclusionsShow :   false,
            modalDeductionShow  :   false,
            loanModalShow       :   false,
        })
    }
    

    render() {
        let modalInclusionsClose =() => this.setState({modalInclusionsShow:false});

        const columnInclusion = [
            
            {
                dataField: 'ledger',
                text: 'Ledger',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={e => this.handleChangeInclusionLedgerShowModal(row)}>View</Button>
                    );
                },
                footer: '',
                headerStyle : () => {
                    return { width  : "10%" };
                } 
            },
            {
                dataField: 'particular',
                text: 'Name',
                /* footerAlign: (column, colIndex) => 'right', */
                footer: 'Total',
                headerStyle : () => {
                    return { width  : "30%" };
                },
                footerAlign: (column, colIndex) => 'right',
            },
            {
                dataField: 'amount',
                text: 'Amount',
                footer: this.state.totalInclusions,
                footerAlign: (column, colIndex) => 'right',
                headerStyle : () => {
                    return { width  : "20%" };
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'right';
                }
            },
            {
                dataField:'remarks',
                text:'Remarks',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            }/* ,
            {
                dataField: 'action',
                text: 'Action',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={this.handleChangeInclusionAdjustmentShowModal}>Adjustment</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "10%" };
                }
            }, */
        ]
        
        let ContributionModalClose =() => this.setState({contributionModalShow:false});
        let ContributionPHICModalClose =() => this.setState({contributionPHICModalShow:false});
        let ContributionHDMFModalClose =() => this.setState({contributionHDMFModalShow:false});

        const columnMandatory = [
            
            
            {
                dataField: 'ledger',
                text: 'Ledger',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                        return (
                            <Button variant="link" onClick={e => this.handleChangeMandatoryShowModal(row)} >View</Button>
                           
                        );
                    
                },
                footer: '',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'particular',
                text: 'Name',
                footerAlign: (column, colIndex) => 'right',
                footer: 'Total',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            {
                dataField: 'amount',
                text: 'Amount',
                footer: this.state.totalContributions,
                footerAlign: (column, colIndex) => 'right',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField:'remarks',
                text:'Remarks',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            }/* ,
            {
                dataField: 'action',
                text: 'Action',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={e => this.handleChangeMandatoryAdjustmentShowModal(row)}>Adjustment</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "10%" };
                }
            }, */
            
        ]


        const columnLoans = [
            {
                dataField: 'ledger',
                text: 'Ledger',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={e => this.handleLoanModalShow(row)} >View</Button>
                    );
                },
                footer: '',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'particular',
                text: 'Name',
                footerAlign: (column, colIndex) => 'right',
                footer: 'Total',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            {
                dataField: 'amount',
                text: 'Amount',
                footer: this.state.totalLoans,
                footerAlign: (column, colIndex) => 'right',
                headerStyle : () => {
                    return { width  : "20%" };
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'right';
                }
            },
            {
                dataField:'remarks',
                text:'Remarks',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            }/* ,
            {
                dataField: 'action',
                text: 'Action',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={e => this.handleChangeLoanAdjustmentShowModal(row)}>Adjustment</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "10%" };
                }
            }, */
        ]


        let modalDeductionClose =() => this.setState({modalDeductionShow:false});
        
        const columnCharges = [
            
            
            {
                dataField: 'ledger',
                text: 'Ledger',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={e => this.handleChangeDeductionShowModal(row)}>View</Button>
                    );
                },
                footer: '',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'particular',
                text: 'Name',
                footerAlign: (column, colIndex) => 'right',
                footer: 'Total',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            {
                dataField: 'amount',
                text: 'Amount',
                footer: this.state.totalDeductions,
                footerAlign: (column, colIndex) => 'right',
                headerStyle : () => {
                    return { width  : "20%" };
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'right';
                }
            },
            {
                dataField:'remarks',
                text:'Remarks',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            }/* ,
            {
                dataField: 'action',
                text: 'Action',
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button variant="link" onClick={e => this.handleChangeDeductionAdjustmentShowModal(row)}>Adjustment</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "10%" };
                }
            }, */
        ]
           
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };
    
   
        return(
            <div>
                <Banner />
                <Container fluid>
                    <Card className="mt-5">
                    <Card.Header>Payroll >> Payroll Transactions</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.getClientList}
                                            placeholder="Select Client"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                        <Form.Control 
                                                type="text" 
                                                placeholder="Employee Branch" 
                                                autoComplete="off" 
                                                name="employeeBranch"
                                                value={this.state.selectedEmployeeBranch}
                                                readOnly/>
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
                                                readOnly/>
                                        </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                        <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Current Period:</span> <span style={{color: 'red'}}>{this.state.selectedPayrollpayPeriod}</span></label>
                                    </Form.Group>
                                </Form.Row>

                                 <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                        <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Pay Mode:</span> <span style={{color: 'red'}}>{this.state.selectedPayrollPayMode}</span></label>
                                    </Form.Group>
                                </Form.Row>

                                {/* <ButtonToolbar  >
                                    <Button  className="ml-auto" variant="info" onClick = { this.searchPayrollConfig }>
                                        Search
                                    </Button>
                                </ButtonToolbar> */}
                                
                            </Form>
                            
                            <Tabs className="mt-2" defaultActiveKey="inclusions" transition={false} id="noanim-tab-example">
                                <Tab eventKey="inclusions" title="Inclusions">
                                    <Card>
                                        <Card.Header>
                                            Inclusion
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                                                <Col sm={12} >
                                                    <BootstrapTable
                                                        caption={Noser.TableHeader({title:"Inclusion"})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                        /* pagination={ paginationFactory(options) } */
                                                        keyField = "name"
                                                        data = { this.state.inclusionsDataList}
                                                        columns = { columnInclusion }
                                                        //selectRow = { selectRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                    />
                                                </Col>

                                            </Form.Group>
                                            <ButtonToolbar sm={12} className="mt-5">
                                                <Button variant="success" onClick={this.handleChangeInclusionCreateModal}>
                                                    CREATE
                                                </Button>{/* &nbsp;&nbsp;
                                                <Button variant="danger">
                                                    DELETE
                                                </Button> */}
                                            </ButtonToolbar>
                                        </Card.Body>
                                    </Card>
                                </Tab>

                                <Tab eventKey="charges" title="Employee Charges">
                                    <Card>
                                        <Card.Header>
                                            Employee Charges
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                                                <Col sm={12} >
                                                    <BootstrapTable
                                                        caption={Noser.TableHeader({title:"Employee Charges"})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                        keyField = "id"
                                                        data = { this.state.deductionsDataList}
                                                        columns = { columnCharges }
                                                        //selectRow = { selectRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <ButtonToolbar sm={12} className="mt-5">
                                                <Button variant="success" onClick={this.handleChangeDeductionCreateModal}>
                                                    CREATE
                                                </Button>{/* &nbsp;&nbsp;
                                                <Button variant="danger">
                                                    DELETE
                                                </Button> */}
                                            </ButtonToolbar>
                                        </Card.Body>
                                    </Card>
                                </Tab>

                                <Tab eventKey="contribution" title="Mandatory Contribution">
                                    <Card>
                                        <Card.Header>
                                            Mandatory Contribution
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                                                <Col sm={12} >
                                                    <BootstrapTable
                                                        caption={Noser.TableHeader({title:"Mandatory Contribution"})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                        keyField = "id"
                                                        data = { this.state.contributionsDataList}
                                                        columns = { columnMandatory }
                                                        //selectRow = { selectRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                 </Tab>

                                <Tab eventKey="loans" title="Loans">
                                    <Card>
                                        <Card.Header>
                                            Loans
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                                                <Col sm={12} >
                                                    <BootstrapTable
                                                        caption={Noser.TableHeader({title:"Loans"})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                        
                                                        keyField = "id"
                                                        data = { this.state.loansDataList}
                                                        columns = { columnLoans }
                                                        //selectRow = { selectRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <ButtonToolbar sm={12} className="mt-5">
                                                <Button variant="success" onClick={this.handleChangeLoansCreateModal}>
                                                    CREATE
                                                </Button>{/* &nbsp;&nbsp;
                                                <Button variant="danger">
                                                    EDIT
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="info">
                                                    STOP/PROCEED PAYMENT
                                                </Button> */}
                                            </ButtonToolbar>
                                        </Card.Body>
                                    </Card>
                                 </Tab>
                            </Tabs>
                            <div className="mt-5">
                                <ButtonToolbar>
                                    {/* <Button className="ml-auto" variant="success" onClick={this.onSubmitSave}>Save</Button>&nbsp;&nbsp;&nbsp; */}
                                    <Button className="ml-auto" variant="danger" href="/home">Close</Button>
                                </ButtonToolbar>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                <PayrollSSSDeductionsModal 
                    show={this.state.contributionModalShow}
                    onHide={ContributionModalClose}/>

                <PayrollPHICDeductionsModal 
                    show={this.state.contributionPHICModalShow}
                    onHide={ContributionPHICModalClose}/>

                <PayrollHDMFDeductionsModal 
                show={this.state.contributionHDMFModalShow}
                onHide={ContributionHDMFModalClose}/>

                <PayrollLoansModal 
                show={this.state.loanModalShow}
                onHide={this.handleModalClose}
                onRefLoanModal={ref => (this.childLoans = ref)}
                />

                {/* <PayrollTransactionInclusionModal 
                show={this.state.inclusionModalShow}
                onHide={InclusionModalClose}/> */}

                <PayrollInclusionsModal 
                show={this.state.modalInclusionsShow}
                onHide={this.handleModalClose}
                onRefInclusionModal={ref => (this.childInclusion = ref)}/>

                <PayrollDeductionsModal 
                show={this.state.modalDeductionShow}
                onHide={this.handleModalClose}
                onRefDeductionModal={ref => (this.childDeduction = ref)}/>

                <PayrollLoanAdjustmentsModal 
                    show={this.state.modalAdjustmentShow}
                    onHide={this.handleModalClose}
                    onRefAdjustment={ref => (this.childAdjustment = ref)}
                />

                <LedgerModal 
                    show={this.state.modalInclusionLedgerShow}
                    onHide={this.handleModalClose}
                    onRefLedger={ref => (this.childLedger = ref)}
                    /* onRef={ref => (this.child = ref)} */
                />

                {/* <PayrollInclusionLedgerModal 
                    show={this.state.modalLoanShow}
                    onHide={modalLoanClose}
                    displayEmployeeId={this.state.selectedEmployeeId}
                    displayLedgerTypeId={this.state.selectedEmployeeId}
                    displayReferenceId={this.state.selectedEmployeeId}
                /> */}
            
            </div>
        )
    }

}



export  default PayrollConfiguration