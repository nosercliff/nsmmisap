import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class Ledger extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            selectedClientId: "",
            selectedClient:"",
            clientList: [],
            selectedEmployeeId: "",
            selectedEmployeeName:"",
            employeeList:[],
            employeeNoList:[],
            filterCoverage:"",
            ledgerTypeList:[],
            cdiList:[{"name":""}],
            dicList:[{"name":""}],
            selectedLedgerTypeId: "",
            selectedReferenceId:"",
            selectedReferenceName:"",
            placeholder:"",
            ledgerTypeListGrid:[],
            dynamicledgerPlaceholder: ""

        }
    }

    componentDidMount() {
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        //this.getEmployees();
       this. getLedgerType();
        this.GetMandatoryContributionTypes();
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
        this.setState({isloading:true})
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
            //////console.log(res.data);
            if(data.status=="1")
                this.setState({employeeList : data.employees, employeeNoList : data.employees, isloading:false, }) 
            else
                this.setState({employeeList : [], employeeNoList : [],isloading:false}) 
        })
        .catch(error=>{
            this.setState(
            { 
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade            :   true
            })  
        })
    }
    /* ********employee end******** */

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
        this.setState({isloading:true})
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
                //////console.log(res.data);
                this.setState({
                    isloading:false,
                    clientList : res.data.clients ? res.data.clients : []
                });
            })
            .catch(error=>{
                this.setState(
                { 
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade            :   true
                })  
            })
    }

    GetClientId(name) {
    let GetClientId = ''
    for (let i = 0; i <= this.state.clientList.length; i++) {
        if (this.state.clientList[i]["name"] === name) {
            GetClientId = this.state.clientList[i]['id']; 
           // ////console.log(GetClientId);
            break;
        }
    }
    return GetClientId
    }
    GetReferenceId(name) {
        let GetReferenceId = ''
        for (let i = 0; i <= this.state.dicList.length; i++) {
            if (this.state.dicList[i]["name"] === name) {
                GetReferenceId = this.state.dicList[i]['id']; 
            
                break;
            }
        }
        return GetReferenceId
    }


    onChangeResults = (e) => {
        if(e.length == 0) {
            this.state.selectedResultId=""
            return
        } 
    
            this.state.selectedResultId = e[0].id
            //console.log(this.state.selectedResultId);
            this.setState({isloading:false})

    }

    /* **********end client******** */
    onSubmitSearch = (e) => {
        e.preventDefault();
        this.setState({isloading:true})
            const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.state.selectedEmployeeId ,
            "LedgerTypeId":this.state.selectedTypeLedgerId,
            "ReferenceId":this.state.selectedResultId,
            };
            //console.log("Submit Search Params")
            //console.log(typeParams);
            axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Payroll/GetPayrollLedgers", typeParams
                )
                .then(res => {
                    const data = res.data;
                    console.log(data)
                    this.setState({
                        ledgerTypeListGrid: data.ledgers,
                        isloading       :   false,
                    });
                    if(data.ledgers.length=="0"){
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

    GetMandatoryContributionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", getParams)
        .then(res => {
           // ////console.log("Get Deductions Types()")
           // ////console.log(res.data)
        })
    } 
    getLedgerType(){
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLedgerTypes", typeParams)
            .then(res => {
                ////console.log("getledger")
                ////console.log(res.data)
                const resultData = res.data
                const data = res.data;
                this.setState({ledgerTypeList : data.ledgerTypes})
        })
    }
    onChangeLedgertype = (selectedOptions) => {
        this.setState({isloading:true})
        if(selectedOptions.length == 0) {
            this.state.selectedTypeLedgerId = ""
            return
        } 
            this.state.selectedTypeLedgerId = selectedOptions[0].id

        var url = "";
        var coverage = "";
        if(selectedOptions.length==0) return;
        coverage = selectedOptions[0].name
        this.setState({ filterCoverage: coverage });
        if(selectedOptions[0].id==1)
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetMandatoryContributionTypes";

        if(selectedOptions[0].id==2)
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes";

        if(selectedOptions[0].id==3){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes";
        }

        if(selectedOptions[0].id==4){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes";
        }
        const GetInclusionTypes = selectedOptions[0].id
        this.setState({selectedLedgerTypeId: GetInclusionTypes})
        ////console.log(GetInclusionTypes)

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        };

        axios
            .post(url,  getParams)
            .then(res => {
            const data = res.data;
            if(selectedOptions[0].id==1)
                this.setState({isloading   :   false, cdiList: data.contributionTypes, dynamicLedgersPlaceholder: "Select Mandatory Contributions" });
            if(selectedOptions[0].id==2)
                this.setState({isloading   :   false, cdiList: data.loanTypes, dynamicLedgersPlaceholder: "Select Employee Loans" }); 
            if(selectedOptions[0].id==3)
                this.setState({isloading   :   false, cdiList: data.inclusionTypes, dynamicLedgersPlaceholder: "Select Employee Inclusions"});
            if(selectedOptions[0].id==4)
                this.setState({isloading   :   false, cdiList: data.deductionTypes, dynamicLedgersPlaceholder: "Select Employee Deductions" });
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

    onChangeReference =(e) =>{
        if(this.state.selectedTypeLedgerId==2){
            this.setState({dynamicLedgersPlaceholder: "" });
        }
        if(this.state.selectedTypeLedgerId==2){
            this.setState({dynamicLedgersPlaceholder: "" });
        }

        if(e.length == 0) {
            this.state.selectedResultId = ""
            return
        } 
            this.state.selectedResultId = e[0].id

        var url = "";
        var selectedName = "";

        if(this.state.selectedLedgerTypeId==3){
            this.setState({isloading:true})
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions";

            const getParams = {
                "IpAddress":"0.0.0.0",
                "ClientId":this.state.userinfo.clientId,
                "UserId":this.state.userinfo.userId,
            };

            axios
                .post(url,  getParams)
                .then(res => {
                    const data = res.data;
                    this.setState({isloading   :   false, dicList: data.inclusions, dynamicledgerPlaceholder: "Select Employee Inclusions"  }); 
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

        if(this.state.selectedLedgerTypeId==4){
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions";

            const getParams = {
                "IpAddress":"0.0.0.0",
                "ClientId":this.state.userinfo.clientId,
                "UserId":this.state.userinfo.userId,
            };
            axios
                .post(url,  getParams)
                .then(res => {
                    const data = res.data;
                    this.setState({isloading   :   false, dicList: data.deductions ,dynamicledgerPlaceholder: "Select Employee Deductions" }); 
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

        /* if(e.length == 0) {
            this.state.selectedReferenceName=""
            this.state.selectedReferenceId=""
            return
        }
        this.state.selectedReferenceId = e[0].id
        this.state.selectedReferenceName = e[0].name */
    }
    GridDataModified(oldValue, newValue, locationid, column) {
        
    }
    render() {
        const columnledger = [
            {
                dataField: 'date',
                text: 'Date',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%'}},
                style:{textAlign:'center'}
            },
            {
                dataField: 'period',
                text: 'Period',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%'}},
                style:{textAlign:'center'}
            },
            {
                dataField: 'particular',
                text: 'Particular',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'25%'}},
                style:{textAlign:'left'}
            },
            {
                dataField: 'reference',
                text: 'Reference',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'25%'}},
                style:{textAlign:'left'}
            },
            {
                dataField: 'debit',
                text: 'Debit',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%'}},
                style:{textAlign:'right'}
            },
            {
                dataField: 'credit',
                text: 'Credit',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%'}},
                style:{textAlign:'right'}
            },
            {
                dataField:'balance',
                text:'Balance',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%'}},
                style:{textAlign:'right'}
            },
        ]
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: false,
        };
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                alert(e.row);
            
            }
        };
        return(
            <div>
                <Banner />
                <Container fluid>
                    <Card className="mt-5">
                     <Card.Header> Payroll >> Transaction Ledger </Card.Header>
                        <Card.Body>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row}  className="mt-3" controlId="formGridEmail">
                                    <Col sm={12} >
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.clientList}
                                            placeholder="Select Client"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formGridEmail">
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

                                <Form.Group as={Row} controlId="formGridEmail">
                                    <Col sm={4} >
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeLedgertype }
                                            options={this.state.ledgerTypeList}
                                            placeholder="Select Ledger Type"
                                        /> 
                                    </Col>
                                    <Col sm={4} >
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeReference}
                                            options={this.state.cdiList}
                                            placeholder={this.state.dynamicLedgersPlaceholder}
                                        />
                                    </Col>
                                    <Col sm={4} >
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeResults}
                                            options={this.state.dicList}
                                            placeholder={this.state.dynamicledgerPlaceholder}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>&nbsp;&nbsp;
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto" onClick={ this.onSubmitSearch }>
                                                Search
                                            </Button>&nbsp;&nbsp;
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                                <Card.Header className="mt-5">Transactions</Card.Header>
                                <Form.Group as={Row}  className="mt-2" controlId="formHorizontalEmail">
                                <Col sm={12} >
                                     <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.ledgerTypeListGrid}
                                        columns = { columnledger }
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        selectRow = { selectRow }
                                         
                                     /> 
                                     </Col> 
                                </Form.Group>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        )
    }

}



export  default Ledger