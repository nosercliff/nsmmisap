import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker, Tabs, Tab
} 
from '../../noser-hris-component';
import { ArrowRight } from 'react-bootstrap-icons';

import ListOfItems from './sapModal/ListOfItems'
import ListOfWarehouse from './sapModal/ListOfWarehouse';

 
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
                { "id" : "1", "idNo" : "1",     "itemNo" : "PO0018",    "itemDesc" : "Liver",           "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026",  "qtyInWhse" : "11,704.6",   "Actual kg" : "1,000", "uomCode" : "KG", "uomName" : "KG",  "distRule" : "", "qtyInventoryUom" : "1,000",   "qtyInWhse" : "11,704.6",   "alreadySave" : "0",  },
                { "id" : "2", "idNo" : "2",     "itemNo" : "PO0040",    "itemDesc" : "Entrails(set)",   "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "qtyInWhse" : "",   "Actual kg" : "1,000", "uomCode" : "KG", "uomName" : "KG",  "distRule" : "", "qtyInventoryUom" : "1,000",   "qtyInWhse" : "",           "alreadySave" : "0",  },
                { "id" : "3", "idNo" : "3",     "itemNo" : "PO0036",    "itemDesc" : "Ear",             "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "qtyinwhse" : "5,508.089",   "Actual kg" : "1,000", "uomCode" : "KG", "uomName" : "KG",  "distRule" : "", "qtyInventoryUom" : "1,000",   "qtyInWhse" : "5,508.089",  "alreadySave" : "0",  },
                { "id" : "4", "idNo" : "4",     "itemNo" : "",          "itemDesc" : "",               "fromWarehouse" : "WHS0001", "toWarehouse" : "WHS0026", "qtyinwhse" : "",        "Actual kg" : "", "uomCode" : "", "uomName" : "",        "distRule" : "", "qtyInventoryUom" : "",        "qtyInWhse" : "",           "alreadySave" : "0",  },
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
                'businessPartner'   :   itemUsersDataLists[i]['businessPartner'].replace(" '","").replace("'",""),
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
                "businessPartner"   :   businessPartnerList[i],
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
                dataField   : 'qtyInWhse',
                text        : 'Qty in Whse',
                editable : false,
            },
            {
                dataField   : 'Actual kg',
                text        : 'Actual KG',
                editable : false,
            },
            {
                dataField   : '',
                text        : 'Inventory UoM',
                editable : false,
            },
            {
                dataField   : 'uomName',
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
                dataField   : 'alreadySave',
                text        : 'Already Save',
                editable : false,
            },

            {
                dataField   : '',
                text        : 'BOX/PC Qty',
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
                                <Card.Header style={{background : "#ababac"}}>INVENTORY >> TRANSFER</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                            <div className={this.state.color}></div> 
                                            {this.state.message}
                                        </Alert>   

                                        <Form.Group className="mt-4" as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                BUSINESS PARTNER
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
                                            <Form.Label column sm="1" style={{fontWeight : "bold"}}>
                                                NO.
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
                                                NAME
                                            </Form.Label>
                                            <Col sm="3">
                                                <Typeahead 
                                                    labelKey='Name'
                                                    id="basic-example"
                                                    onChange={this.onChangeName}
                                                    options={this.state.DataTmp}
                                                    autoComplete="off"
                                                    readOnly
                                                />
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                STATUS
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
                                                CONTACT PERSON
                                            </Form.Label>
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
                                            POSTING DATE
                                            </Form.Label>
                                            <Col sm="4">
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
                                                SHIP TO
                                            </Form.Label>
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
                                            DOCUMENT DATE
                                            </Form.Label>
                                            <Col sm="4">
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
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            REFERENCED DOCUMENT
                                            </Form.Label>
                                            <Col sm="4">
                                            <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleEmpAdd}>
                                                ...
                                            </Button>
                                            </Col>
                                        </Form.Group>
                                        <div style={{height: "70px"}}></div>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Col sm="6">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                FROM WAREHOUSE
                                            </Form.Label>
                                            <Col sm="4">
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
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                TO WAREHOUSE
                                            </Form.Label>
                                            <Col sm="4">
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
                                            PRICE LIST
                                            </Form.Label>
                                            <Col sm="3">
                                                <Form.Control as="select">
                                                    <option>select price list</option>
                                                    <option>Last Purchase Price</option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="1">
                                            </Col>
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                                TO BIN LOCATION
                                            </Form.Label>
                                            <Col sm="4">
                                                {/* <Typeahead
                                                    labelKey='whse'
                                                    id="basic-example"
                                                    onChange={this.onChangeWarehouses}
                                                    options={Warehouses}
                                                    autoComplete="off"
                                                    readOnly
                                                    //value={this.state.Warehouses}
                                                /> */}
                                                <Form.Control 
                                                    ref="name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    autoComplete="off"
                                                />
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
                                            SALES EMPLOYEE
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
                                            </Form.Label>
                                            <Col sm="4">
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                            JOURNAL REMARKS
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
                                            REMARKS
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
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handlePrevClick}>Add</Button>
                                                    &nbsp;&nbsp;
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handleNextClick}>Cancel</Button>
                                                </ButtonToolbar>
                                            </Col>
                                            <Col sm="2">
                                                <ButtonToolbar>
                                                    <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.handlePrevClick}>Copy From</Button>
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
                                        EXPORTED?:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control 
                                                ref="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChangeName}
                                                autoComplete="off"
                                                placeholder="0"
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
                                        RECIEVED BY?:
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
                                        RETURN TO OA?:
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
                                        ARRIVED IN PORT:
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
                                            <Form.Control as="select">
                                                <option></option>
                                                <option></option>
                                            </Form.Control>
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
                                        CONFIRMED?:
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
                                            <Form.Control as="select">
                                                <option></option>
                                                <option></option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="5" style={{fontWeight : "bold"}}>
                                        OUTLETS SM/ WALTER OUTRIGHT:
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

export  default InventoryTransfer
