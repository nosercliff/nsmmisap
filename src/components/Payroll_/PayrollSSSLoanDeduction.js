import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';

class PayrollSSSLoanDeduction extends Component {
    constructor(props) {
        super(props)
        this.state ={
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

        }
    }

    componentDidMount(){
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
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

        render() {
            return(
                <div>
                    <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>SSS Loan Deduction</Card.Header>
                            <Card.Body>
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

                                    <Card className="mt-3">
                                        <Card.Header>SSS Loan Details</Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                                <Form.Label column sm="2">
                                                    SSS Number
                                                </Form.Label>
                                                <Col sm="4">
                                                    <Form.Control type="text" placeholder="Enter SSS Number" />
                                                </Col>
                                                <Form.Label column sm="2">
                                                    Principal Amount
                                                </Form.Label>
                                                <Col sm="4">
                                                    <Form.Control type="text" placeholder="Enter Principal Amount" />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                                <Form.Label column sm="2">
                                                    Date Loan Granted
                                                </Form.Label>
                                                <Col sm="2">
                                                    <Form.Control type="text" placeholder="Enter  Date Loan Granted" />
                                                </Col>
                                                <Form.Label column sm="2">
                                                    Payable Months
                                                </Form.Label>
                                                <Col sm="2">
                                                    <Form.Control type="text" placeholder="Enter Payable Months" />
                                                </Col>
                                                <Form.Label column sm="2">
                                                    Monthly Amortization
                                                </Form.Label>
                                                <Col sm="2">
                                                    <Form.Control type="text" placeholder="Enter Monthly Amortization" />
                                                </Col>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                    <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
                </div>
            )
        }

}

export  default PayrollSSSLoanDeduction