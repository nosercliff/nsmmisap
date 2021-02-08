import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

import  PayrollInclusionsModal  from './Modal/PayrollInclusionsModal';

/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */

class PayrollInclusions extends Component {
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
            modalInclusionsShow: false,
            getInclusionsList: [],
            getInclusionsListTable: [],
            isDisable: true,
            getInclusionTypesList: [],
        } 
        /* this.onChangeClientype=this.onChangeClientype.bind(this);  */

    
    }




    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
        this.getInclusionTypes();
    }

    getInclusionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", getParams)
        .then(res => {
            console.log("GetInclusionTypes");
            console.log(res.data);
            const data = res.data;
            this.setState({getInclusionTypesList : data.inclusionTypes}) 
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

    onChangeInclusionTypesList = (e) => {
        if(e.length == 0) {
            this.state.selectedInclusionTypesId = ''
            return
        }  
        this.state.selectedInclusionTypesId = e[0].id

        this.getInclusions();
    }

    getInclusions(){
        const getParams = {
            "IpAddress":"0.0.0.0",  
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedInclusionTypesId,
            "Name":""

        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", getParams)
        .then(res => {
            console.log("Get Inclusions");
            console.log(res.data);
            this.setState({getInclusionsList : res.data.inclusions ? res.data.inclusions : []})
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

    onChangeInclusionsList = (e) => {
        if(e.length == 0) {
            this.state.selectedInclusionId=""
            return
        } 
        this.state.selectedInclusionId = e[0].id
        this.setState({isshow:false,color:"",message:"",fade:true})
        console.log("Client selectedInclusionId " + this.state.selectedInclusionId );
        
    }

    
    handleSearchClick = () => {

        /* if(!this.state.selectedClientId)
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Warning!",
                isshow      :   true,
                color       :   "warning",
                message     :   "Please select client.",
                fade        :   true
            })
            return
        }
        if(!this.state.selectedEmployeeId)
        {
            this.setState({
                isloading   :   false,
                alerttype   :   "Warning!",
                isshow      :   true,
                color       :   "warning",
                message     :   "Please select employee.",
                fade        :   true
            })
            return
        } */
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":this.state.selectedEmployeeId,
            "InclusionId":this.state.selectedInclusionId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetInclusions", getParams)
        .then(res => {
            console.log("GetInclusions")
            console.log(res.data)
            this.setState({
                getInclusionsListTable  :   res.data.inclusions,
                isloading               :   false,
                isshow                  :   false,
            })
            const data = res.data;
            if(data.inclusions.length=="0"){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   data.message,
                    fade        :   true
                });
            }/* else {
                this.setState({
                    isshow      :   false,
                });

            } */
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
        this.setState({isloading:true})
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
        this.setState({isloading:true})
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
                this.setState({getEmployeeList : data.employees, getEmployeeNoList : data.employees,isloading:false, getCurrentMonthly: data.employeespayPeriod}) 
            else
                this.setState({getEmployeeList : [], getEmployeeNoList : [],isloading:false}) 
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

    onChangeEmployeesList = (e) => {


        if(e.length==0)
        {
            this.setState({getEmployeeListData: null, selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
            return
        }
        this.setState({isshow:false,color:"",message:"",fade:true})
        this.state.selectedEmployeeId = e[0].id
        

        this.state.selectedPayModeId = e[0].payModeId
        this.state.selectedPayMode = e[0].payMode
        this.state.selectedPayrollPeriodsId = e[0].payPeriodId
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.setState({isLoading:false})
       
        console.log("Work selectedEmployeeName   " + this.state.selectedEmployeeNo );
        /* this.getLoans(); */
    
    }

    refreshList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Id":"",
            "EmployeeId":"",
            "InclusionId":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/GetInclusions", getParams)
        .then(res => {
            const data = res.data;
            this.setState({
                getInclusionsListTable : data.inclusions
            })
            /* if(data.inclusions.length=="0"){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   data.message,
                    fade        :   true
                });
            } */
        })
    }

    handleDeleteClick = event => {

        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true})
        for (let i = 0; i < this.state.getInclusionsListTable.length; i++) {
            if (this.state.getInclusionsListTable[i]["isModified"] == 1) {
                
                    this.state.id = this.state.getInclusionsListTable[i]["id"]
                    this.state.employeeId =  this.state.getInclusionsListTable[i]["employeeId"]
                    this.state.inclusionId =  this.state.getInclusionsListTable[i]["inclusionId"]
                    this.state.amount =  this.state.getInclusionsListTable[i]["amount"]
                    this.state.isRecurring =  this.state.getInclusionsListTable[i]["isRecurring"]
                    this.state.effectivityDate =  this.state.getInclusionsListTable[i]["effectivityDate"]
                    this.state.amortization =  this.state.getInclusionsListTable[i]["amortization"]
                    this.state.isPerDay =  this.state.getInclusionsListTable[i]["isPerDay"]
                    this.state.IsDeleted = this.state.getInclusionsListTable[i]["isDeleted"].toString()
            }

            const deleteInclusionsParams = {
                "IpAddress":"0.0.0.0",
                "ClientId":this.state.userinfo.clientId,
                "UserId":this.state.userinfo.userId,
                "Id":this.state.id,
                "EmployeeId":this.state.employeeId,
                "InclusionId":this.state.inclusionId,
                "Amount":this.state.amount,
                "IsRecurring":this.state.isRecurring,
                "EffectivityDate":this.state.effectivityDate,
                "Amortization":this.state.amortization,
                "IsPerDay":this.state.isPerDay,
                "IsDeleted":this.state.IsDeleted 
            };
    
            console.log("Delete Submit Params")
            console.log(deleteInclusionsParams)
    
            axios
                .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/EditInclusion", deleteInclusionsParams)
                .then(res => {
                    sleep(5000).then(() => {
                        this.setState({isloading:false})})
                    this.refreshList();
                    const data = res.data;
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

        console.log(this.state.id)

        

        
    }

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.getInclusionsListTable.length; i++) {
            if (this.state.getInclusionsListTable[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        console.log(id)
        this.state.getInclusionsListTable.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    handleChangeEdit(row){
        /* console.log(row.id)
        console.log(row.employeeId)

        const obj = {
            "EmployeeId":row.employeeId,
            "LeaveDate" : fromDate,
            "Mandays" : totaldays.toString(),
            "Reason" : this.state.reason,
            "IsPaid" : this.state.isChecked,
        }

        
        
        restdayDataList.push(obj); */
    }
    handleChangeShowInclusionsModal(){
        this.setState({modalInclusionsShow: true})
    }
    handleModalOpen = () => {
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
        this.setState({modalInclusionsShow: true})
        //sample on how to pass object / string parameter from parent to child
        let obj = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            employeeIdFromParent    :   this.state.selectedEmployeeId,
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
        this.setState({modalInclusionsShow: false})
    }
    render() {
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            bgColor: (row, rowIndex) => (rowIndex > 1 ? '#AFB2B4' : '#B3B4B4'),
            onSelect: (row, isSelect, rowIndex, e) => {
                let isDisable=true
                this.state.getInclusionsListTable.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    if (item.isDeleted=="1")
                    isDisable =  false
                })
                this.setState({isDisable:isDisable})
            }
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        }

        const columnInclusions= [
            
            {
                dataField: 'reference',
                text: 'Reference',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'inclusionName',
                text: 'Inclusion Name',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'15%' }},
                style:{textAlign:'left'}
            },
            {
                dataField: 'effectivityDate',
                text: 'Effectivity Date',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center'}
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
                dataField: 'perDay',
                text: 'Per Day',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'6%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'paymentType',
                text: 'Payment Type',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%' }},
                style:{textAlign:'left'}
            },
            {
                dataField: 'fromDate',
                text: 'From Date',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'8%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'toDate',
                text: 'To Date',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'7%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'amortization',
                text: 'Amortization',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'7%' }},
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
                text: "Edit",
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

        let modalInclusionsClose =() => this.setState({modalInclusionsShow:false});
        
        return (
            <div>

                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>Payroll >> Payroll Inclusions</Card.Header>
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
                                            autocomplete="false"
                                        />
                                    </Col>
                                </Form.Group>
                               <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeInclusionTypesList}
                                            options={this.state.getInclusionTypesList}
                                            placeholder="Select Inclusion Type"

                                        />
                                    </Col>
                                </Form.Group>
                               <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeInclusionsList}
                                            options={this.state.getInclusionsList}
                                            placeholder="Select Inclusion"
                                            autocomplete="false"
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
                                        caption={Noser.TableHeader({title:"INCLUSIONS LIST"})}
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true}) }
                                        keyField = "id"
                                        data = { this.state.getInclusionsListTable }
                                        columns = { columnInclusions }
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
                                        <Button  className="ml-auto" variant="primary" variant="success" onClick={this.handleModalOpen}>
                                            Create
                                        </Button>&nbsp;&nbsp;
                                       {/*  <Button variant="info">
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

                <PayrollInclusionsModal 
                show={this.state.modalInclusionsShow}
                onHide={this.handleModalClose}
                onRefInclusionModal={ref => (this.child = ref)}/>
            </div>
        );
    }
}

export default PayrollInclusions;
