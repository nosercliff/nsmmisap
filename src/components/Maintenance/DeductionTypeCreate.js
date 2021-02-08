import axios from 'axios';
import React, { Component } from "react";
import { AppConfiguration } from "read-appsettings-json"
import { Button, ButtonToolbar, Card, Col, Container, Form, Row } from "react-bootstrap";
import Banner from "../Nav/Banner";
import { Alert } from 'reactstrap';

class DeductionTypeCreate extends Component {
                        constructor() {
                            super()
                            this.state = {
                                selected:[],
                                deductionTypeList: [],
                            selectedDeductionType: "",
                            selectedDeductionTypeId: "",
                            Show:false,
                            Message:"",
                            Color:"",
                            Fade:true,
                            }

                            this.textInput = React.createRef();
                        }
                        handleCoverChangeDeductiontype = this.handleCoverChangeDeductiontype.bind(this)

    componentDidMount(){
        this.GetDeductiontype()

    }

    handleChange(){
        this.state.selectedDeductionType = this.textInput.current.value;
    }

    handleCoverChangeDeductiontype(e){
        if(e.length > 0) {
            this.state.selectedDeductionType = e[0].name
            this.state.selectedDeductionTypeId = this.GetDeductiontypeId(e[0].name)
         }
         else
                 {
                this.state.selectedDeductionType = ""
                this.state.selectedDeductionTypeId = ""
                }
    }

    GetDeductiontype() {
        const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2", 
            "UserId":"1",
            "Name":""
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/GetDeductionTypes", typeParams
            )
            .then(res =>{
                const data = res.data;
                console.log(data)
                this.setState({deductionTypeList: data.deductionTypes});
            })
    }

    handleSaveClick = event => {
        console.log(this.state.selectedDeductionType);
        console.log(this.state.textInput);
       const typeParams = {
            "IpAddress":"0.0.0.0",
            "ClientId":"2", 
            "UserId":"1",
            "Name":this.state.selectedDeductionType
        };
        axios
            .post(
                AppConfiguration.Setting().noserapiendpoint + "Maintenance/AddDeductionType", typeParams
            )
            .then(res => {
                const data = res.data;
                console.log(res.data)
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
            <div>
            <Banner />
                <Container className="mt-5">
                    <Card>
                        <Card.Header>Deduction Type - Create</Card.Header>
                        <Card.Body>
                            <Form onSubmit={ this.onSubmitClick } ref={form => this.form = form}>
                                <Alert color="success" isOpen={this.state.show} color={this.state.Color} fade={this.state.Fade}>
                                    {this.state.Message}
                                </Alert>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Col sm={12}>
                                    <Form.Control type="text" placeholder="Enter New Deduction Type" ref={this.textInput} onChange={() => this.handleChange()} autoComplete="off" />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Col>
                                    <ButtonToolbar sm={12}>
                                        <Button variant="success" className="ml-auto" onClick={this.handleSaveClick}>
                                            Save
                                        </Button>&nbsp;&nbsp;
                                            <Button variant="danger" href="/DeductionType">
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

export  default DeductionTypeCreate