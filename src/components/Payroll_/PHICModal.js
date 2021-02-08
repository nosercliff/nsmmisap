import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton
} 
from '../../noser-hris-component';


class PHICModal extends Component {

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
                                <Card.Header >PHIC Contribution</Card.Header>
                                <Form.Group as={Col} controlId="formGridState" className="mt-2">
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
                                    <Col sm={6} className="mt-2">
                                    <Form.Label>Cut-Off</Form.Label>
                                    <Form.Control as="select">
                                        <option>1st Cut-Off</option>
                                        <option>2nd Cut-Off</option>
                                        <option>3rd Cut-Off</option>
                                        <option>4th Cut-Off</option>
                                        <option>5th Cut-Off</option>
                                    </Form.Control>
                                    </Col>
                                   {/*   <Col sm={6} className="mt-3">
                                    <Form.Control as="select">
                                        <option>Sub Total</option>
                                        <option>Gross Pay</option>
                                        
                                    </Form.Control>
                                    </Col> */}
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={8} className="mt-2">
                                                <Form.Label  >
                                                       Gross Salary
                                                </Form.Label>&nbsp;
                                                <Form.Control type="text" 
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={8} className="mt-2">
                                        <Col sm={12} >
                                            <Form.Check className="mr-5" 
                                            type="checkbox" 
                                            label="Contribution"  
                                            checked={ this.state.checked } 
                                            onChange={ this.handleChangeCheckbox } /> 
                                        </Col >
                                            
                                            <Form.Control type="text" 
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                        </Col>
                                    </Form.Group>
                                    <label class="font-italic" for="exampleFormControlInput1">Current Balance:<span style={{color: 'red'}}>{this.state.periodType}</span></label>
                                    <Form.Group as={Row} controlId="formHorizontalEmail"  className="ml-auto" >
                                   
                                        <Col sm={12} >
                                            <Form.Check className="mr-5" 
                                            type="checkbox" 
                                            label="Enter Amount"  
                                            checked={ this.state.checked } 
                                            onChange={ this.handleChangeCheckbox } /> 
                                        </Col >
                                        <Col sm={8} className="mt-2">
                                                <Form.Control type="text" placeholder="Enter Amount"
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                    </Form.Group >
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={8} className="mt-2">
                                                <Form.Label  >
                                                    EE Share
                                                </Form.Label>&nbsp;
                                                <Form.Control type="text" 
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={8} className="mt-2">
                                                <Form.Label  >
                                                    ER Share
                                                </Form.Label>&nbsp;
                                                <Form.Control type="text" 
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={8} className="mt-2">
                                                <Form.Label  >
                                                    EC Contribution
                                                </Form.Label>&nbsp;
                                                <Form.Control type="text" 
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                    </Form.Group>
                                </Form.Group>   
                                <Form.Group as={Row} controlId="formHorizontalEmail">
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
export  default PHICModal