
import BreakTimeModal from  "./BreakTimeModal"

import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';

/* const DateToformat = 'h:mm';
const DateFromformat = 'h:mm'; */

const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

const Tonow = moment().hour(0).minute(0);
const Fromnow = moment().hour(0).minute(0);

/*  function onChangeTo(Tovalue) {
     console.log("format");
     console.log(Tovalue);
   Tovalue && Tovalue.format(DateToformat)
} */
 
/*  function onChangeFrom(Fromvalue) {
    console.log("format");
     console.log(Fromvalue);
   Fromvalue && Fromvalue.format(DateFromformat)
  } 
 */
/* function onChangeOut(value) {
    console.log(value && value.format(format));
  }
 */
class WorkScheduleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            addModalShow: false,
            getClientAutocomplete : [],
            restList: [],
            clientLocationList: [],
            GetClientLocationsAutocomplete: [],
            filterClientType:"",
            clientLocationId:"",
            GetClientLocationId: "",
            selectedClientLocation : '',
            selectedClientLocationId : '',
            Fromvalue: '',
            Tovalue: '',
            templateName: '',
            getClientList: [],
            checked : false,
            workSchedDetail:[],
            getBreaktimeList: [],
            newBreaktimeList: [],
            getBreaktimeListSelected: [],
            Breaktime: [],
            Breaktimes: [],
            Details: [],
        };
        this.textInput = React.createRef();
        this.onChangeClientLocation=this.onChangeClientLocation.bind(this);
        this.onChangeTo=this.onChangeTo.bind(this);
        this.onChangeFrom=this.onChangeFrom.bind(this);
        this.onChangeWorkSchedule=this.onChangeWorkSchedule.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.onChangeClientList=this.onChangeClientList.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
    }

    state = {
        selected: [],
    };

    handleChangeCheckbox() {
        this.setState({
            checked: !this.state.checked
        })
    }

    onChangeWorkSchedule(e) {
        this.setState({ templateName: e.target.value} );
    }

    onChangeTo(Tovalue) {
        console.log("format");
        console.log(Tovalue);
        this.state.Tovalue = Tovalue && Tovalue.format(str)
    }

    onChangeFrom(Fromvalue) {
        console.log("format");
        console.log(Fromvalue);
        this.state.Fromvalue = Fromvalue && Fromvalue.format(str)
    } 


    handleChange() {
        this.state.selectedTemplateName = this.textInput.current.value;
    }

    onChangeClientLocation(e) {
        console.log("On Change Get Client Location")
       if (e.length > 0) {
            this.state.selectedClientLocation = e[0].name
            this.state.selectedClientLocationId = this.GetClientLocationId(e[0].name)
        }
    }

    
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
        this.getBreaktimeTemplate();

       /*  const rest = [
            {"particular" : "Time-In", "time" : "08:00 am"},
        ]
        this.setState({ restList: rest }); */
    }

    getBreaktimeTemplate(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetBreaktime", getParams)
            .then(res => {
                console.log("Get Breaktime List ");
                console.log(res.data);
                this.setState({
                    getBreaktimeList : res.data.breaktimes
                })
            })
    }

    getClient(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
            .then(res => {
                console.log("Client List ");
                console.log(res.data);
                this.setState({
                    getClientList : res.data.clients
                })
            })
    }

    GetClientId(name) {
        console.log("Client ID List ");
        let GetClientId = ''
        for (let i = 0; i <= this.state.getClientList.length; i++) {
            if (this.state.getClientList[i]["name"] === name) {
                GetClientId = this.state.getClientList[i]['id']; 
                console.log(GetClientId);
                break;
            }
        }
        return GetClientId
    }

    onChangeClientList(e) {
        if(e.length === "") {
            this.setState({
                clientLocationList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedClientName = e[0].name
                this.state.selectedClientId = this.GetClientId(e[0].name)
                console.log("Get Client Id", this.state.selectedClientId)
                console.log("Get Client Name", this.state.selectedClientName)
            }
        }
        this.getClientLocation();
        
    }

    getClientLocation(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "ClientName": this.state.selectedClientName,
            "City": "",
            "Province": "",
            "Region": ""

        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientLocations", getParams)
            .then(res => {
                console.log("Client Location");
                console.log(res.data.locations);
                this.setState({
                    clientLocationList : res.data.locations, 
                })
            })
            
    }

    GetLocation(name) {
        console.log("Client ID List ");
        let GetLocationName = ''
        for (let i = 0; i <= this.state.clientLocationList.length; i++) {
            if (this.state.clientLocationList[i]["name"] === name) {
                GetLocationName = this.state.clientLocationList[i]['id']; 
                console.log(GetLocationName);
                break;
            }
        }
        return GetLocationName
    }

    onChangeLocation(e) {
        if(e.length === "") {
            this.setState({
                clientLocationList : ""
            })
        } else {
            if (e.length > 0) {
                this.state.selectedLocationName = e[0].name
                this.state.selectedLocationId = this.GetLocation(e[0].name)
                console.log("Get Location Id", this.state.selectedLocationId)
                console.log("Get Location Name", this.state.selectedLocationName)
            }
        }
    }

    /* handleAddBreaktime = () => {
        var obj = {}
        var selectedBreaktimeList=[]
        var WorkSchedDetails = []
        this.state.getBreaktimeList.map(function(item,i){
            
            if(item.IsModified===1)
            {
                obj ={
                    breaktimeId : item.id,
                    startTime : "00:00",
                    endTime : "00:00"
                }
                selectedBreaktimeList.push(obj)
                
            }
        })
       this.setState({WorkSchedDetails : selectedBreaktimeList})
        console.log(this.state.WorkSchedDetails);
    } */

    handleSaveClick = () => {
        console.log("this.state.Breaktime")
        console.log(this.state.Breaktime)
        console.log(this.state.Tovalue)
        this.setState({newBreaktimeList: [], isLoading:true})
        console.log(this.state.selectedLocationId)

        for (let i = 0; i < this.state.Breaktime.length; i++) {
            const obj = {
                BreaktimeId:this.state.Breaktime[i]["selectedId"],
                StartTime:this.state.Breaktime[i]["selectedStartTime"],
                EndTime:this.state.Breaktime[i]["selectedEndTime"],
            };
            this.state.newBreaktimeList.push(obj);
        }

        /* console.log(this.state.selectedLocationId)
        for (let i = 0; i < this.state.getBreaktimeList.length; i++) {

            if (this.state.getBreaktimeList[i]["isModified"] == 1) {
                console.log(this.state.getBreaktimeList)
                const obj = {
                    BreaktimeId:this.state.getBreaktimeList[i]["id"],
                    StartTime:this.state.getBreaktimeList[i]["startTime"],
                    EndTime:this.state.getBreaktimeList[i]["endTime"],
                };

                this.state.newBreaktimeList.push(obj);
            }
        } */

        const addParam = {
            "IpAddress":"0.0.0.0",
            "ClientId":'0',
            "UserId":"1",
            "ClientLocationId":'0',
            "Description":this.state.templateName,
            "StartTime":this.state.Fromvalue,
            "EndTime":this.state.Tovalue,
            "WorkScheduleDetails":this.state.newBreaktimeList,
        }

        console.log("addParam")
        console.log(addParam)

        axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "TimeKeeping/AddWorkingSchedule",  addParam
             )
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            isLoading:false,
                            templateName: "",
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
                            isLoading:false,
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            },2000)

    }

    /* GetClientLocationId(name) {
        console.log("Get Client Location Id")
        let locationId = ''
        for (let i = 0; i <= this.state.clientLocationList.length; i++) {
            if (this.state.clientLocationList[i]["name"] === name) {
                locationId = this.state.clientLocationList[i]['id'];
                break;
            }
        }
        return locationId
    } */

    
     /* handleModalClose = (e) => {
         this.setState({
            workSchedDetail: e
        });
        console.log("workSchedDetail")
        console.log(this.state.workSchedDetail)

     } */

     handleChangeAddBreaktime(row){
        
        let invalidBreaktime = this.state.Details

        const obj = {
            selectedDescription : row.description,
            selectedMinutes : row.minutes,
            selectedMPaid : row.paid,
            selectedId : row.id,
            selectedStartTime : row.startTime,
            selectedEndTime : row.endTime,
        }

        if(invalidBreaktime.length>0)
        {
            for(let i=0;i<invalidBreaktime.length;i++)
            {
                if(invalidBreaktime[i].selectedDescription==row.description){
                    alert("Breaktime already exist.")
                    return 
                }
            }
        }
        
        this.state.Details.push(obj)
        this.setState({Breaktime : this.state.Details})
        console.log(row)

     }
     handleChangeRemove = () => {
        
        let breaktimeDetails= this.state.Breaktime
        for( var i = 0; i < breaktimeDetails.length; i++){ 
            console.log(breaktimeDetails[i].IsSelected)
            if ( breaktimeDetails[i].IsSelected === 1) {
                breaktimeDetails.splice(i, 1); 
            i--;
            }
        }
        
        this.setState({Breaktime:breaktimeDetails})
     }
    render() {
        const columnBreakTimeSelected = [
            {
                dataField: 'selectedDescription',
                text: 'Breaktime Template',
                editable: false
            },
            {
                dataField: 'selectedMinutes',
                text: 'm/h',
                editable: false
            },
            {
                dataField: 'selectedMPaid',
                text: 'Paid',
                editable: false
            },
            /* {
                dataField: "databasePkey",
                text: "Remove",
                editable: false,
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button
                            variant="danger"
                            onClick={e => this.handleChangeRemove(row)
                                
                            }
                            
                        >Remove</Button>
                    );
                }
            } */

        ]
        /* let addModalClose = () =>
            this.setState({
                checked: false
            }); */

            /* const columnWorkSched = [
                {
                    dataField: 'particular',
                    text: 'Particular'
                },
                {
                    dataField: 'time',
                    text: 'Time',
                    editable: false
                },
    
            ] */

            const columnBreakTime = [
                {
                    dataField: 'description',
                    text: 'Breaktime Template',
                    editable: false
                },
                {
                    dataField: 'minutes',
                    text: 'm/h',
                    editable: false
                },
                {
                    dataField: 'paid',
                    text: 'Paid',
                    editable: false
                },
                {
                    dataField: "databasePkey",
                    text: "Add Breaktime",
                    editable: false,
                    formatter: (cell, row, isSelect) => {
                        if (row)
                        return (
                            <Button
                                variant="success"
                                onClick={e => this.handleChangeAddBreaktime(row)
                                    
                                }
                                
                            >Add</Button>
                        );
                    }
                }
    
            ]

            
    
            const SelectedBreakTimeRow = {
                mode: 'checkbox',
                hideSelectAll: true,
                clickToSelectAndEditCell: true,
                onSelect: (row, isSelect, rowIndex, e) => {
                    let BreaktimeLst = this.state.Breaktime
                    BreaktimeLst.map(function(item,idx){
                        if(isSelect)
                        {
                            if(idx==rowIndex)
                            item.IsSelected=1
                        }
                        else
                        {
                            if(idx==rowIndex)
                                item.IsSelected=0
                        }
                    })
                    this.setState({Breaktime:BreaktimeLst})
                    console.log(this.state.Breaktime)
                 }
            };

            

            /* const selectRowBreakTime = {
                mode: 'checkbox',
                clickToSelectAndEditCell: true,
                onSelect: (row, isSelect, rowIndex, e) => {
                    console.log(row)
                    this.state.getBreaktimeList.map(function(item,i){
                       
                        if(item.id===row.id)
                        {
                            item.isDeleted = isSelect ? "1" : "0"
                            item.isModified = isSelect ? "1" : "0"
                        }
                    })
                 }
            }; */

            
            const rowEvents = {
                onClick: (e, row, rowIndex) => {
                }
            }

            const BreakTimeSelectedrowEvents = {
                onClick: (e, row, rowIndex) => {
                }
            }

            

            const sizePerPageRenderer = ({
                options,
                currSizePerPage,
                onSizePerPageChange
                }) => (
                <div className="btn-group" role="group">
                    {
                    options.map((option) => {
                        const isSelect = currSizePerPage === `${option.page}`;
                        return (
                        <button
                            key={ option.text }
                            type="button"
                            onClick={ () => onSizePerPageChange(option.page) }
                            className={ `btn ${isSelect ? 'btn-primary' : 'btn-success'}` }
                        >
                            { option.text }
                        </button>
                        );
                    })
                    }
                </div>
                );
            const options = {
                sizePerPageRenderer
            };

           /*  const content = this.state.checked 
                ? <BreakTimeModal setConsole={this.handleModalClose} show={this.state.checked} onHide={addModalClose} />
            : null; */


        return(
            <div>
            <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Create Work Schedule</Card.Header>
                        <Card.Body>
                            <Form >
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                                {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.onChangeClientList}
                                            options={this.state.getClientList}
                                            placeholder="Select Client"
                                            onInputChange={this.handleInputChange}
                                            value={this.state.clientType}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                             onChange={this.onChangeLocation}
                                            options={this.state.clientLocationList}
                                            placeholder="Select Location"
                                        />
                                    </Col>
                                </Form.Group> */}
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Work Schedule Template Name" 
                                            ref="templateName"
                                            autoComplete="off" 
                                            name="templateName"
                                            value={this.state.templateName}
                                            /* onChange={() => this.handleChange()} */
                                            onChange={this.onChangeWorkSchedule}/>
                                    </Col>
                                </Form.Group>
                                
                                <Form.Group as={Row}>
                                    <Col sm={4}>
                                    <Form.Label column sm={4}>
                                    From
                                    </Form.Label>
                                    <TimePicker 
                                        showSecond={showSecond}
                                        defaultValue={moment()}
                                        className="xxx"
                                        onChange={this.onChangeFrom}
                                        />
                                    </Col>

                                    <Col sm={4}>
                                    <Form.Label column sm={4}>
                                    To
                                    </Form.Label>
                                    <TimePicker 
                                        showSecond={showSecond}
                                        defaultValue={moment()}
                                        className="xxx"
                                        onChange={this.onChangeTo}/>
                                    </Col>
                                </Form.Group>

                                {/* <div className="mt-2">
                                    <Form.Group id="formGridCheckbox">
                                        <Form.Check 
                                        checked={ this.state.checked } 
                                        onChange={ this.handleChangeCheckbox }

                                        type="checkbox" 
                                        label="Breaktime" />
                                    </Form.Group>
                                </div> */}
                                <div className="mt-5">
                                    <h5>Select Breaktime</h5>
                                    <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.getBreaktimeList }
                                        columns = { columnBreakTime }
                                        /* selectRow = { selectRowBreakTime } */
                                        cellEdit = { cellEditFactory({ 
                                                mode: 'click', 
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => { 
                                                    this.GridDataModified(oldValue, newValue, row.rowIndex, column.dataField)
                                                }
                                            })
                                        }
                                        rowEvents={ rowEvents }
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        expandRow
                                        pagination={ paginationFactory(options) }
                                        wrapperClasses="table-responsive"
                                        rowClasses="noser-table-row-class"

                                    />
                                    {/* <ButtonToolbar>
                                    <Button className="ml-auto" variant="success" onClick = { this.handleAddBreaktime }>Add Breaktime</Button>
                                    </ButtonToolbar>
                                     */}
                                    
                                    <h5 className="mt-5">Selected Breeaktime</h5>

                                    <BootstrapTable
                                        keyField = "selectedDescription"
                                        data = { this.state.Breaktime }
                                        columns = { columnBreakTimeSelected }
                                        selectRow = { SelectedBreakTimeRow }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                        rowEvents={ BreakTimeSelectedrowEvents }
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        expandRow
                                        wrapperClasses="table-responsive"
                                        rowClasses="noser-table-row-class"

                                    />
                                    <ButtonToolbar>
                                        <Button variant="danger" onClick = { this.handleChangeRemove }>Remove</Button>
                                    </ButtonToolbar>
                                </div>


                                <div className="mt-5">
                                    {/* <h5>Work Schedule (Preview):</h5>
                                    <BootstrapTable
                                    keyField = "id"
                                    data = { this.state.restList }
                                    columns = { columnWorkSched }
                                    selectRow = { selectRow }
                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                    /> */}
                                    <ButtonToolbar>
                                    <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    
                                        <Button  href="/workschedule" variant="danger" onClick={ this.handleCloseClick }>Back</Button>
                                    </ButtonToolbar>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isLoading} />
            </div>
        )
    }
}

export default WorkScheduleCreate;
