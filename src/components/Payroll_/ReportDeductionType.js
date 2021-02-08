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

class ReportDeductionType extends Component {
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
            deductionTypeListTable : [],
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

    GetPayPeriodList() {
        this.setState({isLoading:true,loadingText:"Loading..."})
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": ""
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

    onChangeEmployeesList = (e) => {


        if(e.length==0)
        {
            this.setState({ selectedEmployeeNo : '',selectedEmployeeId : '',selectedEmployeeName : ''})
          
            return
        }
        this.state.selectedEmployeeId = e[0].id
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedEmployeeNo = e[0].employeeNo
        this.state.selectedEmployeeBranch = e[0].locationName
       
        console.log("Work selectedEmployeeName   " + this.state.selectedEmployeeNo );
    }
    
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
        console.log(e)
    }

    handleSearching = () => {
        console.log(this.state.multiSelected)
    }





    render() {
        const { ExportCSVButton } = CSVExport;
        const columnDeductionType = [
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
                text: 'MEMBERSHIP_MRP',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'MEMBERSHIP_AAP',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'CAPITAL_BUILD_UP',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'HMO',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'EMPLOYEE_CHARGES',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'BANK_TRANSFER_FEE',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'PENALTY',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'TRUE_MONEY_KIT',
                editable: false
            },
            {
                dataField: 'dateLoanGranted',
                text: 'PARAMOUNT_ID',
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
                        <Card.Header>Generate Report Deduction Type</Card.Header>
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
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={6}>
                                        <Typeahead
                                            labelKey='employeeName'
                                            id="basic-example"
                                            onChange={this.onChangeEmployeesList}
                                            options={this.state.employeeList}
                                            placeholder="Select Employee"
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Employee Branch" 
                                            autoComplete="off" 
                                            name="employeeBranch"
                                            value={this.state.selectedEmployeeBranch}
                                            readOnly
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Employee No" 
                                            autoComplete="off" 
                                            name="employeeNo"
                                            value={this.state.selectedEmployeeNo}
                                            onChange={this.onChangeEmployeesNo}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group>
                                    <Typeahead
                                        labelKey='payPeriod'
                                        id="basic-example"
                                        onChange={this.onChangePayPeriod}
                                        options={this.state.payPeriodList}
                                        placeholder="Select Payroll Cut-Off"
                                        multiple
                                        clearButton
                                    />
                                </Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSearching }>
                                        SEARCH
                                    </Button>
                                </ButtonToolbar>

                                <Form.Group controlId="formGridPassword">

                                    <ToolkitProvider
                                        keyField="id"   
                                        data={ this.state.deductionTypeListTable }
                                        columns={ columnDeductionType }
                                        exportCSV={ {
                                            fileName: "ReportDeductionType.csv",
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
                                                    data = { this.state.deductionTypeListTable }
                                                    columns = { columnDeductionType}
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

export default ReportDeductionType;