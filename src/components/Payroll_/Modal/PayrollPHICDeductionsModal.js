import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollPHICDeductionsModal extends Component {

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
            EffectivityMonth: "",
        }

    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getLoanTypes();
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

    handleChangeEffectivityMonth = date => {
        this.setState({
            EffectivityMonth: date
        });
        console.log(this.state.EffectivityMonth)
    };

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
                        PHIC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="6">
                                    <Form.Control type="text" placeholder="Please Enter Monthly Contribution" />
                                </Col>
                                <Col sm="6">
                                    <Form.Control type="text"  placeholder="Please Enter Employee Share" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="6">
                                    <Form.Control type="text"  placeholder="Please Enter Employer Share"  />
                                </Col>
                                <Col sm="6">
                                    <Form.Control type="text"  placeholder="Please Enter Employee Contribution"  />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="3">
                                    <Form.Check
                                    type="radio"
                                    label="Recurring"
                                    name="Recurring"
                                    id="Recurring"
                                    />
                                </Col>
                                <Col sm="2">
                                    <Form.Label>
                                        Pay Cut-Off :
                                    </Form.Label>
                                </Col>
                                <Col sm="1">
                                    <Form.Check type="checkbox" label="1st" />
                                </Col>
                                <Col sm="1">
                                    <Form.Check type="checkbox" label="2nd" />
                                </Col>
                                <Col sm="1">
                                    <Form.Check type="checkbox" label="3rd" />
                                </Col>
                                <Col sm="1">
                                    <Form.Check type="checkbox" label="4th" />
                                </Col>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                    <Form.Check
                                    type="radio"
                                    label="Adjustment"
                                    name="Adjustment"
                                    id="Adjustment"
                                    />
                                </Form.Group>
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
                            </Form.Row>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="6">
                                    <Form.Control type="text"  placeholder="Please Enter Amount"  />
                                </Col>
                                <Col sm="6">
                                    <Typeahead
                                        labelKey='employeeName'
                                        id="basic-example"
                                        onChange={this.onChangegetLoanTypes}
                                        options={this.state.getLoanTypesList}
                                        placeholder="Select Pay Cut Off"
                                    />
                                </Col>
                            </Form.Group>

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
export  default PayrollPHICDeductionsModal