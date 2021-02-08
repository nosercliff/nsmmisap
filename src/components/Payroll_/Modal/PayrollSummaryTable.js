import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../../noser-hris-component';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const PayrollSummaryColumn = (data)=>{
    if(data.length==0)
    {
        
        return [
                { dataField: 'hc', text: 'HC', hidden:  true,
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',fontSize:'10px' }},
                    style:{textAlign:'center',fontSize:'10px'}
                },
                { dataField: 'memberName', text: 'MEMBER NAME', hidden:  false,
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'left',width:'25%',fontSize:'10px' }},
                    style:{textAlign:'left',fontSize:'10px'}
                },
                { dataField: 'basicPayDays', text: 'BASIC PAY DAYS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'center',fontSize:'10px'}
                },
                { dataField: 'basicPayHrs', text: 'BASIC PAY HRS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'center',fontSize:'10px'}
                },
                { dataField: 'basicPayAmount', text: 'BASIC PAY AMOUNT',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'lateMins', text: 'LATE MINS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'center',fontSize:'10px'}
                },
                { dataField: 'lateAmount', text: 'LATE AMOUNT',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'undertimeMins', text: 'UNDERTIME / HALF DAY MINS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'center',fontSize:'10px'}
                },
                { dataField: 'undertimeAmount', text: 'UNDERTIME / HALF DAY AMOUNT',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'absentDays', text: 'ABSENT DAYS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'center',fontSize:'10px'}
                },
                { dataField: 'absentAmount', text: 'ABSENT AMOUNT',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'netRegularPay', text: 'NET REGULAR PAY',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'grossPay', text: 'GROSS PAY',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'totalInclusions', text: 'TOTAL INCLUSIONS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'totalGrossPay', text: 'TOTAL GROSS PAY',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'totalDeductions', text: 'TOTAL DEDUCTIONS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'netPay', text: 'NET PAY',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'right',fontSize:'10px'}
                },
                { dataField: 'remarks', text: 'REMARKS',
                    headerStyle: (colum, colIndex) => {
                        return { textAlign: 'left',width:'9%',fontSize:'10px' }},
                    style:{textAlign:'left',fontSize:'10px'}
                }]
    }
    else
    {
        console.log(parseFloat(data[data.length-1].seaRate)==0 ? true : false)
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        return  [
            
            { dataField: 'hc', text: 'HC', hidden: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'memberName', text: 'MEMBER NAME', hidden: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',whiteSpace:'nowrap',fontSize:'10px' }},
                style:{textAlign:'left',fontSize:'10px',whiteSpace:'nowrap'}
            },
            { dataField: 'payCardNumber', text: 'PAYCARD NUMBER', hidden: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',whiteSpace:'nowrap',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px',whiteSpace:'nowrap'}
            },
            { dataField: 'salaryOffered', text: 'RATE', hidden: false,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'colaRate', text: 'COLA RATE', hidden: parseFloat(data[data.length-1].colaRate)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].colaRate)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'seaRate', text: 'SEA RATE', hidden: parseFloat(data[data.length-1].seaRate)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].seaRate)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'basicPayDays', text: 'BASIC PAY DAYS',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'basicPayHrs', text: 'BASIC PAY HRS',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'basicPayAmount', text: 'BASIC PAY AMOUNT',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'colaDays', text: 'COLA DAYS',hidden: parseFloat(data[data.length-1].colaDays)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].colaDays)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'colaAmount', text: 'COLA AMOUNT',hidden: parseFloat(data[data.length-1].colaAmount)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].colaAmount)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'seaDays', text: 'SEA DAYS',hidden: parseFloat(data[data.length-1].seaDays)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].seaDays)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'seaAmount', text: 'SEA AMOUNT',hidden: parseFloat(data[data.length-1].seaAmount)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].seaAmount)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'lateMins', text: 'LATE MINS',hidden: parseFloat(data[data.length-1].lateMins)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].lateMins)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'lateAmount', text: 'LATE AMOUNT',hidden: parseFloat(data[data.length-1].lateAmount)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].lateAmount)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'undertimeMins', text: 'UNDERTIME / HALF DAY MINS',hidden: parseFloat(data[data.length-1].undertimeMins)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].undertimeMins)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'undertimeAmount', text: 'UNDERTIME / HALF DAY AMOUNT',hidden: parseFloat(data[data.length-1].undertimeAmount)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].undertimeAmount)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'absentDays', text: 'ABSENT DAYS',hidden: parseFloat(data[data.length-1].absentDays)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].absentDays)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'absentAmount', text: 'ABSENT AMOUNT',hidden: parseFloat(data[data.length-1].absentAmount)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].absentAmount)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'netRegularPay', text: 'NET REGULAR PAY',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_OT_HOURS', text: 'OT HRS',hidden: parseFloat(data[data.length-1].premiuM_OT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_OT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_OT', text: 'OT AMOUNT',hidden: parseFloat(data[data.length-1].premiuM_OT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_OT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },   
            { dataField: 'premiuM_ND_HOURS', text: 'ND HRS',hidden: parseFloat(data[data.length-1].premiuM_ND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_ND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_ND', text: 'ND AMOUNT',hidden: parseFloat(data[data.length-1].premiuM_ND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_ND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },   
            { dataField: 'premiuM_NDOT_HOURS', text: 'ND OT HRS',hidden: parseFloat(data[data.length-1].premiuM_NDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_NDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_NDOT', text: 'ND OT AMOUNT',hidden: parseFloat(data[data.length-1].premiuM_NDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_NDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },   
            
            { dataField: 'premiuM_DOD_HOURS', text: 'RESTDAY HRS',hidden: parseFloat(data[data.length-1].premiuM_DOD_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DOD_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_DOD', text: 'REST DAY',hidden: parseFloat(data[data.length-1].premiuM_DOD)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DOD)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_DODOT_HOURS', text: 'REST DAY OT HRS',hidden: parseFloat(data[data.length-1].premiuM_DODOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DODOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_DODOT', text: 'REST DAY OT',hidden: parseFloat(data[data.length-1].premiuM_DODOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DODOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_DODND_HOURS', text: 'REST DAY ND HRS',hidden: parseFloat(data[data.length-1].premiuM_DODND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DODND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_DODND', text: 'REST DAY ND',hidden: parseFloat(data[data.length-1].premiuM_DODND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DODND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_DODNDOT_HOURS', text: 'REST DAY NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_DODNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DODND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_DODNDOT', text: 'REST DAY NDOT',hidden: parseFloat(data[data.length-1].premiuM_DODNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_DODNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_SHOL_HOURS', text: 'SHOL HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOL_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOL_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOL', text: 'SHOL',hidden: parseFloat(data[data.length-1].premiuM_SHOL)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOL)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLOT_HOURS', text: 'SHOL OT HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLOT', text: 'SHOL OT',hidden: parseFloat(data[data.length-1].premiuM_SHOLOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLND_HOURS', text: 'SHOL ND HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLND', text: 'SHOL ND',hidden: parseFloat(data[data.length-1].premiuM_SHOLND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLNDOT_HOURS', text: 'SHOL NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLNDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLNDOT', text: 'SHOL NDOT',hidden: parseFloat(data[data.length-1].premiuM_SHOLNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_SHOLDOD_HOURS', text: 'SHOL DOD HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLDOD_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDOD_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDOD', text: 'SHOL DOD',hidden: parseFloat(data[data.length-1].premiuM_SHOLDOD)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDOD)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDODOT_HOURS', text: 'SHOL DOD OT HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLDODOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDODOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDODOT', text: 'SHOL DOD OT',hidden: parseFloat(data[data.length-1].premiuM_SHOLDODOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDODOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDODND_HOURS', text: 'SHOL DOD ND HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLDODND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDODND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDODND', text: 'SHOL DOD ND',hidden: parseFloat(data[data.length-1].premiuM_SHOLDODND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDODND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDODNDOT_HOURS', text: 'SHOL DOD NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_SHOLDODNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDODNDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SHOLDODNDOT', text: 'SHOL DOD NDOT',hidden: parseFloat(data[data.length-1].premiuM_SHOLDODNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SHOLDODNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_LHOL_HOURS', text: 'LHOL HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOL_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOL_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOL', text: 'LHOL',hidden: parseFloat(data[data.length-1].premiuM_LHOL)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOL)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLOT_HOURS', text: 'LHOL OT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLOT', text: 'LHOL OT',hidden: parseFloat(data[data.length-1].premiuM_LHOLOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLND_HOURS', text: 'LHOL ND HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLND', text: 'LHOL ND',hidden: parseFloat(data[data.length-1].premiuM_LHOLND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLNDOT_HOURS', text: 'LHOL NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLNDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
                { dataField: 'premiuM_LHOLNDOT', text: 'LHOL NDOT',hidden: parseFloat(data[data.length-1].premiuM_LHOLNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_LHOLDOD_HOURS', text: 'LHOL DOD HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLDOD_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDOD_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDOD', text: 'LHOL DOD',hidden: parseFloat(data[data.length-1].premiuM_LHOLDOD)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDOD)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDODOT_HOURS', text: 'LHOL DOD OT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLDODOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDODOT', text: 'LHOL DOD OT',hidden: parseFloat(data[data.length-1].premiuM_LHOLDODOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDODND_HOURS', text: 'LHOL DOD ND HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLDODND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDODND', text: 'LHOL DOD ND',hidden: parseFloat(data[data.length-1].premiuM_LHOLDODND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDODNDOT_HOURS', text: 'LHOL DOD NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLDODNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODNDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLDODNDOT', text: 'LHOL DOD NDOT',hidden: parseFloat(data[data.length-1].premiuM_LHOLDODNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_LHOLSHOL_HOURS', text: 'LHOL SHOL HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOL_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLDODNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOL', text: 'LHOL SHOL',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOL)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOL)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLOT_HOURS', text: 'LHOL SHOL OT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLOT', text: 'LHOL SHOL OT',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLND_HOURS', text: 'LHOL SHOL ND HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLND', text: 'LHOL SHOL ND',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLNDOT_HOURS', text: 'LHOL SHOL NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLNDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLNDOT', text: 'LHOL SHOL NDOT',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_LHOLSHOLDOD_HOURS', text: 'LHOL SHOL DOD HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDOD_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDOD_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDOD', text: 'LHOL SHOL DOD',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDOD)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDOD)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDODOT_HOURS', text: 'LHOL SHOL DOD OT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDODOT', text: 'LHOL SHOL DOD OT',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDODND_HOURS', text: 'LHOL SHOL DOD ND HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODND_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODND_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDODND', text: 'LHOL SHOL DOD ND',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODND)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODND)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDODNDOT_HOURS', text: 'LHOL SHOL DOD NDOT HRS',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODNDOT_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODNDOT_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_LHOLSHOLDODNDOT', text: 'LHOL SHOL DOD NDOT',hidden: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODNDOT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_LHOLSHOLDODNDOT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'premiuM_VACATIONLEAVE_HOURS', text: 'VACATION LEAVE DAYS',hidden: parseFloat(data[data.length-1].premiuM_VACATIONLEAVE_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_VACATIONLEAVE_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_VACATIONLEAVE', text: 'VACATION LEAVE',hidden: parseFloat(data[data.length-1].premiuM_VACATIONLEAVE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_VACATIONLEAVE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_SICKLEAVE_HOURS', text: 'SICK LEAVE DAYS',hidden: parseFloat(data[data.length-1].premiuM_SICKLEAVE_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SICKLEAVE_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_SICKLEAVE', text: 'SICK LEAVE',hidden: parseFloat(data[data.length-1].premiuM_SICKLEAVE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_SICKLEAVE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'premiuM_PATERNITYLEAVE_HOURS', text: 'PATERNITY LEAVE DAYS',hidden: parseFloat(data[data.length-1].premiuM_PATERNITYLEAVE_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_PATERNITYLEAVE_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_PATERNITYLEAVE', text: 'PATERNITY LEAVE',hidden: parseFloat(data[data.length-1].premiuM_PATERNITYLEAVE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_PATERNITYLEAVE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_MATERNITYLEAVE_HOURS', text: 'MATERNITY LEAVE DAYS',hidden: parseFloat(data[data.length-1].premiuM_MATERNITYLEAVE_HOURS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_MATERNITYLEAVE_HOURS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'premiuM_MATERNITYLEAVE', text: 'MATERNITY LEAVE',hidden: parseFloat(data[data.length-1].premiuM_MATERNITYLEAVE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].premiuM_MATERNITYLEAVE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            
            { dataField: 'totalPremiums', text: 'TOTAL PREMIUMS',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'grossPay', text: 'GROSS PAY',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            
            { dataField: 'inclusioN_MA_NOOFDAYS', text: 'MEAL ALLOWANCE NO OF DAYS',hidden: parseFloat(data[data.length-1].inclusioN_MA_NOOFDAYS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_MA_NOOFDAYS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'inclusioN_MA_AMOUNT', text: 'MEAL ALLOWANCE',hidden: parseFloat(data[data.length-1].inclusioN_MA_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_MA_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            
            { dataField: 'inclusioN_DA_NOOFDAYS', text: 'ALLOWANCE NO OF DAYS',hidden: parseFloat(data[data.length-1].inclusioN_DA_NOOFDAYS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_DA_NOOFDAYS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'inclusioN_DA_AMOUNT', text: 'ALLOWANCE',hidden: parseFloat(data[data.length-1].inclusioN_DA_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_DA_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
        
            { dataField: 'inclusioN_SPA_NOOFDAYS', text: 'SKILLS PAY ALLOWANCE NO OF DAYS',hidden: parseFloat(data[data.length-1].inclusioN_SPA_NOOFDAYS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_SPA_NOOFDAYS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'inclusioN_SPA_AMOUNT', text: 'SKILLS PAY ALLOWANCE',hidden: parseFloat(data[data.length-1].inclusioN_SPA_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_SPA_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'inclusioN_TL_NOOFDAYS', text: 'TEAM LEADER ALLOWANCE NO OF DAYS',hidden: parseFloat(data[data.length-1].inclusioN_TL_NOOFDAYS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_TL_NOOFDAYS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'inclusioN_TL_AMOUNT', text: 'TEAM LEADER ALLOWANCE',hidden: parseFloat(data[data.length-1].inclusioN_TL_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_TL_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'inclusioN_HP_NOOFDAYS', text: 'HAZARD PAY NO OF DAYS',hidden: parseFloat(data[data.length-1].inclusioN_HP_NOOFDAYS)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_HP_NOOFDAYS)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'center',fontSize:'10px'}
            },
            { dataField: 'inclusioN_HP_AMOUNT', text: 'HAZARD PAY',hidden: parseFloat(data[data.length-1].inclusioN_HP_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_HP_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

        // { dataField: 'inclusioN_ALLOWANCE_AMOUNT', text: 'ALLOWANCE' },
            { dataField: 'inclusioN_SL_AMOUNT', text: 'SHIFT LEADER',hidden: parseFloat(data[data.length-1].inclusioN_SL_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_SL_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_GM_AMOUNT', text: 'GROSS MARGIN',hidden: parseFloat(data[data.length-1].inclusioN_GM_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_GM_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_SG_AMOUNT', text: 'SALES GROWTH',hidden: parseFloat(data[data.length-1].inclusioN_SG_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_SG_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_PA_AMOUNT', text: 'PERFECT ATTENDANCE',hidden: parseFloat(data[data.length-1].inclusioN_PA_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_PA_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_LBC_AMOUNT', text: 'LBC',hidden: parseFloat(data[data.length-1].inclusioN_LBC_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_LBC_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_BDAY_AMOUNT', text: 'BIRTHDAY',hidden: parseFloat(data[data.length-1].inclusioN_BDAY_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_BDAY_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_TRANSPO_AMOUNT', text: 'TRANSPORTATION ALLOWANCE',hidden: parseFloat(data[data.length-1].inclusioN_TRANSPO_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_TRANSPO_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_WER_AMOUNT', text: 'WEEKLY EXPENSE REPORT',hidden: parseFloat(data[data.length-1].inclusioN_WER_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_WER_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_LOAD_AMOUNT', text: 'LOAD ALLOWANCE',hidden: parseFloat(data[data.length-1].inclusioN_LOAD_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_LOAD_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_MRP_AMOUNT', text: 'MRP INCENTIVE',hidden: parseFloat(data[data.length-1].inclusioN_MRP_AMOUNT)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_MRP_AMOUNT)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'inclusioN_OPUP_ADJ', text: 'ADJ (OP / UP)',hidden: parseFloat(data[data.length-1].inclusioN_OPUP_ADJ)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].inclusioN_OPUP_ADJ)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'totalInclusions', text: 'TOTAL INCLUSIONS',hidden: parseFloat(data[data.length-1].totalInclusions)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].totalInclusions)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'totalGrossPay', text: 'TOTAL GROSS PAY',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'deductioN_SSS_EE', text: 'SSS',hidden: parseFloat(data[data.length-1].deductioN_SSS_EE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_SSS_EE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_PHIC_EE', text: 'PHIC',hidden: parseFloat(data[data.length-1].deductioN_PHIC_EE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_PHIC_EE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_HDMF_EE', text: 'HDMF',hidden: parseFloat(data[data.length-1].deductioN_HDMF_EE)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_HDMF_EE)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'deductioN_SSS_LOAN', text: 'SSS LOAN',hidden: parseFloat(data[data.length-1].deductioN_SSS_LOAN)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_SSS_LOAN)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_HDMF_LOAN', text: 'HDMF LOAN',hidden: parseFloat(data[data.length-1].deductioN_HDMF_LOAN)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_HDMF_LOAN)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_COOP_LOAN', text: 'COOP LOAN',hidden: parseFloat(data[data.length-1].deductioN_COOP_LOAN)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_COOP_LOAN)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'deductioN_NRF', text: 'NRF',hidden: parseFloat(data[data.length-1].deductioN_NRF)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_NRF)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_AAP', text: 'AAP',hidden: parseFloat(data[data.length-1].deductioN_AAP)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_AAP)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_CBU', text: 'CBU',hidden: parseFloat(data[data.length-1].deductioN_CBU)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_CBU)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_EMPLOYEE_CHARGES', text: 'EMPLOYEE CHARGES',hidden: parseFloat(data[data.length-1].deductioN_EMPLOYEE_CHARGES)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_EMPLOYEE_CHARGES)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_BANK_FEES', text: 'BANK TRAN FEE',hidden: parseFloat(data[data.length-1].deductioN_BANK_FEES)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_BANK_FEES)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_PENALTY', text: 'PENALTY',hidden: parseFloat(data[data.length-1].deductioN_PENALTY)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_PENALTY)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_TMK', text: 'TRUE MONEY KIT',hidden: parseFloat(data[data.length-1].deductioN_TMK)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_TMK)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_PARAMOUNT_ID', text: 'PARAMOUNT ID',hidden: parseFloat(data[data.length-1].deductioN_PARAMOUNT_ID)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_PARAMOUNT_ID)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'deductioN_HMO', text: 'HMO',hidden: parseFloat(data[data.length-1].deductioN_HMO)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].deductioN_HMO)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },

            { dataField: 'totalDeductions', text: 'TOTAL DEDUCTIONS',hidden: parseFloat(data[data.length-1].totalDeductions)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].totalDeductions)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'netPay', text: 'NET PAY',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'mlCharged', text: 'ML CHARGE',hidden: parseFloat(data[data.length-1].mlCharged)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].mlCharged)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'actualNetPay', text: 'ACTUAL NET PAY',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'remarks', text: 'REMARKS',hidden: data[data.length-1].remarks==null ? true : false,
                csvExport: data[data.length-1].remarks==null ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'left',fontSize:'10px'}
            },

            { dataField: 'paycarD_BDO', text: 'BDO',hidden: parseFloat(data[data.length-1].paycarD_BDO)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_BDO)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_GCASH', text: 'GCASH',hidden: parseFloat(data[data.length-1].paycarD_GCASH)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_GCASH)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_RCBC', text: 'RCBC',hidden: parseFloat(data[data.length-1].paycarD_RCBC)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_RCBC)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_ML', text: 'ML',hidden: parseFloat(data[data.length-1].paycarD_ML)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_ML)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_TM', text: 'TRUE MONEY',hidden: parseFloat(data[data.length-1].paycarD_TM)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_TM)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_METROBANK', text: 'METROBANK',hidden: parseFloat(data[data.length-1].paycarD_METROBANK)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_METROBANK)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_HOLD', text: 'HOLD',hidden: parseFloat(data[data.length-1].paycarD_HOLD)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_HOLD)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            },
            { dataField: 'paycarD_NOATM', text: 'NO ATM',hidden: parseFloat(data[data.length-1].paycarD_NOATM)==0 ? true : false,
                csvExport: parseFloat(data[data.length-1].paycarD_NOATM)==0 ? false : true,
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'center',width:'9%',fontSize:'10px' }},
                style:{textAlign:'right',fontSize:'10px'}
            }
        ]
    }
    
}

const NoserTable = ({ data, exportCSV, pageSize }) =>
{
    if(exportCSV==true){
        const col = PayrollSummaryColumn(data)
        const { ExportCSVButton } = CSVExport;
        return(
            <ToolkitProvider
                keyField="id"   
                data={ data }
                columns = { col }
                exportCSV={ {
                    fileName: "PayrollSummary.csv",
                } }
                >
                {
                    props => (
                    <div>
                        
                        <hr />
                        <ExportCSVButton disabled={data.length>0 ? false : true} className="btn btn-success" { ...props.csvProps }>Export CSV!!</ExportCSVButton>
                        <BootstrapTable
                            striped
                            hover
                            condensed
                            pagination={ paginationFactory({sizePerPage:pageSize,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                            keyField = "id"
                            data = { data }
                            noDataIndication={ () => <div>No record found.</div> }
                            columns = { PayrollSummaryColumn(data) }
                        />
                    </div>
                    )
                }
            </ToolkitProvider>
            
        )
    }
    else
    {
        const col = PayrollSummaryColumn(data)
        return(
            
            <div style={{fontSize:'8px'}}>    
                <BootstrapTable
                    striped
                    hover
                    condensed
                    pagination={ paginationFactory({sizePerPage:pageSize,hideSizePerPage:true,hidePageListOnlyOnePage:true})}
                    keyField = "id"
                    data = { data }
                    noDataIndication={ () => <div>No record found.</div> }
                    columns = { col }
                />
            </div>
        )
    }
}

export default class NoserGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <NoserTable 
                data = {this.props.data}
                exportCSV = {this.props.exportCSV}
                pageSize = {this.props.pageSize}
            />
        )
    }
}