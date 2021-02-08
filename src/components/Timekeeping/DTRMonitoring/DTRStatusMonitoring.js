import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';


/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */

class DTRStatusMonitoring extends Component {
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

            clientLocationListAutocomplete	:   [],
            clientListAutocomplete	        :   [],
            periodListAutocomplete	        :   [],
            employeeLisAutocomplete	        :   [],
            dtrMonitoringListTable	        :   [],
            dtrMonitoringSummaryListTable	:   [],
        } 
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
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
            this.setState({
                isloading:false,
                clientListAutocomplete : res.data.clients ? res.data.clients : []
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

        this.getClientLocation();
        this.GetPayPeriodList();
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
                this.setState({employeeLisAutocomplete : data.employees, isloading:false,}) 
            else
                this.setState({employeeLisAutocomplete : [], isloading:false}) 
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
        if(e.length==0)
        {
            this.setState({selectedEmployeeId : ""})
          
            return
        }
        
        this.state.selectedEmployeeId = e[0].id
    }

    getClientLocation(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClientName,
            "City": "",
            "Province": "",
            "Region": ""
    
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
        .then(res => {
            //console.log("Client Location");
            //console.log(res.data.locations);
            this.setState({clientLocationListAutocomplete : res.data.locations ? res.data.locations : []})
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

    onChangeLocation = (e) => {
        if(e.length == 0) {
            this.state.selectedLocationName = ""
            this.state.selectedLocationId = ""
            return
        }  
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId = e[0].id
    }

       
    GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":"",
            "IsProcessed":"0"
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get Payroll Periods")
                console.log(data.payrollPeriods)
                this.setState({periodListAutocomplete: data.payrollPeriods})
                //console.log("data.employees list count: " + this.state.employeeList.length)
            })
    }

    onChangePayPeriod = (e) => {

        if(e.length == 0) {
            this.state.payPeriodSelectedId = ""
            this.state.selectedPayPeriodName = ""
            return
        } 

        this.state.payPeriodSelectedId = e[0].periodId
        this.state.selectedPayPeriodName = e[0].payPeriod
    }

    handleSearchClick = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "LocationId"    :   this.state.selectedLocationId,
            "PayPeriodId"   :   this.state.payPeriodSelectedId,
            "EmployeeId"    :   this.state.selectedEmployeeId,
            "StatusId"      :   "",
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetDTRMonitorings", getParams)
        .then(res => {
            const data = res.data
            console.log("Start Get DTR Monitoring")
            console.log(data)
            this.setState({
                dtrMonitoringListTable          :   data.dTRMonitorings,
                dtrMonitoringSummaryListTable   :   data.dTRSummaries,
                isloading                       :   false,
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

    
    render() {
        const columnSummary =[
            {
                dataField   :   'status',
                text        :   'Status',
                editable    :    false,
            },
            {
                dataField   :   'count',
                text        :   'Count',
                editable    :    false,
                headerStyle : () => {
                    return { textAlign: 'center' };
                  },
                style:{textAlign:'right'}
            }
        ]
        const columnDTRMonitoring = [
            {
                dataField   :   'period',
                text        :   'Cutoff',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "15%" };
                  }
            },
            {
                dataField   :   'client',
                text        :   'Client',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "20%" };
                  }
            },
            {
                dataField   :   'location',
                text        :   'Location',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "20%" };
                  }
            },
            {
                dataField   :   'employeeName',
                text        :   'Employee',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "15%" };
                  }
            },
            {
                dataField   :   'currentStatus',
                text        :   'Current Status',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "15%" };
                  }
            },
            {
                dataField   :   'currentApprover',
                text        :   'Next Approver',
                editable    :    false,
                headerStyle : () => {
                    return { width  : "15%" };
                  }
            },

        ] 
        
        return (
            <div>

                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>DTR Monitoring</Card.Header>
                        <Card.Body>
                            <Form >
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={6}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.clientListAutocomplete}
                                            placeholder="Select Client"
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Typeahead
                                            labelKey='employeeName'
                                            id="basic-example"
                                            onChange={this.onChangeEmployeesList}
                                            options={this.state.employeeLisAutocomplete}
                                            placeholder="Select Employee"
                                            autocomplete="false"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={6}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                            onChange={this.onChangeLocation}
                                            options={this.state.clientLocationListAutocomplete}
                                            placeholder="Select Branch"
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Typeahead
                                            labelKey='payPeriod'
                                            id="basic-example"
                                            onChange={this.onChangePayPeriod}
                                            options={this.state.periodListAutocomplete}
                                            placeholder="Select Pay Period"
                                        />
                                    </Col>
                                </Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSearchClick }>
                                        SEARCH
                                    </Button>
                                </ButtonToolbar>

                                <div className="mt-5">
                                    <BootstrapTable
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        /* pagination={ paginationFactory(options) } */
                                        keyField = "id"
                                        data = { this.state.dtrMonitoringListTable }
                                        columns = { columnDTRMonitoring}
                                        /* selectRow = { selectRow } */
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                        /* rowEvents={ rowEvents } */

                                    />
                                </div>
                                <div className="mt-5">
                                    <BootstrapTable
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        /* pagination={ paginationFactory(options) } */
                                        keyField = "id"
                                        data = { this.state.dtrMonitoringSummaryListTable }
                                        columns = { columnSummary}
                                        /* selectRow = { selectRow } */
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                        /* rowEvents={ rowEvents } */

                                    />
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        );
    }
}

export default DTRStatusMonitoring;
