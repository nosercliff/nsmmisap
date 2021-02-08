import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class TrainingTypeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fade            :   true, 
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",

            name            :   "",

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    onChangeName = (e) => {
        this.setState({name     :   e.target.value})
    }

    handleSaveClick = event => {
        this.setState({isloading:true})

        const saveParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   this.state.name,
        };

        console.log("Save Params")
        console.log(saveParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddTrainingType",  saveParams
             )
             .then(res => {
                 const data = res.data;
                 //console.log("Save Results")
                 //console.log(data)
                 if(data.status=="1"){
                this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
                    });
                
                }
                else {
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
                }
            })
            .catch(error=>{
                this.setState({
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
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE >> TRAINING TYPE (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Form.Group as={Col} sm={12} controlId="formGridPassword">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                                placeholder="Enter Name"
                                            />
                                        </Form.Group>
                                    </Form.Row>

                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/trainingtype">
                                            <Button variant="danger" href="/trainingtype" style={{minWidth:'60px'}}>
                                                Back
                                            </Button>
                                        </NavLink>
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

export  default TrainingTypeCreate
