import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { addLocaleData } from 'react-intl';

const isProduction = process.env.NODE_ENV === 'production';

export default class Root extends Component {

  render() {
    const { store } = this.props;

    return (
      <Provider key="provider" store={store}>
        <ReduxRouter />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
