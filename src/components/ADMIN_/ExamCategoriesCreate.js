import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class ExamCategoriesCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userinfo  :   [],
            isloading :   false,
            isshow    :   false,
            alerttype :   "",
            message   :   "",
            color     :   "",
            fade      :   true,

            fullName:"",
            IsActive:"false"
        }
         
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
       
    }

    onChangeFullName(e){
        console.log(e)
        this.setState({fullName:e.target.value})
    }

    handleChangeIsActive = (e) =>{
        console.log(e)
        if(e.target.unchecked) 
            this.setState({IsActive: "false"})
        else
        {
            this.setState({IsActive: ""})
            
        }
    }

    handleSaveClick = event => {
        const examParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":this.state.fullName
        }
        console.log(examParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddExamCategory",  examParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get data");
                console.log(data)
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            show:true,
                            Color:"success",
                            Message:data.message ,
                            Fade:true
                        });
                    
                    }
                else
                {
                    this.setState(
                        { 
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
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
                            <Card.Header>Create Exam Categories</Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Col sm={6}>
                                            <Form.Control 
                                                type="text"
                                                name="fullName"
                                                value={this.state.command}
                                                placeholder="FULL NAME"
                                                onChange={this.onChangeFullName.bind(this)} 
                                                autoComplete="off"
                                            />
                                        </Col>

                                    </Form.Row>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={6} className="mt-3">
                                            <Form.Check type="checkbox" 
                                                label="IS ACTIVE" 
                                                name="IsActive"
                                                onChange={this.handleChangeIsActive}
                                            />
                                                        
                                            {/* <Form.Check
                                                label="IS ACTIVE"
                                                onChange={e => this.handleChangeCheckboxPaymentMode(e)}
                                                /> */}
                                        </Col>
                                    </Form.Group>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/ExamCategories">
                                            Back
                                        </Button>
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

export default ExamCategoriesCreate;