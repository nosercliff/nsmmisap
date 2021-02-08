import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';

import  PayrollLoanAdjustmentsModal  from './Modal/PayrollLoanAdjustmentsModal';

class PayrollLoanAdjustments extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:false,
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            clientList: [],
            employeeList : [],
            modalAdjustmentShow: false,
            getLoanTypesList:[],
            payPeriodList: [],
            getAdjustmentTypeList: [],
            clidList:[{"name":""}],
            placeholder: "",
            selectedAdjustmentId: "",
            dynamicAdjustmentsPlaceholder: "",
            adjustmentListTable: [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
        this.GetMandatoryContributionTypes();
        this.getAdjustmentType();
    }

    getClientList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            this.setState(
                {
                    isLoading:false,
                    clientList : res.data.clients ? res.data.clients : []
                });
        })
        .catch(error=>{
           this.setState(  {
               isloading       :   false,
               alerttype       :   "Error!",
               isshow          :   true,
               color           :   "danger",
               message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
               fade            :   true
           })
       })
    }

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        console.log("Client selectedClientName " + this.state.selectedClientName );
        this.setState({isloading:true,isshow:false,color:"",message:"",fade:true})
        
        this.getEmployees();
        
    }

    getEmployees(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            console.log("Employee List ");
            console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({employeeList : data.employees, getEmployeeNoList : data.employees,isloading:false, getCurrentMonthly: data.employeespayPeriod}) 
            else
                this.setState({employeeList : [], getEmployeeNoList : [],isloading:false}) 
        })
        .catch(error=>{
           this.setState(  {
               isloading       :   false,
               alerttype       :   "Error!",
               isshow          :   true,
               color           :   "danger",
               message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
               fade            :   true
           })
       })
        
    }

    onChangeEmployeesList = (e) => {
        if(e.length == 0) {
            this.state.selectedEmployeeId=""
            this.state.selectedEmployeeName=""
            return
        } 
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeId = e[0].id
        console.log("selectedEmployeeId " + this.state.selectedEmployeeId );
        this.setState({isshow:false,color:"",message:"",fade:true})

    }

    GetMandatoryContributionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", getParams)
        .then(res => {
            console.log("Get GetLoanTypes()")
            console.log(res.data)
        })
    }

    getAdjustmentType(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedEmployeeId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLedgerTypes", getParams)
        .then(res => {
            console.log("Get Adjustment Types")
            console.log(res.data)
            const resultData = res.data
            this.setState({
                getAdjustmentTypeList : resultData.ledgerTypes
            })
        })
    }

    onChangeAdjustmentType = (selectedOptions) => {
        if(selectedOptions.length == 0) {
            this.state.selectedAdjustmentTypeId=""
            return
        } 
        this.state.selectedAdjustmentTypeId = selectedOptions[0].id
        console.log("selectedAdjustmentTypeId " + this.state.selectedAdjustmentTypeId );
        
        var url = "";
        var coverage = "";
        if(selectedOptions.length==0) return;
        coverage = selectedOptions[0].name
        this.setState({ filterCoverage: coverage });
        if(selectedOptions[0].id==1)
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetMandatoryContributionTypes";

        if(selectedOptions[0].id==2)
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes";

        if(selectedOptions[0].id==3){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes";
            
        }

        if(selectedOptions[0].id==4){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes";
        }
        const GetInclusionTypes = selectedOptions[0].id
        this.setState({selectedAdjustmentId: GetInclusionTypes})
        console.log(GetInclusionTypes)

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        };

        axios
        .post(url,  getParams)
        .then(res => {
            const data = res.data;
           
            if(selectedOptions[0].id==1)
                this.setState({ clidList: data.contributionTypes, dynamicAdjustmentPlaceholder: "Select Mandatory Contributions" });
            if(selectedOptions[0].id==2)
                this.setState({ clidList: data.loanTypes, dynamicAdjustmentPlaceholder: "Select Employee Loans" }); 
            if(selectedOptions[0].id==3)
                this.setState({ clidList: data.inclusionTypes, dynamicAdjustmentPlaceholder: "Select Employee Inclusions"});
            if(selectedOptions[0].id==4)
                this.setState({ clidList: data.deductionTypes, dynamicAdjustmentPlaceholder: "Select Employee Deductions" });


           /*  console.log(this.state.clidList); */
        })
        .catch(error=>{
           this.setState(  {
               isloading       :   false,
               alerttype       :   "Error!",
               isshow          :   true,
               color           :   "danger",
               message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
               fade            :   true
           })
       })
        
    }

    onChangeClidList = (e) =>{  

        
        if(e.length == 0) {
            this.state.selectedReferenceId=""
            return
        } 
        this.state.selectedReferenceId = e[0].id
        console.log("selectedReferenceId " + this.state.selectedReferenceId );

    }


    handleSearchClick = () => {
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedEmployeeId,
            "AdjustmentTypeId":this.state.selectedAdjustmentTypeId,
            "ReferenceId":this.state.selectedReferenceId, 
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/GetAdjustments", getParams)
        .then(res => {
            const data = res.data;
            console.log("Get  Adjustment")
            console.log(res.data)
            this.setState({
                adjustmentListTable : res.data.adjustments
            })
            if(data.status=="1"){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Success!",
                    isshow          :   true,
                    color           :   "success",
                    message         :   data.message,
                    fade            :   true
                });
            }
            else{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   data.message,
                    fade            :   true
                })
            }
         })
         .catch(error=>{
            this.setState(  {
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade            :   true
            })
        })
    }

    handleChangeShowAdjustmentModal = () => {
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.selectedEmployeeName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        this.setState({modalAdjustmentShow: true})
        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
        }
        this.childAdjustment.initialize(obj)
    }

    render() {
        let modalAdjustmentClose =() => this.setState({modalAdjustmentShow:false});

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            bgColor: (row, rowIndex) => (rowIndex > 1 ? '#AEBABA' : '#B3B4B4'),
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log("Get Row Loans List From Table");
                console.log(row);
                /* alert(isSelect) */
                this.state.adjustmentListTable.map(function(item,i){
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
        }

        const adjustmentDataTable= [
            {
                dataField: 'deductionAmount',
                text: 'Deduction Amount'
            },
            {
                dataField: 'adjustmentAmount',
                text: 'Adjustment Amount',
                editable: false
            },
            {
                dataField: 'balanceAmount',
                text: 'Balance Amount',
                editable: false
            },
            {
                dataField: 'fromPayOutDate',
                text: 'From Pay Out Date',
                editable: false
            },
            {
                dataField: 'toPayOutDate',
                text: 'To Pay Out Date',
                editable: false
            }

        ]


        const sizePerPageRenderer = ({
            options,
            currSizePerPage,
            onSizePerPageChange
            }) => (
            <div className="btn-group" role="group">
                {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                    <button
                        key={ option.text }
                        type="button"
                        onClick={ () => onSizePerPageChange(option.page) }
                        className={ `btn ${isSelect ? 'btn-primary' : 'btn-success'}` }
                    >
                        { option.text }
                    </button>
                    );
                })
                }
            </div>
            );
        const options = {
            sizePerPageRenderer
        };

        return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Payroll Adjustment</Card.Header>
                        <Card.Body>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.clientList}
                                        placeholder="Select Client"

                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='employeeName'
                                        id="basic-example"
                                        onChange={this.onChangeEmployeesList}
                                        options={this.state.employeeList}
                                        placeholder="Select Employee"
                                        autocomplete="false"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeAdjustmentType}
                                        options={this.state.getAdjustmentTypeList}
                                        placeholder="Select Adjustment Type"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClidList}
                                        options={this.state.clidList}
                                        placeholder={this.state.dynamicAdjustmentPlaceholder}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick={this.handleChangeShowAdjustmentModal}>
                                            Create
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="primary" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>

                            <div className="mt-5">
                                <BootstrapTable
                                    caption={Noser.TableHeader({title:"Payroll Adjustment LIST"})}
                                    rowClasses="noser-table-row-class"
                                    striped
                                    hover
                                    condensed
                                    pagination={ paginationFactory(options) }
                                    keyField = "id"
                                    data = { this.state.adjustmentListTable }
                                    columns = { adjustmentDataTable}
                                    selectRow = { selectRow }
                                    cellEdit = { cellEditFactory({ 
                                            mode: 'dbclick', 
                                            blurToSave: true,
                                            afterSaveCell: (oldValue, newValue, row, column) => { 
                                                this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                            }                                     
                                        })
                                    }
                                    rowEvents={ rowEvents }

                                    
                                /> 
                            </div>

                            <ButtonToolbar>
                                {/* <Button variant="info">
                                    Edit
                                </Button>&nbsp;&nbsp; */}
                                <Button className="ml-auto" variant="danger" onClick={this.handleDeleteClick}>
                                    Delete
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger" href="/home">
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                <PayrollLoanAdjustmentsModal 
                    show={this.state.modalAdjustmentShow}
                    onHide={modalAdjustmentClose}
                    onRefAdjustment={ref => (this.childAdjustment = ref)}
                />
            </div>
        )
    }

}

export  default PayrollLoanAdjustments
