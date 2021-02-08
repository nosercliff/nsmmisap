import { axios,Banner, Button, ButtonToolbar, Card, Col, Component, Container, 
        Form, NavLink, NoserLoading, React,Alert, AppConfiguration} from "../../noser-hris-component";
import {CipherString} from '../../noser-sec'
class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isloading:true,
            alertType:"",
            isshow:false,
            message:"",
            color:"",
            fade:true,
            currentPassword:"",
            newPassword:"",
            confirmNewPassword:"",
            userinfo:[]
        };
    }
    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isloading:false})
          })
    } 
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=(e)=>{

        const userParam = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":this.state.userinfo.employeeId,
            "OldPassword":CipherString(this.state.currentPassword),
            "NewPassword":CipherString(this.state.newPassword)
        }
        console.log(userParam)

        if(this.state.newPassword!=this.state.confirmNewPassword)
        {
            this.setState({ navigate: false,
                isshow:true,
                color:"warning",
                alertType:"Warning! ",
                message:"New Password and Confirmation Password does not matched.",
                fade:true,
                isloading:false 
            })
            return
        }
        console.log(this.state.currentPassword)
        if(this.state.currentPassword=='' || this.state.newPassword=='' || this.state.confirmNewPassword=='')
        {
            this.setState({ navigate: false,
                isshow:true,
                color:"warning",
                alertType:"Warning! ",
                message:"Please input field for Current Password, New Password and Confirm Password.",
                fade:true,
                isloading:false 
            })
            return
        }
        this.setState({ isloading: true })
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Authentication/ChangePassword",userParam)
        .then(res => {
            const data = res.data
            console .log(data);
            if(data.status==="1")
            {
                this.setState({
                    isshow:true,
                    color:"success",
                    alertType:"Success! ",
                    message:data.message,
                    fade:true,
                    currentPassword:"",
                    newPassword:"",
                    confirmNewPassword:"",
                    isloading:false  
                })
            }
            else
            {
                this.setState({ navigate: false,
                                isshow:true,
                                color:"danger",
                                alertType:"Error! ",
                                message:data.message,
                                fade:true,
                                isloading:false 
                            })
            }
            
        })
        .catch(error=>{
            this.setState(
            { 
                isloading:false,
                alertType:"Error! ", 
                show:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    render() {
        return (
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Change Password</Card.Header>
                        <Card.Body>
                            <div>
                                <Form>
                                    <Alert height="70"  isOpen={this.state.show} color={this.state.color} fade={this.state.fade}>
                                        <strong>{this.state.alertType}</strong> {this.state.message}
                                    </Alert>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Current Password"
                                            autoComplete="off"
                                            name="currentPassword"
                                            value={this.state.currentPassword}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter New Password"
                                            autoComplete="off"
                                            name="newPassword"
                                            value={this.state.newPassword}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm New Password"
                                            autoComplete="off"
                                            name="confirmNewPassword"
                                            onKeyDown={this._handleKeyDown}
                                            value={this.state.confirmNewPassword}
                                            onChange={this.handleChange}
                                        />

                                        <ButtonToolbar className="mt-5">
                                            <Button variant="success" type="button" onClick={this.handleSubmit}>
                                                Submit
                                            </Button>&nbsp;&nbsp;
                                            <NavLink to="/home">
                                                <Button variant="danger">Back</Button>
                                            </NavLink>
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        );
    }
}

export default ChangePassword;
