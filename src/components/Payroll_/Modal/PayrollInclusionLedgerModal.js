import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollInclusionLedgerModal extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            selectedInclusionLedger : [],
            LedgerTypeId: '',
            ReferenceId: '',
            selectedLedgerTypeId: '',
            selectedReferenceId: '',
        }
    }

    componentDidMount(){
        this.setState({isLoading:true,loadingText:"Processing your request...!"})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))

        /* console.log("Ledger Type Id", this.props.ledgerTypeId)
        console.log("Reference Id", this.props.selectedInclusionLedger) */
        this.GetLedger();


        
    }

    handleRefreshClick = (e) => {
        this.setState({
            LedgerTypeId : this.props.selectedLedgerTypeId,
            ReferenceId : this.props.selectedReferenceId
        })
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.props.displayEmployeeId,
            "LedgerTypeId":this.props.displayLedgerTypeId,
            "ReferenceId":this.props.displayReferenceId,
        };

            console.log("Get Payroll Ledgers Modal Param")
            console.log(typeParams);
            axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Payroll/GetPayrollLedgers", typeParams
                )
                .then(res => {
                    console.log("Get Payroll Ledgers Modal")
                    console.log(res.data)
                    this.setState({ledgerTypeListGrid: res.data.ledgers});
                    var alertType = (res.data.status=="1") ? "success" : "danger"
                    this.setState(
                    {
                        isLoading:false,
                        AlertType:"Success!",
                        show:true,
                        Color:alertType,
                        Message:res.data.message ,
                        Fade:true
                    });
                })
                .catch(error=>{
                this.setState(
            {
            isLoading:false,
            AlertType:"Error! ",
            Show:true,
            Color:"danger",
            Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
            Fade:true
            })
        })
    }

    GetLedger() {
        this.setState({
            LedgerTypeId : this.props.selectedLedgerTypeId,
            ReferenceId : this.props.selectedReferenceId
        })
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.state.selectedEmployeeId,
            "LedgerTypeId":this.props.selectedLedgerTypeId,
            "ReferenceId":this.props.selectedReferenceId,
        };

            console.log("Get Payroll Ledgers Modal Param")
            console.log(typeParams);
            axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Payroll/GetPayrollLedgers", typeParams
                )
                .then(res => {
                    console.log("Get Payroll Ledgers Modal")
                    console.log(res.data)
                    this.setState({ledgerTypeListGrid: res.data.ledgers});
                    var alertType = (res.data.status=="1") ? "success" : "danger"
                    this.setState(
                    {
                        isLoading:false,
                        AlertType:"Success!",
                        show:true,
                        Color:alertType,
                        Message:res.data.message ,
                        Fade:true
                    });
                })
                .catch(error=>{
                this.setState(
            {
            isLoading:false,
            AlertType:"Error! ",
            Show:true,
            Color:"danger",
            Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
            Fade:true
            })
        })
    }

    render() {

        const columnledger = [
            {dataField: 'date',text: 'Date'},
            {dataField: 'period',text: 'Period'},
            {dataField: 'particular',text: 'Particular'},
            {dataField: 'debit',text: 'Debit'},
            { dataField: 'credit',text: 'Credit'},
            {dataField:'balance',text:'Balance'},
        ]

    return(
        
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Inclusion Ledger
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    <div>Name : {this.props.selectedParticularName}</div>
                       <div>Ledger Type Id : {this.props.selectedLedgerTypeId}</div>
                        <div>Reference Id : {this.props.selectedReferenceId}</div>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>

                            <BootstrapTable
                                keyField = "name"
                                data = { this.state.ledgerTypeListGrid}
                                columns = { columnledger }
                                //selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                            /> 

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.handleRefreshClick }>
                            Refresh
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
            <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
        </Modal>
        );
    }

}
export  default PayrollInclusionLedgerModal