import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class StandardBillingModalEdit extends Component {
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
            checkboxAdminFee   :   false,
            checkFixAmount  :   false,
            disableAdminFee :   false,
            disablePerDay   :   false,
            adminFeeAutocomplete     :   [
                {
                    "id":"1",
                    "name":"Basic"
                },
                {
                    "id":"2",
                    "name":"Gross"
                },
                {
                    "id":"3",
                    "name":"Across"
                },
            ],
            adminFee        :   '',
            perDay          :   '',
            payrollFieldsAutocomplete       :   [],
            additionalFieldsList            :   [],
            otherPayrollFieldsAutocomplete  :   [],
            otherPayrollFieldsList          :   [],
            additionalFields                :   [],
            otherAdditionalFields           :   [],
            billingRateList                 :   [],
            additionalTableList             :   [],
            otherPayrollTableList           :   [],
            billingTemplate     :   [
                {
                    "id" : "1",
                    "name" : "Standard"
                },
                {
                    "id" : "2",
                    "name" : "Billing Rate 1"
                },
                {
                    "id" : "3",
                    "name" : "Billing Rate 2"
                },
                {
                    "id" : "4",
                    "name" : "Client Billing"
                }
            ],

            clientList: [],
            locationList: [],
            costCenterCodeAutocomplete : [],
            areaCodeAutocomplete        :   [],
            defaultIdTemplate   :   '',
            defaultNameTemplate     :   '',
            adminFeeAutocomplete     :   [
                {
                    "id":"1",
                    "name":"Basic"
                },
                {
                    "id":"2",
                    "name":"Gross"
                },
                {
                    "id":"3",
                    "name":"Across"
                },
            ],

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
        this.getClientList();
        this.GetCostCenterCode();
        this.GetArea();
        this.GetPayrollFields();
        this.props.onStandardEditRef(this)
    }

    componentWillUnmount() {
        this.props.onStandardEditRef()
    }

   initialize = (e) => {
        this.setState({
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            checkboxAdminFee   :   false,
            checkFixAmount  :   false,
            disableAdminFee :   false,
            disablePerDay   :   false,
            checkAdminFee   :   false,
            adminFee        :   '',
            perDay          :   '',
            additionalFieldsList            :   [],
            otherPayrollFieldsList          :   [],
            additionalFields                :   [],
            otherAdditionalFields           :   [],
            billingRateList                 :   [],
            additionalTableList             :   [],
            otherPayrollTableList           :   [],

            /* clientName      :   e.clientNameFromParent,
            clientId        :   e.clientIdFromParent,
            locationName    :   e.locationFromParent,
            locationId      :   e.locationIdFromParent,
            costCenter      :   e.costCenterFromParent,
            costCenterId    :   e.costCenterIdFromParent,
            areaName        :   e.areaNameFromParent,
            areaId          :   e.areaIdFromParent,
            templateId      :   e.templateIdFromParent,
            templateName    :   e.templateNameFromParent,
            defaultIdTemplate   :   e.adminFeeIdFromParent,
            defaultNameTemplate     :   e.adminFeeNameFromParent, */
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

        this.GetBillingRatesList();
   }

    getClientList(){
        this.setState({isloading:true})
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}

        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            sleep(1000).then(() => {
                this.setState({
                    clientList  :   res.data.clients ? res.data.clients : [],
                    isloading   :   false
                })
            })
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

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.clientId=""
            return
        } 
        this.state.clientId = e[0].id
        this.state.selectedClientName = e[0].name
        console.log("Client selectedClientName " + this.state.selectedClientName );
        this.getClientLocation();
    }

    getClientLocation(){
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
        this.state.locationId= e[0].id
    }

    GetCostCenterCode() {
        const areaCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCostCenters",  areaCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Cost Centers");
            console.log(data);
            this.setState({
                costCenterCodeAutocomplete    :   data.costCenters
            });
         })
    }

    handleEventCostCenterCode = (e) => {
        if(e.length == 0) {
            this.state.costCenterId=""
            this.state.selectedCostCenterCode=""
            return
        }
        this.state.costCenterId = e[0].id
        this.state.selectedCostCenterCode = e[0].code
        console.log(this.state.selectedAreaId)
    }

    GetArea() {
        const areaCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetAreas",  areaCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Area Code");
            console.log(data);
            this.setState({ 
                areaCodeAutocomplete    : data.areas
            });
         })
    }

    handleEventAreaCode = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedAreaCode = e[0].code
            this.state.areaId = e[0].id
        } else {
            this.state.selectedAreaCode = ""
            this.state.areaId = ""
        }
    }

    onChangeBillingTemplate = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedBillingTemplate     :   '',
                templateId   :   ''
            })
            return
        }
        this.state.selectedBillingTemplate = e[0].name
        this.state.templateId = e[0].id
    }


    handleEventAdminFee = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedAdminFeeId   :   ''
            })
            return
        }
        this.state.selectedAdminFeeId = e[0].id

       this. GetBillingRates();
    }

   handleCheckAdminFee = (e) => {
        this.setState({
            checkboxAdminFee    :   e.target.checked,
            checkAdminFee       :   true,
            disablePerDay       :   true,
            perDay              :   0,
            checkFixAmount      :   false,
            disableAdminFee     :   false,
        })
   }

    handleFixAmount = (e) => {
        this.setState({
            checkboxAdminFee    :   false,
            checkAdminFee       :   false,
            disableAdminFee     :   true,
            adminFee            :   0,
            checkFixAmount      :   true,
            disablePerDay       :   false,
            })
    }

    onChangePerDay = (e) => {
            this.setState({ perDay: e.target.value} );
    }

    onChangeAdminFee = (e) => {
        this.setState({ adminFee: e.target.value} );
    }

    GetBillingRatesList() {
        const billingRatesParamsList = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "Id"                :   "",
            "RateTypeId"        :   this.state.templateId,
            "AdminFeeTypeId"    :   this.state.defaultIdTemplate,
            "AreaId"            :   this.state.areaId,
            "CostCenterId"      :   this.state.costCenterId,
            "LocationId"        :   this.state.locationId,
        };

        console.log("Billing Rates Params List")
        console.log(billingRatesParamsList)

        axios.post(AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/GetBillingRates",  billingRatesParamsList)
        .then(res => {
            const data = res.data;
            console.log("Get Billing Rates");
            console.log(data);
            for(let i=0;i<data.clientBillingRates.length;i++) {
                for(let i=0;i<data.clientBillingRates[0].additionalFields.length;i++) {
                    console.log(data.clientBillingRates[0].additionalFields[i].payrollField)

                    const obj = {
                        "payrollField" : data.clientBillingRates[0].additionalFields[i].payrollField
                    }

                    this.state.additionalTableList.push(obj)
                    this.setState({additionalTableList: this.state.additionalTableList})
                }
            }

            for(let i=0;i<data.clientBillingRates.length;i++) {

                for(let i=0;i<data.clientBillingRates[0].otherFields.length;i++) {
                    console.log(data.clientBillingRates[0].otherFields[i].payrollField)

                    const obj = {
                        "payrollField" : data.clientBillingRates[0].otherFields[i].payrollField
                    }

                    this.state.otherPayrollTableList.push(obj)
                    this.setState({otherPayrollTableList: this.state.otherPayrollTableList})
                }
            }
           /*  this.state.billingRatesTableList           =   data.clientBillingRates, */

            this.setState({
                /* billingRatesTableList           :   data.clientBillingRates, */
                isloading   :   false,
                isshow      :   false,
            });
            if(data.clientBillingRates.length=="0"){
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

    handleSubmitStandardBilling = () => {
        this.setState({isloading:true})

        const editParams = {
            "IpAddress"             :   "0.0.0.0",
            "ClientId"              :   this.state.clientId,
            "UserId"                :   this.state.userinfo.userId,
            "Id"                    :   "",
            "RateTypeId"            :   this.state.templateId,
            "AdminFeeTypeId"        :   this.state.defaultIdTemplate,
            "AreaId"                :   (this.state.areaId)? this.state.areaId : "",
            "CostCenterId"          :   (this.state.costCenterId)? this.state.costCenterId : "",
            "LocationId"            :   this.state.locationId,
            "IsPercentage"          :   (this.state.checkboxAdminFee)? "1" : "0",
            "FeeRate"               :   (this.state.adminFee)? this.state.adminFee : this.state.perDay,
            "AdditionalFields"      :   this.state.additionalFieldsList,
            "OtherFields"           :   this.state.otherAdditionalFields,
        };

        console.log("Submit Edit Params")
        console.log(editParams)

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/EditBillingRate",  editParams
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

   onModalClose = () => {
        this.props.onHide();
    }

   GetPayrollFields() {
        const payrollFieldsParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "TypeId"        :   "0",
            "CrDr"          :   "",
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/GetPayrollFields",  payrollFieldsParams)
        .then(res => {
            const data = res.data;
            console.log("Get Payroll Fields xxx");
            console.log(data);
            this.setState({
                payrollFieldsAutocomplete           :   data.payrollFields,
                otherPayrollFieldsAutocomplete      :   data.payrollFields,
            });
        })
    }

    handleEventPayrollFields = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedAdditionalFieldName   :   '',
                selectedAdditionalFieldId   :   '',
                selectedAdditionalFieldTypeId   :   '',
            })
            return
        }
        this.state.selectedAdditionalFieldId= e[0].id
        this.state.selectedAdditionalFieldTypeId= e[0].typeId
        this.state.selectedAdditionalFieldName= e[0].name
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

    handleSubmitAdditional= () => {
        const { additionalFieldsList } = this.state
        const { additionalTableList } = this.state

        if(additionalFieldsList.length>0)
        {
            for(let i=0;i<additionalFieldsList.length;i++)
            {
                if(additionalFieldsList[i].PayrollFieldId == this.state.selectedAdditionalFieldId){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "warning",
                        message     :   this.state.selectedAdditionalFieldName + " already exist in Compute Admin Fee List",
                        fade        :   true
                    });
                    return 
                }

            }

        }
        const obj = {
            "PayrollFieldTypeId"    :   this.state.selectedAdditionalFieldTypeId,
            "PayrollFieldId"        :   this.state.selectedAdditionalFieldId,
        }

        additionalFieldsList.push(obj)

        console.log(additionalFieldsList)
        this.setState({additionalFieldsList: additionalFieldsList, isshow      :   false,})


        if(additionalTableList.length>0)
        {
            for(let i=0;i<additionalTableList.length;i++)
            {
                if(additionalTableList[i].payrollField == this.state.selectedAdditionalFieldName){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "warning",
                        message     :   this.state.selectedAdditionalFieldName + " already exist in Compute Admin Fee List",
                        fade        :   true
                    });
                    return 
                }

            }

        }

        const objTable = {
            "payrollField"    :   this.state.selectedAdditionalFieldName,
        }

        additionalTableList.push(objTable)

        console.log(additionalTableList)
        this.setState({additionalTableList: additionalTableList, isshow      :   false,})
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
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "warning",
                        message     :   this.state.selectedOtherAdditionalFieldName + " already exist in To Be Included List",
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
                if(otherPayrollTableList[i].payrollField == this.state.selectedOtherAdditionalFieldName){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "warning",
                        message     :   this.state.selectedOtherAdditionalFieldName + " already exist in To Be Included List",
                        fade        :   true
                    });
                    return 
                }

            }

        }

        const objTable = {
            "payrollField"    :   this.state.selectedOtherAdditionalFieldName,
        }

        otherPayrollTableList.push(objTable)

        console.log(otherPayrollTableList)
        this.setState({otherPayrollTableList: otherPayrollTableList, isshow      :   false,})
    }

    GetBillingRates() {
        const payrollFieldsParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "Id"                :   "",
            "RateTypeId"        :   this.state.templateId,
            "AdminFeeTypeId"    :   this.state.defaultIdTemplate,
            "AreaId"            :   (this.state.areaId)? this.state.areaId : "",
            "CostCenterId"      :   (this.state.costCenterId)? this.state.costCenterId : "",
            "LocationId"        :   this.state.locationId,
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/GetBillingRates",  payrollFieldsParams)
        .then(res => {
            const data = res.data;
            console.log("Get Billing Rates");
            console.log(data);
            /* this.setState({
                payrollFieldsAutocomplete           :   data.payrollFields,
                otherPayrollFieldsAutocomplete      :   data.payrollFields,
            }); */
        })
    }

    handleEventAdminFee = (e) => {
        if(e.length==0)
        {
            this.setState({
                defaultIdTemplate   :   '',
                selectedAdminFeeName   :   ''
            })
            return
        }
        this.state.defaultIdTemplate = e[0].id
        this.state.selectedAdminFeeName = e[0].name
    }

    onSubmitLeaveRemove =()=>{
        let lstRestday = this.state.additionalTableList
        for( var i = 0; i < this.state.additionalTableList.length; i++){ 
            console.log(this.state.additionalTableList[i].IsSelected)
            if ( this.state.additionalTableList[i].IsSelected === 1) {
                this.state.additionalTableList.splice(i, 1); 
              i--;
            }
         }
        
        this.setState({additionalTableList:this.state.additionalTableList})
        console.log(this.state.additionalTableList)
        console.log("t")
    }

    render() {
        const columnPayrollFields = [
            {
                dataField: 'payrollField',
                text: 'Additional Fields',
                headerStyle : () => {
                    return { width  : "60%" };
                }
            },
            /* {
                dataField: "databasePkey",
                text: "",
                editable: false,
                formatter: (cell, row) => {
                    if (row)
                    return (
                        <button
                            className="btn btn-danger btn-xs border-secondary rounded"
                            onClick={() => {
                                alert("test")
                            }}
                        >Delete Row</button>
                    );
                    return null;
                }
            } */
        ]

        const columnOtherPayrollFields = [
            {
                dataField: 'payrollField',
                text: 'Other Additional Fields',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            }
        ]

        const selectRowAdditional = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.additionalTableList.map(function(item,idx){

                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    if(isSelect)
                    {
                        if(idx==rowIndex)
                        item.IsSelected=1
                    }
                    else
                    {
                        if(idx==rowIndex)
                            item.IsSelected=0
                    }
                })
            }
        };

        const rowAdditionalEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };

        const rowOtherAdditionalEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };
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
                        Billing Configuration >> Standard Billing - Edit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.clientList}
                                        placeholder="Select Client"
                                        defaultInputValue={this.state.clientName}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                        onChange={this.onChangeLocation}
                                        options={this.state.locationList}
                                        placeholder="Select Branch"
                                        defaultInputValue={this.state.locationName}
                                    />
                                </Col>
                            </Form.Group>
                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='code'
                                        id="basic-example"
                                        onChange={this.handleEventAreaCode}
                                        options={this.state.areaCodeAutocomplete}
                                        placeholder="Select Area"
                                        defaultInputValue={this.state.areaName}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='code'
                                        id="basic-example"
                                        onChange={this.handleEventCostCenterCode}
                                        options={this.state.costCenterCodeAutocomplete}
                                        placeholder="Select Cost Center"
                                        defaultInputValue={this.state.costCenter}
                                    />
                                </Col>
                            </Form.Group> */}
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
                            <Form.Row>
                                    <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Default Template" 
                                        autoComplete="off" 
                                        name="defaultNameTemplate"
                                        value={this.state.defaultNameTemplate}
                                        readOnly/>
                                </Form.Group>
                            </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Admin Fee" 
                                    onChange={e => this.handleCheckAdminFee(e)}
                                    checked={this.state.checkAdminFee}
                                />
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
                                    disabled={this.state.disableAdminFee}
                                />
                            </Form.Group>
                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                %
                            </Form.Group>
                            <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Fix Amount" 
                                    onChange={e => this.handleFixAmount(e)}
                                    checked={this.state.checkFixAmount}
                                />
                            </Form.Group>
                            <Form.Group as={Col} sm={1} controlId="formGridPassword">
                                <Form.Control 
                                    type="text" 
                                    name="perDay"
                                    ref="perDay"
                                    value={this.state.perDay}
                                    onChange={this.onChangePerDay}
                                    autoComplete="off"
                                    onKeyPress={this.IsNumeric.bind(this)}
                                    disabled={this.state.disablePerDay}
                                />
                            </Form.Group>
                        </Form.Row>
                        
                        <Card className="mt-5">
                            <Card.Header>
                                Add'l Field To Compute Admin Fee
                            </Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Col sm="10">
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleEventPayrollFields}
                                            options={this.state.payrollFieldsAutocomplete}
                                            placeholder="Select Fields"
                                        />
                                    </Col>
                                    <Col sm="1">
                                        <Button variant="success"  onClick={this.handleSubmitAdditional}>ADD</Button>
                                    </Col>
                                </Form.Group>

                                <ButtonToolbar>
                                    <Button  variant="danger" onClick={this.onSubmitLeaveRemove}>Remove</Button>
                                </ButtonToolbar>
                                <Card.Header>Record</Card.Header>
                                <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "payrollFieldId"
                                            data = { this.state.additionalTableList }
                                            columns = { columnPayrollFields }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            rowEvents={ rowAdditionalEvents }
                                            selectRow = { selectRowAdditional }
                                            rowStyle={{ height: "45px" }}

                                        />
                                </div>
                            </Card.Body>
                        </Card>
                        
                        <Card className="mt-5">
                            <Card.Header>
                                Add'l Field To Be Included
                            </Card.Header>
                            <Card.Body>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
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
                                        keyField = "payrollFieldId"
                                        data = { this.state.otherPayrollTableList }
                                        columns = { columnOtherPayrollFields }
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        rowStyle={{ height: "45px" }}

                                    />
                                </div>
                            </Card.Body>
                        </Card>
                        {/* <Card.Header>Record</Card.Header>
                        <div className="mt-1">
                            <BootstrapTable
                                keyField = "id"
                                data = { this.state.billingRateList }
                                columns = { columnPosition }
                                pagination={ paginationFactory({sizePerPageRenderer}) }
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
                                rowEvents={ rowEvents }
                                selectRow = { selectRow }
                                rowStyle={{ height: "45px" }}

                            />
                            <ButtonToolbar sm={12}>
                                <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                    Save
                                </Button>&nbsp;&nbsp;
                                <NavLink to="/home">
                                    <Button variant="danger" href="/home">
                                        Close
                                    </Button>
                                </NavLink>
                            </ButtonToolbar>
                        </div> */}

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.handleSubmitStandardBilling }>
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
export  default StandardBillingModalEdit