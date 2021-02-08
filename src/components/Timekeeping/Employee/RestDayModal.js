import React, { Component } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Button, ButtonToolbar, Card, Form, Col, Row, Modal } from "react-bootstrap";

class RestDayModal extends Component {

    constructor() {
        super()
        this.state = {
            resdayDataList: []
        }
    }

    componentDidMount(){
        this.restDayData();
        
    } 


    restDayData(){
        const rest = [
            {"restday" : "Sunday", },
            {"restday" : "Wednesday", },
            
        ]
        this.setState({ resdayDataList: rest });
    }



    render() {
        const columnRestDay = [
            {
                dataField: 'restday',
                text: 'Rest Day'
            },
           ]

        const selectRow = {
            mode: 'checkbox',
            //clickToSelect: true,
            clickToSelectAndEditCell: true
        };

        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Select Rest Day:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-5 container">
                        <Form>
                        <div className="mt-5">
                        <BootstrapTable
                        keyField = "id"
                        data = { this.state.resdayDataList }
                        columns = { columnRestDay}
                        selectRow = { selectRow }
                        cellEdit = { cellEditFactory({ mode: 'dbclick', blurToSave: true }) }

                        />
                        <ButtonToolbar>
                            <Button className="ml-auto" variant="danger" onClick={ this.handleCloseClick }>Close</Button>
                        </ButtonToolbar>
                    </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

}

export  default RestDayModal