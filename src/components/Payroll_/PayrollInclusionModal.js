import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class PayrollInclusionModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }

    }
   
    

    render() {

    return(
        
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                 >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payroll Inclusion Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
            <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
        </Modal>
        );
    }

}
export  default PayrollInclusionModal