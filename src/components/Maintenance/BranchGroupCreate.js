import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../noser-hris-component';

class BranchGroupCreate extends Component {
    constructor() {
        super()
        this.state = {
            isLoading:false,
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            newBranchGroup : '',
        };

    }

    onChangeNewBranchGroup = (e) => {
        this.setState({
            newBranchGroup : e.target.value
        })
    }

            
        render() {
                return(
                    <div >
                        <Banner />
                        <Container className="mt-5">
                        <Card>
                            <Card.Header>Area - Create</Card.Header>
                            <Card.Body>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter New Area" 
                                            ref="newBranchGroup"
                                            autoComplete="off" 
                                            name="newBranchGroup"
                                            value={this.state.newBranchGroup}
                                            onChange={this.onChangeNewBranchGroup}/>
                                    </Col>
                                </Form.Group>
                                <ButtonToolbar>
                                    <Button className="ml-auto" variant="success" onClick = { this.handleSaveClick }>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    
                                    <Button  href="/BranchGroup" variant="danger" onClick={ this.handleCloseClick }>Back</Button>
                                </ButtonToolbar>
                           </Card.Body>
                        </Card>
                        </Container>
                    </div>


                )
        }

}

export  default BranchGroupCreate