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
import ListOfItems from './sapModal/ListOfItems'
import ListOfWarehouse from './sapModal/ListOfWarehouse';
import BatchesSetup from './sapModal/BatchesSetup';
import BatchNoSelection from './sapModal/BatchNoSelection';
import { ContentWriter } from 'istanbul-lib-report';
import Glyphicon from 'glyphicons'

 
class InventoryTransferRequest extends Component {
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
            modalBatchSetup          :  false,

            //DUMMY DATA
            sapData: [],
            ITEMNO              :   "",
            ITEMDISCRIPTION     :   "",
            FROMWAREHOUSE       :   "",
            TOWAREHOUSE         :   "",
            QUANTITY            :   "",
            INVENTORYUoM        :   "",
            UoMCODE             :   "",
            UoMNAME             :   "",
            DISTRRULE           :   "",
            QTYINVENTORYUoM     :   "",
            QTYINWHSE           :   "",
            ALREADYSAVE         :   "",
            BOX                 :   "",
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetDummyDataSAP();
    }

   
    /* showTrainingRegisterModal = (e) => {
        this.setState({modalTrainingRegisterShow: true})
    }
    handleModalClose = (e) =>{
        //reload or refresh data here
        //alert("Data pass from child : " + e)
        this.setState({modalTrainingRegisterShow: false})
    } */


    GetDummyDataSAP(){

    let filter_data = {}
    
    const getParams = {
        "_collection" : "DummyDataSAP",
        "filter_data" : filter_data
        }
        axios
        .post("http://134.209.99.190:8088/action/get" , getParams)
        .then(res => {
        const data = res.data
        //console.log("Start SAP data")
        //console.log(data["DummyDataSAP"])
        //console.log("End SAP data")
        const itemUsersDataLists = this.buildList(data["DummyDataSAP"])
        let SapList =[]
        for (let i = 0; i < itemUsersDataLists.length; i++) {
            let obj = {
                'id'                :   itemUsersDataLists[i]['id'].replace(" '","").replace("'",""),
                'ITEMNO'            :   itemUsersDataLists[i]['ITEMNO'].replace(" '","").replace("'",""),
                'ITEMDISCRIPTION'   :   itemUsersDataLists[i]['ITEMDISCRIPTION'].replace(" '","").replace("'",""),
                'FROMWAREHOUSE'     :   itemUsersDataLists[i]['FROMWAREHOUSE'].replace(" '","").replace("'",""),
                'TOWAREHOUSE'       :   itemUsersDataLists[i]['TOWAREHOUSE'].replace(" '","").replace("'",""),
                'QUANTITY'          :   itemUsersDataLists[i]['QUANTITY'].replace(" '","").replace("'",""),
                'INVENTORYUoM'      :   itemUsersDataLists[i]['INVENTORYUoM'].replace(" '","").replace("'",""),
                'UoMCODE'           :   itemUsersDataLists[i]['UoMCODE'].replace(" '","").replace("'",""),
                'UoMNAME'           :   itemUsersDataLists[i]['UoMNAME'].replace(" '","").replace("'",""),
                'DISTRRULE'         :   itemUsersDataLists[i]['DISTRRULE'].replace(" '","").replace("'",""),
                'QTYINVENTORYUoM'   :   itemUsersDataLists[i]['QTYINVENTORYUoM'].replace(" '","").replace("'",""),
                'QTYINWHSE'         :   itemUsersDataLists[i]['QTYINWHSE'].replace(" '","").replace("'",""),
                'ALREADYSAVE'       :   itemUsersDataLists[i]['ALREADYSAVE'].replace(" '","").replace("'",""),
                'BOX'               :   itemUsersDataLists[i]['BOX'].replace(" '","").replace("'",""),
            }
            SapList.push(obj)
        }
        this.setState({sapData : SapList})
        console.log("sapData")
        console.log(this.state.sapData)
        })
        .catch(error=>{
            //console.log("error: " + error)
        })
    }
    buildList = (data) => {

        let itemList =[]
     
        let idList                  =[]
        let ITEMNOList              =[]
        let ITEMDISCRIPTIONList     =[]
        let FROMWAREHOUSEList       =[]
        let TOWAREHOUSEList         =[]
        let QUANTITYList            =[]
        let INVENTORYUoMList        =[]
        let UoMCODEList             =[]
        let UoMNAMEList             =[]
        let DISTRRULEList           =[]
        let QTYINVENTORYUoMList     =[]
        let QTYINWHSEList           =[]
        let ALREADYSAVEList         =[]
        let BOXList                 =[]
        
    
        for (let i = 0; i < data.length; i++) {
            let s1 = data[i].split(",")
            let idClean = s1[0].replace("ObjectId(","").replace(")","").replace("{","")
            let modifiedClean = s1[13].replace("}","")
            idList.push(idClean.split(":")[1])
            ITEMNOList.push(s1[1].split(":")[1])
            ITEMDISCRIPTIONList.push(s1[2].split(":")[1])
            FROMWAREHOUSEList.push(s1[3].split(":")[1])
            TOWAREHOUSEList.push(s1[4].split(":")[1])
            QUANTITYList.push(s1[5].split(":")[1])
            INVENTORYUoMList.push(s1[6].split(":")[1])
            UoMCODEList.push(s1[7].split(":")[1])
            UoMNAMEList.push(s1[8].split(":")[1])
            DISTRRULEList.push(s1[9].split(":")[1])
            QTYINVENTORYUoMList.push(s1[10].split(":")[1])
            QTYINWHSEList.push(s1[11].split(":")[1])
            ALREADYSAVEList.push(s1[12].split(":")[1])
            BOXList.push(modifiedClean.split(":")[1])
        }
        for (let i = 0; i < idList.length; i++) {
        //console.log("object")
            let obj = {
                "id"                :   idList[i],
                "ITEMNO"            :   ITEMNOList[i],
                "ITEMDISCRIPTION"   :   ITEMDISCRIPTIONList[i],
                "FROMWAREHOUSE"     :   FROMWAREHOUSEList[i],
                "TOWAREHOUSE"       :   TOWAREHOUSEList[i],
                "QUANTITY"          :   QUANTITYList[i],
                "INVENTORYUoM"      :   INVENTORYUoMList[i],
                "UoMCODE"           :   UoMCODEList[i],
                "UoMNAME"           :   UoMNAMEList[i],
                "DISTRRULE"         :   DISTRRULEList[i],
                "QTYINVENTORYUoM"   :   QTYINVENTORYUoMList[i],
                "QTYINWHSE"         :   QTYINWHSEList[i],
                "ALREADYSAVE"       :   ALREADYSAVEList[i],
                "BOX"               :   BOXList[i],
            
            }
            itemList.push(obj)
        }
        return itemList
    }
/* 
    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.trainingScheduleTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    } */
    CreateCaseButton(){
        alert("Test Button!!.") 
    }
    onChangeShipTo(){

    }
    handleShowListOfItems = ()=>{
        this.setState({
            modalListOfItems:   true
            //modalListOfWarehouse:   true
            //modalBatchNoSelection: true
            //modalBatchSetup: true
        })
    }
    handleShowListOfWarehouse = ()=>{
        this.setState({
            modalListOfWarehouse:   true
        })
    }

    
    handleModalCloseItems = (e) =>{
        this.setState({
            modalListOfItems: false,
            //modalListOfWarehouse: false,
            //modalBatchNoSelection: false,
            //modalBatchSetup: false
        })
    }
    handleModalCloseWarehouse = (e) =>{
        this.setState({
            //modalListOfItems: false,
            modalListOfWarehouse: false,
            //modalBatchNoSelection: false,
            //modalBatchSetup: false
        })
    }

    render() {

        const selectDummyOptions = [
            {key : "A"},
            {key : "B"},
            {key : "C"},
        ];
        const contentsColumn = [
            {
                dataField   : 'ITEMNO',
                text        : 'Item No.',
                //formatter   : dataFormatter,
                headerStyle : () => {
                    return { width  : "7%" };
                },
                events: {
                    onClick: (e, column, columnIndex, ) => {
                      //alert('item column');
                      this.handleShowListOfItems(e);
                    },
                }
            },
            {
                dataField   : 'ITEMDISCRIPTION',
                text        : 'Item Description',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            
            {
                dataField   : 'FROMWAREHOUSE',
                text        : 'From Warehouse',
                headerStyle : () => {
                    return { width  : "9%" };
                },
                events: {
                    onClick: (e, column, columnIndex, ) => {
                      //alert('item column');
                      this.handleShowListOfWarehouse(e);
                    },
                }
            },
            {
                dataField   : 'TOWAREHOUSE',
                text        : 'To Warehouse',
                headerStyle : () => {
                    return { width  : "7%" };
                },
                events: {
                    onClick: (e, column, columnIndex, ) => {
                      //alert('item column');
                      this.handleShowListOfWarehouse(e);
                    },
                }
            },
            {
                dataField   : 'QUANTITY',
                text        : 'Quantity',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : 'INVENTORYUoM',
                text        : 'Inventory UoM',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : 'UoMCODE',
                text        : 'UoM Code',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : 'UoMNAME',
                text        : 'UoM Name',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : 'DISTRRULE',
                text        : 'Distr. Rule',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : 'QTYINVENTORYUoM',
                text        : 'QTY(Inventory UoM)',
                headerStyle : () => {
                    return { width  : "7%" };
                }
            },
            {
                dataField   : 'QTYINWHSE',
                text        : 'QTY in Whse',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'ALREADYSAVE',
                text        : 'Already Save',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField   : 'BOX',
                text        : 'Box',
                headerStyle : () => {
                    return { width  : "5%" };
                }
            },
        ];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
          };
        /* const rowEvents = {
            onClick: (e, row, rowIndex) => {
               console.log("rowEvents")
               this.handleShowListOfItems();
               
            }
        }; */

    return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>Inventory Transfer Request</Card.Header>
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
                                            type="text"
                                            name="selectedEmployeeName"
                                            value={this.state.selectedEmployeeName}
                                            onChange={this.onChangePosition} 
                                            autoComplete="off"
                                        />
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                        NO.
                                    </Form.Label>
                                    <Col sm="1">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                            placeholder="Primary"
                                        />
                                    </Col>
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
                                        Status.
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.valueDummydata}
                                            onChange={this.CreateCaseButton} 
                                            autoComplete="off"
                                            placeholder="Open"
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
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Due Date.
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
                                <Form.Group as={Row} className="mt-5" controlId="formPlaintextEmail">
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
                                </Form.Group>
                                <Card.Body>
                                    <Tabs defaultActiveKey="default" className="mr-auto" transition={false} id="controlled-tab-example">
                                    <Tab eventKey="default" title="Contents">
                                        <Card className="card-tab">
                                            
                                            <Card.Body>
                                                <Form.Group as={Col} sm={12}>
                                                    <BootstrapTable
                                                        keyField = "id"
                                                        data = { this.state.sapData }
                                                        columns = { contentsColumn }
                                                        //selectRow = { employeeOBBracketRow }
                                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                        pagination={ paginationFactory({sizePerPage:15,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                                                        rowClasses="noser-table-row-class"
                                                        striped
                                                        hover
                                                        condensed
                                                        //rowEvents={rowEvents}
                                                        selectRow={selectRow}
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
                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                        Pick and Pack Remarks
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control 
                                            type=""
                                            name=""
                                            value={this.state.unKnownData}
                                            onChange={this.onChangePosition} 
                                            autoComplete="off"
                                        />
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
                                            placeholder="-Inventory Transfer Request-"
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
                                        <Button variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>OK</Button>&nbsp;&nbsp;
                                        <Button variant="danger"  style={{minWidth:'60px'}} onClick={this.CreateCaseButton} >Cancel</Button>
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                    <Col sm="2" className="ml-auto" >
                                        <Dropdown.Toggle variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton}>Copy To</Dropdown.Toggle>&nbsp;&nbsp;
                                        <Button variant="success" style={{minWidth:'60px'}} onClick={this.CreateCaseButton} >Inventory Transfer</Button>
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

                <ListOfItems 
                    show={this.state.modalListOfItems}
                    onHide={this.handleModalCloseItems}
                />
                <ListOfWarehouse
                    show={this.state.modalListOfWarehouse}
                    onHide={this.handleModalCloseWarehouse}
                />
               {/* <BatchNoSelection
                    show={this.state.modalBatchNoSelection}
                    onHide={this.handleModalClose}
                /> */}
               {/*  <BatchesSetup
                    show={this.state.modalBatchSetup}
                    onHide={this.handleModalClose}
                /> */}

                
            </div> 
        )
    }

}

export  default InventoryTransferRequest
