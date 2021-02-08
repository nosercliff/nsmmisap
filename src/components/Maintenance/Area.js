import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class Area extends Component {
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

            areaCodeList                :   [],
            newAreaCodeList             :   [],
            selectedAreaCode            :   '',
            selectedDescription         :   '',
            areaCodeAutocomplete        :   [],
            descriptionAutocomplete     :   [],
        }
    }
    

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetAreaCode();
        this.handleSearchClick()
    }

    GetAreaCode() {
        const areaCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAreas",  areaCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Area Code");
            console.log(data);
            this.setState({ 
                areaCodeAutocomplete    : data.areas
            });
         })
    }

    handleEventAreaCode = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedAreaCode = e[0].code
        } else {
            this.state.selectedAreaCode = ""
        }
        this.GetDescription()
    }

    GetDescription() {
        const areaCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   this.state.selectedAreaCode,
            "Name"          :   ""
        };
        

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAreas",  areaCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Area Description");
            console.log(data);
            this.setState({ 
                descriptionAutocomplete : data.areas 
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

        const areaSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   this.state.selectedAreaCode,
            "Name"          :   this.state.selectedDescription
        };

        console.log("Submit Search Params")
        console.log(areaSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAreas",  areaSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Area Code List")
                console.log(data)
                this.setState({
                    areaCodeList    :   data.areas,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.areas.length=="0"){
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
        this.setState({
            newAreaCodeList :   [],
            isLoading       :   true
        })

        for (let i = 0; i < this.state.areaCodeList.length; i++) {
            if (this.state.areaCodeList[i]["isModified"] == 1) {
                const obj = {
                    Id              :   this.state.areaCodeList[i]["id"],
                    RateTypeId      :   this.state.areaCodeList[i]["rateTypeId"],
                    Code            :   this.state.areaCodeList[i]["code"],
                    Name            :   this.state.areaCodeList[i]["name"],
                    IsDeleted       :   this.state.areaCodeList[i]["isDeleted"].toString()
                };

                this.state.newAreaCodeList.push(obj);
            }
        }

        const editAreaParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Areas"         :   this.state.newAreaCodeList
        };

        console.log("Submit Edit Params")
        console.log(editAreaParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditArea", editAreaParams)
            .then(res => {
                const data = res.data;
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
        for (let i = 0; i < this.state.areaCodeList.length; i++) {
            if (this.state.areaCodeList[i]["isModified"] == 1) {
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
        this.state.areaCodeList.map(function(item,i) {
            if (item.id === id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        const columnAreaCode = [
            {
                dataField   : 'code',
                text        : 'Code',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                  }
            },
            {
                dataField   : 'name',
                text        : 'Name',
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
                this.state.areaCodeList.map(function(item,i){
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
                        <Card.Header className='login-card'>Area</Card.Header>
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
                                                onChange={this.handleEventAreaCode}
                                                options={this.state.areaCodeAutocomplete}
                                                placeholder="Select Area Code"
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
                                                placeholder="Select Description"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" style={{minWidth:'60px'}} onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/AreaCreate">
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
                                            data = { this.state.areaCodeList }
                                            columns = { columnAreaCode }
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

export  default Area 