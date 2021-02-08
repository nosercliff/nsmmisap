import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';


class BranchGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: [],
            isLoading: false,
            AlertType: "",
            Show: false,
            Message: "",
            Color: "",
            Fade: true,
            branchGroupAutocomplete: [],
            branchGroupList : [],
        }
    }
    

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))

    }

    

    render() {
        const columnBranchGroup = [
            {
                dataField: 'name',
                text: 'Area',
                headerStyle: (colum, colIndex) => {
                    return { textAlign: 'left',width:'50%' }},
                style:{textAlign:'left'}
            }
        ]


    return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>Branch / Location Group</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                        {this.state.Message}
                                    </Alert>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <Typeahead
                                                    labelKey='name'
                                                    id="basic-example"
                                                    onChange={this.handleEventBranchGroup}
                                                    options={this.state.branchGroupAutocomplete}
                                                    placeholder="Select Area"
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formHorizontalEmail">
                                            <Col sm={12}>
                                                <ButtonToolbar>
                                                    <Button variant="primary" className="ml-auto" onClick={ this.handleSearchClick }>
                                                        Search
                                                    </Button>&nbsp;&nbsp;
                                                    <NavLink to="/BranchGroupCreate">
                                                        <Button  variant="primary" variant="success">
                                                            Create
                                                        </Button>
                                                    </NavLink>
                                                </ButtonToolbar>
                                            </Col>
                                        </Form.Group>
                                        <div className="mt-5">
                                            <BootstrapTable
                                                caption={Noser.TableHeader({title:"RECORD"})}
                                                rowClasses="noser-table-row-class"
                                                striped
                                                hover
                                                condensed
                                                pagination={ paginationFactory({sizePerPageRenderer}) }
                                                keyField = "id"
                                                data = { this.state.branchGroupList }
                                                columns = { columnBranchGroup}
                                                /* selectRow = { selectRow } */
                                                cellEdit = { cellEditFactory({
                                                    mode: 'dbclick',
                                                    blurToSave: true,
                                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                                        this.GridDataModified(oldValue, newValue, row.id, column.dataField)
                                                        }
                                                    })
                                                }
                                                rowStyle={{ height: "45px" }}
                                                /* rowEvents={ rowEvents } */ 

                                            />
                                            <ButtonToolbar sm={12}>
                                                <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                                    Save
                                                </Button>&nbsp;&nbsp;
                                                <NavLink to="/home">
                                                    <Button variant="danger" href="/banner">
                                                        Close
                                                    </Button>
                                                </NavLink>
                                            </ButtonToolbar>
                                        </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                <NoserLoading show={this.state.isLoading} />
            </div> 
        )
    }

}

export  default BranchGroup 