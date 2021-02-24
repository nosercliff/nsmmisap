import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab,
    Dropdown, 
} 
from '../../noser-hris-component';
import { ArrowRight } from 'react-bootstrap-icons';

import ListOfItems from './sapModal/ListOfItems'
import ListOfWarehouse from './sapModal/ListOfWarehouse';

 
class SalesOrder extends Component {
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

            DataTmp:[],
            wareHouseData:[],
            businessPartner: "",
            Name:"",
            Warehouses:"",
            unknownData: "",
            modalListOfItems: false,
            modalListOfWarehouse: false,

            postingDate : new Date(),
            documentDate : new Date(),
            shipToAutocomplete : [
                { "name" : "Caloocan City" },
                { "name" : "Makati City" },
                { "name" : "Taguig City" },
                { "name" : "Quezon City" },
            ],
            contentsTableList : [
                { "id" : "1", "idNo" : "1",     "itemNo" : "PO0018",    "itemDesc" : "Liver",           "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "quantity" : "1,000",   "inventoryUoM" : "No", "uomCode" : "KG", "uomName" : "KG",  "distRule" : "", "qtyInventoryUom" : "1,000",   "qtyInWhse" : "11,704.6",   "alreadySave" : "0",  },
                { "id" : "2", "idNo" : "2",     "itemNo" : "PO0040",    "itemDesc" : "Entrails(set)",   "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "quantity" : "1,000",   "inventoryUoM" : "No", "uomCode" : "KG", "uomName" : "KG",  "distRule" : "", "qtyInventoryUom" : "1,000",   "qtyInWhse" : "",           "alreadySave" : "0",  },
                { "id" : "3", "idNo" : "3",     "itemNo" : "PO0036",    "itemDesc" : "Ear",             "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "quantity" : "1,000",   "inventoryUoM" : "No", "uomCode" : "KG", "uomName" : "KG",  "distRule" : "", "qtyInventoryUom" : "1,000",   "qtyInWhse" : "5,508.089",  "alreadySave" : "0",  },
                { "id" : "4", "idNo" : "4",     "itemNo" : "",          "itemDesc" : "",               "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "quantity" : "",        "inventoryUoM" : "", "uomCode" : "", "uomName" : "",        "distRule" : "", "qtyInventoryUom" : "",        "qtyInWhse" : "",           "alreadySave" : "0",  },
            ],
            businessPartnerAutocomplete : [],
        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        //this.GetBusinessPartnerData()
        //this.GetListOfWarehouses()
    }
    onChangeBusinessPartner= (e) =>{
        if(e.length == 0){
            this.businessPartner = ""
            return
        }
       this.state.businessPartner = e[0].businessPartner
       
       //console.log(this.state.businessPartner + " :businessPartner")
    }

    onChangeName= (e) =>{
        if(e.length == 0){
            this.Name = ""
            return
        }
       this.state.Name = e[0].name
       //console.log(this.state.businessPartner + " :businessPartner")
    }

    onChangeonChangeWarehouses= (e) =>{
        if(e.length == 0){
            this.Warehouses = ""
            return
        }
       this.state.unknownData = e[0].whse
       //this.setState({wareHouse: e.target.value})
    }

    handleChangePostingDate = date => {
        this.setState({
            postingDate : date
        })
    }

    handleChangeDocumentDate = date => {
        this.setState({
            documentDate : date
        })
    }

    handleClickItems = () => {
        //alert("Test")
        this.setState({
            modalListOfItems:   true
        })
    }

    handleShowListOfWarehouse = ()=>{
        this.setState({
            modalListOfWarehouse:   true
        })
    }

    handleModalCloseItems = (e) =>{
        this.setState({
            modalListOfItems:   false,
        })
    }

    handleModalCloseWarehouse = (e) =>{
        this.setState({
            modalListOfWarehouse: false,
        })
    }


    render() {

        const Warehouses = [
            {whse : "WHSH0001"},
            {whse : "WHSH0002"},
            {whse : "WHSH0003"},
            {whse : "WHSH0004"},
            {whse : "WHSH0005"},
            {whse : "WHSH0006"},
            {whse : "WHSH0007"},
            {whse : "WHSH0008"},
            {whse : "WHSH0009"},
            {whse : "WHSH0010"},

        ];

        const businessPartner = [

            {Id : "Partner A"},
            {Id : "Partner B"},
            {Id : "Partner C"},
            {Id : "Partner D"},
            {Id : "Partner E"},
            {Id : "Partner F"},
            {Id : "Partner G"},

            
        ];

        const Name = [

            {name : "Partner A"},
            {name : "Partner B"},
            {name : "Partner C"},
            {name : "Partner D"},
            {name : "Partner E"},
            {name : "Partner F"},
            {name : "Partner G"},

        ];

        const contentsColumn = [
            {
                dataField   : 'idNo',
                text        : '#',
                editable : false,
            },
            {
                dataField   : 'itemNo',
                text        : 'Item No.',
                editable : false,
                formatter   :   (cell, row, isSelect) => {
                    if (cell)
                    return (
                        <Button style={{fontSize:'11px', textDecoration: "none"}}
                            variant="link" onClick={this.handleClickItems}
                        ><ArrowRight style={{color: "#f4d56e",}} size={20}/> <span style={{color: "#000000" }}>{row.itemNo}</span> </Button>
                    );
                },
            },
            {
                dataField   : 'itemDesc',
                text        : 'Item Description',
                editable : false,
                formatter   :   (cell, row, isSelect) => {
                    if (cell)
                    return (
                        <Button style={{fontSize:'11px', textDecoration: "none"}}
                            variant="link" onClick={this.handleClickItems}
                        >{/* <ArrowRight style={{color: "#f4d56e",}} size={20}/>  */}<span style={{color: "#000000" }}>{row.itemDesc}</span> </Button>
                    );
                },
            },
            {
                dataField   : 'fromWarehouse',
                text        : 'From Warehouse',
                editable : false,
                formatter   :   (cell, row, isSelect) => {
                    if (cell)
                    return (
                        <Button style={{fontSize:'11px', textDecoration: "none"}}
                            variant="link" onClick={this.handleShowListOfWarehouse}
                        > <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}>{row.toWarehouse}</span> </Button>
                    );
                },
            },
            {
                dataField   : 'toWarehouse',
                text        : 'To Warehouse',
                editable : false,
                formatter   :   (cell, row, isSelect) => {
                    if (cell)
                    return (
                        <Button style={{fontSize:'11px', textDecoration: "none"}}
                            variant="link" onClick={this.handleShowListOfWarehouse}
                        > <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}>{row.toWarehouse}</span> </Button>
                    );
                },
            },
            {
                dataField   : 'quantity',
                text        : 'Quantity',
                editable : false,
            },
            {
                dataField   : 'inventoryUoM',
                text        : 'Inventory UoM',
                editable : false,
            },
            {
                dataField   : 'uomCode',
                text        : 'UoM Code',
                editable : false,
            },
            {
                dataField   : 'uomName',
                text        : 'UoM Name',
                editable : false,
            },
            {
                dataField   : 'distRule',
                text        : 'Distr. Rule',
                editable : false,
            },
            {
                dataField   : 'qtyInventoryUom',
                text        : 'Qty(Inventory Uom)',
                editable : false,
            },
            {
                dataField   : 'qtyInWhse',
                text        : 'Qty In Whse',
                editable : false,
            },
            {
                dataField   : 'alreadySave',
                text        : 'Already Save',
                editable : false,
            },
        ]

        const contentsSelectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            style: { backgroundColor: '#fcdd82' },
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.contentsTableList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };

        const contentsRowEvents = {
            onClick: (e, row, rowIndex) => {
            }
        };

        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Form.Group className="mt-4" as={Row} controlId="formPlaintextEmail">
                        <Col sm="8">
                            <Card style={{background : "#f0fff9"}}>
                                <Card.Header style={{background : "#ababac"}}>Inventory >> Sales Order</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>   
                                        <Card  className="mt-5" style={{background : "#f0fff9"}}>
                                            <Card.Body>
                                                <Tabs defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                                    <Tab eventKey="default" title="Contents">
                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    Item / Service Item
                                                    </Form.Label>
                                                    <Col sm="2">
                                                        <Form.Control 
                                                        ref="name"
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={this.onChangeName}
                                                        autoComplete="off"
                                                        placeholder= "Item"
                                                        />
                                                    </Col>
                                                    <Col sm="4">
                                                    </Col>
                                                    <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                    Summary Type
                                                    </Form.Label>
                                                    <Col sm="2">
                                                        <Form.Control as="select">
                                                            <option>No Summary Type</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Form.Group>

                                                <div className="mt-1">
                                                    <BootstrapTable
                                                        keyField = "id"
                                                        data = { this.state.contentsTableList }
                                                        columns = { contentsColumn }
                                                        //pagination={ paginationFactory({sizePerPageRenderer}) }
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
                                                        rowEvents={ contentsRowEvents }
                                                        selectRow = { contentsSelectRow }

                                                    />
                                                </div>

                                                    </Tab>
                                                    <Tab eventKey="logistics" title="Logistics"></Tab>
                                                    <Tab eventKey="accounting" title="Accounting"></Tab>
                                                    <Tab eventKey="electronincDocuments" title="ElectronincDocuments"></Tab>
                                                    <Tab eventKey="sttachments" title="Attachments"></Tab>

                                                </Tabs>
                                            </Card.Body>
                                        </Card>

                                        <Form.Group as={Row} className="mt-5" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Sales Employee
                                            </Form.Label>
                                            <Col sm="3">
                                                <Form.Control as="select">
                                                    <option></option>
                                                    <option></option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Total Before Discount
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                     readOnly 
                                                    
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Owner
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='businessPartner'
                                                    id="basic-example"
                                                    onChange={this.onChangeBusinessPartner}
                                                    options={this.state.DataTmp}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Discount
                                            </Form.Label>
                                            <Col sm="1">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                            <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                %
                                            </Form.Label>

                                            <Col sm="2">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Freight
                                                <Button style={{fontSize:'11px', textDecoration: "none",}}
                                                    variant="link"
                                                > <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}>{}</span> 
                                                </Button>
                                            </Form.Label> 
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                                Rounding
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Tax
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Total
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                    
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                             Remarks
                                            </Form.Label>
                                            <Col sm="3">
                                                <Form.Control 
                                                    as="textarea"
                                                    rows={3}
                                                    name="instructions"
                                                    value={this.state.instructions}
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            
                                            </Form.Label>
                                            <Col sm="4">
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="10">
                                                <ButtonToolbar>
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handlePrevClick}>OK</Button>
                                                    &nbsp;&nbsp;
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleNextClick}>Cancel</Button>
                                                </ButtonToolbar>
                                            </Col>
                                            <Col sm="2">
                                                <Dropdown>
                                                    <Dropdown.Toggle  style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} id="dropdown-basic">
                                                        Copy To
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="#/action-1">Delivery</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-2">A/R Invoice</Dropdown.Item>
                                                        <Dropdown.Item href="#/action-3">Res. Invoice</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm="4">
                            <Card style={{background : "#f0fff9"}}>
                                <Card.Body>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        With Downpayment?
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control as="select">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        With Landed Cost?
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control as="select">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Plate No:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Driver:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Seal No:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Helper:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Nature Of Trnasaction:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        SPS Clearance:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Commercial Inv:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Origin:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Packing Slip:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Health Certificate:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Insurance:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Bill Of Lading:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Container Num:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Exported?:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        POS Ref:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Status:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Check By:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Received By:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Return To OA:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Checked By:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Approved By:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Arrived In Port?:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        ITR Type:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        IT Type:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Delivery To Store?:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Document ID:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Confirmed:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Pull Out Reason:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        Outlets SM/Walter Outright:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>                             
                        </Col>
                    </Form.Group>
                    
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
            </div> 
        )
    }

}

export  default SalesOrder
