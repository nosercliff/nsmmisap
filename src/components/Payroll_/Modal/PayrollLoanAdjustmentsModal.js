import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton
} 
from '../../../noser-hris-component';



class PayrollLoanAdjustmentsModal extends Component {
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
            clientList: [],
            employeeList : [],
            getLoanTypesList:[],
            payPeriodList: [],
            deductionAmount: '',
            adjustmentAmount: '',
            balanceAmount: '',
            adjustmentTypeList: [],
            clidList:[{"name":""}],
            fromPayOutDate: "",
            toPayOutDate: "",
            clientName  :   '',
            clientId  :   '',
            employeeName  :   '',
            employeeId  :   '',

        }
    }

    handleChangeFromPayOutDate = date => {
        this.setState({
            fromPayOutDate: date
        });
    };

    handleChangeToPayOutDate = date => {
        this.setState({
            toPayOutDate: date
        });
    };

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isloading:false})
        })
        this.getClientList();
        this.getLoanAdjustmentType();
        this.props.onRefAdjustment(this)
    }

    componentWillUnmount() {
        this.props.onRefAdjustment()
    }

    initialize = (e) => {
         this.setState({
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,


            selectedAdjustmentTypeId    :   '',
            selectedClidListId          :   '',
            deductionAmount             :   '',
            adjustmentAmount            :   '',
            balanceAmount               :   '',
            FromPayOutDate              :   '',
            ToPayOutDate                :   '',
         })
 
            this.state.clientName           =   e.clientNameFromParent
            this.state.clientId             =   e.clientIdFromParent
            this.state.employeeName         =   e.employeeNameFromParent
            this.state.employeeId           =   e.employeeIdFromParent

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
                    clientList : res.data.clients ? res.data.clients : []
                });
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alerttype:"Error! ", 
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.clientName=""
            this.state.clientId=""
            return
        } 
        this.state.clientId = e[0].id
        this.state.clientName = e[0].name
        console.log("Client selectedClientName " + this.state.clientName );
        this.setState({isloading:true})
        
        this.getEmployees();
        
    }

    getEmployees(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
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
                this.setState({employeeList : data.employees, getEmployeeNoList : data.employees,isloading:false, getCurrentMonthly: data.employeespayPeriod}) 
            else
                this.setState({employeeList : [], getEmployeeNoList : [],isloading:false}) 
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alerttype:"Error! ", 
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
        
    }

    onChangeEmployeesList = (e) => {
        if(e.length == 0) {
            this.state.employeeId=""
            return
        } 
        this.state.employeeId = e[0].id
        console.log("selectedEmployeeId " + this.state.employeeId );

    }

   
    
    onChangeDeductionAmount = (e) => {
        this.setState({ deductionAmount: e.target.value} );
    }
    
    onChangeAdjustmentAmount = (e) => {
        this.setState({ adjustmentAmount: e.target.value} );
    }

    onChangeBalanceAmountAmount = (e) => {
        this.setState({ balanceAmount: e.target.value} );
    }


    onSubmitSavePayrollLoanAdjustment = () => {

        /* this.setState({isloading:true}) */
        let FromPayOutDate = moment(this.state.fromPayOutDate).format('MM/DD/YYYY');
        let ToPayOutDate = moment(this.state.toPayOutDate).format('MM/DD/YYYY');

        const getParams = {

            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.employeeId,
            "AdjustmentTypeId":this.state.selectedAdjustmentTypeId,
            "ReferenceId":this.state.selectedClidListId,
            "DeductionAmount":this.state.deductionAmount,
            "AdjustmentAmount":this.state.adjustmentAmount,
            "BalanceAmount":this.state.balanceAmount,
            "FromPayOutDate":FromPayOutDate,
            "ToPayOutDate":ToPayOutDate
        }

        console.log("Submit Parameters")
        console.log(getParams)
        

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/AddAdjustment", getParams)
            .then(res => {
                console.log("Add Adjustment ");
                console.log(res.data);
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


    getLoanAdjustmentType(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLedgerTypes", getParams)
        .then(res => {
            console.log("Get Adjustment Types")
            console.log(res.data)
            const resultData = res.data
            this.setState({
                adjustmentTypeList : resultData.ledgerTypes
            })
        })
    }

    onChangeAdjustmentType = (selectedOptions) => {

        if(selectedOptions.length == 0) {
            this.state.selectedAdjustmentTypeId=""
            return
        } 
        this.state.selectedAdjustmentTypeId = selectedOptions[0].id
        console.log("selectedAdjustmentTypeId " + this.state.selectedAdjustmentTypeId );
        
        var url = "";
        var coverage = "";
        if(selectedOptions.length==0) return;
        coverage = selectedOptions[0].name
        this.setState({ filterCoverage: coverage });
        if(selectedOptions[0].id==1)
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetMandatoryContributionTypes";

        if(selectedOptions[0].id==2)
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes";

        if(selectedOptions[0].id==3){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes";
            
        }

        if(selectedOptions[0].id==4){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes";
        }
        const GetInclusionTypes = selectedOptions[0].id
        this.setState({selectedAdjustmentId: GetInclusionTypes})
        console.log(GetInclusionTypes)

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        };

        axios
        .post(url,  getParams)
        .then(res => {
            const data = res.data;
           
            if(selectedOptions[0].id==1)
                this.setState({ clidList: data.contributionTypes, dynamicAdjustmentPlaceholder: "Select Mandatory Contributions" });
            if(selectedOptions[0].id==2)
                this.setState({ clidList: data.loanTypes, dynamicAdjustmentPlaceholder: "Select Employee Loans" }); 
            if(selectedOptions[0].id==3)
                this.setState({ clidList: data.inclusionTypes, dynamicAdjustmentPlaceholder: "Select Employee Inclusions"});
            if(selectedOptions[0].id==4)
                this.setState({ clidList: data.deductionTypes, dynamicAdjustmentPlaceholder: "Select Employee Deductions" });


           /*  console.log(this.state.clidList); */
        }) 
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alerttype:"Error!", 
                isshow:true,
                color:"danger",
                Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                Fade:true
            })  
        })
        
    }

    onChangeClidList = (e) =>{  

        
        if(e.length == 0) {
            this.state.selectedClidListId=""
            return
        } 
        this.state.selectedClidListId = e[0].id
        console.log("selectedClidListId " + this.state.selectedClidListId );

    }

    onModalClose = () => {
        this.props.onHide();
    }

    render() {

        /* const selectedDate = moment().format('LL'); */

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
                       Payroll Adjustment
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

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeAdjustmentType}
                                        options={this.state.adjustmentTypeList}
                                        placeholder="Select Adjustment Type"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClidList}
                                        options={this.state.clidList}
                                        placeholder={this.state.dynamicAdjustmentPlaceholder}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        ref="deductionAmount"
                                        name="deductionAmount"
                                        value={this.state.deductionAmount}
                                        onChange={this.onChangeDeductionAmount}
                                        placeholder="Enter Deduction Amount"
                                    />
                                </Col>

                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        ref="adjustmentAmount"
                                        name="adjustmentAmount"
                                        value={this.state.adjustmentAmount}
                                        onChange={this.onChangeAdjustmentAmount}
                                        placeholder="Enter Adjustment Amount"
                                    />
                                </Col>

                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        ref="balanceAmount"
                                        name="balanceAmount"
                                        value={this.state.balanceAmount}
                                        onChange={this.onChangeBalanceAmountAmount}
                                        placeholder="Enter Balance Amount"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="4">
                                    <Form.Label>
                                        From Pay Out Date :
                                    </Form.Label>
                                </Col>
                                <Col sm="2">
                                    <DatePicker
                                        ref='fromPayOutDate'
                                        selected={this.state.fromPayOutDate}
                                        onChange={this.handleChangeFromPayOutDate}
                                        minDate={this.minDate}
                                        value={this.state.fromPayOutDate}
                                        dateFormat={"MM/dd/yyyy"}
                                        /* dateFormat="MMMM d, yyyy" */
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="4">
                                    <Form.Label>
                                        To Pay Out Date :
                                    </Form.Label>
                                </Col>
                                <Col sm="2">
                                    <DatePicker
                                        ref='toPayOutDate'
                                        selected={this.state.toPayOutDate}
                                        onChange={this.handleChangeToPayOutDate}
                                        minDate={this.minDate}
                                        value={this.state.toPayOutDate}
                                        dateFormat={"MM/dd/yyyy"}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.onSubmitSavePayrollLoanAdjustment }>
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
export  default PayrollLoanAdjustmentsModal