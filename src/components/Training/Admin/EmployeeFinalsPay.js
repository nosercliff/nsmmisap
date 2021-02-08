import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeFinalsPay extends Component {
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

                clientAutocomplete          :   [],
                branchAutocomplete          :   [],
                employeeNameAutocomplete    :   [],

                selectedClientId        :   "",
                selectedBranchId        :   "",
                selectedEmployeeNameId  :   "",
                selectedEmployeeNoId    :   "",

                membersFinalPayListGrid :   [],
            }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
    }

    getClient(){
        this.setState({isloading:true})
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
                this.setState({clientAutocomplete : data.clients, isloading:false})
                
            }
        )
    
    }
    
    handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient   =   e[0].name
            this.state.selectedClientId =   e[0].id

        } else {
            this.state.selectedClient   =   ""
            this.state.selectedClientId =   ""
        }
        this.setState({
            isshow  :   false,
        })
        this.GetEmployees()
        this.GetPosition();
       
    }

    GetEmployees(){
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   "",
            "EmployeeNo"    :   "",
            "ClientName"    :   ""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            const data = res.data
            console.log("Employee List ");
            console.log(data);
            this.setState({ employeeNameAutocomplete  : data.employees, isloading:false });
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    handleCoverChangeEmploymentName = (e) => {
        if(e.length==0)
        {
            this.setState({employeeNo: ''})
            return
        }
        this.state.employeeNo = e[0].employeeNo
    }

    GetPosition() {
        this.setState({isloading:true})
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
            this.setState({ branchAutocomplete  : data.positions, isloading:false });
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

    onChangeEmployeeNo(e){
        this.setState({
            employeeNo : e.target.value
        })
    }

    render() {
        
        const membersFinalPayColumn = [
            {
                dataField: 'memberName',
                text: 'Member Name ',
                headerStyle: () => {
                    return { width: "13%" };
                },
            },
            {
                dataField: 'position',
                text: 'Position',
                editable: false,
                headerStyle: () => {
                    return { width: "13%" };
                },
            },
            {
                dataField: 'client',
                text: 'Client',
                editable: false,
                headerStyle: () => {
                    return { width: "13%" };
                },
            },
            {
                dataField: 'contractDateStart',
                text: 'Contract Date Start',
                editable: false,
                headerStyle: () => {
                    return { width: "8%" };
                },
            },
            {
                dataField: 'contractDateEnd',
                text: 'Contract Date End',
                editable: false,
                headerStyle: () => {
                    return { width: "8%" };
                },
            },
            {
                dataField: 'employmentStatus',
                text: 'Employment Status',
                editable: false,
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'natureOfExit',
                text: 'Nature Of Exit',
                editable: false,
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'effectivityDate',
                text: 'Effectivity Date',
                editable: false,
                headerStyle: () => {
                    return { width: "7%" };
                },
            },
            {
                dataField: 'approvedDate',
                text: 'Approved Date',
                editable: false,
                headerStyle: () => {
                    return { width: "7%" };
                },
            },
            {
                dataField: 'finalPayStatus',
                text: 'Final Pay Status',
                editable: false,
                headerStyle: () => {
                    return { width: "11%" };
                },
            },
        ] 
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.membersFinalPayListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
                })

            }
        };
            const rowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };

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
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            BRANCH
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeBranch}
                                                options={this.state.branchAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EMPLOYEE
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeEmploymentName}
                                                options={this.state.employeeNameAutocomplete}
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
                                                name="employeeNo"
                                                value={this.state.employeeNo}
                                                onChange={this.onChangeEmployeeNo.bind(this)} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="success" href="employeefinalspaycreate">
                                                    Create
                                                </Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Card.Header>List of Member</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.membersFinalPayListGrid }
                                            columns = { membersFinalPayColumn }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ rowEvents }
                                            selectRow = { selectRow }
                                        />
                                    </div>
                                    <ButtonToolbar sm={12}>
                                        <Button className="ml-auto" variant="danger" href="/home">
                                            Close
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

export  default EmployeeFinalsPay
