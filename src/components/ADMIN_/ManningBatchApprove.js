import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class ManningBatchApprove extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'isIncluded',
                text: 'IS INCLUDED',
                editor: {
                    type: Type.CHECKBOX,
                    value: 'Y:N'
                  }
            },
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
                dataField: 'rate',
                text: 'RATE'
            },
            {
                dataField: 'payCardType',
                text: 'PAY CARD TYPE'
            },
            {
                dataField: 'contractDateStart',
                text: 'CONTRACT DATE START'
            },
            {
                dataField: 'jobPosition',
                text: 'JOB POSITION',
                
            },
            {
                dataField: 'employeeStatusType',
                text: 'EMPLOYEE STATUS START'
            },
            {
                dataField: 'contractDateEnd',
                text: 'CONTRACT DATE END'
            },
            {
                dataField: 'dateOfDeactivation',
                text: 'DATE OF DEACTIVATION'
            },
            {
                dataField: 'payCardNumber',
                text: 'PAY CARD NUMBER',
                
            }] 
       
        const dtr1 = [
            {"isIncluded" : "", 
            "employee" : "",
            "client" : "",
            "branch" : "",
            "rate" : "", 
            "payCardType" : "",
            "contractDateStart" : "",
            "jobPosition" : "",
            "employeeStatusType" : "", 
            "contractDateEnd" : "",
            "dateOfDeactivation" : "",
            "payCardNumber" : "",
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
                            <Card.Header>Manning Batch Approve</Card.Header>
                            <Card.Body>
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
                                                placeholder="Cut Off Date From" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Cut Off Date To" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                    </ButtonToolbar>
                                <Form>
                                    <Form.Row className="mt-5">
                                        <BootstrapTable
                                        keyField = "id"
                                        data = { dtr1 }
                                        columns = { columns1 }
                                        //selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                        /> 
                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Approve
                                        </Button>&nbsp;&nbsp;
                                        <Button  variant="primary" variant="danger">
                                            Reject
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

export default ManningBatchApprove;