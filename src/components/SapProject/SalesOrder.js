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
                                <Card.Header style={{background : "#ababac"}}>INVENTORY >> SALES ORDER</Card.Header>
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
                                                    ITEM/SERVICE ITEM
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
                                                    SUMMARY TYPE
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

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            SALES EMPLOYEE
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
                                            TOTAL BEFORE DISCOUNT
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
                                                OWNER
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
                                                DISCOUNT
                                            </Form.Label>{/* 
                                            <Col sm="1">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col> */} {/* 
                                                <Form.Label style={{fontWeight : "bold"}}>
                                                %
                                                </Form.Label> */}
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
                                            FREIGHT
                                                <Button style={{fontSize:'11px', textDecoration: "none",}}
                                                    variant="link" onClick={()=>alert("test")}
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
                                                ROUNDING
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
                                                TAX
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
                                                TOTAL
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
                                             REMARKS
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
                                                        COPY TO
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
                                        WITH DOWNPAYMENT?
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
                                        WITH DOWNPAYMENT?
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
                                        PLATE NO:
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
                                        DRIVER:
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
                                        SEAL NO:
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
                                        HELPER:
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
                                        NATURE OF TRANSACTION:
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
                                        SPS CLEARANCE:
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
                                        COMMERCIAL INV:
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
                                        ORIGIN:
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
                                        PACKING SLIP:
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
                                        HEALTH CERTIFICATE:
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
                                        INSURANCE:
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
                                        BILL OF LADING:
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
                                        CONTAINER NUM:
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
                                        EXPORTED?:
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
                                        POS REF:
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
                                        STATUS:
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
                                        CHECK BY:
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
                                        RECEIVED BY:
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
                                        RETURN TO OA:
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
                                        CHECKED BY:
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
                                        APPROVED BY:
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
                                        ARRIVED IN PORT?:
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
                                        ITR TYPE:
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
                                        IT TYPE:
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
                                        DELIVERY TO STORE?:
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
                                        DOCUMENT ID:
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
                                        CONFIRMED:
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
                                        PULL OUT REASON:
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
                                        OUTLETS SM/WALTER OUTRIGHT:
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
