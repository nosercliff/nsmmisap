import {
    React,Component,
    paginationFactory,Button, ButtonToolbar, Card, BootstrapTable,
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState
} 
from '../../noser-hris-component';

import  StandardBillingModalCreate  from './BillingModal/StandardBillingModalCreate';
import  StandardBillingModalEdit  from './BillingModal/StandardBillingModalEdit';

import  BillingRateOneCreate  from './BillingModal/BillingRateOneCreate';
import  BillingRateOneEdit  from './BillingModal/BillingRateOneEdit';

import  BillingRateTwoCreate  from './BillingModal/BillingRateTwoCreate';
import  BillingRateTwoEdit  from './BillingModal/BillingRateTwoEdit';

import  ClientBillingModalCreate  from './BillingModal/ClientBillingModalCreate';
import  ClientBillingModalEdit  from './BillingModal/ClientBillingModalEdit';

class BillingConfiguration extends Component {
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

            standardCreateBillingModalShow: false,
            standardEditBillingModalShow: false,
            standardBillingSearchModalShow  : false,

            billingRateOneCreate: false,
            billingRateOneEdit : false,

            billingRateTwoCreate : false,
            billingRateTwoEdit : false,

            clientBillingCreateModalShow : false,
            clientBillingEditModalShow : false,

            clientList: [],
            locationList: [],
            costCenterCodeAutocomplete : [],
            areaCodeAutocomplete        :   [],
            billingTemplate: [
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
            selectedBillingTemplate     :   '',
            selectedBillingTemplateId   :   '',
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
            billingRatesTableList   :    [],
            billingList     :   [
                {
                    "id":"1",
                    "name":"Per Client"
                },
                {
                    "id":"2",
                    "name":"Per Area"
                },
                {
                    "id":"3",
                    "name":"Per Branch"
                },

            ],
            disableBranch   :   false,
            disableArea     :   true,
            disableBilling  :   true,
            disableAdminFeeType     : false,
        }
    }

    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
        this.GetCostCenterCode();
        this.GetArea();
        /* this.getClientLocation(); */
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
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        console.log("Client selectedClientName " + this.state.selectedClientName );
        this.getClientLocation();
        this.setState({
            isshow   :   false,
            disableBilling  :   false,
        })
    }

    onChangeBillingList = (e) => {
        if(e.length == 0) {
            this.state.selectedBillingName=""
            this.state.selectedBillingId=""
            return
        } 
        this.state.selectedBillingId = e[0].id
        this.state.selectedBillingName = e[0].name

        if(this.state.selectedBillingId == 1) {
            this.setState({
                disableBranch   :   true,
                disableArea     :   true,
            })
        }
        if(this.state.selectedBillingId == 2) {
            this.setState({
                disableBranch   :   true,
                disableArea     :   false,
            })
        }
        if(this.state.selectedBillingId == 3) {
            this.setState({
                disableBranch   :   false,
                disableArea     :   true,
            })
        }
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
        this.state.selectedLocationId= e[0].id
        this.setState({
            isshow   :   false
        })
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
            this.state.selectedCostCenterId=""
            this.state.selectedCostCenterCode=""
            return
        }
        this.state.selectedCostCenterId = e[0].id
        this.state.selectedCostCenterCode = e[0].code
        console.log(this.state.selectedAreaId)
        this.setState({
            isshow   :   false
        })
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
            this.state.selectedAreaCodeId = e[0].id
        } else {
            this.state.selectedAreaCode = ""
            this.state.selectedAreaCodeId = ""
        }
        this.setState({
            isshow   :   false
        })
    }

    onChangeBillingTemplate = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedBillingTemplate     :   '',
                selectedBillingTemplateId   :   ''
            })
            return
        }
        this.state.selectedBillingTemplate = e[0].name
        this.state.selectedBillingTemplateId = e[0].id

        if(this.state.selectedBillingTemplateId == 1){
            this.setState({
                disableAdminFeeType : false
            })
        }
        if(this.state.selectedBillingTemplateId == 4){
            this.setState({
                disableAdminFeeType : false,
            })
        }
        if(this.state.selectedBillingTemplateId == 2){
            this.setState({
                adminFeeAutocomplete    :   [],
                disableAdminFeeType : true,
            })
        }
        if(this.state.selectedBillingTemplateId == 3){
            this.setState({
                adminFeeAutocomplete    :   [],
                disableAdminFeeType : true
            })
        }
        this.setState({
            isshow   :   false
        })
    }

    handleModalOpen = event => {

        if(!this.state.selectedClientName) {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select client",
                fade        :   true
            });
            return
        }
        // if(!this.state.selectedLocationName) {
        //     this.setState({
        //         isloading   :   false,
        //         alerttype   :   "Error!",
        //         isshow      :   true,
        //         color       :   "danger",
        //         message     :   "Please select Branch",
        //         fade        :   true
        //     });
        //     return
        // }

        if(!this.state.selectedBillingTemplate) {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select billing template",
                fade        :   true
            });
            return
        }

        if(this.state.selectedBillingTemplate == "Standard") {
            if(!this.state.selectedAdminFeeName) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select default template",
                    fade        :   true
                });
                return
            }else {
                this.setState({
                    standardCreateBillingModalShow      :   true,
                    isshow                              :   false,
                })
            }
        }

        if(this.state.selectedBillingTemplate == "Billing Rate 1") {
            this.setState({
                billingRateOneCreate      :   true,
                isshow                    :   false,
            })
        }

        if(this.state.selectedBillingTemplate == "Billing Rate 2") {
            this.setState({
                billingRateTwoCreate      :   true,
                isshow                    :   false,
            })
        }

        if(this.state.selectedBillingTemplate == "Client Billing") {
            if(!this.state.selectedAdminFeeName) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select default template",
                    fade        :   true
                });
                return
            }else {
                this.setState({
                    clientBillingCreateModalShow        :   true,
                    isshow                              :   false,
                })
            }
        }

        let objStandard = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childStandardCreate.initialize(objStandard)

        let objBillingRateOne = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childBillingRateOneCreate.initialize(objBillingRateOne)

        let objBillingRateTwo = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childBillingRateTwoCreate.initialize(objBillingRateTwo)

        let objClientBilling = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childClientBillingCreate.initialize(objClientBilling)


    }

    handleEditModalOpen = event => {

        if(!this.state.selectedClientName) {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select client",
                fade        :   true
            });
            return
        }
        if(!this.state.selectedLocationName) {
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select Branch",
                fade        :   true
            });
            return
        }

        if(this.state.selectedBillingTemplate == "Standard") {
            if(!this.state.selectedAdminFeeName) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select default template",
                    fade        :   true
                });
                return
            }else {
                this.setState({
                    standardEditBillingModalShow      :   true,
                    isshow                            :   false,
                })
            }
        }

        if(this.state.selectedBillingTemplate == "Billing Rate 1") {
            this.setState({
                billingRateOneEdit      :   true,
                isshow                  :   false,
            })
        }

        if(this.state.selectedBillingTemplate == "Billing Rate 2") {
            this.setState({
                billingRateOneEdit      :   true,
                isshow                  :   false,
            })
        }

        if(this.state.selectedBillingTemplate == "Client Billing") {
            if(!this.state.selectedAdminFeeName) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select default template",
                    fade        :   true
                });
                return
            }else {
                this.setState({
                    clientBillingEditModalShow      :   true,
                    isshow                          :   false,
                })
            }
        }


        let objStandardEdit = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childStandardEdit.initialize(objStandardEdit)

        let objRateOneEdit = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childRateOneEdit.initialize(objRateOneEdit)

        let objRateTwoEdit = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childRateTwoEdit.initialize(objRateTwoEdit)

        let objClientBillingEdit = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
            adminFeeIdFromParent    :   this.state.selectedAdminFeeId,
            adminFeeNameFromParent  :   this.state.selectedAdminFeeName,
            billingIdFromParent     :   this.state.selectedBillingId,
            billingNameFromParent   :   this.state.selectedBillingName,
        }
        this.childClientBillingEdit.initialize(objClientBillingEdit)
    }
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({
            standardCreateBillingModalShow  :   false,
            standardEditBillingModalShow    :   false,
            billingRateOneCreate            :   false,
            billingRateOneEdit              :   false,
            billingRateTwoCreate            :   false,
            billingRateTwoEdit              :   false,
            clientBillingCreateModalShow    :   false,
            clientBillingEditModalShow      :   false,
        })
    }

    handleEventAdminFee = (e) => {
        if(e.length==0)
        {
            this.setState({
                selectedAdminFeeId   :   '',
                selectedAdminFeeName   :   ''
            })
            return
        }
        this.state.selectedAdminFeeId = e[0].id
        this.state.selectedAdminFeeName = e[0].name
        this.setState({
            isshow   :   false
        })
    }

    handleSearchBillingRate = () => {
        this.setState({isloading:true})
        const payrollFieldsParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.selectedClientId,
            "UserId"            :   this.state.userinfo.userId,
            "Id"                :   "",
            "RateTypeId"        :   this.state.selectedBillingTemplateId,
            "AdminFeeTypeId"    :   this.state.selectedAdminFeeId,
            "AreaId"            :   this.state.selectedAreaCodeId,
            "CostCenterId"      :   this.state.selectedCostCenterId,
            "LocationId"        :   this.state.selectedLocationId,
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "BillingConfiguration/GetBillingRates",  payrollFieldsParams)
        .then(res => {
            const data = res.data;
            console.log("Get Billing Rates");
            console.log(data);
            this.setState({
                billingRatesTableList           :   data.clientBillingRates,
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

    /* handleSearchClick = event => {
        if(this.state.selectedBillingTemplate == "Standard") {
            if(!this.state.selectedClientName) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select client",
                    fade        :   true
                });
                return
            }else {
                this.setState({
                    standardBillingSearchModalShow      :   true,
                    isshow                              :   false,
                })
            }

            if(!this.state.selectedBillingTemplate) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select billing template",
                    fade        :   true
                });
                return
            }
        }

        let objStandardBillingSearch = {
            clientNameFromParent    :   this.state.selectedClientName,
            clientIdFromParent      :   this.state.selectedClientId,
            locationFromParent      :   this.state.selectedLocationName,
            locationIdFromParent    :   this.state.selectedLocationId,
            employeeNameFromParent  :   this.state.selectedEmployeeName,
            costCenterFromParent    :   this.state.selectedCostCenterCode,
            costCenterIdFromParent  :   this.state.selectedCostCenterId,
            areaNameFromParent      :   this.state.selectedAreaCode,
            areaIdFromParent        :   this.state.selectedAreaCodeId,
            templateIdFromParent    :   this.state.selectedBillingTemplateId,
            templateNameFromParent  :   this.state.selectedBillingTemplate,
        }
        this.childStandardSearch.initialize(objStandardBillingSearch)

    } */

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.billingRatesTableList.length; i++) {
            if (this.state.billingRatesTableList[i]["isModified"] == 1) {
                this.setState({
                    isGridDataChanged   : true
                })
                isChanged   =   true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, id, column) {
        console.log(id)
        this.state.billingRatesTableList.map(function(item,i) {
            if (item.id === id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {


        const columnBillingRate = [
            {
                dataField   : 'client',
                text        : 'Client Name',
                headerStyle : () => {
                    return { width  : "30%" };
                },
            },
            {
                dataField   : 'location',
                text        : 'Branch',
                headerStyle : () => {
                    return { width  : "20%" };
                },
            },
            {
                dataField   : 'adminFeeType',
                text        : 'Admin Fee Type',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center'},
            },
            {
                dataField   : 'percentage',
                text        : 'Percentage',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'center'},
            },
            {
                dataField   : 'feeRate',
                text        : 'Fee Rate',
                headerStyle : () => {
                    return { width  : "35%" };
                },
            }

        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.billingRatesTableList.map(function(item,i){
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
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>Billing Configuration</Card.Header>
                        <Card.Body>
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
                                    />
                                </Col>
                            </Form.Group>
                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeBillingList}
                                        options={this.state.billingList}
                                        placeholder="Select Billing"
                                        disabled={this.state.disableBilling}
                                    />
                                </Col>
                            </Form.Group> */}
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeLocation}
                                        options={this.state.locationList}
                                        placeholder="Select Branch"
                                        disabled={this.state.disableBranch}
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
                                        disabled={this.state.disableArea}
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
                                    />
                                </Col>
                            </Form.Group> */}

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeBillingTemplate}
                                        options={this.state.billingTemplate}
                                        placeholder="Select Billing Template"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.handleEventAdminFee}
                                        options={this.state.adminFeeAutocomplete}
                                        placeholder="Select Default Template"
                                        disabled={this.state.disableAdminFeeType}
                                    />
                                </Col>
                            </Form.Group>

                            <ButtonToolbar>
                                <Button variant="success" className="ml-auto" onClick={this.handleSearchBillingRate}>
                                    Search
                                </Button>
                            </ButtonToolbar>
                            <Card.Header className="mt-3">Record</Card.Header>
                            <div className="mt-1">
                                <BootstrapTable
                                    /* caption={Noser.TableHeader({title:"RECORD"})} */
                                    keyField = "id"
                                    data = { this.state.billingRatesTableList }
                                    columns = { columnBillingRate }
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

                                />
                            </div>

                            <ButtonToolbar className="mt-5">
                                <Button variant="success" className="ml-auto" onClick={e => this.handleEditModalOpen()}>
                                    Edit
                                </Button>&nbsp;&nbsp;&nbsp;
                                <Button variant="success"  onClick={e => this.handleModalOpen()}>
                                    Create
                                </Button>&nbsp;&nbsp;&nbsp;
                                <Button href="/home" variant="danger" >
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />

                <StandardBillingModalCreate 
                    show={this.state.standardCreateBillingModalShow}
                    onHide={this.handleModalClose}
                    onStandardCreateRef={ref => (this.childStandardCreate = ref)}
                />
                <StandardBillingModalEdit 
                    show={this.state.standardEditBillingModalShow}
                    onHide={this.handleModalClose}
                    onStandardEditRef={ref => (this.childStandardEdit = ref)}
                />

                <BillingRateOneCreate 
                    show={this.state.billingRateOneCreate}
                    onHide={this.handleModalClose}
                    onBillingRateOneCreateRef={ref => (this.childBillingRateOneCreate = ref)}
                />
                <BillingRateOneEdit 
                    show={this.state.billingRateOneEdit}
                    onHide={this.handleModalClose}
                    onBillingRateOneEditRef={ref => (this.childRateOneEdit = ref)}
                />

                <BillingRateTwoCreate 
                    show={this.state.billingRateTwoCreate}
                    onHide={this.handleModalClose}
                    onBillingRateTwoCreateRef={ref => (this.childBillingRateTwoCreate = ref)}
                />
                <BillingRateTwoEdit
                    show={this.state.billingRateTwoEdit}
                    onHide={this.handleModalClose}
                    onBillingRateTwoEditRef={ref => (this.childRateTwoEdit = ref)}
                />

                <ClientBillingModalCreate 
                    show={this.state.clientBillingCreateModalShow}
                    onHide={this.handleModalClose}
                    onClientBillingCreateRef={ref => (this.childClientBillingCreate = ref)}
                />
                <ClientBillingModalEdit
                    show={this.state.clientBillingEditModalShow}
                    onHide={this.handleModalClose}
                    onClientBillingTwoEditRef={ref => (this.childClientBillingEdit = ref)}
                />

            </div>
        )

    }

}

export  default BillingConfiguration