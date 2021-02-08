import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Row, Col, } from "react-bootstrap";

class EmployeeConfiguration extends Component {

    constructor() {
        super()
        this.state = {
        }
    }



    render() {
        const columns = [
            {
                dataField: 'from',
                text: 'From'
            },
            {
                dataField: 'to',
                text: 'To',
                editable: false
            },
            {
                dataField: 'manday',
                text: 'Manday(s)',
                editable: false
            },
            {
                dataField:'reason',
                text:'Reason',
                editable: false
            }
        ]
        const columns2 = [
            {
                dataField: 'day',
                text: 'Day'
                
            }
        ]
        const columns3 = [
            {
                dataField: 'particular',
                text: 'Particular'
            },
            {
                dataField: 'time',
                text: 'Time',
                editable: false
            }
        ]
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

         const holidays = [
            {"from" : "2/3/2020", "to" : "2/7/2020", "manday" : "5"},
            {"from" : "2/12/2020", "to" : "2/12/2020", "manday" : "1"},
        ]
        const restdays = [
            
            {"day" : "Saturday"},
            {"day" : "Sunday"},
        ]
        const worksched = [
            {"particular" : "Time-In", "time" : "08:00 AM"},
            {"particular" : "Time-Out", "time" : "05:00 PM"},
        ]
          return(
                <div className="mt-5">
                    <Card>
                    <Card.Header>Employee Configuration</Card.Header>
                    <Card.Body>
                        <Form>
                        
                            <Form.Row>
                                <Col>
                                <Form.Control placeholder="Select Client" />
                                </Col>
                                <Col>
                                <Form.Control placeholder="Select Employee ID" />
                                </Col>
                            </Form.Row>&nbsp;&nbsp;
                            <Form.Row>
                                <Col>
                                <Form.Control placeholder="Select Last Name" />
                                </Col>
                                <Col>
                                <Form.Control placeholder="Select First Name" />
                                </Col>
                            </Form.Row>&nbsp;&nbsp;

                            <Form.Group  controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Active" />
                                    </Form.Group>
                                <Form.Row>
                                <Col>
                                <Form.Control placeholder="Select Pay Type" />
                                </Col>
                                <Col>
                                <Form.Control placeholder="Select Location" />
                                </Col>
                            </Form.Row>

                        </Form>&nbsp;&nbsp;
                        <Form.Group controlId="formBasicCheckbox">
                         <Form.Check type="checkbox" label="Leave" />
                         </Form.Group> 
                        <BootstrapTable
                        keyField = "holiday"
                        data = { holidays }
                        columns = { columns }
                        //selectRow = { selectRow }
                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                        />
                        <Form.Group controlId="formBasicCheckbox">
                           <Form.Check type="checkbox" label="Rest Day" />
                        </Form.Group> 

                        <BootstrapTable
                        keyField = "restday"
                        data = { restdays }
                        columns = { columns2 }
                        //selectRow = { selectRow }
                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                        />

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Col sm={6}>
                                    <Form.Control type="text" placeholder="Select Work Schedule" />
                                </Col>
                        </Form.Group>
                        <BootstrapTable
                        keyField = "particular"
                        data = { worksched }
                        columns = { columns3 }
                        //selectRow = { selectRow }
                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                        />
                        <ButtonToolbar sm={12}>
                            <Button variant="success" className="ml-auto">
                                Save
                            </Button>&nbsp;&nbsp;
                            <Button variant="danger" >
                                Close
                            </Button>
                        </ButtonToolbar>

                    </Card.Body>
                </Card>

                </div>
        )
    }

}

export  default EmployeeConfiguration