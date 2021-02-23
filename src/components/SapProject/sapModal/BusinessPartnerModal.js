import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props, sizePerPageRenderer
} 
from '../../../noser-hris-component';

import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';



class BusinessPartnerModal extends Component {
    constructor(props) {
        super(props)
        this.state ={
            userinfo        :   [],
            
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            trainingRegisterTableList : [],
            unKnownData     :   [],
            sapData         :   [],
            ItemDiscription :   "",
            ItemNo          :   "",
            Tax             :   "",
            SalesTaxDefinition  :   "",
            businessPartnerData : "",
        }
    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetBusinessPartnerData();
    }

    onModalClose = () => {
        this.props.onHide("Hello Parent! It's your turn parent");            
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
            this.setState({businessPartnerData : SapList})
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

    render() {
        const { ExportCSVButton } = CSVExport;
        
        const businessPartnerDataColumn = [
            {
                dataField   : 'BPName',
                text        : 'BP Name',
                //sort        : true,
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },
            {
                dataField: 'Name',
                text: 'BP Name',
                headerStyle : () => {
                    return { width  : "50%" };
                }
            },/* 
            {
                dataField   : 'Tax',
                text        : 'Tax',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'SalesTaxDefinition',
                text        : 'Sales Tax Definition',
                headerStyle : () => {
                    return { width  : "40%" };
                }
            }, */
        ]
        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.sapData.map(function(item,i){
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
        
            <Modal
                {...this.props}
                return
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                className="modal-90w"
                 >
                <Modal.Header closeButton/*  className="card-header" */style={{background : "#ababac"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                       List Of Business Partner
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2" style={{fontWeight : "bold"}}>
                                    Find
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control 
                                        type=""
                                        name=""
                                        value={this.state.unKnownData}
                                        onChange={this.onChangePosition} 
                                        autoComplete="off"
                                        backgroundColor="#f4d56e"
                                    />
                                </Col>
                                <Col sm="4">
                                </Col>
                            </Form.Group>
                                    <BootstrapTable
                                        /* caption={Noser.TableHeader({title:"RECORD"})} */
                                        keyField = "id"
                                        data = { this.state.businessPartnerData }
                                        columns = { businessPartnerDataColumn }
                                        //pagination={ paginationFactory({sizePerPageRenderer}) }
                                        striped
                                        hover
                                        condensed
                                        noDataIndication={ () => <div>No record found.</div> }
                                        //defaultSorted={ defaultSorted }
    
                                    />
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar className="mr-auto">
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>Choose</Button>&nbsp;&nbsp;
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>New</Button>&nbsp;&nbsp;
                        <Button style={{minWidth:'60px', backgroundColor: "#f4d56e", color: "#000000", border: "1px solid #000000"}} onClick={this.onModalClose}>Cancel</Button>
                    </ButtonToolbar>
                </Modal.Footer>
                <NoserLoading show={this.state.isloading} />
            </Modal>
        );
    }

}
export  default BusinessPartnerModal