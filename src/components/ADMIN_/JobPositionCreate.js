import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class JobPositionCreate extends Component {
    state = {
         
    }

    render() {
        

        return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>Create Job Position</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Name" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>

                                    </Form.Row>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={6} className="mt-3">
                                        <Form.Check
                                            label="IS ACTIVE"
                                            onChange={e => this.handleChangeCheckboxPaymentMode(e)}
                                            />
                                    </Col>
                                </Form.Group>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Submit
                                        </Button>&nbsp;&nbsp;
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
            </div> 
            
        )
    }
}

export default JobPositionCreate;