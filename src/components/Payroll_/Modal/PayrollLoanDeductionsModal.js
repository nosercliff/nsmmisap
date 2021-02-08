import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollLoanDeductionsModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            getClientList : [],
            getEmployeeList : [],
            getEmployeeNoList: [],
            selectedClientId: [],
            clientLocationList: [],
            getLoanTypesList: [],
        }

    }
    componentDidMount(){
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.getLoanTypes();
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
                    isLoading:false,
                    getClientList : res.data.clients ? res.data.clients : []
                });
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

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        console.log("Client selectedClientName " + this.state.selectedClientName );
        this.setState({isLoading:true,loadingText:"Retrieving employee list..."})
        
        this.getEmployees();
        this.getClientLocation();
        
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
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isLoading:false,}) 
            else
                this.setState({getEmployeeList : [], getEmployeeNoList : [],isLoading:false}) 
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

    onChangeEmployeesList = (e) => {


        if(e.length==0)
        {
            this.setState({getEmployeeListData: null, selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
          
            return
        }
        this.setState({isLoading:true})
        this.state.selectedEmployeeId = e[0].id
        
        this.state.selectedPayrollPeriodsId = e[0].payPeriodId
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.setState({isLoading:false})

        console.log("Work selectedEmployeeName   " + this.state.selectedEmployeeNo );

    }

    onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        console.log(e.target.value)
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


    render() {

    return(
        
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payroll Mandatory Contributions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
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
                                        onChange={this.onChangeEmployeesNo.bind(this)}/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='employeeName'
                                        id="basic-example"
                                        onChange={this.onChangegetLoanTypes}
                                        options={this.state.getLoanTypesList}
                                        placeholder="Select Loan Types"
                                        autocomplete="false"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <div className="mt-3">
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formPlaintextPassword">
                                        {/* <Form.Label column sm="4">
                                            SSS / Pag-Ibig / Voucher
                                        </Form.Label> */}
                                        <Form.Control type="text" placeholder="Enter SSS / Pag-Ibig / Voucher" />
                                        {/* <Form.Label column sm="4">
                                            Principal Amount
                                        </Form.Label> */}
                                    </Form.Group>
                                    <Form.Group as={Col} sm={6} controlId="formPlaintextPassword">
                                        <Form.Control type="text" placeholder="Enter Principal Amount"  />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm={4} controlId="formPlaintextPassword">
                                        <Form.Control type="text" placeholder="Enter Date Loan Granted" />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={4} controlId="formPlaintextPassword">
                                        <Form.Control type="text" placeholder="Enter Payable Months"  />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={4} controlId="formPlaintextPassword">
                                        <Form.Control type="text" placeholder="Enter Monthly Amortization"  />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                    Beginning Balance
                                    </Form.Label>
                                    <Col sm="4">
                                    <Form.Control type="text" />
                                    </Col>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} sm={2} controlId="formPlaintextPassword">
                                        <Form.Check type="checkbox" label="Recurring" />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={4} controlId="formPlaintextPassword">
                                        <Form.Control type="text" placeholder="Enter Payable Months"  />
                                    </Form.Group>
                                </Form.Row>

                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
            <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
        </Modal>
        );
    }

}
export  default PayrollLoanDeductionsModal