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
import DailyTimeRecordHeader from "./DailyTimeRecordHeader"

class DailyTimeRecord extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dailyTimeDataListData : [],
            dailyTimeDataList : [],
            userinfo:[],
            isLoading:true,
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            startDate: new Date(),
            empInfo: {},
            dtrDataList: []
        }
    }

     state = {
        selected: [],
        
        
    };

    getPayrollPeriod(){
        console.log("Autocomplete");
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1",
            "EmployeeId":"1",
            "StartDate":"12/01/2019",
            "EndDate":"12/15/2019"
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetEmployeeDTR", getParams)
            .then(res => {
                console.log("Autocomplete 2");
                console.log(res.data.dtRs);
                this.setState({
                    dailyTimeDataList : res.data.dtRs
                })     
            })

    }

    getUserDataInfo() {

        const empInfo = {
            "userId":"1",
            "userName":"Grey",
            "roleId":"1",
            "roleName":"System Administrator",
            "clientId":"2",
            "clientName":"VICTORIA COURT",
            "employeeId":"2",
            "firstName":"LUIS MARVIN",
            "middleName":"PANILONG",
            "lastName":"AMONTOS",
            "fullName":"LUIS MARVIN PANILONG AMONTOS",
            "retryCount":"1",
            "userStatus":"1",
            "lastLogInDate":"1/16/2020 7:08:12 PM",
            "passwordExpiryDate":"3/11/2020 6:41:43 PM",
            "currentPayPeriodId":"2",
            "payPeriodWorkSchedule":[
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/01/2020", "workScheduleName":"Morning Shift", "branchName":"Branch A - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                },
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/02/2020", "workScheduleName":"Morning Shift", "branchName":"Branch A - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                },
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/03/2020", "workScheduleName":"Night Shift", "branchName":"Branch B - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"21:00","endTime":"06:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                },
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/04/2020", "workScheduleName":"Morning Shift", "branchName":"Branch A - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                },
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/05/2020", "workScheduleName":"Morning Shift", "branchName":"Branch A - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                },
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/06/2020", "workScheduleName":"Night Shift", "branchName":"Branch C - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"21:00","endTime":"06:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                },
                {
                    "employeeId":"2","payPerioId":"2","workScheduleId":"1","date":"01/07/2020", "workScheduleName":"Morning Shift", "branchName":"Branch A - QC",
                        "periodWorkSchedule":
                        { "id":"1","clientId":"2","clientLocationId":"2","description":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","location":"1REI - SAN MARIANO ISABELA",
                        "workScheduleDetails":[
                            {"id":"0","scheduleId":"1","breaktimeId":"0","breaktime":"8AM-5PM Schedule","startTime":"08:00","endTime":"17:00","isDeleted":"0","isPaid":null,"duration":null},
                            {"id":"1","scheduleId":"1","breaktimeId":"1","breaktime":"Coffee - AM","startTime":"09:15","endTime":"09:30","isDeleted":"0","isPaid":null,"duration":null}
                        ]
                        }
                }
                ]
            }
            this.state.empInfo = empInfo
    }
    componentDidMount(){
        console.log("Get UserInfo")
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))

        //this.getPayrollPeriod()
        this.getUserDataInfo()        

        console.log("Employee Information")
        console.log(this.state.empInfo)
        
        console.log("Employee Pay Period Work Schedule")
        console.log(this.state.empInfo.payPeriodWorkSchedule)
        this.buildDTRHeader2()

        const dailyTimeDataList = [
            { "date" : "1/2/2020", "workschedule": "Moring Shift", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
            { "date" : "1/3/2020", "workschedule": "Moring Shift", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
            { "date" : "1/4/2020", "workschedule": "Evening Shift", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
            { "date" : "1/5/2020", "workschedule": "Rest Daay", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
            { "date" : "1/6/2020", "workschedule": "Mid Shift", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
            { "date" : "1/7/2020", "workschedule": "Moring Shift", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
            { "date" : "1/8/2020", "workschedule": "Paid Leave", "timein" : "07:40 am", "lunchout" : "12:00 nn", "lunchin": "01:00 pm", "coffeeout": "03:00 pm", "coffeein": "03:15", "timeout": "04:40 pm" },
        ]
        const dtrData = [
            { "date" : "1/1/2020", "ws" : "ws1", "branch" : "branch 1", "sched" : [{"item" : "IN"}, {"item" : "OUT"}]},
            { "date" : "1/2/2020", "ws" : "ws2", "branch" : "branch 2", "sched" : [{"item" : "IN"}, {"item" : "Break"}, {"item" : "Out"}]}
        ]

        this.state.dtrDataList = JSON.parse(JSON.stringify(dtrData))

        for (var obj in this.state.empInfo.payPeriodWorkSchedule) {
            console.log("periodWorkSchedule XXX")
            console.log(this.state.empInfo.payPeriodWorkSchedule[obj]["periodWorkSchedule"])
            const periodWorkSchedule = this.state.empInfo.payPeriodWorkSchedule[obj]["periodWorkSchedule"]
            for (var obj in periodWorkSchedule.periodWorkSchedule) {
                console.log("workScheduleDetails XXX")
                console.log(periodWorkSchedule.periodWorkSchedule[obj]["workScheduleDetails"])
                
            }   
        }

        this.setState({ dailyTimeDataListData: dailyTimeDataList });
    } 

    dtrUInterface = (props) => {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                Click me!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
            </Card>        
        )
    }

    buildDTRHeader() {
        const headers = []
        for (var obj in this.state.dtrDataList) {
            const details = this.state.dtrDataList[obj]["sched"]
            const dtrDate = this.state.dtrDataList[obj]["date"]
            const dtrWS = this.state.dtrDataList[obj]["ws"]
            const dtrBranch = this.state.dtrDataList[obj]["branch"]
           headers.push(
                         <DailyTimeRecordHeader 
                            dtrDateParent = {this.state.dtrDataList[obj]["date"]} 
                            dtrWSParent ={this.state.dtrDataList[obj]["ws"]} 
                            dtrBranchParent = {this.state.dtrDataList[obj]["branch"]} 
                            dataDTRParent="from DTR Main" 
                            dataDTRList={this.state.dtrDataList}
                            dtrDetails={details}
                        />
                        )
        }
        return headers
    }

    buildDTRHeader2() {
        const headers = []
        for (var obj in this.state.empInfo.payPeriodWorkSchedule) {
            //alert("buildDTRHeader2: " + this.state.empInfo.payPeriodWorkSchedule[obj]["periodWorkSchedule"])
            const dtrDate = this.state.empInfo.payPeriodWorkSchedule[obj]["date"]
            const dtrWS = this.state.empInfo.payPeriodWorkSchedule[obj]["workScheduleName"]
            const dtrBranch = this.state.empInfo.payPeriodWorkSchedule[obj]["branchName"]
            const details = this.state.empInfo.payPeriodWorkSchedule[obj]["periodWorkSchedule"]
            //alert("buildDTRHeader2 dtrDate: " + dtrDate)
            //alert("buildDTRHeader2 dtrWS: " + dtrWS)
            //alert("buildDTRHeader2 dtrBranch: " + dtrBranch)
            //alert("buildDTRHeader2 details: " + details.toString())
            console.log("buildDTRHeader2 details workScheduleDetails")
            console.log(details.workScheduleDetails)
            //alert("details : " + details[0]["workScheduleDetails"])
            
            headers.push(
                         <DailyTimeRecordHeader 
                            dtrDateParent = {dtrDate} 
                            dtrWSParent ={dtrWS} 
                            dtrBranchParent = {dtrBranch} 
                            dataDTRParent="from DTR Main" 
                            dataDTRList={details.workScheduleDetails}
                            dtrDetails={details.workScheduleDetails}
                        />
                        )
            
        }
        return headers
    }

    render() {

        
        /*
        const dtrData = [
            { "date" : "1/1/2020", "ws" : "ws1", "branch" : "branch 1", "sched" : [{"item" : "IN"}, {"item" : "OUT"}]},
            { "date" : "1/2/2020", "ws" : "ws2", "branch" : "branch 2", "sched" : [{"item" : "IN"}, {"item" : "Break"}, , {"item" : "Out"}]}
        ]
        */

        /*
        for (const [index, value] of elements.entries()) {
            items.push(
                <li key={index}>{ <input type="text" placeholder="Test" /> } </li>
                )
        }     
        */

        const columnDailyTimeData = [
            {
                dataField: 'date',
                text: 'Date'
            },
            {
                dataField: 'workschedule',
                text: 'WorkSchedule'
            },
            {
                dataField: 'timein',
                text: 'Tme-In'
            },
            {
                dataField: 'lunchout',
                text: 'Lunch (Out)'
            },
            {
                dataField: 'lunchin',
                text: 'Lunch (In)'
            },
            {
                dataField: 'coffeeout',
                text: 'Coffee (Out)'
            },
            {
                dataField: 'coffeein',
                text: 'Coffee (In)'
            },
            {
                dataField: 'timeout',
                text: 'Time-Out'
            },
        ]
        
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
                        <Card.Header>Daily Time Record</Card.Header>
                        <Card.Body>
                            <Form onSubmit={ this.handleSubmit }>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Typeahead
                                            labelKey='date'
                                            id="basic-example"
                                            onChange={selected => this.setState({ selected })}
                                            options={this.state.dailyTimeDataList}
                                            placeholder="Select Payroll Period"
                                        />
                                    </Col>
                                </Form.Group>
                                <p>Please encode your daily time record below.</p>
                                
                                {
                                    //this.buildDTRHeader()
                                    this.buildDTRHeader2()
                                }
                                {/*<DailyTimeRecordHeader dataDTRParent="from DTR Main" dataDTRList={this.state.dtrDataList}/>*/}
                                

                                {
                                /*
                                dataDTRParent="DailyTimeRecord Main!"
                                <Accordion defaultActiveKey="0">                                                                         
                                    <ul >
                                        {dtrData.map((date, ws, branch, sched) => {
                                            return <li> 
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">  
                                                    {date.toString() + " " + ws.toString() + " " + branch.toString()}
                                                    <input type="text" value={dtrData.date.toString()} placeholder="08:00" />                                       
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                <Card.Body>"test"</Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                            </li>
                                        })}
                                    </ul>
                                
                                    <Card>d
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                        Click me!
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>Hello! I'm the body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                        Click me!
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>                                 
                                </Accordion>

                                */}

                                    {/*Grid Style*/}
                                    { /*
                                    <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.dailyTimeDataListData }
                                        columns = { columnDailyTimeData}
                                        selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                    />
                                    */ }

                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="I hereby confirm etc.." />
                                </Form.Group>
                                <div className="mt-5">
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" >Save</Button>&nbsp;&nbsp;
                                        <Button variant="success" >Submit</Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/banner">Close</Button>
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

export  default DailyTimeRecord