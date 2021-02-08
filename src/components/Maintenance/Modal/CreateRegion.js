import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Modal
} 
from '../../../noser-hris-component';

class CreateRegion extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.state = {
            userinfo    :   JSON.parse(sessionStorage.getItem("userData")),
            isloading   :   false,
            isshow      :   false,
            alerttype   :   "",
            message     :   "",
            color       :   "",
            fade        :   true,
            name        :   '',
            disableBtn  :   true
        }
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.props.onRefModal(this)
    }
    componentWillUnmount() {
        this.props.onRefModal(undefined)
    }
    initialize=(e)=>{
        this.setState({
            userinfo    :   JSON.parse(sessionStorage.getItem("userData")),
            isloading   :   false,
            isshow      :   false,
            alerttype   :   "",
            message     :   "",
            color       :   "",
            fade        :   true,
            name        :   '',
            disableBtn  :   true
        })
    }
    handleSubmit = (e) =>{
        this.setState({isloading:true})

        if(this.state.name==""){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter region name.",
                fade        :   true
            })
            return 
        }
        
        const param = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":this.state.name
        }
        
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddRegion",  param
            )
            .then(res => {
                const data = res.data;
                this.setState({
                    isloading   :   false,
                    alerttype   :   res.data.status=="1" ? "Success!" : "!Error",
                    isshow      :   true,
                    color       :   res.data.status=="1" ? "success" : "danger",
                    message     :   data.message,
                    fade        :   true,
                    name        :   ''
                });
            })
            .catch(error=>{
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade        :   true,
                    name        :   ''
                })
            })
    }
    handleModalClose = () => {
        this.props.onHide();            
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value,alerttype:"",isshow:false,color:"",message:"",fade:false})
    }
    
    render() {
    return(
        
            <Modal
                {...this.props}
                return
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        CREATE REGION
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                REGION NAME
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    name='name'
                                    type="text" 
                                    onChange={this.handleChange} 
                                    autoComplete="off" 
                                    value={this.state.name}
                                    
                                />
                            </Col>
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto noser-button-mr1" onClick = { this.handleSubmit }>Save</Button>
                        <Button variant="danger" className="noser-button-mr15" onClick={this.props.onHide}>Close</Button>
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
        </Modal>
        );
    }
}
export default CreateRegion