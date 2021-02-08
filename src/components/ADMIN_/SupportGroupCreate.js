import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class SupportGroupCreate extends Component {
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
            name:"",
            
        }
         
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
       
    }

    onChangeSupportGroup(e){
        console.log(e)
        this.setState({name:e.target.value})
    }

    handleSaveClick = event => {
        const supportGroupParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
	        "ClientId":"1",
            "Name":this.state.name
        }
        console.log(supportGroupParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddSupportGroup",  supportGroupParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get data");
                console.log(data)
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
                            <Card.Header>Create Support Group</Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                        {this.state.Message}
                                    </Alert>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                        <Form.Control 
                                                name="name"
                                                type="text" 
                                                placeholder="Name" 
                                                value={this.state.name} 
                                                onChange={this.onChangeSupportGroup.bind(this)} 
                                                autoComplete="off" 
                                            />
                                        </Col>

                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Submit
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/SupportGroup">
                                            Back
                                        </Button>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
            </div> 
            
        )
    }
}

export default SupportGroupCreate;