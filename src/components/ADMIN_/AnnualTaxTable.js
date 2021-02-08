import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class AnnualTaxTable extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'salaryFrom',
                text: 'SALARY FROM'
            },
            {
                dataField: 'salaryTo',
                text: 'SALARY TO'
            },
            {
                dataField: 'ratePercentage',
                text: 'RATE PERCENTAGE'
            },
            {
                dataField: 'rateAmount',
                text: 'RATE AMOUNT'
            },
            {
                dataField: 'rateExcessOver',
                text: 'RATE EXCESS OVER'
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                
            }] 
       
        const dtr1 = [
            {"salaryFrom" : "8,000,000.00", 
            "salaryTo" : "9,999,999,999.00",
            "ratePercentage" : "999,999,999.00", 
            "rateAmount" : "35.00",
            "rateExcessOver" : "8,000,000.00",
            "command" : "", 
        },
        {"salaryFrom" : "2,000,000.00", 
        "salaryTo" : "7,999,999.99",
        "ratePercentage" : "32.00", 
        "rateAmount" : "490,000.00",
        "rateExcessOver" : "	2,000,000.00",
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
                            <Card.Header>Annual Tax Table</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Salary From" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Salary To" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/AnnualTaxTableCreate">
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

export default AnnualTaxTable;