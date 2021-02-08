import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

class TrainingEvaluationAndRecommendation extends Component {
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
            remarks         :   "",

            clientAutocomplete      :   [],
            employeeAutocomplete    :   [],
            positionAutocomplete    :   [],

            listOfTrainingTableList     :   [],
            recommendationAutocomplete  :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    render() {
        
        const listOfTrainingColumn = [
            {
                dataField   : 'training',
                text        : 'Training',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'type',
                text        : 'Type',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'batchNo',
                text        : 'Batch No.',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'date',
                text        : 'Date',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'examScore',
                text: 'Exam Score',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'evaluation',
                text        : 'Evaluation',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'status',
                text        : 'Status',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
        ]

        const listOfTrainingSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.listOfTrainingTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const listOfTrainingRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };

    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>TRAINING >> TRAINING EVALUATION AND RECOMMENDATION</Card.Header>
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

                                    <Card.Header className="mt-3">List of Training Required / Attended</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.listOfTrainingTableList }
                                            columns = { listOfTrainingColumn }
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
                                            rowEvents={ listOfTrainingRowEvents }
                                            selectRow = { listOfTrainingSelectRow }

                                        />
                                    </div>

                                    <Card.Header className="mt-5">Training Recommendation</Card.Header>
                                    <Form.Group className="mt-3" as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            RECOMMENDATION
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeRecommendation}
                                                options={this.state.recommendationAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            REMARKS
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control 
                                                ref="remarks"
                                                name="remarks"
                                                value={this.state.remarks}
                                                onChange={this.onChangeRemarks}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                        
                                    <ButtonToolbar className="mt-3">
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

export  default TrainingEvaluationAndRecommendation 
