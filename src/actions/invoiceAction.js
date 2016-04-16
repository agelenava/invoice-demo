import {
    RETRIEVE_INVOICE_FAILURE,
    RETRIEVE_INVOICE_REQUEST,
    RETRIEVE_INVOICE_SUCCESS,
    RETRIEVE_INVOICES_FAILURE,
    RETRIEVE_INVOICES_REQUEST,
    RETRIEVE_INVOICES_SUCCESS,
    RETRIEVE_INVOICE_ITEMS_FAILURE,
    RETRIEVE_INVOICE_ITEMS_REQUEST,
    RETRIEVE_INVOICE_ITEMS_SUCCESS
} from '../constants/ActionTypes';

import http from '../utils/HttpClient';
import {push, pushState} from 'redux-router';

function save(invoice) {
    return (dispatch) => {
        http.put(`/api/invoices/${invoice.id}`, invoice).then(data => {
            dispatch(retrieve(invoice.id));
        });
    };
}

function createNew () {
    return (dispatch) => {
        http.post('/api/invoices', {}).then(data => {
            dispatch(push('/invoice/' + data.id));
        });
    };
}

function addRow(id) {
    return (dispatch) => {
        http.post(`/api/invoices/${id}/items`, {}).then(data => {
            dispatch(retrieveItems(id));
        });
    };
}

function removeRow(invoice_id, id) {
    return (dispatch) => {
        http.delete(`/api/invoices/${invoice_id}/items/${id}`).then(data => {
            dispatch(retrieveItems(invoice_id));
        });
    };
}

function saveItem(invoice, item, products, items) {
    return (dispatch) => {
        http.put(`/api/invoices/${invoice.id}/items/${item.id}`, item).then(data => {
            dispatch(recalcInvoice(invoice,products,items));
            dispatch(retrieveItems(invoice.id));
        });
    };
}

function retrieve(id){
    return {
        types: [RETRIEVE_INVOICE_REQUEST, RETRIEVE_INVOICE_SUCCESS, RETRIEVE_INVOICE_FAILURE],

        shouldCallAPI: (state) => true,

        callAPI: () => {
            return http.get(`http://localhost:8000/api/invoices/${id}`);
        },

        payload: {}
    };
}

function retrieveItems(id){
    return {
        types: [RETRIEVE_INVOICE_ITEMS_REQUEST, RETRIEVE_INVOICE_ITEMS_SUCCESS, RETRIEVE_INVOICE_ITEMS_FAILURE],

        shouldCallAPI: (state) => true,

        callAPI: () => {
            return http.get(`http://localhost:8000/api/invoices/${id}/items`);
        },

        payload: { id }
    };
}

function retrieveAll() {
    return {
        types: [RETRIEVE_INVOICES_REQUEST, RETRIEVE_INVOICES_SUCCESS, RETRIEVE_INVOICES_FAILURE],

        shouldCallAPI: (state) => true,

        callAPI: () => {
            return http.get('http://localhost:8000/api/invoices');
        },

        payload: {}
    };
}

function customerChange(invoice, value){
    invoice['customer_id'] = value;
    return save(invoice);
}

function discountChange(invoice, value, items, products){
    invoice['discount'] = value;
    invoice['total'] =  getSum(items, products);
    return save(invoice);
}

function itemProductChanged(invoice, item, id, products, items){
    item['product_id'] = id;
    return saveItem(invoice,item, products, items);
}

function recalcInvoice(invoice, products, items){
    invoice['total'] = getSum(items, products);
    return save(invoice);
}

function itemQtyChange(invoice, item, value, products, items){
    item['quantity'] = value;
    return saveItem(invoice, item, products, items);
}

function getPrice(products, id){
    const index = products.findIndex(x => {return x.id === id; });
    return index > -1 ? products[index].price : 0;
}

function getSum(items, products){
    let sum = 0;

    items.forEach(itm => {
        sum = (sum || 0) + (getPrice(products, itm.product_id) * itm.quantity);
    });

    return sum;
}

export {
    retrieveAll,
    retrieve,
    createNew,
    retrieveItems,
    addRow,
    removeRow,
    customerChange,
    discountChange,
    itemProductChanged,
    itemQtyChange
}