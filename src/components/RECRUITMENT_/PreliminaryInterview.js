import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class PreliminaryInterview extends Component {
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
            selected: [],
            statusList:[], 
            selectedStatusId:"" ,
            selectedstatus:"",
            preliminaryListGrid:[],
            applicationList:[],
            positionList: [],
            selectedFullName:"",
            selectedFullNameId:"",
            newPreliminaryList:[],
            selectedPositionName:"",
            selectedPositionId:"",
            selectedPreliminary:"",
            selectedPreliminaryId:"",
            preliminaryList:[],
            storeOperationId:"",
            selectedProfileId:"",
            clientList: [],
            selectedClientName:"",
            selectedClientId:""
            
        }

    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getStatus();
        // this.GetPosition();
        this.getClient();
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }

    
    handleChangePosition = (e) => {
        //console.log(e)
            if (e.length > 0) {
            this.state.selectedPositionName = e[0].name
            this.state.selectedPositionId = e[0].id
        } else {
            this.state.selectedPositionName = ""
            this.state.selectedPositionId = ""
        }
    }

    handleChangeFullName= (e) => {
        //console.log(e)
            if (e.length == 0) {
                this.setState({selectedFullName: null,selectedProfileId:'',storeOperationId:''})
            return
        }
         this.state.selectedFullName = e[0].memberName
        this.state.selectedFullNameId = e[0].id
        this.state.selectedProfileId =e[0].profileId
        this.state.storeOperationId = e[0].id

        this.getApplicationForm();
        //this.GetPreliminaryInterview();
        this.setState({isloading:false,})
    }

    handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient = e[0].name
            this.state.selectedClientId = e[0].id
        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = ""
        }
        this.setState({
            isshow  :   false
        })
        /* this.getApplicationForm(); */
        this.GetPosition();
        this.GetApplicationFormFilterData();
             //this.GetPreliminaryInterview();
        //console.log(this.state.selectedClient);
       
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

    GetApplicationFormFilterData(){
        this.setState({isloading:true})

        const sectionSearchParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            /* "ProfileId":"",
            "PositionId":"",
            "StatusId":"",
            "TINNumber":"" */
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
                    preliminaryList: data.applicationForms,
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

    handleCoverChangePreliminaryInterview= (e) => {
        //console.log(e)
            if (e.length > 0) {
                this.state.selectedPreliminary = e[0].referenceNo
                this.state.selectedPreliminaryId = e[0].id
        } else {
            this.state.selectedPreliminary = ""
            this.state.selectedPreliminaryId = ""
        }
        // this.GetPreliminaryInterview();
    } 

    getApplicationForm() {

        this.setState({
            isloading:true
        })
        const applicationParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ProfileId": "",
            "PositionId":"",
            "StatusId":"3",
            "TINNumber":""
        };
        
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms",  applicationParams)
        .then(res => {
            const data = res.data;
            // //console.log("Test app");
            // //console.log(data);
            this.setState({ applicationList: data.applicationForms, isloading:false});
            /* if(data.status=="1"){
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
            } */
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

    handleChangeStatus =  (e) => {

        if(e.length == 0) {
            this.state.selectedStatusId=""
            return
        } 
        this.state.selectedStatusId = e[0].id
        console.log(this.state.selectedStatusId)
    }

    

    getClient(){
        ////console.log("getClient");
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
                    //  //console.log("Get 5");
                    // //console.log(res.data.clients); 
                    this.setState({clientList : data.clients})
                })
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
                // //console.log("status List ");
                // //console.log(res.data);
                this.setState({
                    statusList : res.data.dataReferences
                })
            })
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
        
        this.setState({preliminaryListGrid:[],newPreliminaryList:[], isloading:true})

                const preliminaryParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":this.state.selectedClientId,
                    "UserId":this.state.userinfo.userId,
                    "ProfileId":this.state.selectedProfileId,
                    "PositionId":this.state.selectedPositionId,
                    "StatusId":this.state.selectedStatusId,
                    "ReferenceNo":this.state.selectedPreliminary,
                    // "StoreOperationId":this.state.storeOperationId 
                };
                console.log(preliminaryParams)
                axios
                    .post(
                        AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetPreliminaryInterviews",  preliminaryParams
                    )
                    .then(res => {
                    const data = res.data;
                    console.log("Prelim")
                    console.log(data)
                    this.setState({ preliminaryListGrid: data.preliminaryInterviews, isloading:false});
                    /* if(data.status=="0"){
                        this.setState({
                            isloading       :   false,
                            alerttype       :   "Error!",
                            isshow          :   true,
                            color           :   "danger",
                            message         :   data.message,
                            fade            :   true
                        })
                    } */
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
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({newPreliminaryList: [],isLoading:true})

        for (let i = 0; i < this.state.preliminaryListGrid.length; i++) {
            if (this.state.preliminaryListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id:this.state.preliminaryListGrid[i]["id"],
                    ApplicationFormId:this.state.preliminaryListGrid[i]["applicationFormId"],
                    EducationalId:this.state.preliminaryListGrid[i]["educationalId"],
                    IsFreshGrad:this.state.preliminaryListGrid[i]["isFreshGrad"],
                    WorkExperienceMonths:this.state.preliminaryListGrid[i]["workExperienceMonths"],
                    WorkExperienceYears:this.state.preliminaryListGrid[i]["workExperienceYears"],
                    WithWorkExperience:this.state.preliminaryListGrid[i]["withWorkExperience"],
                    BodyBuiltId:this.state.preliminaryListGrid[i]["bodyBuiltId"],
                    HairId:this.state.preliminaryListGrid[i]["hairId"],
                    ComplexionId:this.state.preliminaryListGrid[i]["complexionId"],
                    PostureId:this.state.preliminaryListGrid[i]["postureId"],
                    PersonalityId:this.state.preliminaryListGrid[i]["personalityId"],
                    MentalId:this.state.preliminaryListGrid[i]["mentalId"],
                    WorkExperienceId:this.state.preliminaryListGrid[i]["workExperienceId"],
                    TechnicalExperienceId:this.state.preliminaryListGrid[i]["technicalExperienceId"],
                    SupportGroupId:this.state.preliminaryListGrid[i]["supportGroupId"],
                    AssessmentId:this.state.preliminaryListGrid[i]["assessmentId"],
                    Comments:this.state.preliminaryListGrid[i]["comments"],
                    RecommendationId:this.state.preliminaryListGrid[i]["recommendationId"],
                    AssessedBy:this.state.preliminaryListGrid[i]["assessedBy"],
                    StoreOperationId:this.state.preliminaryListGrid[i]["storeOperationId"],
                    IsDeleted: this.state.preliminaryListGrid[i]["isDeleted"].toString()
                };

                this.state.newPreliminaryList.push(obj);
                // //console.log(this.state.newPreliminaryList)
            }
        }
        
    const preliminaryParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "PreliminaryInterviews":this.state.newPreliminaryList
        };
        // //console.log(preliminaryParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/EditPreliminaryInterview", preliminaryParams)
            .then(res => {
                const data = res.data;
                // //console.log(data)
                this.setState({isLoading:false})
                this.refreshPage()
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

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.preliminaryListGrid.length; i++) {
            if (this.state.preliminaryListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, preliminaryid, column) {
        // //console.log(preliminaryid)
        this.state.preliminaryListGrid.map(function(item,i) {
            if (item.id===preliminaryid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    refreshPage(){
        this.setState({isloading:true})

        const sectionSearchParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":"",
            "ProfileId":"",
            "PositionId":"",
            "StatusId":"",
            "ReferenceNo":"",
            "StoreOperataionId":""
        };

        // //console.log("Submit Search Params")
        // //console.log(sectionSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetPreliminaryInterviews",  sectionSearchParams)
            .then(res => {
                const data = res.data;
                /* //console.log("Get Section List")
                //console.log(data) */
                this.setState({
                    preliminaryListGrid     :   data.preliminaryInterviews,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.sections.length=="0"){
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
    render() {
        
        const columns3 = [
            {
                dataField: 'memberName',
                text: 'FULL NAME',
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'referenceNo',
                text: 'REFERENCE NO.',
                headerStyle: () => {
                    return { width: "20%" };
                },
               
            },
            {
                dataField: 'position',
                text: 'POSITION/S APPLIED',
                headerStyle: () => {
                    return { width: "20%" };
                },
                
            },
            /* {
                dataField: 'assessedByName',
                text: 'ASSESSED BY',
                headerStyle: () => {
                    return { width: "15%" };
                },
            }, */
            {
                dataField: 'status',
                text: 'STATUS',
                headerStyle: () => {
                    return { width: "20%" };
                },               
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                headerStyle: () => {
                    return { width: "20%" };
                }, 
                
            }
        ] 
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.preliminaryListGrid.map(function(item,i){
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
                            <Card.Header>RECRUITMENT >> PRELIMINARY INTERVIEWS</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <div>
                                    {/* <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        FULL NAME
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.handleChangeFullName}
                                                options={this.state.preliminaryList}
                                                type="text" 
                                            /> 
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        PRELIMINARY INTERVIEW NO
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='referenceNo'
                                                id="basic-example"
                                                onChange={this.handleCoverChangePreliminaryInterview}
                                                options={this.state.preliminaryList}
                                                type="text" 
                                            /> 
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        POSITION APPLIED
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='positionId'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.preliminaryList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        STATUS
                                        </Form.Label>
                                        <Col sm="3">
                                            <Typeahead
                                                labelKey='statusId'
                                                id="basic-example"
                                                onChange={this.handleChangeStatus}
                                                options={this.state.preliminaryList}
                                            />  
                                        </Col>
                                    </Form.Group> */}
                                    </div>
                                        
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        CLIENT
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        FULL NAME
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.handleChangeFullName}
                                                options={this.state.preliminaryList}
                                                type="text" 
                                            />  
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        POSITION APPLIED
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.positionList}
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        STATUS
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeStatus}
                                                options={this.state.statusList}
                                            />  
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row } className="mt-3" controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to={{pathname:"/preliminaryinterviewscreate" }}>
                                                    <Button variant="success">
                                                        Create
                                                    </Button>
                                                </NavLink>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Card.Header  className="mt-5">Preliminary Interview List</Card.Header>
                                    <div >
                                        <BootstrapTable
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                            keyField = "id"
                                            data = { this.state.preliminaryListGrid }
                                            columns = { columns3}
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

export  default PreliminaryInterview
