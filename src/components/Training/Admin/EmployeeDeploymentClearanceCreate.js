import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class EmployeeDeploymentClearanceCreate extends Component {
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

                date            :   new Date(),
                branch          :   "",
                position        :   "",
                employeeNo      :   "",
                employeeName    :   "",

                documentsListGrid               :   [],
                trainingListGrid                :   [],
                trainingRecommendationListGrid  :   [],

            }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    render() {

        // DOCUMENTS TABLE

        const documentsColumns = [
            {
                dataField: 'document',
                text: 'Documents',
                headerStyle: () => {
                    return { width: "50%" };
                },
            },
            {
                dataField: 'type',
                text: 'Type',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'received',
                text: 'Received',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'date',
                text: 'Date',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'suspended',
                text: 'Suspended',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
        ]
    
        const documentsSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.documentsListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
                })

            }
        };

        const documentsRowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };


        // TRAINING TABLE


        const trainingColumns = [
            {
                dataField: 'training',
                text: 'Training',
                headerStyle: () => {
                    return { width: "50%" };
                },
            },
            {
                dataField: 'type',
                text: 'Type',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'dateRegistered',
                text: 'Date Received',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'submit',
                text: 'Submit',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'suspended',
                text: 'Suspended',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
        ]
    
        const trainingSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.trainingListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
                })

            }
        };

        const trainingRowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };


        // TRAINING RECOMMENDATION TABLE


        const trainingRecommendationColumns = [
            {
                dataField: 'date',
                text: 'Date',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'trainingRecommendation',
                text: 'Training Recommendation',
                headerStyle: () => {
                    return { width: "45%" };
                },
            },
            {
                dataField: 'recommendedBy',
                text: 'Recommended By',
                headerStyle: () => {
                    return { width: "30%" };
                },
            },
            {
                dataField: 'submit',
                text: 'Submit',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'suspended',
                text: 'Suspended',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
        ]
    
        const trainingRecommendationSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.trainingListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
                })

            }
        };

        const trainingRecommendationRowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };

        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>ADMINISTRATOR >> ADMIN >> EMPLOYEE DEPLOYMENT CLEARANCE - (CREATE)</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        EMPLOYEE NAME
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type="text"
                                            name="employeeName"
                                            value={this.state.employeeName}
                                            onChange={this.onChangeEmployeeName} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        EMPLOYEE NO.
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type="text"
                                            name="employeeNo"
                                            value={this.state.employeeNo}
                                            onChange={this.onChangeEmployeeNumber} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col sm="1">
                                    </Col>
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        POSITION
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control 
                                            type="text"
                                            name="position"
                                            value={this.state.position}
                                            onChange={this.onChangePosition} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control 
                                            type="text"
                                            name="client"
                                            value={this.state.client}
                                            onChange={this.onChangeClient} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col sm="1">
                                    </Col>
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        BRANCH
                                    </Form.Label>
                                    <Col sm="4">
                                        <Form.Control 
                                            type="text"
                                            name="branch"
                                            value={this.state.branch}
                                            onChange={this.onChangeBranch} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        DATE
                                    </Form.Label>
                                    <Col sm="2">
                                        <DatePicker
                                            ref='date'
                                            selected={this.state.date}
                                            onChange={this.handleChangeDate}
                                            minDate={this.minDate}
                                            value={this.props.date}
                                            dateFormat={"MM/dd/yyyy"}
                                            className="form-control"
                                        />
                                    </Col>
                                </Form.Group>
                                <Card.Header className="mt-5">Pre-Deployment Requirement</Card.Header>
                                <BootstrapTable
                                    keyField = "id"
                                    data = { this.state.documentsListGrid }
                                    columns = { documentsColumns }
                                    /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                    noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                    rowClasses="noser-table-row-class"
                                    striped
                                    hover
                                    condensed
                                    cellEdit = { cellEditFactory({
                                        mode: 'dbclick',
                                        blurToSave: true,
                                        afterSaveCell: (oldValue, newValue, row, column) => {
                                            this.DocumentsGridDataModified(oldValue, newValue, row.id, column.dataField)
                                            }
                                        })
                                    }
                                    rowEvents={ documentsRowEvents }
                                    selectRow = { documentsSelectRow }
                                />

                                <div className="mt-5">
                                    <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.trainingListGrid }
                                        columns = { trainingColumns }
                                        /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                        noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        cellEdit = { cellEditFactory({
                                            mode: 'dbclick',
                                            blurToSave: true,
                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                this.TrainingGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                }
                                            })
                                        }
                                        selectRow = { trainingSelectRow }
                                        rowEvents={ trainingRowEvents }
                                    />
                                </div>

                                <div className="mt-5">
                                    <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.trainingRecommendationListGrid }
                                        columns = { trainingRecommendationColumns }
                                        /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                        noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        cellEdit = { cellEditFactory({
                                            mode: 'dbclick',
                                            blurToSave: true,
                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                this.TrainingRecommendationGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                }
                                            })
                                        }
                                        selectRow = { trainingRecommendationSelectRow }
                                        rowEvents={ trainingRecommendationRowEvents }
                                    />
                                </div>
                                <ButtonToolbar sm={12} className="mt-3">
                                    <Button variant="success" className="ml-auto">
                                        Submit
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="info">
                                        Deploy
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/employeedeploymentclearance">
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

export  default EmployeeDeploymentClearanceCreate
