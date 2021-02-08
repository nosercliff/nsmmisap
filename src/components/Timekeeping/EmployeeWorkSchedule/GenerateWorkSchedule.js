import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';

class GenerateSchedule extends Component {

    constructor() {
        super()
        this.state = {
            selected: [],
            //payperiodList:[],
            //selectedPayperiod:"",
            //selectedPayperiodId: "0",
           // selectedPayperiodId: "",
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

           selectedClientId: "",
           selectedClient:"",
            selectedEmployeeName: "",
            selectedEmployeeId: "",
            getEmployeeList : [],
             getClientList: [],
            getPayModesList: [],
            isloading:false,loadingText:"",
        }
    }
    componentDidMount() {
        this.setState({isloading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
    }

    getClientList(){
        this.setState({
            isloading:true
        })
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            console.log(res.data)
            //var alertType = (data.status=="1") ? "success" : "danger"
            this.setState({
                getClientList : res.data.clients ? res.data.clients : [],
                isloading:false,
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
    GetClientId(name) {
        console.log("Client ID List ");
        let GetClientId = ''
        for (let i = 0; i <= this.state.getClientList.length; i++) {
            if (this.state.getClientList[i]["name"] === name) {
                GetClientId = this.state.getClientList[i]['id']; 
                console.log(GetClientId);
                break;
            }
        }
        return GetClientId
    }
    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        console.log("Client Id " + this.state.selectedClientId );
        this.setState({
            isshow  :   false,
        })
        
        this.GetEmployeePayModesList();
        
        
    }
   /*  onChangePayPeriod = (e) => {

        if(e.length == 0) {
            this.state.payPeriodSelected = ""
            this.state.payPeriodSelectedId = ""
            return
        } 

        this.state.payPeriodSelectedId = e[0].periodId
        this.state.payPeriodSelected = e[0].payPeriod
        //console.log("payPeriodSelectedId : " + this.state.payPeriodSelectedId)
        //console.log("payPeriodSelected : " + this.state.payPeriodSelected)
    } */
    
    /* GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":""
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
            )
            .then(res => {
                const data = res.data;
                this.setState({payperiodList: data.payrollPeriods})
            })
    }
     */
    onChangeEmployeesList = (e) => {

        if(e.length == 0) {
            this.state.selectedEmployeeName = ""
            this.state.selectedEmployeeId = ""
            return
        } 
    
        this.state.selectedEmployeeName = e[0].Name
        this.state.selectedEmployeeId = e[0].id
        console.log("Employee Id " + this.state.selectedEmployeeId );
        
    }
    
    getEmployees(){ 
        this.setState({
            isloading:true
        })
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":"",
            "PayrollModeId":this.state.selectedEmployeePayModesId 
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            console.log("Employee List ");
            console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isloading:false}) 
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
    GetEmployeeId(id) {
        console.log("Get Employee Id");
        let GetEmployeeId = ''
        for (let i = 0; i <= this.state.getEmployeeList.length; i++) {
            if (this.state.getEmployeeList[i]["id"] === id) {
                GetEmployeeId = this.state.getEmployeeList[i]['id']; 
                console.log(GetEmployeeId);
                break;
            }
        }
        return GetEmployeeId
    }
    handleGenerateClick = event => {
        this.setState({isloading:true
        })

        const generateParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedEmployeeId,
            "PayModeId": this.state.selectedEmployeePayModesId
        };
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GenerateWorkSchedules",  generateParams)
        .then(res => {
            const data = res.data;
            console.log(data)
            console.log(res)
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
    GetEmployeePayModesList(){
        this.setState({
            isloading:true
        })
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollModes", getParams)
            .then(res => {
                console.log(res.data);
                this.setState({
                    getPayModesList : res.data.payrollModes,isloading:false
                })
            })
    
    }

    onChangeEmployeesPayModesList = (e) => {

        if(e.length == 0) {
            this.state.selectedEmployeePayModesId = ""
            return
        } 
    
        this.state.selectedEmployeePayModesId = e[0].id
        this.getEmployees();
        this.setState({
            isshow  :   false,
        })
    }
    

    render() {
        return(
            <div className="mt-5">
            <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Generate Schedule - Manual</Card.Header>
                        <Card.Body>
                            <Form>
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
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeEmployeesPayModesList}
                                            options={this.state.getPayModesList}
                                            placeholder="Select Payroll Mode"
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
                                        />
                                    </Col>
                                </Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button variant="success"  className="ml-auto" onClick = { this.handleGenerateClick }>
                                        Generate
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/banner"  >
                                        Close
                                    </Button>
                                </ButtonToolbar>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        )
    }

}

export  default GenerateSchedule
