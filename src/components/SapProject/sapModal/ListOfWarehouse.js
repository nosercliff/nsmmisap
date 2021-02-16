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



class ListOfWarehouse extends Component {
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
                dataField   : '',
                text        : 'Warehouse Name',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'Warehouse Code',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'Location',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },/* 
            {
                dataField   : '',
                text        : '',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            */
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
                <Modal.Header closeButton style={{background : "#ababac"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        List Of Warehouses
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
                                <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                    Find
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control 
                                        type=""
                                        name=""
                                        //value={}
                                        //onChange={} 
                                        autoComplete="off"
                                    />
                                </Col>
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
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar className="mr-auto">
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>Choose</Button>&nbsp;&nbsp;
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>New</Button>&nbsp;&nbsp;
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>Cancel</Button>
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default ListOfWarehouse