import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class FinalInterview extends Component {
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

            clientAutocomplete	    :   [],
            memberNameAutocomplete	:   [],
            referenceNoAutocomplete	:   [],
            statusAutocomplete	    :   [],
            tblStaffingArrLst	    :   [],
            clientEndorsementList	:   [],
            tblReferencesArrLst	    :   [],
            finalInterviewList	    :   [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getFinialInterview();
        this.getClientList();
        this.getAssessedBy();
    }

    getClientList() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
            )
            .then(res => {
                const data = res.data;
                //console.log("Start Get Client")
                //console.log(data)
                //console.log("End Get Client")
                this.setState({
                clientAutocomplete  :   data.clients, 
                    isloading        :   false
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
        this.setState({
            isshow  :   false
        })
        this.getApplicationForm();
 
    }

    getApplicationForm() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.selectedClientId,
            "ReferenceNo"       :   "",
            "ApplicationFormId" :   "",
            "PositionId"        :   "",
            "StatusId"          :   ""
        }

        //console.log("Start Get Params")
        //console.log(getParams)
        //console.log("End Get Params")

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetApplicationForms", getParams
            )
            .then(res => {
                const data = res.data;
                //console.log("Start Get Application")
                //console.log(data)
                //console.log("End Get Application")
                sleep(5000).then(() => {
                    this.setState({
                        memberNameAutocomplete  :   data.applicationForms,
                        isloading	            :   false
                    })
                })
            })
    }

    onChangeMemberNameList = (e) => {
        if(e.length == 0) {
            this.state.selectedApplicationId	=   ""
            return
        }
        this.state.selectedApplicationId	    =   e[0].id
        this.getReferenceNo();
 
    }

    getReferenceNo() {
        this.setState({isloading:true})
        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.userinfo.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "ReferenceNo"       :   "",
            "ApplicationFormId" :   this.state.selectedApplicationId,
            "PositionId"        :   "",
            "StatusId"          :   ""
        };

        //console.log("Submit Search Params")
        //console.log(searchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetFinalInterviews",  searchParams)
            .then(res => {
                const data = res.data;
                //console.log("Get Final ReferenceNo List")
                //console.log(data)
                this.setState({
                    referenceNoAutocomplete     :   data.finalInterviews,
                    isloading                   :   false,
                })
                /* var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.endorsements.length=="0"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                } */
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

    onChangeReferenceNoList = (e) => {
        if(e.length == 0) {
            this.state.selectedReferenceNo	=   ""
            return
        }
        this.state.selectedReferenceNo	    =   e[0].referenceNo
 
    }


    getFinialInterview() {
        this.setState({isloading:true})
        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.userinfo.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "ReferenceNo"       :   "",
            "ApplicationFormId" :   "",
            "PositionId"        :   "",
            "StatusId"          :   ""
        };

        //console.log("Submit Search Params")
        //console.log(searchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetFinalInterviews",  searchParams)
            .then(res => {
                const data = res.data;
                //console.log("Get Final Interviews List")
                //console.log(data)
                this.setState({
                    finalInterviewList   :   data.finalInterviews,
                    isloading               :   false,
                })
                /* var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.endorsements.length=="0"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                } */
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

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.finalInterviewList.length; i++) {
            if (this.state.finalInterviewList[i]["isModified"] == 1) {
                this.setState({
                    isGridDataChanged   :   true
                })
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        //////console.log(id)
        this.state.finalInterviewList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
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
            "ClientId"          :   this.state.userinfo.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "ReferenceNo"       :   this.state.selectedReferenceNo,
            "ApplicationFormId" :   this.state.selectedApplicationId,
            "PositionId"        :   "",
            "StatusId"          :   ""
        };

        //console.log("Submit Search Params")
        //console.log(searchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetFinalInterviews",  searchParams)
            .then(res => {
                const data = res.data;
                //console.log("Get Final Interviews Table")
                //console.log(data)
                this.setState({
                    finalInterviewList  :   data.finalInterviews,
                    isloading               :   false,
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

    getAssessedBy(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetCoorEmployees", getParams)
        .then(res => {
            const data = res.data
            //console.log("Coordinator List Autocomplete");
            //console.log(data);
            for (let i = 0; i < data.employees.length; i++) {
                const obj = {
                    value : data.employees[i]["id"],
                    label : data.employees[i]["employeeName"],
                };
                this.state.tblStaffingArrLst.push(obj);
                //console.log("employeeName List Autocomplete");
                //console.log(this.state.tblStaffingArrLst);
               
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
        
        const columnFinalInterview = [
            {
                dataField: 'client',
                text: 'Client',
                headerStyle: () => {
                    return { width: "30%" };
                },
            },
            {
                dataField: 'memberName',
                text: 'Full Name',
                headerStyle: () => {
                    return { width: "20%" };
                },
            },
            {
                dataField: 'referenceNo',
                text: 'Final Interview',
                editable: false,
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            /* {
                dataField: 'position',
                text: 'Position/s Applied'
            }, */
            {
                dataField: 'assessedBy',
                text: 'Assessed By',
                headerStyle: () => {
                    return { width: "20%" };
                },
                /* formatter: (cell, row) => {
                    if(row.assessedBy!='' && row.assessedBy!=null){
                        return this.state.tblStaffingArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblStaffingArrLst
                } */
            },
            {
                dataField: 'status',
                text: 'STATUS',
                editable: false,
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'command',
                text: 'Action',
                editable: false,
                headerStyle: () => {
                    return { width: "10%" };
                },
            }
        ] 
        
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                //////console.log(this.state.rowStatusId)
                /* //////console.log("rowEvents");
                //////console.log(row.clientId);
                this.state.rowClientId = row.clientId
                //////console.log("rowEvents"); */
            }
        };

    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>RECRUITMENT >> FINAL INTERVIEWS</Card.Header>
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
                                                /* clearButton */
                                                /* multiple */
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        FULL NAME
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.onChangeMemberNameList}
                                                options={this.state.memberNameAutocomplete}
                                                /* clearButton */
                                                /* multiple */
                                            />
                                        </Col>
                                        <Col sm="2">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        REFERENCE NO
                                        </Form.Label>
                                        <Col sm="4">
                                            <Typeahead
                                                labelKey='referenceNo'
                                                id="basic-example"
                                                onChange={this.onChangeReferenceNoList}
                                                options={this.state.referenceNoAutocomplete}
                                                /* clearButton */
                                                /* multiple */
                                            />
                                        </Col>
                                    </Form.Group>
                                    <ButtonToolbar >
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/finalinterviewscreate">
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
                                            data = { this.state.finalInterviewList }
                                            columns = { columnFinalInterview }
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
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} >
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

export  default FinalInterview
