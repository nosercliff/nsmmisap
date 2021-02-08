import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class Deduction extends Component {
        state = {
            
        selected: [],
        selectedDeductionType: "",
        selectedDeductionTypeId: "",
        deductionTypeList: [],
        deductionList: [],
        deductionListGrid: [], 
        newDeductionList: [],
        isLoading:true,
        AlertType:"",
        Show:false,
        Message:"",
        Color:"",
        Fade:true,
        userinfo:[],
 
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
            "Name":this.state.selectedDeduction
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", typeParams
        )
        .then(res => {
            const data = res.data;
            console.log("deductionTypeList");
            console.log(data);
            this.setState({deductionTypeList: data.deductionTypes});
        })
    }

     GetDeduction() {
        const deductionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedDeductionTypeId, 
	        "Name":""
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions", deductionParams
        )
        .then(res => {
            const data = res.data;
            
            console.log(data);
            this.setState({deductionList: data.deductions});
        })
    }
    handleCoverChangeDeduction = (e) => {
        if (e.length > 0) {
            this.state.selectedDeduction = e[0].name
        }else {
            this.state.selectedDeduction = ""
            
        }
    }
    handleCoverChangeDeductionType = (e) => {
        if (e.length > 0) {
            this.state.selectedDeductionType = e[0].name
            this.state.selectedDeductionTypeId = e[0].id
        }
        else {
            this.state.selectedDeductionType = "" 
            this.state.selectedDeductionTypeId = ""
        }
        this.GetDeduction()
    }

    

    handleSearchClick = event => {
        this.setState({
            deductionListGrid: [],
            newDeductionList: []
        });

        const deductionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedDeductionTypeId,
            "Name":this.state.selectedDeduction
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions", deductionParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data)
                this.setState({ deductionListGrid: data.deductions });
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
            this.setState({newDeductionList: [],isLoading:true})
            for (let i = 0; i < this.state.deductionListGrid.length; i++) {
                if (this.state.deductionListGrid[i]["isModified"] == 1) {
                    const obj = {
                        Id: this.state.deductionListGrid[i]["id"],
                        TypeId: this.state.deductionListGrid[i]["typeId"],
                        Name: this.state.deductionListGrid[i]["name"],
                        IsDeleted: this.state.deductionListGrid[i]["isDeleted"].toString()
                    };

                    this.state.newDeductionList.push(obj);
                }
            }

        const deductionParams = {

            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Deductions":this.state.newDeductionList
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditDeduction", deductionParams
            )
            .then(res => {
                console.log(deductionParams)
                const data = res.data;
                console.log(res.data)
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
        for (let i = 0; i < this.state.deductionListGrid.length; i++) {
            if (this.state.deductionListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue,deductionid, column) {
        this.state.deductionListGrid.map(function(item,i){
            if(item.id===deductionid)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }



    render() {
       const columndeduction = [
           
            {
                dataField: 'typeName',
                text: 'Deduction Type',
                editable: false
            },
            {
                dataField: 'name',
                text: 'Deduction '
            }
           
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.deductionListGrid.map(function(item,i){
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
                                <Card.Header>Deduction</Card.Header>
                                <Card.Body>
                                        <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                            {this.state.Message}
                                        </Alert>
                                    <Form>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12} >
                                                <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeDeductionType}
                                                options={this.state.deductionTypeList}
                                                placeholder="Select Deduction Type"
                                                 />
                                            </Col>&nbsp;&nbsp;
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12} >
                                                <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeDeduction}
                                                options={this.state.deductionList}
                                                placeholder="Select Deduction "
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>&nbsp;&nbsp;
                                                <ButtonToolbar>
                                                    <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                        Search
                                                    </Button>&nbsp;&nbsp;
                                                    <NavLink to="/DeductionCreate">
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
                                                data = { this.state.deductionListGrid}
                                                columns = { columndeduction}
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

export  default Deduction