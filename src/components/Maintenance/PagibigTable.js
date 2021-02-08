import React, { Component } from "react"
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import cellEditFactory, { Type, TableHeaderColumn, } from "react-bootstrap-table2-editor";
import {
    
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';



class PagibigTable extends Component {

    constructor() {
        super()
        this.state = {
            hdmfList:[],
            userinfo: [],
            isLoading: true
        }
    }
    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
       this.GetHDMF()
    }

    GetHDMF() {
        const hdmfParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHDMFBrackets",  hdmfParams)
        .then(res => {
            console.log("Get HDMF Brackets")
             const data = res.data;
             console.log(res.data)
             this.setState({ hdmfList: data.brackets });
         })
    }


    render() {
   
        const cellEdit = {
        mode: 'click',
        blurToSave: true
        };
        return (
            <div className="mt-5">
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>PAGIBIG CONTRIBUTION TABLE</Card.Header>
                        <Card.Body>
                            <BootstrapTable data={ this.state.hdmfList } striped={true} hover={true} 
                                cellEdit={ cellEdit }>
                                <TableHeaderColumn  row='0' rowSpan='2' dataField='id' dataAlign="center"  isKey={true} width='175' hidden>onthly Compensation</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField='name'  dataAlign='center'  width='175'>Monthly Compensation</TableHeaderColumn>
                                <TableHeaderColumn row='0' colSpan='2' dataAlign='center' width='175'>Percentage of Monthly Compensation</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='eeShareLabel' width='175' dataAlign='center'>Employee Share</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField='erShareLabel' width='175' dataAlign='center'>Employer Share</TableHeaderColumn>
                            </BootstrapTable>&nbsp;&nbsp;
                            <ButtonToolbar sm={12}>
                                <Button variant="danger" href="/home">
                                Close
                            </Button>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
 
export  default PagibigTable