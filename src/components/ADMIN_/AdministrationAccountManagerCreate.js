import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class AdministrationAccountManagerCreate extends Component {
    state = {
         
    }

    render() {
        

        return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>Create Administration Account Manager</Card.Header>
                            <Card.Body>
                                <Form>
                                <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Name" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        </Form.Row>
                                        <Form.Row>
                                        
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Client/S" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Client/S" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col sm={6} className="mt-3">
                                                <Form.Check
                                                    label="IS DEFAULT BRANCH"
                                                    onChange={e => this.handleChangeCheckboxPaymentMode(e)}
                                                    />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Date Hired" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Job Position" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Employee Status" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Date Of Deactivation" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Pay Card Type" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Pay Card Number" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="TMN Profileid" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Contract Date Start" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Contract Date End" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Rate" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="SEA Value" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        </Form.Row>
                                        <Form.Row>
                                        
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="ECOLA Value" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={6} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="COLA Value" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                            <Col sm={12} className="mt-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Remarks" 
                                                    ref={this.textInput} 
                                                    onChange={() => this.handleChange()} autoComplete="off" 
                                                />
                                            </Col>
                                        </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
            </div> 
            
        )
    }
}

export default AdministrationAccountManagerCreate;