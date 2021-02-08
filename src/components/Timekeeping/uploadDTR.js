import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
class uploadDTR extends Component {
    constructor() {
        super()
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            employeeList    :   [],
            clientList      :   [],
            payPeriodList   :   [],
            scheduleList    :   [],
            uploadfile      :   "",
            employeeId      :   "",
            clientId        :   "",
            payPeriodId     :   "",
            disableExport   :   true,
            disableUpload   :   true,
            uploadedDate    :   ""
        }
    }
    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetClientList()
    }
    handleClientChanged = (e) => {
        if(e.length == 0) {
            this.setState({clientId:""})
            return
        } else {
            this.state.clientId     =   e[0].id
            this.GetEmployeeList(e[0].id)
        }
        this.GetPayPeriodList();
        this.setState({
            isshow  :   false,
        })
    }
    handleEmployeeChanged = (e) => {
        if(e.length == 0) {
            this.setState({employeeId:""})
            return
        } else {
            this.state.employeeId   =   e[0].id
        }

        this.GetPayPeriodList()
        this.setState({
            isshow  :   false,
        })
    }
    handlePayPeriodChanged = (e) => {
        if(e.length == 0) {
            this.setState({payPeriodId:""})
            return
        }
        this.state.payPeriodId=e[0].periodId
        this.setState({
            isshow  :   false
        })
    }
    GetPayPeriodList() {
        this.setState({isloading:true})
        const periodListParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeId"    :   this.state.employeeId,
            "IsProcessed"   :   "0"
         };
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
             )
             .then(res => {
                const data = res.data;
                this.setState({
                    payPeriodList   :   data.payrollPeriods,
                    isloading       :   false
                })
             })
    }
    GetClientList(){
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
        .then(res => {
            this.setState(
                {
                    isloading:false,
                    clientList : res.data.clients ? res.data.clients : []                     

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
    GetEmployeeList(clientID) {
        this.setState({
            isloading   :   true
        })
        const employeeListParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   clientID,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeNo"    :   ""
         };
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees",  employeeListParams
             )
             .then(res => {
                const data = res.data;
                if (data.employees.length > 0 || data.employees != null) {
                    this.setState({
                        employeeList    :   data.employees,
                        isloading       :   false
                    })
                } else {
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
    handleSearchClick = (e) => {
        this.setState({isloading:true})
        let uploadedDate = moment(new Date()).format('MMDDYYYYHHMMSS')
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeId"    :   this.state.employeeId,
            "PayPeriodId"   :   this.state.payPeriodId
        }
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetEmployeePayPeriodWorkSchedules", getParams)
            .then(res => {
                const data      =   res.data
                var obj         =   {}
                var schedule    =   []
                var isValid     =   true;
                if(data.status  =   "1"){
                    
                    if(data.payPeriodWorkSchedule   ==  null)
                    {
                        isValid = false
                        data.payPeriodWorkSchedule  =   []
                    }
                    data.payPeriodWorkSchedule.map(function(item, idx){
                        if(item.periodWorkSchedule  ==  null)
                        {
                            isValid = false
                        }
                        else
                        {
                            obj = {
                                periodId            :   data.payPeriodWorkSchedule[0].payPerioId,
                                employeeName        :   data.payPeriodWorkSchedule[0].employeeName,
                                employeeNo          :   data.payPeriodWorkSchedule[0].employeeNo,
                                date                :   item.date,
                                branch              :   item.periodWorkSchedule.location,
                                workSchedule        :   item.periodWorkSchedule.description,
                                timeIn              :   item.periodWorkSchedule.startTime,
                                timeOut             :   item.periodWorkSchedule.endTime,
                                firstBreakOut       :   '',
                                firstBreakIn        :   '',
                                secondBreakOut      :   '',
                                secondBreakIn       :   '',
                                thirdBreakOut       :   '',
                                thirdBreakIn        :   '',
                                fourthBreakOut      :   '',
                                fourthBreakIn       :   '',
                                overtime            :   '',
                            }
                            item.periodWorkSchedule.workScheduleDetails.map(function(item, idx){
                                if(idx==1){
                                    obj.firstBreakOut = item.startTimeLabel
                                    obj.firstBreakIn = item.endTimeLabel
                                }
                                if(idx==2){
                                    obj.secondBreakOut = item.startTimeLabel
                                    obj.secondBreakIn = item.endTimeLabel
                                }
                                if(idx==3){
                                    obj.thirdBreakOut = item.startTimeLabel
                                    obj.thirdBreakIn = item.endTimeLabel
                                }
                            })
                            schedule.push(obj)
                        }
                    })
                    if(!isValid){
                        this.setState({
                            isloading       :   false,
                            alerttype       :   "Warning!",
                            isshow          :   true,
                            color           :   "warning",
                            message         :   "No record found.",
                            fade            :   true,
                            scheduleList    :   [],
                            disableExport  :   true
                        })
                    }
                    else
                    this.setState({
                        scheduleList   :   schedule,
                        isshow         :   false,
                        isloading      :   false,
                        disableExport  :   false,
                        uploadedDate   :   uploadedDate
                    })
                }
            })
    }
    handleSubmitUpload = (e) =>{
        this.setState({isloading:true})

        const formData = new FormData();
        formData.append('IpAddress', "0.0.0.0");
        formData.append('ClientId', this.state.userinfo.clientId);
        formData.append('UserId', this.state.userinfo.userId);
        //formData.append('EmployeeId', this.state.employeeId);
        //formData.append('PayPeriodId', this.state.payPeriodId);
        formData.append('File', this.state.uploadfile);

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/UploadDTR",  formData, {headers: {'Content-Type': 'multipart/form-data'}}
            )
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
                    });
                }
                else{
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
    setFile = (e) => {
        if(e.target.value.length>0)
            this.setState({ uploadfile: e.target.files[0],disableUpload:false});
        else
            this.setState({ uploadfile: "",disableUpload:true });
      }
    render() {
        const expcolumns =[
            { dataField: 'periodId', text: 'Period Id'},
            { dataField: 'employeeName', text: 'Employee Name'/*,csvExport:false*/},
            { dataField: 'employeeNo', text: 'Employee No'},
            { dataField: 'date', text: 'Schedule Date'},
            // { dataField: 'timeIn', text: 'Time-In',},
            // { dataField: 'firstBreakOut', text: '1st Break-Out'},
            // { dataField: 'firstBreakIn', text: '1st Break-In'},
            // { dataField: 'secondBreakOut', text: '2nd Break-Out'},
            // { dataField: 'secondBreakIn', text: '2nd Break-In'},
            // { dataField: 'thirdBreakOut', text: '3rd Break-Out'},
            // { dataField: 'thirdBreakIn', text: '3rd Break-In'},
            // { dataField: 'timeOut', text: 'Time-Out'},
            { dataField: 'overtime', text: 'Time-In',},
            { dataField: 'overtime', text: '1st Break-Out'},
            { dataField: 'overtime', text: '1st Break-In'},
            { dataField: 'overtime', text: '2nd Break-Out'},
            { dataField: 'overtime', text: '2nd Break-In'},
            { dataField: 'overtime', text: '3rd Break-Out'},
            { dataField: 'overtime', text: '3rd Break-In'},
            { dataField: 'overtime', text: 'Time-Out'},
        ]
        const columns = [
            { dataField: 'employeeName', text: 'Employee Name',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'6%','white-space' : 'nowrap', }},
                style:{textAlign:'left','white-space' : 'nowrap',} },
            { dataField: 'employeeNo', text: 'Employee No',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'6%','white-space' : 'nowrap', }},
                style:{textAlign:'center','white-space' : 'nowrap',} },
            { dataField: 'date', text: 'Schedule Date',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'6%' }},
                style:{textAlign:'center'} },
            { dataField: 'timeIn', text: 'Time-In',editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign:'center',width:'6%' }},
                style:{textAlign:'center'} },
            { dataField: 'firstBreakOut', text: '1st Break-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'6%' }},
            style:{textAlign:'center'} },
            { dataField: 'firstBreakIn', text: '1st Break-In',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'6%' }},
            style:{textAlign:'center'} },
            { dataField: 'secondBreakOut', text: '2nd Break-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'6%' }},
            style:{textAlign:'center'} },
            { dataField: 'secondBreakIn', text: '2nd Break-In',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'6%' }},
            style:{textAlign:'center'} },
            { dataField: 'thirdBreakOut', text: '3rd Break-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'6%' }},
            style:{textAlign:'center'} },
            { dataField: 'thirdBreakIn', text: '3rd Break-In',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'6%' }},
            style:{textAlign:'center'} },
            { dataField: 'timeOut', text: 'Time-Out',editable: false,
            headerStyle: (colum, colIndex) => {
                return { textAlign:'center',width:'7%' }},
            style:{textAlign:'center'} },
        ]
        const { ExportCSVButton } = CSVExport;
        return(
            <div>
            <Banner />
            <Container className="themed-container" fluid={true}>
            <Card className="mt-5">
                <Card.Header>Timekeeping >> Upload Employee's DTR</Card.Header>
                <Card.Body>
                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                        <div className={this.state.color}></div> 
                        {this.state.message}
                    </Alert>
                    <Form.Group>
                        <Typeahead
                            labelKey='name'
                            id="basic-exampleEmp"
                            onChange={ this.handleClientChanged }
                            options={this.state.clientList}
                            placeholder="Select Client"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Typeahead
                            labelKey='employeeName'
                            id="basic-exampleEmp"
                            onChange={ this.handleEmployeeChanged }
                            options={this.state.employeeList}
                            placeholder="Select Employee"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Typeahead
                            labelKey='payPeriod'
                            id="basic-exampleEmp"
                            onChange={ this.handlePayPeriodChanged }
                            options={this.state.payPeriodList}
                            placeholder="Select Period"
                        />
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                Search
                            </Button>&nbsp;
                        </ButtonToolbar>
                    </Form.Group>
                    
                    <div className="mt-2">
                        <ToolkitProvider
                            keyField="id"   
                            data={ this.state.scheduleList }
                            columns = { expcolumns }
                            exportCSV={ {
                                fileName: "DTR_Template_" + this.state.employeeId + "_" + this.state.uploadedDate + ".csv",
                                noAutoBOM: false,
                                separator: ',',
                                blobType: "text/plain;charset=utf-8,%EF%BB%BF"
                            } }
                            >
                            {
                                props => (
                                <div>
                                    
                                    <hr />
                                    <ExportCSVButton disabled={this.state.disableExport} className="btn btn-success" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                    <BootstrapTable
                                        striped
                                        hover
                                        condensed
                                        pagination={ paginationFactory({sizePerPage:16,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                        keyField = "id"
                                        data = { this.state.scheduleList }
                                        noDataIndication={ () => <div>No record found.</div> }
                                        columns = { columns }
                                    />
                                </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>  
                    <Form.Row>
                    <Form.Group>
                        <Form.Control type="file" accept='.csv' onChange={this.setFile}/>
                        <Button disabled={this.state.disableUpload} className="mt-1" variant="success" onClick={this.handleSubmitUpload}>Upload</Button>
                    </Form.Group>
                    </Form.Row>
                </Card.Body>
            </Card>
            </Container>
            <NoserLoading show={this.state.isloading} />
            </div>
    )}
}
export  default uploadDTR