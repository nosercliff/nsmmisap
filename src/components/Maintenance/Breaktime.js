import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';

class Breaktime extends Component {
      constructor(props) {
        super(props);
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,	

            newBreaktime: [],
            breaktimeGridList: [],
            breaktimeList : [],
            durationList:[],
            description:"",
            duration:"",
            paid:"",
        };
    }
    state = { selected: [] };

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetBreaktime()
    }

    GetBreaktimeNew(){
        this.setState({
            breaktimeGridList: [],
            newBreaktimeList: [],
            isloading       :   true,
        });

        var paid="";
        if(this.state.paid==undefined)
            paid="";
        if(this.state.paid=="UnPaid")
            paid="0";
        if(this.state.paid=="Paid")
            paid="1";
        const typeParams = {
            /*  "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId */

              "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
         };

         axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetBreaktime",  typeParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    breaktimeGridList   :   data.breaktimes,
                    isloading           :   false
                });
                if(data.status=="1"){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Success!",
                        isshow          :   true,
                        color           :   "success",
                        message         :   data.message,
                        fade            :   true
                    });
                }
                else{
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
                    })
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
 

    GetBreaktime(){
        this.setState({isloading       :   true,});
        const typeParams = {
           "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Description":this.state.duration 
           
         };

         axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetBreaktime",  typeParams
            )
            .then(res => {
                const data = res.data;
                //console.log(data);
                this.setState({
                    breaktimeList   :   data.breaktimes,
                    isloading       :   false
                });
                if(data.breaktimes.length=="0"){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
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
    onChangeDescription = (e) => {
        if(e.length==0) return;
        this.setState({ description: e[0].description });
        //console.log(e[0].description)
    }
    onChangeDuration = (e) => {
        if(e.length==0){
            this.state.minutes = ""
            return
        }
        //console.log(e[0])
        this.setState({minutes: e[0]})
    }
    onChangePaid= (e) => {
        if(e.length==0){
            this.state.paid = ""
            return
        }
        //console.log(e[0])
        this.setState({paid: e[0]})
    }
    handleSearchClick = (e) => {
        this.setState({
            breaktimeGridList   :   [],
            newBreaktimeList    :   [],
            isloading           :   true,
        });

        var paid="";
        if(this.state.paid==undefined)
            paid="";
        if(this.state.paid=="UnPaid")
            paid="0";
        if(this.state.paid=="Paid")
            paid="1";
        const typeParams = {
            /*  "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId */

              "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "Description":this.state.description,
            "Minutes":this.state.minutes,
            "IsPaid":paid
         };

         axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetBreaktime",  typeParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    breaktimeGridList   :    data.breaktimes,
                    isloading           :   false
                });
                if(data.status=="1"){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Success!",
                        isshow          :   true,
                        color           :   "success",
                        message         :   data.message,
                        fade            :   true
                    });
                }
                else{
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
                    })
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

    handleSaveClick = event => {
      
        this.setState({breaktimeGridList: [],isloading:true})
       /*  this.setState({breaktimeGridList: [],isLoading:true}) */

        //console.log("newBreaktimeList")
     console.log(this.state.newBreaktimeList)
        console.log(this.state.newBreaktimeList)
        for (let i = 0; i < this.state.breaktimeGridList.length; i++) {
            if (this.state.breaktimeGridList[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.breaktimeGridList[i]["id"],
                    TypeId: "1",
                    ClientId:this.state.userinfo.clientId,
                    Description: this.state.breaktimeGridList[i]["description"],
                    StartTime: this.state.breaktimeGridList[i]["startTime"],
                    EndTime: "",
                    Minutes: this.state.breaktimeGridList[i]["minutes"], 
                    IsPaid: this.state.breaktimeGridList[i]["isPaid"],
                    IsDeleted: this.state.breaktimeGridList[i]["isDeleted"].toString()
                };

                this.state.newBreaktimeList.push(obj);
            }
        }

       const typeParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
        "Breaktimes":this.state.newBreaktimeList
        };
        //console.log(typeParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/EditBreaktime", typeParams)
            .then(res => {
                const data = res.data;
                this.setState({isloading:false})
                //console.log(res.data)
                var alertType = (data.status=="1") ? "success" : "danger"
                this.GetBreaktimeNew();
                if(data.status=="1"){
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Success!",
                        isshow          :   true,
                        color           :   "success",
                        message         :   data.message,
                        fade            :   true
                    });
                }
                else{
                    this.setState({
                        isloading       :   false,
                        alerttype       :   "Error!",
                        isshow          :   true,
                        color           :   "danger",
                        message         :   data.message,
                        fade            :   true
                    })
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
        for (let i = 0; i < this.state.breaktimeGridList.length; i++) {
            if (this.state.breaktimeGridList[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue,breaktimeid, column) {
        console.log(breaktimeid)
        this.state.breaktimeGridList.map(function(item,i){
            if(item.id===breaktimeid)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        const columnBreaktime = [
            { 
                dataField: 'description',
                text: 'Breaktime',
                headerStyle : () => {
                    return { width  : "60%" };
                }
            },
            {
                dataField: 'startTime',
                text: 'Time',
                editable: false,
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'minutes',
                text: 'Duration',
                editable: false,
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'paid',
                text: 'Paid/UnPaid',
                editor: {
                    type: Type.SELECT,
                    options: [
                      {
                        value: "Paid",
                        label: "Paid",
                        editable: false
                      },
                      {
                        value: "Paid",
                        label: "UnPaid",
                        editable: false
                      }
                    ]
                  },
                  headerStyle : () => {
                      return { width  : "20%" };
                  }
            },
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.breaktimeGridList.map(function(item,i){
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
                    <Card.Header>Breaktime</Card.Header>
                    <Card.Body>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='description'
                                        id="basic-example"
                                        onChange={this.onChangeDescription}
                                        options={this.state.breaktimeList}
                                        placeholder="Select Breaktime"
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Typeahead
                                        labelKey='minutes'
                                        id="basic-example"
                                        onChange={this.onChangeDuration}
                                        options={this.state.breaktimeList.map(item => item.minutes)
                                        .filter((value, index, self) => self.indexOf(value) === index)}
                                        placeholder="Select Duration"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Col sm={14}>
                                    <Typeahead
                                        labelKey='paid'
                                        id="basic-example"
                                        onChange={this.onChangePaid}
                                        options={this.state.breaktimeList.map(item => item.paid)
                                        .filter((value, index, self) => self.indexOf(value) === index)}
                                        placeholder="Select Paid/UnPaid"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <ButtonToolbar>
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/BreaktimeCreate">
                                            <Button  variant="primary" variant="success">
                                                Create
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>
                            <div className="mt-5">
                               <BootstrapTable
                                ref="tbl"
                                caption={Noser.TableHeader({title:"BREAKTIME LIST"})}
                                rowClasses="noser-table-row-class"
                                striped
                                hover
                                condensed
                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                keyField = "id"
                                data = { this.state.breaktimeGridList }
                                columns = { columnBreaktime}
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

                                />   
                            </div>
                            <ButtonToolbar sm={12}>
                                <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                    Save
                                </Button>&nbsp;&nbsp;
                                <NavLink to="/home">
                                    <Button variant="danger" href="/banner">
                                        Close
                                    </Button>
                                </NavLink>
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

export  default Breaktime