import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, 
    Form, Col, Row, axios, Typeahead, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, Container, Modal, DatePicker
} 
from '../../../noser-hris-component';

class LeaveModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            AlertType:"",
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            FromDate: new Date(),
            ToDate: new Date(),
            restdayDataList: [],
            leaveList: [],
            getEmployeeLeaveList: [],
            isChecked: "0",
            totaldays: "0",
            reason: "",
            currentrestdateAdded: [],
        }
        
    }

    handleChangeFromDate = date => {
        this.setState({
            FromDate: date
        });
        console.log(this.formatDate(this.state.FromDate));
    };

    

    onChangeDuration = (e) => {
        this.setState({ totaldays: e.target.value} );
    }

    onChangeReason = (e) => {
        this.setState({ reason: e.target.value} );
    }

    componentDidMount(){
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.GetHolidaysList();

        console.log("Get Employee Id From Parent " + this.props.selectedEmployeeIdvalue);
    }


    GetHolidaysList(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }
    
        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetHolidayTypes", getParams)
            .then(res => {
                console.log("Get Holidays List ");
                console.log(res.data);
                /* this.setState({
                    getPayrollPeriodId : res.data.payrollPeriods
                }) */
            })
    
    }


    handleChangeCheckbox(e) {
        let isChecked = e.target.checked ? "1" : "0";
        console.log(isChecked)
        this.setState({
            isChecked: isChecked
        })
        
    }
      
    formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        return month + '/' + day + '/' + year;
      }

    handleChangeToDate = date => {

        this.setState({
            ToDate: date,
        });
    };


    onSubmitAdd = (e) => {

        /* this.setState({restdayDataList: []}) */
        console.log("EmployeeId " + this.props.selectedEmployeeIdvalue);
        const {restdayDataList} = this.state

        const sDate = new Date(this.state.FromDate.getDate()+1 + this.state.FromDate.getMonth()+1 + this.state.FromDate.getFullYear())
        const eDate= new Date(this.state.ToDate.getDate()+1 + this.state.ToDate.getMonth()+1 + this.state.ToDate.getFullYear())
        console.log(eDate-sDate);

        let totaldays = eDate-sDate;
        var restDateDay = []
        /* console.log(totaldays); */

        
        let fromDate = this.formatDate(this.state.FromDate);

        /* let restDay = this.formatDate(this.state.RestDate) */

       /*  const rest = {"date" : restDay} */

       if(fromDate == this.state.currentrestdateAdded){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}

            alert("Date selected already added.")
            /* sleep(1000).then(() => {
                this.setState(
                { 
                    show:true,
                    Color:"danger",
                    Message:"Date selected already added.",
                    Fade:true
                });
            }) */

            
            return;
        }

        this.setState({currentrestdateAdded: fromDate})

            for(let i=0;i<=totaldays;i++)
            {
                

                const obj = {
                    "EmployeeId":this.props.selectedEmployeeIdvalue,
                    "LeaveDate" : fromDate,
                    "Mandays" : totaldays.toString(),
                    "Reason" : this.state.reason,
                    "IsPaid" : this.state.isChecked,
                }

                
                
                restdayDataList.push(obj);

                
            
                
                fromDate = moment(fromDate).add(1, 'day').format('MM/DD/YYYY');
                console.log("fromDate: " + fromDate)
                
                this.setState({ leaveList : obj } );
                console.log("totaldays List: " + this.state.totaldays)
                this.setState({ totaldays : totaldays } );
                this.setState({ restDateDay : restdayDataList } );

                
                
            }
            
            /* this.setState({currentrestdateAdded: fromDate}) */
            
            
            this.props.setConsole(this.state.restdayDataList)

            
            /* console.log("Rest Day Data List: " + restdayDataList)
            console.log("Total Days: " + totaldays) */
        
        /* this.props.setConsole(restdayDataList) */
        
       

    }


    render() {

        const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
            <div className="btn-group" role="group">
                {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                    <button
                        key={ option.text }
                        type="button"
                        onClick={ () => onSizePerPageChange(option.page) }
                        className={ `btn ${isSelect ? 'btn-primary' : 'btn-success'}` }
                    >
                        { option.text }
                    </button>
                    );
                })
                }
            </div>
            );
        const options = {
            sizePerPageRenderer
        };


        const columnRestDay = [
            {
                dataField: 'LeaveDate',
                text: 'Date'
            },
            {
                dataField: 'Mandays',
                text: 'Manday(s)'
            },
            {
                dataField: 'Reason',
                text: 'Reason'
            },
            {
                dataField: 'IsPaid',
                text: 'Paid'
            },
        ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        const minDate = new Date();

        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Select Leave
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-5 container">
                        <Form>

                            <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade} transition={{in: true, timeout: 150}}>
                                {this.state.Message}
                            </Alert>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                From
                                </Form.Label>
                                <Col sm={4}>
                                <DatePicker
                                    ref='FromDate'
                                    selected={this.state.FromDate}
                                    onChange={this.handleChangeFromDate}
                                    value={this.state.FromDate}
                                    dateFormat={"MM/dd/yyyy"}
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                To
                                </Form.Label>
                                <Col sm={4}>
                                <DatePicker
                                    ref='ToDate'
                                    selected={this.state.ToDate}
                                    onChange={this.handleChangeToDate}
                                    value={this.state.ToDate}
                                    dateFormat={"MM/dd/yyyy"}
                                />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                Duration
                                </Form.Label>
                                <Col sm={4}>
                                    <Form.Control 
                                    type="text" 
                                    value={this.state.totaldays}
                                    onChange={this.onChangeDuration}
                                    autoComplete="off"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={6}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Reason for Leave/ Absent" 
                                    value={this.state.reason}
                                    onChange={this.onChangeReason}
                                    autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>


                            <Form.Group>
                                <Form.Check
                                label="Unpaid"
                                onChange={e => this.handleChangeCheckbox(e)}
                                />
                            </Form.Group>

                             <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={6}>
                                    <ButtonToolbar>
                                        <Button className="ml-auto" variant="success" onClick={this.onSubmitAdd}>Add</Button>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>

                            <div className="mt-5">
                                <h4>Applicable Day</h4>
                                <BootstrapTable
                                keyField = "id"
                                data = { this.state.restdayDataList }
                                columns = { columnRestDay}
                                selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                pagination={ paginationFactory(options) }

                                />
                                <ButtonToolbar>
                                    <Button className="ml-auto" variant="danger" onClick={this.props.onHide }>Close</Button>
                                </ButtonToolbar>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

}

export  default LeaveModal
