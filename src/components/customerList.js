import React, { Component, PropTypes } from 'react';

const log = console.log.bind(console, 'CustomerList->');

export default class CustomerList extends Component {

    render() {
        const { customers } = this.props;
        const items = customers.map((item, index) => {
            return  <div className="row mt20">
                <div className="col-lg-1">{index+1}</div>
                <div className="col-lg-6">
                    {item.name}
                </div>
            </div>
        });

        return (<div className="mt10">
            <h1>Customers</h1>
            <hr/>
            <div className="row mt20">
                <div className="col-lg-1"></div>
                <div className="col-lg-6">
                    <strong>Name</strong>
                </div>
                <div className="col-lg-2">

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