import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class JobPosition extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'name',
                text: 'NAME'
            },
            {
                dataField: 'isActive',
                text: 'IS ACTIVE',
                editor: {
                    type: Type.CHECKBOX,
                    value: 'Y:N'
                  }
            }] 
       
        const dtr1 = [
            {"name" : "DOC HELPER", 
            "isActive" : "",},
            {"name" : "LAMINATION OPERATOR", 
            "isActive" : "",},
            {"name" : "RELIEVER", 
            "isActive" : "",},
            {"name" : "HR SPECIALIST", 
            "isActive" : "",},
            {"name" : "SALES MAN", 
            "isActive" : "",},
            {"name" : "CYCLE COUNTER", 
            "isActive" : "",},
            {"name" : "MAINTENANCE MECHANIC", 
            "isActive" : "",},
            {"name" : "SPECIAL DEPLOYMENT", 
            "isActive" : "",},
            {"name" : "ON CALL HEAD PANTRY", 
            "isActive" : "",},
            {"name" : "CALENDAR GIRL", 
            "isActive" : "",},
            {"name" : "BTEEDER MONITORING", 
            "isActive" : "",},
            {"name" : "UTILITYMAN(ON-CALL)", 
            "isActive" : "",},
            {"name" : "MOTORPOOL DRIVER", 
            "isActive" : "",},
            {"name" : "FIELD CUSTOMER SERVICE ASSISTANT", 
            "isActive" : "",},
            {"name" : "GPS SHOOTER", 
            "isActive" : "",},
            {"name" : "WEAVING STAFF", 
            "isActive" : "",},
            {"name" : "YARN SUPPLIER", 
            "isActive" : "",},
            {"name" : "BALER", 
            "isActive" : "",},
            {"name" : "PALLET BALER", 
            "isActive" : "",},
            {"name" : "ASSISTANT CAKE DECORATOR", 
            "isActive" : "",},
        ] 
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>Job Position</Card.Header>
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
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="success">
                                            Clear Filter
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/JobPositionCreate">
                                            <Button  variant="primary" variant="success">
                                                Create JobOpening Source
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                    <Form.Row className="mt-5">
                                        <BootstrapTable
                                        keyField = "name"
                                        data = { dtr1 }
                                        columns = { columns1 }
                                        //selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                        /> 
                                    </Form.Row>
                                        
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
            </div> 
            
        )
    }
}

export default JobPosition;