import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props, sizePerPageRenderer
} 
from '../../../noser-hris-component';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';



class BatchNoSelection extends Component {
    constructor(props) {
        super(props)
        this.state ={
            userinfo        :   [],
            
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            trainingRegisterTableList : [],
        }
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
    }
    testButton(){
        alert("test button")
    }

    render() {
        const { ExportCSVButton } = CSVExport;

        const availableBatchColumn = [
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: '',
                text: 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
        ]
        
        const trainingRegisterColumn = [
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: '',
                text: 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : '',
                text        : 'test.',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : '',
                text        : 'test',
                headerStyle : () => {
                    return { width  : "10%" };
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
        
            <Modal
                {...this.props}
                return
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                className="modal-90w"
                 >
                <Modal.Header closeButton className="card-header">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Batch Number Selection
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    <u>Rows From Documents</u>
                                </Form.Label>
                            </Form.Group> 
                            <BootstrapTable
                                /* caption={Noser.TableHeader({title:"RECORD"})} */
                                keyField = "id"
                                data = { this.state.trainingRegisterTableList }
                                columns = { trainingRegisterColumn }
                                //pagination={ paginationFactory({sizePerPageRenderer}) }
                                striped
                                hover
                                condensed
                                noDataIndication={ () => <div>No record found.</div> }

                            />
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="4" style={{fontWeight : "bold"}}>
                                    <u>Available Batches</u>
                                </Form.Label>
                                <Col sm="4">
	                            </Col>
                                <Form.Label column sm="4" style={{fontWeight : "bold"}}>
                                    <u>Selected Batches</u>
                                </Form.Label>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    Find
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control 
                                        type=""
                                        name=""
                                        value={this.state.unKnownData}
                                        onChange={this.onChangePosition} 
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col sm="2">
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="4">
                                <BootstrapTable
                                    /* caption={Noser.TableHeader({title:"RECORD"})} */
                                    keyField = "id"
                                    data = { this.state.trainingRegisterTableList }
                                    columns = { availableBatchColumn }
                                    //pagination={ paginationFactory({sizePerPageRenderer}) }
                                    striped
                                    hover
                                    condensed
                                    noDataIndication={ () => <div>No record found.</div> }

                                    />
                                </Col>
                                <Col sm="4">
                                    {/* <Form.Group as={Col} controlId="formPlaintextEmail">
                                        <ButtonToolbar >
                                            <Button variant="success"onClick={this.testButton}>
                                                "<"
                                            </Button>
                                        </ButtonToolbar>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formPlaintextEmail">
                                        <ButtonToolbar >
                                            <Button variant="success" onClick={this.testButton}>
                                                ">"
                                            </Button>
                                        </ButtonToolbar>
                                    </Form.Group> */}
                                </Col>
                                <Col sm="4">
                                <BootstrapTable
                                    /* caption={Noser.TableHeader({title:"RECORD"})} */
                                    keyField = "id"
                                    data = { this.state.trainingRegisterTableList }
                                    columns = { availableBatchColumn }
                                    //pagination={ paginationFactory({sizePerPageRenderer}) }
                                    striped
                                    hover
                                    condensed
                                    noDataIndication={ () => <div>No record found.</div> }

                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    Display Available Batches
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control 
                                        type=""
                                        name=""
                                        value={this.state.unKnownData}
                                        onChange={this.onChangePosition} 
                                        autoComplete="off"
                                        placeholder="All"
                                    />
                                </Col>
                                <Col sm="2">
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="2" className="mt-2 mr-auto" >
                                    <Button variant="success" style={{minWidth:'60px'}} onClick={this.testButton}>Button</Button>&nbsp;&nbsp;
                                    <Button variant="success"  style={{minWidth:'60px'}} onClick={this.testButton} >Button</Button>
                                </Col>
                                <Col sm="4">
                                </Col>
                                <Col sm="1" className="ml-auto" >
                                    <Button variant="success" style={{minWidth:'60px'}} onClick={this.testButton} >Button</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default BatchNoSelection