import React, { Component, PropTypes } from 'react';
import { Input, Label } from 'react-bootstrap';
import * as links from '../constants/routes';

const log = console.log.bind(console, 'InvoiceForm->');

export default class NavBar extends Component {

    render() {
        const { onNavigate } = this.props;

        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Invoice App</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="#" onClick={onNavigate.bind(this, links.LINK_TO_PRODUCTS)}>Products</a></li>
                            <li><a href="#" onClick={onNavigate.bind(this, links.LINK_TO_CUSTOMERS)}>Customers</a></li>
                            <li><a href="#" onClick={onNavigate.bind(this, links.LINK_TO_INVOICES)}>Invoices</a></li>
                        </ul>
                    </div>
                </div>
            </nav>);
    }
}