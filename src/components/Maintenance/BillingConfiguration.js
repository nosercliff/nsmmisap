import {
    React,Component,
    paginationFactory,Button, ButtonToolbar, Card, 
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
            billingRateEditCreate : false,

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
    }

    getClientLocation(){
        this.setState({isloading:true})

        const getParams = {
            "IpAddress":"0.0.0.0",
            /* "ClientId":this.state.userinfo.clientId, */
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
    
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
    }

    handleModalOpen = event => {

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
            }
            if(!this.state.selectedLocationName) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select location",
                    fade        :   true
                });
                return
            } else {
                this.setState({
                    standardCreateBillingModalShow      :   true,
                    isshow                              :   false,
                })
            }
        }

        if(this.state.selectedBillingTemplate == "Billing Rate 1") {
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
                    message     :   "Please select location",
                    fade        :   true
                });
                return
            }
            if(!this.state.selectedAreaCode) {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select area",
                    fade        :   true
                });
                return
            }else {
                this.setState({
                    billingRateOneCreate    :   true,
                    isshow                  :   false,
                })
            }
        }

        if(this.state.selectedBillingTemplate == "Billing Rate 2") {
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
                    message     :   "Please select location",
                    fade        :   true
                });
                return
            } else {
                this.setState({
                    billingRateTwoCreate      :   true,
                    isshow                    :   false,
                })
            }
        }

        if(this.state.selectedBillingTemplate == "Client Billing") {
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
                    message     :   "Please select location",
                    fade        :   true
                });
                return
            } else {
                this.setState({
                    clientBillingCreateModalShow        :   true,
                    isshow                              :   false,
                })
            }
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
            templateIdFromParent    :   this.state.selectedBillingTemplateId
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
            templateIdFromParent    :   this.state.selectedBillingTemplateId
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
            templateIdFromParent    :   this.state.selectedBillingTemplateId
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
            /* templateNameFromParent  :   this.state.selectedBillingTemplate, */
        }
        this.childClientBillingCreate.initialize(objClientBilling)


    }

    handleEditStandardBilling = event => {
        if(this.state.selectedBillingTemplate == "Standard") {
            this.setState({standardEditBillingModalShow: true})
        }
        if(this.state.selectedBillingTemplate == "Billing Rate 1") {
            this.setState({billingRateEditCreate: true})
        }
        if(this.state.selectedBillingTemplate == "Billing Rate 2") {
            this.setState({billingRateTwoEdit: true})
        }
        if(this.state.selectedBillingTemplate == "Client Billing") {
            this.setState({clientBillingEditModalShow: true})
        }
    }
    
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({
            standardCreateBillingModalShow: false,
            standardBillingSearchModalShow  :   false,
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

    render() {
        let standardEditBillingModalClose =() => this.setState({standardEditBillingModalShow:false});

        let BillingRateOneCreateClose =() => this.setState({billingRateOneCreate:false});
        let BillingRateOneEditClose =() => this.setState({billingRateEditCreate:false});

        let BillingRateTwoCreateClose =() => this.setState({billingRateTwoCreate:false});
        let BillingRateTwoEditClose =() => this.setState({billingRateTwoEdit:false});

        let clientBillingCreateModalClose =() => this.setState({clientBillingCreateModalShow:false});
        let clientBillingEditModalClose =() => this.setState({clientBillingEditModalShow:false});


        return(
            <div>
                <Banner />
                <Container className="mt-5">
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
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        /* onChange={selectedClientLocation => this.setState({ selectedClientLocation })} */
                                        onChange={this.onChangeLocation}
                                        options={this.state.locationList}
                                        placeholder="Select Branch"
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
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='code'
                                        id="basic-example"
                                        onChange={this.handleEventAreaCode}
                                        options={this.state.areaCodeAutocomplete}
                                        placeholder="Select Area"
                                    />
                                </Col>
                            </Form.Group>

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

                            <ButtonToolbar>
                                <Button variant="success" className="ml-auto">
                                    View
                                </Button>
                            </ButtonToolbar>

                            <ButtonToolbar className="mt-5">
                                <Button variant="success" className="ml-auto" onClick={this.handleEditStandardBilling}>
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
                    onHide={standardEditBillingModalClose}
                />

                <BillingRateOneCreate 
                    show={this.state.billingRateOneCreate}
                    onHide={BillingRateOneCreateClose}
                    onBillingRateOneCreateRef={ref => (this.childBillingRateOneCreate = ref)}
                />
                <BillingRateOneEdit 
                    show={this.state.billingRateEditCreate}
                    onHide={BillingRateOneEditClose}
                />

                <BillingRateTwoCreate 
                    show={this.state.billingRateTwoCreate}
                    onHide={BillingRateTwoCreateClose}
                    onBillingRateTwoCreateRef={ref => (this.childBillingRateTwoCreate = ref)}
                />
                <BillingRateTwoEdit
                    show={this.state.billingRateTwoEdit}
                    onHide={BillingRateTwoEditClose}
                />

                <ClientBillingModalCreate 
                    show={this.state.clientBillingCreateModalShow}
                    onHide={clientBillingCreateModalClose}
                    onClientBillingCreateRef={ref => (this.childClientBillingCreate = ref)}
                />
                <ClientBillingModalEdit
                    show={this.state.clientBillingEditModalShow}
                    onHide={clientBillingEditModalClose}
                />

            </div>
        )

    }

}

export  default BillingConfiguration