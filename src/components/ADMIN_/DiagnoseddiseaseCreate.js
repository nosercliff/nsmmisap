import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class DiagnoseddiseaseCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userinfo  :   [],
            isloading :   false,
            isshow    :   false,
            alerttype :   "",
            message   :   "",
            color     :   "",
            fade      :   true,
            name:""
            
        }
         
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
       
    }

    onChangeDiagnosedName(e){
        console.log(e)
        this.setState({name:e.target.value})
    }

    handleSaveClick = event => {
        const diseaseParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":this.state.name,
        }
        console.log(diseaseParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddDisease",  diseaseParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get data");
                console.log(data)
                if(data.status=="1")
                {
                    this.setState(
                        { 
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
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            })
        
    }

    render() {
        

        return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>Diagnosed Disease</Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                        {this.state.Message}
                                    </Alert>
                                    <Form.Row>
                                        <Col sm={6}>
                                        <Form.Control 
                                                type="text"
                                                name="name"
                                                value={this.state.name}
                                                placeholder="NAME"
                                                onChange={this.onChangeDiagnosedName.bind(this)} 
                                                autoComplete="off"
                                            />
                                        </Col>

                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Submit
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/Diagnoseddisease">
                                            Back
                                        </Button>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                    <NoserLoading show={this.state.isloading} />
            </div> 
            
        )
    }
}

export default DiagnoseddiseaseCreate;