import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

import  PayrollDeductionsModal  from './Modal/PayrollDeductionsModal';

/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */

class PayrollDeductions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            getClientList: [],
            getEmployeeList : [],
            modalDeductionShow: false,
            getDeductionList: [],
            getDeductionListTable: [],
            isDisable: true,
            getDeductionTypesList: [],
        } 
        /* this.onChangeClientype=this.onChangeClientype.bind(this);  */

    
    }

    gtDeductionData(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":"",
            "DeductionId":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetDeductions", getParams)
        .then(res => {
            //console.log("Get Deductions List Data")
            //console.log(res.data)
        })
    }



    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
        this.getDeductionTypes();
    }

    getDeductionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/getDeductionTypes", getParams)
        .then(res => {
            //console.log("getDeductionTypes");
            //console.log(res.data);
            const data = res.data;
            this.setState({getDeductionTypesList : data.deductionTypes,isloading:false,}) 
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
        
    }

    onChangeDeductionTypesList = (e) => {
        if(e.length == 0) {
            this.state.selectedDeductionTypesId = ""
            return
        }  
        this.state.selectedDeductionTypesId = e[0].id

        this.getDeductions();

    }

    getDeductions(){
        const getParams = {
            "IpAddress":"0.0.0.0",  
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedDeductionTypesId,
            "Name":""

        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions", getParams)
        .then(res => {
            //console.log("Get Deductions");
            //console.log(res.data);
            this.setState({getDeductionList : res.data.deductions ? res.data.deductions : []})
        })
        .catch(error=>{
            this.setState(
            {
                isLoading:false,
                alertType:"Error! ",
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })
        })
    }

    onChangeDeductionList = (e) => {
        if(e.length == 0) {
            this.state.selectedDeductionId=""
            return
        } 
        this.state.selectedDeductionId = e[0].id
        //console.log("Client selectedDeductionId " + this.state.selectedDeductionId );
        
    }

    
    handleSearchClick = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":this.state.selectedEmployeeId,
            "DeductionId":this.state.selectedDeductionId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetDeductions", getParams)
        .then(res => {
            //console.log("GetDeductions")
            //console.log(res.data)
            this.setState({
                getDeductionListTable   :   res.data.deductions,
                isloading               :   false,
                isshow                  :   false,
            })
            const data = res.data;
            if(data.deductions.length=="0"){
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
                    isloading:false,
                    getClientList : res.data.clients ? res.data.clients : []
                });
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
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
        //console.log("Client selectedClientName " + this.state.selectedClientName );
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
            const data = res.data
            console.log("Employee List ");
            console.log(data);
            if(data.status=="1")
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isloading:false, getCurrentMonthly: data.employeespayPeriod}) 
            else
                this.setState({getEmployeeList : [], getEmployeeNoList : [],isloading:false}) 
        })
        .catch(error=>{
            this.setState(
            { 
                isLoading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
        
    }

    onChangeEmployeesList = (e) => {


        if(e.length==0)
        {
            this.setState({getEmployeeListData: null, selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
          
            return
        }
        this.setState({isshow:false,color:"",message:"",fade:true})
        this.state.selectedEmployeeId = e[0].id
        
        this.state.selectedPayPeriodId = e[0].payPeriodId
        this.state.selectedLeadTime = e[0].leadTime
        this.state.selectedPayModeId = e[0].payModeId
        this.state.selectedPayMode = e[0].payMode

        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
       
        //console.log("Work selectedEmployeeName   " + this.state.selectedEmployeeNo );
    
    }

    
   

    handleChangeEdit(row){
      
        this.setState({modalDeductionShow: true})
    }

    refreshList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":"",
            "DeductionId":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetDeductions", getParams)
        .then(res => {
            //console.log("GetDeductions")
            //console.log(res.data)
            this.setState({
                getDeductionListTable   :   res.data.deductions,
                isloading               :   false,
            })
            const data = res.data;
            if(data.deductions.length=="0"){
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
    }

    handleDeleteClick = event => {

        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true})
        for (let i = 0; i < this.state.getDeductionListTable.length; i++) {
            if (this.state.getDeductionListTable[i]["isModified"] == 1) {
                
                    this.state.id = this.state.getDeductionListTable[i]["id"]
                    this.state.employeeId =  this.state.getDeductionListTable[i]["employeeId"]
                    this.state.deductionId =  this.state.getDeductionListTable[i]["deductionId"]
                    this.state.amount =  this.state.getDeductionListTable[i]["amount"]
                    this.state.isRecurring =  this.state.getDeductionListTable[i]["isRecurring"]
                    this.state.effectivityDate =  this.state.getDeductionListTable[i]["effectivityDate"]
                    this.state.amortization =  this.state.getDeductionListTable[i]["amortization"]
                    this.state.noOfInstallment =  this.state.getDeductionListTable[i]["noOfInstallment"]
                    this.state.leadTime =  this.state.getDeductionListTable[i]["leadTime"]
                    this.state.IsDeleted = this.state.getDeductionListTable[i]["isDeleted"].toString()
            }

            //console.log(this.state.id)

        const deductionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":this.state.id,
            "EmployeeId":this.state.employeeId,
            "DeductionId":this.state.deductionId,
            "Amount":this.state.amount,
            "IsRecurring":this.state.isRecurring,
            "EffectivityDate":this.state.effectivityDate,
            "IsDeleted":this.state.IsDeleted ,
            "Amortization":this.state.amortization, 
            "NoOfInstallment":this.state.noOfInstallment,
            "LeadTime" : this.state.leadTime,
            "PayModeId" : this.state.selectedPayModeId,
            "PayPeriodId" : this.state.selectedPayPeriodId,

        };

        //console.log("submit delete params")
        //console.log(deductionParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/EditDeduction", deductionParams)
            .then(res => {
                const data = res.data;
                sleep(5000).then(() => {
                    this.setState({isloading:false})})
                this.refreshList();
                var alertType = (data.status=="1") ? "success" : "danger"
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
                 this.setState({
                     isloading       :   false,
                     alerttype       :   "Error!",
                     isshow          :   true,
                     color           :   "danger",
                     message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                     fade            :   true
                 })
             })
        }

        
    }

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.getDeductionListTable.length; i++) {
            if (this.state.getDeductionListTable[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        //console.log(id)
        this.state.getDeductionListTable.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    handleChangeShowDeductionModal = () => {
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
        this.setState({modalDeductionShow: true})

        let obj = {
            clientNameFromParent        :   this.state.selectedClientName,
            clientIdFromParent          :   this.state.selectedClientId,
            employeeNameFromParent      :   this.state.selectedEmployeeName,
            employeeIdFromParent        :   this.state.selectedEmployeeId,
            employeePayModeFromParent   :   this.state.selectedPayMode,
            employeePayModeIdFromParent :   this.state.selectedPayModeId,
            employeePayPeriodIdFromParent :   this.state.selectedPayPeriodId,
            employeeLeadTimeFromParent :   this.state.selectedLeadTime,
            
        }
        this.child.initialize(obj)

    }

    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({modalDeductionShow: false})
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            bgColor: (row, rowIndex) => (rowIndex > 1 ? '#AFB2B4' : '#B3B4B4'),
            onSelect: (row, isSelect, rowIndex, e) => {
                let isDisable=true
                this.state.getDeductionListTable.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    if (item.isDeleted=="1")
                    isDisable =  false
                    //console.log(item.isDeleted)
                })
                this.setState({isDisable:isDisable})
            }
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        }
        const columnDeductions= [
            {
                dataField: 'reference',
                text: 'Reference',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                dataField: 'deductionName',
                text: 'Deduction Name',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'15%' }},
                style:{textAlign:'right'}
            },
            {
                dataField: 'effectivityDate',
                text: 'Effectivity Date',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                dataField: 'amount',
                text: 'Amount',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'8%' }},
                style:{textAlign:'right'}
            },
            {
                dataField: 'amortization',
                text: 'Amount Per Cut-Off',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'6%' }},
                style:{textAlign:'right'}
            },
            {
                dataField: 'paymentType',
                text: 'Payment Type',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%' }},
                style:{textAlign:'right'}
            },
            {
                dataField: 'remarks',
                text: 'Remarks',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left'}},
                style:{textAlign:'left'}
            },
            /* {
                dataField: "databasePkey",
                text: "Action",
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button
                            variant="info"
                            onClick={e => this.handleChangeEdit(row)
                                
                            }
                            
                        >Edit</Button>
                    );
                }
            } */

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


        let modalDeductionClose =() => this.setState({modalDeductionShow:false});
        
        return (
            <div>

                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>Payroll >> Deductions / Employee Charges</Card.Header>
                        <Card.Body>
                            <Form >
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
                                            options={this.state.getClientList}
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
                                            options={this.state.getEmployeeList}
                                            placeholder="Select Employee"
                                        />
                                    </Col>
                                </Form.Group>
                               <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeDeductionTypesList}
                                            options={this.state.getDeductionTypesList}
                                            placeholder="Select Deduction Type"
                                        />
                                    </Col>
                                </Form.Group>
                               <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeDeductionList}
                                            options={this.state.getDeductionList}
                                            placeholder="Select Deduction"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                Search
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                                <Card.Header>Record</Card.Header>
                                <div className="mt-1">

                                    <BootstrapTable
                                        caption={Noser.TableHeader({title:"DEDUCTIONS LIST"})}
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        pagination={ paginationFactory(options) }
                                        keyField = "id"
                                        data = { this.state.getDeductionListTable }
                                        columns = { columnDeductions }
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

                                    <ButtonToolbar>
                                        <Button  className="ml-auto" variant="primary" variant="success" onClick={this.handleChangeShowDeductionModal}>
                                            Create
                                        </Button>&nbsp;&nbsp;
                                        {/* <Button variant="info">
                                            Edit
                                        </Button>&nbsp;&nbsp; */}
                                        <Button variant="danger"  onClick={this.handleDeleteClick} disabled={this.state.isDisable}>
                                            Delete
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/home">
                                            Close
                                        </Button>
                                    </ButtonToolbar>
                                </div>
                            
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                <PayrollDeductionsModal 
                show={this.state.modalDeductionShow}
                onHide={this.handleModalClose}
                onRefDeductionModal={ref => (this.child = ref)}/>
            </div>
        );
    }
}

export default PayrollDeductions;
