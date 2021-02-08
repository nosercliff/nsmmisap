import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class RequiredDocumentsCreate extends Component {
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

                clientList      :   [],
                positionList    :   [],

                selectedClientId    :   "",
                selectedPositionId  :   "",

                mandatoryDocumentsListGrid	:   [],
                optionalDocumentsListGrid   :   [],
            }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClient();
    }

    getClient(){
        const clientParams = {
            "IpAddress":"0.0.0.0",
           "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }

        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
            .then(res => {
                const data = res.data;
                console.log("GetClientList");
                console.log(data); 
                this.setState({clientList : data.clients})
                
            }
        )
    
    }
    
    handleCoverChangeClient = (e) => {
        if (e.length > 0) {
            this.state.selectedClient = e[0].name
            this.state.selectedClientId = e[0].id

        } else {
            this.state.selectedClient = ""
            this.state.selectedClientId = ""
        }
        this.setState({
            isshow  :   false,
        })
        this.GetPosition();
       
    }

    GetPosition() {
        const positionParams = {
            "IpAddress":"0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "SectionId":"",
            "DepartmentId":"",
            "Name":""
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPositions",  positionParams)
        .then(res => {
            const data = res.data;
            console.log("Get Position Name");
            console.log(data);
            this.setState({ positionList  : data.positions });
        })
        
    }

    handleChangePosition = (e) => {
        //console.log(e)
        if (e.length > 0) {
            this.state.selectedPosition = e[0].name
            this.state.selectedPositionId = e[0].id
        } else {
            this.state.selectedPosition = ""
            this.state.selectedPositionId = ""
        }
        console.log("Get Position Id");
        console.log(this.state.selectedPositionId);
    }


    render() {
        
        const mandatoryDocumentsColumn = [
            {
                dataField: 'documents',
                text: 'Documents',
                editable: false,
                headerStyle: () => {
                    return { width: "60%" };
                },
            },
            {
                dataField: 'documentsCode',
                text: 'Documents Code',
                headerStyle: () => {
                    return { width: "40%" };
                },
            },
        ] 
        
        const mandatoryDocumentsSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.mandatoryDocumentsListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
                })

            }
        };
            const mandatoryDocumentsRowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };


        
        const optionalDocumentsColumn = [
            {
                dataField: 'documents',
                text: 'Documents',
                editable: false,
                headerStyle: () => {
                    return { width: "60%" };
                },
            },
            {
                dataField: 'documentsCode',
                text: 'Documents Code',
                headerStyle: () => {
                    return { width: "40%" };
                },
            },
        ] 
        
        const optionalDocumentsSelectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.optionalDocumentsListGrid.map(function(item,i){
                    if(item.id===row.id)
                        {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                    //console.log(item.id)
                })

            }
        };
            const optionalDocumentsRowEvents = {
            onClick: (e, row, rowIndex) => {

            }
        };

        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>MAINTENANCE >> TRAINING >> REQUIRED DOCUMENTS - (CREATE)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            CLIENT
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeClient}
                                                options={this.state.clientList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                            POSITION
                                        </Form.Label>
                                        <Col sm="11">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangePosition}
                                                options={this.state.positionList}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Card.Header className="mt-5">Mandatory Documents</Card.Header>
                                    <div>
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.mandatoryDocumentsListGrid }
                                            columns = { mandatoryDocumentsColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.MandatoryDocumentsGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            selectRow = { mandatoryDocumentsSelectRow }
                                            rowEvents={ mandatoryDocumentsRowEvents }
                                        />
                                    </div>
                                    <Card.Header className="mt-5">Optional Documents</Card.Header>
                                    <div>
                                        <BootstrapTable
                                            keyField = "id"
                                            data = { this.state.optionalDocumentsListGrid }
                                            columns = { optionalDocumentsColumn }
                                            /* pagination={ paginationFactory({sizePerPageRenderer}) } */
                                            noDataIndication={ () => <div style={{width:'100%'}}>No record found.</div> }
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            cellEdit = { cellEditFactory({
                                                mode: 'dbclick',
                                                blurToSave: true,
                                                afterSaveCell: (oldValue, newValue, row, column) => {
                                                    this.OptionalDocumentsGridDataModified(oldValue, newValue, row.id, column.dataField)
                                                    }
                                                })
                                            }
                                            selectRow = { optionalDocumentsSelectRow }
                                            rowEvents={ optionalDocumentsRowEvents }
                                        />
                                    </div>
                                    <ButtonToolbar sm={12}>
                                        <Button className="ml-auto" variant="danger" href="/requireddocuments">
                                            Back
                                        </Button>
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

export  default RequiredDocumentsCreate
