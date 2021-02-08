import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class LedgerModal extends Component {
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

            clientId: "",
            clientName  :   '',
            selectedClient:"",
            clientList: [],
            employeeId: "",
            employeeName:"",
            employeeList:[],
            employeeNoList:[],
            filterCoverage:"",
            ledgerTypeList:[],
            cdiList:[{"name":""}],
            dicList:[{"name":""}],
            selectedLedgerTypeId: "",
            selectedReferenceId:"",
            selectedReferenceName:"",
            placeholder:"",
            ledgerTypeListGrid:"",
            dynamicledgerPlaceholder: "",
            ledgerTypeIdFromParent:'',
            referenceIdFromParent:'',
        }
    }
    componentDidMount() {
        this.setState({isloading:true})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.props.onRefLedger(this)
    }

    componentWillUnmount() {
        this.props.onRefLedger()
    }

    initialize = (e) => {
         this.setState({
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

         })
 
            this.state.clientName      =   e.clientNameFromParent
            this.state.clientId        =   e.clientIdFromParent
            this.state.employeeName    =   e.employeeNameFromParent
            this.state.employeeId      =   e.employeeIdFromParent
            this.state.ledgerTypeId    =   e.ledgerTypeIdFromParent
            this.state.referenceId     =   e.referenceIdFromParent

            this.onSubmitSearch();
    }
 

    /* **********end client******** */
    onSubmitSearch(){
        this.setState({isloading:true})
            const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.state.employeeId,
            "LedgerTypeId":this.state.ledgerTypeId,
            "ReferenceId":this.state.referenceId,
            };
            console.log("Submit Search Params")
            console.log(typeParams);
            axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Payroll/GetPayrollLedgers", typeParams
                )
                .then(res => {
                    const data = res.data;
                    this.setState({
                        ledgerTypeListGrid: data.ledgers,
                        isloading       :   false,
                    });
                    if(data.ledgers.length=="0"){
                        this.setState({
                            isloading   :   false,
                            alerttype   :   "Error!",
                            isshow      :   true,
                            color       :   "danger",
                            message     :   data.message,
                            fade        :   true
                        });
                    }
                })
                .catch(error=>{
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                        fade        :   true
                    })
                })
    }

    onModalClose = () => {
        this.props.onHide();
    }

    render() {
        const columnledger = [
            {
                dataField: 'date',
                text: 'Date',
                editable: false,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField: 'period',
                text: 'Period',
                editable: false,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField: 'particular',
                text: 'Particular',
                editable: false,
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'reference',
                text: 'Reference',
                editable: false,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField: 'debit',
                text: 'Debit',
                editable: false,
                headerStyle : () => {
                    return { width  : "15%" };
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'right';
                }
            },
            {
                dataField: 'credit',
                text: 'Credit',
                editable: false,
                headerStyle : () => {
                    return { width  : "15%" };
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'right';
                }
            },
            {
                dataField:'balance',
                text:'Balance',
                editable: false,
                headerStyle : () => {
                    return { width  : "15%" };
                },
                align: (cell, row, rowIndex, colIndex) => {
                    return 'right';
                }
            },
        ]

    return(
        
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ledger
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Card.Header className="mt-5">RECORDS</Card.Header>
                        <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                        <Col sm={12} >
                                <BootstrapTable
                                keyField = "name"
                                data = { this.state.ledgerTypeListGrid}
                                columns = { columnledger }
                                //selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                rowClasses="noser-table-row-class"
                                striped
                                hover
                                condensed
                                expandRow
                                /> 
                                </Col> 
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        {/* <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                            Save
                        </Button>&nbsp;&nbsp; */}
                        <Button className="ml-auto" variant="danger" onClick={this.onModalClose}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
                <NoserLoading isshow={this.state.isloading} />
        </Modal>
        );
    }

}
export  default LedgerModal