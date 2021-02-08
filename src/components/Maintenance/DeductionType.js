import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class DeductionType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            newDeductionTypeList: [],
            deductionTypeList: [],
            deductionTypeListGrid: [],
            deductionType: "",
            deductionTypeId: "",
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
    

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetDeductionType()
        sleep(1000).then(() => {
        this.setState({isLoading:false})})

    }
    GetDeductionType(){
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.deductionType
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", typeParams
        )
        .then(res => {
            const data = res.data;
            console.log("deductiontypeList");
            console.log(data);
            this.setState({deductionTypeList: data.deductionTypes});
        })
    }
   
    handleCoverChangeDeductionType = (e) => {
        console.log(e)
        if (e.length > 0) {
            this.state.deductionType= e[0].name
        }
        else {
            this.state.deductionType = ""
        }
        console.log(this.state.deductionTypeList);
        this.GetDeductionType()
    }

     handleSearchClick = event => {
        this.setState({
            deductionTypeListGrid: [],
            newDeductionTypeList: []
        });
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.deductionType
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", typeParams)
        .then(res => {
            const data = res.data;
            console.log("test");
            console.log(data);
            this.setState({deductionTypeListGrid: data.deductionTypes})
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
        this.setState({newDeductionTypeList: [],isLoading:true})
        this.setState({newDeductionTypeList: []})
        for (let i = 0; i < this.state.deductionTypeListGrid.length; i++) {
            if (this.state.deductionTypeListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.deductionTypeListGrid[i]["id"],
                    Name: this.state.deductionTypeListGrid[i]["name"],
                    IsDeleted: this.state.deductionTypeListGrid[i]["isDeleted"].toString()
                };

                this.state.newDeductionTypeList.push(obj);
            }
        }

        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "DeductionTypes":this.state.newDeductionTypeList
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditDeductionType", typeParams)
            .then(res => {
                const data = res.data;
                console.log(res.data);
                this.setState({isLoading:false})
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
        for (let i = 0; i < this.state.deductionTypeListGrid.length; i++) {
            if (this.state.deductionTypeListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, deductiontypeid, column) {
        console.log(deductiontypeid)
        this.state.deductionTypeListGrid.map(function(item,i) {
            if (item.id===deductiontypeid)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        const columndeduction = [
            {dataField: 'name', text: 'Deduction Type'},
        ]
       const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.deductionTypeListGrid.map(function(item,i){
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
                        <Card.Header>DEDUCTION TYPE</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Row>
                                    <Col sm={12} >
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleCoverChangeDeductionType}
                                            options={this.state.deductionTypeList}
                                            placeholder="Select Deduction Type"
                                        />
                                    </Col>
                                </Form.Row>&nbsp;&nbsp;
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/DeductionTypeCreate">
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
                                        data = { this.state.deductionTypeListGrid}
                                        columns = { columndeduction}
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

export  default DeductionType