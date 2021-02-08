import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class InclusionCreate extends Component {
            constructor() {
                super()
                this.state = {
            selected: [],
            inclusionList: [],
            inclusionTypeList: [],
            selectedInclusionType: "",
            selectedInclusionTypeId: "",
            selectedInclusion: "",
            selectedInclusionId: "",
            userinfo: [],
            isLoading: true,
            AlertType: "",
            Show: false,
            Message: "",
            Color: "",
            Fade: true,
                }
                this.textInput = React.createRef(); 
            }

      //handleCoverChangeInclusion = this.handleCoverChangeInclusion.bind(this)
     handleCoverChangeInclusionType = this.handleCoverChangeInclusionType.bind(this)

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetInclusionType()
        this.GetInclusion()
        sleep(1000).then(() => {
            this.setState({isLoading:false})})
    }
    handleChange() {
                this.state.selectedInclusion= this.textInput.current.value;
            }

    handleCoverChangeInclusion(selectedOptions){
                    this.state.selectedInclusion = this.textInput.current.value;
            }
    handleCoverChangeInclusionType (e) {
        if (e.length > 0) {
            this.state.selectedInclusionType = e[0].name
            this.state.selectedInclusionTypeId = this.GetInclusionTypeId(e[0].name)
        }
    }
    GetInclusionTypeId(name) {
        let inclusionTypeId = ''
        for (let i = 0; i <= this.state.inclusionTypeList.length; i++) {
            if (this.state.inclusionTypeList[i]["name"] === name) {
                inclusionTypeId = this.state.inclusionTypeList[i]['id'];
                break;
            }
        }
        return inclusionTypeId
    }

    GetInclusion() {
            const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":"" ,
            "Name":  ""
            };
            axios
                .post(
                    AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusions", inclusionParams
                )
                .then(res => {
                    const data = res.data;
                    console.log(data)
                    this.setState({inclusionList: data.inclusions});
                })
        }
    GetInclusionId(name) {
            let InclusionId = ''
            for (let i = 0; i <= this.state.inclusionList.length; i++) {
                if (this.state.inclusionList[i]["name"] === name) {
                    InclusionId = this.state.inclusionList[i]['id'];
                    break;
                }
            }
            return InclusionId
        }

    GetInclusionType() {
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":  ""
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", typeParams
            )
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({inclusionTypeList: data.inclusionTypes});
            })
    }

  

    
    handleSaveClick = event => {
                console.log(this.state.selectedInclusionId);
                console.log("textInput");
               
        const inclusionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":this.state.selectedInclusionTypeId,
            "Name":  this.state.selectedInclusion
        };

        axios
            .post( 
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddInclusion", inclusionParams
            )
            .then(res => {
                
                const data = res.data;
                console.log(res.data);
               this.setState({isLoading:false})

                    var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isLoading:false,
                        AlertType:"Success!",
                        show:true,
                        Color:alertType,
                        Message:data.message ,
                        Fade:true
                    });
            })
            .catch(error=>{
                this.setState(
                {
                    isLoading:false,
                    AlertType:"Error! ",
                    Show:true,
                    Color:"danger",
                    Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    Fade:true
            })
        })

    }


    render() {
        return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Inclusion - Create</Card.Header>
                        <Card.Body>
                            <Form onSubmit={ this.onSubmitClick } ref={form => this.form = form}>
                               <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeInclusionType}
                                                options={this.state.inclusionTypeList}
                                                placeholder="Select Inclusion Type"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Form.Control type="text" placeholder="Enter New Inclusion Type" 
                                    ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                            <Button variant="danger" href="/Inclusion">
                                                Close
                                            </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    <NoserLoading show={this.state.isLoading} />
                </Container>
            </div>
        )
    }

}

export  default InclusionCreate