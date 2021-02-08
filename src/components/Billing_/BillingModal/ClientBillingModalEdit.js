import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker,Dropdown, DropdownButton, props
} 
from '../../../noser-hris-component';


class ClientBillingModalEdit extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isLoading:false,
            loadingText:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            selectAdminFeeType: [
                {
                    "name" : "Admin Fee Type 01",
                    "select" : "Field One"
                },
                {
                    "name" : "Admin Fee Type 02",
                    "select" : "Field Two"
                },
                {
                    "name" : "Admin Fee Type 03",
                    "select" : "Field Three"
                },
            ],
            selectField : [
                {
                    "name" : "Selected Field One"
                },
                {
                    "name" : "Selected Field Two"
                },
                {
                    "name" : "Selected Field Three"
                },

            ],
            adminFeeTypeList : [],
            selectedAdminFeeType : '',

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
            selectedToBeIncluded : '',
        }
    }

    componentDidMount(){
        /* this.setState({isLoading:true,loadingText:"Loading client list..."}) */
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.props.onClientBillingTwoEditRef(this)
    }

    componentWillUnmount() {
        this.props.onClientBillingTwoEditRef()
    }

   initialize = (e) => {
        this.setState({

            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,

            checkboxAdminFee   :   false,
            checkFixAmount  :   false,
            disableAdminFee :   false,
            disablePerDay   :   false,
            checkAdminFee   :   false,
            adminFee        :   '',
            perDay          :   '',
            perDay          :   '',
            payrollFieldsList               :   [],
            otherPayrollFieldsList          :   [],
            otherAdditionalFields           :   [],
            otherPayrollTableList           :   [],
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

    onChangeField = (e) => {
        if(e.length==0)
        {
            this.setState({selectedAdminFeeType: ''})
            return
        }
        this.state.selectedAdminFeeType = e[0].name
    }

    onChangeOtherField = (e) => {
        if(e.length==0)
        {
            this.setState({selectedToBeIncluded: ''})
            return
        }
        this.state.selectedToBeIncluded = e[0].name
    }
    
    onSubmitAddAdminFeeType = () => {
        const {adminFeeTypeList} = this.state

        const standardBillingAdminFeeTypeObj = {
            "AdminFeeType":this.state.selectedAdminFeeType,
        }

        adminFeeTypeList.push(standardBillingAdminFeeTypeObj)
        this.setState({adminFeeTypeList: adminFeeTypeList})


    }

    onSubmitAddToBeIncluded = () => {
        const {toBeIncludedList} = this.state

        const standardBillingOtherTypeObj = {
            "OtherType":this.state.selectedToBeIncluded,
        }

        toBeIncludedList.push(standardBillingOtherTypeObj)
        this.setState({toBeIncludedList: toBeIncludedList})


    }

    onModalClose = () => {
        this.props.onHide();            
    }

    render() {

        const columnAdminFeeTypeList = [
            {
                dataField: 'AdminFeeType',
                text: 'Admin Fee Type',
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
                        CLIENT BILLING (Edit)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeAdminFeeType}
                                        options={this.state.selectAdminFeeType}
                                        placeholder="Select Admin Fee Type"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={2} controlId="formGridEmail">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Percentage" 
                                        onChange={e => this.handleChangeCheckboxPercentage(e)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={1} controlId="formGridEmail">
                                    <Form.Control 
                                        type="text" 
                                        ref="Percentage"
                                        name="Percentage"
                                        value={this.state.Percentage}
                                        onChange={this.onChangePercentage}
                                        autoComplete="off" 
                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={2}  controlId="formBasicCheckbox">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Fix Amount" 
                                        onChange={e => this.handleChangeCheckboxFixAmount(e)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} sm={1} controlId="formGridEmail">
                                    <Form.Control 
                                        type="text" 
                                        ref="FixAmount"
                                        name="FixAmount"
                                        value={this.state.FixAmount}
                                        onChange={this.onChangeFixAmount}
                                        autoComplete="off" 
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Text className="text-muted mt-5">
                                Add'l Field To Admin Fee Type
                            </Form.Text>
                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                                    <Typeahead
                                        labelKey='name'
                                        id="basic-example"
                                        onChange={this.onChangeField}
                                        options={this.state.selectField}
                                        placeholder="Select Field"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} sm={2} controlId="formGridEmail">
                                    <Button variant="success"  onClick={this.onSubmitAddAdminFeeType}>ADD</Button>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <BootstrapTable
                                    caption={Noser.TableHeader({title:"Field List"})}
                                    keyField = "id"
                                    data = { this.state.adminFeeTypeList }
                                    columns = { columnAdminFeeTypeList }
                                    /* selectRow = { SandardBillingRow } */
                                    cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                    rowClasses="noser-table-row-class"
                                    striped
                                    hover
                                    condensed
                                />
                            </Form.Group>

                            <Form.Text className="text-muted mt-5">
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
                                    <Button variant="success" onClick={this.onSubmitAddToBeIncluded}>ADD</Button>
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
export  default ClientBillingModalEdit