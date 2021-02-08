import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props, sizePerPageRenderer
} 
from '../../../noser-hris-component';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';



class TrainingTypeCreateModal extends Component {
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

    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
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
                    MAINTENANCE >> TRAINING MAINTENANCE >> TRAINING TYPE (CREATE)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3" style={{fontWeight : "bold"}}>
                                            TRAINING TYPE NAME
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar sm={12} className="mt-3">
                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleSaveClick}>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose} >
                            Close
                        </Button>
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default TrainingTypeCreateModal