import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class PregeneratedEmployeeNo extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'name',
                text: 'NAME'
            },
            {
                dataField: 'numberto',
                text: 'NUMBER TO GENERATE',
                
            }] 
       
        const dtr1 = [
            {"name" : "YVES TEST", 
            "numberto" : "3",},
            {"name" : "JOEY ELFA", 
            "numberto" : "1",},
            {"name" : "JOEY ELFA SC", 
            "numberto" : "5",},
            {"name" : "JOEY ELFA SC 1", 
            "numberto" : "3",},
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
                            <Card.Header>SEARCH PREGENERATED EMPLOYEE NUMBERS</Card.Header>
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
                                        <NavLink to="/PregeneratedEmployeeNoCreate">
                                            <Button  variant="primary" variant="success">
                                            Create Pregenerated Employee No.
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

export default PregeneratedEmployeeNo;