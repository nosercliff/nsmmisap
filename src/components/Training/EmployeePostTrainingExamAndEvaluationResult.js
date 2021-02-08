import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

import  TrainingRegisterModal from './TrainingModal/TrainingRegisterModal'
 
class EmployeePostTrainingExamAndEvaluationResult extends Component {
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

            batchAutocomplete                   :   [],
            clientAutocomplete                  :   [],
            positionAutocomplete                :   [],
            trainingAutocomplete                :   [],
            postTrainingEvaluationTableList          :   [ { "date" : "11/21/2020", "training" : "training 101", "position" : "Accounting","client" : "Paramount", "register" : "Register 101", "attended" : "Attended 101" } ],
            employeeAutocomplete                 :   [],
            dateFrom                            :   "",
            dateTo                              :   "",
            modalTrainingRegisterShow           :   false,

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    showTrainingRegisterModal = (e) => {
        this.setState({modalTrainingRegisterShow: true})
    }
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({modalTrainingRegisterShow: false})
    }


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.trainingScheduleTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        
        const postTrainingEvaluationColumn = [
            {
                dataField   : 'employeeNo',
                text        : 'Employee No.',
                headerStyle : () => {
                    return { width  : "12%" };
                }
            },
            {
                dataField   : 'name',
                text        : 'Name',
                headerStyle : () => {
                    return { width  : "13%" };
                }
            },
            {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "12%" };
                }
            },
            {
                dataField   : 'client',
                text        : 'Client',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField: 'training',
                text: 'Training',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'examScore',
                text        : 'Exam Score',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'evaluation',
                text        : 'Evaluation',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'status',
                text        : 'Status',
                headerStyle : () => {
                    return { width  : "8%" };
                }
            },
            {
                dataField   : 'action',
                text        : 'Action',
                headerStyle : () => {
                    return { width  : "10%" };
                },
                formatter   :   (cell, row, isSelect) => {
                    if (row)
                    return (
                        <NavLink to={{pathname:"/trainingevaluationandrecommendation",params:{data:row} }}>
                            <Button variant="link" style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            href="/trainingevaluationandrecommendation"
                            >Evaluation and Clearance</Button>
                        </NavLink>
                    );
                },
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.postTrainingEvaluationTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
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
                            <Card.Header>TRAINING >> POST TRAINING EXAMINATION AND EVALUATION RESULT</Card.Header>
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
                                                onChange={this.onChangeClient}
                                                options={this.state.clientAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTraining}
                                                options={this.state.trainingAutocomplete}
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
                                                onChange={this.onChangeBatchNo}
                                                options={this.state.employeeAutocomplete}
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
                                                onChange={this.onChangePosition}
                                                options={this.state.positionAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Clear
                                        </Button>&nbsp;&nbsp;
                                        <Button  variant="success">
                                            Search
                                        </Button>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">List</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.postTrainingEvaluationTableList }
                                            columns = { postTrainingEvaluationColumn }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
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
                                        <NavLink to="/home" className="ml-auto">
                                            <Button variant="danger" href="/home" style={{minWidth:'60px'}}>
                                                Close
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                       
                    </Container>
                    <NoserLoading show={this.state.isloading} />

                    <TrainingRegisterModal 
                        show={this.state.modalTrainingRegisterShow}
                        onHide={this.handleModalClose}
                    />
            </div> 
        )
    }

}

export  default EmployeePostTrainingExamAndEvaluationResult
