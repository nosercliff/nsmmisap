import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class Inclusion extends Component {
       state = {
            selected: [],
            selectedInclusionType:"",
            selectedInclusionTypeId: "",
            inclusionTypeList: [],
            inclusionList: [],
            inclusionListGrid: [],
            newInclusionList: [],
             isLoading:true,
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            userinfo:[]
        
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetInclusionType()
        this.GetInclusion()
        sleep(1000).then(() => {
            this.setState({isLoading:false})})
    }
    GetInclusionType() {
        const typeParams = {

            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedInclusion
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", typeParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data)
                this.setState({ inclusionTypeList: data.inclusionTypes})
            })
    }

    GetInclusion() {

        const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedInclusionType, 
            "Name":this.state.selectedInclusion 
        };
        axios.post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", inclusionParams
        )
        .then(res => {
            const data = res.data;
            console.log(res.data)
            this.setState({inclusionList: data.inclusions});
        })
    }

    handleCoverChangeInclusion = (e) => {
        if (e.lenght > 0) {
            this.state.selectedInclusion = e[0].name
        }else{
            this.state.selectedInclusion = ""
        }
        
    }

    handleCoverChangeInclusionType = (e) => {
        if (e.length > 0) {
            this.state.selectedInclusionType = e[0].name
            this.state.selectedInclusionTypeId = e[0].id
        } else {
            this.state.selectedInclusionType = ""
            this.state.selectedInclusionTypeId = ""
        }
       
    }

    handleSearchClick = event => {
        this.setState({
            inclusionListGrid: [],
            newInclusionList: []
        });
        const inclusionParams = {
            "IpAddress":"0.0.0.0",
             "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedInclusionTypeId,
            "Name": this.state.selectedInclusion 
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", inclusionParams
        )
        .then(res => {
            const data = res.data;
            console.log(inclusionParams)
            this.setState({ inclusionListGrid: data.inclusions});
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

    refreshData(){
        this.setState({
            inclusionListGrid: [],
            newInclusionList: []
        });
        const inclusionParams = {
            "IpAddress":"0.0.0.0",
             "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedInclusionTypeId,
            "Name": ""
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", inclusionParams
        )
        .then(res => {
            const data = res.data;
            console.log(inclusionParams)
            this.setState({ inclusionListGrid: data.inclusions});
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

handleSaveClick = event => {
    const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
    
        this.setState({newInclusionList: [],isLoading:true})
        for (let i = 0; i < this.state.inclusionListGrid.length; i++) {
            if (this.state.inclusionListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.inclusionListGrid[i]["id"],
                    TypeId:this.state.inclusionListGrid[i]["typeId"],
                    Name: this.state.inclusionListGrid[i]["name"],
                    IsDeleted: this.state.inclusionListGrid[i]["isDeleted"].toString()
                };

                this.state.newInclusionList.push(obj);
            }
        }
        const inclusionParams = {
                "IpAddress":"0.0.0.0",
                    "ClientId":this.state.userinfo.clientId,
                    "UserId":this.state.userinfo.userId,
                    "Inclusions":this.state.newInclusionList
       };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditInclusion", inclusionParams
        )
        .then(res => {
            console.log(inclusionParams)
            const data = res.data;
            console.log(data)
            sleep(1000).then(() => {
                this.setState({isLoading:false})})
            this.refreshData();
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

    LeavePageWithoutSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.inclusionListGrid.length; i++) {
            if (this.state.inclusionListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }
    GridDataModified(oldValue, newValue,inclusionid, column) {
        this.state.inclusionListGrid.map(function(item,i){
            if(item.id===inclusionid)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        const columntype = [
           
            {
                dataField: 'typeName',
                text: 'Inclusion Type',
                editable: false
            },
            {
                dataField: 'name',
                text: 'Inclusion '
            }
        ]
       const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.inclusionListGrid.map(function(item,i){
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
              //alert(e.row);
            }
        };
   
        return(
                <div>
                    <Banner />
                        <Container className="mt-5">
                            <Card>
                                <Card.Header>Inclusion</Card.Header>
                                <Card.Body>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                    {this.state.Message}
                                </Alert>
                                    <Form>
                                    <Form.Row>
                                        <Col sm={12} >
                                       <Typeahead
                                            labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeInclusionType}
                                                options={this.state.inclusionTypeList}
                                                placeholder="Select Inclusion Type"
                                        />
                                        </Col>&nbsp;&nbsp;
                                        <Col sm={12} >
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange = { this.handleCoverChangeInclusion }
                                                options={this.state.inclusionList}
                                                placeholder="Select Inclusion"
                                            />
                                        </Col>
                                    </Form.Row>&nbsp;&nbsp;
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <ButtonToolbar>
                                                    <Button variant="primary" className="ml-auto" 
                                                    onClick={ this.handleSearchClick }>
                                                        Search
                                                    </Button>&nbsp;&nbsp;
                                                    <NavLink to="/InclusionCreate">
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
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            keyField = "id"
                                            data = { this.state.inclusionListGrid}
                                            columns = { columntype}
                                            selectRow = { selectRow }
                                            cellEdit = { cellEditFactory({
                                            mode: 'dbclick',
                                            blurToSave: true,
                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                        this.GridDataModified(oldValue, newValue, row.id, column)
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
                         <NoserLoading show={this.state.isLoading} />
                    </Container>
            </div> 
        )
    }

}

export  default Inclusion