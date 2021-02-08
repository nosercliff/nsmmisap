import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row, Container } from "react-bootstrap";
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import Banner from "../Nav/Banner"
import { AppConfiguration } from "read-appsettings-json";
import Accordion from 'react-bootstrap/Accordion'

const DateToformat = 'h:mm';
const DateFromformat = 'h:mm';

const Tonow = moment().hour(0).minute(0);
const Fromnow = moment().hour(0).minute(0);


class DailyTimeRecordDetail extends Component {

    onChangeTo = (Tovalue) => {
        console.log("format");
        console.log(Tovalue);
        //this.state.Tovalue = Tovalue && Tovalue.format(DateToformat)
    }

    onChangeFrom = (Fromvalue) => {
        console.log("format");
        console.log(Fromvalue);
        //this.state.Fromvalue = Fromvalue && Fromvalue.format(DateFromformat)
    }

    buildDTRDetail() {
        return(
                <div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPlaintextEmail">
                            <Form.Label>
                                {this.props.timeName}
                            </Form.Label>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <TimePicker
                                showSecond={false}
                                defaultValue={moment()}
                                className="xxx"
                                onChange={this.onChangeTo}
                                format={DateToformat}
                                use24Hours
                            />
                        </Form.Group>
                    </Form.Row>

                </div>
        )
    }

    render() {
        return(
                this.buildDTRDetail()
        )
    }
}

export default DailyTimeRecordDetail;