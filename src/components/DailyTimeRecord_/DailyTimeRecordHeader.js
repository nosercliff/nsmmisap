import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row, Container } from "react-bootstrap";
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Banner from "../Nav/Banner"
import { AppConfiguration } from "read-appsettings-json";
import Accordion from 'react-bootstrap/Accordion'
import DailyTimeRecordDetail from "./DailyTimeRecordDetail"


class DailyTimeRecordHeader extends Component {

    passDTRDetailList() {
        const details = []
        const outTime = ''
        for (var obj in this.props.dtrDetails) {
            const timeSchedTitle = this.props.dtrDetails[obj]["breaktime"]
            const startTime = this.props.dtrDetails[obj]["startTime"]
            const endTime = this.props.dtrDetails[obj]["endTime"]
            const isPaid = this.props.dtrDetails[obj]["isPaid"]
            if (obj == 0) {                

                details.push(
                        <DailyTimeRecordDetail
                            timeName = {"IN"}
                            timeSched = {startTime}
                            isPaid = {isPaid}
                        />
                )
                
            } else {
                details.push(
                    <DailyTimeRecordDetail
                            timeName = {timeSchedTitle + " - START"}
                            timeSched = {startTime}
                            isPaid = {isPaid}
                        />
                )
                details.push(
                    <DailyTimeRecordDetail
                        timeName = {timeSchedTitle + " - END"}
                        timeSched = {endTime}
                        isPaid = {isPaid}
                    />
                )
            }            
            
        }
        details.push(
            <DailyTimeRecordDetail
                timeName = {"OUT"}
                timeSched = ""
                isPaid = ""
            />
        )
        return details
    }
    
    render() {

        return(            
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Card.Header>
                        DATE: {this.props.dtrDateParent} BRANCH: {this.props.dtrBranchParent} WORK SCHEDULE: {this.props.dtrWSParent}
                    </Card.Header>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        { 
                            this.passDTRDetailList() 
                        }                   
                    </Card.Body>
                    </Accordion.Collapse>
                </Card> 
            </Accordion>            
        )
    }
}

export default DailyTimeRecordHeader;