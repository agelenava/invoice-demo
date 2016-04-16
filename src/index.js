import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

render(<Root store={store}/>, document.getElementById('root'));
