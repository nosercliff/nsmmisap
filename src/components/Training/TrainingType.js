import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import  TrainingTypeCreateModal from './TrainingModal/TrainingTypeCreateModal'

class TrainingType extends Component {
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

            trainingTypeAutocomplete    :   [],
            trainingTypeTableList       :   [],
            modalTrainingTypeCreateShow :   false,

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetTrainingTypeName();
    }

    GetTrainingTypeName() {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   ""
        };

        console.log("Search Params")
        console.log(searchParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainingTypes",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 console.log("GetTrainingTypes")
                 console.log(data)
                 this.setState({ trainingTypeAutocomplete     :   data.trainingTypes, isloading : false })
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

    onChangeTrainingType = (e) => {
        console.log(e)
            if (e.length > 0) {
            this.state.selectedTrainingTypeName = e[0].name
            this.state.selectedTrainingTypeId = e[0].positionId
        } else {
            this.state.selectedTrainingTypeName = ""
            this.state.selectedTrainingTypeId = ""
        }
    }

    handleSearchClick = event => {
        this.setState({isloading:true})

        const searchParams = {
            "IpAddress"     :   "0.0.0.0",
            "UserId"        :   this.state.userinfo.userId,
            "ClientId"      :   this.state.userinfo.clientId,
            "Name"          :   this.state.selectedTrainingTypeName,
        };

        console.log("Search Params")
        console.log(searchParams)

         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetTrainingTypes",  searchParams
             )
             .then(res => {
                 const data = res.data;
                 //console.log("GetTrainingTypes Table")
                 //console.log(data)
                 this.setState({ trainingTypeTableList     :   data.trainingTypes, isloading : false })
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


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.trainingTypeTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    handleShowTrainingTypeModalCreate = () => {
        this.setState({
            modalTrainingTypeCreateShow     :   true
        })
    }
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({modalTrainingTypeCreateShow: false})
    }

    render() {
        
        const trainingTypeColumn = [
            {
                dataField: 'name',
                text: 'Name',
                headerStyle : () => {
                    return { width  : "100%" };
                }
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.trainingTypeTableList.map(function(item,i){
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
            }
        };
    return(
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>MAINTENANCE >> TRAINING MAINTENANCE  >> TRAINING TYPE</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            TRAINING TYPE
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.onChangeTrainingType}
                                                options={this.state.trainingTypeAutocomplete}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <Button  variant="success" onClick={this.handleShowTrainingTypeModalCreate}>
                                            Create
                                        </Button>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">List Training Type</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.trainingTypeTableList }
                                            columns = { trainingTypeColumn }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
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

                                        />
                                    </div>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleUpdateClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/home">
                                            <Button variant="danger" href="/home" style={{minWidth:'60px'}}>
                                                Close
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                       
                    </Container>
                    <NoserLoading show={this.state.isloading} />

                    <TrainingTypeCreateModal 
                        show={this.state.modalTrainingTypeCreateShow}
                        onHide={this.handleModalClose}
                    />
            </div> 
        )
    }

}

export  default TrainingType 
