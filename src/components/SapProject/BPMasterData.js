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

    render() {
        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Form.Group className="mt-4" as={Row} controlId="formPlaintextEmail">
                        <Col sm="8">
                            <Card style={{background : "#f0fff9"}}>
                                <Card.Header style={{background : "#ababac"}}>INVENTORY >> BUSINESS PARTNER >> MASTER DATA</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>   

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                CODE
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
                                                NAME
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
                                                FOREIGN NAME
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
                                                GROUP
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
                                                CURRENCY
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
                                                FEDERAL TAX ID
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
                                                    <Tab eventKey="default" title="General">
                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            TEL 1
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
                                                            TEL 2
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
                                                            MOBILE PHONE
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
                                                            IN TRANSIT WAREHOUSE CODE
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
                                                            FAX
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
                                                            E-MAIL
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
                                                            IN TRANSIT WAREHOUSE NAME
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
                                                            WEBSITE 
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
                                                            SHIPPING TYPE
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
                                                        SALES EMPLOYEE
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
                                                            PASSWORD
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
                                                            FACTORING INDICATOR
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
                                                            BP PROJECT
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
                                                            BP CHANNEL CODE
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
                                                            INDUSTRY
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
                                                            TECHNICIAN
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
                                                            BUSINESS PARTNER TYPE
                                                        </Form.Label>
                                                        <Col sm="3">
                                                            <Form.Control as="select">
                                                                <option>Company</option>
                                                                <option></option>
                                                                <option></option>
                                                            </Form.Control>
                                                        </Col>
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            TERRITORY
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
                                                            LANGUAGE
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
                                                            ALIAS NAME
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
                                                            BLOCK SENDING MARKETING CONTENT
                                                        </Form.Label>
                                                        <Col sm="1">
                                                        <Button style={{minWidth:'40px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}}>
                                                            ...
                                                        </Button>
                                                        </Col>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Check type="radio" aria-label="radio 1" />
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            ACTIVE
                                                        </Form.Label>
                                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                            FROM
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
                                                            TO
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
                                                            REMARKS
                                                        </Form.Label>
                                                        <Col sm="2">
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
                                                        <Form.Check type="radio" aria-label="radio 1" />
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            INACTIVE
                                                        </Form.Label>
                                                    </Form.Group>

                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Check type="radio" aria-label="radio 1" />
                                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                                            ADVANCE
                                                        </Form.Label>
                                                    </Form.Group>

                                                    </Tab>
                                                    <Tab eventKey="contactPerson" title="Contact Persons"> </Tab>
                                                    <Tab eventKey="address" title="Address"> </Tab>
                                                    <Tab eventKey="PaymentTerms" title="Payment Terms"> </Tab>
                                                    <Tab eventKey="paymentRun" title="Payment Run"> </Tab>
                                                    <Tab eventKey="accounting" title="Accounting"> </Tab>
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
                                        CATEGORY
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
                                        BUSINESS OFFICE
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
                                        REGION
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
                                        STORE
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
                                        ACCOUNT / DEP'T
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
                                        TOTAL LEASED AREA
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
                                        START OF LEASE
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
                                        END OF LEASE
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
                                        MONTHLY RENTAL
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
                                        TERMINATION DATE
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
                                        LOCATION GROUP
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
            </div> 
        )
    }

}

export  default BPMasterData
