import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class PositionCreate extends Component {
    constructor() {
        super()
        this.state = {
            isloading:false,isshow:false,alerttype:"",message:"",color:"",fade:true,

            positionList                    :   [],
            positionName                    :   '',
            billingRate                     :   '',
            selectedSectionId               :   '',
            selectedDepartmentId            :   '',
            sectionAutocomplete             :   [],
            departmentCodeAutocomplete      :   [],
            
        };

    }

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetSectionCode();
        this.GetPosition();
    }

    GetSectionCode() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "Code"          :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSections",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Section Code");
            console.log(data);
            this.setState({ sectionAutocomplete : data.sections });
         })
    }

    handleEventSection = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedSectionId = e[0].id
        } else {
            this.state.selectedSectionId = ""
        }
        this.GetDepartment();
    }
    
    GetDepartment() {
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   this.state.selectedSectionId,
            "DepartmentId"  :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDepartments",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Departments Code");
            console.log(data);
            this.setState({ departmentCodeAutocomplete  : data.departments });
         })
    }

    handleEventDepartment = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedDepartmentId = e[0].id
        } else {
            this.state.selectedDepartmentId = ""
        }
    }
    
    GetPosition() {
        this.setState({isloading:true})
        const departmentCodeParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId"     :   "",
            "DepartmentId"  :   "",
            "Name"          :   ""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  departmentCodeParams)
        .then(res => {
            const data = res.data;
            console.log("Get Positions List")
            console.log(data);
            this.setState({
                positionList  :   data.positions,
                isloading       :   false,
            });
         })
    }

    IsNumeric(evt){
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /^\d+(.\d+)?$/;
        if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    onChangeBillingRate = (e) => {
        this.setState({
            billingRate : e.target.value
        })
    }

    onChangePositionName = (e) => {
        this.setState({
            positionName : e.target.value
        })
    }

    handleSaveClick = event => {
        this.setState({isloading:true})

        const positionParams = {
            "IpAddress"         :   "0.0.0.0",
            "ClientId"          :   this.state.userinfo.clientId,
            "UserId"            :   this.state.userinfo.userId,
            "SectionId"         :   this.state.selectedSectionId,
            "DepartmentId"      :   this.state.selectedDepartmentId,
            "BillingRate"       :   "0",
            "Name"              :   this.state.positionName,
         };

        console.log("Submit Params")
        console.log(positionParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddPosition",  positionParams
             )
             .then(res => {
                 const data = res.data;
                 if(data.status=="1"){
                this.setState({
                        isloading:false,
                        alerttype:"Success!",
                        isshow:true,
                        color:"success",
                        message: data.message,
                        fade:true
                    });
                }
                else {
                    this.setState({
                        isloading:false,
                        alerttype:"Error!",
                        isshow:true,
                        color:"danger",
                        message: data.message,
                        fade:true
                    });
                }
            })

    }

        render() {
                return(
                    <div >
                        <Banner />
                        <Container className="mt-5">
                            <Card>
                                <Card.Header>Position - Create</Card.Header>
                                <Card.Body>
                                    <div>
                                        <Form>
                                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                                <div className={this.state.color}></div> 
                                                {this.state.message}
                                            </Alert>
                                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.handleEventSection}
                                                        options={this.state.sectionAutocomplete}
                                                        placeholder="Select Section"
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Typeahead
                                                        labelKey='name'
                                                        id="basic-example"
                                                        onChange={this.handleEventDepartment}
                                                        options={this.state.departmentCodeAutocomplete}
                                                        placeholder="Select Department"
                                                    />
                                                </Col>
                                            </Form.Group>
                                            {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter Billing Rate" 
                                                        ref="billingRate"
                                                        autoComplete="off" 
                                                        name="code"
                                                        value={this.state.billingRate}
                                                        onChange={this.onChangeBillingRate}
                                                        onKeyPress={this.IsNumeric.bind(this)}
                                                    />
                                                </Col>
                                            </Form.Group> */}
                                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                                <Col sm={12}>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter Position Name" 
                                                        ref="positionName"
                                                        autoComplete="off" 
                                                        name="code"
                                                        value={this.state.positionName}
                                                        onChange={this.onChangePositionName}
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <ButtonToolbar>
                                                <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Button  href="/Position" variant="danger" onClick={ this.handleCloseClick }>Back</Button>
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

export  default PositionCreate