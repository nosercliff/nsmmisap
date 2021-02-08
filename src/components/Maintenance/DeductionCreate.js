import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class DeductionCreate extends Component {
            constructor() {
                super()
                this.state = {
            selected: [],
            deductionList: [],
            deductionTypeList: [],
            selectedDeductionType: "",
            selectedDeductionTypeId: "",
            selectedDeduction: "",
            selectedDeductionId: "",
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

      
     handleCoverChangeDeductionType = this.handleCoverChangeDeductionType.bind(this)

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
       this.GetDeductionType()
        this.GetDeduction()
        sleep(1000).then(() => {
            this.setState({isLoading:false})})
    }
    handleChange() {
                this.state.selectedDeduction= this.textInput.current.value;
            }

    handleCoverChangeInclusion(selectedOptions){
                    this.state.selectedDeduction = this.textInput.current.value;
            }

    GetDeduction() {
           const deductionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"111", 
	        "UserId":"35000",
            "TypeId":"",
            "Name":""
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductions", deductionParams
            )
                .then(res => {
                    const data = res.data;
                    console.log(data)
                    this.setState({deductionList: data.deductions});
                })
        }
    GetDeductionId(name) {
            let DeductionId = ''
            for (let i = 0; i <= this.state.deductionList.length; i++) {
                if (this.state.deductionList[i]["name"] === name) {
                    DeductionId = this.state.inclusionList[i]['id'];
                    break;
                }
            }
            return DeductionId
        }

    GetDeductionType() {
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"111", 
	        "UserId":"35000",
            "Name":""
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", typeParams
            )
            .then(res => {
                const data = res.data;
                console.log(data)
                this.setState({deductionTypeList: data.deductionTypes});
            })
    }

    handleCoverChangeDeductionType (e) {
        if (e.length > 0) {
            this.state.selectedDeductionType = e[0].name
                this.state.selectedDeductionTypeId = this.GetDeductionTypeId(e[0].name)
        }
    }

    GetDeductionTypeId(name) {
                    let DeductionTypeId = ''
                    for (let i = 0; i <= this.state.deductionTypeList.length; i++) {
                        if (this.state.deductionTypeList[i]["name"] === name) {
                            DeductionTypeId = this.state.deductionTypeList[i]['id'];
                            break;
                        }
                    }
                    return DeductionTypeId
                }
    handleSaveClick = event => {
        const deductionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"111", 
	        "UserId":"35000",
            "TypeId":this.state.selectedDeductionTypeId,
            "Name":this.state.selectedDeduction
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddDeduction", deductionParams
            )
            .then(res => {
                const data = res.data;
                console.log(deductionParams);
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
                        <Card.Header>Deduction - Create</Card.Header>
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
                                                onChange={this.handleCoverChangeDeductionType}
                                                options={this.state.deductionTypeList}
                                                placeholder="Select Deduction Type"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Form.Control type="text" placeholder="Enter New Deduction Type" 
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
                                            <Button variant="danger" href="/Deduction">
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

export  default DeductionCreate