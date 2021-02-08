import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';

class PayrollInclusion extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        
            
        return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                            <Card.Header>Payroll Variables Inclusions</Card.Header>
                        <Card.Body>
                            <Form>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Col sm={12} >
                                            <Form.Control type="text" placeholder="Select Inclusion  Type"
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Col sm={12} >
                                                <Form.Control type="text" placeholder="Select Inclusion"
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                        </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label  >&nbsp;&nbsp;&nbsp;
                                        Effectivity Date
                                    </Form.Label>&nbsp;&nbsp;&nbsp;
                                  
                                        <DatePicker
                                        
                                            ref='Effectivity Date'
                                            selected={this.state.BranchDate}
                                            onChange={this.handleChangePayBranchDate}
                                            minDate={this.minDate}
                                            value={this.props.BranchDate}
                                            dateFormat={"MM/dd/yyyy"}
                                        />&nbsp;&nbsp;&nbsp;
                                    
                                    <Col sm={2} >
                                        <Form.Control type="text" placeholder="Amount" className="mr-3"
                                        ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                </Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Row>
                              
                                    <Col sm="1" className="mt-4">
                                        <Form.Check
                                            label="Recurring"
                                            onChange={e => this.handleChangeCheckboxLeave(e)}
                                            />
                                     </Col>&nbsp;&nbsp;&nbsp;
                                    <Col sm={4} >&nbsp;&nbsp;&nbsp;
                                        <Form.Control type="text" placeholder="Month" className="mr-5"
                                         ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                    <Col sm={2}>&nbsp;&nbsp;&nbsp;
                                        <label  for="exampleFormControlInput1" className="mt-4">Pay Cut-Off</label>
                                    </Col>
                                    
                                    <Col sm="1">&nbsp;&nbsp;&nbsp;
                                        <Form.Check
                                            label="1st"
                                            onChange={e => this.handleChangeCheckboxLeave(e)}
                                            />
                                     </Col>
                                     <Col sm="1">&nbsp;&nbsp;&nbsp;
                                        <Form.Check
                                            label="2nd"
                                            onChange={e => this.handleChangeCheckboxLeave(e)}
                                            />
                                     </Col>
                                     <Col sm="1">&nbsp;&nbsp;&nbsp;
                                        <Form.Check
                                            label="3rd"
                                            onChange={e => this.handleChangeCheckboxLeave(e)}
                                            />
                                     </Col>
                                     <Col sm="1">&nbsp;&nbsp;&nbsp;
                                        <Form.Check
                                            label="4th"
                                            onChange={e => this.handleChangeCheckboxLeave(e)}
                                            />
                                     </Col>
                                     
                                    </Form.Row> 
                                </Form.Group>
                                </Form>
                                <div className="mt-2">
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick={this.onSubmitSave}>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button variant="danger" href="/banner">Close</Button>
                                    </ButtonToolbar>
                                    <Card.Header className="mt-2" > </Card.Header>
                                </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}



export  default PayrollInclusion