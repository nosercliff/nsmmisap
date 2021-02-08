import {
    React,Component,
    paginationFactory,Button, ButtonToolbar, Card, BootstrapTable,
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState
} 
from '../../noser-hris-component';

class LocationCreate extends Component {
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

        selected                    :   [],
        cityList                    :   [],
        clientList                  :   [],
        selectedCity                :   '',
        locationName                :   '',
        positionList                :   [],
        selectedCityId              :   '',
        selectedClient              :   '',
        selectedClientId            :   '',
        selectedClientLocationId    :   '',
        costCenterCodeAutocomplete  :   [],
    }

    this.textInput = React.createRef();

    }

    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetClient()
        this.GetCostCenterCode()
        /* this.getLocation() */
    }

    handleChange = (e) => {
        this.setState({
            locationName    :   e.target.value
        });
    }

    handleCoverChangeCity = (e) => {
        if (e.length > 0) {
            this.state.selectedCityId   =   e[0].id
        } else {
            this.state.selectedCityId   =   ""
        }

    }

    handleCoverChangeClient = (e) => {
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            this.state.selectedProvinceId   =   ""
            this.state.selectedRegionId     =   ""
            return
        }
        this.state.selectedClientId     =   e[0].id
        this.state.selectedProvinceId   =   e[0].provinceId
        this.state.selectedRegionId     =   e[0].regionId

        this.GetCity()

    }


    handleSaveClick = event => {
        this.setState({
            isloading   :   true
        })

        const clientlocationParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   this.state.locationName,
            "CityId"        :   this.state.selectedCityId,
            "CostCenterId"  :   this.state.selectedCostCenterId ? this.state.selectedCostCenterId : "",
        };

        console.log("Submit params");
        console.log(clientlocationParams);

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/AddClientLocation",  clientlocationParams)
        .then(res => {

            const data = res.data;
            console.log("Save Result Message");
            console.log(data);
            if(data.status=="1"){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Success!",
                    isshow      :   true,
                    color       :   "success",
                    message     :   data.message,
                    fade        :   true
                });
            }else {
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

    GetCity() {
        this.setState({isloading:true})
        const cityParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Name"          :   "",
            "ProvinceName"  :   "",
            "ProvinceId"    :   this.state.selectedProvinceId ,
            "RegionId"      :   this.state.selectedRegionId,
        };

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities",  cityParams)
        .then(res => {
            const data = res.data;
            console.log("Get Cities");
            console.log(data);
            this.setState({
                cityList    :   data.cities,
                isloading   :   false
            });
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
    GetClient() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        };

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList",  clientParams)
        .then(res => {
            const data = res.data;
            console.log("Get Client List");
            console.log(data);
            this.setState({
                clientList  :   data.clients,
                isloading   :   false
            });
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
            this.state.selectedCostCenterId     =   ""
            this.state.selectedCostCenterCode   =   ""
            return
        }
        this.state.selectedCostCenterId     =   e[0].id
        this.state.selectedCostCenterCode   =   e[0].code
        console.log(this.state.selectedAreaId)
    }

    render() {
        return(
            <div>
                <Banner />
                <Container className="mt-5">
                <Card>
                    <Card.Header>Create Location</Card.Header>
                    <Card.Body>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                <Typeahead 
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.handleCoverChangeClient}
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
                                    onChange={this.handleCoverChangeCity}
                                    options={this.state.cityList}
                                    placeholder="Select City"
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
                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.handleEventPosition}
                                        options={this.state.positionList}
                                        placeholder="Select Position"
                                    />
                                </Col>
                            </Form.Group> */}
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Control type="text" placeholder="Please Enter Location" ref={this.textInput} autoComplete="off" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                        </Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col>
                                <ButtonToolbar >
                                    <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                        Save
                                    </Button>&nbsp;&nbsp;
                                    <Button variant="danger" href="/location">
                                    Back
                                    </Button>
                                </ButtonToolbar>
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

export  default LocationCreate