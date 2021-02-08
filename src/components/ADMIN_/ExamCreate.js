import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';

class ExamCreate extends Component {
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
            name:"",
            examDescription:"",
            examInstruction:"",
            
        }
         
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
       
    }

    onChangeExamName(e){
        console.log(e)
        this.setState({name:e.target.value})
    }

    onChangeExamDescription(e){
        console.log(e)
        this.setState({examDescription:e.target.value})
    }

    onChangeExamInstruction(e){
        console.log(e)
        this.setState({examInstruction:e.target.value})
    }

    handleSaveClick = event => {
        const examParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":this.state.name,
            "Description":this.state.examDescription,
            "Instructions":this.state.examInstruction
        }
        console.log(examParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddExam",  examParams
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
                            <Card.Header>Create Exam </Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text"
                                                name="name"
                                                value={this.state.name}
                                                placeholder="EXAM NAME"
                                                onChange={this.onChangeExamName.bind(this)} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text"
                                                name="examDescrition"
                                                value={this.state.examDescription}
                                                placeholder="EXAM DESCRIPTION"
                                                onChange={this.onChangeExamDescription.bind(this)} 
                                                autoComplete="off"
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">                
                                            <Form.Control 
                                                type="text"
                                                name="examInstruction"
                                                value={this.state.examInstruction}
                                                placeholder="EXAM INSTRUCTIONS"
                                                onChange={this.onChangeExamInstruction.bind(this)} 
                                                autoComplete="off"
                                            />
                                        </Col>


                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary"  onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/Exam">
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

export default ExamCreate;