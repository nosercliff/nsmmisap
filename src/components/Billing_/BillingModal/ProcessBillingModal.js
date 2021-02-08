import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class ProcessBillingModal extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,

            clientName  : '',
            clientId    :   '',
            locationName    :   '',
            period      :   '',
            payOutDate  :   '',
            date        :   '',
        }
    }

    componentDidMount(){
        /* this.setState({isLoading:true,loadingText:"Loading client list..."}) */
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.props.onRefProcessBilling(this)
    }

    componentWillUnmount() {
        this.props.onRefProcessBilling()
    }
    
    initialize = (e) => {
        this.setState({
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            clientName      :   e.clientNameFromParent,
            clientId        :   e.clientIdFromParent,
            locationName    :   e.locationFromParent,
            period          :   e.periodFromParent,
            payOutDate      :   e.payOutDateFromParent,
            date            :   e.dateFromParent,
        })
    }

    onModalClose = () => {
        this.props.onHide();
    }
    render() {


    return(
        
            <Modal
                {...this.props}
                return
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        UNBILLED (Process Billing)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                <h4>
                                    Client
                                </h4>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Branch / Area : </span> <span style={{color: 'red'}}>{this.state.locationName}</span></label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Period : </span> <span style={{color: 'red'}}>{this.state.period}</span></label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Pay Out : </span> <span style={{color: 'red'}}>{this.state.payOutDate}</span></label>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Date (current) : </span> <span style={{color: 'red'}}>{this.state.date}</span></label>
                                </Col>
                            </Form.Row>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="4">
                                    Enter Serving Invoice No.
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text"
                                        ref="payDay"
                                        autoComplete="off" 
                                        name="payDay"
                                        value={this.state.payDay}
                                        onChange={this.onChangePayDay}
                                        disabled={this.state.disabledPayDay}
                                    />
                                </Col>
                                <Col sm="4">
                                    <Button variant="success" className="ml-auto">
                                        GENERATE BILLING
                                    </Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="info" className="ml-auto">
                            EDIT
                        </Button>&nbsp;&nbsp;
                        <Button variant="success" className="ml-auto">
                            FINALIZED BILLING
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
            <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
        </Modal>
        );
    }

}
export  default ProcessBillingModal