import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class LoanTypeCreate extends Component {
    constructor() {
        super()
        this.state = {
            selected: [],
            loanType: "",
            description: "",
            userinfo:[],
            isLoading: true,
            AlertType: "",
            Show: false,
            Message: "",
            Color: "",
            Fade: true,

        }
        
    }
  

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
        }

    handleChange=(e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    handleSaveClick = event => {
        const loanParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.loanType,
            "Description": this.state.description
        };
        console.log(loanParams)
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddLoanType", loanParams
        )
        .then(res => {
            const data = res.data;
            console.log(data);
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
                        <Card.Header>Loan Type - Create</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Form.Control type="text" 
                                        placeholder="Enter Loan Type" 
                                        name="loanType"
                                        value={this.state.loanType}
                                        onChange={ this.handleChange}
                                        autoComplete="off"/>
                                    </Col>
                                     <Col sm={12} className="mt-3">
                                        <Form.Control type="text" 
                                        placeholder="Enter Description" 
                                        name="description"
                                        value={this.state.description}
                                        onChange={ this.handleChange}
                                        autoComplete="off"/>
                                    </Col> 
                                </Form.Group>
                            </Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success"className="ml-auto" onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/LoanType">
                                            Close
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                    <NoserLoading show={this.state.isloading} />
                </Container>
            </div>
        )
    }
}

export default LoanTypeCreate
