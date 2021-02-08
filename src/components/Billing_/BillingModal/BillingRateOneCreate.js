import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class BillingRateOneCreate extends Component {
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

            adminFee        :   '',
            
            otherPayrollFieldsAutocomplete  :   [],
            otherAdditionalFields           :   [],
            otherPayrollTableList           :   [],

            clientName              :   '',
            clientId                :   '',
            locationName            :   '',
            locationId              :   '',
            costCenter              :   '',
            costCenterId            :   '',
            areaName                :   '',
            areaId                  :   '',
            templateId              :   '',
            templateName            :   '',
            defaultIdTemplate       :   '',
            defaultNameTemplate     :   '',
            billingId               :   '',
            billingName             :   '',
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetPayrollFields();
        this.props.onBillingRateOneCreateRef(this)

    }

    componentWillUnmount() {
        this.props.onBillingRateOneCreateRef()
    }

   initialize = (e) => {
        this.setState({
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            adminFee        :   '',
            
            otherAdditionalFields           :   [],
            otherPayrollTableList           :   [],
        })

        this.state.clientName      =   e.clientNameFromParent
        this.state.clientId        =   e.clientIdFromParent
        this.state.locationName    =   e.locationFromParent
        this.state.locationId      =   e.locationIdFromParent
        this.state.costCenter      =   e.costCenterFromParent
        this.state.costCenterId    =   e.costCenterIdFromParent
        this.state.areaName        =   e.areaNameFromParent
        this.state.areaId          =   e.areaIdFromParent
        this.state.templateId      =   e.templateIdFromParent
        this.state.templateName    =   e.templateNameFromParent
        this.state.defaultIdTemplate   =   e.adminFeeIdFromParent
        this.state.defaultNameTemplate     =   e.adminFeeNameFromParent
        this.state.billingId       =   e.billingIdFromParent
        this.state.billingName     =   e.billingNameFromParent

        console.log('Template Id')
        console.log(e.templateIdFromParent)

   }

   onModalClose = () => {
        this.props.onHide();            
    }

   GetPayrollFields() {
        const payrollFieldsParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "TypeId"        :   "0",
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/GetPayrollFields",  payrollFieldsParams)
        .then(res => {
            const data = res.data;
            console.log("Get Payroll Fields");
            console.log(data);
            this.setState({
                otherPayrollFieldsAutocomplete      :   data.payrollFields,
            });
        })
    }

    handleEventOtherPayrollFields = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedOtherAdditionalFieldId   :   '',
                selectedOtherAdditionalFieldTypeId   :   '',
                selectedOtherAdditionalFieldName   :   '',
            })
            return
        }
        this.state.selectedOtherAdditionalFieldId= e[0].id
        this.state.selectedOtherAdditionalFieldTypeId= e[0].typeId
        this.state.selectedOtherAdditionalFieldName= e[0].name
    }

    onChangeAdminFee = (e) => {
        this.setState({ adminFee: e.target.value} );
    }

    handleSubmitRateOne = () => {
        this.setState({isloading:true})

        const addParams = {
            "IpAddress"             :   "0.0.0.0",
            "ClientId"              :   this.state.clientId,
            "UserId"                :   this.state.userinfo.userId,
            "RateTypeId"            :   this.state.templateId,
            "AdminFeeTypeId"        :   "",
            "AreaId"                :   "",
            "CostCenterId"          :   "",
            "LocationId"            :   this.state.locationId,
            "IsPercentage"          :   "0",
            "FeeRate"               :   (this.state.adminFee)? this.state.adminFee : "",
            "AdditionalFields"      :   "",
            "OtherFields"           :   this.state.otherAdditionalFields,
        };

        console.log("Submit Params")
        console.log(addParams)

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/AddBillingRate",  addParams
            )
            .then(res => {
                const data = res.data;
                if(data.status=="1"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
                    });
                
                }
                else {
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
            this.setState(  {
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade            :   true
            })
        })
    }

    handleSubmitOtherAdditional= () => {
        const { otherAdditionalFields } = this.state
        const { otherPayrollTableList } = this.state

        if(otherAdditionalFields.length>0)
        {
            for(let i=0;i<otherAdditionalFields.length;i++)
            {
                if(otherAdditionalFields[i].PayrollFieldId == this.state.selectedOtherAdditionalFieldId){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Warning!",
                        isshow      :   true,
                        color       :   "warning",
                        message     :   this.state.selectedOtherAdditionalFieldName + " already exist.",
                        fade        :   true
                    });
                    return 
                }

            }
        }


        const obj = {
            "PayrollFieldId"        :   this.state.selectedOtherAdditionalFieldId,
            "PayrollFieldTypeId"    :   this.state.selectedOtherAdditionalFieldTypeId,
        }

        otherAdditionalFields.push(obj)
        this.setState({
            isshow      :   false,
            otherAdditionalFields   :   otherAdditionalFields
        })


        if(otherPayrollTableList.length>0)
        {
            for(let i=0;i<otherPayrollTableList.length;i++)
            {
                if(otherPayrollTableList[i].additionalName == this.state.selectedAdditionalFieldName){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Warning!",
                        isshow      :   true,
                        color       :   "warning",
                        message     :   this.state.selectedOtherAdditionalFieldName + " already exist.",
                        fade        :   true
                    });
                    return 
                }

            }

        }

        const objTable = {
            "otherAdditionalField"    :   this.state.selectedOtherAdditionalFieldName,
        }

        otherPayrollTableList.push(objTable)

        console.log(otherPayrollTableList)
        this.setState({otherPayrollTableList: otherPayrollTableList, isshow      :   false,})
    }


    IsNumeric(evt){
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

        const columnOtherPayrollFields = [
            {
                dataField: 'otherAdditionalField',
                text: 'Other Additional Fields',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            }
        ]

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
                        Billing Configuration >> Billing Rate 1 - Create
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Client Name" 
                                    autoComplete="off" 
                                    name="clientName"
                                    value={this.state.clientName}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Billing Name" 
                                    autoComplete="off" 
                                    name="clientName"
                                    value={this.state.billingName}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row> */}
                        <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    autoComplete="off" 
                                    name="locationName"
                                    value={this.state.locationName}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    autoComplete="off" 
                                    name="areaName"
                                    value={this.state.areaName}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    autoComplete="off" 
                                    name="costCenter"
                                    value={this.state.costCenter}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row> */}
                        <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Billing Template" 
                                    autoComplete="off" 
                                    name="templateName"
                                    value={this.state.templateName}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row>
                       {/*  <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Default Template" 
                                    autoComplete="off" 
                                    name="defaultNameTemplate"
                                    value={this.state.defaultNameTemplate}
                                    readOnly/>
                            </Form.Group>
                        </Form.Row> */}
                        <Form.Row>
                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                <Form.Label>
                                    Admin Fee
                                </Form.Label>
                            </Form.Group>
                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    autoComplete="off" 
                                    name="adminFee"
                                    value={this.state.adminFee}
                                    ref="adminFee"
                                    onChange={this.onChangeAdminFee}
                                    onKeyPress={this.IsNumeric.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                %
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Group as={Row} controlId="formPlaintextPassword" className="mt-5">
                            <Col sm="10">
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.handleEventOtherPayrollFields}
                                    options={this.state.otherPayrollFieldsAutocomplete}
                                    placeholder="Select Fields"
                                />
                            </Col>
                            <Col sm="1">
                                <Button variant="success"  onClick={this.handleSubmitOtherAdditional}>ADD</Button>
                            </Col>
                        </Form.Group>

                        <Card.Header>Record</Card.Header>
                        <div className="mt-1">
                            <BootstrapTable
                                keyField = "id"
                                data = { this.state.otherPayrollTableList }
                                columns = { columnOtherPayrollFields }
                                rowClasses="noser-table-row-class"
                                striped
                                hover
                                condensed
                                cellEdit = { cellEditFactory({
                                    mode: 'dbclick',
                                    blurToSave: true,
                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                        this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                        }
                                    })
                                }
                                rowStyle={{ height: "45px" }}

                            />
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.handleSubmitRateOne }>
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
export  default BillingRateOneCreate