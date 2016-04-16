import React, { Component, PropTypes } from 'react';
import { Input, Label } from 'react-bootstrap';

const log = console.log.bind(console, 'InvoiceForm->');

export default class InvoiceForm extends Component {

    productsInput = (row, products) => {

        const options = products.map(item => {
            return  <option key={item.id} value={item.id}>{item.name}</option>;
        });

        return (<Input onChange={this.onProductChange.bind(this,row) } value={row.product_id} type="select" label="Product" placeholder="select">
                    <option value="-1">Select product</option>
                    {options}
                </Input>);
    };

    onQtyChange = (item, e) => {
        const { onQtyChange } = this.props;
        onQtyChange(item, parseInt(e.target.value));
    };

    onProductChange = (item, e) => {
        const { onProductChange, products } = this.props;
        const productId = parseInt(e.target.value);
        onProductChange(item, productId );
    };

    onCustomerChange = (e) =>{
        const { customers, onCustomerChange } = this.props;
        const customerId = parseInt(e.target.value);
        onCustomerChange(customerId);
    };

    onDiscountChange = (e) => {
        const { onDiscountChange } = this.props;
        onDiscountChange(parseInt(e.target.value));
    };

    render() {

        const { invoice, rows, customers, products, onAddRow, onRemoveRow } = this.props;

        const options = customers.map(item => {
            return  <option key={item.id} value={item.id}>{item.name}</option>;
        });

        let qty = 0, price = 0;

        const items = rows.map(item => {
            const pIndex = products.findIndex(itm => {return itm.id === item.product_id; });
            const total = pIndex > -1 ? (products[pIndex].price * item.quantity) : 0;
            qty += item.quantity || 0;
            price += total;

            return (<li key={item.id}>
                <div className="row">
                    <div className="col-lg-8">
                        { this.productsInput(item, products) }
                    </div>
                    <div className="col-lg-1">
                        <div className="form-group">
                            <label className="control-label">Price</label>
                            <span className="row-label">{ pIndex > -1 ? products[pIndex].price : '' }</span>
                        </div>
                    </div>
                    <div className="col-lg-1">
                        <Input onChange={this.onQtyChange.bind(this,item)} value={item.quantity} type="text" label="Quantity" placeholder="qty" />
                    </div>
                    <div className="col-lg-1">
                        <div className="form-group">
                            <label className="control-label">Total</label>
                            <span className="row-label">{ total.toFixed(2) } </span>
                        </div>
                    </div>
                    <div className="col-lg-1">
                        <div className="form-group pt23">
                            <button onClick={onRemoveRow.bind(this,item.id)} className="btn">Remove</button>
                        </div>
                    </div>
                </div>
            </li>);
        });

        return (<div>
                <h1>Invoice #{invoice.id}</h1>
                <hr />
                <div className="row">
                    <div className="col-lg-3">
                        <Input onChange={this.onCustomerChange} value={invoice.customer_id} type="select" label="Customer" placeholder="select">
                            {invoice.customer_id > 0 ? null : <option value="-1">Select customer</option>}
                            {options}
                        </Input>
                    </div>
                </div>
                <div className="">
                    <ul>
                        {items.length === 0 ? <li className="text-muted text-center h3">there are no products</li> : items}

                        <li className="text-right"><button className="btn" onClick={onAddRow}>Add product</button></li>
                    </ul>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-lg-8">
                    </div>
                    <div className="col-lg-2 text-center">
                        <label className="control-label">Total pieces</label>
                        <span className="row-label">{ qty } </span>
                    </div>
                    <div className="col-lg-2">
                        <label className="control-label">Total price</label>
                        <span className="row-label">{ price.toFixed(2) } </span>
                    </div>
                </div>
                <div className="row pt23">
                    <div className="col-lg-8 pt8 text-right">
                        Discount
                    </div>
                    <div className="col-lg-2">
                        <Input onChange={this.onDiscountChange.bind(this)}
                               addonAfter="%"
                               value={invoice.discount} type="text" placeholder="percent" />
                    </div>
                    <div className="col-lg-2 h3">
                        { (price * ((100 - (invoice.discount || 0)) / 100)).toFixed(2) }
                    </div>
                </div>
            </div>)
    }
}