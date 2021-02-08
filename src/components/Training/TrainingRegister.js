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
 
class TrainingRegister extends Component {
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
            trainingRegisterTableList          :   [ { "date" : "11/21/2020", "training" : "training 101", "position" : "Accounting","client" : "Paramount", "register" : "Register 101", "attended" : "Attended 101" } ],
            batchNoAutocomplete                 :   [],
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
        
        const trainingRegisterColumn = [
            {
                dataField   : 'date',
                text        : 'Date',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'training',
                text: 'Training',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "15%" };
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
                dataField   : 'register',
                text        : 'Register',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'attended',
                text        : 'Attended',
                headerStyle : () => {
                    return { width  : "15%" };
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
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link" onClick={this.showTrainingRegisterModal}
                        >View Details</Button>
                    );
                },
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
                            <Card.Header>TRAINING >> TRAINING REGISTER</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
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
                                            BATCH NO.
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeBatchNo}
                                                options={this.state.batchNoAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING DATE
                                        </Form.Label>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            DATE FROM
                                        </Form.Label>
                                        <Col sm="1">
                                            <DatePicker
                                                ref='dateFrom'
                                                selected={this.state.dateFrom}
                                                onChange={this.handleChangeDateFrom}
                                                minDate={this.minDate}
                                                value={this.props.dateFrom}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            DATE TO
                                        </Form.Label>
                                        <Col sm="1">
                                            <DatePicker
                                                ref='dateTo'
                                                selected={this.state.dateTo}
                                                onChange={this.handleChangeDateTo}
                                                minDate={this.minDate}
                                                value={this.props.dateTo}
                                                dateFormat={"MM/dd/yyyy"}
                                                className="form-control"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <Button  variant="success" href="trainingregistercreate">
                                            Create
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
                                            Generate Report
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

                    <TrainingRegisterModal 
                        show={this.state.modalTrainingRegisterShow}
                        onHide={this.handleModalClose}
                    />
            </div> 
        )
    }

}

export  default TrainingRegister
