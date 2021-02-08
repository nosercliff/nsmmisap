import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class DepartmentSection extends Component {
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

            codeAutocomplete                :   [],
            descriptionAutocomplete         :   [],
            sectionList                     :   [],
            newSectionList                  :   [],
            selectedCode                    :   '',
            selectedDescription             :   '',
        }
    }
    

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetSectionCode();
        this.handleSearchClick();

    }

    GetSectionCode() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSections",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Section Code");
            console.log(data);
            this.setState({ codeAutocomplete: data.sections });
         })
    }

    handleEventCode = (e) => {
        if (e.length > 0) {
            this.state.selectedCode = e[0].code
        } else {
            this.state.selectedCode = ""
        }
        console.log(this.state.selectedCode)
        this.GetDescription()
    }

    GetDescription() {
        const sectionCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };
        console.log("Params Description")
        console.log(sectionCodeParams)

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSections",  sectionCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Section Description");
            console.log(data);
            this.setState({
                descriptionAutocomplete : data.sections
            });
         })
    }

    handleEventDescription = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedDescription = e[0].name
        } else {
            this.state.selectedDescription = ""
        }
    }

    handleSearchClick = event => {
        this.setState({isloading:true})

        const sectionSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   this.state.selectedCode,
            "Name"          :   this.state.selectedDescription
        };

        console.log("Submit Search Params")
        console.log(sectionSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSections",  sectionSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Section List")
                console.log(data)
                this.setState({
                    sectionList :   data.sections,
                    isloading   :   false,
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
        this.setState({
            newSectionList  :   [],
            isloading       :   true
        })

        for (let i = 0; i < this.state.sectionList.length; i++) {
            if (this.state.sectionList[i]["isModified"] == 1) {
                const obj = {
                    Id          :   this.state.sectionList[i]["id"],
                    Code        :   this.state.sectionList[i]["code"],
                    Name        :   this.state.sectionList[i]["name"],
                    IsDeleted   :   this.state.sectionList[i]["isDeleted"].toString()
                };

                this.state.newSectionList.push(obj);
            }
        }

        const editDepartmentParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Sections"      :   this.state.newSectionList
        };

        console.log("Submit Edit Params")
        console.log(editDepartmentParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditSection", editDepartmentParams)
            .then(res => {
                const data = res.data;
                sleep(5000).then(() => {
                    this.setState({
                        isloading   :   false
                    })
                })
                this.refreshPage();
                if(data.status=="1"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
                    });
                }
                else{
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    })
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

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.sectionList.length; i++) {
            if (this.state.sectionList[i]["isModified"] == 1) {
                this.setState({
                    isGridDataChanged   :   true
                })
                isChanged   =   true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        console.log(id)
        this.state.sectionList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }


    refreshPage(){
        this.setState({isloading:true})

        const sectionSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };

        console.log("Submit Search Params")
        console.log(sectionSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSections",  sectionSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Section List")
                console.log(data)
                this.setState({
                    sectionList     :   data.sections,
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
        const columnSection = [
            {
                dataField   :   'code',
                text        :   'Code',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                  }
            },
            {
                dataField   :   'name',
                text        :   'Name',
                editable:true,
                headerStyle : () => {
                    return { width  : "85%" };
                  }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.sectionList.map(function(item,i){
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
                <Container className="mt-5">
                    <Card>
                        <Card.Header className='login-card'>Section</Card.Header>
                        <Card.Body>
                            <div>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <Typeahead
                                                labelKey='code'
                                                id="basic-example"
                                                onChange={this.handleEventCode}
                                                options={this.state.codeAutocomplete}
                                                placeholder="Select Section Code"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleEventDescription}
                                                options={this.state.descriptionAutocomplete}
                                                placeholder="Select Section Description"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" style={{minWidth:'60px'}} onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/DepartmentSectionCreate">
                                                    <Button  variant="primary" variant="success" style={{minWidth:'60px'}}>
                                                        Create
                                                    </Button>
                                                </NavLink>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <div className="mt-5">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.sectionList }
                                            columns = { columnSection }
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
                                        <ButtonToolbar sm={12}>
                                            <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleSaveClick}>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            <NavLink to="/home">
                                                <Button variant="danger" href="/home" style={{minWidth:'60px'}}>
                                                    Close
                                                </Button>
                                            </NavLink>
                                        </ButtonToolbar>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default DepartmentSection