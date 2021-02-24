import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab, 
    Dropdown
} 
from '../../noser-hris-component';
import { ArrowRight } from 'react-bootstrap-icons';
import PaymentDates from './sapModal/PaymentDates';
import ControlAccounts from './sapModal/ControlAccounts';
import PaymentTerms from './sapModal/PaymentTerms';

 
class BPMasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fade            :   true, 
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",
            documentDate    :   "",

            unknownData: "",
            dataUnknown: [],
            modalPaymentDate : false,
            modalCntrlAccts :   false,
            modalPaymentTrms : false,


           
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    handleChangeDocumentDate = date => {
        this.setState({
            documentDate : date
        })
    };

    paymentDate=() => {
        this.setState({
            modalPaymentDate: true,
        })
    }

    handleModalClosePaymentDate = (e) =>{
        this.setState({
            modalPaymentDate: false,
        })
    }

    controlAccounts=() => {
        this.setState({
            modalCntrlAccts: true,
        })
    }

    handleModalCloseCntrlaccts = (e) =>{
        this.setState({
            modalCntrlAccts: false,
        })
    }

    paymentTerms = () => {
        this.setState({
            modalPaymentTrms: true,
        })
    }

    handleModalClosePaymentTrms = (e) =>{
        this.setState({
            modalPaymentTrms: false,
        })
    }

    render() {
        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Form.Group className="mt-4" as={Row} controlId="formPlaintextEmail">
                        <Col sm="8">
                            <Card style={{background : "#f0fff9"}}>
                                <Card.Header style={{background : "#ababac"}}>Inventory >> Business Partner >> Master Data</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>   

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                Code
                                            </Form.Label>
                                            <Col sm="2">
                                                <Form.Control as="select">
                                                    <option>Manual</option>
                                                    <option></option>
                                                    <option></option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="2">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                />
                                            </Col>
                                            <Col sm="2">
                                                <Form.Control as="select">
                                                    <option>Customer</option>
                                                    <option></option>
                                                    <option></option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="5">
                                            </Col>

                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                Name
                                            </Form.Label>
                                            <Col sm="2">
                                            </Col>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                />
                                            </Col>
                                            <Col sm="5">
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                Foreign Name
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                />
                                            </Col>
                                            <Col sm="5">
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                Group
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control as="select">
                                                    <option>Affiliates</option>
                                                    <option></option>
                                                    <option></option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="5">
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                Currency
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control as="select">
                                                    <option>Philippine Peso</option>
                                                    <option></option>
                                                    <option></option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="5">
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                Federal Tax ID
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                />
                                            </Col>
                                            <Col sm="5">
                                            </Col>
                                        </Form.Group>

                                        <Card  className="mt-5" style={{background : "#f0fff9", border: '1px solid "#ababac"'}} >
                                            <Card.Body>
                                                <Tabs defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                                    <Tab eventKey="General" title="General">
                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            Tel 1
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            CONTACT PERSON
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            Tel 2
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            ID No. 2
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Mobile Phone
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            In Transit Warehouse Code
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Fax
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            E-Mail
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            In Transit Warehouse Name
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                as="textarea"
                                                                rows={1}
                                                                name="instructions"
                                                                value={this.state.instructions}
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Website 
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Shipping Type
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control as="select">
                                                                <option></option>
                                                                <option></option>
                                                                <option></option>
                                                            </Form.Control>
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Sales Employee
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                                placeholder="-No Sales Employee-"
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Password
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Factoring Indicator
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Col sm="2">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="2">
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            BP Project
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            BP Channel Code
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Industry
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        </Col>
                                                        <Col sm="3">
                                                            <Form.Control as="select">
                                                                <option></option>
                                                                <option></option>
                                                                <option></option>
                                                            </Form.Control>
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Technician
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Business Partner Type
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control as="select">
                                                                <option>Company</option>
                                                                <option></option>
                                                                <option></option>
                                                            </Form.Control>
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Territory
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Language
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                                placeholder="English(UK)"
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                    
                                                    <div style={{height: "90px"}}></div>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            Alias Name
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control 
                                                                ref="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                onChange={this.onChangeName}
                                                                autoComplete="off"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            GLN
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                        </Form.Label>
                                                        <Col sm="3">
                                                        </Col>
                                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                                            Block Sending Marketing Content
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        <Button style={{minWidth:'40px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}}>
                                                            ...
                                                        </Button>
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Col sm="1">
                                                            <Form.Check 
                                                                className='mt-1'
                                                                style={{fontWeight : "bold"}}
                                                                type='checkbox'
                                                                id='checkbox'
                                                                label='Active'
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            From
                                                        </Form.Label>
                                                        <Col sm="2">
                                                            <DatePicker
                                                                ref='documentDate'
                                                                selected={this.state.documentDate}
                                                                onChange={this.handleChangeDocumentDate}
                                                                minDate={this.minDate}
                                                                value={this.props.documentDate}
                                                                dateFormat={"MM/dd/yyyy"}
                                                                className="form-control"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            To
                                                        </Form.Label>
                                                        <Col sm="2">
                                                            <DatePicker
                                                                ref='documentDate'
                                                                selected={this.state.documentDate}
                                                                onChange={this.handleChangeDocumentDate}
                                                                minDate={this.minDate}
                                                                value={this.props.documentDate}
                                                                dateFormat={"MM/dd/yyyy"}
                                                                className="form-control"
                                                            />
                                                        </Col>
                                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                            Remarks
                                                        </Form.Label>
                                                        <Col sm="3">
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
                                                        <Col sm="12">
                                                            <Form.Check 
                                                                style={{fontWeight : "bold"}}
                                                                type='checkbox'
                                                                id='checkbox'
                                                                label='Inactive'
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Col sm="12">
                                                            <Form.Check 
                                                                style={{fontWeight : "bold"}}
                                                                type='checkbox'
                                                                id='checkbox'
                                                                label='Advance'
                                                            />
                                                        </Col>
                                                    </Form.Group>

                                                    </Tab>

                                                    <Tab eventKey="Contactperson" title="Contact Persons">
                                                        <Card  style={{background : "#f0fff9"}}>
                                                            <Card.Header  style={{background : "#ababac",  width: '20rem'}}>Define New</Card.Header>
                                                            <Card.Body>
                                                                test1
                                                            </Card.Body>
                                                        </Card>
                                                    </Tab>


                                                    <Tab eventKey="Address" title="Address">

                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            test2
                                                        </Form.Label> 
                                                    </Tab>


                                                    <Tab eventKey="default" title="Payment Terms">
                                                        <Form.Group as={Row} className="mt-5" controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                Payment Terms
                                                            </Form.Label>
                                                            <Col sm="1">
                                                                <Button style={{fontSize:'11px', textDecoration: "none"}}
                                                                    variant="link"  onClick={this.paymentTerms}> 
                                                                    <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}></span> 
                                                                </Button>
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control as="select">
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </Form.Control>
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Credit Card Type
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Form.Control as="select">
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </Form.Control>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                Interest On Arrears %
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Credit Card No.
                                                            </Form.Label>
                                                            <Col sm="3">
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
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Expiration Date
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <DatePicker
                                                                    ref='postingDate'
                                                                    selected={this.state.postingDate}
                                                                    onChange={this.handleChangePostingDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.postingDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                Price List
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control as="select">
                                                                    <option>Employees Price</option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </Form.Control>
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                ID Number
                                                            </Form.Label>
                                                            <Col sm="3">
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
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                Total Discount %
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Average Delay
                                                            </Form.Label>
                                                            <Col sm="3">
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
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                Credit Limit
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Priority
                                                            </Form.Label>
                                                            <Col sm="3">
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
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                Commitment Limit
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Default IBAN
                                                            </Form.Label>
                                                            <Col sm="3">
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
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Dunning Term
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control as="select">
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </Form.Control>
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Holidays
                                                            </Form.Label>
                                                            <Col sm="3">
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
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                            </Col>
                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                Payment Dates
                                                            </Form.Label>
                                                            <Col sm="3">
                                                                <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.paymentDate}>
                                                                    ...
                                                                </Button>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Effective Discounts Group
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control as="select">
                                                                    <option>Lowest Discount</option>
                                                                    <option>Highest Discount</option>
                                                                </Form.Control>
                                                            </Col>
                                                            <Col sm="5">
                                                                <Form style={{fontWeight : "bold"}}>
                                                                    <Form.Check 
                                                                        type='checkbox'
                                                                        id='checkbox'
                                                                        label="Allow Partial Delivery Of Sales Order"
                                                                    />
                                                                </Form>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Effective Price
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control as="select">
                                                                    <option>Default Priority</option>
                                                                    <option></option>
                                                                </Form.Control>
                                                            </Col>
                                                            <Col sm="5">
                                                                <Form style={{fontWeight : "bold"}}>
                                                                    <Form.Check 
                                                                        type='checkbox'
                                                                        id='checkbox'
                                                                        label="Allow Partial Delivery Per Row"
                                                                    />
                                                                </Form>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Col sm="5">
                                                                <Form style={{fontWeight : "bold"}}>
                                                                    <Form.Check 
                                                                        disabled
                                                                        type='checkbox'
                                                                        id='checkbox'
                                                                        label="Effictive Price Considers All Price Source"
                                                                    />
                                                                </Form>
                                                            </Col>
                                                            <Col sm="2">
                                                            </Col>
                                                            <Col sm="5">
                                                                <Form style={{fontWeight : "bold"}}>
                                                                    <Form.Check 
                                                                        type='checkbox'
                                                                        id='checkbox'
                                                                        label="Do Not Allow Discounts Groups"
                                                                    />
                                                                </Form>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            <u>Business Partner Bank</u>
                                                            </Form.Label>
                                                            <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                            </Col>
                                                            <Col sm="5">
                                                                <Form style={{fontWeight : "bold"}}>
                                                                    <Form.Check 
                                                                        type='checkbox'
                                                                        id='checkbox'
                                                                        label="Endorsable Checks from this BP"
                                                                    />
                                                                </Form>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Bank Country
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                                <Form style={{fontWeight : "bold"}}>
                                                                    <Form.Check 
                                                                        type='checkbox'
                                                                        id='checkbox'
                                                                        label="This BP Accepts Endorsed Checks"
                                                                    />
                                                                </Form>
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Bank Name
                                                            </Form.Label>
                                                             <Col sm="1">
                                                                <Button style={{fontSize:'11px', textDecoration: "none"}}
                                                                    variant="link"> 
                                                                    <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}></span> 
                                                                </Button>
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Bank Code
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Account
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             BIC / SWIFT Code
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Bank Account Name
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Branch
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Ctrl Int. Indicator
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             IBAN
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Mandate ID
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <Form.Control 
                                                                    ref="name"
                                                                    name="name"
                                                                    value={this.state.name}
                                                                    onChange={this.onChangeName}
                                                                    autoComplete="off"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                             Date Of Signature
                                                            </Form.Label>
                                                             <Col sm="1">
                                                            </Col>
                                                            <Col sm="3">
                                                                <DatePicker
                                                                    ref='documentDate'
                                                                    selected={this.state.documentDate}
                                                                    onChange={this.handleChangeDocumentDate}
                                                                    minDate={this.minDate}
                                                                    value={this.props.documentDate}
                                                                    dateFormat={"MM/dd/yyyy"}
                                                                    className="form-control"
                                                                />
                                                            </Col>
                                                            <Col sm="5">
                                                            </Col>
                                                        </Form.Group>
                                                    </Tab>
                                                    <Tab eventKey="paymentRun" title="Payment Run"> </Tab>


                                                    <Tab eventKey="Accounting" title="Accounting">
                                                        <Card style={{background : "#f0fff9", border: '1px solid "#ababac"'}}>
                                                            <Card.Body>
                                                                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                                                                    <Tab eventKey="home" title="General">
                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                Consolidating BP
                                                                            </Form.Label>

                                                                            <Col sm="1">
                                                                            </Col> 
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="3">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Check column sm="3" className="ml-3"
                                                                                style={{fontWeight : "bold"}}
                                                                                type='radio'
                                                                                id= 'radio'
                                                                                label="Payment Consolidation"
                                                                            />
                                                                            <Col sm="1">
                                                                            </Col>

                                                                            <Col sm="1">
                                                                            </Col> 
                                                                            <Col sm="3">
                                                                                <Form.Check 
                                                                                    style={{fontWeight : "bold"}}
                                                                                    type='radio'
                                                                                    id= 'radio'
                                                                                    label="Delivery Consolidation"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <div style={{height: "30px"}}></div>
                                                                        
                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                Control Accounts
                                                                            </Form.Label>

                                                                            <Col sm="1">
                                                                            </Col> 
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.controlAccounts}>
                                                                                    ...
                                                                                </Button>
                                                                            </Col>
                                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="3">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                                                Accounts Recievable
                                                                            </Form.Label>
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="1">
                                                                                <Button style={{fontSize:'11px', textDecoration: "none"}}
                                                                                        variant="link" onClick={this.acctReceivable}
                                                                                    > <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}></span> 
                                                                                </Button>
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Accounts Receivable-Trade
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Down Payment Clearing Account
                                                                            </Form.Label>{/* 
                                                                            <Col sm="1">
                                                                            </Col> */}
                                                                            <Col sm="1">
                                                                                <Button style={{fontSize:'11px', textDecoration: "none"}}
                                                                                        variant="link" onClick={this.downPayment}
                                                                                    > <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}></span> 
                                                                                </Button>
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Advances From Customers
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Down Payment Interim Account
                                                                            </Form.Label>
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <div style={{height: '30px'}}> </div>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Col sm="12">
                                                                                <Form.Check 
                                                                                    style={{fontWeight : "bold"}}
                                                                                    type='checkbox'
                                                                                    id='checkbox'
                                                                                    label='Block Dunning Letters'
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Dunning Level
                                                                            </Form.Label>
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Dunning Date
                                                                            </Form.Label>
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Connected Vendor
                                                                            </Form.Label>
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <div style={{height: '90px'}}></div>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                                Planning Group
                                                                            </Form.Label>
                                                                            <Col sm="1">
                                                                            </Col>
                                                                            <Col sm="3">
                                                                                <Form.Control 
                                                                                    ref="name"
                                                                                    name="name"
                                                                                    value={this.state.name}
                                                                                    onChange={this.onChangeName}
                                                                                    autoComplete="off"
                                                                                />
                                                                            </Col>
                                                                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                                            </Form.Label>
                                                                            <Col sm="2">
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Col sm="12">
                                                                                <Form.Check 
                                                                                    style={{fontWeight : "bold"}}
                                                                                    type='checkbox'
                                                                                    id='checkbox'
                                                                                    label='Use Shipped Goods Account'
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <div style={{height: '50px'}}> </div>

                                                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                                                            <Col sm="12">
                                                                                <Form.Check 
                                                                                    style={{fontWeight : "bold"}}
                                                                                    type='checkbox'
                                                                                    id='checkbox'
                                                                                    label='Affiliate'
                                                                                />
                                                                            </Col>
                                                                        </Form.Group>

                                                                    </Tab>
                                                                    <Tab eventKey="tax" title="Tax">
                                                                    </Tab>
                                                                </Tabs>
                                                            </Card.Body>
                                                        </Card>
                                                    </Tab>


                                                    <Tab eventKey="properties" title="Properties"> </Tab>
                                                    <Tab eventKey="remarks" title="Remarks"> </Tab>
                                                    <Tab eventKey="sttachments" title="Attachments"> </Tab>
                                                    <Tab eventKey="edocs" title="eDocs"> </Tab>

                                                </Tabs>
                                            </Card.Body>
                                        </Card>
                                        <Form.Group as={Row}className="mt-5" controlId="formPlaintextEmail">
                                            <Col sm="10">
                                                <ButtonToolbar>
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handlePrevClick}>Add</Button>
                                                    &nbsp;&nbsp;
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleNextClick}>Cancel</Button>
                                                </ButtonToolbar>
                                            </Col>
                                            <Col sm="2">
                                                <ButtonToolbar>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} id="dropdown-basic">
                                                            You Can Also
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1"></Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2"></Dropdown.Item>
                                                            <Dropdown.Item href="#/action-3"></Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </ButtonToolbar>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card style={{background : "#f0fff9"}}>
                                <Card.Body>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="11">
                                            <Form.Control as="select">
                                                <option>General</option>
                                                <option></option>
                                                <option></option>
                                            </Form.Control>
                                        </Col>
                                        <Button style={{minWidth:'5px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleNextClick}>X</Button>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Category
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Business Office
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Region
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Store
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Account / Dep't
                                        </Form.Label>
                                        <Col sm="7">
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
                                        ID
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                                placeholder="0"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Total Leased Area
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Star Of Lease
                                        </Form.Label>
                                        <Col sm="7">
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
                                        End Of Lease
                                        </Form.Label>
                                        <Col sm="7">
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
                                        ATP No.
                                        </Form.Label>
                                        <Col sm="7">
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
                                        POS / CRM No.
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Monthly Rental
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                                PLACEHOLDER="0.00"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Termination Date
                                        </Form.Label>
                                        <Col sm="7">
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
                                        Location Group
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control as="select">
                                                <option></option>
                                                <option>location 1</option>
                                                <option>location 2</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>                             
                        </Col>
                    </Form.Group>
                </Container>
                <PaymentDates
                    show={this.state.modalPaymentDate}
                    onHide={this.handleModalClosePaymentDate}
                />
                <ControlAccounts
                    show={this.state.modalCntrlAccts}
                    onHide={this.handleModalCloseCntrlaccts}
                />
                <PaymentTerms
                    show={this.state.modalPaymentTrms}
                    onHide={this.handleModalClosePaymentTrms}
                />
            </div> 
        )
    }

}

export  default BPMasterData
