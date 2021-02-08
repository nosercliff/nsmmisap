import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class StoreOperation extends Component {
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
            selectedName:"",
            selectedNameId:"",
            storeOperationList:[],
            storeOperationListGrid:[],
            newstoreOperationList: []
            
        }
         
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetStoreOperations();
        
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
        }

    handleCoverChangeStoreOperation = (e) => {
        if (e.length > 0) {
            this.state.selectedName = e[0].name
            this.state.selectedNameId = e[0].id

        } else {
            this.state.selectedName = ""
            this.state.selectedNameId = ""
        }
        
        console.log(this.state.selectedName);
       
    } 

    GetStoreOperations() {
        this.setState({
            storeOperationList:[]
            
        })
        const jobOpeningParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
	        "ClientId":"1",
            "Name":this.state.selectedName,
        };
        console.log("Test app");
        console.log(jobOpeningParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetStoreOperations",  jobOpeningParams)
        .then(res => {
            const data = res.data;
            console.log("Test app");
            console.log(data);
            this.setState({ storeOperationList: data.storeOperations});
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
        this.setState({storeOperationListGrid:[], isloading:true})

        const searchParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
	        "ClientId":"1",
            "Name":this.state.selectedName,
            
        };
        console.log(searchParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetStoreOperations",  searchParams)
            .then(res => {
            const data = res.data;
            console.log(res.data)
            this.setState({storeOperationListGrid: data.storeOperations,  isloading:false})
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
        this.setState({newstoreOperationList: [],isLoading:true})

        
        console.log(this.state.newstoreOperationList)
        for (let i = 0; i < this.state.storeOperationListGrid.length; i++) {
            if (this.state.storeOperationListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.storeOperationListGrid[i]["id"],
                    Name: this.state.storeOperationListGrid[i]["name"],
                    IsDeleted: this.state.storeOperationListGrid[i]["isDeleted"].toString()
                };

                this.state.newstoreOperationList.push(obj);
            }
        }


        
    const jobParams = {
        "IpAddress":"0.0.0.0",
        "UserId":"1",
        "ClientId":"1",
        "storeOperations":this.state.newstoreOperationList
        };
        console.log(jobParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditStoreOperation", jobParams)
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
        for (let i = 0; i < this.state.storeOperationListGrid.length; i++) {
            if (this.state.storeOperationListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, storeid, column) {
        console.log(storeid)
        this.state.storeOperationListGrid.map(function(item,i) {
            if (item.id===storeid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    refreshPage(){
        this.setState({isloading:true})

        const refreshParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
            "ClientId":"1",
            "Name":""
            
        };
        console.log(refreshParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetStoreOperations",  refreshParams)
            .then(res => {
            const data = res.data;
            console.log(res.data)
            this.setState({storeOperationListGrid: data.storeOperations,  isloading:false})
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

    render() {
        const columns1 = [
            {
                dataField: 'name',
                text: 'NAME'
            }] 

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.storeOperationListGrid.map(function(item,i){
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
                            <Card.Header>STORE OPERATION</Card.Header>
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
                                                onChange={this.handleCoverChangeStoreOperation}
                                                options={this.state.storeOperationList}
                                                placeholder="Name"
                                            /> 
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary" className="ml-auto" onClick={this.handleSaveClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/StoreOperationCreate">
                                            <Button  variant="primary" variant="success">
                                                Create 
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                    <div className="mt-5">
                                            <BootstrapTable
                                                ref="tbl"
                                                caption={Noser.TableHeader({title:"Search Result"})}
                                                rowClasses="noser-table-row-class"
                                                striped
                                                hover
                                                condensed
                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                keyField = "id"
                                                data = { this.state.storeOperationListGrid }
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

export default StoreOperation;