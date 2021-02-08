import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class TaxCode extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'name',
                text: 'NAME'
            },
            {
                dataField: 'notExceedTaxBasis',
                text: 'NOT EXCEED TAX BASIS'
            },
            {
                dataField: 'exceedTaxBasis',
                text: 'EXCEED TAX BASIS'
            },
            {
                dataField: 'withoutTaxBasis',
                text: 'WITHOUT TAX BASIS'
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                
            }] 
       
        const dtr1 = [
            {"name" : "", 
            "notExceedTaxBasis" : "",
            "exceedTaxBasis" : "", 
            "withoutTaxBasis" : "",
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
                            <Card.Header>Tax Code</Card.Header>
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
                                                placeholder="Not Exceed Tax Basis" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Exceed Tax Basis" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Without Tax Basis" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/TaxCodeCreate">
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

export default TaxCode;