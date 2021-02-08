import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';
import NoserGrid from './Modal/PayrollSummaryTable';

class GeneratePayroll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            selectedClientId: "",
            selectedClient:"",
            clientList: [],
            selectedPayrollName:"",
            selectedPayrollId:"",
            payrollList:[],
            employeePayrollListGrid:[],
            selectedGetPayTypesId:'',
            PeriodTypesId : [],
            getEmployeeList : [],
            payPeriodList: [],
            locationList    :   [],
        }

    }

    searchGeneratePayroll = () => {
        this.setState({isloading:true,
                        alerttype:'',
                        isshow:false,
                        color:'',
                        message:'',
                        fade:true})
                const clientParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":this.state.selectedClientId,
                    "UserId":this.state.userinfo.userId,
                    "PayPeriodId": this.state.selectedPayPeriodId,
                    "LocationId": ""
            }
            axios
                .post(
                    AppConfiguration.Setting().noserapiendpoint + "Payroll/GetEmployeePayrolls", clientParams
                )
                .then(res => {
                    const data = res.data;
                    console.log("GetEmployeePayrolls");
                    console.log(data);
                    this.setState({
                        employeePayrollListGrid: data.payrolls, isloading:false
                    })
                    if(data.payrolls.length=="0"){
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
    

    /* GetEmployeePayrolls() {
        this.setState({isloading:true,loadingText:"Loading client list..."})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
	        "PayPeriodId":""
       }
       axios
           .post(
               AppConfiguration.Setting().noserapiendpoint + "Payroll/GetEmployeePayrolls", clientParams
           )
           .then(res => {
               const data = res.data;
               console.log("GetEmployeePayrolls");
               console.log(data);
           })
   } */


    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        /* this.GetEmployeePayrolls(); */

    }

    getClient() {
        this.setState({isloading:true,})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
       }
       axios
           .post(
               AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
           )
           .then(res => {
               const data = res.data;
               console.log("GetClientList");
               console.log(data);
               this.setState({clientList: data.clients, isloading:false})
           })
   }
   
    onChangeClientList = (e) => {
        this.setState({alerttype:'',
                        isshow:false,
                        color:'',
                        message:'',
                        fade:true})
        if(e.length == 0) {
            this.state.selectedClientName = ""
            this.state.selectedClientId = ""
            return
        }
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name

        this.getClientLocation();
        console.log(this.state.selectedClientId)
        this.GetPayPeriodList();
        
    }

    getClientLocation(){
        this.setState({isloading:true})

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
            const data = res.data;
            console.log("Client Location");
            console.log(data);
            this.setState({locationList : res.data.locations ? res.data.locations : [], isloading:false})
            if(data.locations.length=="0"){
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
    }

    onChangeLocation = (e) => {
        this.setState({alerttype:'',
                        isshow:false,
                        color:'',
                        message:'',
                        fade:true})
        if(e.length==0)
        {
            this.setState({
                selectedLocationId   :   '',
                selectedLocationName   :   ''
            })
            return
        }
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId= e[0].id
    }

    onChangePayPeriod = (e) => {
        this.setState({alerttype:'',
                        isshow:false,
                        color:'',
                        message:'',
                        fade:true})
        if(e.length == 0) {
            this.state.selectedPayPeriodId=""
            this.state.selectedPayPeriodName=""
            return
        } 
        this.state.selectedPayPeriodId = e[0].periodId
        this.state.selectedPayPeriodName = e[0].payPeriod

        console.log(this.state.selectedPayPeriodName)

    }
    GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": ""
         };
         console.log("Pay Period Params")
         console.log(periodListParams)
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
             )
             .then(res => {
                const data = res.data;
                console.log("Get Payroll Periods Lists")
                console.log(data)
                this.setState({payPeriodList: data.payrollPeriods,isloading:false })
                //console.log("data.employees list count: " + this.state.employeeList.length)
             })
    }

    handleFinalizedClick = event => {
        this.setState({isloading:true,})
        const generateParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId": this.state.selectedPayPeriodId,
            "LocationId": ""
        };

        console.log(generateParams)

       axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/FinalizePayroll",  generateParams)
        .then(res => {
            const data = res.data;
                console.log(data)
                var alerttype = (data.status=="1") ? "success" : "danger"
                this.setState(
                {
                    isloading:false,
                    alerttype:(data.status=="1") ? "Success! " : "Error! ",
                    isshow:true,
                    color:alerttype,
                    message:data.message ,
                    fade:true
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
        console.log("Generate Payroll " + this.state.selectedClientName+ " " +this.state.selectedPayPeriodName +".csv")
        /* this.GetEmployeePayrolls() */
    }

   handleGenerateClick = event => {
        
    this.setState({isloading:true,
                    alerttype:'',
                    isshow:false,
                    color:'',
                    message:'',
                    fade:true})
        const generateParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId": this.state.selectedPayPeriodId,
            "LocationId": ""
        };

        console.log(generateParams)

       axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/ProcessPayroll",  generateParams)
        .then(res => {
            console.log(res.data)
            const data = res.data;
                console.log(data)
                if(data.status=="1")
                {
                    this.searchGeneratePayroll();
                }
                else
                {
                //var alerttype = (data.status=="1") ? "success" : "danger"
                this.setState(
                {
                    isloading:false,
                    alerttype:"Error! ",
                    isshow:true,
                    color:"danger",
                    message:data.message ,
                    fade:true
                });
                }
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
    
    
        
    render() {
        return(
            <div>
            <Banner />
            <Container className="themed-container" fluid={true}>
                <Card className="mt-5">
                    <Card.Header>Generate Payroll</Card.Header>
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
                                        options={this.state.clientList}
                                        placeholder="Select Client"
                                    />
                                </Col>
                            </Form.Group>
                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeLocation}
                                        options={this.state.locationList}
                                        placeholder="Select Branch"
                                    />
                                </Col> 
                            </Form.Group>*/}
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='payPeriod'
                                        id="basic-example"
                                        onChange={this.onChangePayPeriod}
                                        options={this.state.payPeriodList}
                                        placeholder="Select Payroll Cut-Off"
                                    />
                                </Col>
                            </Form.Group>
                            <ButtonToolbar  >
                                <Button  className="ml-auto" variant="success"   onClick = { this.handleGenerateClick }>
                                    Generate
                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="info" onClick = { this.searchGeneratePayroll }>
                                    Search
                                </Button>
                            </ButtonToolbar>
                            <Form.Group  className="mt-4" controlId="formGridPassword">
                                <Card.Header>Payroll Summary</Card.Header>
                                <NoserGrid data={this.state.employeePayrollListGrid} 
                                    exportCSV={false}
                                    pageSize={20}
                                />
                            </Form.Group>
                            <ButtonToolbar sm={12}>
                                <Button variant="success" className="ml-auto" onClick = { this.handleFinalizedClick }>
                                    Finalized
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger" href="/banner" >
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
                <NoserLoading show={this.state.isloading} />
        </div>
    );
}

}
export  default GeneratePayroll
