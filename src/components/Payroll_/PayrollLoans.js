import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, Modal
} 
from '../../noser-hris-component';

import  PayrollLoansModal  from './Modal/PayrollLoansModal';


/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */



class PayrollLoans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            getClientList: [],
            getEmployeeList : [],
            modalLoanShow: false,
            getLoanTypesList:[],
            getLoansListTable: [],
            loanDataListFromDB: [],
            onLoansListData: [],
            LoanListData: [],
            stopPaymentId  :   '',
            proceedPaymentId    :   '',

        } 
        /* this.onChangeClientype=this.onChangeClientype.bind(this);  */

    
    }

  
      


    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
        this.getLoanTypes();
    }

    getLoanTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":""

        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes", getParams)
        .then(res => {
            console.log("Get Loan Types");
            console.log(res.data.loanTypes);
            this.setState({getLoanTypesList : res.data.loanTypes ? res.data.loanTypes : []})
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

    onChangegetLoanTypes = (e) => {
        if(e.length == 0) {
            this.state.selectedLoanTypeId=""
            return
        } 
        this.state.selectedLoanTypeId = e[0].id
        console.log("Client selectedLoanTypeId " + this.state.selectedLoanTypeId );
        
    }



    handleSearchClick = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":this.state.selectedEmployeeId,
            "LoanTypeId":this.state.selectedLoanTypeId,
            "LoanTypeNumber":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetLoans", getParams)
        .then(res => {
            console.log("GetLoans")
            console.log(res.data)
            const data = res.data;
            this.setState({
                getLoansListTable : data.loans,
                isloading   :   false,
                isshow      :   false,
            })
            if(data.loans.length=="0"){
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
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
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
            this.setState(
                {
                    isloading:false,
                    getClientList : res.data.clients ? res.data.clients : []
                });
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

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
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
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isloading:false, getCurrentMonthly: data.employeespayPeriod}) 
            else
                this.setState({getEmployeeList : [], getEmployeeNoList : [],isloading:false}) 
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
            this.setState({getEmployeeListData: null, selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
          
            return
        }
        this.setState({isLoading:true})
        this.state.selectedEmployeeId = e[0].id
        
        this.state.selectedPayrollPeriodsId = e[0].payPeriodId
        this.state.selectedEmployeePayMode= e[0].payMode
        this.state.selectedEmployeePayModeId= e[0].payModeId
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.setState({isshow:false,color:"",message:"",fade:true})
       
        console.log("Work selectedEmployeeName   " + this.state.selectedEmployeeNo );
        /* this.getLoans(); */
    
    }

    
    handleChangeShowLoanModal = () => {
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
        this.setState({modalLoanShow: true})
        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
            employeePayModeFromParent     :   this.state.selectedEmployeePayMode,
            employeePayModeIdFromParent     :   this.state.selectedEmployeePayModeId,
        }
        this.child.initialize(obj)
    }
    
 
    

    handleChangeEdit(row){
                
        var obj = {}
        var Details = []
            obj = {
                beginningBalance : row.beginningBalance,
                dateLoanGranted : row.dateLoanGranted,
            }
            
            Details.push(obj)
            this.setState({LoanListData : Details})
      
        this.setState({modalLoanShow: true})
    }

    refreshList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":"",
            "LoanTypeId":"",
            "LoanTypeNumber":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetLoans", getParams)
        .then(res => {
            console.log("GetLoans")
            console.log(res.data)
            this.setState({
                getLoansListTable : res.data.loans
            })
            const data = res.data;
            if(data.status=="1"){
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

    handleDeleteClick = event => {

        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isLoading:true})
        for (let i = 0; i < this.state.getLoansListTable.length; i++) {
            if (this.state.getLoansListTable[i]["isModified"] == 1) {
                
                    this.state.id = this.state.getLoansListTable[i]["id"]
                    this.state.employeeId =  this.state.getLoansListTable[i]["employeeId"]
                    this.state.loanTypeId =  this.state.getLoansListTable[i]["loanTypeId"]
                    this.state.loanTypeNumber =  this.state.getLoansListTable[i]["loanTypeNumber"]
                    this.state.principalAmount =  this.state.getLoansListTable[i]["principalAmount"]
                    this.state.payableMonths =  this.state.getLoansListTable[i]["payableMonths"]
                    this.state.monthlyAmotization =  this.state.getLoansListTable[i]["monthlyAmotization"]
                    this.state.dateLoanGranted =  this.state.getLoansListTable[i]["dateLoanGranted"]
                    this.state.beginningBalance =  this.state.getLoansListTable[i]["beginningBalance"]
                    this.state.isRecurring =  this.state.getLoansListTable[i]["isRecurring"]
                    this.state.effectivityMonth =  this.state.getLoansListTable[i]["effectivityMonth"]
                    this.state.firstCutOff =  this.state.getLoansListTable[i]["firstCutOff"]
                    this.state.secondCutOff =  this.state.getLoansListTable[i]["secondCutOff"]
                    this.state.thirdCutOff =  this.state.getLoansListTable[i]["thirdCutOff"]
                    this.state.fourthCutOff =  this.state.getLoansListTable[i]["fourthCutOff"]
                    this.state.IsDeleted = this.state.getLoansListTable[i]["isDeleted"].toString()
                

                /* this.state.newRegionList.push(obj); */
            }
        }

        console.log(this.state.id)

        const regionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":this.state.id,
            "EmployeeId":this.state.employeeId,
            "LoanTypeId":this.state.loanTypeId,
            "LoanTypeNumber":this.state.loanTypeNumber,
            "PrincipalAmount":this.state.principalAmount,
            "PayableMonths":this.state.payableMonths,
            "MonthlyAmotization":this.state.monthlyAmotization,
            "DateLoanGranted":this.state.dateLoanGranted,
            "BeginningBalance":this.state.beginningBalance,
            "IsRecurring":this.state.isRecurring,
            "EffectivityMonth":this.state.effectivityMonth,
            "FirstCutOff":this.state.firstCutOff,
            "SecondCutOff":this.state.secondCutOff,
            "ThirdCutOff":this.state.thirdCutOff,
            "fourthCutOff":this.state.fourthCutOff,
            "IsDeleted":this.state.IsDeleted 
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/EditLoan", regionParams)
            .then(res => {
                const data = res.data;
                sleep(1000).then(() => {
                    this.setState({isLoading:false})})
                this.refreshList();
                if(data.status=="1"){
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

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.getLoansListTable.length; i++) {
            if (this.state.getLoansListTable[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        console.log(id)
        this.state.getLoansListTable.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    handleStopPayment = () => {
        this.setState({
            isloading       :   true
        })

        for (let i = 0; i < this.state.getLoansListTable.length; i++) {
            if (this.state.getLoansListTable[i].IsSelected === 1) {
                this.state.stopPaymentId   =   this.state.getLoansListTable[i]["id"]

                const getParams = {
                    "IpAddress"         :   "0.0.0.0",
                    "ClientId"          :   this.state.userinfo.clientId,
                    "UserId"            :   this.state.userinfo.userId,
                    "LoanId"            :   this.state.stopPaymentId,
                    "IsStopPayment"     :   "1" ,
                }
        
                console.log("Submit Parameters")
                console.log(getParams)
                
        
                axios
                    .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/StopPayment", getParams)
                    .then(res => {
                        const data = res.data;
                        console.log(data)
                        this.refreshData();
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
                        else{
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
                            isloading   :   false,
                            alerttype   :   "Error!",
                            isshow      :   true,
                            color       :   "danger",
                            message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                            fade        :   true
                        })
                    })
            }

        }

    }

    handleProceedPayment = () => {
        this.setState({
            isloading       :   true
        })

        for (let i = 0; i < this.state.getLoansListTable.length; i++) {
            if (this.state.getLoansListTable[i].IsSelected === 1) {
                this.state.proceedPaymentId   =   this.state.getLoansListTable[i]["id"]

                const getParams = {
                    "IpAddress"         :   "0.0.0.0",
                    "ClientId"          :   this.state.userinfo.clientId,
                    "UserId"            :   this.state.userinfo.userId,
                    "LoanId"            :   this.state.proceedPaymentId,
                    "IsStopPayment"     :   "0" ,
                }
                console.log("Submit Parameters")
                console.log(getParams)
                axios
                    .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/StopPayment", getParams)
                    .then(res => {
                        const data = res.data;
                        console.log(data)
                        this.refreshData();
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
                        else{
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
                            isloading   :   false,
                            alerttype   :   "Error!",
                            isshow      :   true,
                            color       :   "danger",
                            message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                            fade        :   true
                        })
                    })
        
            }
            

        }
    }

    refreshData(){
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":this.state.selectedEmployeeId,
            "LoanTypeId":this.state.selectedLoanTypeId,
            "LoanTypeNumber":this.state.LoanTypeNumber,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetLoans", getParams)
        .then(res => {
            console.log("GetLoans")
            console.log(res.data)
            const data = res.data;
            this.setState({
                getLoansListTable : data.loans,
                isloading   :   false,
                isshow      :   false,
            })
            if(data.loans.length=="0"){
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
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
    }
    render() {

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            bgColor: (row, rowIndex) => (rowIndex > 1 ? '#AEBABA' : '#B3B4B4'),
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log("Get Row Loans List From Table");
                console.log(row);
                /* alert(isSelect) */
                this.state.getLoansListTable.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    if(isSelect)
                    {
                        if(i==rowIndex)
                        item.IsSelected=1
                    }
                    else
                    {
                        if(i==rowIndex)
                        item.IsSelected=0
                    }
                })
            }
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        }

        const columnLoans= [
            {
                dataField: 'dateLoanGranted',
                text: 'Date',
                editable: false
            },
            {
                dataField: 'stopPayment',
                text: 'Stop Payment',
                editable: false
            },
            {
                dataField: 'loanType',
                text: 'Loan Type',
                editable: false
            },
            {
                dataField: 'loanTypeNumber',
                text: 'Reference',
                editable: false
            },
            {
                dataField: 'principalAmount',
                text: 'Loan Amount',
                editable: false
            },
            {
                dataField: 'payableMonths',
                text: 'Payable Months',
                editable: false
            },
            {
                dataField: 'monthlyAmotization',
                text: 'Monthly Amortization',
                editable: false
            },
            {
                dataField: 'effectivityMonth',
                text: 'Effectivity Date',
                editable: false
            },
            {
                dataField: 'beginningBalance',
                text: 'Beginning Balance',
                editable: false
            },
            {
                dataField: 'remainingMonths',
                text: 'Balance Months To Pay',
                editable: false
            },
            {
                dataField: 'amountPerCutOff',
                text: 'Amount Per Cut-Off',
                editable: false
            },
            {
                dataField: 'Remarks',
                text: 'remarks',
                editable: false
            },
            /* {
                dataField: "databasePkey",
                text: "Edit",
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button
                            variant="info"
                            onClick={e => this.handleChangeEdit(row)
                                
                            }
                            
                        >Edit</Button>
                    );
                }
            } */

        ]


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

        let modalLoanClose =() => this.setState({modalLoanShow:false});
        
        return (
            <div>

                <Banner />
                <Container fluid>
                    <Card className="mt-5">
                        <Card.Header>Payroll Loans</Card.Header>
                        <Card.Body>
                            <Form >
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
                                            options={this.state.getClientList}
                                            placeholder="Select Client"

                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='employeeName'
                                            id="basic-example"
                                            onChange={this.onChangeEmployeesList}
                                            options={this.state.getEmployeeList}
                                            placeholder="Select Employee"
                                            autocomplete="false"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangegetLoanTypes}
                                            options={this.state.getLoanTypesList}
                                            placeholder="Select Loan Types"
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                        <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Pay Mode:</span> <span style={{color: 'red'}}>{this.state.selectedEmployeePayMode}</span></label>
                                    </Form.Group>
                                </Form.Row>


                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                Search
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                                <Card.Header>Record</Card.Header>
                                <div className="mt-1">

                                    <BootstrapTable
                                        caption={Noser.TableHeader({title:"LOANS LIST"})}
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        pagination={ paginationFactory(options) }
                                        keyField = "id"
                                        data = { this.state.getLoansListTable }
                                        columns = { columnLoans}
                                        selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ 
                                                mode: 'dbclick', 
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                }
                                            })
                                        }
                                        rowEvents={ rowEvents }

                                    /> 

                                    <ButtonToolbar>
                                        <Button  className="ml-auto" variant="primary" variant="success" onClick={this.handleChangeShowLoanModal}>
                                            Create
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="success" onClick={this.handleProceedPayment}>
                                            Proceed Payment
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={this.handleStopPayment}>
                                            Stop Payment
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/home">
                                            Close
                                        </Button>
                                    </ButtonToolbar>
                                </div>
                            
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />   

                <PayrollLoansModal 
                    show={this.state.modalLoanShow}
                    onHide={modalLoanClose}
                    selectedLoansListData={this.state.LoanListData}
                    onRefLoanModal={ref => (this.child = ref)}
                />
            </div>
        );
    }
}

export default PayrollLoans;
