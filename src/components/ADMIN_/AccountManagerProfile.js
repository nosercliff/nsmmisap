import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class AccountManagerProfile extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'fullName',
                text: 'FULL NAME'
            },
            {
                dataField: 'approvalStatus',
                text: 'APPROVAL STATUS',
            },
            {
                dataField: 'submittedDate',
                text: 'SUBMITTED DATE',
            },
            {
                dataField: 'command',
                text: 'COMMAND',
            }] 
       
        const dtr1 = [
            {"fullName" : "PO, ANTONIO DE NIÑO CORNITO", 
            "approvalStatus" : "REJECTED BY ADMIN",
            "submittedDate" : "8/9/2019",
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
                            <Card.Header>Accounts Manager Employment Record</Card.Header>
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
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Sort By" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    
                                    <ButtonToolbar sm={12} className="mt-5">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/AccountManagerProfileCreate">
                                            <Button  variant="primary" variant="success">
                                                Create
                                            </Button>
                                        </NavLink>&nbsp;&nbsp;
                                        <NavLink to="/BatchUpload">
                                            <Button  variant="primary" variant="success">
                                                Batch Upload
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                    <Form.Row className="mt-2">
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

export default AccountManagerProfile;