import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class BillingTemplate extends Component {
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
            billingTemplateAutocomplete     :   [],
            selectedBillingTemplate         :   '',
            billingTemplateList             :   [],
            newBillingTemplateList          :   [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetBillingTemplate();
    }

    GetBillingTemplate() {
        const billingTemplateParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetBillingTemplates",  billingTemplateParams)
        .then(res => {
            const data = res.data;
            console.log("Get Billing Template");
            console.log(data);
            this.setState({
                billingTemplateAutocomplete    : data.billingTemplates
            });
         })
    }

    handleEventBillingTemplate = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedBillingTemplate = e[0].name
        } else {
            this.state.selectedBillingTemplate = ""
        }
    }

    handleSearchClick = event => {
        this.setState({isloading:true})

        const billingSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   this.state.selectedBillingTemplate
        };

        console.log("Submit Search Params")
        console.log(billingSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetBillingTemplates",  billingSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Admin Fee List")
                console.log(data)
                this.setState({
                    billingTemplateList    :   data.billingTemplates,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.billingTemplates.length=="0"){
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
            newBillingTemplateList  :   [],
            isloading               :   true
        })

        for (let i = 0; i < this.state.billingTemplateList.length; i++) {
            if (this.state.billingTemplateList[i]["isModified"] == 1) {
                const obj = {
                    Id              :   this.state.billingTemplateList[i]["id"],
                    Name            :   this.state.billingTemplateList[i]["name"],
                    IsDeleted       :   this.state.billingTemplateList[i]["isDeleted"].toString()
                };

                this.state.newBillingTemplateList.push(obj);
            }
        }

        const editBillingParams = {
            "IpAddress"             :   "0.0.0.0",
            "ClientId"              :   this.state.userinfo.clientId,
            "UserId"                :   this.state.userinfo.userId,
            "BillingTemplates"      :   this.state.newBillingTemplateList
        };

        console.log("Submit Edit Params")
        console.log(editBillingParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditBillingTemplate", editBillingParams)
            .then(res => {
                const data = res.data;sleep(5000).then(() => {
                    this.setState({
                        isloading   :   false
                    })
                })
                this.GetBillingTemplate();
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
        for (let i = 0; i < this.state.billingTemplateList.length; i++) {
            if (this.state.billingTemplateList[i]["isModified"] == 1) {
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
        this.state.billingTemplateList.map(function(item,i) {
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
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetBillingTemplates",  positionSearchParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    billingTemplateList    :   data.billingTemplates,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.billingTemplates.length=="0"){
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
        const columnBillingTemplate = [
            {
                dataField: 'name',
                text: 'Billing Template',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.billingTemplateList.map(function(item,i){
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
                            <Card.Header>Billing Template</Card.Header>
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
                                                    onChange={this.handleEventBillingTemplate}
                                                    options={this.state.billingTemplateAutocomplete}
                                                    placeholder="Select Template"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <ButtonToolbar>
                                                    <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                        Search
                                                    </Button>&nbsp;&nbsp;
                                                    <NavLink to="/BillingTemplateCreate">
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
                                                data = { this.state.billingTemplateList }
                                                columns = { columnBillingTemplate }
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

export  default BillingTemplate 