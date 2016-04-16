import  * as types from '../constants/ActionTypes';

const initialState = {
    all: []
};

export function products(state = initialState, action) {
    switch (action.type) {
        case types.RETRIEVE_PRODUCTS_REQUEST:
            return Object.assign({}, state, {all:[]});

        case types.RETRIEVE_PRODUCTS_SUCCESS:
            const items = action.body;
            return Object.assign({}, state, { all : items  });

        case types.RETRIEVE_PRODUCTS_FAILURE:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}