import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

class ReportLoanType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedClientId: "",
            selectedClient:"",
            clientList: [],
            employeeList : [],
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            multiSelected : [],
            payPeriodList: [],
            selectedEmployeeNo : '',
            selectedEmployeeId : '',
            selectedEmployeeName : '',
            cutOffDate : '',
            month : '',
            loanTypeListTable : [],
        }

    }


    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();

    }

    getClient() {
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
       }
       axios
           .post(
               AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
           )
           .then(res => {
               const data = res.data;
               console.log("GetClientList");
               console.log(data);
               this.setState({clientList: data.clients, isLoading:false})
           })
   }

   onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId = ""
            return
        }
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name

        console.log("Selected Client Id")
        console.log(this.state.selectedClientId)

        this.getEmployees()
        this.GetPayPeriodList();

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
                this.setState({employeeList : data.employees, getEmployeeNoList : data.employees,isLoading:false,}) 
            else
                this.setState({employeeList : [], getEmployeeNoList : [],isLoading:false}) 
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
            this.setState({getEmployeeListData: null, disableNoOfIns: true, selectedEmployeeLeadTime: '', selectedEmployeePayMode: '', selectedEmployeePayModeId: '', selectedWorkScheduleIdParam: '', selectedPayrollPeriodsId : '',selectedEmployeeId : '',selectedEmployeeName : '',selectedPayrollPeriodsName : '', selectedWorkScheduleId: ''})
          
            this.GetPayPeriodList();
            return
        }

        this.setState({isLoading:true,})
        this.state.selectedEmployeeId = e[0].id
        this.state.selectedEmployeePayModeId = e[0].payModeId
        this.state.selectedEmployeePayMode= e[0].payMode
        this.state.selectedPayrollPeriodsId = e[0].payPeriodId
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.state.selectedEmployeeBranch = e[0].locationName
        this.state.selectedEmployeeLeadTime = e[0].leadTime
        this.setState({isLoading:false})
        this.GetPayPeriodList();
    
    }

    onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        console.log(e.target.value)
    }

    onChangeEmployeeBranch(e){
        this.setState({selectedEmployeeBranch : e.target.value})
        console.log(e.target.value)
    }


    GetPayPeriodList() {
        this.setState({isLoading:true,loadingText:"Loading..."})
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.state.selectedEmployeeId,
            "IsProcessed" : "1"
         };
         console.log("Get Pay Period List")
         
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
             )
             .then(res => {
                const data = res.data;
                console.log("data.payPeriodList")
                console.log(data)
                this.setState({payPeriodList: data.payrollPeriods,isLoading:false })
             })
    }

    /* onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        console.log(e.target.value)
    }

    onChangeEmployeeBranch(e){
        this.setState({selectedEmployeeBranch : e.target.value})
        console.log(e.target.value)
    } */
    
    handleChangeCutOffDate = date => {
        this.setState({
            cutOffDate: date
        });
        console.log(this.state.cutOffDate)
    };

    handleChangeMonth = date => {
        this.setState({
            month: date
        });
    }

    handleGenerate = () => {
        if(this.state.cutOffDate == ""){
            alert("Please select cut-off month")
            return
        }

        if(this.state.month == ""){
            alert("Please select month")
            return
        }
    }
    

    onChangePayPeriod = (e) => {
        console.log(e[0].periodId)
        let periodList = []
        for(let i = 0; i < e.length; i++){
            const obj = {
                "PayPeriodId" : e[i]["periodId"]
            }
            periodList.push(obj)
        }
        this.setState({periodLists: periodList})
    }

    handleSearchClick = () => {
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.selectedEmployeeId,
            "Periods":this.state.periodLists,
        }
        console.log("Submit search params")
        console.log(getParams)
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Payroll/GetPayrollSummaryReport", getParams)
        .then(res => {
            console.log("GetPayrollSummaryReport")
            console.log(res.data)
            const data = res.data
            this.setState({
                payrollSummaryListTable : data.payrolls
            })
            var alertType = (data.status=="1") ? "success" : "danger"
            this.setState(
            {
                isLoading:false,
                AlertType:"Success!", 
                show:true,
                Color:alertType,
                Message:data.message ,
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
        const { ExportCSVButton } = CSVExport;
        const columnLoanType = [
            {
                dataField: 'dateLoanGranted',
                text: 'HC',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'NAME_OF_MEMBER',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'POSITION',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'STORE',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'SSS_LOAN_SALARY',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'SSS_LOAN_CALAMITY',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'HDMF_LOAN_HOUSING',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'HDMF_LOAN_MPL',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'COOP_LOAN_COOP',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'TOTAL',
                editable: false
            },
        ]
        return(
            <div>
                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>Generate Report Loan Type</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.clientList}
                                            placeholder="Select Client"
                                            /* clearButton */
                                            /* multiple */
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} sm={4} controlId="formGridEmail">
                                        <Typeahead
                                            labelKey='employeeName'
                                            id="basic-example"
                                            onChange={this.onChangeEmployeesList}
                                            options={this.state.employeeList}
                                            placeholder="Select Employee"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={4} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Employee No" 
                                            autoComplete="off" 
                                            name="employeeNo"
                                            value={this.state.selectedEmployeeNo}
                                            onChange={this.onChangeEmployeesNo.bind(this)}
                                            readOnly/>
                                    </Form.Group>

                                    <Form.Group as={Col} sm={4} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Employee Branch" 
                                            autoComplete="off" 
                                            name="employeeBranch"
                                            value={this.state.selectedEmployeeBranch}
                                            onChange={this.onChangeEmployeeBranch.bind(this)}
                                            readOnly/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='payPeriod'
                                            id="basic-example"
                                            onChange={this.onChangePayPeriod}
                                            options={this.state.payPeriodList}
                                            placeholder="Select Payroll Cut-Off"
                                            multiple
                                            /* clearButton */
                                        />
                                    </Col>
                                </Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSearching }>
                                        SEARCH
                                    </Button>
                                </ButtonToolbar>

                                <Form.Group controlId="formGridPassword">

                                    <ToolkitProvider
                                        keyField="id"   
                                        data={ this.state.loanTypeListTable }
                                        columns={ columnLoanType }
                                        exportCSV={ {
                                            fileName: "ReportLoanType.csv",
                                        } }
                                        >
                                        {
                                            props => (
                                            <div>
                                                
                                                <hr />
                                                <ExportCSVButton className="btn btn-success" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                                <BootstrapTable
                                                    { ...props.baseProps }
                                                    caption={Noser.TableHeader({title:"LOANS TYPE"})}
                                                    rowClasses="noser-table-row-class"
                                                    striped
                                                    hover
                                                    condensed
                                                    /* pagination={ paginationFactory(options) } */
                                                    keyField = "id"
                                                    data = { this.state.loanTypeListTable }
                                                    columns = { columnLoanType}
                                                    /* selectRow = { selectRow } */
                                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                    /* rowEvents={ rowEvents } */

                                                />
                                            </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                        
                                </Form.Group>
                                <ButtonToolbar className="mt-5" sm={12}>
                                    <Button className="ml-auto" variant="danger" href="/home" >
                                        Close
                                    </Button>
                                </ButtonToolbar>

                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
            </div>
        )
    }


}

export default ReportLoanType;