//EXTERNAL REACT COMPONENTS
import axios from 'axios'
import moment from 'moment';
import ReactDOM from "react-dom";
import Helmet from 'react-helmet';
import { Alert } from 'reactstrap';
import TimePicker from 'rc-time-picker';
import {Redirect, NavLink} from 'react-router-dom';
import DatePicker from "react-datepicker";
import React, {Component } from "react"
import { Typeahead } from 'react-bootstrap-typeahead';
import BootstrapTable from "react-bootstrap-table-next";
import { AppConfiguration } from "read-appsettings-json";
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { Button, ButtonToolbar, Card, Form, Col, Row,Container, Tabs, Tab, Modal, Dropdown, DropdownButton, Accordion } from "react-bootstrap";
import {CipherString} from './noser-sec'
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Banner from '../src/components/Nav/Banner'
import { DropdownSubmenu, NavDropdownMenu} from "react-bootstrap-submenu";
import NoserAuthenticate from './authenticate'
import LeaveModal from "../src/components/Timekeeping/Employee/LeaveModal"
//CSS

import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './noser-hris.css';

//IMAGES
import img from './icon/159.svg'
import img_401 from './icon/401-unauthorized-error.jpg'

const NoserPageTitle = ({ title }) => {
    var defaultTitle = '⚛️ NOSER SAP Web Interface';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};
const username=""
const NoserHrisUser = ({name}) =>{
    const defaultname = name ? username : name 
    return (
        <div style={{color:"#333",paddingLeft:'4px',fontWeight:'bold'}}>Welcome : {defaultname}</div>
    );
}

const NoserLoading = ({show,text}) =>{
    const showHideClassName = show ? "noser-modal display-block" : "noser-modal display-none"
    const showCaption = text==undefined ? "Please wait . . ." : text
        return (<div className={showHideClassName}>
                    <div className="noser-modal-main">
                        <div className="noser-img-loader-conatianer"><img src={img}/></div>
                        <h6 style={{fontWeight:'bold'}}>{showCaption}</h6>
                    </div>
                </div>)
};

const Noser = {
    TableHeader:function TableHeader(props){
        return <h6 style={{ 
                        borderRadius: '0.25em', 
                        textAlign: 'left', 
                        color: 'white',
                        backgroundColor:'grey', 
                        border: '1px solid #ccc', 
                        padding: '0.5em',
                        height:'40px',
                        margin:'-11px',
                        marginLeft: "0.3px",
                }}>{props.title}</h6>
    }
};
const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
    }) => (
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

export {React,Component,ReactDOM,Helmet,BootstrapTable,
    paginationFactory,Type,Button, ButtonToolbar, Card, Alert, Tabs, Tab,
    Form, Col, Row, axios, Typeahead, TimePicker, Container, Modal,
    cellEditFactory ,moment, DatePicker, Redirect, NavLink, AppConfiguration,
    Nav, Navbar, NavDropdown, DropdownSubmenu, NavDropdownMenu, Banner,
    NoserAuthenticate,CipherString, Noser, NoserPageTitle, NoserLoading, sizePerPageRenderer, img_401,
    LeaveModal, Dropdown, DropdownButton, ToolkitProvider, CSVExport, Accordion
};

/*
const Noser = {
    PreLoader:function PreLoader(props){
        const showHideClassName = props.show ? "noser-modal display-block" : "noser-modal display-none";
        var showCaption = props.caption==undefined ? "Processing your request..." : props.caption;
        return <div className={showHideClassName}>
                    <div className="noser-modal-main">
                        <h5 style={{textAlign:'center',marginTop:'30px',color:'#0860CC'}}>{showCaption}</h5>
                        <div className="noser-img-loader-conatianer"><img src={img}/></div>
                    </div>
                </div>
    }
};
export {Noser};
*/



