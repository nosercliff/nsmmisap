import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';

class PayrollDeductionAdjustments extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:true,
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            getClientList: [],
            getEmployeeList : [],
            modalLoanShow: false,
            getLoanTypesList:[],

        }
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
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isLoading:false, getCurrentMonthly: data.employeespayPeriod}) 
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
        if(e.length == 0) {
            this.state.selectedEmployeeId=""
            return
        } 
        this.state.selectedEmployeeId = e[0].id
        console.log("selectedEmployeeId " + this.state.selectedEmployeeId );
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

    onChangegetLoanTypes = (e) => {
        if(e.length == 0) {
            this.state.selectedLoanTypeId=""
            return
        } 
        this.state.selectedLoanTypeId = e[0].id
        console.log("Client selectedLoanTypeId " + this.state.selectedLoanTypeId );
        
    }

    render() {
        return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>PAYROLL Contribution Adjustment</Card.Header>
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
                            </Form>
                            <ButtonToolbar>
                                <Button  className="ml-auto" variant="primary" variant="success">
                                    Create
                                </Button>&nbsp;&nbsp;
                                {/* <Button variant="info">
                                    Edit
                                </Button>&nbsp;&nbsp; */}
                                <Button variant="danger" onClick={this.handleDeleteClick}>
                                    Delete
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger" href="/home">
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
            </div>
        )
    }

}

export  default PayrollDeductionAdjustments
