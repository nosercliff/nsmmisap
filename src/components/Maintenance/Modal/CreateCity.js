import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Modal
} 
from '../../../noser-hris-component';

class CreateCity extends Component {
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
            regionId    :   '',
            regionName  :   '',
            provinceId  :   '',
            name        :   '',
            disableBtn  :   true,
            regionListDDL:  [],
            provinceListDDL:[]
        })
        this.GetRegion()
        this.GetProvince()
    }
    GetRegion() {
        this.setState({isloading:true});
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  params)
        .then(res => {
            const data = res.data;
            this.setState({ regionListDDL:data.regions,isloading:false});
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
    GetProvince() {
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Region": this.state.regionName
        };

         axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  params)
        .then(res => {
            const data = res.data;
            this.setState({ provinceListDDL : data.provinces });
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
    handleSubmit = (e) =>{
        this.setState({isloading:true})

        if(this.state.regionId===''){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select region name.",
                fade        :   true
            })
            return 
        }

        if(this.state.provinceId===''){
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "Please select province name.",
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
                message     :   "Please enter city name.",
                fade        :   true
            })
            return 
        }
        const param = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "RegionId": this.state.regionId,
            "ProvinceId": this.state.provinceId,
            "Name": this.state.name
        }
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddCity",  param
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
    handleChangeRegion = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length===0)
        {
            this.state.regionId= ''
            this.state.regionName= ''
            this.state.provinceId= ''
            this.GetProvince()
            return
        }
        this.state.regionId = e[0].id
        this.state.regionName = e[0].name
        this.GetProvince()
    }
    handleChangeProvince = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length===0)
        {
            this.state.provinceId= ''
            return
        }
        this.state.provinceId = e[0].id
    }
    handleChangeCity = (e) =>{
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
                        CREATE CITY
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
                                REGION
                            </Form.Label>
                            <Col sm="10">
                                <Typeahead 
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={ this.handleChangeRegion }
                                    options={this.state.regionListDDL}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                PROVINCE
                            </Form.Label>
                            <Col sm="10">
                                <Typeahead 
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={ this.handleChangeProvince }
                                    options={this.state.provinceListDDL}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                CITY
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control 
                                name='name'
                                type="text" 
                                onChange={this.handleChangeCity} 
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
export default CreateCity