import axios from 'axios';
import React, { Component } from "react";
import { AppConfiguration } from "read-appsettings-json"
import { Button, ButtonToolbar, Card, Col, Container, Form, Row } from "react-bootstrap";
import Banner from "../Nav/Banner";
import { Alert } from 'reactstrap';

class InclusionTypeCreate extends Component {
                constructor() {
                    super()
                    this.state = {
                    selected: [],
                    inclusionTypeList: [],
                    selectedInclusionType: "",
                    selectedInclusionTypeId: "",
                    Show: false,
                    Message: "",
                    Color: "",
                    Fade: true
                    }
                    this.textInput = React.createRef();
                }

    componentDidMount(){
        this.GetInclusionType()
    }

    handleChange() {
        this.state.InclusionType = this.textInput.current.value;
    }

    handleChangeInclusion(e) {
        if(e.length > 0) {
            this.state.selectedInclusionType = e(0).name
            this.state.selectedInclusionTypeId = this.GetInclusiontypeId(e[0].name)
        }
        else{
            this.state.selectedInclusionType = ""
            this.state.selectedInclusionTypeId = ""
        }
    }

    GetInclusionType(){
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"111",
            "UserId":"35000",
            "Name":""
        };
        axios
        .post(
            AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetInclusionTypes", typeParams
        )
        .then(res =>{
            const data = res.data;
            console.log(res.data)
            this.setState({inclusionTypeList: data.inclusionTypes})
        })
    }

    handleSaveClick = event => {
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"111", 
            "UserId":"35000",
            "Name":this.state.InclusionType
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddInclusionType", typeParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data)
                if(data.status==="1")
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
            <div>
                <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Inclusion Type - Create</Card.Header>
                        <Card.Body>
                            <Form onSubmit={ this.onSubmitClick } ref={form => this.form = form}>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Form.Control type="text" placeholder="Enter New Inclusion Type" ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="danger" href="/InclusionType">
                                            Close
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

export  default InclusionTypeCreate