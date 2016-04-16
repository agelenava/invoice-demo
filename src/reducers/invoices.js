import  * as types from '../constants/ActionTypes';

const initialState = {
    all: [],
    selected: {},
    items: []
};

export function invoices(state = initialState, action) {
    switch (action.type) {
        case types.RETRIEVE_INVOICES_REQUEST:
            return Object.assign({}, state, {all:[]});

        case types.RETRIEVE_INVOICES_SUCCESS:
            return Object.assign({}, state, { all : action.body  });

        case types.RETRIEVE_INVOICES_FAILURE:
            return Object.assign({}, state, {error: action.error});

        case types.RETRIEVE_INVOICE_REQUEST:
            return Object.assign({}, state, {});

        case types.RETRIEVE_INVOICE_SUCCESS:
            return Object.assign({}, state, { selected : action.body  });

        case types.RETRIEVE_INVOICE_FAILURE:
            return Object.assign({}, state, {error: action.error});

        case types.RETRIEVE_INVOICE_ITEMS_REQUEST:
            //const items = action.id === state.selected.id ?  state.items : [];
            return Object.assign({}, state, {});

        case types.RETRIEVE_INVOICE_ITEMS_SUCCESS:
            return Object.assign({}, state, { items : action.body  });

        case types.RETRIEVE_INVOICE_ITEMS_FAILURE:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}
