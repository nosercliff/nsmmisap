import {
    React,Component, BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState, Tabs, Tab
} 
from '../../noser-hris-component';
import NoserGrid from './BillingSummaryTable'
class BillingSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fade            :   true,
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",
            loadingText     :   "",
            billingGridData :   [],
            disableFinalize :   true,
            invoiceNo       :   "",
            clientName      :   "",
            locationName    :   "",
            period          :   "",
            payoutDate      :   "",
            billingNo       :   "",
            isFinalized     :   "0",

            clientId        :   "",
            payPeriodId     :   "",
            locationId      :   "",

        }
    }
    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        let info = JSON.parse(localStorage.getItem("vwSummary_" + this.state.userinfo.userId + this.state.userinfo.employeeId))
        
        this.setState({
            clientId:info.clientId,
            locationId:info.locationId,
            payPeriodId:info.payPeriodId,
            clientName: info.clientName,
            locationName:info.location,
            period:info.period,
            payoutDate:info.payoutDate,
            billingNo:info.billingNo,
            isFinalized: info.isFinalized,
            invoiceNo:info.invoiceNo
        })
        this.GetClientBillings(info)
    }
    componentWillUnmount(){
        localStorage.clear();
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value,
            disableFinalize: e.target.value=="" ? true : false
        })
    }
    handleFinalized = (e) =>{
        if(this.state.invoiceNo.trim()==''){
            this.setState({
                alerttype   :   "Error! ",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter invoince number.",
                fade        :   true
            })
            return;
        }
        this.setState({isloading:true})
        const params = {
            "IpAddress"     : "0.0.0.0",
            "ClientId"      : this.state.clientId,
            "UserId"        : this.state.userinfo.userId,
            "PayPeriodId"   : this.state.payPeriodId,
            "LocationId"    : this.state.locationId,
            "InvoiceNo"    : this.state.invoiceNo,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Billing/FinalizedBilling", params)
        .then(res => {
            const data = res.data
            this.setState({
                isloading   :   false,
                alerttype   :   data.status=="1" ? "Success! " : "Error! ",
                isshow      :   true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true,
                disableFinalize:true
            })
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
    GetClientBillings(info){
        this.setState({isloading:true})

        const params = {
            "IpAddress"     : "0.0.0.0",
            "ClientId"      : info.clientId,
            "UserId"        : this.state.userinfo.userId,
            "PayPeriodId"   : info.payPeriodId,
            "LocationId"    : info.locationId,
        }
        let url = info.isFinalized=="1" ? "Billing/GetClientFinalizedBillings" : "Billing/GetClientBillings"
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + url, params)
        .then(res => {
            const data = res.data
            this.setState({
                billingGridData:data.clientBillings,
                isloading   :   false,
                alerttype   :   data.status=="1" ? "" : "Error! ",
                isshow      :   data.status=="1" ? false : true,
                color       :   data.status=="1" ? "" : "danger",
                message     :   data.status=="1" ? "" : data.message,
                fade        :   true
            })
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
    render() {

        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>Billing >> Unbilled Transaction Summary</Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label>
                                        <span style={{color: '#2188FC',marginRight:'54px'}}>Client</span> 
                                        <span style={{color: 'red'}}>: {this.state.clientName}</span>
                                    </label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label>
                                        <span style={{color: '#2188FC',marginRight:'10px'}}>Branch / Area</span> 
                                        <span style={{color: 'red'}}>: {this.state.locationName}</span>
                                    </label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label>
                                        <span style={{color: '#2188FC',marginRight:'50px'}}>Period</span> 
                                        <span style={{color: 'red'}}>: {this.state.period}</span>
                                    </label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                <label>
                                    <span style={{color: '#2188FC',marginRight:'42px'}}>Pay Out</span> 
                                    <span style={{color: 'red'}}>: {this.state.payoutDate}</span>
                                </label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                <label>
                                    <span style={{color: '#2188FC',marginRight:'4px'}}>Billing Number</span> 
                                    <span style={{color: 'red'}}>: {this.state.billingNo}</span>
                                </label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="5">
                                        Serving Invoice No.
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control 
                                            type="text"
                                            autoComplete="off" 
                                            name="invoiceNo"
                                            value={this.state.invoiceNo}
                                            onChange={this.handleChange}
                                            disabled={this.state.isFinalized=="1" ? true : false}
                                        />
                                    </Col>
                                    <Col sm="2">
                                        <div className={this.state.isFinalized=="1" ? 'display-none' : 'display-block'}>
                                        <Button variant="success" className="ml-auto" disabled={this.state.disableFinalize}
                                            onClick={this.handleFinalized}
                                        >Finalize</Button>
                                        </div>
                                    </Col>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                    <Card.Header>Unbilled Transaction Details</Card.Header>
                                    <NoserGrid data={this.state.billingGridData} 
                                    exportCSV={false}
                                    pageSize={20}
                                />
                                </Form.Group>
                            </Form.Row>
                            <div className="mt-5">
                                <ButtonToolbar>
                                    <Button style={{minWidth:'60px'}}  className="ml-auto" variant="danger" href="/billingscreen">Back</Button>
                                </ButtonToolbar>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} text={this.state.loadingText}/>
            </div>
        )

    }
}
export default BillingSummary