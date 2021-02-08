import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
class ComputedDTR extends Component {
    constructor() {
        super()
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,


            billableDTRList         :   [],
            billableSummariesList   :   [],
            PayPeriodSelected       :   "",
            employeeSelected        :   "",
            employeeSelectedId      :   "",
            clientSelected          :   "",
            clientSelectedId        :   "",
            payPeriodList           :   [],
            payPeriodSelected       :   "",
            payPeriodSelectedId     :   "",
            employeeList            :   [],
            elementGridList         :   [],
            BillableListselected    :   [],
            isGridDataChanged       :   false,
            clientList              :   [],
            loadingText             :   '',
            isDisable               :   true,
            breaktimeLists          :   [],
            disableExport           :   true,
            employeeNo              :   ''
        }
    }


    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true,loadingText:"Loading client list..."})
        //this.GetBillableEmployeeDTR()  
        this.getClientList()
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }

    GetBillableEmployeeDTR() {

        //alert("GetBillableEmployeeDTR : this.state.payPeriodSelectedId : " + this.state.payPeriodSelectedId + " / " + "this.state.employeeSelectedId : " + this.state.employeeSelectedId)
        this.setState({isloading:true})
        const bedtrParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "PayPeriodId"   :   this.state.payPeriodSelectedId,
            "EmployeeId"    :   this.state.employeeSelectedId
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetBillableEmployeeDTR",  bedtrParams
            )
            .then(res => {
                const data = res.data;
                console.log("data billable dtr")
                //console.log(data)
                console.log(data.billableDTR)
                ////console.log(data.billableSummaries)
                this.setState({
                    billableDTRList         :   data.billableDTR,
                    billableSummariesList   :   data.billableSummaries
                })
                //this.LoadElementGridList(data.billableSummaries)
                if(data.status=="1"){
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true,
                        disableExport:  false
                    });
                }else{
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true,
                        disableExport:  true
                    });
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


        
        ////console.log("LoadElementGridList")
        ////console.log(this.state.elementGridList)
    }

    LoadElementGridList(paramList) {
        let elementTempList = []
        if (paramList.length > 0) {
            for (let i = 0; i < paramList.length; i++)
            {
                let elementObj = {
                    percentage  :   paramList[i]["percentage"], 
                    ecode       :   paramList[i]["code"], 
                    evalue      :   paramList[i]["value"]}   

                elementTempList.push(elementObj)
            }
            this.setState({
                elementGridList  :   elementTempList
            })
            ////console.log("this.state.elementGridList")
            ////console.log(this.state.elementGridList)
        }
        

        /*
        let elementObj = {percentage: "100.00%", ecode: "MH", evalue: ""}
        elementTempList.push(elementObj)
        elementObj = {percentage: "10.00%", ecode: "ND", evalue: ""}
        elementTempList.push(elementObj)
        elementObj = {percentage: "125.00%", ecode: "OT", evalue: "14.38"}
        elementTempList.push(elementObj)
        //console.log("elementTempList")
        //console.log(elementTempList)
        */
        
    }

    GetEmployeeList(clientID) {
        this.setState({
            isloading   :   true
        })
        const employeeListParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   clientID,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeNo"    :   ""
         };
         //console.log("employeeListParams")
         //console.log(employeeListParams)
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Employee/GetEmployees",  employeeListParams
             )
             .then(res => {
                const data = res.data;
                //console.log("data.employees")
                if (data.employees.length > 0 || data.employees != null) {
                    //console.log(data.employees)
                    this.setState({
                        employeeList    :   data.employees,
                        isloading       :   false
                    })
                    //console.log("data.employees list count: " + this.state.employeeList.length)
                } else {
                    //console.log("No Employees")
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

    
    GetPayPeriodList() {
        this.setState({isloading:true})
        const periodListParams = {
            "IpAddress"     :   "0.0.0.0",
            "ClientId"      :   this.state.selectedClientId,
            "UserId"        :   this.state.userinfo.userId,
            "EmployeeId"    :   this.state.employeeSelectedId ? this.state.employeeSelectedId : "",
            "IsProcessed"   :   ""
         };
         console.log("Get Payroll Periods")
         console.log(periodListParams)
 
         axios
             .post(
                 AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetPayrollPeriods",  periodListParams
             )
             .then(res => {
                const data = res.data;
                //console.log("Get Payroll Periods")
                //console.log(data.payrollPeriods)
                this.setState({
                    payPeriodList   :   data.payrollPeriods,
                    isloading       :   false
                })
                ////console.log("data.employees list count: " + this.state.employeeList.length)
             })
    }

    onChangeEmployeeName = (e) => {
        if(e.length == 0) {
            this.setState({isDisable:true,employeeSelected:"",employeeSelectedId:"", employeeNo:""})
            return
        } else {
            this.state.employeeSelectedId   =   e[0].id
            this.state.employeeSelected     =   e[0].employeeName
            this.state.employeeNo           =   e[0].employeeNo.toString().replace('-','')
        }

        this.GetPayPeriodList()
        this.setState({
            isshow  :   false,
        })
    }

    onChangeClientList = (e) => {
        if(e.length == 0) {
            this.setState({isDisable:true,clientSelected:"",clientSelectedId:""})
            return
        } else {
            this.state.selectedClientId     =   e[0].id
            this.state.selectedClientName   =   e[0].name
            this.GetEmployeeList(e[0].id)
        }
        this.GetPayPeriodList();
        this.setState({
            isshow  :   false,
        })
    }

    onChangePayPeriod = (e) => {

        if(e.length == 0) {
            this.setState({isDisable:true,payPeriodSelected:"",payPeriodSelectedId:""})
            return
        }

        this.state.payPeriodSelectedId      =   e[0].periodId
        this.state.payPeriodSelected        =   e[0].payPeriod
        this.state.isDisable                =   e[0].isProcessed=="1" ? true : false 
        //console.log("payPeriodSelectedId : " + this.state.payPeriodSelectedId)
        //console.log("payPeriodSelected : " + this.state.payPeriodSelected)
        this.setState({
            isshow  :   false,
        })
    }

    handleSearchClick = event => {
        this.GetBillableEmployeeDTR();        
    }

    GridDataModified(oldValue, newValue, id, column) {
        //console.log("GridDataModified id: " + id)
        
        this.state.billableDTRList.map(function(item,i){
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
            })

        //console.log("Edited billableDTRList")
        //console.log(this.state.billableDTRList)
        
    }

    handleReComputeClick = event => {
        this.ReComputeBillableDTR()
    }

    handleFinalizedClick = event => {
        this.FinalizedBillableDTR()
    }

    handleReturnedClick = event => {
        this.ReturnBillableDTR()
    }

    ReComputeBillableDTR() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.setState({isloading:true,})
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.employeeSelected){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        if(!this.state.payPeriodSelected){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select pay period",
                fade            :   true
            })
            return
        }
        let newBillableDTRList  = []     
        
        for (let i = 0; i < this.state.billableDTRList.length; i++) {
            if (this.state.billableDTRList[i]["isModified"] == 1) {
                let obj = this.state.billableDTRList[i]
                newBillableDTRList.push(obj);
            } 
        }
        console.log("newBillableDTRList")
        console.log(newBillableDTRList)
        const billableDTRListParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "BillableDTR": newBillableDTRList
         };
 
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/EditBillableEmployeeDTR",  billableDTRListParams
            )
            .then(res => {
            const data = res.data;
            var alertType = (data.status=="1") ? "success" : "danger"
            this.GetBillableEmployeeDTR();
            if(data.status=="1")
            {
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Success!",
                    isshow      :   true,
                    color       :   "success",
                    message     :   data.message,
                    fade        :   true
                });
            }
            else{
                this.setState({
                    isloading   :   false,
                    alerttype   :   "Error!",
                    isshow      :   true,
                    color       :   "danger",
                    message     :   data.message,
                    fade        :   true
                });
            }
            /* //console.log("data.newBillableDTRList")
            //console.log(data)
            this.GetBillableEmployeeDTR();
            this.setState({employeeList: data.employees}) */
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

    getClientList(){
        this.setState({isloading:true})
        const clientParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
        axios
        .post(AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
        .then(res => {
            this.setState(
                {
                    isloading:false,
                    clientList : res.data.clients ? res.data.clients : []                     

                });
                //console.log("Clients")
                //console.log(res.data.clients)
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

    FinalizedBillableDTR() {
        this.setState({isloading:true})
        /* alert("FinalizedBillableDTR") */
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.employeeSelected){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        if(!this.state.payPeriodSelected){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select pay period",
                fade            :   true
            })
            return
        }
        const finalizedBillableDTRParams = {
            "IpAddress":"0.0.0.0",
            "ClientId": this.state.selectedClientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.state.employeeSelectedId,
            "PayPeriodId": this.state.payPeriodSelectedId,
            "ApproverId": this.state.userinfo.userId,
            "Status":"6"
         };
         ////console.log("finalizedBillableDTRParams")
         ////console.log(finalizedBillableDTRParams)

         
         
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/ApprovedReturnEmployeeDTR",  finalizedBillableDTRParams
            )
            .then(res => {
                const data = res.data;
                //console.log("data.newBillableDTRList")
                //console.log(data)
                this.GetBillableEmployeeDTR();
                if(data.status=="1")
                {
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
                    });
                }
                else{
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
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

    ReturnBillableDTR() {
        this.setState({isloading:true})
        if(!this.state.selectedClientName){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select client",
                fade            :   true
            })
            return
        }
        if(!this.state.employeeSelected){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select employee",
                fade            :   true
            })
            return
        }
        if(!this.state.payPeriodSelected){
            this.setState({
                isloading       :   false,
                alerttype       :   "Warning!",
                isshow          :   true,
                color           :   "warning",
                message         :   "Please select pay period",
                fade            :   true
            })
            return
        }
        const finalizedBillableDTRParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
            "EmployeeId": this.state.employeeSelectedId,
            "PayPeriodId": this.state.payPeriodSelectedId,
            "ApproverId": "35001",
            "Status":"5"
         };
        
         
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Timekeeping/ApprovedReturnEmployeeDTR",  finalizedBillableDTRParams
            )
            .then(res => {
                const data = res.data;
                console.log("data.newBillableDTRList")
                console.log(data)
                this.GetBillableEmployeeDTR();
                if(data.status=="1")
                {
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Success!",
                        isshow      :   true,
                        color       :   "success",
                        message     :   data.message,
                        fade        :   true
                    });
                }
                else{
                    this.setState({
                        isloading   :   false,
                        alerttype   :   "Error!",
                        isshow      :   true,
                        color       :   "danger",
                        message     :   data.message,
                        fade        :   true
                    });
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
    
    render() {
        
        const mainGridColumns = [
            { dataField: 'month', text: 'MONTH', editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'day', text: 'DAY', editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'location', 
                text: 'LOCATION', 
                editable: true, 
                style:  { 
                    'white-space' : 'nowrap',
                    'width' : '600px'
                },
                editable: false,
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'firstBreakId', 
                text: '1ST BREAK',
                formatter: (cell, row) => {
                    console.log(row.breaktimeLists)
                    console.log(row.firstBreakId)
                    if(row.firstBreakId!='' && row.firstBreakId!=null){
                        return row.breaktimeLists.find(x => x.value == cell).label;
                    }
                  },
                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, { row, column }) => {
                        return row.breaktimeLists
                    }
                },
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:  { 
                    'white-space' : 'nowrap'
                },
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'secondBreakId', 
                text: '2ND BREAK',
                formatter: (cell, row) => {
                    if(row.secondBreakId!='' && row.secondBreakId!=null){
                        return row.breaktimeLists.find(x => x.value == cell).label;
                    }
                  },
                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, { row, column }) => {
                        return row.breaktimeLists
                    }
                },
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:  { 
                    'white-space' : 'nowrap'
                },
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'thirdBreakId', 
                text: '3RD BREAK',
                formatter: (cell, row) => {
                    console.log(row.breaktimeLists)
                    console.log(row.thirdBreakId)
                    if(row.thirdBreakId!='' && row.thirdBreakId!=null){
                        return row.breaktimeLists.find(x => x.value == cell).label;
                    }
                  },
                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, { row, column }) => {
                        return row.breaktimeLists
                    }
                },
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:  { 
                    'white-space' : 'nowrap'
                },
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'scheduleTimeIn', 
                text: 'SCHEDULE IN', 
                editable: false,
                editor: {
                    type: Type.Date
                },
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'schedultTimeOut', 
                text: 'SCHEDULE OUT', 
                editable: false,
                editor: {
                    type: Type.Date
                },
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { 
                dataField: 'tagType', 
                text: 'TAG TYPES',
                style:  { 'white-space' : 'nowrap' },
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}}
            },
            { dataField: 'timeIn', text: 'TIME IN',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'firstBreakOut', text: '1ST BREAK OUT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'firstBreakIn', text: '1ST BREAK IN',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'secondBreakOut', text: '2ND BREAK OUT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'secondBreakIn', text: '2ND BREAK IN',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'thirdBreakOut', text: '3RD BREAK OUT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'thirdBreakIn', text: '3RD BREAK IN',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'timeOut', text: 'TIME OUT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'regHrDuty', text: 'HRS DUTY',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'right'}
            },
            { dataField: 'overtimeIn', text: 'REG OT IN',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'overtimeOut', text: 'REG OT OUT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'},
                csvFormatter: col => (col==null ? "" : col),
            },
            { dataField: 'regOTHr', text: 'REG OT HRS',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'right'}
            },
            { dataField: 'nightDiff', text: 'ND',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'right'}
            },
            { dataField: 'nightDiffOT', text: 'NDOT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'right'}
            },
            { 
                dataField: 'remarks', 
                text: 'REMARKS',
                style:  { 
                            'white-space' : 'nowrap',
                            'width' : '600px'
                        },
                csvFormatter: col => (col==null ? "" : col),
            }
        ]
        const elementGridColumns = [
            { dataField: 'percentage', text: '%', editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'center'}
            },
            { dataField: 'code', text: 'CODE', editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left'}},
                style:{textAlign:'left'}
            },
            { dataField: 'value', text: 'VALUE', editable: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center'}},
                style:{textAlign:'right'}
            }
        ]
        
        const selectRow = {
            mode: 'checkbox',
            style:{backgroundColor:'yellow', color:'#000'},
            //clickToSelect: true,
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.billableDTRList.map(function(item,i){
                    if(item.id===row.id){
                        item.isModified = isSelect ? "1" : "0"
                    }
                })

            }
        };
        const rowStyle = (row, rowIndex) => {
            if(row.tagType=="ABSENT" || row.tagType=="LEAVE" || row.tagType=="LWOP")
                return { backgroundColor : '#FFE156', color:'#000'};
            else if(row.tagType=="LHOL" || row.tagType=="SHOL" || 
                    row.tagType=="DOUBLE LEGAL" || row.tagType=="DOUBLE HOLIDAY")
                return { backgroundColor : '#3B5998', color:'#FFF'};
            else if(row.tagType=="DAY OFF")
                return { backgroundColor : '#00FFCE', color:'#000'};
            else if(row.tagType=="SHOL DOD" || row.tagType=="LHOL DOD" || 
                    row.tagType=="DOUBLE LEGAL DOD" || row.tagType=="DOUBLE HOLIDAY DOD")
                return { backgroundColor : '#00FFCE', color:'#000'};
          };
        const { ExportCSVButton } = CSVExport;
        return(
                <div>
                <Banner />
                <Container className="themed-container" fluid={true}>
                <Card className="mt-5">
                    <Card.Header>Finalized Employee's DTR</Card.Header>
                    <Card.Body>
                        <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                            <div className={this.state.color}></div> 
                            {this.state.message}
                        </Alert>
                        <Form.Group>
                            <Typeahead
                                labelKey='name'
                                id="basic-exampleEmp"
                                onChange={ this.onChangeClientList }
                                options={this.state.clientList}
                                placeholder="Select Client"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Typeahead
                                labelKey='employeeName'
                                id="basic-exampleEmp"
                                onChange={ this.onChangeEmployeeName }
                                options={this.state.employeeList}
                                placeholder="Select Employee"
                            />
                        </Form.Group>
                        <Form.Group controlId="">
                            <Typeahead
                                labelKey='payPeriod'
                                id="basic-example"
                                onChange={this.onChangePayPeriod}
                                options={this.state.payPeriodList}
                                placeholder="Select Pay Period"
                                />
                            
                        </Form.Group> 
                        <Form.Group>
                            <ButtonToolbar>
                                <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                    Search
                                </Button>&nbsp;
                            </ButtonToolbar>
                        </Form.Group>

                        
                        <div className="mt-5">
                            <ToolkitProvider
                                keyField="id"   
                                data={ this.state.billableDTRList }
                                columns = { mainGridColumns }
                                exportCSV={ {
                                    fileName: "DTR_Detailed_"+this.state.employeeNo+".csv",
                                    noAutoBOM: false,
                                    separator: ',',
                                    blobType: "text/plain;charset=utf-8,%EF%BB%BF"
                                } }
                                >
                                {
                                    props => (
                                    <div>
                                        
                                        <hr />
                                        <ExportCSVButton disabled={this.state.disableExport} className="btn btn-success" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                        <BootstrapTable
                                            rowClasses="noser-table-row-class"
                                            striped
                                            hover
                                            condensed
                                            expandRow
                                            class="tableHS"
                                            keyField = "id"
                                            data = { this.state.billableDTRList }
                                            columns = { mainGridColumns }
                                            selectRow = { selectRow }
                                            cellEdit = {
                                                cellEditFactory({ 
                                                    mode: 'dbclick', 
                                                    blurToSave: true,
                                                    afterSaveCell: (oldValue, newValue, row, column) => { 
                                                        this.GridDataModified(oldValue, newValue, row.id, column)
                                                    }
                                                }) 
                                            } 
                                            rowStyle={ rowStyle }                           
                                        />
                                    </div>
                                    )
                                }
                            </ToolkitProvider>
                        </div>                         

                        <div className="mt-5">
                            <ToolkitProvider
                                keyField="id"   
                                data={ this.state.billableSummariesList }
                                columns = { elementGridColumns }
                                exportCSV={ {
                                    fileName: "DTR_Summary_"+this.state.employeeNo+".csv",
                                    noAutoBOM: false,
                                    separator: ',',
                                    blobType: "text/plain;charset=utf-8,%EF%BB%BF"
                                } }
                                >
                                {
                                    props => (
                                    <div>
                                        
                                        <hr />
                                        <ExportCSVButton disabled={this.state.disableExport} className="btn btn-success" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                                        <BootstrapTable
                                        wrapperClasses="table-responsive"
                                        rowClasses="noser-table-row-class"
                                        striped
                                        hover
                                        condensed
                                        expandRow
                                        class=""
                                        keyField = "id"
                                        data = { this.state.billableSummariesList }
                                        columns = { elementGridColumns }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }                            
                                        />
                                    </div>
                                    )
                                }
                            </ToolkitProvider>
                        </div> 

                        <ButtonToolbar>
                            <Button variant="success" className="ml-auto" onClick={this.handleReComputeClick} disabled={this.state.isDisable}>
                                Re-Compute
                            </Button>&nbsp;&nbsp;
                            <Button variant="success" className="ml-auto" onClick={this.handleReturnedClick} disabled={this.state.isDisable}>
                                Return To COOR
                            </Button>&nbsp;&nbsp;
                            <Button variant="success" className="ml-auto" onClick={this.handleFinalizedClick} disabled={this.state.isDisable}>
                                Finalized
                            </Button>&nbsp;&nbsp;
                            <Button variant="danger" href="/banner">
                                Close
                            </Button>
                        </ButtonToolbar>                  

                    </Card.Body>
                </Card>
                </Container>
                <NoserLoading show={this.state.isloading} />
                    

                

                </div>
        )
    }

}

export  default ComputedDTR