import {
    Col, Row, Card, Form, 
    Alert, axios, Noser, Type,
    React,Component, BootstrapTable,
    paginationFactory, cellEditFactory,
    Button, ButtonToolbar, Container,  
    Typeahead, Banner, moment, NavLink, 
    AppConfiguration, NoserLoading, 
    CSVExport, ToolkitProvider
}
from '../../../noser-hris-component';

class GenerateDTR extends Component {

    constructor() {
        super()
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            selected: [],
            clientList:[],
            payperiodList:[],
            selectedClient:"",
            selectedPayperiod:"",
            selectedClientId: "0",
            selectedPayperiodId: "0",
            selectedPayperiodId: "",
            getEmployeeList: [],
            employeePayrollListGrid: [],
            locationList    :   [],
        }
    }

     searchGenerateDTR = () => {
                const clientParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":this.state.selectedClientId,
                    "UserId":this.state.userinfo.userId,
                    "PayPeriodId": this.state.payPeriodSelectedId
            }
            axios
                .post(
                    AppConfiguration.Setting().noserapiendpoint + "Payroll/GetEmployeePayrolls", clientParams
                )
                .then(res => {
                    const data = res.data;
                    console.log("Get Employee Payrolls");
                    console.log(data);
                    this.setState({employeePayrollListGrid: data.payrolls, isloading:false})
                })
    }

    componentDidMount() {
        this.setState({isloading:true})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient()
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
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
                .then(res => {
                    const data = res.data;  
                    /* console.log("Client List") */
                    console.log(res.data)
                    this.setState({clientList : data.clients, isloading:false})
                })
    }



    handleChangeClient = (e) => {

        if(e.length==0)
        {
            this.setState({
                selectedClientId   :   '',
                selectedClientName   :   ''
            })
            return
        }
        this.state.selectedClientName = e[0].name
        this.state.selectedClientId= e[0].id

       /*  this.getClientLocation(); */
        this.getEmployees();
        this.GetPayPeriodList()
    }
    
    /* getClientLocation(){
        this.setState({isloading:true})

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClientName,
            "City": "",
            "Province": "",
            "Region": ""
    
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
        .then(res => {
            const data = res.data;
            console.log("Client Location");
            console.log(data);
            this.setState({locationList : res.data.locations ? res.data.locations : [], isloading:false})
            if(data.locations.length=="0"){
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
    }

    onChangeLocation = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedLocationId   :   '',
                selectedLocationName   :   ''
            })
            return
        }
        this.state.selectedLocationName = e[0].name
        this.state.selectedLocationId= e[0].id
    } */

    onChangePayPeriod = (e) => {

        if(e.length == 0) {
            this.state.payPeriodSelectedId = ""
            this.state.selectedPayPeriodName = ""
            return
        } 

        this.state.payPeriodSelectedId = e[0].periodId
        this.state.selectedPayPeriodName = e[0].payPeriod
        console.log("selectedPayPeriodName : " + this.state.selectedPayPeriodName)
        console.log("payPeriodSelectedId : " + this.state.payPeriodSelectedId)
    }

    getEmployees(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeName":"",
            "EmployeeNo":"",
            "ClientName":""
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees", getParams)
        .then(res => {
            /* console.log("Employee List "); */
            console.log(res.data);
            const data = res.data
            /* if(data.status=="1")
                this.setState({getEmployeeList : data.employees}) 
            else
                this.setState({getEmployeeList : [], getEmployeeNoList : [],isloading:false})  */
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alerttype:"Error! ", 
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
        
    }
    
    GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":"",
            "IsProcessed":"0"
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get Payroll Periods")
                console.log(data.payrollPeriods)
                this.setState({payperiodList: data.payrollPeriods})
                //console.log("data.employees list count: " + this.state.employeeList.length)
            })
    }
    handleGenerateClick = event => {
        this.setState({isloading:true})

        const generateParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "PayPeriodId":this.state.payPeriodSelectedId,
            "LocationId": ""
        };

        console.log(generateParams)

            axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GenerateBillableHours",  generateParams)
            .then(res => {
                const data = res.data;
                    console.log(data)
                    var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isloading:false,
                        alerttype:(data.status=="1") ? "Success! " : "Error! ",
                        isshow:true,
                        color:alertType,
                        message:data.message ,
                        fade:true
                    });
            })
            .catch(error=>{
            this.setState(
                {
                isloading:false,
                alerttype:"Error! ",
                isshow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })
        })

    }

    render() {

        const generateDTRColumn = [
            { dataField: 'memberName', text: 'MEMBER NAME' },
            { dataField: 'payCardTypeId', text: 'PAYCARD TYPE ID' },
            { dataField: 'hc', text: 'HC'},
            { dataField: 'basicRate', text: 'BASIC RATE'},
            { dataField: 'colaRate', text: 'COLA RATE'},
            { dataField: 'seaRate', text: 'SEA RATE' },
            { dataField: 'basicPayDays', text: 'BASIC PAY DATE'},
            { dataField: 'basicPayHrs', text: ' BASIC PAY HRS'},
            { dataField: 'basicPayAmount', text: 'BASIC PAY AMOUNT'},
            { dataField: 'colaDays', text: ' COLA DAYS'},
            { dataField: 'colaAmount', text: 'COLA AMOUNT'},
            { dataField: 'seaDays', text: 'SEA DAYS'},
            { dataField: 'seaAmount', text: 'SEA AMOUNT'},
            { dataField: 'lateMins', text: 'LATE MINS '},
            { dataField: 'lateAmount', text: 'LATE AMOUNT'},
            { dataField: 'undertimeMins', text: 'UNDERTIME MINS.'},
            { dataField: 'undertimeAmount', text: 'UNDERTIME AMOUNT'},
            { dataField: 'absentDays', text: 'ABSENT DAY'},
            { dataField: 'absentAmount', text: 'ABSENT AMOUNT' },
            { dataField: 'netRegularPay', text: 'NET REGULAR PAY'},
            { dataField: 'totalPremiums', text: 'TOTAL PREMIUMS' },
            { dataField: 'grossPay', text: 'GROSS PAY'},
            { dataField: 'totalInclusions', text: 'TOTAL INCLUSIONS' },
            { dataField: 'totalGrossPay', text: 'TOTAL GROSS PAY'},
            { dataField: 'totalDeductions', text: 'TOTAL DEDUCTIONS' },
            { dataField: 'netPay', text: 'NET PAY'},
            { dataField: 'mlCharged', text: 'ML CHARGED' },
            { dataField: 'actualNetPay', text: 'ACTUAL NET PAY'},
            { dataField: 'remarks', text: 'REMARKS' },
            { dataField: 'premiuM_ND', text: 'PREMIUM ND'},
            { dataField: 'premiuM_OT', text: 'PREMIUM OT' },
            { dataField: 'premiuM_NDOT', text: 'PREMIUM NDOT'},
            { dataField: 'premiuM_DOD', text: 'PREMIUM_DOD' },
            { dataField: 'premiuM_DODOT', text: 'PREMIUM_DODOT'},
            { dataField: 'premiuM_DODND', text: 'PREMIUM_DODOT' },
            { dataField: 'premiuM_DODNDOT', text: 'PREMIUM_DODNDOT'},
            { dataField: 'premiuM_SHOL', text: 'PREMIUM_SHOL' },
            { dataField: 'premiuM_SHOLOT', text: 'PREMIUM_SHOLOT'},
            { dataField: 'premiuM_SHOLND', text: 'PREMIUM_SHOLND' },
            { dataField: 'premiuM_SHOLNDOT', text: 'PREMIUM_SHOLNDOT'},
            { dataField: 'premiuM_SHOLDOD', text: 'PREMIUM_SHOLDOD' },
            { dataField: 'premiuM_SHOLDODOT', text: 'PREMIUM_SHOLDODOT'},
            { dataField: 'premiuM_SHOLDODND', text: 'PREMIUM_SHOLDODND' },
            { dataField: 'premiuM_SHOLDODNDOT', text: 'PREMIUM_SHOLDODNDOT'},
            { dataField: 'premiuM_LHOL', text: 'PREMIUM_LHOL' },
            { dataField: 'premiuM_LHOLOT', text: 'PREMIUM_LHOLOT'},
            { dataField: 'premiuM_LHOLND', text: 'pREMIUM_LHOLND' },
            { dataField: 'premiuM_LHOLNDOT', text: 'PREMIUM_LHOLNDOT'},
            { dataField: 'premiuM_LHOLDOD', text: 'PREMIUM_LHOLDOD' },
            { dataField: 'premiuM_LHOLDODOT', text: 'PREMIUM_LHOLDODOT'},
            { dataField: 'premiuM_LHOLDODND', text: 'PREMIUM_LHOLDODND' },
            { dataField: 'premiuM_LHOLDODNDOT', text: 'PREMIUM_LHOLDODNDOT'},
            { dataField: 'premiuM_LHOLSHOL', text: 'PREMIUM_LHOLSHOL' },
            { dataField: 'premiuM_LHOLSHOLOT', text: 'PREMIUM_LHOLSHOLOT'},
            { dataField: 'premiuM_LHOLSHOLND', text: 'PREMIUM_LHOLSHOLND' },
            { dataField: 'premiuM_LHOLSHOLNDOT', text: 'PREMIUM_LHOLSHOLNDOT'},
            { dataField: 'premiuM_LHOLSHOLDOD', text: 'PREMIUM_LHOLSHOLDOD' },
            { dataField: 'premiuM_LHOLSHOLDODOT', text: 'PREMIUM_LHOLSHOLDODOT'},
            { dataField: 'premiuM_LHOLSHOLDODND', text: 'PREMIUM_LHOLSHOLDODND' },
            { dataField: 'premiuM_LHOLSHOLDODNDOT', text: 'PREMIUM_LHOLSHOLDODNDOT'},
            { dataField: 'premiuM_VACATIONLEAVE', text: 'PREMIUM_VACATIONLEAVE' },
            { dataField: 'premiuM_SICKLEAVE', text: 'PREMIUM_SICKLEAVE'},
            { dataField: 'premiuM_PATERNITYLEAVE', text: 'PREMIUM_PATERNITYLEAVE' },
            { dataField: 'inclusioN_MA_NOOFDAYS', text: 'INCLUSION_MA_NOOFDAYS'},
            { dataField: 'inclusioN_MA_AMOUNT', text: 'INCLUSION_MA_AMOUNT' },
            { dataField: 'inclusioN_DA_NOOFDAYS', text: 'INCLUSION_DA_NOOFDAYS'},
            { dataField: 'inclusioN_DA_AMOUNT', text: 'INCLUSION_DA_AMOUNT' },
            { dataField: 'inclusioN_SPA_NOOFDAYS', text: 'INCLUSION_SPA_NOOFDAYS'},
            { dataField: 'inclusioN_SPA_AMOUNT', text: 'INCLUSION_SPA_AMOUNT' },
            { dataField: 'inclusioN_TL_NOOFDAYS', text: 'INCLUSION_TL_NOOFDAYS'},
            { dataField: 'inclusioN_TL_AMOUNT', text: 'INCLUSION_TL_AMOUNT' },
            { dataField: 'inclusioN_HP_NOOFDAYS', text: 'INCLUSION_HP_NOOFDAYS'},
            { dataField: 'inclusioN_HP_AMOUNT', text: 'INCLUSION_HP_AMOUNT' },
            { dataField: 'inclusioN_ALLOWANCE_AMOUNT', text: 'INCLUSION_ALLOWANCE_AMOUNT'},
            { dataField: 'inclusioN_SL_AMOUNT', text: 'INCLUSION_SL_AMOUNT' },
            { dataField: 'inclusioN_GM_AMOUNT', text: 'INCLUSION_GM_AMOUNT'},
            { dataField: 'inclusioN_SG_AMOUNT', text: 'INCLUSION_SG_AMOUNT' },
            { dataField: 'inclusioN_PA_AMOUNT', text: 'INCLUSION_PA_AMOUNT'},
            { dataField: 'inclusioN_LBC_AMOUNT', text: 'LHOT/SHOL/DOD/ND-DAYS' },
            { dataField: 'inclusioN_BDAY_AMOUNT', text: 'INCLUSION_BDAY_AMOUNT'},
            { dataField: 'inclusioN_TRANSPO_AMOUNT', text: 'INCLUSION_TRANSPO_AMOUNT' },
            { dataField: 'inclusioN_WER_AMOUNT', text: 'INCLUSION_WER_AMOUNT'},
            { dataField: 'inclusioN_LOAD_AMOUNT', text: 'INCLUSION_LOAD_AMOUNT' },
            { dataField: 'inclusioN_MRP_AMOUNT', text: 'INCLUSION_MRP_AMOUNT'},
            { dataField: 'inclusioN_OPUP_ADJ', text: 'INCLUSION_OPUP_ADJ' },
            { dataField: 'deductioN_SSS_EE', text: 'DEDUCTION_SSS_EE'},
            { dataField: "deductioN_PHIC_EE" ,text:"DEDUCTION_PHIC_EE"},
            { dataField: 'deductioN_HDMF_EE', text: 'DEDUCTION_HDMF_EE' },
            { dataField: 'deductioN_SSS_LOAN', text: 'DEDUCTION_SSS_LOAN'},
            { dataField: 'deductioN_HDMF_LOAN', text: 'DEDUCTION_HDMF_LOAN' },
            { dataField: 'deductioN_COOP_LOAN', text: 'DEDUCTION_COOP_LOAN'},
            { dataField: 'deductioN_NRF', text: 'DEDUCTION_NRF' },
            { dataField: 'deductioN_AAP', text: 'DEDUCTION_AAP'},
            { dataField: 'deductioN_CBU', text: 'DEDUCTION_CBU' },
            { dataField: 'deductioN_EMPLOYEE_CHARGES', text: 'DEDUCTION_EMPLOYEE_CHARGES'},
            { dataField: 'deductioN_BANK_FEES', text: 'DEDUCTION_BANK_FEES' },
            { dataField: 'deductioN_PENALTY', text: 'DEDUCTION_PENALTY'},
            { dataField: 'deductioN_TMK', text: 'DEDUCTION_TMK' },
            { dataField: 'deductioN_PARAMOUNT_ID', text: 'DEDUCTION_PARAMOUNT_ID'},
            { dataField: 'paycarD_BDO', text: 'PAYCARD_BDO' },
            { dataField: 'paycarD_GCASH', text: 'PAYCARD_GCASH'},
            { dataField: 'paycarD_RCBC', text: 'PAYCARD_RCBC' },
            { dataField: 'paycarD_ML', text: 'PAYCARD_ML'},
            { dataField: 'paycarD_TM', text: 'PAYCARD_TM' },
            { dataField: 'paycarD_METROBANK', text: 'PAYCARD_METROBANK'},
            { dataField: 'paycarD_HOLD', text: 'PAYCARD_HOLD' },
            { dataField: 'paycarD_NOATM', text: 'PAYCARD_NOATM'},
           
        ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        const sizePerPageRenderer = ({
            options,
            currSizePerPage,
            onSizePerPageChange
            }) => (
            <div className="btn-group" role="group">
                {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                    <button
                        key={ option.text }
                        type="button"
                        onClick={ () => onSizePerPageChange(option.page) }
                        className={ `btn ${isSelect ? 'btn-primary' : 'btn-success'}` }
                    >
                        { option.text }
                    </button>
                    );
                })
                }
            </div>
            );
        const options = {
            sizePerPageRenderer
        };

        const { ExportCSVButton } = CSVExport;

        return(
            <div>
            <Banner/>
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Generate DTR</Card.Header>
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
                                            onChange={this.handleChangeClient}
                                            options={this.state.clientList}
                                            placeholder="Select Client"
                                        />
                                    </Col>
                                </Form.Group>
                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeLocation}
                                        options={this.state.locationList}
                                        placeholder="Select Branch"
                                    />
                                </Col>
                            </Form.Group> */}
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Typeahead
                                        labelKey='payPeriod'
                                        id="basic-example"
                                        onChange={this.onChangePayPeriod}
                                        options={this.state.payperiodList}
                                        placeholder="Select Pay Period"
                                    />
                                    </Col>
                                </Form.Group>

                                {/* <ButtonToolbar sm={12}>
                                    <Button variant="success" className="ml-auto" onClick = { this.searchGenerateDTR }>
                                        Search
                                    </Button>
                                </ButtonToolbar> */}

                                {/* <ToolkitProvider
                                    keyField="id"   
                                    data={ this.state.employeePayrollListGrid }
                                    columns={ generateDTRColumn }
                                    exportCSV={ {
                                        fileName: "Generate Payroll " + this.state.selectedClientName+ " " +this.state.selectedPayPeriodName +".csv",
                                    } }
                                    >
                                    {
                                        props => (
                                        <div>
                                            <ExportCSVButton className="btn btn-info ml-auto" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                            <hr />
                                            <BootstrapTable
                                                { ...props.baseProps } 
                                                caption={Noser.TableHeader({title:"Payroll Loans"})}
                                                rowClasses="noser-table-row-class"
                                                striped
                                                hover
                                                condensed
                                                pagination={ paginationFactory(options) }
                                                keyField = "id"
                                                data = { this.state.employeePayrollListGrid }
                                                columns = { generateDTRColumn }
                                                //selectRow = { selectRow }
                                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                            />
                                        </div>
                                        )
                                    }
                                </ToolkitProvider> */}

                                <ButtonToolbar sm={12} className="mt-5">
                                    <Button variant="success" className="ml-auto" onClick = { this.handleGenerateClick }>
                                        Generate Billable
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/home" >
                                        Close
                                    </Button>
                                </ButtonToolbar>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        )
    }

}

export  default GenerateDTR
