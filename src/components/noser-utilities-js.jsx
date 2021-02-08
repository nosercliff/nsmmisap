import axios from 'axios'
import moment from 'moment';
import ReactDOM from "react-dom";
import React, {Component } from "react"
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import {Redirect, NavLink, useHistory} from 'react-router-dom';
import { AppConfiguration } from "read-appsettings-json";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Alert } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import BootstrapTable, {TableHeaderColumn} from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { Nav, Navbar, NavDropdown, Button, ButtonToolbar, Card, Form, Col, Row,Container, Tabs, Tab, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import {CipherString} from './noser-sec'
import Banner from './noser-menu'
import {ProtectedRoute} from './noser-route'

import './noser-utilities-css.css'
import img from './images/159.svg'

const Noser = {
    TableHeader:function TableHeader(props){
        return <h6 style={{ 
                        borderRadius: '0.25em', 
                        textAlign: 'left', 
                        color: 'white',
                        backgroundColor:'grey', 
                        border: '1px solid #ccc', 
                        padding: '0.5em',
                        height:'0',
                        margin:'-11px',
                        marginLeft: "0.3px",
                        display:'none'
                }}>{props.title}</h6>
    }
};
const NoserLoading = ({show,text}) =>{
    const showHideClassName = show ? "noser-modal display-block" : "noser-modal display-none"
    //const showCaption = text==undefined ? "Please wait . . ." : text
        return (<div className={showHideClassName}>
                    <div className="noser-modal-main">
                        <div className="noser-img-loader-conatianer"><img src={img}/></div>
                        <h6 style={{fontWeight:'bold'}}>Please wait . . .</h6>
                    </div>
                </div>)
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

export { React, Component, ReactDOM, Redirect, NavLink, useHistory, BrowserRouter, Route, Switch, axios, moment, AppConfiguration, CipherString,
    BootstrapTable, paginationFactory, cellEditFactory, Type, TableHeaderColumn,
    DatePicker, TimePicker, Typeahead, Alert,Nav, Navbar, NavDropdown, Button, ButtonToolbar, Card, Form, Col, Row,Container, Tabs, Tab, Modal, Dropdown, DropdownButton,
    Banner,ProtectedRoute, Noser, NoserLoading, sizePerPageRenderer
};