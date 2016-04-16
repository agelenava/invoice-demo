import {
    RETRIEVE_PRODUCTS_FAILURE,
    RETRIEVE_PRODUCTS_REQUEST,
    RETRIEVE_PRODUCTS_SUCCESS
} from '../constants/ActionTypes';
import http from '../utils/HttpClient';

function retrieveAll() {
    return {
        types: [RETRIEVE_PRODUCTS_REQUEST, RETRIEVE_PRODUCTS_SUCCESS, RETRIEVE_PRODUCTS_FAILURE],

        shouldCallAPI: (state) => true,

        callAPI: () => {
            return http.get('http://localhost:8000/api/products');
        },

        payload: {}
    };
}
export {
    retrieveAll
}