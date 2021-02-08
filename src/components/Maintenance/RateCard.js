import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';

class RateCard extends Component {
     constructor() {
        super() 
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,	
             selected: [],
            clientList:[],
            elementcodeList:[],
            newElementList:[],
            elementListGrid:[],
            elementNameList: [],
            selectedElement :'',
            selectedcode:'',
            selectedClient:'',
            selectedClientId: '',
            clientspecific: "false",

        }

   }
 
    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getElementName();
        this.getClient();
        this.getElementCode();
        /* sleep(1000).then(() => {
            this.setState({isLoading:false})
          }) */
    } 
    handleChangeClientspecific = (e) => {
        if(e.target.checked)
            this.setState({clientspecific: ""})
        else
            this.setState({clientspecific: "false"})
        console.log(this.state)
    }
    handleChangeElementName = (e) => {
        if (e.length > 0) {

            this.state.selectedElementName = e[0].name
            
        }  else {
            this.state.selectedElementName = ""
            this.state.selectedElementNameId = ""
            console.log(this.state.selectedElementName)
        }  
    }
    handleChangeElementCode= (e) => {
        if (e.length > 0) {
            this.state.selectedelementCode =  e[0].code
            
        }else {
            this.state.selectedelementCode = ""
            this.state.selectedelementCodeId = ""
            console.log(this.state.selectedelementCode)

        }

    }

    handleChangeClient = (e) => {
    if (e.length > 0) {
        this.state.selectedClient = e[0].name
        this.state.selectedClientId = e[0].id
        console.log(this.state.selectedClientId)
    } else {
        this.state.selectedClient = ""
        this.state.selectedClientId = "0"
        console.log(this.state.selectedClientId)
    }
        //console.log(this.state.selectedClient);
    }
    getElementName(){
        const nameParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "Code":this.state.selectedelementCode,
            "Name":this.state.selectedElementName,
            "ClientName":this.state.selectedClient

        };

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRateElements",  nameParams
            )
            .then(res => {
                const data = res.data;
                console.log("element");
                console.log(data.elements);
                this.setState({ elementNameList: data.elements });
            })
    } 

    getElementCode() {
        const rateparams = {
            "IpAddress":"0.0.0.0",
           "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "Code":this.state.selectedelementCode,
            "Name":this.state.selectedElementName,
            "ClientName":this.state.selectedClient

        };
          //console.log(rateparams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRateElements",  rateparams
            )
             .then(res => {
                const data = res.data;
                console.log("code");
                console.log(res.data);
                console.log(data.elements)
               // console.log(this.state.rateList)
                this.setState({ elementcodeList: data.elements});

        })
    } 

    getClient() {
        //console.log("getClient");
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
		    "UserId":this.state.userinfo.userId
        }

        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
                .then(res => {
                    const data = res.data;
                    //console.log("client")
                     console.log(data);
                    console.log(res.data.clients);  
                    this.setState({
                        clientList  :   data.clients,
                        isloading   :   false
                    })
                })
    }

    handleSearchClick = event => {
        this.setState({isloading:true})
        this.setState({
           elementListGrid: [],
           newElementList:[]

        });

        const nameParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "Code":this.state.selectedelementCode,
            "Name":this.state.selectedElementName,
            "ClientName":this.state.selectedClient,
          };

          axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRateElements",  nameParams
                 
            )
            .then(res => {
                const data = res.data;
                 console.log("result111")
                console.log(data.elements)
                this.setState({
                    elementListGrid     :   data.elements,
                    isloading           :   true
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
        this.setState({newElementList:[],isloading:true})
            console.log(this.state.newElementList)
            for (let i = 0; i < this.state.elementListGrid.length; i++) {
            //alert("clientId: " + this.state.elementListGrid[i]["clientId"])

            if (this.state.elementListGrid[i]["isModified"] == 1) {
                //this.state.selectedClientId = this.state.elementListGrid[i]["clientId"]
                const obj = {
                    Id:this.state.elementListGrid[i]["id"],
                    ClientId:this.state.elementListGrid[i]["clientId"],                    
                    Code:this.state.elementListGrid[i]["code"],
                    Name:this.state.elementListGrid[i]["name"],
                    Percentage:this.state.elementListGrid[i]["percentage"],
                    OverrideCode:this.state.elementListGrid[i]["overrideCode"],
                    IsAddBasic:this.state.elementListGrid[i]["isAddBasic"],
                    IsOverride:this.state.elementListGrid[i]["isOverride"],
                    IsStandard:this.state.elementListGrid[i]["isStandard"],
                    IsDeleted:this.state.elementListGrid[i]["isDeleted"].toString()
                };

                this.state.newElementList.push(obj);
            } 
        }

        console.log("this.state.newElementList")
        console.log(this.state.newElementList)
        console.log("this.state.selectedClientId: " + this.state.selectedClientId)
    
        const  rateparams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId, //this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "RateElements":this.state.newElementList
        };
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditRateElement",   rateparams)
             .then(res => {
                const data = res.data;
                console.log("save123")
                console.log(res.data)
                 this.setState({isloading:false})
               
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
        for (let i = 0; i < this.state.elementListGrid.length; i++) {
            if (this.state.elementListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            } 
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, elementNameId, column) {
        console.log(elementNameId)
        this.state.elementListGrid.map(function(item,i){
            if (item.id===elementNameId)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }


    render() {
          const columnRate = [
            {
                dataField: 'code',
                text: 'Code'
            },
            {
                dataField: 'name',
                text: 'Element',
                editable: false
            },
            {
                dataField: 'clientName',
                text: 'Standard / Per Client',
                editable: false
            },
            {
                dataField: 'percentage',
                text: '%',
                editable: false
            },
            {
                dataField: 'isAddBasic',
                text: 'Add to Basic',
                editable: false
            },
            {
                dataField: 'isOverride',
                text: 'Override Standard Element',
                editable: false
            },
            {
                dataField: 'isStandard',
                text: 'Standard Element',
                editable: false
            }
        ]
       
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.elementListGrid.map(function(item,i){
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
                    <Card.Header>Rate Card Element</Card.Header>
                    <Card.Body>
                        <Form  >
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <Form.Check
                                        onChange={ this.handleChangeClientspecific }
                                        type="checkbox" 
                                        name="clientspecific"
                                        label="Client Specific"
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleChangeClient}
                                            options={this.state.clientList}
                                            placeholder="Search by Client"
                                            disabled={this.state.clientspecific}

                                        />
                                </Col>
                            </Form.Group>&nbsp;&nbsp;
                             {/* <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                        <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.handleChangeLocation}
                                        options={this.state.locationList}
                                        placeholder="Search by Branch"
                                        />
                                </Col>    
                            </Form.Group>&nbsp;&nbsp; */}
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                         <Typeahead
                                            labelKey='code'
                                            id="basic-example"
                                            onChange={this.handleChangeElementCode}
                                            options={this.state.elementcodeList}
                                            placeholder="Search by Element Code"
                                        />
                                    </Col>
                            </Form.Group>&nbsp;&nbsp;
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                     <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.handleChangeElementName}
                                        options={this.state.elementNameList}
                                        placeholder="Search by Element Name"
                                        />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                    <ButtonToolbar>
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                            <NavLink to="/RateCardCreate">
                                                <Button  variant="primary" variant="success">
                                                    Create
                                                </Button>
                                            </NavLink>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>
                            <Card.Header>Record</Card.Header>
                            <div className="mt-1">
                                <BootstrapTable

                                    keyField = "id"
                                    data = { this.state.elementListGrid }
                                    columns = { columnRate }
                                    pagination={ paginationFactory({sizePerPageRenderer}) }
                                    rowClasses="noser-table-row-class"
                                    striped
                                    hover
                                    condensed
                                    cellEdit = { cellEditFactory({
                                        mode: 'dbclick',
                                        blurToSave: true,
                                        afterSaveCell: (oldValue, newValue, row, column) => {
                                            this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                            }
                                        })
                                    }
                                    rowEvents={ rowEvents }
                                    selectRow = { selectRow }
                                    rowStyle={{ height: "45px" }}

                                />
                            </div>
                            <ButtonToolbar sm={12}>
                                <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                    Save
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger" href="/banner">
                                    Close
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Card.Body>
                </Card>
                <NoserLoading show={this.state.isloading} />
            </Container>  

        </div>
    )}

}

export  default RateCard