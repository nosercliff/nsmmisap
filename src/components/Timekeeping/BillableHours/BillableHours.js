import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Row, Col, Container } from "react-bootstrap";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { AppConfiguration } from "read-appsettings-json"
import moment from 'moment';
import { Typeahead } from 'react-bootstrap-typeahead';
import Banner from "../../Nav/Banner"



const format = 'h:mm a';

const now = moment().hour(0).minute(0);

function onChange(value) {
  console.log(value && value.format(format));
}

function onChangeOut(value) {
    console.log(value && value.format(format));
  }

class BillableHours extends Component {

    constructor() {
        super()
        this.state = {
            billableData : [],
             billableHoursAuto : [
                { name: "Coffee" }
            ],
        }
    }

    state = {
        BillableListselected: [],
    };

    componentDidMount(){

         const rest = [
            {"client" : "Victoria Court", "location": "VICTORIA COURT - BALINTAWAK", "employee" : "James Hetfield"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - BALINTAWAK", "employee" : "Lars Ulrich"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - BALINTAWAK", "employee" : "Kirk Hammet"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - BALINTAWAK", "employee" : "Cliff Burton"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - BALINTAWAK", "employee" : "Kurt Cobain"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - BALINTAWAK", "employee" : "Dave Grohl"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - NORTH EDSA", "employee" : "Krist Novoselic"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - NORTH EDSA", "employee" : "John Frusciante"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - NORTH EDSA", "employee" : "Anthony Kiedis"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - NORTH EDSA", "employee" : "Fla"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - NORTH EDSA", "employee" : "Jack Sherman"},
            {"client" : "Victoria Court", "location": "VICTORIA COURT - NORTH EDSA", "employee" : "Axl Rose"}
        ]
        this.setState({ billableData: rest }); 
    } 


    render() {
        const billableHourColumn = [
            {
                dataField: 'client',
                text: 'Client'
            },
            {
                dataField: 'location',
                text: 'Location'
            },
            ,
            {
                dataField: 'employee',
                text: 'Employee'
            },
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
                <div>
                <Banner />
                    <Container className="mt-5">
                    <Card>
                    <Card.Header>Billable Hours</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupEmail">
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={BillableListselected => this.setState({ BillableListselected })}
                                    options={this.state.billableHoursAuto}
                                    placeholder="PlesSelect Client"
                                    />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                            <Typeahead
                                labelKey='name'
                                id="basic-example"
                                onChange={BillableListselected => this.setState({ BillableListselected })}
                                options={this.state.billableHoursAuto}
                                placeholder="Please Select Pay Period"
                                />
                            </Form.Group>
                            <div className="mt-5">
                                <BootstrapTable
                                keyField = "description"
                                data = { this.state.billableData }
                                columns = { billableHourColumn }
                                selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                />
                            </div>
                            <div className="mt-5">
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="danger" href="/banner">Close</Button>
                                    </ButtonToolbar>
                                </div>
                        </Form>
                    </Card.Body>
                </Card>
                    </Container>

                </div>
        )
    }

}

export  default BillableHours