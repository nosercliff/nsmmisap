import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';

/* 
import WorkScheduleEdit from  "./WorkScheduleEdit" */

class WorkSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading:true,alerttype:"",isshow:false,message:"",color:"",fade:true,
            workscheduleLst     : [],
            workscheduleLstDDL  : [],
            delWorkScheduleList : [],
            selectedDescription : '',
            userinfo            : ''
        } 
    }
    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getWorkSchedule();
        sleep(1000).then(() => {
            this.setState({isloading:false})
        })
    }
    getWorkSchedule(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"0",
            "UserId":this.state.userinfo.userId,
            "Location": "0",
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/GetWorkingSchedules", getParams)
            .then(res => {
                this.setState({
                    workscheduleLstDDL : res.data.workSchedules
                }) 
            })
            this.handleSearch()
    }
    GridDataModified(oldValue, newValue, id, column) {
        console.log(id)
        this.state.workscheduleLst.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }
    handleChanged = (e) => {
        this.setState({isshow:false})
        if(e.length == 0) {
            this.setState({selectedDescription:""})
            return
        }
        this.state.selectedDescription = e[0].description
    } 
    handleSearch = (e) => {  
        this.setState({isloading:true})
        const getParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":"0",
            "Location": "0",
            "Description": this.state.selectedDescription,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/GetWorkingSchedules", getParams)
            .then(res => {
                const data = res.data;
                console.log("Get Work Schedule");
                console.log(res.data);
                this.setState({
                    workscheduleLst : res.data.workSchedules
                })
                if(data.status=="0"){
                    this.setState(
                        {
                            isloading:false,
                            alerttype:"Error! ", 
                            isshow:true,
                            color:"danger",
                            message:data.message ,
                            fade:true
                        });       
                }
                this.setState({isloading:false}); 
            })
            .catch(error=>{
                this.setState(
                { 
                    isloading:false,
                    alerttype:"Error! ", 
                    isshow:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                })  
            }) 
        
    }
    handleDelete = (e) => {
        let delWorkScheduleList = []
        this.setState({isloading:true})
        for (let i = 0; i < this.state.workscheduleLst.length; i++) {
            if (this.state.workscheduleLst[i]["isModified"] == 1) {
                let obj = this.state.workscheduleLst[i]
                delWorkScheduleList.push(obj);
            } 
        }
        
        const param = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "WorkSchedules": delWorkScheduleList,
        }
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/EditWorkSchedule", param)
             .then(res => {
                const data = res.data;
                if(data.status=="1"){
                    this.handleSearch(e)
                }
                this.setState(
                    {
                        isloading:false,
                        isshow:true,
                        color:(data.status=="1") ? "success" : "danger",
                        message:data.message,
                        fade:true
                    }); 
             })
             .catch(error=>{
                this.setState(
                { 
                    isloading:false,
                    alerttype:"Error! ", 
                    show:true,
                    color:"danger",
                    message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade:true
                }) 
            })    
    }
    render() {
        const columnBreaktime = [
            {
                dataField: 'breaktime',
                text: 'Breaktime',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left'}},
                style:{textAlign:'left'}
            },
            {
                dataField: 'duration',
                text: 'Duration',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'}
            },
            {
                dataField: 'startTime',
                text: 'Start Time',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'}
            },
            {
                dataField: 'endTime',
                text: 'End Time',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left'}},
                style:{textAlign:'left'}
            }
        ]

        const columnWorkSched = [
            {
                dataField: 'description',
                text: 'Template Name',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left'}
            },
            {
                dataField: 'startTime',
                text: 'Time-In',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'8%' }},
                style:{textAlign:'center'}
            },
            {
                dataField: 'endTime',
                text: 'Time-Out',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'72%' }},
                style:{textAlign:'left'}
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                
                this.state.workscheduleLst.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        const expandRow = {
            onlyOneExpanding: true,
            renderer: row => 
            (
                <BootstrapTable
                    keyField = "id"
                    data = { row.workScheduleDetails }
                    columns = { columnBreaktime }
                    rowClasses="noser-table-row-class"
                    striped
                    hover
                    condensed
                    expandRow
                    wrapperClasses="table-responsive"
                    rowClasses="noser-table-row-class"
                    noDataIndication={ () => <div>No breaktime details.</div> }
                /> 
            ),
            showExpandColumn: true,
            
          };
        return (
            <div>

                <Banner />
                <Container className="themed-container" fluid={true}>
                    <Card className="mt-5">
                        <Card.Header>Timekeeping >> Work Schedules</Card.Header>
                        <Card.Body>
                            <Form >
                                <Form.Group as={Row} controlId="formGridEmail">
                                    <Col sm={12}>
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='description'
                                        id="basic-example"
                                        onChange={this.handleChanged}
                                        options={this.state.workscheduleLstDDL}
                                        placeholder="Select Work Schedule"
                                    />
                                </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <ButtonToolbar>
                                        <Button variant="primary" className="ml-auto" onClick={ this.handleSearch}>Search</Button>
                                    </ButtonToolbar>
                                </Col>
                                </Form.Group>
                                <div className="mt-2">
                                    <Card.Header>List of Work Schedules</Card.Header>
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.workscheduleLst }
                                            columns = { columnWorkSched }
                                            selectRow = { selectRow }
                                            cellEdit = { cellEditFactory({ 
                                                    mode: 'dbclick', 
                                                    blurToSave: true,
                                                    afterSaveCell: (oldValue, newValue, row, column) => { 
                                                        this.GridDataModified(oldValue, newValue, row.rowIndex, column.dataField)
                                                    }
                                                })
                                            }
                                            //rowEvents={ rowEvents }
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            expandRow={ expandRow }
                                            wrapperClasses="table-responsive"
                                            rowClasses="noser-table-row-class"
                                            pagination={ paginationFactory({sizePerPage:10,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                            noDataIndication={ () => <div>No record found.</div> }
                                        />
                                    <ButtonToolbar>
                                        {/* <Button className="ml-auto" variant="success" onClick={this.SaveUpdateWorkSchedule} >Modify</Button>&nbsp;&nbsp;&nbsp;&nbsp; */}
                                        <NavLink className="ml-auto" to="/WorkScheduleCreate">
                                            <Button variant="success">Create</Button>
                                        </NavLink>&nbsp;&nbsp;
                                        <Button  variant="danger" onClick={this.handleDelete}>Delete</Button>
                                    </ButtonToolbar>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
        );
    }
}

export default WorkSchedule;
