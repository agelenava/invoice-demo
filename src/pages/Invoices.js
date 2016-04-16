import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState, push } from 'redux-router';
import { bindActionCreators } from 'redux';
import { retrieveAll, createNew } from '../actions/invoiceAction';
import {  retrieveAll as retrieveAllCustomers } from '../actions/customerAction';
import InvoiceList from '../components/InvoiceList';

const log = console.log.bind(console, 'Invoices ->');

class Invoices extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        invoices: PropTypes.array,
        pushState: PropTypes.func
    };

    componentDidMount() {
        this.retrieveData();
    };

    onCreateNew = () => {
        this.props.dispatch(createNew());
    };

    onInvoiceSelect = (id) => {
        this.props.dispatch(push(`/invoice/${id}`));
    };

    render() {
        const { invoices, customers } = this.props;

        return (<InvoiceList
            onInvoiceSelect={this.onInvoiceSelect}
            customers={customers}
            onCreateNew={this.onCreateNew}
            invoices={invoices} />);
    }

    retrieveData = () => {
        this.props.dispatch(retrieveAll());
        this.props.dispatch(retrieveAllCustomers());
    };
}

export default connect(
    state => {
        return {
            invoices     : state.invoices.all,
            customers    : state.customers.all
        }
    },
    dispatch => {
        return {dispatch, pushState: bindActionCreators(pushState, dispatch)}
    }
)(Invoices)