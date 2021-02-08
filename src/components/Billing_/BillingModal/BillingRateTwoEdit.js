import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class BillingRateTwoEdit extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,

            selectOtherField : [
                {
                    "name" : "Selected Other Field One"
                },
                {
                    "name" : "Selected Other Field Two"
                },
                {
                    "name" : "Selected Other Field Three"
                },

            ],
            toBeIncludedList : [],
            adminFee:'',
        }
    }

    componentDidMount(){
        /* this.setState({isLoading:true,loadingText:"Loading client list..."}) */
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.props.onBillingRateTwoEditRef(this)
    }

    componentWillUnmount() {
        this.props.onBillingRateTwoEditRef()
    }

    initialize = (e) => {
         this.setState({
             isloading       :   false,
             isshow          :   false,
             alerttype       :   "",
             message         :   "",
             color           :   "",
             fade            :   true,
             toBeIncludedList : [],
             adminFee : '',
         })
 
         this.state.clientName      =   e.clientNameFromParent
         this.state.clientId        =   e.clientIdFromParent
         this.state.locationName    =   e.locationFromParent
         this.state.locationId      =   e.locationIdFromParent
         this.state.costCenter      =   e.costCenterFromParent
         this.state.costCenterId    =   e.costCenterIdFromParent
         this.state.areaName        =   e.areaNameFromParent
         this.state.areaId          =   e.areaIdFromParent
         this.state.templateId      =   e.templateIdFromParent
         this.state.templateName    =   e.templateNameFromParent
         this.state.defaultIdTemplate   =   e.adminFeeIdFromParent
         this.state.defaultNameTemplate     =   e.adminFeeNameFromParent
         this.state.billingId       =   e.billingIdFromParent
         this.state.billingName     =   e.billingNameFromParent
 
         console.log('Template Id')
         console.log(e.templateIdFromParent)
    }

    onChangeOtherField = (e) => {
        if(e.length==0)
        {
            this.setState({selectedToBeIncluded: ''})
            return
        }
        this.state.selectedToBeIncluded = e[0].name
    }

    onSubmitAddToBeIncluded = () => {
        const {toBeIncludedList} = this.state

        const standardBillingOtherTypeObj = {
            "OtherType":this.state.selectedToBeIncluded,
        }

        toBeIncludedList.push(standardBillingOtherTypeObj)
        this.setState({toBeIncludedList: toBeIncludedList})

    }

    IsNumeric(evt){
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /^\d+(.\d+)?$/;
        if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    onChangeAdminFee(e){
        this.setState({adminFee : e.target.value})
    }
    
    onModalClose = () => {
        this.props.onHide();
    }

    render() {

        const columnToBeIncluded = [
            {
                dataField: 'OtherType',
                text: 'To Be Included',
                editable: false,
                headerStyle: () => {
                    return { width: "50%" };
                  }
            },
            {
                dataField: "databasePkey",
                text: "Action",
                editable: false,
                headerStyle: () => {
                    return { width: "50%" };
                },
                formatter: (cell, row, isSelect) => {
                    if (row)
                    return (
                        <Button
                            variant="danger"
                            onClick={e => this.handleChangeDelete(row)
                                
                            }
                            
                        >DELETE</Button>
                    );
                }
            } 
        ]

    return(
        
            <Modal
                {...this.props}
                return
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        BILLING RATE 2 (Edit)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Admin Fees
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control
                                        type="text" 
                                        value={this.state.adminFee}
                                        onChange={this.onChangeAdminFee.bind(this)}
                                        onKeyPress={this.IsNumeric.bind(this)}
                                    />
                                </Col>
                                <Form.Label column sm="1">
                                    %
                                </Form.Label>
                            </Form.Group>
                            <Form.Text className="text-muted mt-4">
                                Other Fields To Be Included
                            </Form.Text>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeOtherField}
                                        options={this.state.selectOtherField}
                                        placeholder="Select Other Field"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={2} controlId="formGridEmail">
                                    <Button variant="success" onClick={this.onSubmitAddToBeIncluded} >ADD</Button>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <BootstrapTable
                                    caption={Noser.TableHeader({title:"Field List"})}
                                    keyField = "id"
                                    data = { this.state.toBeIncludedList }
                                    columns = { columnToBeIncluded }
                                    /* selectRow = { SandardBillingRow } */
                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                    rowClasses="noser-table-row-class"
                                    striped
                                    hover
                                    condensed
                                />
                            </Form.Group>

                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar >
                        <Button variant="success" className="ml-auto" onClick = { this.onSubmitSavePayrollDeductions }>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.onModalClose}>
                            Close
                        </Button>
                    </ButtonToolbar>
            </Modal.Footer>
            <NoserLoading show={this.state.isLoading} text={this.state.loadingText}/>
        </Modal>
        );
    }

}
export  default BillingRateTwoEdit