import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeExitClearance extends Component {
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

                selectedClientId        :   "",
                selectedBranchId        :   "",
                selectedEmployeeNameId  :   "",
                selectedEmployeeNoId    :   "",

                employeeExitListGrid    :   [],
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
        
        const employeeExitColumn = [
            {
                dataField: 'memberName',
                text: 'Member Name ',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'position',
                text: 'Position',
                editable: false,
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'client',
                text: 'Client',
                editable: false,
                headerStyle: () => {
                    return { width: "20%" };
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
        ] 
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.employeeExitListGrid.map(function(item,i){
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
                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="success" href="/employeeexitclearancecreate">
                                                    Create
                                                </Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Card.Header>List of Member</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.employeeExitListGrid }
                                            columns = { employeeExitColumn }
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

export  default EmployeeExitClearance
