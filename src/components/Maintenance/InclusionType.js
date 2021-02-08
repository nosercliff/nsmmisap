import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class InclusionType extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: [],
            newInclusionTypeList: [],
            inclusionTypeList: [],
            inclusionTypeListGrid: [],
            inclusionTypeid: "",
            inclusionType: "",
            userinfo: [],
            isLoading: true,
            AlertType: "",
            Show: false,
            Message: "",
            Color: "",
            Fade: true,
             isGridDataChanged: false

        }
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetInclusionType()
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }

    GetInclusionType() {
        const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.inclusionType
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", inclusionParams
            )
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({inclusionTypeList: data.inclusionTypes});
        })
    }

    handleCoverChangeInclusionType = (e) => {
        if(e.length > 0) {
            this.state.inclusionType = e[0].name
        }
        else{
            this.state.inclusionType = ""
        }
        console.log(this.state.inclusionType);
        this.GetInclusionType()
    }

    handleSearchClick = event => {
        this.setState({
            inclusionTypeListGrid: [],
            newInclusionTypeList: []
        });
        const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.inclusionType
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", inclusionParams
            )
            .then(res => {
                const data = res.data;
                this.setState({inclusionTypeListGrid: data.inclusionTypes})
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
            inclusionTypeListGrid: [],
            newInclusionTypeList: []
        });
        const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":""
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", inclusionParams
            )
            .then(res => {
                const data = res.data;
                this.setState({inclusionTypeListGrid: data.inclusionTypes})
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
        this.setState({newInclusionTypeList: [],isLoading:true})
        this.setState({newInclusionTypeList: []})
        for (let i = 0; i < this.state.inclusionTypeListGrid.length; i++) {
            if (this.state.inclusionTypeListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.inclusionTypeListGrid[i]["id"],
                    Name:  this.state.inclusionTypeListGrid[i]["name"],
                    IsDeleted: this.state.inclusionTypeListGrid[i]["isDeleted"].toString()
                };

                this.state.newInclusionTypeList.push(obj);
            }
        }

        const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "InclusionTypes":this.state.newInclusionTypeList
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditInclusionType", inclusionParams)
            .then(res => {
                const data = res.data;
                console.log(res.data)
                this.setState({isLoading:false})
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

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.inclusionTypeListGrid.length; i++) {
            if (this.state.inclusionTypeListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, inclusiontypeid, column) {
        console.log(inclusiontypeid)
        this.state.inclusionTypeListGrid.map(function(item,i) {
            if (item.id===inclusiontypeid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    render() {
        const columninclusionType = [
            {dataField: 'name', text: 'Inclusion Type'},
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.inclusionTypeListGrid.map(function(item,i){
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
                        <Card.Header>Inclusion Type</Card.Header>
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
                                    </Col>
                                </Form.Row>&nbsp;&nbsp;
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                Search
                                            </Button>&nbsp;&nbsp;
                                            <NavLink to="/InclusionTypeCreate">
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
                                        data = { this.state.inclusionTypeListGrid}
                                        columns = { columninclusionType}
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
                <NoserLoading show={this.state.isLoading} />
            </div> 
        )
    }

}

export  default InclusionType