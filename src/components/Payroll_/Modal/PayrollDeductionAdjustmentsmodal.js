import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollDeductionAdjustmentsmodal extends Component {
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

        }
    }

    

    componentDidMount(){
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.getInclusions();
        this.getInclusionTypes();
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

    handleChangeEffectivityMonth = date => {
        this.setState({
            EffectivityMonth: date
        });
        console.log(this.state.EffectivityMonth)
    };

    handleChangeMonth = date => {
        this.setState({
            Month: date
        });
        console.log(this.state.EffectivityMonth)
    };

    onChangeAmount = (e) => {
        this.setState({ Amount: e.target.value} );
    }

    onSubmitSavePayrollInclusions = () => {

        this.setState({isLoading:true})
        /* let Month = moment(this.state.Month).format('MM/DD/YYYY'); */
        let EffectivityMonth = moment(this.state.EffectivityMonth).format('MM/DD/YYYY');

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedEmployeeNo ? this.state.selectedEmployeeNo : "",
            "InclusionId":this.state.selectedInclusionsId,
            "Amount":this.state.Amount,
            "IsRecurring":(this.state.IsRecurring)? "1" : "0",
            "EffectivityMonth":EffectivityMonth,
            /* "DateLoanGranted":Month, */
            "FirstCutOff":(this.state.IsFirstCutOff)? "1" : "0",
            "SecondCutOff":(this.state.IsSecondCutOff)? "1" : "0",
            "ThirdCutOff":(this.state.IsThirdCutOff)? "1" : "0",
            "FourthCutOff":(this.state.IsFourthCutOff)? "1" : "0",
        }

        console.log("Submit Parameters")
        console.log(getParams)
        

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/AddInclusion", getParams)
            .then(res => {
                console.log("Add Loans List ");
                console.log(res.data);
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            isLoading:false,
                            show:true,
                            Color:"success",
                            Message:data.message,
                            Fade:true
                        });
                }
                else
                {
                    this.setState(
                        { 
                            isLoading:false,
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            })

    }

    getInclusionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", getParams)
        .then(res => {
            console.log("GetInclusionTypes");
            console.log(res.data);
            const data = res.data;
            this.setState({getInclusionTypesList : data.inclusionTypes}) 
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

    onChangeInclusionTypesList = (e) => {
        if(e.length == 0) {
            this.state.selectedInclusionTypesId = []
            return
        }  
        this.state.selectedInclusionTypesId = e[0].id
    }

    onChangeInclusionsList = (e) => {
        if(e.length == 0) {
            this.state.selectedInclusionsId = []
            return
        }  
        this.state.selectedInclusionsId = e[0].id
    }

    getInclusions(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":"",
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", getParams)
        .then(res => {
            console.log("GetInclusions");
            console.log(res.data);
            const data = res.data;
            this.setState({getInclusionsList : data.inclusions}) 
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
                return
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payroll Inclusions
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
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeInclusionTypesList}
                                        options={this.state.getInclusionTypesList}
                                        placeholder="Select Inclusion Type"

                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                        onChange={this.onChangeInclusionsList}
                                        options={this.state.getInclusionsList}
                                        placeholder="Select Inclusion"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Label >
                                        Effectivity Month
                                    </Form.Label>&nbsp;&nbsp;&nbsp;
                                    <DatePicker
                                        ref='EffectivityMonth'
                                        selected={this.state.EffectivityMonth}
                                        onChange={this.handleChangeEffectivityMonth}
                                        minDate={this.minDate}
                                        value={this.props.EffectivityMonth}
                                        dateFormat={"MM/dd/yyyy"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Please Enter Amount"
                                            ref="Amount"
                                            name="Amount"
                                            value={this.state.Amount}
                                            onChange={this.onChangeAmount}
                                        />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Recurring" 
                                        onChange={e => this.handleChangeCheckboxRecurring(e)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Label >
                                        Month
                                    </Form.Label>&nbsp;&nbsp;&nbsp;
                                    <DatePicker
                                        ref='Month'
                                        selected={this.state.Month}
                                        onChange={this.handleChangeMonth}
                                        minDate={this.minDate}
                                        value={this.props.Month}
                                        dateFormat={"MM/dd/yyyy"}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                    <Form.Label>
                                        Pay Cut-off:
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="1st" 
                                        onChange={e => this.handleChangeCheckboxFirstCutOff(e)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="2nd" 
                                        onChange={e => this.handleChangeCheckboxSecondCutOff(e)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="3rd" 
                                        onChange={e => this.handleChangeCheckboxThirdCutOff(e)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="4th"
                                        onChange={e => this.handleChangeCheckboxFourthCutOff(e)} 
                                    />
                                </Form.Group>
                            </Form.Row>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.onSubmitSavePayrollInclusions }>
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
export  default PayrollDeductionAdjustmentsmodal