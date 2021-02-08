import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';

class BatchUpload extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'fullName',
                text: 'FULL NAME'
            }
            
            
        ] 
        const dtr1 = [
            {"fullName" : "", 
            },
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
                            <Card.Header>BATCH UPLOAD RECORDS</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row className="mt-5">
                                        <BootstrapTable
                                        caption={Noser.TableHeader({title:"BATCH UPLOAD FILE(PROCESSING)"})}
                                        keyField = "name"
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
                                        <Button variant="success">
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

export default BatchUpload;