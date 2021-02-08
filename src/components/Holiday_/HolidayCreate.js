import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    React,Component,BootstrapTable,Type,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container,sizePerPageRenderer
} 
from '../../noser-hris-component';

class HolidayCreate extends Component {
        constructor(props) {
        super(props);
        this.minDate = new moment(props.minDate)
        this.state = {
            isLoading:false,
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            startDate: new Date(),
            holidayTypeList:[],
            coverageList:[
                            {"name":"National","id":"National"},
                            {"name":"Regional","id":"Regional"},
                            {"name":"Provincial","id":"Provincial"},
                            {"name":"City/Town","id":"City"}
                        ],
            rpcList:[],
            holidayTypeId:"",
            locationId:"",
            coverageId:"",
            holidayType:"",
            holidayName:"",
            selectedClientId:"0",
            coverage:"",
            location:"",
            clientspecific: "true",
            getClientList:[],
        }
        this.baseState = this.state;
        this.onChangeHoliday=this.onChangeHoliday.bind(this);
        this.onChangeHolidayType=this.onChangeHolidayType.bind(this);
        this.onChangeCoverage = this.onChangeCoverage.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onSubmitClick=this.onSubmitClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {selected: [],};

    componentDidMount(){
        this.setState({isLoading:true,loadingText:"Loading client list..."})
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetHolidayTypes()
        this.getClientList();
    } 

    handleChange = date => {
        this.setState({
        startDate: date
        });
    };
    handleChangeClientspecific  = (e) =>{
        if(e.target.checked) 
            this.setState({clientspecific: "false"})
        else
        {
            this.setState({clientspecific: ""})
            this.setState({
                selectedClientId: "0",
                selectedClient: "Standard"
            })
        }
    }
    
    onChangeHoliday(e) {
        this.setState({ holidayName: e.target.value} );
    }
    onChangeHolidayType(e) {
        if(e.length==0) return;
        this.setState({ holidayTypeId: e[0].id });
        this.setState({ holidayType: e[0].name });
    }
    onChangeLocation(e) {
        if(e.length==0) return;
        this.setState({ locationId: e[0].id });
        this.setState({ location: e[0].name });
    }
    onChangeCoverage(e) {
        var url = "";
        var coverage = "";
        if(e.length==0) return;
        coverage = e[0].name
        this.setState({ coverageId: e[0].id });
        this.setState({ coverage: e[0].name });
        if(coverage=="National")
            this.setState({ rpcList: [{"name":"","id":""}] });
        if(coverage=="Regional")
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions";
        if(coverage=="Provincial")
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces";
        if(coverage=="City/Town")
            url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities";
        
        const regionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1",
            "Name":""
            };
    
        axios
            .post(url,  regionParams)
            .then(res => {
                const data = res.data;
                if(coverage=="Regional")
                    this.setState({ rpcList: data.regions }); 
                if(coverage=="Provincial")
                    this.setState({ rpcList: data.provinces }); 
                if(coverage=="City/Town")
                    this.setState({ rpcList: data.cities }); 
            }) 
        console.log(e);
    }
    formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
      }
      
    onSubmitClick= () =>{
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "Coverage":this.state.coverageId,
            "LocationId": (this.state.coverageId=="National")? "0" : this.state.locationId,
            "HolidayTypeId":this.state.holidayTypeId,
            "HolidayName":this.state.holidayName,
            "Date":this.formatDate(this.state.startDate)
        };
        
        axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddHoliday",  typeParams
             )
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            holidayName: "",
                            startDate: new Date(),
                            show:true,
                            Color:"success",
                            Message:data.message ,
                            Fade:true
                        });
                    this.refs.holidayType.clear()
                    this.refs.coverage.clear() 
                    this.refs.location.clear() 
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

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId="0"
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        this.setState({isLoading:true,loadingText:"Retrieving Client list..."})
        
    }

    GetClientId(name) {
        let GetClientId = ''
        for (let i = 0; i <= this.state.getClientList.length; i++) {
            if (this.state.getClientList[i]["name"] === name) {
                GetClientId = this.state.getClientList[i]['id']; 
                break;
            }
        }
        return GetClientId

        
    }

    GetHolidayTypes() {
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1"
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHolidayTypes",  typeParams
        )
        .then(res => {
            const data = res.data
            this.setState({holidayTypeList:data.holidayTypes})
        })
    } 
    
    render() {
        return(
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Create Holiday</Card.Header>
                        <Card.Body>
                            <Form onSubmit={ this.onSubmitClick } ref={form => this.form = form}>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                {this.state.Message}
                            </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Typeahead
                                            ref="holidayType"
                                            labelKey='name'
                                            name="holidayType"
                                            value={this.state.holidayType}
                                            onChange={this.onChangeHolidayType}
                                            options={this.state.holidayTypeList}
                                            placeholder="Select Holiday Type"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Form.Control 
                                            ref='holidayName'
                                            type="text" 
                                            placeholder="Enter Holiday Name" 
                                            name="holidayName" 
                                            value={this.state.holidayName}
                                            onChange={this.onChangeHoliday}
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Typeahead
                                            ref="coverage"
                                            name='coverage'
                                            labelKey='name'
                                            value={this.state.coverage}
                                            onChange={this.onChangeCoverage}
                                            options={this.state.coverageList}
                                            placeholder="Select Coverage"
                                            
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Typeahead
                                            ref="location"
                                            name='location'
                                            value={this.state.location}
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeLocation}
                                            options={this.state.rpcList}
                                            placeholder="Select [Region,Province,City]"
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm="2">
                                        Date
                                    </Form.Label>
                                    <Col sm={4}>
                                    <DatePicker
                                        ref='startDate'
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        minDate={this.minDate}
                                        value={this.props.startDate}
                                        dateFormat={"MM/dd/yyyy"}
                                    />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Col sm={2}>
                                        <Form.Check
                                            onChange={ this.handleChangeClientspecific }
                                            type="checkbox" 
                                            name="clientspecific"
                                            label="Apply to All" 
                                            defaultChecked={this.state.clientspecific}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <Typeahead
                                            labelKey='name'
                                            name="client"
                                            onChange={this.onChangeClientList}
                                            options={this.state.getClientList}
                                            placeholder="Please Select Client Here"
                                            disabled = { this.state.clientspecific}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className="mt-5">
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick={this.onSubmitClick}>Save</Button>&nbsp;&nbsp;
                                            <Button href="/holiday"  variant="primary" variant="danger">
                                                Back
                                            </Button>
                                    </ButtonToolbar>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>

            </div>
        )
    }

}

export  default HolidayCreate
