import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class PostTrainingExaminationViewEdit extends Component {
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

            examName                :   "",
            trainingNameAutocomplete    :   [],
            clientPositionTableList     :   [],

            postExamTableList   :   [],
            instruction         :   "",
            noOfItems           :   "",
            timeLimit           :   "",
            passingScore        :   "",

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    onChangeTrainingName = (e) => {
        this.setState({
            trainingName	:  e.target.value ,
            isshow:false,
        })
    }

    render() {

        const clientPositionColumn = [
            {
                dataField: 'client',
                text: 'Client',
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },
            {
                dataField: 'position',
                text: 'Position',
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },
        ]

        const clientPositionSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.clientPositionTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const clientPositionRowEvents = {
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
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE  >> POST TRAINING EXAMINATION (VIEW EDIT)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EXAM NAME
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control 
                                                ref="examName"
                                                name="examName"
                                                value={this.state.examName}
                                                onChange={this.onChangeExamName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING NAME
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTrainingName}
                                                options={this.state.trainingNameAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.clientPositionTableList }
                                            columns = { clientPositionColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.ClientGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ clientPositionRowEvents }
                                            selectRow = { clientPositionSelectRow }

                                        />
                                    </div>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            INSTRUCTION
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control
                                                as="textarea"
                                                rows={3} 
                                                ref="instruction"
                                                name="instruction"
                                                value={this.state.instruction}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            NO. OF ITEMS
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                type="text" 
                                                ref="noOfItems"
                                                name="noOfItems"
                                                value={this.state.noOfItems}
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TIME LIMIT
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                type="text" 
                                                ref="timeLimit"
                                                name="timeLimit"
                                                value={this.state.timeLimit}
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            PASSING SCORE
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                type="text" 
                                                ref="passingScore"
                                                name="passingScore"
                                                value={this.state.passingScore}	
                                            />
                                        </Col>
                                    </Form.Group>

                                    <div className="mt-3">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.postExamTableList }
                                            columns = { postExamColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.PositionGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ postExamRowEvents }
                                            selectRow = { postExamSelectRow }

                                        />
                                    </div>
                                        
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button  href="/posttrainingexamination" variant="danger">Back</Button>
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

export  default PostTrainingExaminationViewEdit 
