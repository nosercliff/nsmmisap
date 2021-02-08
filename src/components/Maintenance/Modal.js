import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row } from "react-bootstrap";

class Modal extends Component {

    constructor() {
        super()
        this.state = {
        }
    }



    render() {
        const columns = [
            {
                dataField: 'breaktime',
                text: 'Breaktime Template'
            },
            {
                dataField: 'm/h',
                text: 'm/h'
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


        const rest = [
            {"breaktime" : "Coffee - AM", "m/h" : "15m", "paid" : "Paid"},
            {"breaktime" : "Rest - PM", "m/h" : "2hr", "paid" : "Unpaid"},
            {"breaktime" : "Coffee - PM", "m/h" : "15m", "paid" : "Paid"},
            {"breaktime" : "Lunch / Dinner", "m/h" : "1hr", "paid" : "Paid"}
            ]



        return(
                <div className="mt-5">
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Control type="text" placeholder="Breaktime" />
                                </Col>
                            </Form.Group>
                            <ButtonToolbar>
                            <Button variant="success" className="ml-auto">
                                Add
                            </Button>
                        </ButtonToolbar>
                        </Form>
                        <div className="mt-5">
                        <h5>Applicable Breaktime:</h5>
                        <BootstrapTable
                        keyField = "breaktime"
                        data = { rest }
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

export  default Modal