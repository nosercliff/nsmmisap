import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row, Container } from "react-bootstrap";
import axios from 'axios'
import { Typeahead } from 'react-bootstrap-typeahead';
import Banner from "../Nav/Banner"
import { AppConfiguration } from "read-appsettings-json"
import { Alert } from 'reactstrap';

class CityCreate extends Component {
    
    

    constructor(props) {
        super(props);
        this.state = {
            Show:false,
            Message:"",
            Color:"",
            Fade:true,
            provinceList : [],
            selectedProvince : '',
            selectedProvinceId : '',
            cityName : ''
        }

        this.handleCoverChangeCity = this.handleCoverChangeCity.bind(this)
        this.handleCoverChangeProvince = this.handleCoverChangeProvince.bind(this)
        this.txtCityName = React.createRef(); 

    }

    
    

    componentDidMount() {
        
        this.GetProvince()

    }
        
    GetProvince() {
        const cityParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1",
            "Region":"",
            "Name":""
            };
    
            axios
                .post(
                    AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  cityParams
                )
                .then(res => {
                    const data = res.data;
                    console.log("Test Province");
                    console.log(data);
                    this.setState({ provinceList: data.provinces });                 
                })
    }

    handleCoverChangeProvince(e){
        if (e.length > 0) {
            this.state.selectedProvince = e[0].name
            this.state.selectedProvinceId = this.GetProvinceId(e[0].name)
        }
    }

    handleCoverChangeCity(e) {
        //alert("handleCoverChangeCity")
        //alert(event.target.value)
        //alert("handleCoverChangeCity2")        
        this.setState({cityName:  this.txtCityName.current.value})
      }

    handleCreateClick = event => {

        event.preventDefault();

        console.log("ProvinceId")
        console.log(this.state.selectedProvinceId)
        console.log("City Name")
        console.log(this.state.cityName)

        
        const cityParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1",
            "ProvinceId": this.state.selectedProvinceId,
            "Name": this.state.cityName
        };
    
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddCity",  cityParams
            )
            .then(res => {
                const data = res.data;
                console.log("Add City Return Values");
                console.log(data);              
            })
        
    }

    handleCloseClick = event => {   
        
    }

    onSubmitClick= () =>{
        //event.preventDefault();

        console.log("ProvinceId")
        console.log(this.state.selectedProvinceId)
        console.log("City Name")
        console.log(this.state.cityName)

        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2",
            "UserId":"1",
            "ProvinceId": this.state.selectedProvinceId,
            "Name": this.state.cityName
        };
        
        axios
            .post(
                 AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddCity",  typeParams
             )
            .then(res => {
                const data = res.data;
                if(data.status=="1")
                {
                    this.setState(
                        { 
                            holidayName: "",
                            startDate: new Date(),
                            show:true,
                            Color:"success",
                            Message:data.message ,
                            Fade:true
                        });
                    this.refs.holidayType.clear()
                    this.refs.coverage.clear() 
                    this.refs.location.clear() 
                }
                else
                {
                    this.setState(
                        { 
                            show:true,
                            Color:"danger",
                            Message:data.message,
                            Fade:true
                        });
                }
            })
        
    }

    GetProvinceId(name) {
        let provinceId = ''
        for (let i = 0; i <= this.state.provinceList.length; i++) {
            if (this.state.provinceList[i]["name"] === name) {
                provinceId = this.state.provinceList[i]['id'];
                break;
            }
        }
        return provinceId
    }

    GetCityId(name) {
        let cityId = ''
        for (let i = 0; i <= this.state.listCityTown.length; i++) {
            if (this.state.listCityTown[i]["name"] === name) {
                cityId = this.state.listCityTown[i]['id'];
                break;
            }
        }
        return cityId
    }


        render() {
                return(
                    <div>
                    <Banner />
                        <Container className="mt-5">
                        <Card>
                            <Card.Header>Create City</Card.Header>
                            <Card.Body>
                                <Form onSubmit={ this.onSubmitClick } ref={form => this.form = form}>
                                    <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                        {this.state.Message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>                                        
                                        <Typeahead 
                                             labelKey='name'
                                            id="basic-example"
                                            onChange={this.handleCoverChangeProvince}
                                            options={this.state.provinceList}
                                            placeholder="Select Province"
                                        />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                            <Form.Control type="text" placeholder="Enter City/Town name" ref={this.txtCityName} onChange={() => this.handleCoverChangeCity()} />
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <Form.Group as={Row} controlId="formHorizontalEmail">

                            <div className="mt-5">
                                <ButtonToolbar>
                                    <Button className="ml-auto" variant="success" onClick={this.onSubmitClick}>Save</Button>&nbsp;&nbsp;
                                        <Button href="/city"  variant="primary" variant="danger">
                                            Back
                                        </Button>
                                </ButtonToolbar>
                            </div>

                                    {
                                    /*
                                    <Col>
                                        <ButtonToolbar >
                                                <Button variant="success" className="ml-auto" onClick={this.handleCreateClick}>
                                                    Save
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="danger" href="/city"> {onClick={this.handleCloseClick} }
                                                Back
                                                </Button>
                                        </ButtonToolbar>
                                    </Col>
                                    */
                                    }

                                </Form.Group>
                           </Card.Body>
                        </Card>
                        </Container>
                    </div>


                )
        }

}

export  default CityCreate