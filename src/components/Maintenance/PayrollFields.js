import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class PayrollFields extends Component {
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
            payrollFieldsAutocomplete           :   [],
            otherPayrollFieldsAutocomplete      :   [],
            selectedPayrollFields               :   '',
            payrollFieldsList                   :   [],
            newPayrollFieldsList                :   [],
        }
    }
    

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetPayrollFields();
        this.GetOtherPayrollFields();
    }

    GetOtherPayrollFields() {
        const otherPayrollFieldsParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
	        "TypeId"        :   "",
            "CrDr"          :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetOtherPayrollFields",  otherPayrollFieldsParams)
        .then(res => {
            const data = res.data;
            console.log("Get Other Payroll Fields");
            console.log(data);
            /* this.setState({
                otherPayrollFieldsAutocomplete    : data.payrollFields
            }); */
         })
    }

    GetPayrollFields() {
        const payrollFieldsParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPayrollFields",  payrollFieldsParams)
        .then(res => {
            const data = res.data;
            console.log("Get Payroll Fields");
            console.log(data);
            this.setState({
                payrollFieldsAutocomplete    : data.payrollFields
            });
         })
    }

    handleEventPayrollFields = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedPayrollFields = e[0].name
        } else {
            this.state.selectedPayrollFields = ""
        }
    }

    handleSearchClick = event => {
        this.setState({isloading:true})

        const payrollFieldsSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   this.state.selectedPayrollFields
        };

        console.log("Submit Search Params")
        console.log(payrollFieldsSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPayrollFields",  payrollFieldsSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Payroll Fields List")
                console.log(data)
                this.setState({
                    payrollFieldsList       :   data.payrollFields,
                    isloading               :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.payrollFields.length=="0"){
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
            newPayrollFieldsList    :   [],
            isloading               :   true
        })

        for (let i = 0; i < this.state.payrollFieldsList.length; i++) {
            if (this.state.payrollFieldsList[i]["isModified"] == 1) {
                const obj = {
                    Id              :   this.state.payrollFieldsList[i]["id"],
                    Name            :   this.state.payrollFieldsList[i]["name"],
                    IsDeleted       :   this.state.payrollFieldsList[i]["isDeleted"].toString()
                };

                this.state.newPayrollFieldsList.push(obj);
            }
        }

        const editAdminFeeParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.userinfo.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "PayrollFields"     :   this.state.newPayrollFieldsList
        };

        console.log("Submit Edit Params")
        console.log(editAdminFeeParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditPayrollField", editAdminFeeParams)
            .then(res => {
                const data = res.data;sleep(5000).then(() => {
                    this.setState({
                        isloading   :   false
                    })
                })
                this.GetPayrollFields();
                this.refreshPage();
                this.setState({
                    isLoading   :   false
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
        for (let i = 0; i < this.state.payrollFieldsList.length; i++) {
            if (this.state.payrollFieldsList[i]["isModified"] == 1) {
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
        this.state.payrollFieldsList.map(function(item,i) {
            if (item.id === id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    refreshPage(){
        this.setState({isloading:true})

        const payrollFieldsSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   ''
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPayrollFields",  payrollFieldsSearchParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    payrollFieldsList       :   data.payrollFields,
                    isloading               :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.payrollFields.length=="0"){
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
        const columnPayrollFields = [
            {
                dataField: 'name',
                text: 'Payroll Fields',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.payrollFields.map(function(item,i){
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
                            <Card.Header>Payroll Fields</Card.Header>
                            <Card.Body>
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
                                                onChange={this.handleEventPayrollFields}
                                                options={this.state.payrollFieldsAutocomplete}
                                                placeholder="Select Payroll Fields"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/PayrollFieldsCreate">
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
                                            data = { this.state.payrollFieldsList }
                                            columns = { columnPayrollFields }
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
                            </Card.Body>
                        </Card>
                    </Container>
                <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default PayrollFields 