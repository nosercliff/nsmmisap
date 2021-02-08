import React, { Component } from "react";
import { Button, ButtonToolbar, Card, Col, Container, Form } from "react-bootstrap";
import { AppConfiguration } from "read-appsettings-json"

class ClientConfig extends Component {

    constructor() {
        super()
        this.state = {
        }
    }



    render() {
        const columns = [
            {
                dataField: 'holiday',
                text: 'Holiday'
            },
            {
                dataField: 'date',
                text: 'Date'
            },
            {
                dateField: 'Applicable',
                text: 'Applicable'
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

         const holidays = [
            {"holiday" : "Christmas", "date" : "2/7/2020"},
            {"holiday" : "New Year", "date" : "2/7/2020"},
        ]
          return(
                <div className="mt-5">
                    <Container>
                        <Card>
                            <Card.Header>Client Configuration</Card.Header>
                            <Card.Body>
                                <Form>
                                        
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form.Row>
                                
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto">
                                            Save
                                        </Button>
                                        <Button variant="danger" >
                                            Close
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

export  default ClientConfig