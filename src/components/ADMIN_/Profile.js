import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class Profile extends Component {
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

            clientAutocomplete	       :   [],
            employeeNameAutocomplete   :   [],
            profileTableList           :   [],
            employeeList : [],
            employeeApplicationRecordsTableList : [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
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
                ////////console.log("GetClientList")
                ////////console.log(data)
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
            this.state.selectedClientName     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedClientName   =   e[0].name
        /* this.getEmployeeName(); */
        this.getEmployees();
 
    }

    getEmployees(){
        this.setState({ 
            isloading :   true
        })
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeName"  :   "",
            "EmployeeNo"    :   "",
            "ClientName"    :   ""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            const data = res.data
            //console.log("Get Employee List ");
            //console.log(data);
            this.setState({
                employeeNameAutocomplete  :   data.employees, 
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

    onChangeEmployeeName = (e) => {
        if(e.length == 0) {
            this.state.selectedEmployeeId       =   ""
            this.state.selectedEmployeeName     =   ""
            this.state.selectedEmployeeNo       =   ""
            return
        }
        this.state.selectedEmployeeId   =   e[0].id
        this.state.selectedEmployeeName = e[0].employeeName
        this.state.selectedProfileId   = e[0].profileId
        this.state.selectedApplicationFormId   = e[0].applicationFormId
        this.GetApplicationFormDetailsData();
        this.GetEmployeeProfiles();
 
    }
    
    GetApplicationFormDetailsData(){
        /* this.setState({
            isloading   :   true
        })  */

        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "ProfileId"     :   this.state.selectedProfileId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployeeProfileDetails", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Employee Profile List ");
            console.log(data);
            /* this.setState({
                employeeApplicationRecordsTableList  :   data.employeeApplicationRecords, 
                isloading        :   false
            }) */
            this.setState({
                employeeList : data
            })
            if(data.status=="1")
            {
                sessionStorage.setItem("employeeProfileDetails", JSON.stringify(data))
                /* this.setState({clientId:data.clientId,userId:data.userId,employeeId:data.employeeId}) */
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

    GetEmployeeProfiles(){
        this.setState({
            isloading   :   true
        }) 

        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "ProfileId"     :   this.state.selectedProfileId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployeeProfiles", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Employee Profile List ");
            console.log(data);
            this.setState({
                profileTableList  :   data.employeeProfiles, 
                isloading        :   false
            })
            if(data.status=="1")
            {
                sessionStorage.setItem("employeeProfileData", JSON.stringify(data))
                /* this.setState({clientId:data.clientId,userId:data.userId,employeeId:data.employeeId}) */
            }


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

    downloadHandleClick = (row) => {
        ////console.log("row")
        ////console.log(row)
    }

    render() {
        const columnProfile = [
            {
                text	    : 'EMPLOYEE NAME',
                editable    :   false,
                dataField   :   "employeeName",
                formatter   :   (cell, row, isSelect) => {
                    this.state.employeeName = row.employeeName
                    if (row)
                    return (
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link" onClick={e => this.downloadHandleClick(row)}
                        >{this.state.employeeName}</Button>
                    );
                },
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
                formatter   :   (cell, row, isSelect, ) => {  
                    console.log(this.state.employeeList)
                    /* if (this.state.employeeList, this.state.employeeList) */
                    return (
                        <NavLink to={{pathname:"/profileedit",params:{data:this.state.employeeList,},param:{data:this.state.profileTableList} }}>
                            <Button variant="link" style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            href="/profileedit"
                            >Edit</Button>
                        </NavLink>
                    );
                }
            }] 

            const selectRowProfile = {
                mode: 'checkbox',
                clickToSelectAndEditCell: true,
                onSelect: (row, isSelect, rowIndex, e) => {
                    this.state.profileTableList.map(function(item,i){
                        if(item.id===row.id)
                        {
                            item.isDeleted = isSelect ? "1" : "0"
                            item.isModified = isSelect ? "1" : "0"
                        }
                    })
                }
            };
    
            const rowEventsProfile = {
                onClick: (e, row, rowIndex) => {
                }
            };

        return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>ADMINISTRATOR >> ADMIN >> PROFILE</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeClientList}
                                                options={this.state.clientAutocomplete}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EMPLOYEE NAME
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeeName}
                                                options={this.state.employeeNameAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Card.Header className="mt-3">Record</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.profileTableList }
                                            columns = { columnProfile }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
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
                                            rowEvents={ rowEventsProfile }
                                            selectRow = { selectRowProfile }

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

export default Profile;