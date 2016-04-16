import React, { Component, PropTypes } from 'react';

const log = console.log.bind(console, 'ProductList->');

export default class ProductList extends Component {

    render() {
        const { products } = this.props;
        const items = products.map((item, index) => {
            return  <div className="row mt20">
                <div className="col-lg-1">{index+1}</div>
                <div className="col-lg-6">
                    {item.name}
                </div>
                <div className="col-lg-2">
                    {item.price.toFixed(2)}
                </div>
            </div>
        });

        return (<div className="mt10">
            <h1>Products</h1>
            <hr/>
            <div className="row mt20">
                <div className="col-lg-1"></div>
                <div className="col-lg-6">
                    <strong>Name</strong>
                </div>
                <div className="col-lg-2">
                    <strong>Price</strong>
                </div>
                <div className="col-lg-2">

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