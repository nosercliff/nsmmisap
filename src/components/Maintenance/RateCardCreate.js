import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';


class RateCardCreate extends Component {
            constructor() {
                super();
                this.state = {
                    userinfo        :   [],
                    isloading       :   false,
                    isshow          :   false,
                    alerttype       :   "",
                    message         :   "",
                    color           :   "",
                    fade            :   true,	
                    Fade:true,
                    clientList: [],
                    elementList: [],
                    selected : [],
                    Override:"false",
                    IsAddBasic: false,
                    elementname:"",
                    elementcode:"",
                    percentage:"",
                    selectedpercentage:"",
                    selectedElement: '',
                    selectedElementId: '',
                    selectedClient: '0',
                    selectedClientId: '0',
                    clientspecific: "false",

                }
                this.textInput = React.createRef();

        }
    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetClient()
        this.GetElement()
    }

    handleChangeCode = (e) => {
        this.setState({elementcode:e.target.value})
    }

    handleChangeName = (e) => {
        this.setState({elementname:e.target.value})
    }

    handleChangePercentage = (e) => {
        this.setState({percentage:e.target.value})

    }

    handleChangeAddBasic = (e) => {
        this.setState({IsAddBasic:e.target.checked})
        console.log(this.state)
    }

    handleChangeOverride = (e) => {
        if(e.target.checked)
            this.setState({Override: ""})
        else
            this.setState({Override: "false"})
        console.log(this.state)
    }

    handleChangeClientspecific = (e) => {
        if(e.target.checked) 
            this.setState({clientspecific: ""})
        else
        {
            this.setState({clientspecific: "false"})
            this.setState({
                selectedClientId: "0",
                selectedClient: "Standard"
            })
        }
        console.log(this.state)
        }

    handleChangeElement = (e) => {

        if (e.length > 0) {
            this.state.selectedElement = e[0].name
            this.state.selectedElementId = this.GetElementId(e[0].name)
        }
    }

    handleChangeClient (e) {
        if (e.length > 0) {
            this.state.selectedClient = e[0].name
            this.state.selectedClientId = e[0].id
            console.log(this.state.selectedClientId)
        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = "0"
            console.log(this.state.selectedClientId)
        }
        //console.log(this.state.selectedClient);
    }

    GetElementId(name) {
        let elementId = ''
        for (let i = 0; i <= this.state.elementList.length; i++) {
            if (this.state.elementList[i]["name"] === name) {
                elementId = this.state.elementList[i]['id'];
                break;
            }
        }
        return elementId
    }

    GetElement() {
        const rateparams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Code":"",
            "Name":"",
            "ClientName":""

        };
         axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRateElements",  rateparams
            )
            .then(res => {
                const data = res.data;
                this.setState({ elementList: data.elements});

            })
    }

    GetClient() {
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            };

            axios
                .post(
                    AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList",  clientParams
                )
                .then(res => {
                    const data = res.data;
                    console.log("Test 1");
                    console.log(data);
                    this.setState({ clientList: data.clients,isloading:false});
                })

    }

    onSubmitClick(e){
        this.setState({isloading:true})
        e.preventDefault()

        const elementparams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":"1",
            "Code":this.state.elementcode,
            "Name":this.state.elementname,
            "Percentage":this.state.percentage,
            "OverrideCode":"0",
            "IsAddBasic":(this.state.IsAddBasic)? "1" : "0",
            "IsOverride":(this.state.Override)? "1" : "0",
            "IsStandard":this.state.IsStandard
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddRateElement",  elementparams
                 )
                 .then(res => {
                      const data = res.data;
                      this.setState({isloading:false})
                      if(data.status=="1"){
                          this.setState({
                              isloading       :   false,
                              alerttype       :   "Success!",
                              isshow          :   true,
                              color           :   "success",
                              message         :   data.message,
                              fade            :   true
                          });
                      }
                      else{
                          this.setState({
                              isloading       :   false,
                              alerttype       :   "Error!",
                              isshow          :   true,
                              color           :   "danger",
                              message         :   data.message,
                              fade            :   true
                          })
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

        handleOnChange(){}

    render() {
        return(
            <div>
                    <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Create Rate Card Element</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={6}>
                                        <Form.Check 
                                            onChange={ this.handleChangeClientspecific }
                                            type="checkbox" 
                                            name="clientspecific"
                                            label="Client Specific" 
                                        />
                                    </Col> 
                                    <Col sm={12}>&nbsp;
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleChangeClient}
                                            options={this.state.clientList}
                                            placeholder="Select Client"
                                            disabled = { this.state.clientspecific}
                                        /> 
                                    </Col>
                                    <Col sm={5}>&nbsp;&nbsp;
                                        <Form.Control type="text" 
                                            name="elementcode"
                                            placeholder="Enter Element Code" 
                                            value={this.elementcode} 
                                            onChange={this.handleChangeCode}
                                            autoComplete="off" 
                                        />
                                    </Col>
                                    <Col sm={12}>&nbsp;&nbsp;
                                        <Form.Control type="text" 
                                            placeholder="Enter Element Name" 
                                            //ref={this.textInput} 
                                            value={this.elementname}
                                            onChange={this.handleChangeName}
                                            autoComplete="off" 
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={1}>
                                        <Form.Control type="numeric"
                                        name="numeric"
                                        placeholder="%" 
                                        //onChange={() => this.handleChange()} 
                                        autoComplete="off" 
                                        onChange={this.handleChangePercentage}
                                        ref={this.textInput}
                                        />
                                    </Col>&nbsp;&nbsp;
                                    <Form.Group >
                                        <Form.Check type="checkbox"
                                            label="Add to Basic"
                                            name="IsAddBasic"
                                            //checked={this.state.IsAddBasic}
                                            onChange={this.handleChangeAddBasic}
                                            />
                                    </Form.Group>  
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={3}>
                                        <Form.Check type="checkbox" 
                                            label="Override Standard Element" 
                                            name="override"
                                            onChange={this.handleChangeOverride}
                                        />
                                    </Col> 
                                    <Col sm={9}>
                                            <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={ this.handleChangeElement}
                                            options={this.state.elementList}
                                            placeholder="Select Standard Element"
                                            disabled={ this.state.Override}
                                        /> 
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail" className="mt-10">
                                    <Col >
                                        <ButtonToolbar >
                                                <Button variant="success" className="ml-auto"  onClick={this.onSubmitClick.bind(this)}>
                                                    Save
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="danger" href="/ratecard">
                                                Back
                                                </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                <NoserLoading show={this.state.isloading} />
                </Container>
            </div>


        )
    }

}

export  default RateCardCreate