import {
    React,Component, BootstrapTable, Redirect,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState, Tabs, Tab
} 
from '../../noser-hris-component';

import  ProcessBillingModal  from './BillingModal/ProcessBillingModal';
import  ViewBillingModal  from './BillingModal/ViewBillingModal';

class BillingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fade            :   true,
            color           :   "",
            isshow          :   false,
            message         :   "",
            userinfo        :   [],
            isloading       :   false,
            alerttype       :   "",
            loadingText     :   "",

            clientList                  :   [],
            unBilledDataList            :   [],
            billedDataList            :   [],
            viewBillingModalShow        :   false,
            processBillingModalShow     :   false,
            disableProcessButton  :   false,
        }
    }

    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getClientList();
    }

    getClientList(){
        this.setState({
            isloading   :   true
        })
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}

        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.userinfo.clientId,
            "UserId"        :   this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", getParams)
        .then(res => {
            sleep(1000).then(() => {
                this.setState({
                    clientList      :   res.data.clients ? res.data.clients     :   [],
                    isloading       :   false
                })
            })
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
    }

    onChangeClientList = (e) => {
        this.setState({isshow:false,message:"",color:"",alerttype:""})
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            this.state.selectedClientName   =   ""
            return
        } 
        this.state.selectedClientId         =   e[0].id
        this.state.selectedClientName       =   e[0].name
        this.GetUnbilledTransactions();
    }
    GetBilledTransactions() {
        this.setState({isloading:true,loadingText:"Loading billed transactions. . ."})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Billing/GetBilledTransactions", getParams)
        .then(res => {
            const data = res.data
            console.log(data)
            
            this.state.billedDataList = data.billedTransactions
            this.setState({isloading:false,loadingText:"Please wait . . ."})
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
    }
    GetUnbilledTransactions() {
        this.setState({loadingText:"Loading unbilled transactions. . ."})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Billing/GetUnbilledTransactions", getParams)
        .then(res => {
            const data = res.data
            console.log(data)
            
            //this.state.unBilledDataList = data.unbilledTransactions
            this.setState({unBilledDataList:data.unbilledTransactions,loadingText:"Please wait . . ."})
            this.GetBilledTransactions();
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
    }

    handleBillingProcess = (row) => {
        this.setState({isloading:true})

        const params = {
            "IpAddress"     : "0.0.0.0",
            "ClientId"      : row.clientId,
            "UserId"        : this.state.userinfo.userId,
            "PayPeriodId"   : row.payPeriodId,
            "LocationId"    : row.locationId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Billing/ProcessBilling", params)
        .then(res => {
            const data = res.data
            this.setState({
                //isloading   :   false,
                alerttype   :   data.status=="1" ? "Success! " : "Error! ",
                isshow      :   true,
                color       :   data.status=="1" ? "success" : "danger",
                message     :   data.message,
                fade        :   true
            })
            if(data.status=="1"){
                this.GetUnbilledTransactions();
            }
        })
        .catch(error=>{
            this.setState({
                isloading   :   false,
                alerttype   :   "Error!",
                isshow      :   true,
                color       :   "danger",
                message     :   "An error occured while processing your request, Please contact your System Administrator for : " + error.message,
                fade        :   true
            })
        })
    }

    handleViewSummary = (row) => {
        localStorage.setItem("vwSummary_" + this.state.userinfo.userId + this.state.userinfo.employeeId, JSON.stringify(row))
        this.setState({navigate: true})
    }
    
    handleModalClose = (e) =>{
        this.setState({
            viewBillingModalShow        :   false,
            processBillingModalShow     :   false,
        })
    }

    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/billingsummary" push={true} />;
        } 
        const columnUnBilled = [
            {
                text        :   "",
                editable    :   false,
                dataField   :   "databasePkey",
                formatter   :   (cell, row, isSelect) => {
                    let disabled = (row.billingType!="No billing rate" ? false : true);
                    let label = (row.billingNo!="" && row.billingNo!=null ? "Re-process" : "Process");
                    return (
                        <Button
                            style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link"
                            disabled={disabled}
                            onClick={e => this.handleBillingProcess(row)}
                        >Process</Button>
                    );
                },
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'5%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "",
                editable    :   false,
                dataField   :   "databasePkey",
                formatter   :   (cell, row, isSelect) => {
                    let disabled = (row.billingNo!="" && row.billingNo!=null ? false : true);
                    return (
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link"
                            onClick={e => this.handleViewSummary(row)}
                            disabled={disabled}
                        >View</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "5%" };
                }
            },
            {
                text        :   'Billing Number',
                editable    :   false,
                dataField   :   'billingNo',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'15%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Client / Branch / Area",
                editable    :   false,
                dataField   :   "location",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left'}
            },
            {
                text        :   "Billing Template",
                editable    :   false,
                dataField   :   "billingType",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'14%' }},
                style:{textAlign:'left'}
            },
            {
                text        :   'Payroll Date',
                editable    :   false,
                dataField   :   'date',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'14%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Period",
                editable    :   false,
                dataField   :   "period",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'14%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Pay Out Date",
                editable    :   false,
                dataField   :   "payoutDate",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'11%' }},
                style:{textAlign:'center'}
            }
        ]

        const columnBilled = [

            {
                text        :   "",
                editable    :   false,
                dataField   :   "databasePkey",
                formatter   :   (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link" onClick={e => this.handleViewSummary(row)}
                        >View</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "5%" };
                }
            } ,
            {
                text        :   'Date Billed',
                editable    :   false,
                dataField   :   'dateBilled',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'14%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Branch / Area",
                editable    :   false,
                dataField   :   "location",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'20%' }},
                style:{textAlign:'left'}
            },
            {
                text        :   'Billing Number',
                editable    :   false,
                dataField   :   'billingNo',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'15%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Service Invoice No.",
                editable    :   false,
                dataField   :   "invoiceNo",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Period",
                editable    :   false,
                dataField   :   "period",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Pay Out",
                editable    :   false,
                dataField   :   "payoutDate",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'12%' }},
                style:{textAlign:'center'}
            },
            {
                text        :   "Amount",
                editable    :   false,
                dataField   :   "amount",
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'10%' }},
                style:{textAlign:'right'}
            }
        ]
        const selectRow = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToExpand: true
        };
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                alert(e.row);
            
            }
        };
        
        return(
            <div>
                <Banner />
                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>Billing >> Billing Transactions</Card.Header>
                        <Card.Body>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Row>
                                <Form.Group as={Col} sm={12} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.clientList}
                                        placeholder="Select Client"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Tabs className="mt-2" defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                <Tab eventKey="default" title="Unbilled Payroll">
                                    <Form.Row>
                                        <Form.Group controlId="formGridPassword" as={Col}>
                                        <Card className="card-tab-no-border">
                                        <div className="card-header-tab" style={{height:'25px !important'}}></div>
                                        <BootstrapTable
                                                    keyField = "id"
                                                    data = { this.state.unBilledDataList }
                                                    columns = { columnUnBilled }
                                                    selectRow = { selectRow }
                                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                    rowClasses="noser-table-row-class"
                                                    striped
                                                    hover
                                                    condensed
                                                    pagination={ paginationFactory({sizePerPage:20,hideSizePerPage:true,hidePageListOnlyOnePage:true}) }
                                                    noDataIndication={ () => <div>No record found.</div> }
                                                />
                                        </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>

                                <Tab eventKey="billed" title="Billed Payroll">
                                    <Form.Row>
                                        <Form.Group controlId="formGridPassword" as={Col}>
                                            <Card className="card-tab-no-border">
                                                <div className="card-header-tab"></div>
                                                <BootstrapTable
                                                    keyField = "id"
                                                    data = { this.state.billedDataList }
                                                    columns = { columnBilled }
                                                    selectRow = { selectRow }
                                                    striped
                                                    hover
                                                    condensed
                                                    noDataIndication={ () => <div>No record found.</div> }
                                                    pagination={ paginationFactory({sizePerPage:20,hideSizePerPage:true,hidePageListOnlyOnePage:true}) }
                                                />
                                            </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Container>
                <NoserLoading show={this.state.isloading} text={this.state.loadingText}/>
                <div style={{height:'30px'}} >

                </div>
                <ProcessBillingModal
                    show={this.state.processBillingModalShow}
                    onHide={this.handleModalClose}
                    onRefProcessBilling={ref => (this.childProcessBilling = ref)}
                />

                <ViewBillingModal
                    show={this.state.viewBillingModalShow}
                    onHide={this.handleModalClose}
                    onRefViewBilling={ref => (this.childViewBilling = ref)}
                />

            </div>
        )

    }

}

export  default BillingScreen