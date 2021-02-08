
import {
    React,Component,BootstrapTable,
    paginationFactory,Button, ButtonToolbar, Card, Modal,
    Form, Col, Row, axios, Container, Banner, Typeahead, TimePicker,
    cellEditFactory, Type, moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
} 
from '../../../noser-hris-component';



class BreakTimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getBreaktimeList: [],
        } 
    }

   /*  handleSearchClick = event => {
       // this.setState({ restList: rest }); 
    }
    

    handleCreateClick = event => {
        alert("handleCreateClick");
    }

    handleCloseClick = event => {
        alert("handleCloseClick"); 
    }

    handleSaveClick = event => {
        alert("handleSaveClick");
    }

    handleSubmit = event => {
        alert("handleSubmit");
        event.preventDefault();
    } */

    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        this.getBreaktimeTemplate();

         console.log("Get Breaktime Param From Edit Work Schedule  " + this.props.selectedBraktimeListValue);
         console.log(this.props.selectedBraktimeListValue);
        
    }

    getBreaktimeTemplate(){
        const getParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        }

        axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Timekeeping/GetBreaktime", getParams)
            .then(res => {
                console.log("Get Breaktime List ");
                console.log(res.data);
                this.setState({
                    getBreaktimeList : res.data.breaktimes
                })
            })
    }
    
    handleModalClose = (e) =>{
        var obj = {}
        var selectedBreaktimeList=[]
        this.state.getBreaktimeList.map(function(item,i){
            
            if(item.IsModified===1)
            {
                obj ={
                    breaktimeId : item.id,
                    startTime : "00:00",
                    endTime : "00:00"
                }
                selectedBreaktimeList.push(obj)
                
            }
        })
        console.log(selectedBreaktimeList);
        this.props.setConsole(selectedBreaktimeList)
    }

        render() {


            const columnBreakTime = [
                {
                    dataField: 'description',
                    text: 'Breaktime Template'
                },
                {
                    dataField: 'minutes',
                    text: 'm/h'
                },
                {
                    dataField: 'paid',
                    text: 'Paid'
                },
    
            ]
    
         

            const selectRow = {
                mode: 'checkbox',
                clickToSelectAndEditCell: true,
                onSelect: (row, isSelect, rowIndex, e) => {
                    this.state.getBreaktimeList.map(function(item,i){
                       
                        if(item.id===row.id)
                            item.IsModified = isSelect ? 1 : 0
                            console.log(item.IsModified)
                    })
                 }
            };
    
            const rowEvents = {
                onClick: (e, row, rowIndex) => {
                  //alert(e.row);
                }
            };
    
    
            /* const rest = [
                {"breaktime" : "Coffee - AM", "m/h" : "15m", "paid" : "Paid"},
                {"breaktime" : "Rest - PM", "m/h" : "2hr", "paid" : "Unpaid"},
                {"breaktime" : "Coffee - PM", "m/h" : "15m", "paid" : "Paid"},
                {"breaktime" : "Lunch / Dinner", "m/h" : "1hr", "paid" : "Paid"}
                ] */
    
                return(
                    <Modal
                        {...this.props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Select Breaktime:
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mt-5 container">
                                <Form>
                                <div className="mt-5">
                                <BootstrapTable
                                keyField = "id"
                                data = { this.state.getBreaktimeList }
                                columns = { columnBreakTime }
                                selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                />
                                <ButtonToolbar>
                                    <Button className="ml-auto" variant="danger" onClick={this.handleModalClose}>Close</Button>
                                </ButtonToolbar>
                            </div>
                                </Form>
                            </div>
                        </Modal.Body>
                    </Modal>
                )
        }

}

export  default BreakTimeModal