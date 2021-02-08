import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollDeductionsModal extends Component {
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

            getLoanTypesList: [],
            EffectivityMonth: new Date(),
            Month: "",
            IsRecurring: false,
            Amount: '',
            getDeductionTypesList: [],
            getDeductionsList: [],
            isPerDay: false,
            NumberOfInstallment:'',
            disableNoOfIns: true,
            Amortozation: '0.00',
            /* Reference : new Date(), */
            Remarks : '',
            referenceDisable : false,


            clientName  :   '',
            clientId  :   '',
            employeeName  :   '',
            employeeId  :   '',
        }
    }

    handleChangeCheckboxPerDay(e) {
        this.setState({
            isPerDay: e.target.checked
        })
    }

    handleChangeCheckboxRecurring(e) {
        this.setState({
            IsRecurring     :   e.target.checked
        })
    }

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        /* this.getDeductions(); */
        this.getDeductionTypes();
        this.setState({
            disableIsFirstCutOff    :   true,
            disableIsSecondCutOff   :   true,
            disableIsThirdCutOff    :   true,
            disableIsFourthCutOff   :   true,
            Reference               :   moment(new Date()).format('MMDDYYYYhhmmss') + JSON.parse(sessionStorage.getItem("userData")).userId
        });
        this.props.onRefDeductionModal(this)
    }

    componentWillUnmount() {
        this.props.onRefDeductionModal(undefined)
    }
    initialize=(e)=>{
        //alert("Data from Parent : ID :" + e.Id + " : " + e.Name)
        //reintialize all controls and auto complete data here
        this.setState({ isshow:false,fade:false,alerttype:"",color:"",message:"",
                        getLoanTypesList: [],
                        EffectivityMonth: new Date(),
                        Month: "",
                        IsRecurring: false,
                        Amount: '',
                        getDeductionTypesList: [],
                        getDeductionsList: [],
                        isPerDay: false,
                        NumberOfInstallment:'',
                        disableNoOfIns: true,
                        Amortozation: '0.00',
                        /* Reference : new Date(), */
                        Remarks : '',
                        referenceDisable : false,
                        selectedEmployeeId : '',
                        noOfInstallment : '',
                        selectedEmployeeName : '',
                        selectedEmployeeNo : '',
                        Reference : moment(new Date()).format('MMDDYYYYhhmmss') + JSON.parse(sessionStorage.getItem("userData")).userId
        }); 
 
        this.state.clientName                   =   e.clientNameFromParent
        this.state.clientId                     =   e.clientIdFromParent
        this.state.employeeName                 =   e.employeeNameFromParent
        this.state.employeeId                   =   e.employeeIdFromParent
        this.state.selectedEmployeePayMode      =   e.employeePayModeFromParent
        this.state.selectedEmployeePayModeId    =   e.employeePayModeIdFromParent
        this.state.selectedPayrollPeriodsId    =   e.employeePayPeriodIdFromParent
        this.state.selectedEmployeeLeadTime    =   e.employeeLeadTimeFromParent
        
        if(this.state.selectedEmployeePayModeId == 1) {
            /* this.state.NumberOfInstallment = "2" */
            this.setState({
                NumberOfInstallment :   "2"
            })
        }
        if(this.state.selectedEmployeePayModeId == 2) {
            /* this.state.NumberOfInstallment = "2" */
            this.setState({
                NumberOfInstallment :   "4"
            })
        }
        //console.log("selectedEmployeePayModeId")
        //console.log(this.state.selectedEmployeePayModeId)
        this.getDeductionTypes();
    }
    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
    }


    handleTypeaheadChangeIndustry = selected => {
        const industry = selected.map(option => option.value);
        this.setState({ industry });
      };


    handleChangeEffectivityMonth = date => {
        this.setState({
            EffectivityMonth: date
        });
        ////console.log(this.state.EffectivityMonth)
    };

    handleChangeMonth = date => {
        this.setState({
            Month: date
        });
        ////console.log(this.state.EffectivityMonth)
    };

    onChangeNumberOfInstallment = (e) => {
        /* if(this.state.selectedEmployeePayModeId == 0){
            alert("Please select Employee")
            return
        } */
        if(this.state.Amount == ""){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please Enter amount",
                fade        :   true
            });
            return
        }
        if(this.state.Amount == "0"){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please Enter amount",
                fade        :   true
            });
            return
        }

        this.setState({ NumberOfInstallment: e.target.value} );

        if(e.target.value!="")
        {
            this.state.Amortization = (parseFloat(this.state.Amount) / parseInt(e.target.value)).toFixed(2);
        }
        else
        {
            if(this.state.selectedEmployeePayModeId=="1")
            {
                this.state.Amortization = (parseFloat(this.state.Amount) /2).toFixed(2);
            }
            else if(this.state.selectedEmployeePayModeId=="2")
            {
                this.state.Amortization = (parseFloat(this.state.Amount) /4).toFixed(2);
            }
            else
            {
                this.state.Amortization = this.state.Amount;
            }
        }

    }

    onChangeReference = (e) => {
        this.setState({ Reference: e.target.value} );
    }

    onChangeRemarks = (e) => {
        this.setState({ Remarks: e.target.value} );
    }

    onChangeAmount = (e) => {
        /* this.setState({ Amount: e.target.value} ); */
        const Amount = e.target.value;

        if (!Amount || Amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
        this.setState(() => ({ Amount,isshow      :   false, }));
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
    }

    onChangePerDay = (e) => {
        this.setState({ isPerDay: e.target.value} );
    }

    onSubmitSavePayrollDeductions = () => {
        this.setState({
            referenceDisable    : false,
            Reference           :   ''
        })

        this.setState({isloading:true})
        let EffectivityMonth = moment(this.state.EffectivityMonth).format('MM/DD/YYYY');

        let noOfInstallment = this.state.NumberOfInstallment;
        if(this.state.NumberOfInstallment=="")
        {
            if(this.state.selectedEmployeePayModeId=="1")
                noOfInstallment="2";
            else if(this.state.selectedEmployeePayModeId=="2")
                noOfInstallment="4";
            else
                noOfInstallment="1";
        }

        if(this.state.getClientList === 0){
            this.setState({
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "please select client",
                fade            :   true
            })
            return

        }

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

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.employeeId,
            "DeductionId":this.state.selectedDeductionId,
            "Amount":this.state.Amount,
            "Amortization":this.state.Amortization,
            "EffectivityDate":EffectivityMonth,
            "IsRecurring": "0",
            "PayModeId":this.state.selectedEmployeePayModeId,
            "NoOfInstallment":noOfInstallment,
            "PayPeriodId": this.state.selectedPayrollPeriodsId,
            "LeadTime": this.state.selectedEmployeeLeadTime,
            "Reference" : this.state.Reference,
            "Remarks" : this.state.Remarks,
        }

        console.log("Submit Parameters")
        console.log(getParams)
        

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "PayrollConfiguration/AddDeduction", getParams)
            .then(res => {
                ////console.log("Add Deduction List ");
                ////console.log(res.data);
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
            this.setState({
                Reference           :   moment(new Date()).format('MMDDYYYYhhmmss') + JSON.parse(sessionStorage.getItem("userData")).userId
            })

    }

    getDeductionTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/getDeductionTypes", getParams)
        .then(res => {
            ////console.log("getDeductionTypes");
            ////console.log(res.data);
            const data = res.data;
            this.setState({getDeductionTypesList : data.deductionTypes}) 
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

    onChangeDeductionTypesList = (e) => {
        if(e.length == 0) {
            this.state.selectedDeductionTypesId = ""
            return
        }  
        this.state.selectedDeductionTypesId = e[0].id

        this.setState({
            referenceDisable : true
        })
        this.getDeductions();

    }

    onChangeDeductionList = (e) => {
        if(e.length == 0) {
            this.state.selectedDeductionId = ""
            return
        }  
        this.state.selectedDeductionId = e[0].id

    }

    getDeductions(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedDeductionTypesId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions", getParams)
        .then(res => {
            ////console.log("GetDeductions");
            ////console.log(res.data);
            const data = res.data;
            this.setState({getDeductionsList : data.deductions}) 
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
                        Payroll Deductions
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
                                        onChange={this.onChangeDeductionTypesList}
                                        options={this.state.getDeductionTypesList}
                                        placeholder="Select Deduction Type"

                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                        onChange={this.onChangeDeductionList}
                                        options={this.state.getDeductionsList}
                                        placeholder="Select Deduction"
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
                                    <Form.Control 
                                        type="text" 
                                        ref="Reference"
                                        name="Reference"
                                        value={this.state.Reference}
                                        onChange={this.onChangeReference}
                                        autoComplete="off"
                                        disabled={this.state.referenceDisable}
                                    />
                                </Col>

                                <Form.Label column sm="2">
                                    Remarks
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type="text" 
                                        ref="Remarks"
                                        name="Remarks"
                                        value={this.state.Remarks}
                                        onChange={this.onChangeRemarks}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Row>
                                <Form.Label column sm="2">
                                Effectivity Date 
                                </Form.Label>
                                <Col sm="4">
                                    <DatePicker
                                        ref='EffectivityMonth'
                                        selected={this.state.EffectivityMonth}
                                        onChange={this.handleChangeEffectivityMonth}
                                        minDate={this.minDate}
                                        value={this.props.EffectivityMonth}
                                        dateFormat={"MM/dd/yyyy"}
                                        className="form-control"
                                    />
                                </Col>

                                {/* <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Label >
                                       Effectivity Date 
                                    </Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <DatePicker
                                        ref='EffectivityMonth'
                                        selected={this.state.EffectivityMonth}
                                        onChange={this.handleChangeEffectivityMonth}
                                        minDate={this.minDate}
                                        value={this.props.EffectivityMonth}
                                        dateFormat={"MM/dd/yyyy"}
                                        className="form-control"
                                    />
                                </Form.Group> */}

                                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Please Enter Amount"
                                        ref="Amount"
                                        name="Amount"
                                        value={this.state.Amount}
                                        onChange={this.onChangeAmount}
                                        autoComplete="off"
                                        /* onKeyPress={this.IsNumeric.bind(this)} */
                                    />
                                </Form.Group>

                            </Form.Row>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Number of Installment
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control type="text" 
                                        ref="NumberOfInstallment"
                                        name="NumberOfInstallment"
                                        value={this.state.NumberOfInstallment}
                                        onChange={this.onChangeNumberOfInstallment}
                                        autoComplete="off"
                                        onKeyPress={this.IsNumeric.bind(this)}
                                    />
                                </Col>

                                <Form.Label column sm="3">
                                    Amount Per Cut-Off
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control 
                                        type="text" 
                                        readOnly 
                                        value={this.state.Amortization}
                                    />
                                </Col>
                            </Form.Group>
                            

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.onSubmitSavePayrollDeductions }>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
        </Modal>
        );
    }

}
export  default PayrollDeductionsModal