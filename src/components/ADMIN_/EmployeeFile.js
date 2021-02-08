import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class EmployeeFile extends Component {
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

            clientAutocomplete	        :   [],
            employeeNameAutocomplete    :   [],
            employeeTableList           :   [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.getEmployees();
    }

    getClientList() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   "",
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
            )
            .then(res => {
                const data = res.data;
                ////console.log("GetClientList")
                ////console.log(data)
                this.setState({
                clientAutocomplete  :   data.clients, 
                    isloading        :   false
                })
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
            this.state.selectedClientId     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedClientName   =   e[0].name
        this.getEmployeesName();
 
    }

    getEmployees(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   "",
            "EmployeeNo"    :   "",
            "ClientName"    :   ""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Employee List ");
            console.log(data);
            this.setState({
                employeeTableList  :   data.employees, 
                isloading        :   false
            })
            var alerttype = (data.status=="1") ? "success" : "danger"
            if(data.employees.length=="0"){
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

    getEmployeesName(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   "",
            "EmployeeNo"    :   "",
            "ClientName"    :   this.state.selectedClientName
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Employee List ");
            console.log(data);
            this.setState({
                employeeNameAutocomplete  :   data.employees, 
                isloading        :   false
            })
            
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

    onChangeEmployeeName = (e) => {
        if(e.length == 0) {
            this.state.selectedEmployeeNo     =   ""
            this.state.selectedEmployeeName   =   ""
            return
        }
        this.state.selectedEmployeeNo     =   e[0].employeeNo
        this.state.selectedEmployeeName   =   e[0].employeeName
 
    }

    handleSearchClick = () => {
        this.setState({isloading    :   true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   this.state.selectedEmployeeName,
            "EmployeeNo"    :   this.state.selectedEmployeeNo,
            "ClientName"    :   this.state.selectedClientName
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Employee List ");
            console.log(data);
            this.setState({
                employeeTableList  :   data.employees, 
                isloading        :   false
            })
            var alerttype = (data.status=="1") ? "success" : "danger"
            if(data.employees.length=="0"){
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
    
    render() {
        const columnEmployee = [
            {
                dataField: 'employeeName',
                text: 'EMPLOYEE NAME',
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                editable:false,
                headerStyle : () => {
                    return { width  : "50%" };
                },
                formatter   :   (cell, row, isSelect) => {
                    if (row)
                    return (
                        <NavLink to={{pathname:"/EmployeeFileEdit",params:{data:row} }}>
                            <Button variant="secondary"
                            href="/EmployeeFileEdit"
                            >Edit</Button>
                        </NavLink>
                    );
                }
            }] 

            const selectRow = {
                mode: 'checkbox',
                clickToSelectAndEditCell: true,
                onSelect: (row, isSelect, rowIndex, e) => {
                    this.state.employeeTableList.map(function(item,i){
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
            };

        return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>201 FILES</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeClientList}
                                                options={this.state.clientAutocomplete}
                                                placeholder="SELECT CLIENT"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeeName}
                                                options={this.state.employeeNameAutocomplete}
                                                placeholder="SELECT EMPLOYEE NAME"
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    {/* <Form.Row>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='middleName'
                                                id="basic-example"
                                                onChange={this.onChangeMiddleName}
                                                options={this.state.middleNameAutocomplete}
                                                placeholder="Select Middle Name"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='lastName'
                                                id="basic-example"
                                                onChange={this.onChangeLastName}
                                                options={this.state.lastNameAutocomplete}
                                                placeholder="Select Last Name"
                                            />
                                        </Form.Group>
                                    </Form.Row> */}
                                    
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button className="ml-auto" variant="success"  onClick={this.handleSearchClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        {/* <Button variant="success">
                                            Clear Filter
                                        </Button>&nbsp;&nbsp; */}
                                        {/* <NavLink to="/EmployeeFileEdit">
                                            <Button  variant="primary" variant="success">
                                                Create 
                                            </Button>
                                        </NavLink> */}
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">Record</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.employeeTableList }
                                            columns = { columnEmployee }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ rowEvents }
                                            selectRow = { selectRow }

                                        />
                                    </div>
                                        
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                <NoserLoading show={this.state.isloading} />
            </div> 
            
        )
    }
}

export default EmployeeFile;