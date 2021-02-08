import {
    React,Component,BootstrapTable,Type,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Banner, Container, DatePicker, LeaveModal, Tabs, Tab,
    sizePerPageRenderer
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class ExamCreationDisplay extends Component {
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
            examDescription:"",
            examInstruction:"",
            selectedNameId:"",
            examList:[]
            
        }
         
    }

    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetExams();

        // this.state.selectedName = this.props.location.params.data.name
        // this.state.selectedNameId = this.props.location.params.data.name
        // this.state.examDescription = this.props.location.params.data.description
        // this.state.examInstruction = this.props.location.params.data.instructions

        
        sleep(1000).then(() => {
            this.setState({isLoading:false})}) 
            // console.log(this.props.location.params.data)
    }

    handleCoverChangeExamName = (e) => {
        if (e.length > 0) {
            this.setState   ({selectedName: null, selectedNameId:"",examDescription:"",examInstruction:"" })
            
        } else {
            this.state.selectedName = this.props.location.params.data.name
            this.state.selectedNameId = this.props.location.params.data.nameId
            this.state.examDescription = this.props.location.params.data.description
            this.state.examInstruction = this.props.location.params.data.instructions
            
        }
    }  

        
    onChangeExamDescription(e){
        console.log(e)
        this.setState({examDescription:e.target.value})
    }

    onChangeExamInstruction(e){
        console.log(e)
        this.setState({examInstruction:e.target.value})
    }

    GetExams() {
        this.setState({
            examList:[]
            
        })
        const examParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
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
    

    handleSaveClick = event => {
        const examParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.userinfo.clientId,
            "Name":this.state.name,
            "Description":this.state.examDescription,
            "Instructions":this.state.examInstruction
        }
        console.log(examParams)
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddExam",  examParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get data");
                console.log(data)
                if(data.status=="1")
                {
                    this.setState(
                        { 
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
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            })
        
    }


    render() {
        const columns1 = [
            {
                dataField: 'questionName',
                text: 'QUESTION NAME',
                headerStyle: () => {
                    return { width: "10%" };
                },
            },
            {
                dataField: 'questionType',
                text: 'QUESTION TYPE',
                headerStyle: () => {
                    return { width: "35%" };
                },
            },
            {
                dataField: 'questionOrder',
                text: 'QUESTION ORDER',
                headerStyle: () => {
                    return { width: "35%" };
                },
            },
            {
                dataField: 'isActive',
                text: 'IS ACTIVE',
                editor: {
                    type: Type.CHECKBOX,
                    value: 'Y:N'
                  },
                
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
                            <Card.Header>Display Exam </Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                        <Col sm={6} className="mt-3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeExamName}
                                                options={this.state.examList}
                                                type="text" 
                                                placeholder="EXAM NAME"
                                               // defaultSelected={[this.state.selectedNameId = this.props.location.params.data.name]}
                                                // defaultSelected={this.state.applicationList.splice(this.state.applicationList.findIndex(x=>x.id===this.state.selectedFullNameId))}
                                                // disabled = { this.state.selectedFullNameId}
                                            /> 
                                        </Col>
                                        <Col sm={6} className="mt-3">
                                            <Form.Control 
                                                type="text"
                                                name="examDescrition"
                                                value={this.state.examDescription}
                                                placeholder="EXAM DESCRIPTION"
                                                onChange={this.onChangeExamDescription.bind(this)} 
                                                autoComplete="off"
                                                // disabled = { this.state.examDescription}
                                            />
                                        </Col>
                                        <Col sm={6} className="mt-3">                
                                            <Form.Control 
                                                type="text"
                                                name="examInstruction"
                                                value={this.state.examInstruction}
                                                placeholder="EXAM INSTRUCTIONS"
                                                onChange={this.onChangeExamInstruction.bind(this)} 
                                                autoComplete="off"
                                                // disabled = { this.state.examInstruction}
                                            />
                                        </Col>
                                    </Form.Row>
                                   {/*  <ButtonToolbar sm={12} className="mt-3">
                                        <NavLink to="/ExamCreationCreateQuestion">
                                            <Button  variant="primary" variant="success">
                                                EDIT
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar> */}
                                    <div className="mt-5">
                                        {/* <BootstrapTable
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

                                            /> */}
                                        <ButtonToolbar sm={12} className="mt-3">
                                            {/* <Button variant="primary"  onClick={this.handleSaveClick}>
                                                Save
                                            </Button>&nbsp;&nbsp; */}
                                             <NavLink to="/ExamCreationCreateQuestion">
                                            <Button  variant="primary" variant="success">
                                                EDIT
                                            </Button>
                                            </NavLink>&nbsp;&nbsp;
                                            <Button variant="danger" href="/Exam">
                                                Back
                                            </Button>
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

export default ExamCreationDisplay;