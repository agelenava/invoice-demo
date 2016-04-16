import  * as types from '../constants/ActionTypes';

const initialState = {
    all: []
};

export function customers(state = initialState, action) {
    switch (action.type) {
        case types.RETRIEVE_CUSTOMERS_REQUEST:
            return Object.assign({}, state, {all:[]});

        case types.RETRIEVE_CUSTOMERS_SUCCESS:
            const items = action.body;
            return Object.assign({}, state, { all : items  });

        case types.RETRIEVE_CUSTOMERS_FAILURE:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}