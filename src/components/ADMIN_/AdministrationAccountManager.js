import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class AdministrationAccountManager extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'employee',
                text: 'EMPLOYEE'
            },
            {
                dataField: 'client',
                text: 'CLIENT'
            },
            {
                dataField: 'branch',
                text: 'BRANCH',
            },
            {
                dataField: 'submittedDate',
                text: 'SUBMITTED DATE',
            },
            {
                dataField: 'approvalStatus',
                text: 'APPROVAL STATUS',
            },
            {
                dataField: 'command',
                text: 'COMMAND',
            }] 
       
        const dtr1 = [
            {"fullName" : "PO, ANTONIO DE NIÑO CORNITO", 
            "client" : "NORTHSTAR MEAT MERCHANTS - SVI ILO-ILO",
            "branch" : "ILOILO - SVI DELGADO - MEAT",
            "approvalStatus" : "8/9/2019",
            "approvalStatus" : "REJECTED BY ADMIN",
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
                            <Card.Header>Administration AccountManager</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Employee" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Client" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Branch" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Approval Status" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Submitted Date" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/AdministrationAccountManagerCreate">
                                            <Button  variant="primary" variant="success">
                                                Create
                                            </Button>
                                        </NavLink>&nbsp;&nbsp;
                                        <NavLink to="/AccountManagerBatchApprove">
                                            <Button  variant="primary" variant="success">
                                                Batch Upload
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

export default AdministrationAccountManager;