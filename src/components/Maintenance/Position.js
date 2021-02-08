import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class Position extends Component {
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

            sectionAutocomplete             :   [],
            departmentCodeAutocomplete      :   [],
            positionList                    :   [],
            newPositionList                 :   [],
            selectedSectionId               :   '',
            selectedDepartmentId            :   '',
            positionAutocomplete            :   [],
            selectedPositionName            :   '',

            tblSectionArrLst                :   [],
            tblDepartmentArrLst             :   []
        }
    }
    

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetSectionCode();
        this.GetDepartment();
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
            this.setState({ sectionAutocomplete : data.sections });

            for (let i = 0; i < data.sections.length; i++) {
                const obj = {
                    value : data.sections[i]["id"],
                    label : data.sections[i]["name"],
                };
                this.state.tblSectionArrLst.push(obj);
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

    handleEventSection = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedSectionId = e[0].sectionId
        } else {
            this.state.selectedSectionId = ""
        }
    }
    
    GetDepartment() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   this.state.selectedSectionId,
            "DepartmentId"  :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDepartments",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Departments Code");
            console.log(data);
            this.setState({ departmentCodeAutocomplete  : data.departments });

            for (let i = 0; i < data.departments.length; i++) {
                const obj = {
                    value : data.departments[i]["id"],
                    label : data.departments[i]["name"],
                };
                this.state.tblDepartmentArrLst.push(obj);
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

    handleEventDepartment = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedDepartmentId = e[0].departmentId
        } else {
            this.state.selectedDepartmentId = ""
        }
        this.GetPositionName();
    }

    GetPositionName() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   this.state.selectedSectionId,
            "DepartmentId"  :   this.state.selectedDepartmentId,
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Position Name");
            console.log(data);
            this.setState({ positionAutocomplete  : data.positions });
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

    handleEventPosition = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedPositionName = e[0].name
        } else {
            this.state.selectedPositionName = ""
        }
    }

    handleSearchClick = event => {
        this.setState({isloading:true})

        const positionSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   this.state.selectedSectionId,
            "DepartmentId"  :   this.state.selectedDepartmentId,
            "Name"          :   this.state.selectedPositionName
        };

        console.log("Submit Search Params")
        console.log(positionSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Positions List")
                console.log(data)
                this.setState({
                    positionList  :   data.positions,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.positions.length=="0"){
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
            newPositionList   :   [],
            isloading           :   true
        })

        for (let i = 0; i < this.state.positionList.length; i++) {
            if (this.state.positionList[i]["isModified"] == 1) {
                const obj = {
                    Id                  :   this.state.positionList[i]["id"],
                    SectionId           :   this.state.positionList[i]["sectionId"],
                    DepartmentId        :   this.state.positionList[i]["departmentId"],
                    BillingRate         :   this.state.positionList[i]["billingRate"],
                    Name                :   this.state.positionList[i]["name"],
                    IsDeleted           :   this.state.positionList[i]["isDeleted"].toString()
                };

                this.state.newPositionList.push(obj);
            }
        }
        console.log(this.state.newPositionList)

        const editPositionParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Positions"     :   this.state.newPositionList
        };

        console.log("Submit Edit Params")
        console.log(editPositionParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditPosition", editPositionParams)
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
        for (let i = 0; i < this.state.positionList.length; i++) {
            if (this.state.positionList[i]["isModified"] == 1) {
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
        console.log(id)
        this.state.positionList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }


    refreshPage(){
        this.setState({isloading:true})

        const positionSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   "",
            "DepartmentId"  :   "",
            "Name"          :   ""
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionSearchParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    positionList  :   data.positions,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.positions.length=="0"){
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


    render() {
        const columnPosition = [
            {
                dataField: 'sectionId',
                text: 'Section',
                editable    : true,
                headerStyle: () => {
                    return { width: "20%" };
                },
                formatter: (cell, row) => {
                    if(row.sectionId!='' && row.sectionId!=null){
                        return this.state.tblSectionArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblSectionArrLst
                }
            },
            {
                dataField: 'departmentId',
                text: 'Department',
                editable    : true,
                headerStyle: () => {
                    return { width: "30%" };
                },
                formatter: (cell, row) => {
                    if(row.departmentId!='' && row.departmentId!=null){
                        return this.state.tblDepartmentArrLst.find(x => x.value == cell).label;
                    }
                },
                editor: {
                    type: Type.SELECT,
                    options: this.state.tblDepartmentArrLst
                }
            },
            {
                dataField: 'name',
                text: 'Position',
                headerStyle: () => {
                    return { width: "50%" };
                  }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.positionList.map(function(item,i){
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
                        <Card.Header className='login-card'>Position</Card.Header>
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
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleEventSection}
                                                options={this.state.sectionAutocomplete}
                                                placeholder="Select Section"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleEventDepartment}
                                                options={this.state.departmentCodeAutocomplete}
                                                placeholder="Select Department"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleEventPosition}
                                                options={this.state.positionAutocomplete}
                                                placeholder="Select Position"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" style={{minWidth:'60px'}} onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/PositionCreate">
                                                    <Button  variant="primary" variant="success" style={{minWidth:'60px'}}>
                                                        Create
                                                    </Button>
                                                </NavLink>
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Group>
                                    <Card.Header>Record</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.positionList }
                                            columns = { columnPosition }
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

export  default Position