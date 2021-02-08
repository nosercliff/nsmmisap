import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker,  Tabs, Tab
} 
from '../../noser-hris-component';

class DeductionLedger extends Component {
    constructor(props) {
        super(props)
        this.state = {
             isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            selectedClientId: "",
           selectedClient:"",
           clientList: [],
           selectedEmployeeId: "",
           selectedEmployeeName:"",
           employeeList:[],
           employeeNoList:[],
           deductionTypeList: [],
           selectedDeductionType:"",
           selectedDeductionTypeId:"",
           selectedDeduction:"",
           selectedDeductionId:"",
           deductionList:[],
           DeductionDate: new Date(),
           amount:"",
           particular: "",
           userinfo:[],

        }
        
    }
   
 
    componentDidMount() {
        this.setState({isLoading:true,loadingText:"Loading client list..."})
    this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        this.getEmployees();
        this.getDeductionType();
        this.getDeduction();
    }

    handleChangeDeductionDate = date => {
        this.setState({
            DeductionDate: date
        });
    }
    handleChange= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
/* ********employee ******** */
   onChangeEmployeesList = (e) => {
       if(e.length==0){
           this.setState({getEmployeeListData: null, selectedEmployeeId : '',selectedEmployeeName : ''})
        
        return
       }
       this.setState({isloading:true})
       this.state.selectedEmployeeId = e[0].id
       this.state.selectedEmployeeName = e[0].employeeName
       this.state.selectedEmployeeNo = e[0].selectedEmployeeNo
       this.setState({isloading:false})
   }

    GetEmployeeId(id) {
        
        console.log("Get Employee Id");
        let GetEmployeeId = ''
        for (let i = 0; i <= this.state.EmployeeList.length; i++) {
            if (this.state.getEmployeeList[i]["id"] === id) {
                GetEmployeeId = this.state.EmployeeList[i]['id']; 
                break;
            }
        }
        return GetEmployeeId
    }
   getEmployees(){
    const getParams = {
         "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "EmployeeName":this.state.selectedEmployeeName,
        "EmployeeNo":this.state.selectedEmployeeNo,
        "ClientName":this.state.selectedClientName
    }
    axios
    .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
    .then(res => {
        const data = res.data
        console.log(res.data);
        if(data.status=="1")
            this.setState({employeeList : data.employees, employeeNoList : data.employees, isLoading:false, }) 
        else
            this.setState({employeeList : [], employeeNoList : [],isLoading:false}) 
    })
    .catch(error=>{
        this.setState(
        { 
            isLoading:false,
            alertType:"Error! ", 
            isShow:true,
            color:"danger",
            message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
            fade:true
        })  
    })
    
}
/* ********employee end******** */
    handleCoverChangeDeductionType = (e) => {
        if(e.length > 0) {
        this.state.selectedDeductionType = e[0].name
        }
        else {
            this.state.selectedDeductionType = ""
            this.state.selectedDeductionTypeId = ""
        }
    }
    getDeductionType() {
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.selectedDeductionType
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", typeParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data);
                this.setState({deductionTypeList: data.deductionTypes});
            })
    }
    handleCoverChangeDeduction = (e) => {
        if(e.length > 0) {
            this.state.selectedDeduction = e[0].name
        }
        else{
            this.state.selectedDudection = ""
            this.state.selectedDeductionId = ""
        }
    }
    getDeduction() {
        const deductionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedDeductionType, 
	        "Name":this.state.selectedDeduction 
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions", deductionParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data);
                this.setState({deductionList: data.deductions});
            })
    }
/* ***********Client******* */
    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        this.setState({isLoading:true,loadingText:"Retrieving employee list..."})
        
        this.getEmployees();
    }

    getClient() {
        const clientParams = {
             "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data);
                this.setState({clientList: data.clients})
            })
    }

    GetClientId(name) {
    console.log("Client ID List ");
    let GetClientId = ''
    for (let i = 0; i <= this.state.clientList.length; i++) {
        if (this.state.clientList[i]["name"] === name) {
            GetClientId = this.state.clientList[i]['id']; 
            console.log(GetClientId);
            break;
        }
    }
    return GetClientId
}
/* **********end client******** */



    render() {
        
            const columnledger = [
                {
                    dataField: 'date',
                    text: 'Date'
                },
                {
                    dataField: 'particular',
                    text: 'Particular Type'
                },
                {
                    dataField: 'debit',
                    text: 'Debit'
                },
                {
                    dataField: 'credit',
                    text: 'Credit'
                },
                {
                    dataField:'balance',
                    text:'Balance'
                },
            ]
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };
    const range = [
        {"date" : "01/01/2020", 
            "particular" : "Biginning Balance", 
            "debit" : "1,000.00", 
            "credit" : "2,000.00", 
            "balance" : "1,000.00", 
            },
            
    ]
   

        return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                     <Card.Header>DEDUCTION LEDGER - GENERIC</Card.Header>
                        <Card.Body>
                            <Form>
                                <Col sm={12} >
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.clientList}
                                        placeholder="Select Client"
                                    />
                                </Col>
                                <Form.Row>
                                    <Form.Group as={Col}  className="mt-3" controlId="formGridEmail">
                                        <Col sm={12} >
                                           <Typeahead
                                                labelKey='employeeName'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesList}
                                                options={this.state.employeeList}
                                                placeholder="Select Employee"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword" className="mt-3">
                                        <Col sm={12} >
                                            <Typeahead
                                                labelKey='employeeNo'
                                                id="basic-example"
                                                onChange={this.onChangeEmployeesNoList}
                                                options={this.state.employeeNoList}
                                                placeholder="Select Employee No."
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Col sm={12} >
                                           <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleCoverChangeDeductionType}
                                            options={this.state.deductionTypeList}
                                            placeholder="Select Deduction Type"
                                                /> 
                                        </Col>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
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
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Col sm={12} >
                                            <DatePicker 
                                                ref='DeductionDate'
                                                selected={this.state.DeductionDate}
                                                onChange={this.handleChangeDeductionDate}
                                                minDate={this.minDate}
                                                value={this.state.DeductionDate}
                                                dateFormat={"MM/dd/yyyy"}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                            <Col sm={12} >
                                                <Form.Control type="text" 
                                                name="amount"
                                                placeholder="Enter Amount"
                                                value={this.state.amount}
                                                onChange={this.handleChange} 
                                                autoComplete="off" />
                                            </Col>
                                        </Form.Group>
                                   
                                    </Form.Row>
                                    <Col sm={12} >
                                    <Form.Control type="text" 
                                        placeholder="Particulars" 
                                        name="particular"
                                        value={this.state.particular}
                                        onChange={ this.handleChange}
                                        autoComplete="off"/>
                                    </Col>&nbsp;&nbsp;&nbsp;
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>&nbsp;&nbsp;
                                                <ButtonToolbar>
                                                    <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                        Search
                                                    </Button>&nbsp;&nbsp;
                                                    <NavLink to="/DeductionCreate">
                                                        <Button  variant="primary" variant="success">
                                                            Add
                                                        </Button>
                                                    </NavLink>
                                                </ButtonToolbar>
                                            </Col>
                                        </Form.Group>
                                </Form>  
                                <Card.Header className="mt-5">RECORDS</Card.Header>
                                <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                                <Col sm={12} >
                                    <BootstrapTable
                                        keyField = "name"
                                        data = { range}
                                        columns = { columnledger }
                                        selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                     />
                                     </Col>
                                     <Col>
                                     <label class="font-italic" for="exampleFormControlInput1">Total Deduction<span style={{color: 'red'}}>{this.state.periodType}</span></label>
                                    </Col>
                                </Form.Group>
                                <div className="mt-2">
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick={this.onSubmitSave}>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button variant="danger" href="/banner">Close</Button>
                                    </ButtonToolbar>
                                    <Card.Header className="mt-2" > </Card.Header>
                                </div>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
            </div>
        )
    }

}



export  default DeductionLedger