import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

class EmployeePostTrainingExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fade            :   true, 
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",

            employeeNo      :   "",
            examInstruction :   "",
            timeRemaining   :   "",
            examDate        :   "",
            checkboxA       :   false,
            checkboxB       :   false,
            checkboxC       :   false,
            checkboxD       :   false,
            timeRemaining   :   "",
            examDate        :   new Date(),

            clientAutocomplete      :   [],
            positionAutocomplete    :   [],
            employeeAutocomplete    :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    /* onChangeTrainingName = (e) => {
        this.setState({
            trainingName	:  e.target.value ,
            isshow:false,
        })
    } */

    OnChangeIsCheckboxA = () =>{
        this.setState({
            checkboxA       :   true,
            checkboxB       :   false,
            checkboxC       :   false,
            checkboxD       :   false,
        })
    }

    OnChangeIsCheckboxB = () =>{
        this.setState({
            checkboxA       :   false,
            checkboxB       :   true,
            checkboxC       :   false,
            checkboxD       :   false,
        })
    }

    OnChangeIsCheckboxC = () =>{
        this.setState({
            checkboxA       :   false,
            checkboxB       :   false,
            checkboxC       :   true,
            checkboxD       :   false,
        })
    }

    OnChangeIsCheckboxD = () =>{
        this.setState({
            checkboxA       :   false,
            checkboxB       :   false,
            checkboxC       :   false,
            checkboxD       :   true,
        })
    }

    handleTakeTimeExamClick = () => {
        this.setState({
            timeRemaining   :   moment().format('h:mm:ss a')
        })
    }

    render() {

        const clientColumn = [
            {
                dataField: 'client',
                text: 'Client',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const clientSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.clientTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const clientRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };


        const positionColumn = [
            {
                dataField: 'client',
                text: 'Client',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const positionSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.positionTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const positionRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };


        const postExamColumn = [
            {
                dataField: 'questions',
                text: 'Questions',
                headerStyle : () => {
                    return { width  : "60%" };
                }
            },
            {
                dataField: 'answers',
                text: 'Answers',
                headerStyle : () => {
                    return { width  : "40%" };
                }
            },
        ]

        const postExamSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.postExamTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const postExamRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };

    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>TRAINING >> EMPLOYEE POST TRAINING EXAM</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeClient}
                                                options={this.state.clientAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            POSITION
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangePosition}
                                                options={this.state.positionAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EMPLOYEE NAME
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeEmployee}
                                                options={this.state.employeeAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EMPLOYEE NO.
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                ref="employeeNo"
                                                name="employeeNo"
                                                value={this.state.employeeNo}
                                                onChange={this.onChangeEmployeeNo}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EXAM INSTRUCTION
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control 
                                                as="textarea"
                                                rows={3} 
                                                ref="examInstruction"
                                                name="examInstruction"
                                                value={this.state.examInstruction}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="1">
						                    <Button className="ml-auto" variant="success" onClick = { this.handleTakeTimeExamClick }>Take Exam</Button>
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            TIME REMAINING (Start once TAKE EXAM is click)
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                ref="timeRemaining"
                                                name="timeRemaining"
                                                value={this.state.timeRemaining}
                                                onChange={this.onChangeTimeRemaining}
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EXAM DATE
                                        </Form.Label>
                                        <Col sm="2">
                                            <DatePicker
                                                ref='examDate'
                                                selected={this.state.examDate}
                                                onChange={this.handleChangeExamDAte}
                                                minDate={this.minDate}
                                                value={this.props.examDate}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Card.Header className="mt-3">Examination Questions:</Card.Header>

                                    <Form.Row className="mt-4">
                                        <Form.Group as={Col} sm={12}  controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold", fontSize : "15px"}}>
                                                1. What is training?
                                            </Form.Label>
                                        </Form.Group>
                                    </Form.Row>
                                        
                                    <Form.Row>
                                        <Form.Group as={Col} sm={1}>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2}>
                                            <Form.Check
                                                type="radio"
                                                label="A______________"
                                                name="checkboxA" 
                                                checked={this.state.checkboxA}
                                                onChange={this.OnChangeIsCheckboxA}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2}>
                                            <Form.Check
                                                type="radio"
                                                label="B______________"
                                                name="checkboxB" 
                                                checked={this.state.checkboxB}
                                                onChange={this.OnChangeIsCheckboxB}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2}>
                                            <Form.Check
                                                type="radio"
                                                label="C______________"
                                                name="checkboxC" 
                                                checked={this.state.checkboxC}
                                                onChange={this.OnChangeIsCheckboxC}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2}>
                                            <Form.Check
                                                type="radio"
                                                label="D______________"
                                                name="checkboxD" 
                                                checked={this.state.checkboxD}
                                                onChange={this.OnChangeIsCheckboxD}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                        
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button  href="/home" variant="danger">Close</Button>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                       
                    </Container>
                    <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default EmployeePostTrainingExam 
