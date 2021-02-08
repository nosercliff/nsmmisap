import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Row, Col,Container } from "react-bootstrap";
import Banner from "../../Nav/Banner"
import { AppConfiguration } from "read-appsettings-json"

class RateCardConfig extends Component {

    state = {
        rateList: []
    }

    handleSearchClick = event => {

        const rate = [
            {"code" : "MH", "element" : "Manhours / Working Hours"},
            {"code" : "ND", "element" : "Night Shift Differential"},
            {"code" : "OT", "element" : "Regular Overtime"},
            {"code" : "ND OT", "element" : "Regular Overtime  with Night Shift Differential"},
            {"code" : "LHOL", "element" : "Legal Holiday"},
            {"code" : "LHOL OT", "element" : "Legal Holiday OT"},
            {"code" : "LHOL ND", "element" : "Legal Holiday with Night Shift Differential"}
        ]

        this.setState({ rateList: rate });

    }

    handleCreateClick = event => {
        alert("handleCreateClick");
    }

    handleCloseClick = event => {
        alert("handleCloseClick");
    }

    handleSaveClick = event => {
        alert("handleSaveClick");
    }

    handleSubmit = event => {
        alert("handleSubmit");
        event.preventDefault();


    }

    render() {
        const columns = [
            {
                dataField: 'code',
                text: 'Code'
            },
            {
                dataField: 'element',
                text: 'Element'
            },
            {
                dataField: '%',
                text: '%'
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };


        /* const province = [
            {"provincename" : "NCR", "regioname" : "NCR"},
            {"provincename" : "Ilocos Norte", "regioname" : "Region 1"},
            {"provincename" : "Negros Occ", "regioname" : "Region 7"}
        ] */

        return(
                <div>
                <Banner />
                 <Container className="mt-5">
                 <Card>
                    <Card.Header>Rate Card Configuration</Card.Header>
                    <Card.Body>
                        <Form onSubmit={ this.handleSubmit }>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Control type="text" placeholder="Select Client" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Control type="text" placeholder="Select Location" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <ButtonToolbar>
                                    <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>
                        </Form>
                        <div className="mt-5">
                        <h5>Elements:</h5>
                        <BootstrapTable
                        keyField = "code"
                        data = { this.state.rateList }
                        columns = { columns }
                        selectRow = { selectRow }
                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                        />
                        <ButtonToolbar sm={12}>
                            <Button variant="success" className="ml-auto">
                                Save
                            </Button>&nbsp;&nbsp;
                            <Button variant="danger" href="/banner">
                                Close
                            </Button>
                        </ButtonToolbar>
                        </div>
                    </Card.Body>
                </Card>
                 </Container>

                </div>
        )
    }

}

export  default RateCardConfig