import {
    React,Component, BootstrapTable, Redirect,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, useState, Tabs, Tab
} 
from '../../noser-hris-component';

class GeneratePayrollFile extends Component {
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
            
            payPeriodListAutocomplete   :   [],
            clientListAutocomplete      :   [],
            bdoBatchNo	                :   "",
            mlBatchNo	                :   "",
            mbBatchNo	                :   "",
            bdoDataList	                :   [],
            metroBankDataList	        :   [],
            mlListData	                :   [],
            fileName	                :   [],
            payrollTypeId	            :   [],
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
                    clientListAutocomplete      :   res.data.clients ? res.data.clients     :   [],
                    isloading                   :   false
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
        if(e.length == 0) {
            this.state.selectedClientId     =   ""
            this.state.selectedClientName   =   ""
            return
        } 
        this.state.selectedClientId         =   e[0].id
        this.state.selectedClientName       =   e[0].name
        this.GetPayPeriodList()
    }
    
    GetPayPeriodList() {
        const periodListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId":"",
            "IsProcessed":"1"
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
            )
            .then(res => {
                const data = res.data;
                console.log("Get Payroll Periods")
                console.log(data.payrollPeriods)
                this.setState({payPeriodListAutocomplete: data.payrollPeriods})
                //console.log("data.employees list count: " + this.state.employeeList.length)
            })
    }


    onChangePayPeriod = (e) => {

        if(e.length == 0) {
            this.state.payPeriodSelectedId = ""
            this.state.selectedPayPeriodName = ""
            return
        } 

        this.state.payPeriodSelectedId = e[0].periodId
        this.state.selectedPayPeriodName = e[0].payPeriod
    }

    onChangeBDOBatchNo = (e) => {
        this.setState({
            bdoBatchNo	:   e.target.value
        })
    }

    onChangeMlBatchNo = (e) => {
        this.setState({
            mlBatchNo	:   e.target.value
        })
    }

    onChangeMbBatchNo = (e) => {
        this.setState({
            mbBatchNo	:   e.target.value
        })
    }

    handleClickGenerate = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"             :   "0.0.0.0",
            "ClientId"              :   this.state.selectedClientId,
            "UserId"                :   this.state.userinfo.userId,
            "PayPeriodId"           :   this.state.payPeriodSelectedId,
            "BDOBatchNumber"        :   this.state.bdoBatchNo,
            "MLBatchNumber"         :   this.state.mlBatchNo,
            "MetroBankBatchNumber"  :   this.state.mbBatchNo,
        }

        console.log("Submit Generate params")
        console.log(getParams)

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Accounting/ProcessPayrollFiles", getParams)
        .then(res => {
            const data = res.data
            console.log("Process Payroll Files")
            console.log(data)
            if(data.status=="1"){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Success!",
                    isshow          :   true,
                    color           :   "success",
                    message         :   data.message,
                    fade            :   true
                });
            }
            else{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   data.message,
                    fade            :   true
                })
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

    handleClickSearch = () => {
        this.setState({isloading:true})
        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "PayPeriodId"    :   this.state.payPeriodSelectedId,
        }

        console.log("Submit search params")
        console.log(getParams)

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Accounting/GetPayrollFiles", getParams)
        .then(res => {
            const data = res.data
            console.log("Get Payroll Files")
           /*  this.state.mlListData = data.payrollFilesML */
            console.log(data)
            let mlDataList = [];
            let mlDataLists = [];
            
            
            
            this.setState({
                bdoDataList         :   data.payrollFilesBDO,
                metroBankDataList   :   data.payrollFilesMetroBank,
                mlListData          :   data.payrollFilesML,
                isloading           :   false,
            })
            /* for(let j = 0; j < data.payrollFilesML[0].payrollFileDetails.length; j++){
                const obj = {
                    "payCardNumber" : data.payrollFilesML[0].payrollFileDetails[j].payCardNumber,
                }
                mlDataList.push(obj)
            }
            this.setState({
                mlListData : mlDataList
            }) */
            /* mlDataList.push(objList) */
            
            if(data.status=="1"){
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Success!",
                    isshow          :   true,
                    color           :   "success",
                    message         :   data.message,
                    fade            :   true
                });
            }
            else{
                this.setState({
                    isloading       :   false,
                    alerttype       :   "Error!",
                    isshow          :   true,
                    color           :   "danger",
                    message         :   data.message,
                    fade            :   true
                })
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

    downloadHandleClick = (row) =>{
        this.state.fileName        =   row.fileName
        this.state.payrollTypeId   =   row.payrollTypeId

        const getParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "PayrollTypeId" :   this.state.payrollTypeId,
            "FileName"      :   this.state.fileName
        }

        console.log("Start get params")
        console.log(getParams)
        console.log(" End get params")

        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Accounting/DownloadPayrollFile", getParams,{'responseType': 'blob'})
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.state.fileName);
            document.body.appendChild(link);
            link.click();
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

    render(){
        const columnBDO = [
            {
                text        :   'PayPeriod',
                editable    :   false,
                dataField   :   'payPeriod',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   "Client",
                editable    :   false,
                dataField   :   "client",
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   'Reference Number',
                editable    :   false,
                dataField   :   'referenceNumber',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   'Batch Number',
                editable    :   false,
                dataField   :   'batchNumber',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   "Transaction Date",
                editable    :   false,
                dataField   :   "txnDate",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Total Amount",
                editable    :   false,
                dataField   :   "totalTxnAmount",
                headerStyle: (colum, colIndex) => {
                    return {width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                text        :   "Total",
                editable    :   false,
                dataField   :   "totalTxn",
                headerStyle: (colum, colIndex) => {
                    return {width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                text        :   "Action",
                editable    :   false,
                dataField   :   "databasePkey",
                formatter   :   (cell, row, isSelect) => {
                    this.state.fileNameLinBDO = row.fileName
                    if (row)
                    return (
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link" onClick={e => this.downloadHandleClick(row)}
                        >{this.state.fileNameLinBDO}</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "5%" };
                }
            } ,
            
        ]

        const columnMetroBank = [
            {
                text        :   'PayPeriod',
                editable    :   false,
                dataField   :   'payPeriod',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   "Client",
                editable    :   false,
                dataField   :   "client",
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   'Reference Number',
                editable    :   false,
                dataField   :   'referenceNumber',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   'Batch Number',
                editable    :   false,
                dataField   :   'batchNumber',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   "Transaction Date",
                editable    :   false,
                dataField   :   "txnDate",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Total Amount",
                editable    :   false,
                dataField   :   "totalTxnAmount",
                headerStyle: (colum, colIndex) => {
                    return {width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                text        :   "Total",
                editable    :   false,
                dataField   :   "totalTxn",
                headerStyle: (colum, colIndex) => {
                    return {width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                text        :   "Action",
                editable    :   false,
                dataField   :   "databasePkey",
                formatter   :   (cell, row, isSelect) => {
                    this.state.fileNameLinkMetro = row.fileName
                    if (row)
                    return (
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link" onClick={e => this.downloadHandleClick(row)}
                        >{this.state.fileNameLinkMetro}</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "5%" };
                }
            },
            
        ]


        const columnML = [
            {
                text        :   'PayPeriod',
                editable    :   false,
                dataField   :   'payPeriod',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   "Client",
                editable    :   false,
                dataField   :   "client",
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   'Reference Number',
                editable    :   false,
                dataField   :   'referenceNumber',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   'Batch Number',
                editable    :   false,
                dataField   :   'batchNumber',
                headerStyle: (colum, colIndex) => {
                    return { width:'15%' }},
            },
            {
                text        :   "Transaction Date",
                editable    :   false,
                dataField   :   "txnDate",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Total Amount",
                editable    :   false,
                dataField   :   "totalTxnAmount",
                headerStyle: (colum, colIndex) => {
                    return {width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                text        :   "Total",
                editable    :   false,
                dataField   :   "totalTxn",
                headerStyle: (colum, colIndex) => {
                    return {width:'10%' }},
                style:{textAlign:'right'}
            },
            {
                text        :   "Action",
                editable    :   false,
                dataField   :   "databasePkey",
                formatter   :   (cell, row, isSelect) => {
                    this.state.fileNameLinkML = row.fileName
                    if (row)
                    return (
                        <Button style={{height:'16px',paddingTop:'0',marginTop:'-3px',fontSize:'11px'}}
                            variant="link" onClick={e => this.downloadHandleClick(row)}
                        >{this.state.fileNameLinkML}</Button>
                    );
                },
                headerStyle : () => {
                    return { width  : "5%" };
                }
            },
            
        ]


        const selectRowBDO = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToExpand: true,
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log("Start Row")
                console.log(row)
                console.log("End Row")
                this.setState({
                    fileName        :   row.fileName,
                    payrollTypeId   :   row.payrollTypeId,
                })
                this.state.bdoDataList.map(function(item,i){
                    if(item.id===row.id)
                    {
                        item.isDeleted = isSelect ? "1" : "0"
                        item.isModified = isSelect ? "1" : "0"
                    }
                })
            }
        };
        const selectRowMetrobank = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToExpand: true
        };
        const selectRowML = {
            mode: 'checkbox',
            hideSelectAll: true,
            clickToExpand: true
        };


        const columnBDOExpand = [
            {
                text        :   "Member Name",
                editable    :   false,
                dataField   :   "memberName",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Pay Card Number",
                editable    :   false,
                dataField   :   "payCardNumber",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Amount",
                editable    :   false,
                dataField   :   "amount",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
        ]

        const columnMetroBankExpand = [
            {
                text        :   "Member Name",
                editable    :   false,
                dataField   :   "memberName",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Pay Card Number",
                editable    :   false,
                dataField   :   "payCardNumber",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Amount",
                editable    :   false,
                dataField   :   "amount",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
        ]

        const columnMLExpand = [
            {
                text        :   "Member Name",
                editable    :   false,
                dataField   :   "memberName",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Sender Name",
                editable    :   false,
                dataField   :   "senderName",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Sender Address",
                editable    :   false,
                dataField   :   "senderAddress",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Sender Contact No",
                editable    :   false,
                dataField   :   "senderContactNo",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Receiver Name",
                editable    :   false,
                dataField   :   "receiverName",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Receiver Address",
                editable    :   false,
                dataField   :   "receiverAddress",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Receiver Contact No",
                editable    :   false,
                dataField   :   "receiverContactNo",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
            {
                text        :   "Amount",
                editable    :   false,
                dataField   :   "amount",
                headerStyle: (colum, colIndex) => {
                    return {width:'15%' }},
                
            },
        ]

        const expandBDORowDetails = {
            onlyOneExpanding: true,
            renderer: row => 
            (
                <BootstrapTable
                    keyField = "id"
                    data = { row.payrollFileDetails }
                    columns = { columnBDOExpand }
                    rowClasses="noser-table-row-class"
                    striped
                    hover
                    condensed
                    expandRow
                    wrapperClasses="table-responsive"
                    rowClasses="noser-table-row-class"
                    noDataIndication={ () => <div>No Payroll details.</div> }
                /> 
            ),
            showExpandColumn: true,
            
          };

          const expandMetroBankRowDetails = {
              onlyOneExpanding: true,
              renderer: row => 
              (
                  <BootstrapTable
                      keyField = "id"
                      data = { row.payrollFileDetails }
                      columns = { columnMetroBankExpand }
                      rowClasses="noser-table-row-class"
                      striped
                      hover
                      condensed
                      expandRow
                      wrapperClasses="table-responsive"
                      rowClasses="noser-table-row-class"
                      noDataIndication={ () => <div>No Payroll details.</div> }
                  /> 
              ),
              showExpandColumn: true,
              
            };

            const expandMLRowDetails = {
                onlyOneExpanding: true,
                renderer: row => 
                (
                    <BootstrapTable
                        keyField = "id"
                        data = { row.payrollFileDetails }
                        columns = { columnMLExpand }
                        rowClasses="noser-table-row-class"
                        striped
                        hover
                        condensed
                        expandRow
                        wrapperClasses="table-responsive"
                        rowClasses="noser-table-row-class"
                        noDataIndication={ () => <div>No Payroll details.</div> }
                    /> 
                ),
                showExpandColumn: true,
                
              };
        return(
            <div>
                <Banner/>

                <Container className="mt-5" fluid>
                    <Card>
                        <Card.Header>Payroll >> Generate Transfer File</Card.Header>
                        <Card.Body>
                            <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                <div className={this.state.color}></div> 
                                {this.state.message}
                            </Alert>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeClientList}
                                        options={this.state.clientListAutocomplete}
                                        placeholder="Select Client"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='payPeriod'
                                        id="basic-example"
                                        onChange={this.onChangePayPeriod}
                                        options={this.state.payPeriodListAutocomplete}
                                        placeholder="Select Pay Period"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} sm={4} controlId="formGridEmail">
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="bdoBatchNo"
                                        value={this.state.bdoBatchNo}
                                        placeholder="BDO Batch No"
                                        onChange={this.onChangeBDOBatchNo}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={4} controlId="formGridEmail">
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="mlBatchNo"
                                        value={this.state.mlBatchNo}
                                        placeholder="ML Batch No"
                                        onChange={this.onChangeMlBatchNo}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={4} controlId="formGridEmail">
                                    <Form.Control 
                                        type="text" 
                                        autoComplete="off" 
                                        name="mbBatchNo"
                                        value={this.state.mbBatchNo}
                                        placeholder="Metro Bank Batch No"
                                        onChange={this.onChangeMbBatchNo}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <ButtonToolbar className="mt-5" sm={12}>
                                <Button className="ml-auto" variant="success" onClick={this.handleClickSearch}>
                                    Search
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="success"  onClick={this.handleClickGenerate}>
                                    Generate
                                </Button>
                            </ButtonToolbar>

                            <Tabs className="mt-3" defaultActiveKey="default" transition={false} id="noanim-tab-example">
                                <Tab eventKey="default" title="BDO">
                                    <Form.Row>
                                        <Form.Group controlId="formGridPassword" as={Col}>
                                            <Card className="card-tab-no-border">
                                                <div className="card-header-tab"></div>
                                                <BootstrapTable
                                                    keyField = "id"
                                                    data = { this.state.bdoDataList }
                                                    columns = { columnBDO }
                                                    selectRow = { selectRowBDO }
                                                    striped
                                                    hover
                                                    condensed
                                                    expandRow={ expandBDORowDetails }
                                                />
                                            </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>

                                <Tab eventKey="metrobank" title="METROBANK">
                                    <Form.Row>
                                        <Form.Group controlId="formGridPassword" as={Col}>
                                            <Card className="card-tab-no-border">
                                                <div className="card-header-tab"></div>
                                                <BootstrapTable
                                                    keyField = "id"
                                                    data = { this.state.metroBankDataList }
                                                    columns = { columnMetroBank }
                                                    selectRow = { selectRowMetrobank }
                                                    striped
                                                    hover
                                                    condensed
                                                    expandRow={ expandMetroBankRowDetails }
                                                />
                                            </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>

                                <Tab eventKey="ml" title="ML">
                                    <Form.Row>
                                        <Form.Group controlId="formGridPassword" as={Col}>
                                            <Card className="card-tab-no-border">
                                                <div className="card-header-tab"></div>
                                                <BootstrapTable
                                                    keyField = "id"
                                                    data = { this.state.mlListData }
                                                    /* data = { this.state.mlListData } */
                                                    columns = { columnML }
                                                    selectRow = { selectRowML }
                                                    striped
                                                    hover
                                                    condensed
                                                    expandRow={ expandMLRowDetails }
                                                />
                                            </Card>
                                        </Form.Group>
                                    </Form.Row>
                                </Tab>
                            </Tabs>

                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}



export  default GeneratePayrollFile