import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Invoices from './pages/Invoices';
import Invoice from './pages/Invoice';
import Customers from './pages/Customers';
import Products from './pages/Products';

export default (
<Route path="/" component={App}>
    <IndexRoute component={Invoices} />
    <Route path="customers" component={Customers} />
    <Route path="products" component={Products} />
    <Route path="invoice/:id" component={Invoice} />
    <Route path="*" component={Invoices} />
</Route>
);