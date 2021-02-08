import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container,sizePerPageRenderer
} 
from '../../noser-hris-component';

class Holiday extends Component {
    constructor(props) {
    super(props);
    this.minDate = new moment(props.minDate)
    this.state = {
        userinfo        :   [],
        isloading       :   false,
        isshow          :   false,
        alerttype       :   "",
        message         :   "",
        color           :   "",
        fade            :   true,
        startDate: new Date(),
        holidayGridList : [],
        newholidayList : [],
        holidayfilterList : [],
        holidayTypeList:[],
        coverageList:[],
        rpcList:[{"name":""}],
        filterHolidayType:"",
        filterholiday:"",
        filterCoverage:"",
        filterLocation:"",
        filterDate:"",

        newHolidayListGrid : [],

    }
    this.handleChange = this.handleChange.bind(this);
    this.onChangeHolidayType=this.onChangeHolidayType.bind(this);
    this.onChangeHoliday=this.onChangeHoliday.bind(this);
    this.onChangeCoverage = this.onChangeCoverage.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmitSearch=this.onSubmitSearch.bind(this);

    
}
state = {
    selected: [],
};

componentDidMount(){
    const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
    this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    this.GetHolidayTypes()
    this.GetHolidays()
    this.GetCoverage()
    sleep(1000).then(() => {
        this.setState({isloading:false})
      })
} 
componentWillUnmount(){
    this.setState({isloading:false})
}

processGridData() {

    this.setState({newHolidayListGrid:[]});
    let tmpGridList = []

    for (let i = 0; i < this.state.holidayGridList.length; i++) {
        let obj = {};
        const checkDate = this.state.holidayGridList[i]["date"];

        obj = {
            "clientId": this.state.holidayGridList[i]["clientId"],
            "clientName": this.state.holidayGridList[i]["clientName"],
            "coverage": this.state.holidayGridList[i]["coverage"],
            "date":this.formatDate(checkDate),
            "holidayName": this.state.holidayGridList[i]["holidayName"],
            "holidayType": this.state.holidayGridList[i]["holidayType"],
            "holidayTypeId": this.state.holidayGridList[i]["holidayTypeId"],
            "id": this.state.holidayGridList[i]["id"],
            "isDeleted": "0",
            "isModified": this.state.holidayGridList[i]["isModified"],
            "location": this.state.holidayGridList[i]["location"],
            "locationId": this.state.holidayGridList[i]["locationId"],
        }

        tmpGridList.push(obj);
    }
    this.setState({newHolidayListGrid: tmpGridList});

    console.log("Get Holiday Search")
    console.log(this.state.newHolidayListGrid)
}

onSubmitSearch(e){
    e.preventDefault();
    this.setState({isloading:true})
    
    const typeParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId=="" ? 0 : this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "HolidayType":this.state.filterHolidayType,
        "HolidayName":this.state.filterholiday,
        "Coverage":this.state.filterCoverage,
        "Location":this.state.filterLocation,
        "Date":""
    };
    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHolidays",  typeParams)
        .then(res => {
            const data = res.data;
            console.log(data)
            this.setState({ holidayGridList: data.holidays }); 
            this.processGridData()
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
           this.setState(  {
               isloading       :   false,
               alerttype       :   "Error!",
               isshow          :   true,
               color           :   "danger",
               message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
               fade            :   true
           })
       })

}
onChangeHolidayType(e) {
    if(e.length==0) {
        this.setState({ filterHolidayType: ""});
        return;
    }
    this.setState({ filterHolidayType: e[0].name });
}
onChangeHoliday(e) {
    if(e.length==0) return;
    this.setState({ filterholiday: e[0].holidayName });
    console.log(this.state.filterholiday)
}
onChangeLocation(e) {
    if(e.length==0) return;
    this.setState({ filterLocation: e[0].name });
}
onChangeCoverage(selectedOptions) {
    var url = "";
    var coverage = "";
    if(selectedOptions.length==0) return;
    coverage = selectedOptions[0].name
    this.setState({ filterCoverage: coverage });
    if(coverage=="National")
        this.setState({ rpcList: [{"name":""}] });
    if(coverage=="Regional")
        url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions";
    if(selectedOptions[0].name=="Provincial")
        url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces";
    if(coverage=="City/Town")
        url = AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetCities";
    
    const regionParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
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
        .catch(error=>{
           this.setState(  {
               isloading       :   false,
               alerttype       :   "Error!",
               isshow          :   true,
               color           :   "danger",
               message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
               fade            :   true
           })
       })
}
GetCoverage(){
    var coverage = [{"name":"National"},{"name":"Regional"},{"name":"Provincial"},{"name":"City/Town"}];
    this.setState({coverageList:[]= coverage});
    
}
GetHolidays(){
    const typeParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId
     };
    axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHolidays",  typeParams)
    .then(res => {
        const data = res.data;
        this.setState({ holidayGridList: data.holidays,holidayfilterList: data.holidays });               
    })
    .catch(error=>{
       this.setState(  {
           isloading       :   false,
           alerttype       :   "Error!",
           isshow          :   true,
           color           :   "danger",
           message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
           fade            :   true
       })
   })
}
GetHolidayTypes() {
    const typeParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId
    };

    axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHolidayTypes",  typeParams)
    .then(res => {
        const data = res.data;
        this.setState({ holidayTypeList: data.holidayTypes });                 
    })
    .catch(error=>{
       this.setState(  {
           isloading       :   false,
           alerttype       :   "Error!",
           isshow          :   true,
           color           :   "danger",
           message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
           fade            :   true
       })
   })
} 

handleChange = date => {
    this.setState({
        startDate: date
    });
};

refreshDtataGrid(){
    const typeParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.selectedClientId=="" ? 0 : this.state.selectedClientId,
        "UserId":this.state.userinfo.userId,
        "HolidayType":this.state.filterHolidayType,
        "HolidayName":this.state.filterholiday,
        "Coverage":this.state.filterCoverage,
        "Location":this.state.filterLocation,
        "Date":""
    };
    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHolidays",  typeParams)
        .then(res => {
            const data = res.data;
            console.log(data)
            this.setState({ holidayGridList: data.holidays }); 
            this.processGridData()                
        })
}
handleSaveClick = event => {
    this.setState({newholidayList:[],isloading:true})
        //console.log(this.state.newholidayList)
        //alert("test")
        const {newHolidayListGrid} = this.state
        for (let i = 0; i < this.state.newHolidayListGrid.length; i++) {
        

        if (this.state.newHolidayListGrid[i]["isModified"] == 1) {
            console.log(this.state.newHolidayListGrid)
            const checkDateSave = this.state.newHolidayListGrid[i]["date"];
            
            const obj = {
                ClientId:this.state.newHolidayListGrid[i]["clientId"],
                Id:this.state.newHolidayListGrid[i]["id"],
                Coverage:this.state.newHolidayListGrid[i]["coverage"],                    
                LocationId:this.state.newHolidayListGrid[i]["locationId"],
                HolidayTypeId:this.state.newHolidayListGrid[i]["holidayTypeId"],
                HolidayName:this.state.newHolidayListGrid[i]["holidayName"],
                Date:this.formatDate(checkDateSave),
                IsDeleted:this.state.newHolidayListGrid[i]["isDeleted"].toString()
            };

            newHolidayListGrid.push(obj);
            this.setState({
                newHolidayListGrid : newHolidayListGrid
            })
        } 
    }

    console.log("this.state.newholidayList")
    console.log(this.state.newholidayList)
    

    const  holidayparams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
        "Holidays":this.state.newHolidayListGrid
    };
    console.log("csdsd")
    console.log(holidayparams)
    //return 
    axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditHoliday",   holidayparams)
         .then(res => {
            const data = res.data;
            console.log("save123")
            console.log(data)
            this.setState({isloading:false})
            this.refreshDtataGrid()
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
           this.setState(  {
               isloading       :   false,
               alerttype       :   "Error!",
               isshow          :   true,
               color           :   "danger",
               message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
               fade            :   true
           })
       })
}
LeavePageWithourSavingChanges() {
    const isChanged=false
    for (let i = 0; i < this.state.holidayGridList.length; i++) {
        if (this.state.holidayGridList[i]["isModified"] == 1) {
            this.setState({isGridDataChanged: true})
            isChanged=true
            break;
        } 
    }
    return isChanged
}

GridDataModified(oldValue, newValue, holidayId, column) {
    //console.log(holidayId)
    this.state.holidayGridList.map(function(item,i){
        if (item.id===holidayId)
            item.isModified = newValue!=oldValue ? "1" : "0"
    })
}

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [month,day,year].join('/');
    }


render() {
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
const columnHoliday = [
    { dataField: 'holidayName', text: 'HOLIDAY'},
    { dataField: 'holidayType', text: 'TYPE'},
    { dataField: 'coverage', text: 'COVERAGE'},
    { dataField: 'location', text: 'LOCATION'},
    { dataField: 'date', text: 'DATE'}
]
const selectRow = {
    mode: 'checkbox',
    clickToSelectAndEditCell: true,
    onSelect: (row, isSelect, rowIndex, e) => {
        this.state.holidayGridList.map(function(item,i){
            if(item.id===row.id)
            
                {
                item.isDeleted = isSelect ? "1" : "0"
                item.isModified = isSelect ? "1" : "0"
            }

        })

    }
};
    const rowEvents = {
    onClick: (e, row, rowIndex) => {
      //alert(e.row);

    }
};
    return(
            <div>
            <Banner />
            <Container className="mt-5">
                <Card>
                <Card.Header>Holiday</Card.Header>
                <Card.Body>
                    <Form onSubmit={ this.onSubmitSearch }>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col sm={12}>
                               <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.onChangeHolidayType}
                                    options={this.state.holidayTypeList}
                                    placeholder="Select Holiday Type"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col sm={12}>
                               <Typeahead
                                    labelKey='holidayName'
                                    id="basic-example"
                                    onChange={this.onChangeHoliday}
                                    options={this.state.holidayfilterList}
                                    placeholder="Select Holiday Name"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col sm={12}>
                               <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.onChangeCoverage}
                                    options={this.state.coverageList}
                                    placeholder="Select Coverage"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Col sm={12}>
                                <Typeahead
                                    labelKey='name'
                                    id="basic-example"
                                    onChange={this.onChangeLocation}
                                    options={this.state.rpcList}
                                    placeholder="Select [Region,Province,City]"
                                />
                            </Col>
                        </Form.Group>
                        <ButtonToolbar >
                            <Button variant="primary" className="ml-auto" onClick={this.onSubmitSearch}>
                                Search
                            </Button>&nbsp;&nbsp;
                            <NavLink to="/HolidayCreate">
                                <Button  variant="primary" variant="success">
                                    Create
                                </Button>
                            </NavLink>
                        </ButtonToolbar>
                        <div className="mt-5">
                                <BootstrapTable
                                ref="tbl"
                                caption={Noser.TableHeader({title:"HOLIDAY LIST"})}
                                rowClasses="noser-table-row-class"
                                striped
                                hover
                                condensed
                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                keyField = "id"
                                data = { this.state.newHolidayListGrid }
                                columns = { columnHoliday}
                                selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ 
                                mode: 'dbclick', 
                                blurToSave: true,
                                afterSaveCell: (oldValue, newValue, row, column) => { 
                                this.GridDataModified(oldValue, newValue, row.id, column)
                                        }
                                    })
                                }
                                rowEvents={ rowEvents }
                               /*  caption={Noser.TableHeader({title:"HOLIDAY LIST"})}
                                rowClasses="noser-table-row-class"
                                striped
                                hover
                                condensed
                                pagination={ paginationFactory(options) }
                                keyField = "id"
                                keyField = "holidayName"
                                data = { this.state.holidayGridList }
                                columns = { columnHoliday}
                                selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) } */

                                />
                        </div>
                        
                        <div className="mt-5">
                            <ButtonToolbar>
                                <Button className="ml-auto" variant="success"  onClick={this.handleSaveClick}>Save</Button>&nbsp;&nbsp;
                                <NavLink to="/Home">
                                    <Button  variant="primary" variant="danger">
                                        Close
                                    </Button>   
                                </NavLink>
                            </ButtonToolbar>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            </Container>
                <NoserLoading show={this.state.isloading} />
            </div>
    )
}

}
export  default Holiday
