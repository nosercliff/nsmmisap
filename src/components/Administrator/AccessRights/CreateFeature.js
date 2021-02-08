import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Modal
} 
from '../../../noser-hris-component';

class CreateFeature extends Component {
    constructor(props) {
        super(props)
        this.module = React.createRef();
        this.submodule = React.createRef();
        this.state = {
            featureName     :   '',
            url             :   '',
            parentId        :   '0',
            isParent        :   false,
            hasDivider      :   false,
            orderId         :   '0',
            featuresLst     :   [],
            moduleLst       :   [],
            subModuleLst    :   [],
            subModuleLstTmp :   [],

            disableInput    :   false
        }
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetFeatures()
        this.props.onRefInclusionModal(this)
    }
    componentWillUnmount() {
        this.props.onRefInclusionModal(undefined)
    }
    initialize=(e)=>{
        this.setState({
            userinfo        :   JSON.parse(sessionStorage.getItem("userData")),
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            featureName     :   '',
            url             :   '',
            parentId        :   '0',
            isParent        :   false,
            hasDivider      :   false,
            orderId         :   '0',
            featuresLst     :   [],
            moduleLst       :   [],
            subModuleLst    :   [],
            subModuleLstTmp :   [],

            disableInput    :   false
        })
        this.GetFeatures()
    }
    handleSubmit = (e) =>{
        this.setState({isloading:true})

        if(!this.state.isParent){
            if(this.state.parentId=="0"){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please select module.",
                    fade        :   true
                })
                return 
            }
    
            if(this.state.url==""){
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "Please enter feature url.",
                    fade        :   true
                })
                return 
            }
        }
        
        const param = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "FeatureName":this.state.featureName,
            "Url":this.state.url,
            "ParentId":this.state.parentId,
            "IsParent":this.state.isParent ? "1" : "0",
            "HasDivider":this.state.hasDivider ? "1" : "0",
            "OrderId":this.state.orderId,
        }
        
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Administrator/AddFeature",  param
            )
            .then(res => {
                const data = res.data;
                this.setState({
                    isloading   :   false,
                    alerttype   :   res.data.status=="1" ? "Success!" : "!Error",
                    isshow      :   true,
                    color       :   res.data.status=="1" ? "success" : "danger",
                    message     :   data.message,
                    fade        :   true
                });
            })
            .catch(error=>{
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade        :   true
                })
            })
    }
    handleModalClose = () => {
        this.props.onHide();            
    }
    handleChangeModule = (e) =>{
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length==0)
        {
            this.setState({parentId:"0"})
            return
        }
        this.state.parentId= e[0].id
        this.state.subModuleLst = this.state.subModuleLstTmp.filter(x=>x.moduleId==e[0].id)
    }
    handleChangeSubModule = (e) => {
        this.setState({alerttype:"",isshow:false,color:"",message:"",fade:false});
        if(e.length == 0) {
            this.setState({parentId:"0"})
            return
        }
        this.state.parentId = e[0].id
    }
    
    GetFeatures(){
        this.setState({isloading:true,isDisable:true})
        const params = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Administrator/GetFeatures", params)
        .then(res => {
            const data = res.data
            let _selectedFeatures = []
            let _modules = []
            let _submodules = []
            data.features.map(function(menu,a){
                _modules.push({
                    id : menu.id,
                    name : menu.name
                })
                menu.subModules.map(function(submenu,b){
                    if(submenu.isParent=="1")
                    {
                        _submodules.push({
                            moduleId: submenu.moduleId,
                            id      : submenu.id,
                            name    : submenu.name
                        })
                    }
                    
                })
            })
            
            this.setState({
                isloading   :   false,
                alerttype   :   data.status=="1" ? "Success!" : "Error!",
                isshow      :   data.status=="1" ? false : true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true,
                featuresLst :   data.features,
                moduleLst   :   _modules,
                submoduleLst:   _submodules,
                subModuleLstTmp:_submodules
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
            })
        })
    }
    handleChangeCheckbox(e) {
        if(e.target.name=="isParent"){

            this.setState({
                            [e.target.name]: e.target.checked,
                            parentId:'0',
                            disableInput:e.target.checked
                        })
            this.module.current.clear()
            this.submodule.current.clear()

            
        }
        else{
            this.setState({[e.target.name]: e.target.checked})
            
        }
        console.log(this.state.hasDivider)
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
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
                        CREATE FEATURE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form.Row>
                            <Form.Group as={Col} sm={2} >
                                <Form.Check 
                                    type="checkbox" 
                                    label="Is Parent" 
                                    onChange={e => this.handleChangeCheckbox(e)}
                                    //checked={this.state.ThirdCutOff}
                                    //disabled={this.state.disabledThird}
                                    name="isParent"
                                />        
                            </Form.Group>
                            <Form.Group as={Col} sm={6} >
                                <Form.Check 
                                    type="checkbox" 
                                    label="Has Divider" 
                                    onChange={e => this.handleChangeCheckbox(e)}
                                    checked={this.state.hasDivider}
                                    //disabled={this.state.disabledThird}
                                    name="hasDivider"
                                />        
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={12} >
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.handleChangeModule}
                                    options={this.state.moduleLst}
                                    placeholder="Select Module"
                                    ref={this.module}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={12} >
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.handleChangeSubModule}
                                    options={this.state.subModuleLst}
                                    placeholder="Select Sub-Module"
                                    ref={this.submodule}
                                    disabled={this.state.disableInput}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={12} >
                                <Form.Control 
                                    name='featureName'
                                    type="text" 
                                    placeholder="Enter Feature Name" 
                                    onChange={this.handleChange} 
                                    autoComplete="off" 
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={12} >
                                <Form.Control 
                                    name='url'
                                    type="text" 
                                    placeholder="Enter URL" 
                                    onChange={this.handleChange} 
                                    autoComplete="off" 
                                    disabled={this.state.disableInput}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm={12} >
                                <Form.Control 
                                    name='orderId'
                                    type="text" 
                                    placeholder="Enter Order #" 
                                    onChange={this.handleChange}  
                                    autoComplete="off" 
                                />
                            </Form.Group>
                        </Form.Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" style={{minWidth:'60px',marginRight:'1pt'}} className="ml-auto" onClick = { this.handleSubmit }>Save</Button>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
        </Modal>
        );
    }
}
export default CreateFeature