import {
    React,Component,BootstrapTable, Type,
    paginationFactory,Button, ButtonToolbar, Card,
    Form, Col, Row, Container, axios, Typeahead, Banner, TimePicker,
    cellEditFactory ,moment, NavLink, Alert, AppConfiguration,
    NoserLoading, Noser, sizePerPageRenderer, DatePicker
} 
from '../../noser-hris-component';
import type from 'react-bootstrap-table2-editor';

class PendingJobOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo        :   [],
            isloading       :   false,
            isshow          :   false,
            alerttype       :   "",
            message         :   "",
            color           :   "",
            fade            :   true,
            

            selected: [],
            jobOfferList:[],
            jobOfferListGrid:[],
            selectedClient:"",
            selectedClientId:"",
            clientList:[],
            selectedFullName:"",
            selectedFullNameId:"",
            positionId:"",
            position:"",
            referenceNo:"",
            selectedApplicationFormId:"",
            status:"",
            statusId:"",
            statusList:[
                {"name":"ALL","id":"0"},
                {"name":"FOR APPROVAL","id":"17"},
                {"name":"APROVED","id":"15"},
            ]



        }
    }

    componentDidMount(){
        const sleep = (milliseconds) => {return new Promise(resolve => setTimeout(resolve, milliseconds))}
            this.state.userinfo = JSON.parse(sessionStorage.getItem("userData"))
        // this.GetJobOffers();
        this.getClient();
        //this.getStatus();
        sleep(1000).then(() => {
        this.setState({isLoading:false})})
    }

    handleChangeClient= (e) => {
        console.log("appId")
        console.log( this.state.selectedApplicationFormId)
        if(e.length == 0) {
            this.state.selectedClientName=""
            this.state.selectedClientId=""
            return
        } 
        this.state.selectedClientId = e[0].id
        this.state.selectedClientName = e[0].name
        
        // this.GetJobOffers(e[0].applicationFormId);
        this.GetJobOffers();
        this.setState({isloading:false,})
    }

    getClient = async () => {
        console.log("getClient");
        const clientParams = {
            "IpAddress":"0.0.0.0",
           "ClientId":this.state.userinfo.clientId,
            "UserId":this.state.userinfo.userId
        }

        await axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Client/GetClientList", clientParams)
                .then(res => {
                    const data = res.data;
                    console.log("Get 5");
                    console.log(res.data); 
                    this.setState({clientList : data.clients})
                })
    } 
    
    handleCoverChangeFullName = (e) => {
        if(e.length == 0) {
            this.setState   ({
                selectedFullName:"",
                positionId : "", 
                referenceNo: "",
                selectedApplicationFormId:""
            })
            return
            } 
                this.setState({isloading:true})
                this.setState({
                selectedFullName : e[0].memberName,
                referenceNo : e[0].referenceNo,
                positionId : e[0].positionId,
                selectedApplicationFormId : e[0].applicationFormId
            })
                
        this.setState({isloading:false,})
    
       
    }   

    handleCoverChangeStatus= (e) => {
        if(e.length == 0) {
            this.state.status=""
            this.state.statusId=""
            return
        } 
        this.state.status = e[0].name
        this.state.statusId = e[0].id
        
        
        this.setState({isloading:false,})
    }

   

    GetJobOffers = async () =>{
        this.setState({ jobOfferList:[]});
        const jobParams = {
            "IpAddress":"0.0.0.0",
            "UserId":this.state.userinfo.userId,
            "ClientId":this.state.selectedClientId,
            "ReferenceNo":this.state.referenceNo ,
            "ApplicationFormId":this.state.selectedApplicationFormId,
            "PositionId":this.state.positionId,
            "StatusId":this.state.statusId
        };
        console.log(jobParams)
        await axios
            .post(AppConfiguration.Setting().noserapiendpoint + "Recruitment/GetJobOfferForApprovals",  jobParams)
            .then(res => {
                const data = res.data;
                 console.log("jobParams1");
                console.log(data);
                this.setState({ jobOfferListGrid: data.jobOffers, isloading:false});
                
            })
    }

   
    
    
    handleSearchClick = event => {
        this.GetJobOffers();
        
        }

    render() {
        const columns1 = [
            {
                dataField: 'memberName',
                text: 'FULL NAME',
                headerStyle : () => {
                    return { width  : "35%" };
                }
                
            },
            {
                dataField: 'client',
                text: 'CLIENT',
                headerStyle : () => {
                    return { width  : "35%" };
                }
            },
            {
                dataField: 'location',
                text: 'BRANCH',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            {
                dataField: 'position',
                text: 'JOB POSITION',
                headerStyle : () => {
                    return { width  : "30%" };
                }
                
            },
            {
                dataField: 'workingDaysPerYear',
                text: 'SALARY OFFERED',
                headerStyle : () => {
                    return { width  : "30%" };
                }
            },
            // {
            //     dataField: 'status',
            //     text: 'STATUS',
            //     headerStyle : () => {
            //         return { width  : "25%" };
            //     }
            // },
            {
                dataField: 'action',
                text: 'ACTION',
                editable:false,
                formatter   :   (cell, row, isSelect) => {
                    if(row) 
                        return (
                            <NavLink to={{pathname:"/PendingJobOfferEdit",params:{data:row} }}>
                                <Button variant="secondary"
                                href="/PendingJobOfferEdit"
                                >View</Button>
                            </NavLink>
                        );
                    },
                headerStyle : () => {
                    return { width  : "20%" };
                }
                
            }] 
       
        
        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        return(
            <div>
                <Banner />
                    <Container className="mt-5">
                        <Card>
                            <Card.Header>JOBOFFER (FOR APPROVAL)</Card.Header>
                            <Card.Body>
                                <Form>
                                <Alert isOpen={this.state.isshow} color={this.state.color} fade={this.state.fade} className={this.state.isshow ? 'display-block' : 'display-none'}>
                                        <div className={this.state.color}></div> 
                                        {this.state.message}
                                    </Alert>
                                    <Form.Row>
                                         <Col sm={12} className="mt-3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleChangeClient}
                                                options={this.state.clientList}
                                                placeholder=" SELECT CLIENT"
                                            />
                                        </Col>
                                        <Col sm={12} className="mt-3">
                                            <Typeahead
                                                labelKey='memberName'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeFullName}
                                                options={this.state.jobOfferListGrid}
                                                type="text" 
                                                placeholder="FULL NAME"
                                            /> 
                                        </Col>
                                         <Col sm={12} className="mt-3">
                                            <Typeahead
                                                labelKey='name'
                                                id="basic-example"
                                                onChange={this.handleCoverChangeStatus}
                                                options={this.state.statusList}
                                                type="text" 
                                                placeholder="STATUS"
                                            /> 
                                        </Col> 
                                        
                                    </Form.Row>
                                    
                                    <ButtonToolbar sm={12} className="mt-3">
                                        <Button variant="primary" className="ml-auto" onClick={this.handleSearchClick}>
                                            Search
                                        </Button>&nbsp;&nbsp;
                                    </ButtonToolbar>
                                    <div className="mt-5">
                                        <BootstrapTable
                                        keyField = "id"
                                        data = { this.state.jobOfferListGrid }
                                        columns = { columns1 }
                                        //selectRow = { selectRow }
                                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                                        /> 
                                    </div>
                                        
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                    <NoserLoading show={this.state.isloading} />
            </div> 
            
        )
    }
}

export default PendingJobOffer;