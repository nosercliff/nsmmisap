import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class PostTrainingExaminationCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fade            :   true, 
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",

            examName                :   "",
            clientAutocomplete          :   [],
            positionAutocomplete        :   [],
            trainingNameAutocomplete    :   [],

            clientTableList     :   [],
            positionTableList   :   [],
            postExamTableList   :   [],
            instruction         :   "",
            noOfItems           :   "",
            timeLimit           :   "",
            passingScore        :   "",

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetTrainingName()
    }

    GetTrainingName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"         :   "0.0.0.0",
            "UserId"            :   this.state.userinfo.userId,
            "ClientId"          :   this.state.selectedClientId,
            "Name"              :   "",
            "TrainingTypeId"    :   this.state.selectedTrainingTypeId,
            "PositionId"        :   this.state.selectedPositionId,
        };

        console.log("Search Params")

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainings",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainings")
                 console.log(data)
                 this.setState({ trainingNameAutocomplete     :   data.trainings, isloading : false })
                 if(data.status=="0"){
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
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                    fade            :   true
                })
            })
        
    }
    
    onChangeTrainingName = (e) => {
        if(e.length == 0) {
            this.setState({
                clientTableList     :   [],
                positionTableList   :   []
            })
            return
        }
        for (let clientLoop = 0; clientLoop < e[0].trainingClients.length; clientLoop++) {
            const clientObj = {
                "client"   :   e[0].trainingClients[clientLoop]["client"],
            };
            this.state.clientTableList.push(clientObj);
        }

        for (let positionLoop = 0; positionLoop < e[0].trainingPositions.length; positionLoop++) {
            const positionObj = {
                "position"   :   e[0].trainingPositions[positionLoop]["position"],
            };
            this.state.positionTableList.push(positionObj);
        }
        this.setState({
            isshow:false,
        })
    }

    render() {

        const clientColumn = [
            {
                dataField: 'client',
                text: 'Client',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const clientSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.clientTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const clientRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };


        const positionColumn = [
            {
                dataField: 'position',
                text: 'Position',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const positionSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.positionTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const positionRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };


        const postExamColumn = [
            {
                dataField: 'questions',
                text: 'Questions',
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },
            {
                dataField: 'choices',
                text: 'Choices',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
            {
                dataField: 'answers',
                text: 'Answers',
                headerStyle : () => {
                    return { width  : "25%" };
                }
            },
        ]

        const postExamSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.postExamTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const postExamRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };

    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE  >> POST TRAINING EXAMINATION (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            EXAM NAME
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control 
                                                ref="examName"
                                                name="examName"
                                                value={this.state.examName}
                                                onChange={this.onChangeExamName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING NAME
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTrainingName}
                                                options={this.state.trainingNameAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} sm={5} controlId="formGridPassword">

                                            <Card.Header className="mt-3">List of Client</Card.Header>
                                            <div className="mt-1">
                                                <BootstrapTable
                                                    /* caption={Noser.TableHeader({title:"RECORD"})} */
                                                    keyField = "id"
                                                    data = { this.state.clientTableList }
                                                    columns = { clientColumn }
                                                    /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                                    rowClasses="noser-table-row-class"
                                                    striped
                                                    hover
                                                    condensed
                                                    cellEdit = { cellEditFactory({
                                                        mode: 'dbclick',
                                                        blurToSave: true,
                                                        afterSaveCell: (oldValue, newValue, row, column) => {
                                                            this.ClientGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                            }
                                                        })
                                                    }
                                                    rowEvents={ clientRowEvents }
                                                    selectRow = { clientSelectRow }

                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Group as={Col} sm={2} controlId="formGridPassword">
                                        </Form.Group>
                                        <Form.Group as={Col} sm={5} controlId="formGridPassword">

                                            <Card.Header className="mt-3">List of Position</Card.Header>
                                            <div className="mt-1">
                                                <BootstrapTable
                                                    /* caption={Noser.TableHeader({title:"RECORD"})} */
                                                    keyField = "id"
                                                    data = { this.state.positionTableList }
                                                    columns = { positionColumn }
                                                    /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                                    rowClasses="noser-table-row-class"
                                                    striped
                                                    hover
                                                    condensed
                                                    cellEdit = { cellEditFactory({
                                                        mode: 'dbclick',
                                                        blurToSave: true,
                                                        afterSaveCell: (oldValue, newValue, row, column) => {
                                                            this.PositionGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                            }
                                                        })
                                                    }
                                                    rowEvents={ positionRowEvents }
                                                    selectRow = { positionSelectRow }

                                                />
                                            </div>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            INSTRUCTION
                                        </Form.Label>
                                        <Col sm="11">
                                            <Form.Control
                                                as="textarea"
                                                rows={3} 
                                                ref="instruction"
                                                name="instruction"
                                                value={this.state.instruction}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            NO. OF ITEMS
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                type="text" 
                                                ref="noOfItems"
                                                name="noOfItems"
                                                value={this.state.noOfItems}
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TIME LIMIT
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                type="text" 
                                                ref="timeLimit"
                                                name="timeLimit"
                                                value={this.state.timeLimit}
                                            />
                                        </Col>
                                        <Col sm="1">
                                        </Col>
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            PASSING SCORE
                                        </Form.Label>
                                        <Col sm="2">
                                            <Form.Control 
                                                type="text" 
                                                ref="passingScore"
                                                name="passingScore"
                                                value={this.state.passingScore}	
                                            />
                                        </Col>
                                    </Form.Group>

                                    <div className="mt-3">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.postExamTableList }
                                            columns = { postExamColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.PositionGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            rowEvents={ postExamRowEvents }
                                            selectRow = { postExamSelectRow }

                                        />
                                    </div>
                                        
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button  href="/posttrainingexamination" variant="danger">Back</Button>
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

export  default PostTrainingExaminationCreate 
