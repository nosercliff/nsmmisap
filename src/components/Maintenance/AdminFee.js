import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class AdminFee extends Component {
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

            adminFeeAutocomplete    :   [],
            selectedAdminFee        :   '',
            adminFeeList            :   [],
            newAdminFeeList         :   [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetAdminFee();

    }

    GetAdminFee() {
        const areaCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAdminFees",  areaCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Admin Fee");
            console.log(data);
            this.setState({
                adminFeeAutocomplete    : data.adminFees
            });
         })
    }

    handleEventAdminFee = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedAdminFee = e[0].name
        } else {
            this.state.selectedAdminFee = ""
        }
    }

    handleSearchClick = event => {
        this.setState({isloading:true})

        const areaSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   this.state.selectedAdminFee
        };

        console.log("Submit Search Params")
        console.log(areaSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAdminFees",  areaSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Admin Fee List")
                console.log(data)
                this.setState({
                    adminFeeList    :   data.adminFees,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.adminFees.length=="0"){
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

    handleSaveClick = event => {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({
            newAdminFeeList :   [],
            isloading       :   true
        })

        for (let i = 0; i < this.state.adminFeeList.length; i++) {
            if (this.state.adminFeeList[i]["isModified"] == 1) {
                const obj = {
                    Id              :   this.state.adminFeeList[i]["id"],
                    Name            :   this.state.adminFeeList[i]["name"],
                    IsDeleted       :   this.state.adminFeeList[i]["isDeleted"].toString()
                };

                this.state.newAdminFeeList.push(obj);
            }
        }

        const editAdminFeeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "AdminFees"     :   this.state.newAdminFeeList
        };

        console.log("Submit Edit Params")
        console.log(editAdminFeeParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditAdminFee", editAdminFeeParams)
            .then(res => {
                const data = res.data;sleep(5000).then(() => {
                    this.setState({
                        isloading   :   false
                    })
                })
                this.GetAdminFee();
                this.refreshPage();
                this.setState({
                    isloading   :   false
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
                else{
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
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
        for (let i = 0; i < this.state.adminFeeList.length; i++) {
            if (this.state.adminFeeList[i]["isModified"] == 1) {
                this.setState({
                    isGridDataChanged   : true
                })
                isChanged   =   true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        console.log(id)
        this.state.adminFeeList.map(function(item,i) {
            if (item.id === id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    refreshPage(){
        this.setState({isloading:true})

        const positionSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   ''
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAdminFees",  positionSearchParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    adminFeeList    :   data.adminFees,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.adminFees.length=="0"){
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
        const columnAdminFee = [
            {
                dataField   : 'name',
                text        : 'Admin Fee',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.adminFeeList.map(function(item,i){
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
                        <Card.Header className='login-card'>Admin Fee</Card.Header>
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
                                                onChange={this.handleEventAdminFee}
                                                options={this.state.adminFeeAutocomplete}
                                                placeholder="Select Admin Fee"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/AdminFeeCreate">
                                                    <Button  variant="primary" variant="success">
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
                                            data = { this.state.adminFeeList }
                                            columns = { columnAdminFee }
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
                                            rowStyle={{ height: "45px" }}

                                        />
                                        <ButtonToolbar sm={12}>
                                            <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            <NavLink to="/home">
                                                <Button variant="danger" href="/home">
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

export  default AdminFee