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
                        <Card.Header>Payroll Inclusions Menu</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Col sm={12} >
                                            <Form.Control type="text" placeholder="Select Client"
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Col sm={12} >
                                                <Form.Control type="text" placeholder="Select Branch"
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                        </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                        <Col sm={12} >
                                            <Form.Control type="text" placeholder="Select Employee"
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Col sm={12} >
                                                <Form.Control type="text" placeholder="Select Employee No."
                                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                            </Col>
                                        </Form.Group>
                                        </Form.Row>
                                </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}



export  default PayrollInclusion