import axios from 'axios';
import React, { Component } from "react";
import { AppConfiguration } from "read-appsettings-json"
import { Button, ButtonToolbar, Card, Col, Container, Form, Row } from "react-bootstrap";
import Banner from "../Nav/Banner";
import { Alert } from 'reactstrap';

class RegionCreate extends Component {
                        constructor() {
                            super()
                            this.state = {
                                Show:false,
                                Message:"",
                                Color:"",
                                Fade:true,
                            regionList: [],
                            selected : [],
                            selectedRegion: '',
                            selectedRegionId: ''

                            };

                            this.textInput = React.createRef();
                        }

            handleCoverChangeRegion = this.handleCoverChangeRegion.bind(this)

            componentDidMount(){
                this.GetRegion()
            }

            handleChange() {
                this.state.selectedRegion = this.textInput.current.value;
            }

            handleCoverChangeRegion(e){
                if (e.length > 0) {
                    this.state.selectedRegion = e[0].name
                    this.state.selectedRegionId = this.GetRegionId(e[0].name)
                }
                else
                 {
                this.state.selectedProvince = ""
                this.state.selectedProvinceId = ""
                }
            }

            handleSaveClick = event => {
                const regionParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":"2",
                    "UserId":"1",
                    "Name":this.state.selectedRegion
                 };

                 axios
                     .post(
                         AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddRegion",  regionParams
                     )
                     .then(res => {
                         const data = res.data;
                         if(data.status=="1")
                {
                    this.setState(
                        { 
                            show:true,
                            Color:"success",
                            Message:data.message ,
                            Fade:true
                        });
                    
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


            GetRegion() {
                const regionParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":"2",
                    "UserId":"1",
                    "Name":""
                 };

                 axios
                     .post(
                         AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetRegions",  regionParams
                     )
                     .then(res => {
                         const data = res.data;
                         this.setState({ regionList: data.regions });

                     })
            }



         render() {
                return(
                    <div>
                    <Banner />
                        <Container className="mt-5">
                        <Card>
                            <Card.Header>Create Region</Card.Header>
                            <Card.Body>
                            <Form onSubmit={ this.onSubmitClick } ref={form => this.form = form}>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                        {this.state.Message}
                                    </Alert>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                        <Col sm={12}>
                                        <Form.Control type="text" placeholder="Select Region" ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col>
                                        <ButtonToolbar >
                                                <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                                Save
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="danger" href="/region">
                                                Back
                                                </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                           </Card.Body>
                        </Card>
                        </Container>
                    </div>


                )
            }

}

export  default RegionCreate