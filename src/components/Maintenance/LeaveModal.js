import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row, Container } from "react-bootstrap";

class Leave extends Component {

    constructor() {
        super()
        this.state = {
        }
    }



    render() {
        const columns = [
            {
                dataField: 'leave/absent',
                text: 'Scheduled for Leave / Absent'
            },
            {
                dataField: 'paid',
                text: 'Paid'
            },

        ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };


        const absent = [
            {"leave/absent" : "Jan 1, 2020", "paid" : "Paid"},
            {"leave/absent" : "Feb 17, 2020", "paid" : "Paid"}
            ]



        return(
                <div className="mt-5">
                <Card>
                     <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm="2">
                                    From
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text" placeholder="Jan 13, 2020" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm="2">
                                    To
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text" placeholder="Jan 13, 2020" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm="2">
                                    Duration
                                    </Form.Label>
                                    <Col sm="10">
                                    <Form.Control type="text" placeholder="0.5 day(s)" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Control type="text" placeholder="Reason for Leave / Absent" />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Unpaid (Absent)" />
                            </Form.Group>
                            <ButtonToolbar>
                            <Button variant="success" className="ml-auto">
                                Add
                            </Button>
                        </ButtonToolbar>
                        </Form>
                        <div className="mt-5">
                        <h5>Applicable Rest Day:</h5>
                        <BootstrapTable
                        keyField = "leave/absent"
                        data = { absent }
                        columns = { columns }
                        selectRow = { selectRow }
                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                        />
                        <ButtonToolbar>
                            <Button variant="danger" className="ml-auto">
                                close
                            </Button>
                        </ButtonToolbar>
                        </div>
                    </Card.Body>
                </Card>

                </div>
        )
    }

}

export  default Leave