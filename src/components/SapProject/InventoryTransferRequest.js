import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab, 
    Dropdown
} 
from '../../noser-hris-component';
import { ArrowRight } from 'react-bootstrap-icons';

import ListOfItems from './sapModal/ListOfItems'
import ListOfWarehouse from './sapModal/ListOfWarehouse';
import BusinessPartnerModal from './sapModal/BusinessPartnerModal';

 
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

            DataTmp:[],
            wareHouseData:[],
            BPName: "",
            Name:"",
            Warehouses:"",
            unknownData: "",
            modalListOfItems: false,
            modalListOfWarehouse: false,
            modalBusinessPartner: false,

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
        this.GetBusinessPartnerData()
        //this.GetListOfWarehouses()
    }

    GetBusinessPartnerData(){

    let filter_data = {}
    
    const getParams = {
        "_collection" : "BusinessPartner",
        "filter_data" : filter_data
        }
        axios
        .post("http://134.209.99.190:8088/action/get" , getParams)
        .then(res => {
        const data = res.data
        //console.log("Start SAP data")
        //console.log(data["BusinessPartner"])
        //console.log("End SAP data")
        const itemUsersDataLists = this.buildList(data["BusinessPartner"])
        let SapList =[]
        for (let i = 0; i < itemUsersDataLists.length; i++) {
            let obj = {
                'id'                :   itemUsersDataLists[i]['id'].replace(" '","").replace("'",""),
                'BPName'            :   itemUsersDataLists[i]['BPName'].replace(" '","").replace("'",""),
                'Name'              :   itemUsersDataLists[i]['Name'].replace(" '","").replace("'",""),
                'isDeleted'         :   itemUsersDataLists[i]['isDeleted'].replace(" '","").replace("'",""),
                'isModified'        :   itemUsersDataLists[i]['isModified'].replace(" '","").replace("'",""),
                'isDraft'           :   itemUsersDataLists[i]['isDraft'].replace(" '","").replace("'",""),
                'createdby'         :   itemUsersDataLists[i]['createdby'].replace(" '","").replace("'",""),
                'createddate'       :   itemUsersDataLists[i]['createddate'].replace(" '","").replace("'",""),
                'modifiedby'        :   itemUsersDataLists[i]['modifiedby'].replace(" '","").replace("'",""),
                'modifieddate'      :   itemUsersDataLists[i]['modifieddate'].replace(" '","").replace("'",""),
            }
            SapList.push(obj)
        }
        this.setState({DataTmp : SapList})
        })
        .catch(error=>{
            console.log("error: " + error)
        })
    }

    buildList = (data) => {

        let itemList =[]
        
        let idList                  =[]
        let businessPartnerList     =[]
        let NameList                =[]
        let isDeletedList           =[]
        let isModifiedList          =[]
        let isDraftList             =[]
        let createdbyList           =[]
        let createddateList         =[]
        let modifiedbyList          =[]
        let modifieddateList        =[]
    
        for (let i = 0; i < data.length; i++) {

            let s1 = data[i].split(",")
            let idClean = s1[0].replace("ObjectId(","").replace(")","").replace("{","")
            let modifiedClean = s1[8].replace("}","")
            idList.push(idClean.split(":")[1])
            businessPartnerList.push(s1[1].split(":")[1])
            NameList.push(s1[2].split(":")[1])
            isDeletedList.push(s1[3].split(":")[1])
            isModifiedList.push(s1[4].split(":")[1])
            isDraftList.push(s1[5].split(":")[1])
            createdbyList.push(s1[6].split(":")[1])
            createddateList.push(s1[7].split(":")[1])
            modifiedbyList.push(s1[8].split(":")[1])
            modifieddateList.push(modifiedClean.split(":")[1])

        }
        for (let i = 0; i < idList.length; i++) {
        //console.log("object")
            let obj = {
                "id"                :   idList[i],
                "BPName"            :   businessPartnerList[i],
                "Name"              :   NameList[i],
                "isDeleted"         :   isDeletedList[i],
                "isModified"        :   isModifiedList[i],
                "isDraft"           :   isDraftList[i],
                "createdby"         :   createdbyList[i],
                "createddate"       :   createddateList[i],
                "modifiedby"        :   modifiedbyList[i],
                "modifieddate"      :   modifieddateList[i],
            
            }
            itemList.push(obj)
        }
        return itemList
    };

   /*  GetListOfWarehouses(){  

        let filter_data = {}
    
        const getParams = {
        "_collection" : "ListOfWarehouses",
        "filter_data" : filter_data
        }
        axios
        .post("http://134.209.99.190:8088/action/get" , getParams)
        .then(res => {
        const dataTmp = res.data
        //console.log("Start ListOfWarehouses")
        //console.log(dataTmp["ListOfWarehouses"])
        //console.log("End ListOfWarehouses")
        const itemUsersDataListsTmp = this.buildList(dataTmp["ListOfWarehouses"])
        let warehousesTmp =[]
        for (let i = 0; i < itemUsersDataListsTmp.length; i++) {
            let obj = {
                'id'                :   itemUsersDataListsTmp[i]['id'].replace(" '","").replace("'",""),
                'Warehouses'        :   itemUsersDataListsTmp[i]['Warehouses'].replace(" '","").replace("'",""),
                'isDeleted'         :   itemUsersDataListsTmp[i]['isDeleted'].replace(" '","").replace("'",""),
                'isModified'        :   itemUsersDataListsTmp[i]['isModified'].replace(" '","").replace("'",""),
                'isDraft'           :   itemUsersDataListsTmp[i]['isDraft'].replace(" '","").replace("'",""),
                'createdby'         :   itemUsersDataListsTmp[i]['createdby'].replace(" '","").replace("'",""),
                'createddate'       :   itemUsersDataListsTmp[i]['createddate'].replace(" '","").replace("'",""),
                'modifiedby'        :   itemUsersDataListsTmp[i]['modifiedby'].replace(" '","").replace("'",""),
                'modifieddate'      :   itemUsersDataListsTmp[i]['modifieddate'].replace(" '","").replace("'",""),
            }
            warehousesTmp.push(obj)
        }
        this.setState({wareHouseData : warehousesTmp})
        //console.log("wareHouseData")
        //console.log(this.state.wareHouseData)
        })
        .catch(error=>{
            console.log("error: " + error)
        })
    }
    
    buildList = (dataTmp) => {

        let itemList =[]
        
        let idList                  =[]
        let WarehousesList          =[]
        let isDeletedList           =[]
        let isModifiedList          =[]
        let isDraftList             =[]
        let createdbyList           =[]
        let createddateList         =[]
        let modifiedbyList          =[]
        let modifieddateList        =[]
        
    
        for (let i = 0; i < dataTmp.length; i++) {
            let s1 = dataTmp[i].split(",")
            let idClean = s1[0].replace("ObjectId(","").replace(")","").replace("{","")
            let modifiedClean = s1[8].replace("}","")
            idList.push(idClean.split(":")[1])
            WarehousesList.push(s1[1].split(":")[1])
            isDeletedList.push(s1[2].split(":")[1])
            isModifiedList.push(s1[3].split(":")[1])
            isDraftList.push(s1[4].split(":")[1])
            createdbyList.push(s1[5].split(":")[1])
            createddateList.push(s1[6].split(":")[1])
            modifiedbyList.push(s1[7].split(":")[1])
            modifieddateList.push(modifiedClean.split(":")[1])
        }
        for (let i = 0; i < idList.length; i++) {
        //console.log("object")
            let obj = {
                "id"                :   idList[i],
                "Warehouses"        :   WarehousesList[i],
                "isDeleted"         :   isDeletedList[i],
                "isModified"        :   isModifiedList[i],
                "isDraft"           :   isDraftList[i],
                "createdby"         :   createdbyList[i],
                "createddate"       :   createddateList[i],
                "modifiedby"        :   modifiedbyList[i],
                "modifieddate"      :   modifieddateList[i],
            
            }
            itemList.push(obj)
        }
        return itemList
    }  */ 

    onChangeBusinessPartner= (e) =>{
        if(e.length == 0){
            this.businessPartner = ""
            return
        }
       this.state.BPName = e[0].businessPartner
       //this.onChangeName();
       
       //console.log(this.state.businessPartner + " :businessPartner")
    }

    onChangeName= (e) =>{
        /* if(e.length == 0){
            this.Name = ""
            return
        }
       this.state.Name = e[0].Name */
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

    handleShowBusiPartner = ()=>{
        this.setState({
            modalBusinessPartner:   true
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

    handleModalBusiPArt = (e) =>{
        this.setState({
            modalBusinessPartner: false,
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
                                <Card.Header style={{background : "#ababac"}}>Inventory >> Transfer Request</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>   

                                        <Form.Group className="mt-4" as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Business Partner
                                            </Form.Label>
                                            <Col sm="1">
                                                <Button style={{fontSize:'11px', textDecoration: "none"}}
                                                    variant="link" onClick={this.handleShowBusiPartner}> 
                                                    <ArrowRight style={{color: "#f4d56e" }} size={20}/> <span style={{color: "#000000" }}></span> 
                                                </Button>
                                            </Col>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='BPName'
                                                    id="basic-example"
                                                    onChange={this.onChangeBusinessPartner}
                                                    options={this.state.DataTmp}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                No.
                                            </Form.Label>
                                            <Col sm="1">
                                                <Form.Control 
                                                    ref="employeeNo"
                                                    name="employeeNo"
                                                    value={this.state.employeeNo}
                                                    onChange={this.onChangeEmployeeNo}
                                                    autoComplete="off"
                                                    readOnly
                                                    placeholder="Primary"
                                                />
                                            </Col>
                                            <Col sm="3">
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
                                                Name
                                            </Form.Label>
                                            <Col sm="1">
                                            </Col>
                                            <Col sm="3">
                                                <Form.Control  
                                                    labelKey='Name'
                                                    id="basic-example"
                                                    onChange={this.onChangeName}
                                                    value={this.state.employeeNo}
                                                    //options={this.state.unknownData}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Status
                                            </Form.Label>
                                            <Col sm="3">
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
                                                Contact Person
                                            </Form.Label>
                                            <Col sm="1">
                                            </Col>
                                            <Col sm="3">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Posting Date
                                            </Form.Label>
                                            <Col sm="3">
                                                <DatePicker
                                                    ref='postingDate'
                                                    selected={this.state.postingDate}
                                                    onChange={this.handleChangePostingDate}
                                                    minDate={this.minDate}
                                                    value={this.props.postingDate}
                                                    dateFormat={"MM/dd/yyyy"}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                Ship To
                                            </Form.Label>
                                            <Col sm="1">
                                            </Col>
                                            <Col sm="3">
                                                <Form.Control as="select">
                                                    <option>select ship to </option>
                                                    <option>Caloocan City</option>
                                                    <option>Quezon City</option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Due Date
                                            </Form.Label>
                                            <Col sm="3">
                                                <DatePicker
                                                    ref='documentDate'
                                                    selected={this.state.documentDate}
                                                    onChange={this.handleChangeDocumentDate}
                                                    minDate={this.minDate}
                                                    value={this.props.documentDate}
                                                    dateFormat={"MM/dd/yyyy"}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            {/* <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                SHIP TO
                                            </Form.Label> */}
                                            <Col sm="2">
                                            </Col>
                                            <Col sm="3">
                                               {/*  <Form.Control as="select">
                                                    <option>select ship to </option>
                                                    <option>Caloocan City</option>
                                                    <option>Quezon City</option>
                                                </Form.Control> */}
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Document Date
                                            </Form.Label>
                                            <Col sm="3">
                                                <DatePicker
                                                    ref='documentDate'
                                                    selected={this.state.documentDate}
                                                    onChange={this.handleChangeDocumentDate}
                                                    minDate={this.minDate}
                                                    value={this.props.documentDate}
                                                    dateFormat={"MM/dd/yyyy"}
                                                    className="form-control"
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Referenced Document
                                            </Form.Label>
                                            <Col sm="3">
                                            <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleEmpAdd}>
                                                ...
                                            </Button>
                                            </Col>
                                        </Form.Group>
                                        <div style={{height: "70px"}}></div>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                From Warehouse
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='whse'
                                                    id="basic-example"
                                                    onChange={this.onChangeWarehouses}
                                                    options={Warehouses}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                To Warehouse
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead
                                                    labelKey='whse'
                                                    id="basic-example"
                                                    onChange={this.onChangeWarehouses}
                                                    options={Warehouses}
                                                    autoComplete="off"
                                                    readOnly
                                                    //value={this.state.Warehouses}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group className="mt-3" as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Price List
                                            </Form.Label>
                                            <Col sm="1">
                                            </Col>
                                            <Col sm="3">
                                                <Form.Control as="select">
                                                    <option>select price list</option>
                                                    <option>Last Purchase Price</option>
                                                </Form.Control>
                                            </Col> 
                                        </Form.Group>
                                        <Card  className="mt-5" style={{background : "#f0fff9"}}>
                                            <Card.Body>
                                                <Tabs defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                                    <Tab eventKey="default" title="Contents">
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
                                                    <Tab eventKey="sttachments" title="Attachments">

                                                    </Tab>
                                                </Tabs>
                                            </Card.Body>
                                        </Card>

                                        <Form.Group className="mt-5" as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Sales Employee
                                            </Form.Label>
                                            <Col sm="3">
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                    placeholder="-No Sales Employee-"
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Pick And Pack Remarks
                                            </Form.Label>
                                            <Col sm="4">
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
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            Journal Remarks
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
                                            Remarks
                                            </Form.Label>
                                            <Col sm="4">
                                                <Form.Control 
                                                    as="textarea"
                                                    rows={3}
                                                    name="instructions"
                                                    value={this.state.instructions}
                                                />
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
                                                <ButtonToolbar>
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
                                                    &nbsp;&nbsp;
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleNextClick}>Inventory Transfer</Button>
                                                </ButtonToolbar>
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
                                        Nature Of Transaction:
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
                                        Receive By:
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
                                            <Form.Control as="select"> 
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
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
                                            <Form.Control as="select">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
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
                                            <Form.Control as="select">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
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
                                            <Form.Control as="select">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </Form.Control>
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
                <BusinessPartnerModal
                    show={this.state.modalBusinessPartner}
                    onHide={this.handleModalBusiPArt}
                />
            </div> 
        )
    }

}

export  default InventoryTransferRequest
