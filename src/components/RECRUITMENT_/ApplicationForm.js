import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class ApplicationForm extends Component {
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

            clientList              :   [],
            statusList              :   [],
            positionList            :   [],
            applicationTinNo        :   [],
            applicationMemberName	:   [],
            applicationReferenceNo  :   [],
            
            applicationFormListGrid :   [],

            selectedTinNo               :   "",
            selectedStatusId            :   "",
            selectedProfileId           :   "",
            selectedPositionId          :   "",
            selectedApplicationFormNo   :   "",
            selectedReferenceNo         :   "",

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        this.GetPosition();
        this.getStatus();
    }

    getClient(){
        const clientParams = {
            "IpAddress":"0.0.0.0",
           "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }

        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
            .then(res => {
                const data = res.data;
                console.log("GetClientList");
                console.log(data); 
                this.setState({clientList : data.clients})
                
            }
        )
    
    }
    
    handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient = e[0].name
            this.state.selectedClientId = e[0].id

        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = ""
        }
        /* this.setState({
            isshow  :   false,
        }) */
        this.GetApplicationFormFilterData()
        this.GetEmployeeProfiles()

        this.setState({
            isloading:false,
            alerttype:"Warning!", 
            show:true,
            color:"warning",
            message:"Please select member name" ,
            fade:true
        });
       
    }

    GetEmployeeProfiles(){
        this.setState({
            isloading   :   true
        }) 

        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "ProfileId"     :   "",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployeeProfiles", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Employee Profile List ");
            console.log(data);
            this.setState({
                //profileTableList  :   data.employeeProfiles, 
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

    GetApplicationFormFilterData(){
        this.setState({isloading:true})

        const sectionSearchParams = {
            "IpAddress" :   "0.0.0.0",
            "ClientId"  :   this.state.selectedClientId,
            "UserId"    :   this.state.userinfo.userId,
            "TypeId"    :   "1",
        };

        //console.log("Submit Search Params")
        //console.log(sectionSearchParams)

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationFormFilter",  sectionSearchParams)
        /* .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms",  sectionSearchParams) */
        .then(res => {
            const data = res.data;
            console.log("GetApplicationFormFilter")
            console.log(data)
            this.setState({
                applicationMemberName: data.applicationForms,
                applicationReferenceNo: data.applicationForms,
                applicationTinNo: data.applicationForms,
                isloading       :   false,
            })
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

    handleChangeFullName= (e) => {
        if (e.length == 0) {
            this.setState({selectedApplicationFormNo:''})
            return
        }
        this.state.selectedApplicationFormNo =e[0].applicationFormId
        this.state.selectedProfileId   = e[0].profileId

        this.GetApplicationFormDetailsData();
        this.setState({
            isshow   :   false
        }) 
    }

     
    GetApplicationFormDetailsData(){
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
                employeeList    :   data,
                isloading       :   false
            })
            if(data.status=="1")
            {
                sessionStorage.setItem("applicationFormDetails", JSON.stringify(data))
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

    handleChangeApplicationReferenceNo = (e) => {
        if (e.length == 0) {
            this.setState({selectedReferenceNo:''})
            return
        }
        this.state.selectedReferenceNo =e[0].referenceNo
        console.log("this.state.selectedProfileId");
        console.log(this.state.selectedReferenceNo);
    }

    handleChangeTin = (e) => {
        if (e.length == 0) {
            this.setState({selectedTinNo:''})
            return
        }
        this.state.selectedTinNo =e[0].tinNumber
    }

    GetPosition() {
        const positionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId":"",
            "DepartmentId":"",
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionParams)
        .then(res => {
            const data = res.data;
            console.log("Get Position Name");
            console.log(data);
            this.setState({ positionList  : data.positions });
        })
        
    }

    handleChangePosition = (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedPosition = e[0].name
            this.state.selectedPositionId = e[0].id
        } else {
            this.state.selectedPosition = ""
            this.state.selectedPositionId = ""
        }
        console.log("Get Position Id");
        console.log(this.state.selectedPositionId);
    }

    getStatus(){
        const statusParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Code":"0001"
        };
    

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences", statusParams)
        .then(res => {
            const data = res.data;
            //console.log("status List ");
            //console.log(res.data);
            this.setState({
                statusList : res.data.dataReferences
            })
        })
            
    }

    handleChangeStatus =  (e) => {

        if(e.length == 0) {
            this.state.selectedStatusId=""
            return
        } 
        this.state.selectedStatusId = e[0].id
        //console.log(this.state.selectedStatusId)
    }

    handleSearchClick = event => {

        if(!this.state.selectedClientId){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Client",
                fade:true
            });
            return
        }

        if(!this.state.selectedApplicationFormNo){
            this.setState({
                isloading:false,
                alerttype:"Error!",
                isshow:true,
                color:"danger",
                message: "Please select Full Name",
                fade:true
            });
            return
        }
        
        this.setState({applicationFormListGrid:[], applicationsList:[], isloading:true})

        const applicationParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ReferenceNo":this.state.selectedReferenceNo,
            "PositionId":this.state.selectedPositionId,
            "StatusId":this.state.selectedStatusId,
            "TINNumber":this.state.selectedTinNo,
            "ApplicationFormId" : this.state.selectedApplicationFormNo,
        };
        console.log("applicationParams")
        console.log(applicationParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms",  applicationParams)
            .then(res => {
            const data = res.data;
            console.log(res.data)
            this.setState({applicationFormListGrid: data.applicationForms,  isloading:false})
            if(data.status=="1")
            {
                sessionStorage.setItem("applicationFormData", JSON.stringify(data))
                /* this.setState({clientId:data.clientId,userId:data.userId,employeeId:data.employeeId}) */
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

    handleSaveClick = event => {
        let applicationsList = []
        for (let i = 0; i < this.state.applicationFormListGrid.length; i++) {
            if (this.state.applicationFormListGrid[i]["isModified"] == 1) {
                let obj = this.state.applicationFormListGrid[i]
                this.state.applicationsList.push(obj);
                //console.log("save")
                //console.log(this.state.applicationsList)
            }
        }
        const formParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "applicationForms":this.state.applicationsList
        };
        //console.log("test")
        //console.log(formParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/EditApplicationForm", formParams)
             .then(res => {
                const data = res.data;
                //console.log(data)
                 this.setState({isloading:false})
                this.refreshPage();
                var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isloading:false,
                        alerttype:"Success!", 
                        show:true,
                        color:alertType,
                        message:data.message ,
                        fade:true
                    });      
             })
             .catch(error=>{
                this.setState(
                { 
                    isloading:false,
                    alerttype:"Error! ", 
                    show:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                }) 
            })    
    } 

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.applicationFormListGrid.length; i++) {
            if (this.state.applicationFormListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, applicationid, column) {
        //console.log(applicationid)
        this.state.applicationFormListGrid.map(function(item,i) {
            if (item.id===applicationid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }
    
    render() {
        
        const forms = [
            {
                dataField: 'memberName',
                text: 'FULL NAME',
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'applicationFormNo',
                text: 'REFERENCE NO.',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'client',
                text: 'CLIENT/S',
                headerStyle: () => {
                    return { width: "30%" };
                },
            },
            {
                dataField: 'position',
                text: 'POSITION/s APPLIED',
                headerStyle: () => {
                    return { width: "15%" };
                },
            },
            {
                dataField: 'status',
                text: 'STATUS',
                editable:false,
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'action',
                text: 'ACTION',
                headerStyle: () => {
                    return { width: "5%" };
                },
                editable:false,
                formatter   :   (cell, row, isSelect) => {
                    console.log("row")
                    console.log(row)
                    if(row.statusId==3)
                    return (
                        <NavLink to={{pathname:"/preliminaryinterviewcreate", }}>
                            <Button variant="link"
                            href="/preliminaryinterviewcreate"
                            >Create</Button>
                        </NavLink>
                    );
                    
                    if(row.statusId==4)
                    return (
                        <NavLink to={{pathname:"/examresultcreate",params:{data:row} }}>
                            <Button variant="link"
                            href="/examresultcreate"
                            >Create</Button>
                        </NavLink>
                        );
                    if(row.statusId==6) 
                        return (
                            <NavLink to={{pathname:"/backgroundinvestigationcreate",params:{data:row} }}>
                                <Button variant="link"
                                href="/backgroundinvestigationcreate"
                                >Create</Button>
                            </NavLink>
                        );
                    if(row.statusId==7) 
                        return (
                            <NavLink to={{pathname:"/finalinterviewcreate",params:{data:row} }}>
                                <Button variant="link"
                                href="/finalinterviewcreate"
                                >Create</Button>
                            </NavLink>
                        );
                    if(row.statusId==8) 
                        return (
                            <NavLink to={{pathname:"/jobOffercreate",params:{data:row} }}>
                                <Button variant="link"
                                href="/jobOffercreate"
                                >Create</Button>
                            </NavLink>
                        );
                    if(row.statusId==13) 
                        return (
                            <NavLink to={{pathname:"/clientendorsementcreate",params:{data:row} }}>
                                <Button variant="link"
                                href="/clientendorsementcreate"
                                >Create</Button>
                            </NavLink>
                        );
                        /* else if(row.statusId=="1") 
                        return (
                            <NavLink to={{pathname:"/ApplicationFormView",params:{data:row} }}>
                                <Button variant="secondary"
                                href="/ApplicationFormView"
                                >Edit</Button>
                            </NavLink>
                        ); */
                },
                    /* headerStyle : () => {
                        return { width  : "5%" };
                    } */
                },
                
        ] 
         
    
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.applicationFormListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
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
                            <Card.Header>RECRUITMENT >> APPLICATION FORM</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                                CLIENT
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                            FULL NAME
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.handleChangeFullName}
                                                options={this.state.applicationMemberName}
                                            />  
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                            REFERENCE NO
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='referenceNo'
                                                id="basic-example"
                                                onChange={this.handleChangeApplicationReferenceNo}
                                                options={this.state.applicationReferenceNo}
                                            /> 
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                            POSITION APPLIED
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.positionList}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                            TIN NUMBER
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='tinNumber'
                                                id="basic-example"
                                                onChange={this.handleChangeTin}
                                                options={this.state.applicationTinNo}
                                            /> 
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                            <Form.Label style={{fontWeight : "bold"}}>
                                            STATUS
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeStatus}
                                                options={this.state.statusList}
                                            />  
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/applicationformcreate">
                                                    <Button  variant="success" >
                                                        Create
                                                    </Button>
                                                </NavLink>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Card.Header className="mt-5">Application Form List</Card.Header>
                                    <div >
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.applicationFormListGrid }
                                            columns = { forms }
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
                                            rowEvents={ rowEvents }
                                            selectRow = { selectRow }
                                        />
                                        <ButtonToolbar sm={12}>
                                            <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            <NavLink to="/home">
                                                <Button variant="danger" href="/banner">
                                                    Close
                                                </Button>
                                            </NavLink>
                                        </ButtonToolbar>
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

export  default ApplicationForm 
