import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';
import { invoices } from './invoices';
import { products } from './products';
import { customers } from './customers';

const rootReducer = combineReducers({
  invoices,
  products,
  customers,
  router
});

export default rootReducer;
