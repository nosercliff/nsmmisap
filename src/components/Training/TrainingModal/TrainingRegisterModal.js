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



class TrainingRegisterModal extends Component {
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

    render() {
        const { ExportCSVButton } = CSVExport;
        
        const trainingRegisterColumn = [
            {
                dataField   : 'number',
                text        : 'No.',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'name',
                text: 'Name',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'client',
                text        : 'Client',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'dateRegister',
                text        : 'Date_Register',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'attendance',
                text        : 'Attendance',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'signature',
                text        : 'Signature',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : 'contactNo',
                text        : 'Contact_No.',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : 'email',
                text        : 'Email',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : 'fbAccount',
                text        : 'FB_Account',
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                className="modal-90w"
                 >
                <Modal.Header closeButton className="card-header">
                    <Modal.Title id="contained-modal-title-vcenter">
                        TRAINING >> TRAINING REGISTER DETAILS
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
                                    DATE
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="date"
                                        name="date"
                                        value={this.state.date}
                                        readOnly
                                    />
                                </Col>
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    BATCH NO.
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="batchNo"
                                        name="batchNo"
                                        value={this.state.batchNo}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    TRAINING
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control 
                                        type="text" 
                                        ref="training"
                                        name="training"
                                        value={this.state.training}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    POSITION
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="position"
                                        name="position"
                                        value={this.state.position}
                                        readOnly
                                    />
                                </Col>
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    CLIENT
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="client"
                                        name="client"
                                        value={this.state.client}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    FACILITATED
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="facilitated"
                                        name="facilitated"
                                        value={this.state.facilitated}
                                        readOnly
                                    />
                                </Col>
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    VENUE
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="venue"
                                        name="venue"
                                        value={this.state.venue}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                                                 
                            <ToolkitProvider
                                keyField="id"   
                                data={ this.state.trainingRegisterTableList }
                                columns={ trainingRegisterColumn }
                                exportCSV={ {
                                    fileName: "Attendance Sheets.csv",
                                } }
                                >
                                {
                                    props => (
                                    <div>
                                    <BootstrapTable
                                        /* caption={Noser.TableHeader({title:"RECORD"})} */
                                        keyField = "id"
                                        data = { this.state.trainingRegisterTableList }
                                        columns = { trainingRegisterColumn }
                                        pagination={ paginationFactory({sizePerPageRenderer}) }
                                        striped
                                        hover
                                        condensed
                                        noDataIndication={ () => <div>No record found.</div> }
    
                                    />
                                    <ButtonToolbar>
                                        <ExportCSVButton className="btn btn-info ml-auto" { ...props.csvProps }>Export Attendance Sheet</ExportCSVButton>
                                        &nbsp;&nbsp;
                                        <Button variant="success">
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={this.onModalClose} >
                                            Close
                                        </Button>
                                    </ButtonToolbar>
                                    </div>
                                    )
                                }
                            </ToolkitProvider>

                        </Form>
                    </Container>
                </Modal.Body>
                {/* <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" >
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose} >
                            Close
                        </Button>
                    </ButtonToolbar>
                </Modal.Footer> */}
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default TrainingRegisterModal