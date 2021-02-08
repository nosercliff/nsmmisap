import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class CostCenterCreate extends Component {
    constructor() {
        super()
        this.state = {
            isloading   :   false,
            isshow      :   false,
            alerttype   :   "",
            message     :   "",
            color       :   "",
            fade        :   true,
            
            code                :   '',
            description         :   '',
            selectedAreaId      :   '',
            areaAutocomplete    :   [],
        };

    }

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetAreaCode();
    }

    GetAreaCode() {
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
                areaAutocomplete    :   data.areas
            });
         })
    }

    handleEventArea = (e) => {
        if(e.length == 0) {
            this.state.selectedAreaId=""
            return
        } 
        this.state.selectedAreaId = e[0].id
        console.log(this.state.selectedAreaId)
        
    }


    onChangeCode = (e) => {
        this.setState({
            code : e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    handleSaveClick = event => {
        this.setState({isloading:true})

        const costCenterParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "AreaId"        :   this.state.selectedAreaId,
            "Code"          :   this.state.code,
            "Name"          :   this.state.description,
         };

        console.log("Submit Params")
        console.log(costCenterParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddCostCenter",  costCenterParams
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

    }

            
        render() {
                return(
                    <div >
                        <Banner />
                        <Container className="mt-5">
                            <Card>
                                <Card.Header>Cost Center - Create</Card.Header>
                                <Card.Body>
                                    <div>
                                        <Form>
                                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                                <div className={this.state.color}></div> 
                                                {this.state.message}
                                            </Alert>
                                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Typeahead
                                                        labelKey='code'
                                                        id="basic-example"
                                                        onChange={this.handleEventArea}
                                                        options={this.state.areaAutocomplete}
                                                        placeholder="Select Area"
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter Code" 
                                                        ref="code"
                                                        autoComplete="off" 
                                                        name="code"
                                                        value={this.state.code}
                                                        onChange={this.onChangeCode}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter Description / Name" 
                                                        ref="description"
                                                        autoComplete="off" 
                                                        name="description"
                                                        value={this.state.description}
                                                        onChange={this.onChangeDescription}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <ButtonToolbar>
                                                <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                
                                                <Button  href="/CostCenter" variant="danger" onClick={ this.handleCloseClick }>Back</Button>
                                            </ButtonToolbar>
                                        </Form>
                                    </div>
                                    
                            </Card.Body>
                            </Card>
                        </Container>
                        <NoserLoading show={this.state.isloading} />
                    </div>


                )
        }

}

export  default CostCenterCreate