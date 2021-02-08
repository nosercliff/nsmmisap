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
 
class TrainingRegisterCreate extends Component {
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

            trainingAutocomplete        :   [],
            trainingRegisterTableList   :   [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.trainingRegisterTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        
        const trainingRegisterColumn = [
            {
                dataField: 'training',
                text: 'Training',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'client',
                text        : 'Client',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'employee',
                text        : 'Employee',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'register',
                text        : 'Register',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.trainingRegisterTableList.map(function(item,i){
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
                            <Card.Header>TRAINING >> TRAINING REGISTER - (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            TRAINING
                                        </Form.Label>
                                        <Col sm="10">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTraining}
                                                options={this.state.trainingAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            DESCRIPTION :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            BATCH No. :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            CLIENT :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            POSITION :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            FACILITATOR :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            VENUE :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            DATE :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            TIME :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            LIMIT NO. OF PARTICIPANTS :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            REGISTERED :
                                        </Form.Label>
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                        </Form.Label>
                                    </Form.Group>
                                    
                                    <ButtonToolbar className="mt-1">
                                        <Button className="ml-auto" variant="primary">
                                            Clear
                                        </Button>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">List Training Conducted</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.trainingRegisterTableList }
                                            columns = { trainingRegisterColumn }
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
                                        <NavLink to="/trainingregister">
                                            <Button variant="danger" href="/trainingregister" style={{minWidth:'60px'}}>
                                                Back
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

export  default TrainingRegisterCreate
