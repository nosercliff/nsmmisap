import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class RoleCreate extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'name',
                text: 'NAME'
            },
            {
                dataField: 'area',
                text: 'AREA'
            },
            {
                dataField: 'controller',
                text: 'CONTROLLER'
            },
            {
                dataField: 'action',
                text: 'ACTION'
            },
            {
                dataField: 'isDeny',
                text: 'IS DENY'
            },
            {
                dataField: 'command',
                text: 'COMMAND'
            },
            
        ]
        const dtr1 = [
            {"name" : "", 
            "area" : "",
            "controller" : "", 
            "action" : "",
            "isDeny" : "", 
            "command" : "",
        }] 
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
                            <Card.Header>Role Create</Card.Header>
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
                                            View Feature
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/RoleCreate">
                                            <Button  variant="primary" variant="success">
                                                Submit
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                    <Form.Row className="mt-5">
                                        <BootstrapTable
                                        keyField = "id"
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

export default RoleCreate;