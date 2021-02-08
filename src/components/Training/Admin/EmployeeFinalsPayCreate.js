import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeFinalsPayCreate extends Component {
    constructor(props) {
        super(props);
            this.state = {
                userinfo        :   [],
                isloading       :   false,
                isshow          :   false,
                alerttype       :   "",
                message         :   "",
                color           :   "",
                fade            :   true,


                selectedClient        :   "",
                selectedBranch        :   "",
                selectedEmployeeName  :   "",
                selectedEmployeeNo    :   "",
            }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }


    render() {

        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>ADMINISTRATOR >> ADMIN >> MEMBER'S FINAL PAY</Card.Header>
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
                                        <Col sm="11">
                                            <Form.Control 
                                                type="text"
                                                name="selectedClient"
                                                value={this.state.selectedClient}
                                                onChange={this.onChangeClient} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EMPLOYEE
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text"
                                                name="selectedEmployeeName"
                                                value={this.state.selectedEmployeeName}
                                                onChange={this.onChangePosition} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        EMPLOYEE NO.
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                type="text"
                                                name="selectedEmployeeNo"
                                                value={this.state.selectedEmployeeNo}
                                                onChange={this.onChangePosition} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            BRANCH
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control 
                                                type="text"
                                                name="selectedBranch"
                                                value={this.state.selectedBranch}
                                                onChange={this.onChangeBranch} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Card.Header>Final Pay Breakdown</Card.Header>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold", textDecoration: "underline"}}>
                                            Particular
                                        </Form.Label>
                                        <Col sm="6">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold", textDecoration: "underline"}}>
                                            Amount
                                        </Form.Label>
                                        <Col sm="2">
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1">
                                            Net Pay - Last Payroll
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1">
                                            Add:
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1">
                                            -
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1">
                                            Deduct:
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1">
                                            Final Pay
                                        </Form.Label>
                                    </Form.Group>
                                    <ButtonToolbar>
                                        <Button variant="success" className="ml-auto">
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="warning">
                                            Submit
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="primary">
                                            Approved
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="employeefinalspay">
                                            Back
                                        </Button>
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

export  default EmployeeFinalsPayCreate
