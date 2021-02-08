import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

class BreaktimeCreate extends Component {
    constructor(props) {
        super(props);
        this.state={
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            templateName:"",
            ispaid:false,
            minutes:"15",
            starttime:moment(),
        }
        this.baseState = this.state;
        this.onChangeTime=this.onChangeTime.bind(this)
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }
    onChangeName = (e) => {
        this.setState({templateName:e.target.value})
    }
    onChangePaid= (e) => {
        this.setState({ispaid:e.target.checked})
    }
    onChangeMin= (e) => {
        this.setState({minutes:e.target.value})
    }
    onChangeTime = starttime => this.setState({ starttime });
    
    onSubmitClick = (e) =>{
        e.preventDefault()
        this.setState({isloading:true})
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "TypeId":"1",
            "Description":this.state.templateName,
            "StartTime":moment(this.state.starttime).format("HH:mm" ),
            "Minutes":this.state.minutes,
            "IsPaid":(this.state.ispaid)? "1" : "0"
         };

        console.log(typeParams)
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Timekeeping/AddBreaktime",  typeParams
        )
        .then(res => {
            const data = res.data;
            this.setState({
                breaktimeGridList   :   data.breaktimes,
                isLoading           :   false,
            });
            
            if(data.status=="1"){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Success!",
                    isshow          :   true,
                    color           :   "success",
                    message         :   data.message,
                    fade            :   true
                });
            }
            else{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   data.message,
                    fade            :   true
                })
            }
        })
        .catch(error=>{
            this.setState(  {
                isloading       :   false,
                alerttype       :   "Error!",
                isshow          :   true,
                color           :   "danger",
                message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade            :   true
            })
        })

    }
    
    render() {
    return(
        <div>
        <Banner />
            <Container className="mt-5">
            <Card>
                <Card.Header closeButton>
                    <Card.Title id="contained-modal-title-vcenter">Breaktime - Create</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Control 
                                        type="text" 
                                        name="templateName"
                                        placeholder="Breaktime Template Name" 
                                        value={this.state.templateName}
                                        onChange={this.onChangeName}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    label="UnPaid" 
                                    name="ispaid"
                                    checked={this.state.ispaid}
                                    onChange={this.onChangePaid}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Control type="text" 
                                                    value={this.state.minutes}
                                                    placeholder="15" 
                                                    name="minutes"
                                                    onChange={this.onChangeMin}
                                        />
                                    </Col>
                                    <Col xs={0}>
                                        <Form.Label>Time</Form.Label>
                                    </Col>
                                    <Col xs={10}>
                                        <TimePicker
                                            name="starttime"
                                            showSecond={false}
                                            defaultValue={this.state.starttime}
                                            value={this.state.starttime}
                                            className="xxx"
                                            format={'HH:mm'}
                                            use24hours
                                            inputReadOnly
                                            onChange={this.onChangeTime}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <ButtonToolbar >
                                <Button variant="success" className="ml-auto" onClick={this.onSubmitClick}>
                                Save
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger"href="/breaktime" >
                                Back
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
                <NoserLoading show={this.state.isloading} />
            </Container>
        </div>
        )
    }

}

export  default BreaktimeCreate
