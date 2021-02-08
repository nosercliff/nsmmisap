import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */

class PayrollLoanTypes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            getClientList: [],
            getEmployeeList : [],
            modalLoanShow: false,
        } 
        /* this.onChangeClientype=this.onChangeClientype.bind(this);  */

    
    }




    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        sleep(1000).then(() => {
            this.setState({isLoading:false})
        })
        this.getClientList();
        this.getLoanTypes();
    }
    

    getClientList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            this.setState(
                {
                    isLoading:false,
                    getClientList : res.data.clients ? res.data.clients : []
                });
        })
        .catch(error=>{
            this.setState(
            { 
                isLoading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    getLoanTypes(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Name":"",
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetLoanTypes", getParams)
        .then(res => {
            console.log("GetLoanTypes")
            console.log(res.data)
        })
        .catch(error=>{
            this.setState(
            { 
                isLoading:false,
                alertType:"Error! ", 
                isShow:true,
                color:"danger",
                message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade:true
            })  
        })
    }

    

    render() {
        
        return (
            <div>

                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Payroll Loan Types</Card.Header>
                        <Card.Body>
                            <Form >
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.getClientList}
                                            placeholder="Select Client"

                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <ButtonToolbar>
                                            <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                Search
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                                <div className="mt-5">

                                    {/* <BootstrapTable
                                        caption={Noser.TableHeader({title:"CITY LIST"})}
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        pagination={ paginationFactory(options) }
                                        keyField = "id"
                                        data = { this.state.cityListGridResult }
                                        columns = { columnCity }
                                        selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ 
                                                mode: 'dbclick', 
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => { 
                                                    this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                }                                     
                                            })
                                        }
                                        rowEvents={ rowEvents }

                                        
                                    /> */}

                                    <ButtonToolbar>
                                        <NavLink to="/PayrollLoanTypesCreate">
                                            <Button variant="primary">
                                                Create
                                            </Button>
                                        </NavLink>&nbsp;&nbsp;
                                        <Button variant="danger" href="/home">
                                            Close
                                        </Button>
                                    </ButtonToolbar>
                                </div>
                            
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
            </div>
        );
    }
}

export default PayrollLoanTypes;
