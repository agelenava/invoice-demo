import {
    RETRIEVE_CUSTOMERS_FAILURE,
    RETRIEVE_CUSTOMERS_REQUEST,
    RETRIEVE_CUSTOMERS_SUCCESS
} from '../constants/ActionTypes';

import http from '../utils/HttpClient';

function retrieveAll() {
    return {
        types: [RETRIEVE_CUSTOMERS_REQUEST, RETRIEVE_CUSTOMERS_SUCCESS, RETRIEVE_CUSTOMERS_FAILURE],

        shouldCallAPI: (state) => true,

        callAPI: () => {
            return http.get('http://localhost:8000/api/customers');
        },

        payload: {}
    };
}

export {
    retrieveAll
}