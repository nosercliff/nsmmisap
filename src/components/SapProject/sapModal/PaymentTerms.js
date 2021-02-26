import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props, sizePerPageRenderer, 

} 
from '../../../noser-hris-component';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { ArrowRight } from 'react-bootstrap-icons';
import InstallmentsModal from './InstallmentsModal';




class PaymentTerms extends Component {
    constructor(props) {
        super(props)
        this.state ={
            userinfo        :   [],
            
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            trainingRegisterTableList : [],
            unKnownData     :   [],
            modalInstallments : false,
        }
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
    }

    installments = () => {
        this.setState({
            modalInstallments: true,
        })
    }

    handleCloseInstallments = () => {
        this.setState({
            modalInstallments: false,
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
                backdrop="static"
                className="modal-90w"
                 >
                <Modal.Header closeButton/*  className="card-header" */style={{background : "#ababac"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Payment Terms >> SetUp
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Termination Code
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <div style={{height: '30px'}}></div>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Due Date Base on
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control as="select">
                                        <option>Document Date</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    Start From
                                </Form.Label>
                                <Col sm='1'>
                                </Col>
                                <Col sm="3">
                                    <Form.Control as="select">
                                        <option></option>
                                    </Form.Control>
                                </Col>
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    +
                                </Form.Label>
                                <Col sm="1">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                        placeholder='0'
                                    />
                                </Col>
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    Months
                                </Form.Label>
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    +
                                </Form.Label>
                                <Col sm="1">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                        placeholder='30'
                                    />
                                </Col>
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    Days
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Tolerance Days
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="6" style={{fontWeight : "bold"}}>
                                    No. of Installments
                                </Form.Label>
                                <Col sm='1'>
                                    <Button style={{fontSize:'11px', textDecoration: "none"}}
                                            variant="link" onClick={this.installments}
                                        > <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}></span> 
                                    </Button>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <div style={{height: '30px'}}></div>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Open Incoming Payment
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control as="select">
                                        <option></option>
                                        <option></option>
                                        <option></option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Cash Discount Name
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control as="select">
                                        <option></option>
                                        <option></option>
                                        <option></option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <div style={{height: '50px'}}></div>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    <u>BP Fields</u>
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                 Total Discount %
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Interest % on Receivables
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Price List
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control as="select">
                                        <option>Employees Price</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Max. Credit
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                    Commitment Limit
                                </Form.Label>
                                <Col sm='2'>
                                </Col>
                                <Col sm="5">
                                    <Form.Control 
                                        ref="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar className="mr-auto">
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>OK</Button>&nbsp;&nbsp;
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>Cancel</Button>&nbsp;&nbsp;
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />

                <InstallmentsModal
                    show={this.state.modalInstallments}
                    onHide={this.handleCloseInstallments}
                />
            </Modal>
        );
    }

}
export  default PaymentTerms