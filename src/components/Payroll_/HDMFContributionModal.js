import React, { Component } from "react"
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import cellEditFactory, { Type, TableHeaderColumn, } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Row, Col, Container,    } from "react-bootstrap";





class HDMFContributionModal extends Component {

    constructor() {
        super()
        this.state = {
            
        }
    }



    render() {
    const columns = [
            { dataField: 'month', text: 'MONTH'},
            { dataField: 'ee', text: 'EE'},
            { dataField: 'er', text: 'ER' },
            { dataField: 'ee', text: 'EE'},
            { dataField: 'er', text: 'ER' },
            { dataField: 'ee2', text: 'EE'},
            { dataField: 'er2', text: 'ER' },
            { dataField: 'ee3', text: 'EE'},
            { dataField: 'er3', text: 'ER' },
            { dataField: 'ee4', text: 'EE'},
            { dataField: 'er4', text: 'ER' },
            { dataField: 'ee5', text: 'EE'},
            { dataField: 'er5', text: 'ER' },
        ]
          /* const selectRow = {
            mode: 'checkbox',
            bgColor: 'rgb(238, 193, 213)'
        }; */

        const cellEdit = {
        mode: 'click',
        blurToSave: true
        };  
        var range = [
            {
            month: "02/10/20",ee : "120",er : "100",ee2: "120",er2 : "100",ee3 : "120",er3 : "100",ee4 : "120",er4 : "100",ee5: "120",er5 : "100",ee6 : "120",er6 : "100",
            },
           
        ]
        

        return (
            <div className="mt-5">
                <Container className="mt-5">
              
                    <Card>
                        <Card.Body>
                            <Form>
                                <Card.Header className="mt-3"> HDMF CONTRIBUTION</Card.Header>
                                <Form.Group as={Row} controlId="formHorizontalEmail" className="mt-2">
                                <BootstrapTable data={ range } striped={true} hover={true}
                             cellEdit={ cellEdit }>
                                <TableHeaderColumn row='0' rowSpan='2' dataField='month' dataAlign="center"  isKey={true} width='175'>Month</TableHeaderColumn>

                                <TableHeaderColumn row='0' colSpan='2'  headerAlign='center' >Amount</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='ee' width='70' dataAlign='center'>EE</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='er' width='70' dataAlign="center">ER</TableHeaderColumn>

                                <TableHeaderColumn row='0' colSpan='2'  headerAlign='center' >1st Cut-Off</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='ee2' width='70' dataAlign='center'>EE</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='er2' width='70' dataAlign="center">ER</TableHeaderColumn>

                                <TableHeaderColumn row='0' colSpan='2'  headerAlign='center' >2nd Cut-Off</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='ee3' width='70' dataAlign='center'>EE</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='er3' width='70' dataAlign="center">ER</TableHeaderColumn>

                                <TableHeaderColumn row='0' colSpan='2'  headerAlign='center' >3rd Cut-Off</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='ee4' width='70' dataAlign='center'>EE</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='er4' width='70' dataAlign="center">ER</TableHeaderColumn>
                                
                                <TableHeaderColumn row='0' colSpan='2'  headerAlign='center' >4th Cut-Off</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='ee5' width='70' dataAlign='center'>EE</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='er5' width='70' dataAlign="center">ER</TableHeaderColumn>

                                <TableHeaderColumn row='0' colSpan='3'   headerAlign='center' >5th Cut-Off</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='ee6' width='70' dataAlign='center'>EE</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='er6' width='70' dataAlign="center">ER</TableHeaderColumn>
                               
                            </BootstrapTable>&nbsp;&nbsp;
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col>
                                        <ButtonToolbar >
                                            <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            <Button variant="danger" href="/PayrollPeriod">
                                                Close
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }

}
 
export  default HDMFContributionModal