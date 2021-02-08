import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class ProductCreate extends Component {
    state = {
         
    }

    render() {
        

        return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>Create Product</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Category" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Product Name" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Price" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Submit
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/ProductCreate">
                                            Back
                                        </Button>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
            </div> 
            
        )
    }
}

export default ProductCreate;