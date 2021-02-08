import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class UploadingBatchApprove extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'fullName',
                text: 'FULL NAME'
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
                dataField: 'jobPosition',
                text: 'JOB POSITION',
            },
            {
                dataField: 'salaryOffer',
                text: 'SALARY OFFER',
            },
            {
                dataField: 'command',
                text: 'COMMAND',
            }] 
       
        const dtr1 = [
            {"fullName" : "PO, ANTONIO DE NIÑO CORNITO", 
            "client" : "NORTHSTAR MEAT MERCHANTS - SVI ILO-ILO",
            "branch" : "PAPERLAND - BALINTAWAK",
            "jobPosition" : "UTILITY MAN",
            "salaryOffer" : "502.0000",
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
                                            Batch Approve Upload
                                        </Button>&nbsp;&nbsp;
                                        <Button  variant="primary" variant="danger">
                                            Batch Reject Upload
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

export default UploadingBatchApprove;