import {
    React,Component, Type,
    Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, 
    moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser
}
from '../../noser-hris-component';

class GenerateDTR extends Component {

    constructor() {
        super()
        this.state = {
            selected: [],
            clientList:[],
            payperiodList:[],
            selectedClient:"",
            selectedPayperiod:"",
            selectedClientId: "0",
            selectedPayperiodId: "0",
            selectedPayperiodId: "",
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            userinfo:[]
        }
    }
    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient()
        this.GetPayPeriodList()
    }

    getClient() {
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
		    "UserId":this.state.userinfo.userId
        }

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
                .then(res => {
                    const data = res.data;  
                    console.log("Client List")
                    console.log(res.data)
                    this.setState({clientList : data.clients})
                })
    }


    GetClientId(name) {
        console.log("Client ID List ");
        let GetClientId = ''
        for (let i = 0; i <= this.state.clientList.length; i++) {
            if (this.state.clientList[i]["name"] === name) {
                GetClientId = this.state.clientList[i]['id']; 
                console.log(GetClientId);
                break;
            }
        }
        return GetClientId
    }

    handleChangeClient = (e) => {
        if(e.length === "") {
            this.setState({
                clientLocationList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedClientName = e[0].name
                this.state.selectedClientId = this.GetClientId(e[0].name)
                console.log("Get Client Id", this.state.selectedClientId)
                console.log("Get Client Name", this.state.selectedClientName)
            }
            
        }
        //this.getPayPeriod();
    }

    onChangePayPeriod = (e) => {

        if(e.length == 0) {
            this.state.payPeriodSelected = ""
            this.state.payPeriodSelectedId = ""
            return
        } 

        this.state.payPeriodSelectedId = e[0].periodId
        this.state.payPeriodSelected = e[0].payPeriod
        console.log("payPeriodSelectedId : " + this.state.payPeriodSelectedId)
        console.log("payPeriodSelected : " + this.state.payPeriodSelected)
    }
    
    GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":"35005"
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
            )
            .then(res => {
                const data = res.data;
                console.log("data.payPeriodList")
                console.log(data.payrollPeriods)
                this.setState({payperiodList: data.payrollPeriods})
                //console.log("data.employees list count: " + this.state.employeeList.length)
            })
    }
    handleGenerateClick = event => {
        this.setState({
        })

        const generateParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId":this.state.payPeriodSelectedId
        };

            axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GenerateBillableHours",  generateParams)
            .then(res => {
                const data = res.data;
                    console.log(data)
                    var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isLoading:false,
                        AlertType:(data.status=="1") ? "Success! " : "Error! ",
                        show:true,
                        Color:alertType,
                        Message:data.message ,
                        Fade:true
                    });
            })
            .catch(error=>{
            this.setState(
                {
                isLoading:false,
                AlertType:"Error! ",
                Show:true,
                Color:"danger",
                Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                Fade:true
            })
        })

    }

    render() {
        return(
            <div>
            <Banner/>
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Generate DTR</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert height="70"  isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                    <strong>{this.state.AlertType}</strong> {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleChangeClient}
                                            options={this.state.clientList}
                                            placeholder="Enter Client"
                                        />
                                    </Col>
                                </Form.Group>&nbsp;&nbsp;
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Typeahead
                                        labelKey='payPeriod'
                                        id="basic-example"
                                        onChange={this.onChangePayPeriod}
                                        options={this.state.payperiodList}
                                        placeholder="Select Pay Period"
                                    />
                                    </Col>
                                </Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button variant="primary" className="ml-auto" onClick = { this.handleGenerateClick }>
                                        Generate Billable
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/banner" >
                                        Close
                                    </Button>
                                </ButtonToolbar>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}

export  default GenerateDTR