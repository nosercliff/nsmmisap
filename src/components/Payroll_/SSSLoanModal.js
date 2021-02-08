import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker
} 
from '../../noser-hris-component';


class SSSLoanModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }

    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))

    }


    render() {

    return(
        <div className="mt-5 container">
                <Container className="mt-5">
                    <Card>
                        <Card.Body>
                            <Form>
                                <Card.Header > SSS Loan</Card.Header>
                                <Form.Row>
                                    <Form.Group as={Row}  className="mt-2" controlId="formGridState">
                                        <Col sm={8} >
                                            <Form.Label  >
                                                    Loan Amount
                                            </Form.Label>&nbsp;
                                            <Form.Control type="text" 
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                        </Col>
                                        
                                    </Form.Group>
                                    <Form.Group as={Row}  className="mt-2" controlId="formGridState">
                                    <Col sm={6}>
                                        <Form.Label  >
                                            Effectivity Date
                                        </Form.Label>&nbsp;&nbsp;
                                            <DatePicker 
                                                ref='PayModesDate'
                                                selected={this.state.PayModesDate}
                                                onChange={this.handleChangePayModesDate}
                                                minDate={this.minDate}
                                                value={this.props.PayModesDate}
                                                dateFormat={"MM/dd/yyyy"}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Col sm={2} className="mt-2">
                                        <Form.Label  >
                                            No. OF Months.
                                        </Form.Label>&nbsp;
                                        <Form.Control type="text" 
                                        ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>&nbsp;&nbsp;
                                    <Col sm={2} className="mt-2">
                                        <Form.Label  >
                                            Monthly Amortization
                                        </Form.Label>&nbsp;
                                        <Form.Control type="text" 
                                        ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                </Form.Row>
                                    <ButtonToolbar >
                                        <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                            Add
                                        </Button>&nbsp;
                                    </ButtonToolbar>
                                    <Card.Header className="mt-2"> </Card.Header>
                                <Form.Row className="mt-2">
                                    <Col sm={6}>
                                        <Form.Label>Month</Form.Label>
                                        <Form.Control as="select">
                                            <option>January</option>
                                            <option>February</option>
                                            <option>March</option>
                                            <option>April</option>
                                            <option>May</option>
                                            <option>June</option>
                                            <option>July</option>
                                            <option>August</option>
                                            <option>September</option>
                                            <option>October</option>
                                            <option>November</option>
                                            <option>December</option>
                                        </Form.Control>
                                    </Col>
                                    <Col sm={6} >
                                        <Form.Label  >
                                                Pay Mode
                                        </Form.Label>&nbsp;
                                        <Form.Control type="text" placeholder=" Select Pay Mode"
                                        ref={this.textInput} onChange={() => this.handleChange()}  />
                                    </Col>
                                </Form.Row>
                                <Form.Row className="mt-2">
                                        <Col sm={6} >
                                            <Form.Label>Cut-Off</Form.Label>
                                            <Form.Control as="select">
                                                <option>1st Cut-Off</option>
                                                <option>2nd Cut-Off</option>
                                                <option>3rd Cut-Off</option>
                                                <option>4th Cut-Off</option>
                                                <option>5th Cut-Off</option>
                                            </Form.Control>
                                        </Col>
                                        <Col sm={6} >
                                                <Form.Label  >
                                                    Deduction
                                                </Form.Label>
                                                <Form.Control type="text" 
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                </Form.Row>
                                <Form.Row className="mt-2"> 
                                    <Col sm={4} >
                                            <Form.Check 
                                            type="checkbox"
                                            label="Adjustment"
                                            checked={ this.state.checked } 
                                            onChange={ this.handleChangeCheckbox } /> 
                                                <Form.Control type="text" placeholder=" Enter Amount" className="mt-2"
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                            <Col sm={8} >
                                                <Form.Label  >
                                                    Remarks
                                                </Form.Label>
                                                <Form.Control type="text" 
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                   
                                </Form.Row>  
                                <Form.Group as={Row} controlId="formHorizontalEmail" className="mt-5">
                                    <Col>
                                        <ButtonToolbar >
                                            <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            <Button variant="danger" href="/PayrollPeriod">
                                                Close
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}

export  default SSSLoanModal
