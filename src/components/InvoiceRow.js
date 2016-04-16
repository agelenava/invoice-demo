import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const log = console.log.bind(console, 'InvoiceRow->');

export default class InvoiceRow extends Component {

    render() {
        const { invoice, customers, onInvoiceSelect, index } = this.props;
        const customerIndex = customers.findIndex(x => { return x.id === invoice.customer_id; });
        const customerName = customerIndex > -1 ? customers[customerIndex].name : '';

        return (<li className="mt10">
            <div className="row">
                <div className="col-lg-1">{index+1}</div>
                <div className="col-lg-6">
                    <strong>{customerName}</strong>
                </div>
                <div className="col-lg-2">
                   {invoice.discount}
                </div>
                <div className="col-lg-2">
                    {(invoice.total || 0).toFixed(2)}
                </div>
                <div className="col-lg-1">
                    <button className="btn" onClick={onInvoiceSelect.bind(this,invoice.id)} >View</button>
                </div>
            </div>
        </li>);
    }
}