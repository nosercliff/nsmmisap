import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class ClientEndorsement extends Component {
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

            selectedTinNo               :   "",
            selectedStatusId            :   "",
            selectedProfileId           :   "",
            selectedPositionId          :   "",
            selectedApplicationFormNo   :   "",

            clientEndorsementList   :   [],
            tblReferencesArrLst     :   [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        this.GetPosition();
        this.getStatus();
        this.getResponse();
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
        this.setState({
            isshow  :   false,
        })
        this.GetApplicationFormFilterData()
       
    }

    GetApplicationFormFilterData(){
        this.setState({isloading:true})

        const sectionSearchParams = {
            "IpAddress" :   "0.0.0.0",
            "ClientId"  :   this.state.selectedClientId,
            "UserId"    :   this.state.userinfo.userId,
            "TypeId"    :   "5",
        };

        console.log("Submit Search Params")
        console.log(sectionSearchParams)

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationFormFilter",  sectionSearchParams)
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

        this.setState({isloading:false,})
    }

    handleChangeApplicationReferenceNo = (e) => {
        if (e.length == 0) {
            this.setState({selectedProfileId:''})
            return
        }
        this.state.selectedProfileId =e[0].referenceNo
        console.log("this.state.selectedProfileId");
        console.log(this.state.selectedProfileId);
    }

    handleChangeTin = (e) => {
        if (e.length == 0) {
            this.setState({selectedTinNo:''})
            return
        }
        this.state.selectedTinNo = e[0].tinNumber
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

    handleSearchClick = () => {

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
        
        this.setState({isloading:true})
        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.selectedClientId,
            "UserId"            :   this.state.userinfo.userId,
            "ReferenceNo"       :   this.state.selectedProfileId,
            "ApplicationFormId" :   this.state.selectedApplicationFormNo,
            "StatusId"          :   this.state.selectedStatusId
        };

        console.log("Submit Search Params")
        console.log(searchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetEndorsements",  searchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Endorsements List Search")
                console.log(data)
                this.setState({
                    clientEndorsementList  :   data.endorsements,
                    memberNameAutocomplete  :   data.endorsements,
                    isloading               :   false,
                })
                if(data.status=="0"){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
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

    getResponse() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "0010"
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDataReferences",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            //////console.log("Get Response");
            //////console.log(data);
            for (let i = 0; i < data.dataReferences.length; i++) {
                const obj = {
                    value : data.dataReferences[i]["id"],
                    label : data.dataReferences[i]["name"],
                };
                this.state.tblReferencesArrLst.push(obj);
            }
        })
        .catch(error=>{
            this.setState({
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
        
        const columnClientEndorsement = [
            {
                dataField: 'client',
                text: 'Client',
                editable:true,
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'memberName',
                text        : 'Full name',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'referenceNo',
                text        : 'Client Endorsement No',
                editable:true,
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'attention',
                text        : 'Attention',
                editable:true,
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'responseId',
                text        : 'Response',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                },
                formatter: (cell, row) => {
                    if(row.responseId!='' && row.responseId!=null){
                        return this.state.tblReferencesArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblReferencesArrLst
                }
            },
            {
                dataField   : 'status',
                text        : 'Status',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'remarks',
                text        : 'Remarks',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.clientEndorsementList.map(function(item,i){
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
                            <Card.Header>RECRUITMENT >> CLIENT ENDORSEMENT</Card.Header>
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
                                    <ButtonToolbar >
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/clientendorsementscreate" >
                                            <Button  variant="success">
                                                Create
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">Record</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.clientEndorsementList }
                                            columns = { columnClientEndorsement }
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
                                    </div>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleUpdateClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/home">
                                            <Button variant="danger" href="/home" style={{minWidth:'60px'}}>
                                                Close
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default ClientEndorsement
