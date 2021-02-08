import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class ViewBillingModal extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
        }
    }

    componentDidMount(){
        /* this.setState({isLoading:true,loadingText:"Loading client list..."}) */
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.props.onRefViewBilling(this)
    }

    componentWillUnmount() {
        this.props.onRefViewBilling()
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
                        BILLED (View)
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
                                <h5>
                                    Client
                                </h5>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                <h6>
                                    Branch / Area :
                                </h6>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                <h6>
                                    Period :
                                </h6>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                <h6>
                                    Pay Out :
                                </h6>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                <h6>
                                    Date (current) :
                                </h6>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                <h6>
                                    Enter Serving Invoice No. :
                                </h6>
                                </Form.Group>
                            </Form.Row>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="info" className="ml-auto">
                            EXPORT
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
export  default ViewBillingModal