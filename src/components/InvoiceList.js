import React, { Component, PropTypes } from 'react';
import  InvoiceRow  from './InvoiceRow';

const log = console.log.bind(console, 'InvoiceList->');

export default class InvoiceList extends Component {

    render() {
        const { invoices, onCreateNew, customers, onInvoiceSelect } = this.props;
        const items = invoices.map((item, index) => {
           return  <InvoiceRow
               customers={customers}
               onInvoiceSelect={onInvoiceSelect}
               key={item.id}
               index={index}
               invoice={item} />
        });

        return (<div className="mt10">
            <h1>Invoices</h1>
            <div className="row">
                <div className="col-lg-2">
                    <button className="btn" onClick={onCreateNew}>Add invoice</button>
                </div>
            </div>
            <hr/>
            <div className="row mt20">
                <div className="col-lg-1"></div>
                <div className="col-lg-6 h2">
                    <strong>Customer</strong>
                </div>
                <div className="col-lg-2 h2">
                    <strong>Discount</strong>
                </div>
                <div className="col-lg-2 h2">
                    <strong>Total</strong>
                </div>
                <div className="col-lg-1">
                </div>
            </div>
            <ul>
                {items}
            </ul>
        </div>);
    }
}