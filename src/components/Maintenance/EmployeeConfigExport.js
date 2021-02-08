import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

class EmployeeConfigExport extends Component {
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

            clientListAutocomplete          :   [],
            employeeListAutocomplete        :   [],
            employeeListTable               :   [],
            clientLocationListAutocomplete	:   [],
            tblApproverOneArrLst            :   [],
            tblApproverTwoArrLst            :   [],

        } 
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
        this.getEmployeesTeamLead();
        this.getEmployeesCoordinator()
    }

    getClientList(){
        const getParams = {
            "IpAddress" :   "0.0.0.0",
            "ClientId"  :   this.state.userinfo.clientId,
            "UserId"    :   this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            this.setState(
                {
                    isloading:false,
                    clientListAutocomplete : res.data.clients ? res.data.clients : []
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

    onChangeClient = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        /* this.getEmployeesList(); */
        this.getClientLocation();
    }

    getClientLocation(){
        this.setState({isloading:true})
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
            console.log("Client Location");
            console.log(res.data.locations);
            this.setState({clientLocationListAutocomplete : res.data.locations, isloading:false ? res.data.locations : [], isloading:false })
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
            this.state.selectedLocationId=""
            return
        } 
        this.state.selectedLocationId = e[0].id
        console.log(this.state.selectedLocationId);
    }


    handleSearchClick = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   "",
            "EmployeeNo"    :   "",
            "ClientName"    :   this.state.selectedClientName
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            console.log("Employee List ");
            console.log(res.data);
            const data = res.data
            this.setState({employeeListTable : data.employees.filter(x=>x.locationId==this.state.selectedLocationId), isloading:false, isshow:false,})
            console.log(this.state.employeeListTable)
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

    getEmployeesTeamLead(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetTeamLeadEmployees", getParams)
        .then(res => {
            //console.log("Team Lead List Autocomplete");
            //console.log(res.data);
            const data = res.data
            if(data.status=="1")
                this.setState({employeesTeamLeadList : data.employees,isloading:false}) 
            else
                this.setState({employeesTeamLeadList : [],isloading:false}) 


                for (let i = 0; i < data.employees.length; i++) {
                    const obj = {
                        value : data.employees[i]["id"],
                        label : data.employees[i]["employeeName"],
                    };
                    this.state.tblApproverOneArrLst.push(obj);
                }

                /* for (let i = 0; i < data.employees.length; i++) {
                    if (data.employees[i]["id"] === this.state.teamLeadfromRow) {

                        this.state.getTeamLeadData = data.employees[i]['employeeName']

                    }
                    
                } */
                //console.log("Outside for loop");
                //console.log(this.state.getTeamLeadData)
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
    

    getEmployeesCoordinator(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetCoorEmployees", getParams)
        .then(res => {
            console.log("Coordinator List Autocomplete");
            console.log(res.data);
            const data = res.data
            this.setState({
                employeeCoordinatorAutocomplete     :   data.employees,
                isloading	                        :   false,
            }) 


            for (let i = 0; i < data.employees.length; i++) {
                const obj = {
                    value : data.employees[i]["id"],
                    label : data.employees[i]["employeeName"],
                };
                this.state.tblApproverTwoArrLst.push(obj);
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

    render() {
        const { ExportCSVButton } = CSVExport;

        const columnEmployee = [
            {
                dataField: 'clientName',
                text: 'CLIENT',
                editable: false,
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'locationName',
                text: 'BRANCH',
                editable: false,
            },
            {
                dataField: 'employeeNo',
                text: 'EMPLOYEE_NO',
                editable: false,
            },
            {
                dataField: 'firstName',
                text: 'FIRST_NAME',
                editable: false,
            },
            {
                dataField: 'middleName',
                text: 'MIDDLE_NAME',
                editable: false,
            },
            {
                dataField: 'lastName',
                text: 'LAST_NAME',
                editable: false,
            },
            {
                dataField: 'mobileNumber',
                text: 'MOBILE_NUMBER',
                editable: false,
            },
            {
                dataField: 'payCardType',
                text: 'PAY_CARD_TYPE',
                editable: false,
            },


            {
                dataField: 'payMode',
                text: 'PAY_MODE_TYPE',
                editable: false,
            },
            {
                dataField: 'workSchedule',
                text: 'WORK_SCHEDULE',
                editable: false,
            },
            {
                dataField: 'payCardNumber',
                text: 'PAY_CARD_NUMBER',
                editable: false,
            },
            {
                dataField: 'salaryOffered',
                text: 'SALARY',
                editable: false,
            },
            {
                dataField: 'id',
                text: 'EMPLOYEE_ID',
                editable: false,
            },
            {
                dataField: 'ecolaValue',
                text: 'E_COLA',
                editable: false,
            },
            {
                dataField: 'periodType',
                text: 'PERIOD_TYPE',
                editable: false,
            },
            {
                dataField: 'employeeStatusType',
                text: 'EMPLOYMENT_STATUS',
                editable: false,
            },
            {
                dataField: 'contractDateStart',
                text: 'DATE_START',
                editable: false,
            },
            {
                dataField: 'contractDateEnd',
                text: 'DATE_END',
                editable: false,
            },
            {
                dataField: 'position',
                text: 'POSITION',
                editable: false,
            },
            {
                dataField: 'approverId1',
                text: 'APPROVER_1',
                editable: false,
                formatter: (cell, row) => {
                    if(row.approverId1!='' && row.approverId1!=null){
                        return this.state.tblApproverOneArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblApproverOneArrLst
                }
            },
            {
                dataField: 'approverId2',
                text: 'APPROVER_2',
                editable: false,
                formatter: (cell, row) => {
                    if(row.approverId2!='' && row.approverId2!=null){
                        return this.state.tblApproverTwoArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblApproverTwoArrLst
                }
            },
            {
                dataField: 'dateHired',
                text: 'DATE_HIRED',
                editable: false,
            },
        ]

        const employeeRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                let restLst = this.state.employeeListTable
                this.state.employeeListTable.map(function(item,idx){
                    
                    if(idx==rowIndex)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                    }
                })
                //console.log(this.state.employeeListTable)
              }
        };
        
        
        return (
            <div>

                <Banner />
                <Container fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>Report >> HR ADMIN >> Employee Config List</Card.Header>
                        <Card.Body>
                            <Form >
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Row>
                                    <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClient}
                                            options={this.state.clientListAutocomplete}
                                            placeholder="Select Client"

                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                            onChange={this.onChangeLocation}
                                            options={this.state.clientLocationListAutocomplete}
                                            placeholder="Select Branch"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto" style={{minWidth:'60px'}} onClick={ this.handleSearchClick }>
                                                Search
                                            </Button>&nbsp;&nbsp;
                                            <NavLink to="/EmployeeConfigExport">
                                                <Button  variant="primary" variant="success" style={{minWidth:'60px'}}>
                                                    Create
                                                </Button>
                                            </NavLink>
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Form.Row>                                
                                <ToolkitProvider
                                    keyField="id"   
                                    data={ this.state.employeeListTable }
                                    columns={ columnEmployee }
                                    exportCSV={ {
                                        fileName: "HR Admin - List of Employee Config.csv",
                                    } }
                                    >
                                    {
                                        props => (
                                        <div>
                                            <BootstrapTable
                                                { ...props.baseProps } 
                                                /* keyField = "id"
                                                data = { this.state.employeeListTable }
                                                columns = { columnEmployee }
                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                rowClasses="noser-table-row-class"
                                                striped
                                                hover
                                                condensed
                                                selectRow = { employeeRow } */


                                                striped
                                                hover
                                                condensed
                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                keyField = "id"
                                                data = { this.state.employeeListTable }
                                                noDataIndication={ () => <div>No record found.</div> }
                                                columns = { columnEmployee }
                                            />
                                                <ButtonToolbar>
                                                    <ExportCSVButton className="btn btn-info ml-auto" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <NavLink to="/home">
                                                        <Button className="ml-auto" variant="danger" href="/banner">
                                                            Close
                                                        </Button>
                                                    </NavLink>
                                                </ButtonToolbar>
                                        </div>
                                        )
                                    }
                                </ToolkitProvider>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        );
    }

}

export default EmployeeConfigExport