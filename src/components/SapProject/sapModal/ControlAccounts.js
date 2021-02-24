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



class ControlAccounts extends Component {
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
        
        const paymentsDataColumn = [
            {
                dataField   : '',
                text        : '#',
            },
            {
                dataField   : '',
                text        : 'Account Type Name',
            },
            {
                dataField   : '',
                text        : 'Account Code',
            },
            {
                dataField   : '',
                text        : 'Account Name',
            },
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.sapData.map(function(item,i){
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
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                className="modal-90w"
                 >
                <Modal.Header closeButton/*  className="card-header" */style={{background : "#ababac"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                       Control Accounts >> Accounts Receivable
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            
                            <BootstrapTable
                                /* caption={Noser.TableHeader({title:"RECORD"})} */
                                keyField = "id"
                                data = { this.state.unKnownData }
                                columns = { paymentsDataColumn }
                                //pagination={ paginationFactory({sizePerPageRenderer}) }
                                striped
                                hover
                                condensed
                                noDataIndication={ () => <div>No record found.</div> }
                                //defaultSorted={ defaultSorted }

                            />
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar className="mr-auto">
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>OK</Button>&nbsp;&nbsp;
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>Cancel</Button>&nbsp;&nbsp;
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default ControlAccounts