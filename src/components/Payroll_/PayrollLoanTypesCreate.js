import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */

class PayrollLoanTypesCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:false,
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            loanTypes: "",
        } 
        /* this.onChangeClientype=this.onChangeClientype.bind(this);  */

    
    }




    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }
    
    handleSaveClick = () => {
        this.setState({isLoading:true, loadingText:"Saving employee Loan Types..."})
        const addParam = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.loanTypes,
        }

        console.log("addParam")
        console.log(addParam)

        axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddLoanType",  addParam
             )
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            isLoading:false,
                            templateName: "",
                            show:true,
                            Color:"success",
                            Message:data.message ,
                            Fade:true
                        });
                }
                else
                {
                    this.setState(
                        { 
                            isLoading:false,
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            },2000)

    }

    
    onChangeLoanTypes = (e) => {
        this.setState({ loanTypes: e.target.value} );
    }

    render() {
        
        return (
            <div>

                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Create Payroll Loan Types</Card.Header>
                        <Card.Body>
                            <Form >
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Payroll Loan Types" 
                                            ref="loanTypes"
                                            autoComplete="off" 
                                            name="loanTypes"
                                            value={this.state.loanTypes}
                                            onChange={this.onChangeLoanTypes}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className="mt-5">

                                    <ButtonToolbar>
                                        <Button  className="ml-auto" variant="success" onClick = { this.handleSaveClick }>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/PayrollLoanTypes">
                                            Back
                                        </Button>
                                    </ButtonToolbar>
                                </div>
                            
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
            </div>
        );
    }
}

export default PayrollLoanTypesCreate;
