import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

//import  TrainingRegisterModal from './TrainingModal/TrainingRegisterModal'
import { ContentWriter } from 'istanbul-lib-report';

 
class InventoryTransfer extends Component {
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

            getShipTo       :   "",
            unKnownData     :   [],
            valueDummydata  :   "Open",
            modalListOfItems         :   false,
            modalListOfWarehouse     :   false,
            modalBatchNoSelection    :   false,
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

   
    /* showTrainingRegisterModal = (e) => {
        this.setState({modalTrainingRegisterShow: true})
    }
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({modalTrainingRegisterShow: false})
    } */


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.trainingScheduleTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }
    CreateCaseButton(){
        alert("Test Button!!.")
    }
    onChangeShipTo(){

    }
    handleShowListOfItems = ()=>{
        //alert("modal button")
        this.setState({
            //modalListOfItems:   true
            //modalListOfWarehouse:   true
            modalBatchNoSelection: true
        })
    }

    
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({
            //modalListOfItems: false,
            //modalListOfWarehouse: false,
            modalBatchNoSelection: false,
        })
    }

    render() {
        const selectDummyOptions = [
            {key : "A"},
            {key : "B"},
            {key : "C"},
        ];
        const DummyOptions = [
            {key : "Primary"},
            {key : "Secondary"},
            {key : "ETC"},
        ];
        const contentsColumn = [
            {
                dataField   : '',
                text        : 'Item No.',
                editable    : false,
                headerStyle : () => {
                    return { width  : "7%" };
                },
            },
            {
                dataField   : '',
                text        : 'Item Description',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'From Warehouse',
                headerStyle : () => {
                    return { width  : "9%" };
                }
            },
            {
                dataField   : '',
                text        : 'To Warehouse',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'Qty in Whse',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'Actual KG',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'Inventory UoM',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'UoM Code',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'UOM Name',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'Distr. Rule',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : '',
                text        : 'Already Save',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : '',
                text        : 'BO...',
                headerStyle : () => {
                    return { width  : "5%" };
                }
            },
        ];

    return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>INVENTORY TRANSFER</Card.Header>
                        <Card.Body>
                            <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                    <div className={this.state.color}></div> 
                                    {this.state.message}
                                </Alert>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Business Partner
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Number
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                        /> 
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Name
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Series
                                    </Form.Label>
                                    <Col sm="2">
                                    <Typeahead
                                            labelKey='key'
                                            id="id"
                                            onChange={this.onChangeShipTo}
                                            options={DummyOptions}
                                            placeholder="Primary"
                                        />  
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Contact Person
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Posting Date.
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Ship To
                                    </Form.Label>
                                    <Col sm="2">
                                        <Typeahead
                                            labelKey='key'
                                            id="id"
                                            onChange={this.onChangeShipTo}
                                            options={selectDummyOptions}
                                            placeholder="Select Shipping"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    </Form.Label>
                                    <Col sm="2">
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Document Date.
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    </Form.Label>
                                    <Col sm="2">
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Referenced Document.
                                    </Form.Label>
                                    <Col sm="2">
                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="mr-auto" onClick={ this.CreateCaseButton }>
                                            ...
                                        </Button>&nbsp;&nbsp;
                                    </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mt-5" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    </Form.Label>
                                    <Col sm="2">
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        From Warehouse
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                             type=""
                                             name=""
                                             value={this.state.unKnownData}
                                             onChange={this.CreateCaseButton} 
                                             autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    </Form.Label>
                                    <Col sm="2">
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        To Warehouse
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                             type=""
                                             name=""
                                             value={this.state.unKnownData}
                                             onChange={this.CreateCaseButton} 
                                             autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mt-2" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Price List
                                    </Form.Label>
                                    <Col sm="2">
                                        <Typeahead
                                            labelKey='key'
                                            id="id"
                                            onChange={this.onChangeShipTo}
                                            options={selectDummyOptions}
                                            placeholder="Last Purchase Price"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        To Bin Location
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                             type=""
                                             name=""
                                             value={this.state.unKnownData}
                                             onChange={this.CreateCaseButton} 
                                             autoComplete="off"
                                        />
                                    </Col>
                                </Form.Group>
                                <Card.Body>
                                    <Tabs defaultActiveKey="default" className="mr-auto" transition={false} id="controlled-tab-example">
                                    <Tab eventKey="default" title="Contents">
                                        <Card className="card-tab">
                                            
                                            <Card.Body>
                                                <Form.Group as={Col} sm={12}>
                                                    <BootstrapTable
                                                        keyField = "id"
                                                        data = { this.state.unKnownData }
                                                        columns = { contentsColumn }
                                                        //selectRow = { employeeOBBracketRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                        pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                    />
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                    <Tab eventKey="Attachment" width title="Attachment">
                                        <Card className="card-tab">
                                            
                                            <Card.Body>
                                                <Form.Group as={Col} sm={12}>
                                                    <BootstrapTable
                                                        keyField = "id"
                                                        data = { this.state.unKnownData }
                                                        columns = { contentsColumn }
                                                        //selectRow = { employeeOBBracketRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                        pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                    />
                                                </Form.Group>
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                    </Tabs>
                                </Card.Body><Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Sales Employee
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.onChangePosition} 
                                            autoComplete="off"
                                            placeholder="-No Sales Employee-"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Col sm="2">
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Journal Remarks
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.onChangePosition} 
                                            autoComplete="off"
                                            placeholder="-Inventory Transfers-"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Remarks
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.onChangePosition} 
                                            autoComplete="off"
                                            placeholder="WALK IN CONSO"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Col sm="2" className="mt-2 mr-auto" >
                                        <Button variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>Add</Button>&nbsp;&nbsp;
                                        <Button variant="danger"  style={{minWidth:'60px'}} onClick={this.CreateCaseButton} >Cancel</Button>
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Col sm="2" className="ml-auto" >
                                        <Dropdown.Toggle variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>Copy From</Dropdown.Toggle>&nbsp;&nbsp;
                                    </Col>
                                    {/* <Form.Group as={Col}>
                                        <Col sm="2" className="ml-auto" >
                                            <Button className= "btn btn-info" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>Copy To</Button>&nbsp;&nbsp;
                                            <Button variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton} >Inventory Transfer</Button>
                                        </Col>
                                    </Form.Group> */}
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />

                {/* <ListOfItems 
                    show={this.state.modalListOfItems}
                    onHide={this.handleModalClose}
                /> */}
                {/* <ListOfWarehouse
                    show={this.state.modalListOfWarehouse}
                    onHide={this.handleModalClose}
                /> */}
               {/* <BatchNoSelection
                    show={this.state.modalBatchNoSelection}
                    onHide={this.handleModalClose}
                /> */}

                
            </div> 
        )
    }

}

export  default InventoryTransfer
