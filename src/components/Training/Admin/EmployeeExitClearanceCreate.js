import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeExitClearanceCreate extends Component {
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

                clientList          :   [],
                branchList          :   [],
                employeeNameList    :   [],
                employeeNoList      :   [],
                natureOfExitList    :   [],

                selectedClientId        :   "",
                selectedBranchId        :   "",
                selectedEmployeeNameId  :   "",
                selectedEmployeeNoId    :   "",
                effectivityDate         :   "",
                currentDate             :   "",
                remarks                 :   "",


            }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
    }

    getClient(){
        const clientParams = {
            "IpAddress":"0.0.0.0",
           "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }

        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
            .then(res => {
                const data = res.data;
                console.log("GetClientList");
                console.log(data); 
                this.setState({clientList : data.clients})
                
            }
        )
    
    }
    
    handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient = e[0].name
            this.state.selectedClientId = e[0].id

        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = ""
        }
        this.setState({
            isshow  :   false,
        })
        this.GetPosition();
       
    }

    GetPosition() {
        const positionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId":"",
            "DepartmentId":"",
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionParams)
        .then(res => {
            const data = res.data;
            console.log("Get Position Name");
            console.log(data);
            this.setState({ positionList  : data.positions });
        })
        
    }

    handleChangeBranch = (e) => {
        //console.log(e)
        if (e.length > 0) {
            this.state.selectedBranchId = e[0].id
        } else {
            this.state.selectedBranchId = ""
        }
        console.log("Get Position Id");
        console.log(this.state.selectedBranchId);
    }


    render() {

        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>ADMINISTRATOR >> ADMIN >> EMPLOYEE EXIT CLEARANCE</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            CLIENT
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            BRANCH
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeBranch}
                                                options={this.state.branchList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            EMPLOYEE
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeEmploymentName}
                                                options={this.state.employeeNameList}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        EMPLOYEE NO.
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeEmployeeNo}
                                                options={this.state.employeeNoList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            POSITION :
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Label style={{fontWeight : "italic"}}>
                                            </Form.Label>
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        EMPLOYMENT STATUS :
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Label style={{fontWeight : "italic"}}>
                                            </Form.Label>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            START CONTRACT DATE :
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Label style={{fontWeight : "italic"}}>
                                            </Form.Label>
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        END CONTRACT DATE :
                                        </Form.Label>
                                        <Col sm="3">
                                            <Form.Label style={{fontWeight : "italic"}}>
                                            </Form.Label>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            NATURE OF EXIT
                                        </Form.Label>
                                        <Col sm="10">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeNatureOfExit}
                                                options={this.state.natureOfExitList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            EFFECTIVITY DATE
                                        </Form.Label>
                                        <Col sm="10">
                                            <DatePicker
                                                ref='effectivityDate'
                                                selected={this.state.effectivityDate}
                                                onChange={this.handleChangeEffectivityDate}
                                                minDate={this.minDate}
                                                value={this.props.effectivityDate}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="2">
                                        </Col>
                                        <Col sm="1">
                                            <Form.Check 
                                                inline
                                                type="checkbox" 
                                                label="APPROVED" 
                                                name="checkApproved"
                                                checked={this.state.checkApproved}
                                                onChange={this.onChangeApproved}
                                                style={{fontWeight : "bold", marginTop : "3px"}}
                                            />
                                        </Col>
                                        <Col sm="1">
                                            <Form.Check 
                                                inline
                                                type="checkbox" 
                                                label="HOLD" 
                                                name="checkHold"
                                                checked={this.state.checkHold}
                                                onChange={this.onChangeHold}
                                                style={{fontWeight : "bold", marginTop : "3px"}}
                                            />
                                        </Col>
                                        <Col sm="1">
                                            <Form.Check 
                                                inline
                                                type="checkbox" 
                                                label="DISAPPROVED" 
                                                name="checkDisapproved"
                                                checked={this.state.checkDisapproved}
                                                onChange={this.onChangeDisapproved}
                                                style={{fontWeight : "bold", marginTop : "3px"}}
                                            />
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            CURRENT DATE
                                        </Form.Label>
                                        <Col sm="1">
                                            <DatePicker
                                                ref='currentDate'
                                                selected={this.state.currentDate}
                                                onChange={this.handleChangeCurrentDate}
                                                minDate={this.minDate}
                                                value={this.props.currentDate}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        REMARKS
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control 
                                            type="text"
                                            name="remarks"
                                            value={this.state.remarks}
                                            onChange={this.onChangeRemarks} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Save
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="danger" href="/employeeexitclearance">
                                                    Back
                                                </Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                </Container>  
                <NoserLoading show={this.state.isloading} />       
            </div> 
        )
    }

}

export  default EmployeeExitClearanceCreate
