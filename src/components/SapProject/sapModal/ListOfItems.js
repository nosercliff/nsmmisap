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



class ListOfItems extends Component {
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
            unKnownData     :   [],
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
                text        : 'Item Description',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: '',
                text: 'Item No.',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'Tax',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'Sales Definition',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'a',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'b',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'c',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : '',
                text        : 'd',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : '',
                text        : 'e',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : '',
                text        : 'f',
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
                       List Of Items
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
                                    Find
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type=""
                                        name=""
                                        value={this.state.unKnownData}
                                        onChange={this.onChangePosition} 
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col sm="4">
                                </Col>
                            </Form.Group>           
                            {/* <ToolkitProvider
                                keyField="id"   
                                data={ this.state.trainingRegisterTableList }
                                columns={ trainingRegisterColumn }
                                exportCSV={ {
                                    fileName: "Attendance Sheets.csv",
                                } }
                                >
                                {
                                    props => (
                                    <div> */}
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
                                    {/* <ButtonToolbar>
                                        <ExportCSVButton className="btn btn-info ml-auto" { ...props.csvProps }>Export Attendance Sheet</ExportCSVButton>
                                        &nbsp;&nbsp;
                                        <Button variant="success">
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" onClick={this.onModalClose} >
                                            Close
                                        </Button>
                                    </ButtonToolbar> */}
                                    {/* </div>
                                    )
                                }
                            </ToolkitProvider> */}

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" >
                            Choose
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose} >
                            Cancel
                        </Button>&nbsp;&nbsp;
                        <Button variant="success" onClick={this.onModalClose} >
                            New
                        </Button>
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default ListOfItems