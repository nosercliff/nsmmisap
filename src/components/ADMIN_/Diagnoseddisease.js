import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';

class Diagnoseddisease extends Component {
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
            selected: [],

            diseasesList:[],
            diseasesListGrid:[],
            newdiseasesList: [],
            diseasesId:"",
            diseases:""
            
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetDiseases();
        
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
        }

        handleCoverChangeDisease = (e) => {
        if (e.length > 0) {
            this.state.diseases = e[0].name
            this.state.diseasesId = e[0].id

        } else {
            this.state.diseases = ""
            this.state.diseasesId = ""
        }
        
        console.log(this.state.selectedName);
        
    } 

    GetDiseases() {
        this.setState({
            examList:[]
            
        })
        const diseasesParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":this.state.diseases,
            
        };
        console.log("Test app");
        console.log(diseasesParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDiseases",  diseasesParams)
        .then(res => {
            const data = res.data;
            console.log("Test app");
            console.log(data);
            this.setState({ diseasesList: data.diseases});
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

    handleSearchClick = event => {
        this.setState({diseasesListGrid:[], isloading:true})

        const searchParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":this.state.diseases,
            
        };
        console.log(searchParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDiseases",  searchParams)
            .then(res => {
            const data = res.data;
            console.log(res.data)
            this.setState({diseasesListGrid: data.diseases,  isloading:false})
            // this.processGrid();
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
        this.setState({newdiseasesList: [],isLoading:true})

        
        console.log(this.state.newdiseasesList)
        for (let i = 0; i < this.state.diseasesListGrid.length; i++) {
            if (this.state.diseasesListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.diseasesListGrid[i]["id"],
                    Name: this.state.diseasesListGrid[i]["name"],
                    IsDeleted: this.state.diseasesListGrid[i]["isDeleted"].toString()
                };

                this.state.newdiseasesList.push(obj);
            }
        }


        
    const saveParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
        "diseases":this.state.newdiseasesList
        };
        console.log("saveParams")
        console.log(saveParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditDisease", saveParams)
            .then(res => {
                const data = res.data;
                this.setState({isLoading:false})
                this.refreshPage();
                var alertType = (data.status=="1") ? "success" : "danger"
                this.setState(
                    {
                        isLoading:false,
                        AlertType:"Success!",
                        show:true,
                        Color:alertType,
                        Message:data.message ,
                        Fade:true
                    });
            })
            .catch(error=>{
                this.setState(
                {
                    isLoading:false,
                    AlertType:"Error! ",
                    Show:true,
                    Color:"danger",
                    Message: "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    Fade:true
                })
            })
    } 

    LeavePageWithourSavingChanges() {
        const isChanged=false
        for (let i = 0; i < this.state.diseasesListGrid.length; i++) {
            if (this.state.diseasesListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, diseasesid, column) {
        console.log(diseasesid)
        this.state.diseasesListGrid.map(function(item,i) {
            if (item.id===diseasesid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    refreshPage(){
        this.setState({isloading:true})

        const refreshParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":"",
            
        };

        console.log("refresh Search Params")
        console.log(refreshParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDiseases",  refreshParams)
            .then(res => {
                const data = res.data;
                this.setState({diseasesListGrid: data.diseases,
                    isloading       :   false,
                })
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


    render() {
        const columns1 = [
            {
                dataField: 'name',
                text: 'NAME',
                headerStyle: () => {
                    return { width: "75%" };
                },
            
            }] 
       
        /* const dtr1 = [
            {"name" : "N/A", 
            "isActive" : "",},
            {"name" : "OTHERS", 
            "isActive" : "",},
            {"name" : "DIABETES", 
            "isActive" : "",},
            {"name" : "HEPA B", 
            "isActive" : "",},
            {"name" : "ALLERGIES", 
            "isActive" : "",},
            {"name" : "ASTHMA", 
            "isActive" : "",},
            {"name" : "HYPERTENSION", 
            "isActive" : "",},
        ]  */
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.diseasesListGrid.map(function(item,i){
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
                            <Card.Header>Diagnosed Disease</Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Col sm={6}>
                                        <Typeahead
                                            labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleCoverChangeDisease}
                                            options={this.state.diseasesList}
                                            placeholder="Name"
                                        /> 
                                        </Col>
                                    </Form.Row>
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary" className="ml-auto" onClick={this.handleSearchClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/DiagnoseddiseaseCreate">
                                            <Button  variant="primary" variant="success">
                                                Create 
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                    <div className="mt-1">
                                    <BootstrapTable
                                            ref="tbl"
                                            caption={Noser.TableHeader({title:"Search Result"})}
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            keyField = "id"
                                            data = { this.state.diseasesListGrid }
                                            columns = { columns1}
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
                                   <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
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
                    <NoserLoading show={this.state.isLoading} />
            </div> 
            
        )
    }
}

export default Diagnoseddisease;