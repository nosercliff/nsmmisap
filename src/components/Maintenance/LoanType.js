import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class LoanType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            loanTypeList:[],
            loanTypeListGrid:[],
            selectedLoanType: "",
            newLoanTypeList:[],
            userinfo:[],
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
       this.GetLoanType()
       sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }

    GetLoanType() {
        const loanParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedLoanType,
            "Description": this.state.description
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes", loanParams
            )
            .then(res => {
                console.log(res.data);
                const data = res.data;
                this.setState({loanTypeList: data.loanTypes});
            })
    }
    /* handleCoverChangeDescription = (e) => {
        if (e.length > 0) {
            this.state.description = e[0].name
        } else {
            this.state.description = ""
            this.state.descriptionId = ""
        }
       
    } */
   /*  handleChange=(e) => {
        this.setState({[e.target.name]:e.target.value})
    }
     */
    handleCoverChangeLoanType =(e) => {
        if (e.length > 0){
            this.state.selectedLoanType = e[0].name
        }
        else{
            this.state.selectedLoanType = ""
        }
    }
    handleSearchClick = event => {
        this.setState({
            loanTypeListGrid:[],
            newLoanTypeList:[]
        });
        const loanParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedLoanType,
            "Description": this.state.description
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes", loanParams
            )
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({loanTypeListGrid: data.loanTypes})
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
        this.setState({newLoanTypeList: [],isLoading:true})
        this.setState({newLoanTnewLoanTypeListypeList: []})
        for (let i = 0; i < this.state.loanTypeListGrid.length; i++) {
            if (this.state.loanTypeListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.loanTypeListGrid[i]["id"],
                    Name: this.state.loanTypeListGrid[i]["name"],
                    //Description:this.state.loanTypeListGrid[i]["description"],
                    IsDeleted: this.state.loanTypeListGrid[i]["isDeleted"].toString()
                };

                this.state.newLoanTypeList.push(obj);
            }
        }

        const loanParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
                "UserId":this.state.userinfo.userId,
            "LoanTypes":this.state.newLoanTypeList,
            
        };

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditLoanType", loanParams)
            .then(res => {
                const data = res.data;
                console.log(loanParams);
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
        for (let i = 0; i < this.state.loanTypeListGrid.length; i++) {
            if (this.state.loanTypeListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, loantypeid, column) {
        console.log(loantypeid)
        this.state.loanTypeListGrid.map(function(item,i) {
            if (item.id===loantypeid)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }
render() {
    const columnloan = [
        {dataField: 'name', text: 'Loan Type'},
        {
            dataField: 'description',
            text: 'Description'
        }
    
    ]
    const selectRow = {
        mode: 'checkbox',
        clickToSelectAndEditCell: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            this.state.loanTypeListGrid.map(function(item,i){
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
                        <Card.Header>Loan Type</Card.Header>
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
                                            onChange={this.handleCoverChangeLoanType}
                                            options={this.state.loanTypeList}
                                            placeholder="Select Loan Type"
                                        />
                                    </Col>
                                </Form.Row>&nbsp;&nbsp; 
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <ButtonToolbar>
                                                <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                    Search
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/LoanTypeCreate">
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
                                        data = { this.state.loanTypeListGrid}
                                        columns = { columnloan }
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

export  default LoanType
