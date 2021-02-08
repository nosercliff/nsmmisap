import React, { Component } from "react"
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
    
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class SSSTable extends Component {

    constructor() {
        super()
        this.state = {
            userinfo: [],
            isLoading: true
        }
    }
    componentDidMount() {
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
       this.GetSSSBrackets()
       sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }

    GetSSSBrackets() {
        const sssParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetSSSBrackets",  sssParams)
        .then(res => {
             const data = res.data;
             console.log(res.data)
             this.setState({ sssBracketList: data.brackets });
         })
    }



    render() {
        const cellEdit = {
        mode: 'click',
        blurToSave: true
        };  
        
        

        return (
            <div>
             <Banner />
             <Container className="mt-5">
                    <Card>
                        <Card.Header>SSS CONTRIBUTION TABLE</Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <BootstrapTable data={ this.state.sssBracketList } striped={true} hover={true}
                                cellEdit={ cellEdit }
                                >
                                    <TableHeaderColumn  row='0' rowSpan='2' dataField='id' dataAlign="center"  isKey={true} width='175' hidden>RANGE OF COMPENSATION</TableHeaderColumn>
                                    <TableHeaderColumn row='0' rowSpan='2' dataField='name' dataAlign="center"   width='175'>RANGE OF COMPENSATION</TableHeaderColumn>

                                    <TableHeaderColumn row='0' rowSpan='2' dataField='monthlySalary' width='175' dataAlign="center">MONTHLY SALARY CREDIT</TableHeaderColumn>

                                    <TableHeaderColumn row='0' colSpan='3'  headerAlign='center' width='210' >EMPLOYERS SS CONTRIBUTION</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='scerShare' width='75' dataAlign='center'>ER</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='sceeShare' width='75' dataAlign="center">EE</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='scTotalShare' width='75'>TOTAL</TableHeaderColumn>

                                    <TableHeaderColumn row='0' colSpan='1'  width='170' headerAlign='center' >EC CONTRIBUTION</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='ecShare' width='170' dataAlign='center'>ER</TableHeaderColumn>

                                    <TableHeaderColumn row='0' colSpan='3'   headerAlign='center' width='210'>TOTAL CONTRIBUTION</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='tcerShare' width='70' dataAlign='center'>ER</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='tceeShare' width='70' dataAlign="center">EE</TableHeaderColumn>
                                    <TableHeaderColumn row='1' dataField='tcTotalShare' width='70'>TOTAL</TableHeaderColumn>
                                </BootstrapTable>&nbsp;&nbsp;
                                
                            </Form.Row>
                            <Form.Group>
                                <ButtonToolbar sm={12}>
                                    <Button  variant="danger"  href="/home">
                                        Close
                                    </Button>
                                </ButtonToolbar>
                            </Form.Group>
                            
                        </Card.Body>
                    </Card>
                    <NoserLoading show={this.state.isLoading} />
                </Container>
            </div>
        );
    }

}
 
export  default SSSTable