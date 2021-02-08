import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer
}
from '../../noser-hris-component';

class PhilHealthTable extends Component {
    constructor() {
        super()
        this.state = {
            userinfo: [],
            isLoading: true,
            AlertType: "",
            Show: false,
            Message: "",
            Color: "",
            Fade: true,
            phicList:[]
        }
    }
    componentDidMount() {
        this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
       this.GetPHIC()
    }

    GetPHIC() {
        const phicParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId,
        };

        axios.post(AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetPHICBrackets",  phicParams)
        .then(res => {
             const data = res.data;
             this.setState({ phicList: data.brackets });
         })
    }


    render() {
       
        const columns3 = [
            {
                dataField: 'monthlyBasicSalary',
                text: 'MONTHLY BASIC SALARY '
            },
            {
                dataField: 'monthlyPremium',
                text: 'MONTHLY PREMIUM',
                editable: false
            },
            {
                dataField: 'personalShare',
                text: 'PERSONAL SHARE',
                editable: false
            },
            {
                dataField: 'employeerShare',
                text: 'EMPLOYER SHARE',
                editable: false
            }
        ] 
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

         
       
        /* const dtr2 = [
            {"monthlybasic" : "10,000.00 and below", "monthly premium" : "275.00", "personal share" : "137.50", "employer share" : "137.50"},
            {"monthlybasic" : "10,000.01 to 39,999.99", "monthly premium" : "275.02 to 1,099.99", "personal share" : "137.51 to 549.99", "employer share" : "137.51 to 549.99"},
            {"monthlybasic" : "40,000.00 and above", "monthly premium" : "1,100.00", "personal share" : "550.00", "employer share" : "550.00"},
        ]  */
        return(
            <div >
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>PHILHEALTH CONTRIBUTION TABLE</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <BootstrapTable
                                keyField = "month"
                                data = { this.state.phicList }
                                columns = { columns3 }
                                //selectRow = { selectRow }
                                cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                />
                            </Form.Group>&nbsp;&nbsp;
                            <ButtonToolbar sm={12}>
                                <Button variant="danger" href="/home">
                                Close
                            </Button>
                            </ButtonToolbar>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }

}



export  default PhilHealthTable