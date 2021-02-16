import {
    React,Component, CipherString, Button, ButtonToolbar, Card, 
    Form, Col, axios, Alert, AppConfiguration,
    NoserLoading, Redirect, Container, NavLink
} 
from '../../noser-hris-component';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isloading:false,isshow:false,alerttype:"",message:"",color:"",fade:true,
            navigate: false,
            referrer: null,
            username: "",
            password: "",
            loginErrors: "",
            clientId:"",
            userId:"",
            employeeId:""
        };
    }
    componentDidMount(){
        sessionStorage.clear();
        console.log('ds')
        console.log(CipherString('jdrosario'))
        //console.log(DeciperString('3QP9JB8lVouiuaZ7u9Mk86IBLem7mQOGvttbNJFY10RpYt6skgmrhQ=='))
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value,isshow:false,message:'',fade:true,alerttype:'',color:''})
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit(e)
        }
    }
    handleSubmit = (e) =>
    {
        
        if(this.state.username.toString().trim().length==0 || this.state.password.toString().trim().length==0)
        {
            this.setState({isshow:true,alerttype:"Warning!",message:"User name or Password is required.",color:"warning",fade:true})
            return
        }
        this.setState({isloading:true})
        const params = {
            "UserName": this.state.username,
            "Password":CipherString(this.state.password)
        };
        
        console.log(params)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Authentication/AuthenticateUser", params)
            .then(res => {
                const data = res.data;
                console.log(res.data)
                this.setState({isloading:false})
                if(data.status=="1")
                {
                    sessionStorage.setItem("userData", JSON.stringify(data))
                    this.setState({clientId:data.clientId,userId:data.userId,employeeId:data.employeeId})
                    this.GetUserAccess()
                }
                else
                {
                    this.setState(
                        {
                            isloading:false,
                            alerttype:"Error!",
                            isshow:true,
                            color:"danger",
                            message: data.message,
                            fade:true
                        })
                }
             })
             .catch(error=>{
                console.log(error)
                this.setState(
                {
                    isloading:false,
                    alertType:"Error!",
                    show:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                })
            })
    }
    GetUserAccess = (e) =>{
        this.setState({isloading:true,isDisable:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userId,
            "EmployeeId":this.state.employeeId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/GetUserAccess", params)
        .then(res => {
          const data = res.data
          
          this.setState({
              isloading   :   false,
              alerttype   :   data.status=="1" ? "Success!" : "Error!",
              isshow      :   data.status=="1" ? false : true,
              color       :   data.status=="1" ? "success" : "danger",
              message     :   data.message,
              fade        :   true,
          });
          if(data.status=="1"){
            sessionStorage.setItem("userAccess", JSON.stringify(data.features))
            this.setState({navigate: true,isloading:false})
          }
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true,
            })
        })
      }
    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/home" push={true} />;
        } 
        return (
            <div className="login-frm">
                <Container className="mt-50">
                    <Card style={{background : "#f0fff9"}}>
                        <Card.Header style={{background : "#ababac"}}>Human Resource Information System</Card.Header>
                        <Card.Body>
                            <div>
                                <Form >
                                <Form.Group as={Col} controlId="formGridEmail">
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Username"
                                        autoComplete="off" 
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        autoComplete="off" 
                                        name="password"
                                        value={this.state.password}
                                        onKeyDown={this.handleKeyDown}
                                        onChange={this.handleChange}/>
                                    <ButtonToolbar className="mt-3">
                                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleSubmit}>
                                            Login
                                        </Button>
                                    </ButtonToolbar>
                                </Form.Group>
                                </Form>
                            </div>
                        </Card.Body>
                        <Card.Footer style={{color: "#000000"}}>Noser HRIS © 2019-2020. All Rights Reserved</Card.Footer>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        );
    }
    
}
export default Login;
