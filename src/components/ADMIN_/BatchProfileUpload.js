import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';

class BatchProfileUpload extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'client',
                text: 'CLIENT'
            },
            {
                dataField: 'status',
                text: 'STATUS',
                editable: false
            },
            {
                dataField: 'command',
                text: 'COMMAND'
            }
            
        ] 
        const dtr1 = [
            {"clients" : "", 
            "status" : "",
            "command" : "",},
        ] 
        /* const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        }; */

        const columns2 = [
            {
                dataField: 'uploaddate',
                text: 'UPLOAD DATE'
            },
            {
                dataField: 'fullname',
                text: 'FULLNAME',
                editable: false
            },
            {
                dataField: 'errorlog',
                text: 'ERROR LOG'
            }
            
        ] 
        const dtr2 = [
            {"uploaddate" : "", 
            "fullname" : "",
            "errorlog" : "",},
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
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success"  onClick={this.handleSaveClick}>
                                            Extract Template
                                        </Button>&nbsp;&nbsp;
                                    </ButtonToolbar>&nbsp;&nbsp;
                                    <Form.Row>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Client" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    <Form.Group className="mt-3">
                                    <input
                                        className="csv-input"
                                        type="file"
                                        ref={input => {
                                        this.filesInput = input;
                                        }}
                                        name="file"
                                        placeholder={null}
                                        onChange={this.handleChange}
                                    />&nbsp;&nbsp;&nbsp;
                                </Form.Group>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Upload
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="success">
                                            Validate Upload
                                        </Button>
                                    </ButtonToolbar>
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
                                    <Card.Header>Upload Date</Card.Header>
                                    <Form.Row>
                                        <Col  className="mt-3">
                                            <DatePicker
                                                ref='periodDateFrom'
                                                selected={this.state.periodDateFrom}
                                                onChange={this.handleChangePeriodDateFrom}
                                                minDate={this.minDate}
                                                value={this.props.periodDateFrom}
                                                dateFormat={"MM/dd/yyyy"}
                                                placeholderText="From :"
                                                className="form-control"
                                                
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="FullName" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col className="mt-3">
                                            <DatePicker
                                                ref='periodDateFrom'
                                                selected={this.state.periodDateFrom}
                                                onChange={this.handleChangePeriodDateFrom}
                                                minDate={this.minDate}
                                                value={this.props.periodDateFrom}
                                                dateFormat={"MM/dd/yyyy"}
                                                placeholderText="To :"
                                                className="form-control"
                                                
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    
                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <Button  variant="primary" variant="success">
                                                    Clear Filter
                                                </Button>&nbsp;&nbsp;
                                                <Button  variant="primary" variant="success">
                                                    Clear Error Logs
                                                </Button>
                                                
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Form.Row className="mt-5">
                                        <BootstrapTable
                                        caption={Noser.TableHeader({title:"BATCH UPLOAD ERROR LOGS"})}
                                        keyField = "name"
                                        data = { dtr2 }
                                        columns = { columns2 }
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

export default BatchProfileUpload;