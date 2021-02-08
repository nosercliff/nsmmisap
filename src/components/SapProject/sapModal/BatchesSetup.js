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



class BatchesSetup extends Component {
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
            unKnownData : [],
        }
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    };

    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
    };

    CreateCaseButton(){
        alert("Test Button!!.")
    }

    render() {
        const { ExportCSVButton } = CSVExport;
        
        const rowDocumentsColumn = [
            {
                dataField: '',
                text        : 'Doc.No.',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            {
                dataField: '',
                text: 'Iten Number',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            {
                dataField   : '',
                text        : 'Item Description',
                headerStyle : () => {
                    return { width  : "40%" };
                }
            },
        ]


        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.unKnownData.map(function(item,i){
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

        const createdBatchesColumn = [
            {
                dataField   : '',
                text        : 'Batch',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField: '',
                text: 'Qty',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : '',
                text        : 'Brand',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },

            {
                dataField   : '',
                text        : 'Actual Weight',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : '',
                text        : 'Bin Location',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
        ]
        /* const selectRow = {
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
        }; */
        /* DropdownSelection = [

        ] */

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
                        Batches - Setup
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
                                data = { this.state.unKnownData }
                                columns = { rowDocumentsColumn }
                                //pagination={ paginationFactory({sizePerPageRenderer}) }
                                striped
                                hover
                                condensed
                                noDataIndication={ () => <div>No record found.</div> }

                            />
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    <u>Created Batches</u>
                                </Form.Label>
                            </Form.Group> 
                            <BootstrapTable
                                /* caption={Noser.TableHeader({title:"RECORD"})} */
                                keyField = "id"
                                data = { this.state.unKnownData }
                                columns = { createdBatchesColumn }
                                //pagination={ paginationFactory({sizePerPageRenderer}) }
                                striped
                                hover
                                condensed
                                noDataIndication={ () => <div>No record found.</div> }

                            />
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    Created Batches
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
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    Created QTY
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
                                    <Button variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>Ok</Button>&nbsp;&nbsp;
                                    <Button variant="danger"  style={{minWidth:'60px'}} onClick={this.onModalClose} >Cancel</Button>
                                </Col>{/* 
                                <Col sm="2">
                                </Col> */}
                                <Col sm="2" className="ml-auto" >
                                <Dropdown.Toggle variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>You Can Also</Dropdown.Toggle>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default BatchesSetup