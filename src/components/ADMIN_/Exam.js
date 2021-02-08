import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class Exam extends Component {
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

            examList:[],
            examListGrid:[],
            newexamList: [],
            selectedName:"",
            selectedNameId:""
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetExams();
        
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
        }

    handleCoverChangeEXAMName = (e) => {
        if (e.length > 0) {
            this.state.selectedName = e[0].name
            this.state.selectedNameId = e[0].id

        } else {
            this.state.selectedName = ""
            this.state.selectedNameId = ""
        }
        
        console.log(this.state.selectedName);
       
    } 

    GetExams() {
        this.setState({
            examList:[]
            
        })
        const examParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
	        "ClientId":"1",
            "Name":this.state.selectedName,
            "Description":"",
	        "Instructions":""
        };
        console.log("Test app");
        console.log(examParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetExams",  examParams)
        .then(res => {
            const data = res.data;
            console.log("Test app");
            console.log(data);
            this.setState({ examList: data.exams});
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
        this.setState({examListGrid:[], isloading:true})

        const examParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
	        "ClientId":"1",
            "Name":this.state.selectedName,
            "Description":"",
	        "Instructions":""
        };
        console.log(examParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetExams",  examParams)
            .then(res => {
            const data = res.data;
            console.log(res.data)
            this.setState({examListGrid: data.exams,  isloading:false})
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
        this.setState({newexamList: [],isLoading:true})

        
        console.log(this.state.newexamList)
        for (let i = 0; i < this.state.examListGrid.length; i++) {
            if (this.state.examListGrid[i]["isModified"] == 1) {
                const obj = {
                    Id: this.state.examListGrid[i]["id"],
                    Name: this.state.examListGrid[i]["name"],
                    Description :this.state.examListGrid[i]["description"],
		            Instructions :this.state.examListGrid[i]["instructions"],
                    IsDeleted: this.state.examListGrid[i]["isDeleted"].toString()
                };

                this.state.newexamList.push(obj);
            }
        }


        
    const examParams = {
        "IpAddress":"0.0.0.0",
        "ClientId":this.state.userinfo.clientId,
        "UserId":this.state.userinfo.userId,
        "exams":this.state.newexamList
        };
        console.log(examParams)
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/EditExam", examParams)
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
        for (let i = 0; i < this.state.examListGrid.length; i++) {
            if (this.state.examListGrid[i]["isModified"] == 1) {
                this.setState({isGridDataChanged: true})
                isChanged=true
                break;
            }
        }
        return isChanged
    }

    GridDataModified(oldValue, newValue, examid, column) {
        console.log(examid)
        this.state.examListGrid.map(function(item,i) {
            if (item.id===examid)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })
    }

    refreshPage(){
        this.setState({isloading:true})

        const SearchParams = {
            "IpAddress":"0.0.0.0",
            "UserId":"1",
	        "ClientId":"1",
            "Name":"",
            "Description":"",
	        "Instructions":""
        };

        console.log("Submit Search Params")
        console.log(SearchParams)

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetExams",  SearchParams)
            .then(res => {
                const data = res.data;
                this.setState({
                    examListGrid: data.exams,
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
                dataField: 'id',
                text: 'EXAM ID',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'name',
                text: 'EXAM NAME',
                headerStyle: () => {
                    return { width: "40%" };
                },
            },
            {
                dataField: 'description',
                text: 'EXAM DESCRIPTION',
                headerStyle: () => {
                    return { width: "40%" };
                },
            },
            {
                dataField: 'command',
                text: 'COMMAND',
                editable:false,
                formatter   :   (cell, row, isSelect) => {
                    if(row) 
                        return (
                            <NavLink to={{pathname:"/ExamCreationDisplay",params:{data:row} }}>
                                <Button variant="secondary"
                                href="/ExamCreationDisplay"
                                >View</Button>
                            </NavLink>
                        );
                    }
            }] 
            const selectRow = {
                mode: 'checkbox',
                clickToSelectAndEditCell: true,
                onSelect: (row, isSelect, rowIndex, e) => {
                    this.state.examListGrid.map(function(item,i){
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
                            <Card.Header>Exam</Card.Header>
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
                                                    onChange={this.handleCoverChangeEXAMName}
                                                    options={this.state.examList}
                                                    placeholder="Exam Name"
                                                /> 
                                        </Col>
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                    <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/ExamCreate">
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
                                            data = { this.state.examListGrid }
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

export default Exam;