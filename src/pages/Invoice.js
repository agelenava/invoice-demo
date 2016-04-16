import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import { retrieve,
    retrieveItems,
    addRow,
    saveItem,
    removeRow,
    qtyChange,
    customerChange,
    discountChange,
    itemProductChanged,
    itemQtyChange} from '../actions/invoiceAction';
import { retrieveAll as retrieveAllCustomers  } from '../actions/customerAction';
import { retrieveAll as retrieveAllProducts } from '../actions/productsAction';
import InvoiceForm from '../components/InvoiceForm';

const log = console.log.bind(console, 'Invoice ->');

class Invoice extends Component {
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

    onAddRow = () => {
        const { invoice, dispatch } = this.props;
        dispatch(addRow(invoice.id));
    };

    onCustomerChange = (id) => {
        const { invoice, dispatch } = this.props;
        dispatch(customerChange(invoice, id));
    };

    onRemoveRow = (id) => {
        const { invoice, dispatch, products } = this.props;
        dispatch(removeRow(invoice, id, products));
    };

    onProductChange = (item, id) => {
        const { invoice, dispatch, products, items } = this.props;
        dispatch(itemProductChanged(invoice, item, id, products, items));
    };

    onQtyChange = (item, value) => {
        const { invoice, dispatch, products, items } = this.props;
        dispatch(itemQtyChange(invoice, item, value, products, items ));
    };

    onDiscountChange = (value) => {
        const { invoice, dispatch, products, items } = this.props;
        dispatch(discountChange(invoice, value, products, items));
    };

    render() {

        const { invoice, customers, products, items } = this.props;

        return (<InvoiceForm
            customers={customers}
            products={products}
            rows={items}
            onAddRow={this.onAddRow}
            onRemoveRow={this.onRemoveRow}
            onProductChange={this.onProductChange}
            onQtyChange={this.onQtyChange}
            onDiscountChange={this.onDiscountChange}
            onCustomerChange={this.onCustomerChange}
            invoice={invoice} />);
    }

    retrieveData = () => {
        const { id } = this.props;

        this.props.dispatch(retrieve(id));
        this.props.dispatch(retrieveItems(id));
        this.props.dispatch(retrieveAllCustomers());
        this.props.dispatch(retrieveAllProducts());
    };
}

export default connect(
    state => {
        return {
            invoice   : state.invoices.selected,
            customers : state.customers.all,
            products  : state.products.all,
            items     : state.invoices.items,
            id        : state.router.params.id
        }
    },
    dispatch => {
        return {dispatch, pushState: bindActionCreators(pushState, dispatch)}
    }
)(Invoice)