import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Modal
} 
from '../../../noser-hris-component';

class CreateLocation extends Component {
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
            regionId    :   '',
            name        :   '',
            disableBtn  :   true,
            regionListDDL:  []
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
            clientId    :   '',
            cityId      :   '',
            name        :   '',
            disableBtn  :   true,
            clientListDDL:  [],
            cityListDDL :   []
        })
        this.GetClients()
        this.GetCity()
    }
    GetClients(){
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", params)
                .then(res => {
                    const data = res.data;
                    this.setState({clientListDDL : data.clients})
                })
    }
    GetCity(){
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities", params)
            .then(res => {
                const data = res.data;
                this.setState({cityListDDL:data.cities})
            })
    }
    handleSubmit = (e) =>{
        this.setState({isloading:true})

        if(this.state.clientId===''){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select client name.",
                fade        :   true
            })
            return 
        }

        if(this.state.cityId===''){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select city name.",
                fade        :   true
            })
            return 
        }

        if(this.state.name===""){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please enter location name.",
                fade        :   true
            })
            return 
        }
        const param = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.clientId,
            "UserId":this.state.userinfo.userId,
            "CityId": this.state.cityId,
            "Name": this.state.name
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/AddClientLocation",  param
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
                    name        :   '',
                    regionId    :   '',
                    
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
    handleChangeClient = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        this.state.clientId = e.length===0 ? "" : e[0].id
    }
    handleChangeCity = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        this.state.cityId = e.length===0 ? "" : e[0].id
    }
    handleChangeLocation = (e) =>{
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
                        CREATE LOCATION
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                CLIENT
                            </Form.Label>
                            <Col sm="9">
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.handleChangeClient}
                                    options={this.state.clientListDDL}
                                    ref="Client"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                CITY
                            </Form.Label>
                            <Col sm="9">
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.handleChangeCity}
                                    options={this.state.cityListDDL}
                                    ref="City"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                LOCATION NAME
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    name='name'
                                    type="text" 
                                    onChange={this.handleChangeLocation} 
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
export default CreateLocation