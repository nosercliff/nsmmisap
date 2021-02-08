import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class LeaveRule extends Component {
    state = {
         
    }

    render() {
        const columns1 = [
            {
                dataField: 'leaveRuleName',
                text: 'LEAVE RULE NAME'
            },
            {
                dataField: 'leaveType',
                text: 'LEAVE TYPE',
                
            }] 
       
        const dtr1 = [
            {"leaveRuleName" : "", 
            "leaveType" : "",
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
                            <Card.Header>Leave Rule</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Row>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Leave Rule Name" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Leave Type" 
                                                ref={this.textInput} 
                                                onChange={() => this.handleChange()} autoComplete="off" 
                                            />
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/LeaveRuleCreate">
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

export default LeaveRule;