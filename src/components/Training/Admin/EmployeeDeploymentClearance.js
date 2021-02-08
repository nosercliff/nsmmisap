import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeDeploymentClearance extends Component {
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

                clientList      :   [],
                employeeList    :   [],
                positionList    :   [],

                selectedClientId    :   "",
                selectedEmployeeId  :   "",
                selectedPositionId  :   "",

                deploymentClearanceListGrid       :   [ { "name" : "Test"}],
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

    handleChangePosition = (e) => {
        //console.log(e)
        if (e.length > 0) {
            this.state.selectedPosition = e[0].name
            this.state.selectedPositionId = e[0].id
        } else {
            this.state.selectedPosition = ""
            this.state.selectedPositionId = ""
        }
        console.log("Get Position Id");
        console.log(this.state.selectedPositionId);
    }


    render() {
        
        const deploymentClearanceColumn = [
            {
                dataField: 'jobOfferDate',
                text: 'Job Offer Date',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'name',
                text: 'Name',
                editable: false,
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'employeeNo',
                text: 'Employee No.',
                editable: false,
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'position',
                text: 'Position',
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'client',
                text: 'Client',
                editable: false,
                headerStyle: () => {
                    return { width: "25%" };
                },
            },
            {
                dataField: 'status',
                text: 'STATUS',
                editable: false,
                headerStyle: () => {
                    return { width: "20%" };
                },
                formatter   :   (cell, row, isSelect) => {
                    this.state.employeeName = row.employeeName
                    if (row)
                    return (
                        <Button href="/employeedeploymentclearancecreate" style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}} variant="link">Create Deployment Clearance</Button>
                    );
                },
            },
        ] 
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.deploymentClearanceListGrid.map(function(item,i){
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
                        <Card.Header>ADMINISTRATOR >> ADMIN >> EMPLOYEE DEPLOYMENT CLEARANCE</Card.Header>
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
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        EMPLOYEE
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeEmployee}
                                                options={this.state.employeeList}
                                            />  
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            POSITION
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.positionList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="info">
                                                    Clear
                                                </Button>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Card.Header>List of Employee</Card.Header>
                                    <div className="mt-1">
                                            <BootstrapTable
                                                keyField = "id"
                                                data = { this.state.deploymentClearanceListGrid }
                                                columns = { deploymentClearanceColumn }
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
                                    <ButtonToolbar >
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

export  default EmployeeDeploymentClearance
