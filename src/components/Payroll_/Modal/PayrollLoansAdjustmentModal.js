import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollLoansAdjustmentModal extends Component {
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
            getLoanTypesList: [],
            EffectivityMonth: "",

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
                        Loan Adjustment
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
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='employeeName'
                                        id="basic-example"
                                        onChange={this.onChangeEmployeesList}
                                        options={this.state.getEmployeeList}
                                        placeholder="Select Employee"
                                    />
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
                                    />
                                </Form.Group>
                            </Form.Row>

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
export  default PayrollLoansAdjustmentModal