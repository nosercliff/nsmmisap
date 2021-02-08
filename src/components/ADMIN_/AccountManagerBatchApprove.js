import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class AccountManagerBatchApprove extends Component {
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
                text: 'APPROVAL STATUS'
            },
            {
                dataField: 'submittedDate',
                text: 'SUBMITTED DATE'
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                
            }] 
       
        const dtr1 = [
            {"fullName" : "", 
            "approvalStatus" : "",
            "submittedDate" : "",
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
                            <Card.Header>Batch Approve</Card.Header>
                            <Card.Body>
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

export default AccountManagerBatchApprove;