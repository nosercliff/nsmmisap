import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next"; 
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row, Container } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { AppConfiguration } from "read-appsettings-json"
import axios from 'axios'
import Banner from "../Nav/Banner"
import { Alert } from 'reactstrap';

class ProvinceCreate extends Component {
            constructor() {
                super()
                this.state = {
                    Show:false,
                    Message:"",
                    Color:"",
                    Fade:true,
                provinceList: [],
                regionList: [],
                selected : [],
                selectedProvince: '',
                selectedProvinceId: '',
                selectedRegion: '',
                selectedRegionId: ''
                };

                this.textInput = React.createRef(); 

            }

            //handleCoverChangeProvince = this.handleCoverChangeProvince.bind(this)
            handleCoverChangeRegion = this.handleCoverChangeRegion.bind(this)

            componentDidMount(){
                this.GetProvince()
                this.GetRegion()
            }

            handleChange() {
                this.state.selectedProvince = this.textInput.current.value;
            }

            handleCoverChangeProvince(selectedOptions){
                    this.state.selectedProvince = this.textInput.current.value;
            }

            handleCoverChangeRegion(e){
                if (e.length > 0) {
                    this.state.selectedRegion = e[0].name
                    this.state.selectedRegionId = this.GetRegionId(e[0].name)
                }
              }

            handleCreateClick = event => {

            }

            handleCloseClick = event => {
                
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
            GetRegionId(name) {
                let regionId = ''
                for (let i = 0; i <= this.state.regionList.length; i++) {
                    if (this.state.regionList[i]["name"] === name) {
                        regionId = this.state.regionList[i]['id'];
                        break;
                    }
                }
                return regionId
            }

            GetProvince() {
                const provinceParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":"2",
                    "UserId":"1",
                    "Region":"",
                    "Name":""
                 };

                 axios
                     .post(
                         AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetProvinces",  provinceParams
                     )
                     .then(res => {
                         const data = res.data;
                         console.log("Test Province");
                         console.log(data);
                         this.setState({ provinceList: data.provinces });
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
                         console.log("TestRegion");
                         console.log(data);
                         this.setState({ regionList: data.regions });
                     })
            }

            handleSaveClick = event => {

                console.log("Before Saving");
                console.log("selectedProvinceId");
                console.log(this.state.selectedProvinceId);
                console.log("textInput");
                console.log(this.state.textInput);

                const provinceParams = {
                    "IpAddress":"0.0.0.0",
                    "ClientId":"2",
                    "UserId":"1",
                    "RegionId": this.state.selectedRegionId,
                    "Name": this.state.selectedProvince
                 };

                 axios
                     .post(
                         AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddProvince",  provinceParams
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

        render() {
                return(
                    <div >
                    <Banner />
                        <Container className="mt-5">
                        <Card>
                            <Card.Header>Create Province</Card.Header>
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
                                        onChange={this.handleCoverChangeRegion}
                                        options={this.state.regionList}
                                        placeholder="Select Region"
                                    />
                                </Col>
                            </Form.Group>
                                    <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col sm={12}>
                                <Form.Control type="text" placeholder="Please Enter Province"
                                ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col>
                                        <ButtonToolbar >
                                                <Button variant="success" className="ml-auto" onClick = { this.handleSaveClick }>
                                                    Save
                                                </Button>&nbsp;&nbsp;
                                                <Button variant="danger" href="/province">
                                                Back
                                                </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Group>
                              </Form> 
                           </Card.Body>
                        </Card>
                        </Container>
                    </div>


                )
        }

}

export  default ProvinceCreate