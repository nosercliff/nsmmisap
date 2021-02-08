import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class EmployeeStatusType extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'fullName',
                text: 'Full NAME'
            },
            {
                dataField: 'state',
                text: 'STATE'
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                editable:false,
                /* if(row.statusId=="1") {
                        return (
                            <NavLink to={{pathname:"/ApplicationFormView",params:{data:row} }}>
                                <Button variant="secondary"
                                href="/ApplicationFormView"
                                >Edit</Button>
                            </NavLink>
                        );
                },
                    headerStyle : () => {
                        return { width  : "5%" };
                    }
                }, */
            }] 
       
        const dtr1 = [
            {"fullName" : "DELA CRUZ, JUAN D",
            "state":"Active",
            "command" : "",},
            {"fullName" : "ARELLANO, ALJON FRANK BALITON", 
            "state":"Active",
            "command" : "",},
            {"fullName" : "LORENZO, RAZELL MAHILUM", 
            "state":"Active",
            "command" : "",},
            {"fullName" : "FULGENCIO, JOHN ROBERT JUMAYAO", 
            "state":"Active",
            "command" : "",},
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
                            <Card.Header>201 FILES</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="First Name" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/EmployeeStatusTypeCreate">
                                            <Button  variant="primary" variant="success">
                                                Create 
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

export default EmployeeStatusType;