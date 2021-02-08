import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollInclusionsModal extends Component {
    constructor(props) {
        super(props)
        this.state ={
            userinfo        :   [],
            
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            getClientList : [],
            getEmployeeList : [],
            getEmployeeNoList: [],
            selectedClientId: [],
            clientLocationList: [],
            getLoanTypesList: [],
            EffectivityMonth: new Date(),
            Month: "",
            checkIsRecurring: true,
            checkOneTimePayment: false,
            IsFirstCutOff: false,
            IsSecondCutOff: false,
            IsThirdCutOff: false,
            IsFourthCutOff: false,
            LoanTypeNumber: '',
            Amount: '',
            getInclusionTypesList: [],
            getInclusionsList: [],
            isPerDay: false,
            disableOneTimePayment: true,
            disabledFrom: false,
            disabledTo: false,
            IsRecurring: true,
            OneTimePayment: false,
            Amortization: '',
            disableAmortization: false,
            Reference : new Date(),
            Remarks : '',
            selectedInclusionTypesId: '',

            clientName  :   '',
            clientId  :   '',
            employeeName  :   '',
            employeeId  :   '',
            checkIsPerDay : false,
            disableIsPerDay : false,
        }
    }

    /* handleChangeRecurringOneTime(e){
        ////console.log(e.target.value)
        if(e.target.value == 'OneTimePayment'){
            this.setState({
                disabledFrom: true,
                disabledTo: true,
                IsRecurring: false,
            })
        } else {
            this.setState({
                disabledFrom: false,
                disabledTo: false,
            })
        }
        this.setState({
            IsRecurring: e.target.value,
            OneTimePayment: e.target.value,
        })
    } */

    handleChangeCheckboxPerDay = (e) => {
        
        this.setState({
            isPerDay: e.target.checked, 
        })
        this.state.Amortization = '0'

        if(e.target.checked == true) {
            this.setState({disableAmortization : true})
        }
        
        /* if(e.target.checked == false) {
            this.state.Amortization = this.state.Amount
            //console.log(this.state.Amount)
        } */
    }

    handleChangeCheckboxRecurring = (e) => {
        this.setState({
            checkIsRecurring: true,
            checkOneTimePayment: false,
            OneTimePayment: false,
            IsRecurring: true,
            disabledFrom: false,
            disabledTo: false,
        })
    }

    handleChangeCheckboxOneTimePayment = (e) => {
        this.setState({
            checkIsRecurring: false,
            checkOneTimePayment: true,
            IsRecurring: false,
            OneTimePayment: true,
            disabledFrom: true,
            disabledTo: true,
            Amortization : this.state.Amount,
        })
        
    }

    formatDate(date) {
        let m = moment(date, 'MMDDYYYYHHMMSS');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
      }

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getInclusionTypes();
        ////console.log("Get ser Id");
        ////console.log(JSON.parse(sessionStorage.getItem("userData")).userId)
        this.setState({
            FromDate: '',
            ToDate: '',
            Reference : moment(this.state.Reference).format('MMDDYYYYhhmmss') + JSON.parse(sessionStorage.getItem("userData")).userId
        });
        this.props.onRefInclusionModal(this)
    }
    componentWillUnmount() {
        this.props.onRefInclusionModal(undefined)
    }
    initialize=(e)=>{
        //alert("Data from Parent : ID :" + e.Id + " : " + e.Name)
        //reintialize all controls and auto complete data here
        this.setState({ isshow:false,fade:false,alerttype:"",color:"",message:"",
                        getLoanTypesList: [],
                        FromDate: '',
                        ToDate: '',
                        EffectivityMonth: new Date(),
                        Month: "",
                        checkIsRecurring: true,
                        checkOneTimePayment: false,
                        IsFirstCutOff: false,
                        IsSecondCutOff: false,
                        IsThirdCutOff: false,
                        IsFourthCutOff: false,
                        LoanTypeNumber: '',
                        Amount: '',
                        isPerDay: false,
                        disableOneTimePayment: true,
                        disabledFrom: false,
                        disabledTo: false,
                        IsRecurring: true,
                        OneTimePayment: false,
                        Amortization: '',
                        disableAmortization: false,
                        Reference : new Date(),
                        Remarks : '',
                        selectedInclusionTypesId: '',
                        selectedEmployeeId :'',
                        selectedEmployeeName :'',
                        selectedEmployeeNo :'',
                        selectedEmployeeBranch :'',
                        selectedClientId :'',
                        selectedClientName :'',
                        Reference : moment(new Date()).format('MMDDYYYYhhmmss') + JSON.parse(sessionStorage.getItem("userData")).userId
        }); 
 
        this.state.clientName      =   e.clientNameFromParent
        this.state.clientId        =   e.clientIdFromParent
        this.state.employeeName    =   e.employeeNameFromParent
        this.state.employeeId      =   e.employeeIdFromParent

        this.state.selectedEmployeePayMode      =   e.employeePayModeFromParent
        this.state.selectedEmployeePayModeId    =   e.employeePayModeIdFromParent
        this.state.selectedPayrollPeriodsId    =   e.employeePayPeriodIdFromParent
        this.state.selectedEmployeeLeadTime    =   e.employeeLeadTimeFromParent

        this.getInclusionTypes();
    }
    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
    }
    onChangeEmployeesNo(e){
        this.setState({selectedEmployeeNo : e.target.value})
        ////console.log(e.target.value)
    }

    onChangeAmortization(e){
        this.setState({Amortization : e.target.value})
    }

    onChangeEmployeeBranch(e){
        this.setState({selectedEmployeeBranch : e.target.value})
        ////console.log(e.target.value)
    }

    handleChangeEffectivityMonth = date => {
        this.setState({
            EffectivityMonth: date
        });
        ////console.log(this.state.EffectivityMonth)
    };

    handleChangeFrom = date => {
        this.setState({
            FromDate: date
        });
        ////console.log(this.state.From)
    };

    handleChangeTo = date => {
        this.setState({
            ToDate: date
        });
        ////console.log(this.state.To)
    };

    handleChangeMonth = date => {
        this.setState({
            Month: date
        });
        ////console.log(this.state.EffectivityMonth)
    };
    
    onChangeAmount = (e) => {
        const Amount = e.target.value;

        if (!Amount || Amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
        this.setState(() => ({ Amount }));
        }

        if(e.target.value!='')
        {
            if(this.state.selectedEmployeePayModeId=="1")
            {
                this.state.Amortization = (parseFloat(e.target.value) /2).toFixed(2);
            }
            else if(this.state.selectedEmployeePayModeId=="2")
            {
                this.state.Amortization = (parseFloat(e.target.value) /4).toFixed(2);
            }
            else
            {
                this.state.Amortization = e.target.value;
            }
        }
        else
        {
            this.state.Amortization = '0';
        }

        if(this.state.checkIsPerDay  == true) {
            this.state.Amortization = '0';
        }
    }
    onChangePerDay = (e) => {
        this.setState({ isPerDay: e.target.value} );
    }

    formatDate(date) {
        let m = moment(date, 'MM-DD-YYYY');
        return (m.isValid() ? (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()) : "")
      }


    /* clearData(){
        this.state.getClientList = [];
        this.state.getEmployeeList = [];
        this.state.getInclusionsList = [];
        this.state.Amount = '';
        this.state.Amortization = '';
        this.state.Remarks = '';
    } */

    onSubmitSavePayrollInclusions = () => {

       ////console.log((this.state.FromDate ? this.formatDate(this.state.FromDate) : ""))
       ////console.log((this.state.ToDate ? this.formatDate(this.state.ToDate) : ""))


        this.setState({isloading:true})
        let EffectivityMonth = moment(this.state.EffectivityMonth).format('MM/DD/YYYY');

        if(this.state.Reference == ""){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please input reference number",
                fade            :   true
            })
            return

        }

        if(!this.state.selectedInclusionsId){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "please select inclusion.",
                fade            :   true
            })
            return

        }

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.employeeId,
            "InclusionId":this.state.selectedInclusionsId,
            "Amount":this.state.Amount,
            "IsRecurring":(this.state.IsRecurring)? "1" : "0",
            "EffectivityDate":this.state.EffectivityMonth,
            "isPerDay":(this.state.isPerDay)? "1" : "0",
            "PayModeId":this.state.selectedEmployeePayModeId,
            "FromDate": (this.state.FromDate ? this.formatDate(this.state.FromDate) : ""),
            "ToDate": (this.state.ToDate ? this.formatDate(this.state.ToDate) : ""),
            "Amortization": this.state.Amortization,
            "Reference" : this.state.Reference,
            "Remarks" : this.state.Remarks,
        }

        console.log("Submit Parameters")
        console.log(getParams)
        

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/AddInclusion", getParams)
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
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

    getInclusionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", getParams)
        .then(res => {
            ////console.log("GetInclusionTypes");
            ////console.log(res.data);
            const data = res.data;
            this.setState({getInclusionTypesList : data.inclusionTypes}) 
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

    onChangeInclusionTypesList = (e) => {
        if(e.length == 0) {
            this.state.selectedInclusionTypesId = ''
            return
        }  
        this.state.selectedInclusionTypesId = e[0].id

        this.getInclusions();
    }

    onChangeInclusionsList = (e) => {
        if(e.length == 0) {
            this.state.selectedInclusionsId = []
            return
        }  
        this.state.selectedInclusionsId = e[0].id

        console.log(this.state.selectedInclusionsId)
        this.setState({
            isshow  :   false,
        })

        if(this.state.selectedInclusionsId == 17 || this.state.selectedInclusionsId == 16 || this.state.selectedInclusionsId == 15 || this.state.selectedInclusionsId == 12 || this.state.selectedInclusionsId == 11){
            this.setState({
                checkIsPerDay   : true,
                disableIsPerDay : true,
                isPerDay        : true,
                Amortization    : "0",
            })
        }else{
            this.setState({
                checkIsPerDay   : false,
                disableIsPerDay : true,
                isPerDay        : false
            })
        }

        

    }

    getInclusions(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedInclusionTypesId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", getParams)
        .then(res => {
            ////console.log("GetInclusions");
            ////console.log(res.data);
            const data = res.data;
            this.setState({getInclusionsList : data.inclusions}) 
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


    onChangeReference = (e) => {
        this.setState({ Reference: e.target.value} );
    }

    onChangeRemarks = (e) => {
        this.setState({ Remarks: e.target.value} );
    }

    IsNumeric(evt)
    {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /^\d+(.\d+)?$/;
        if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    render() {

    return(
        
            <Modal
                {...this.props}
                return
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payroll Inclusions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row}  className="mt-3" controlId="formGridEmail">
                                <Col sm={12} >
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="clientName"
                                        value={this.state.clientName}
                                        readOnly/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formGridEmail">
                                <Col sm={12} >
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="employeeName"
                                        value={this.state.employeeName}
                                        readOnly/>
                                </Col>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeInclusionTypesList}
                                        options={this.state.getInclusionTypesList}
                                        placeholder="Select Inclusion Type"

                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                        onChange={this.onChangeInclusionsList}
                                        options={this.state.getInclusionsList}
                                        placeholder="Select Inclusion"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <label class="font-italic" for="exampleFormControlInput1"><span style={{color: '#2188FC'}}>Pay Mode:</span> <span style={{color: 'red'}}>{this.state.selectedEmployeePayMode}</span></label>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Reference
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" 
                                        ref="Reference"
                                        name="Reference"
                                        value={this.state.Reference}
                                        onChange={this.onChangeReference}
                                        autoComplete="off"  
                                    />
                                </Col>

                                <Form.Label column sm="2">
                                    Remarks
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                       ref="Remarks"
                                       name="Remarks"
                                       value={this.state.Remarks}
                                       onChange={this.onChangeRemarks}
                                       autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Label >
                                       Effectivity Date
                                    </Form.Label>&nbsp;&nbsp;&nbsp;
                                    <DatePicker
                                        ref='EffectivityMonth'
                                        selected={this.state.EffectivityMonth}
                                        onChange={this.handleChangeEffectivityMonth}
                                        minDate={this.minDate}
                                        value={this.props.EffectivityMonth}
                                        dateFormat={"MM/dd/yyyy"}
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Amount"
                                            ref="Amount"
                                            name="Amount"
                                            value={this.state.Amount}
                                            onChange={this.onChangeAmount}
                                            autoComplete="off"
                                            /* onKeyPress={this.IsNumeric.bind(this)} */
                                        />
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} sm={3} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Is Per Day" 
                                        onChange={e => this.handleChangeCheckboxPerDay(e)}
                                        checked={this.state.checkIsPerDay}
                                        disabled={this.state.disableIsPerDay}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Recurring" 
                                        onChange={e => this.handleChangeCheckboxRecurring(e)}
                                        checked={this.state.checkIsRecurring}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={3} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="One Time Payment" 
                                        onChange={e => this.handleChangeCheckboxOneTimePayment(e)}
                                        checked={this.state.checkOneTimePayment}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Label >
                                        From
                                    </Form.Label>&nbsp;&nbsp;&nbsp;
                                    <DatePicker
                                        ref='FromDate'
                                        selected={this.state.FromDate}
                                        onChange={this.handleChangeFrom}
                                        minDate={this.minDate}
                                        value={this.props.FromDate}
                                        dateFormat={"MM/dd/yyyy"}
                                        disabled={this.state.disabledFrom}
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Label >
                                        To
                                    </Form.Label>&nbsp;&nbsp;&nbsp;
                                    <DatePicker
                                        ref='ToDate'
                                        selected={this.state.ToDate}
                                        onChange={this.handleChangeTo}
                                        minDate={this.minDate}
                                        value={this.props.ToDate}
                                        dateFormat={"MM/dd/yyyy"}
                                        disabled={this.state.disabledTo}
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Amount Per Cut-Off
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control
                                        type="text" 
                                        readOnly
                                        value={this.state.Amortization}
                                        onChange={this.onChangeAmortization.bind(this)}
                                        disabled={this.state.disableAmortization}
                                        onKeyPress={this.IsNumeric.bind(this)}
                                    />
                                </Col>
                            </Form.Group>

                            {/* <Form.Row>
                                <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                    <Form.Label>
                                        Pay Cut-off:
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="1st" 
                                        onChange={e => this.handleChangeCheckboxFirstCutOff(e)}
                                        disabled={this.state.disableIsFirstCutOff}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="2nd" 
                                        onChange={e => this.handleChangeCheckboxSecondCutOff(e)}
                                        disabled={this.state.disableIsSecondCutOff}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="3rd" 
                                        onChange={e => this.handleChangeCheckboxThirdCutOff(e)}
                                        disabled={this.state.disableIsThirdCutOff}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="4th"
                                        onChange={e => this.handleChangeCheckboxFourthCutOff(e)} 
                                        disabled={this.state.disableIsFourthCutOff}

                                    />
                                </Form.Group>
                            </Form.Row> */}

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.onSubmitSavePayrollInclusions }>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
        </Modal>
        );
    }

}
export  default PayrollInclusionsModal