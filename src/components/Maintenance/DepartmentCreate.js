import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class DepartmentCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo    :   [],
            isloading   :   false,
            isshow      :   false,
            alerttype   :   "",
            message     :   "",
            color       :   "",
            fade        :   true,

            code        :   '',
            description :   '',
        }
    }
    

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))

    }

    onChangeDepartmentCode = (e) => {
        this.setState({
            code : e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    handleSaveClick = event => {
        this.setState({isloading:true})

        const areaParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   this.state.code,
            "Name"          :   this.state.description,
         };

        console.log("Submit Params")
        console.log(areaParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddDepartment",  areaParams
             )
             .then(res => {
                 const data = res.data;
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

    }

    

    render() {


    return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Department - Create</Card.Header>
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
                                                placeholder="Enter Department Code" 
                                                ref="code"
                                                autoComplete="off" 
                                                name="code"
                                                value={this.state.code}
                                                onChange={this.onChangeDepartmentCode}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Enter Department Description" 
                                                ref="description"
                                                autoComplete="off" 
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.onChangeDescription}
                                            />
                                        </Col>
                                    </Form.Group>
                                        
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button  href="/Department" variant="danger" onClick={ this.handleCloseClick }>Back</Button>
                                    </ButtonToolbar>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div> 
        )
    }

}

export  default DepartmentCreate