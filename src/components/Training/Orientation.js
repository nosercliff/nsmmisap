import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import { DropdownButton, Dropdown} from 'react-bootstrap';

 
class Orientation extends Component {
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

            orientationTableList :  [],

        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
    }


    GridDataModified(oldValue, newValue, id, column) {
        ////console.log(id)
        this.state.orientationTableList.map(function(item,i) {
            if (item.id===id)
                item.isModified = newValue!=oldValue ? "1" : "0"
        })
    }

    render() {
        
        const orientationColumn = [
            {
                dataField   : 'date',
                text        : 'Date',
                headerStyle : () => {
                    return { width  : "10%" };
                }
            },
            {
                dataField: 'requestedBy',
                text: 'Requested By',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'requested',
                text        : 'Requested',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'particulars',
                text        : 'Particulars',
                headerStyle : () => {
                    return { width  : "20%" };
                }
            },
            {
                dataField   : 'employee',
                text        : 'Employee',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'position',
                text        : 'Position',
                headerStyle : () => {
                    return { width  : "15%" };
                }
            },
            {
                dataField   : 'client',
                text        : 'Client',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
            {
                dataField   : 'register',
                text        : 'Register',
                headerStyle : () => {
                    return { width  : "10%" };
                },
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            clickToSelectAndEditCell: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.state.orientationTableList.map(function(item,i){
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
            <div>
                <Banner />
                    <Container className="mt-5" fluid>
                        <Card>
                            <Card.Header>TRAINING >> ORIENTATION, TRAINING AND EXAM REQUEST MONITORING</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>

                                    <ButtonToolbar className="mt-1">
                                        <Button variant="success" className="ml-auto" onClick={ this.handleSearchClick }>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                        <Button  variant="success">
                                            Clear
                                        </Button>
                                    </ButtonToolbar>

                                    <Card.Header className="mt-3">Employee List</Card.Header>
                                    <div className="mt-1">
                                        <BootstrapTable
                                            /* caption={Noser.TableHeader({title:"RECORD"})} */
                                            keyField = "id"
                                            data = { this.state.orientationTableList }
                                            columns = { orientationColumn }
                                            pagination={ paginationFactory({sizePerPageRenderer}) }
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
                                            rowEvents={ rowEvents }
                                            selectRow = { selectRow }

                                        />
                                    </div>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" style={{minWidth:'60px'}} onClick={this.handleUpdateClick}>
                                            Generate Report
                                        </Button>&nbsp;&nbsp;
                                        <NavLink to="/home">
                                            <Button variant="danger" href="/home" style={{minWidth:'60px'}}>
                                                Close
                                            </Button>
                                        </NavLink>
                                    </ButtonToolbar>
                                </Form>
                            </Card.Body>
                        </Card>
                       
                    </Container>
                    <NoserLoading show={this.state.isloading} />

            </div> 
        )
    }

}

export  default Orientation
