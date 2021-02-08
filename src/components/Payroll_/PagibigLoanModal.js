import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker
} 
from '../../noser-hris-component';


class PagibigLoanModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }

    }
    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))

    }


    render() {

         


        const columnAdjustments = [
            {
                dataField: 'name',
                text: 'Month'
            },
            {
                dataField: '1st',
                text: '1st Cut-Off'
            },
            {
                dataField: '2nd',
                text: '2nd Cut-Off'
            },
            {
                dataField: '3rd',
                text: '3rd Cut-Off'
            },
            {
                dataField: '4th',
                text: '4th Cut-Off'
            },
            {
                dataField: '5th',
                text: '5th Cut-Off'
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        }; 

      
        const range = [
            {"name": "February",
            "1st" : "1,500",
             "2nd" : "500",
              '3rd' : "500", 
              '4th': "300",
               '5th': "300"},
    ]

    return(
        <div className="mt-5 container">
                <Container className="mt-5">
                    <Card>
                        <Card.Body>
                            <Form>
                                <Card.Header className="mt-5"> PAG-IBIG Loan Deduction</Card.Header>
                                <Form.Row className="mt-3">
                                    <label for="exampleFormControlInput1" className="ml-5" >
                                            Loan Amount/ B/F <span style={{color: 'red'}}>{this.state.periodType}</span>
                                    </label>&nbsp;&nbsp;
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={8}>
                                        <Form.Control type="text" 
                                        ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                </Form.Group>
                                </Form.Row>
                                <Form.Row className="mt-3">
                                    <label for="exampleFormControlInput1" className="ml-5" >
                                        This Month Amortization<span style={{color: 'red'}}>{this.state.periodType}</span>
                                    </label>&nbsp;&nbsp;
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={8}>
                                            <Form.Control type="text" 
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                        </Col>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="mt-3">
                                    <label for="exampleFormControlInput1" className="ml-5" >
                                        This Month Ending Balance <span style={{color: 'red'}}>{this.state.periodType}</span>
                                    </label>&nbsp;&nbsp;
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={8}>
                                            <Form.Control type="text" 
                                            ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                        </Col>
                                    </Form.Group>
                                </Form.Row>
                                <Card.Header > </Card.Header>
                                <Form.Group className="mt-2" as={Row} controlId="formHorizontalEmail">
                                    <BootstrapTable
                                    keyField = "name"
                                    data = { range}
                                    columns = { columnAdjustments }
                                    //selectRow = { selectRow }
                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                    />
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col>
                                        <ButtonToolbar >
                                            <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                                Save
                                            </Button>&nbsp;&nbsp;
                                            <Button variant="danger" href="/PayrollPeriod">
                                                Close
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}

export  default PagibigLoanModal
