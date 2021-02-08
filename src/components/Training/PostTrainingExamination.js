import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class PostTrainingExamination extends Component {
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

            postTrainingTableList       :   [ {"examName" : "Exam Name 101", "noOfItems" : "No Of Items 101", "timeLimit" : "Time Limit 101"} ],
            clientAutocomplete          :   [],
            trainingNameAutocomplete    :   [],
            ExamNameAutocomplete        :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.postTrainingTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        
        const postTrainingColumn = [
            {
                dataField: 'examName',
                text: 'Exam Name',
                headerStyle : () => {
                    return { width  : "40%" };
                }
            },
            {
                dataField   : 'noOfItems',
                text        : 'No. Of Items',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField   : 'timeLimit',
                text        : 'Time Limit',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField   : 'examDetails',
                text        : 'Exam Details',
                headerStyle : () => {
                    return { width  : "10%" };
                },
                formatter   :   (cell, row, isSelect) => {
                    if (row)
                    return (
                        <NavLink to={{pathname:"/posttrainingexaminationviewedit",params:{data:row} }}>
                            <Button variant="link" style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            href="/posttrainingexaminationviewedit"
                            >View / Edit</Button>
                        </NavLink>
                    );
                },
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.postTrainingTableList.map(function(item,i){
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
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE  >> POST TRAINING EXAMINATION</Card.Header>
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
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeExamName}
                                                options={this.state.ExamNameAutocomplete}
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
                                                onChange={this.onChangeTraining}
                                                options={this.state.trainingNameAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/posttrainingexaminationcreate" >
                                            <Button  variant="success">
                                                Create
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">Exam List</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.postTrainingTableList }
                                            columns = { postTrainingColumn }
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
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleUpdateClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/home">
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
            </div> 
        )
    }

}

export  default PostTrainingExamination 
