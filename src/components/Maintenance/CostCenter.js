import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class CostCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo    :   [],
            isloading   :   false,
            isshow      :   false,
            alerttype   :   "",
            message     :   "",
            color       :   "",
            fade        :   true,

            code                :   '',
            description         :   '',
            selectedAreaId      :   '',
            costCenterList      :   [],
            areaAutocomplete    :   [],
            newCostCenterList   :   [],
        }
    }
    

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetAreaCode();
        this.handleSearchClick();
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
                areaAutocomplete    :   data.areas
            });
         })
    }

    handleEventArea = (e) => {
        if(e.length == 0) {
            this.state.selectedAreaId=""
            return
        }
        this.state.selectedAreaId = e[0].id
        console.log(this.state.selectedAreaId)
    }

    onChangeCode = (e) => {
        this.setState({
            code : e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    handleSearchClick = event => {
        this.setState({
            isloading   :   true})

        const areaSearchParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "AreaId"        :   this.state.selectedAreaId,
            "Code"          :   this.state.code,
            "Name"          :   this.state.description
        };

        console.log("Submit Search Params")
        console.log(areaSearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCostCenters",  areaSearchParams)
            .then(res => {
                const data = res.data;
                console.log("Get Area Code List")
                console.log(data)
                this.setState({
                    costCenterList  :   data.costCenters,
                    isloading       :   false,
                })
                var alerttype = (data.status=="1") ? "success" : "danger"
                if(data.costCenters.length=="0"){
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
        this.setState({newCostCenterList: [],isLoading:true})
        for (let i = 0; i < this.state.costCenterList.length; i++) {
            if (this.state.costCenterList[i]["isModified"] == 1) {
                const obj = {
                    Id          :   this.state.costCenterList[i]["id"],
                    AreaId      :   this.state.costCenterList[i]["areaId"],
                    Code        :   this.state.costCenterList[i]["code"],
                    Name        :   this.state.costCenterList[i]["name"],
                    IsDeleted   :   this.state.costCenterList[i]["isDeleted"].toString()
                };

                this.state.newCostCenterList.push(obj);
            }
        }

        const editCostCenterParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "CostCenters"   :   this.state.newCostCenterList
        };

        console.log("Submit Edit Params")
        console.log(editCostCenterParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditCostCenter", editCostCenterParams)
            .then(res => {
                const data = res.data;
                this.setState({isLoading:false})
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
                        fade        :true
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
        for (let i = 0; i < this.state.costCenterList.length; i++) {
            if (this.state.costCenterList[i]["isModified"] == 1) {
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
        this.state.costCenterList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    render() {
        const columnCostCenter = [
            {
                dataField   : 'areaCode',
                text        : 'Area',
                editable:true,
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
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
                    return { width  : "70%" };
                }
            }
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.costCenterList.map(function(item,i){
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
                            <Card.Header>Cost Center</Card.Header>
                            <Card.Body>
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
                                                    onChange={this.handleEventArea}
                                                    options={this.state.areaAutocomplete}
                                                    placeholder="Select Area"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Enter Code" 
                                                    ref="code"
                                                    autoComplete="off" 
                                                    name="code"
                                                    value={this.state.code}
                                                    onChange={this.onChangeCode}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Enter Description / Name" 
                                                    ref="description"
                                                    autoComplete="off" 
                                                    name="description"
                                                    value={this.state.description}
                                                    onChange={this.onChangeDescription}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <ButtonToolbar>
                                                    <Button variant="primary" className="ml-auto" style={{minWidth:'60px'}} onClick={ this.handleSearchClick }>
                                                        Search
                                                    </Button>&nbsp;&nbsp;
                                                    <NavLink to="/CostCenterCreate">
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
                                                rowClasses="noser-table-row-class"
                                                striped
                                                hover
                                                condensed
                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                keyField = "id"
                                                data = { this.state.costCenterList }
                                                columns = { columnCostCenter}
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
                            </Card.Body>
                        </Card>
                    </Container>
                <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default CostCenter 