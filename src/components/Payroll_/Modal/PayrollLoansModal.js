import {
    React,Component, BootstrapTable, Panel,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton
} 
from '../../../noser-hris-component';
import { parseISOWithOptions } from 'date-fns/fp';


class PayrollLoansModal extends Component {
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

            getClientList : [],
            getEmployeeList : [],
            getEmployeeNoList: [],
            selectedClientId: [],
            clientLocationList: [],
            getLoanTypesList: [],
            EffectivityMonth: new Date(),
            DateLoanGranted: "",
            IsRecurring: false,
            LoanTypeNumber: '',
            LoanAmount: '',
            PayableMonths: '',
            monthlyAmortization: '',
            BeginningBalance: '',
            getPayModesList: [],
            monthsToPay: '',
            IsNew : false,
            IsOld: false,
            AmountPerCutOff: '',
            RemainingMonths: '',
            beginningBalanceReadOnly: false,
            loanList :[],
            clientName  :   '',
            clientId  :   '',
            employeeName  :   '',
            employeeId  :   '',
        }
    }


    handleChangeCheckboxRecurring(e) {
        /* let isCheckedIsBasicSalary = e.target.checked ? "1" : "0";
        console.log(isCheckedIsBasicSalary) */
        this.setState({
            IsRecurring: e.target.checked
        })
    }

    

    onChangeLoanTypeNumber = (e) => {
        this.setState({ LoanTypeNumber: e.target.value} );
    }
    
    onChangeLoanAmount = (e) => {
        const LoanAmount = e.target.value;

        if (!LoanAmount || LoanAmount.match(/^\d{1,}(\.\d{0,4})?$/)) {
        this.setState(() => ({ LoanAmount }));
        }
    }

    onChangeMonthsToPay = (e) => {
        this.setState({ monthsToPay: e.target.value} );
    }
    
    onChangeMonthlyAmortization = (e) => {
        this.setState({ monthlyAmortization: e.target.value} );
        if(this.state.selectedLoanTypeId == 3){
            if(this.state.selectedEmployeePayModeId == 1) {
                

                if(e.target.value!='')
                {
                    if(this.state.selectedEmployeePayModeId=="1")
                    {
                        this.state.AmountPerCutOff = (parseFloat(e.target.value) /2).toFixed(2);
                    }
                    /* else  *//* if(this.state.selectedEmployeePayModeId=="2")
                    {
                        this.state.AmountPerCutOff = (parseFloat(e.target.value) /4).toFixed(2);
                    } *//* 
                    else
                    {
                        this.state.AmountPerCutOff = e.target.value;
                    } */
                }
                else
                {
                    this.state.AmountPerCutOff = '0';
                }
            }
        }
        if(this.state.selectedLoanTypeId == 1){
            if(this.state.selectedEmployeePayModeId == 1) {
                this.setState({
                    AmountPerCutOff : "0"
                })
            }
        }
        if(this.state.selectedLoanTypeId == 2){
            if(this.state.selectedEmployeePayModeId == 1) {
                this.setState({
                    AmountPerCutOff : "0"
                })
            }
        }

        /* if(this.state.selectedLoanTypeId == 2){ */
            
            if(this.state.selectedEmployeePayModeId=="2"){
                if(e.target.value!=''){
                    this.state.AmountPerCutOff = (parseFloat(e.target.value) /4).toFixed(2);
                }
                else
                {
                    this.state.AmountPerCutOff = '0';
                }
            }
        /* */

    }

    onChangeBeginningBalance = (e) => {
        this.setState({ 
            BeginningBalance: e.target.value,
            RemainingMonths : (parseFloat(e.target.value) /parseInt(this.state.monthlyAmortization)).toFixed(2)
        });

        
    }

    onChangeAmountPerCutOff = (e) => {
        this.setState({ 
            AmountPerCutOff: e.target.value,
        });
    }

    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
    }

    handleChangeCheckboxIsNew = (e) => {
        this.setState({
            checkIsOld: false,
            IsNew: true,
            checkIsNew: true,
            IsOld: false,
            BeginningBalance : this.state.LoanAmount,
            RemainingMonths : (parseFloat(this.state.LoanAmount) /parseInt(this.state.monthlyAmortization)).toFixed(2),
            beginningBalanceReadOnly: true
        })
    }

    handleChangeCheckboxIsOld = (e) => {
        this.setState({
            checkIsNew: false,
            IsOld: true,
            IsNew: false,
            checkIsOld: true,
            BeginningBalance : '',
            beginningBalanceReadOnly: false,
            RemainingMonths: ''
        })
        
    }

    onSubmitSavePayrollLoans = () => {
        this.setState({isloading:true})

        /* let DateLoanGranted = moment(this.state.DateLoanGranted).format('MM/DD/YYYY');
        if(this.state.DateLoanGranted == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please select Date loan",
                fade            :   true
            })
            return

        }
        if(this.state.LoanTypeNumber == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please enter loan voucher number",
                fade            :   true
            })
            return

        }
        if(this.state.LoanAmount == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please enter loan amount",
                fade            :   true
            })
            return

        }
        if(this.state.monthsToPay == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please enter months to pay",
                fade            :   true
            })
            return

        }
        if(this.state.monthlyAmortization == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please enter monthly amortization",
                fade            :   true
            })
            return

        }
        if(this.state.BeginningBalance == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please enter beginning balance",
                fade            :   true
            })
            return

        } */

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.employeeId,
            "LoanTypeId":this.state.selectedLoanTypeId,
            "LoanTypeNumber":this.state.LoanTypeNumber,
            "PrincipalAmount":this.state.LoanAmount,
            "PayableMonths":this.state.monthsToPay,
            "MonthlyAmotization":this.state.monthlyAmortization,
            "DateLoanGranted":this.state.DateLoanGranted,
            "BeginningBalance":this.state.BeginningBalance,
            "IsRecurring":"0",
            "EffectivityMonth":(this.state.EffectivityMonth ? this.formatDate(this.state.EffectivityMonth) : ""),
            "PayModeId":this.state.selectedEmployeePayModeId,
            "IsNew":(this.state.IsNew)? "1" : "0",
            "RemainingMonths":this.state.RemainingMonths,
            "AmountPerCutOff":this.state.AmountPerCutOff,
        }

        console.log("Submit Parameters")
        console.log(getParams)
        

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/AddLoan", getParams)
            .then(res => {
                console.log("Add Loans List ");
                console.log(res.data);
                const data = res.data;
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

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getLoanTypes();
        console.log("selectedLoansListData");
        this.setState({
            disableIsFirstCutOff: true,
            disableIsSecondCutOff: true,
            disableIsThirdCutOff: true,
            disableIsFourthCutOff: true,
        });
        this.props.onRefLoanModal(this)
    }

    componentWillUnmount() {
        this.props.onRefLoanModal(undefined)
    }
    initialize=(e)=>{
        //alert("Data from Parent : ID :" + e.Id + " : " + e.Name)
        //reintialize all controls and auto complete data here
        this.setState({ isshow:false,fade:false,alerttype:"",color:"",message:"",

                        getClientList : [],
                        selectedEmployeeBranch : '',
                        selectedEmployeeNo: '',
                        selectedLoanTypeId : '',
                        getEmployeeList : [],
                        getEmployeeNoList: [],
                        selectedClientId: '',
                        selectedEmployeeId : '',
                        clientLocationList: [],
                        getLoanTypesList: [],
                        loanList :[],
                        EffectivityMonth: new Date(),
                        DateLoanGranted: "",
                        IsRecurring: false,
                        LoanTypeNumber: '',
                        LoanAmount: '',
                        PayableMonths: '',
                        monthlyAmortization: '',
                        BeginningBalance: '',
                        getPayModesList: [],
                        monthsToPay: '',
                        IsNew : false,
                        IsOld: false,
                        RemainingMonths: '',
                        beginningBalanceReadOnly: false,
                        AmountPerCutOff:'',
        }); 
 
        this.state.clientName      =   e.clientNameFromParent
        this.state.clientId        =   e.clientIdFromParent
        this.state.employeeName    =   e.employeeNameFromParent
        this.state.employeeId      =   e.employeeIdFromParent
        this.state.selectedEmployeePayMode      =   e.employeePayModeFromParent
        this.state.selectedEmployeePayModeId      =   e.employeePayModeIdFromParent
        this.getLoanTypes();

        console.log(this.state.selectedEmployeePayMode )
        console.log(this.state.selectedEmployeePayModeId )
    }

    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
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

    getLoan(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedLoanTypeName

        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes", getParams)
        .then(res => {
            console.log("Get Loan");
            console.log(res.data.loanTypes);
            this.setState({loanList : res.data.loanTypes ? res.data.loanTypes : []})
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

    onChangeGetLoanTypes = (e) => {
        if(e.length == 0) {
            this.state.selectedLoanTypeId=""
            this.state.selectedLoanTypeName=""
            return
        } 
        this.state.selectedLoanTypeId = e[0].id
        this.state.selectedLoanTypeName = e[0].name
        console.log("Client selectedLoanTypeId " + this.state.selectedLoanTypeId );

        if(this.state.selectedLoanTypeId == 1){
            if(this.state.selectedEmployeePayModeId == 1) {
                this.setState({
                    AmountPerCutOff : "0"
                })
            }
        }
        if(this.state.selectedLoanTypeId == 2){
            if(this.state.selectedEmployeePayModeId == 1) {
                this.setState({
                    AmountPerCutOff : "0"
                })
            }
        }
        

        this.getLoan();
        
    }

    /* getClientLocation(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClientName,
            "City": "",
            "Province": "",
            "Region": ""
    
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
        .then(res => {
            console.log("Client Location");
            console.log(res.data.locations);
            this.setState({clientLocationList : res.data.locations ? res.data.locations : []})
        })
        .catch(error=>{
            this.setState(
            {
                isLoading:false,
                alertType:"Error! ",
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })
        })
    }
    onChangeLocation = (e) => {
        if(e.length == 0) {
                this.state.selectedLocationName = ""
                this.state.selectedLocationId = ""
                return
        }  
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId = e[0].id
    } */

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
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isLoading:false,}) 
            else
                this.setState({getEmployeeList : [], getEmployeeNoList : [],isLoading:false}) 
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

    setEmployeeCurrentInfo() {
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClientName,
            "EmployeeId": this.state.selectedEmployeeId,
            "City": "",
            "Province": "",
            "Region": ""
    
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
        .then(res => {
            console.log("Client Location");
            console.log(res.data.locations);
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
/* 
    onChangeEmployeesList = (e) => {
       console.log(e[0].locationName)
        if(e.length==0)
        {
            this.setState({getEmployeeListData: null, selectedEmployeePayMode: '', selectedWorkScheduleIdParam: '',selectedEmployeePayModeId: '', selectedPayModeId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
          
            return
        }
        this.setState({isLoading:true})
        this.state.selectedEmployeeId = e[0].id
        this.state.selectedEmployeePayModeId = e[0].payModeId
        this.state.selectedEmployeePayMode= e[0].payMode
        
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.state.selectedEmployeeBranch = e[0].locationName
        /* this.state.selectedLocation = e[0].locationName */
        /* this.setState({isLoading:false}) */

        /* console.log(this.state.selectedLocation) */
        /* this.setState({selectedLocation: e[0].locationName}) */
       /* this.setEmployeeCurrentInfo();
        if(this.state.selectedEmployeePayModeId == 1){
            this.setState({
            disableIsFirstCutOff: false,
            disableIsSecondCutOff: false,
          });
        }

        if(this.state.selectedEmployeePayModeId == 3){
            this.setState({
            disableIsFirstCutOff: false,
            disableIsSecondCutOff: false,
            disableIsThirdCutOff: false,
            disableIsFourthCutOff: false,
          });
        }
    } * */

   /*  onChangeEmployeeBranch(e){
        this.setState({selectedEmployeeBranch : e.target.value})
        console.log(e.target.value)
    }

    onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        console.log(e.target.value)
    } */

    handleChangeEffectivityMonth = date => {
        this.setState({
            EffectivityMonth: date
        });
        console.log(this.state.EffectivityMonth)
    };

    
    handleChangeDateLoanGranted = date => {
        this.setState({
            DateLoanGranted: date
        });
        console.log(this.state.DateLoanGranted)
    };




    render() {

        const {selectedLocation} = this.state;

    return(
        
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Payroll Loans
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row}  className="mt-3" controlId="formGridEmail">
                                <Col sm={12} >
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="clientName"
                                        value={this.state.clientName}
                                        readOnly/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formGridEmail">
                                <Col sm={12} >
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="employeeName"
                                        value={this.state.employeeName}
                                        readOnly/>
                                </Col>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeGetLoanTypes}
                                        options={this.state.getLoanTypesList}
                                        placeholder="Select Loan Types"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='description'
                                        id="basic-example"
                                        onChange={this.onChangetLoan}
                                        options={this.state.loanList}
                                        placeholder="Select Loan"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Pay Mode:</span> <span style={{color: 'red'}}>{this.state.selectedEmployeePayMode}</span></label>
                                </Form.Group>
                            </Form.Row>

                            <div className="mt-3">
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                        <Form.Label >
                                            Date Loan
                                        </Form.Label>&nbsp;&nbsp;&nbsp;
                                        <DatePicker
                                            ref='DateLoanGranted'
                                            selected={this.state.DateLoanGranted}
                                            onChange={this.handleChangeDateLoanGranted}
                                            minDate={this.minDate}
                                            value={this.state.DateLoanGranted}
                                            dateFormat={"MM/dd/yyyy"}
                                            className="form-control"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={6} controlId="formPlaintextPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter SSS / Pag-Ibig / Voucher"
                                            ref="LoanTypeNumber"
                                            name="LoanTypeNumber"
                                            value={this.state.LoanTypeNumber}
                                            onChange={this.onChangeLoanTypeNumber}
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm={4} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Loan Amount"
                                            ref="LoanAmount"
                                            name="LoanAmount"
                                            value={this.state.LoanAmount}
                                            onChange={this.onChangeLoanAmount}
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={4} controlId="formPlaintextPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Months To Pay"
                                            ref="monthsToPay"
                                            name="monthsToPay"
                                            value={this.state.monthsToPay}
                                            onChange={this.onChangeMonthsToPay}
                                            autoComplete="off"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={4} controlId="formPlaintextPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Monthly Amortization"
                                            ref="monthlyAmortization"
                                            name="monthlyAmortization"
                                            value={this.state.monthlyAmortization}
                                            autoComplete="off"
                                            onChange={this.onChangeMonthlyAmortization}
                                        />
                                    </Form.Group>
                                </Form.Row>


                                <Form.Row>
                                    <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                        <Form.Check
                                            type="checkbox"
                                            label="New"
                                            onChange={e => this.handleChangeCheckboxIsNew(e)}
                                            checked={this.state.checkIsNew}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={4} controlId="formGridPassword">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Old" 
                                            onChange={e => this.handleChangeCheckboxIsOld(e)}
                                            checked={this.state.checkIsOld}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                        <Form.Label >
                                        Effectivity Date
                                        </Form.Label>&nbsp;&nbsp;&nbsp;
                                        <DatePicker
                                            ref='EffectivityMonth'
                                            selected={this.state.EffectivityMonth}
                                            onChange={this.handleChangeEffectivityMonth}
                                            minDate={this.minDate}
                                            value={this.props.EffectivityMonth}
                                            dateFormat={"MM/dd/yyyy"}
                                            className="form-control"
                                        />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                        Beginning Balance
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                            type="text"
                                            ref="BeginningBalance"
                                            name="BeginningBalance"
                                            value={this.state.BeginningBalance}
                                            onChange={this.onChangeBeginningBalance.bind(this)}
                                            readOnly={this.state.beginningBalanceReadOnly}
                                        />
                                    </Col>
                                    
                                </Form.Group>

                                 <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                        Amount Per Cut-Off
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control 
                                            type="text" 
                                            readOnly
                                            value={this.state.AmountPerCutOff}
                                            onChange={this.onChangeAmountPerCutOff.bind(this)}
                                        />
                                    </Col>

                                    <Form.Label column sm="4">
                                        Remaining Months To Pay
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type="text" 
                                            readOnly
                                            value={this.state.RemainingMonths}
                                        />
                                    </Col>
                                </Form.Group>
                                
                            </div>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.onSubmitSavePayrollLoans }>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
        </Modal>
        );
    }

}
export  default PayrollLoansModal