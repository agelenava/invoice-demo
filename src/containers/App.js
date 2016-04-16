import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import {push, pushState} from 'redux-router';
import { bindActionCreators } from 'redux';

class App extends Component {
    static propTypes = {
        pushState: PropTypes.func
    };

  onNavigate = (link,e) => {
      e.preventDefault();
      this.props.dispatch(push(link));
  };

  render() {
    const { children } = this.props;

    return (<div>
          <NavBar onNavigate={this.onNavigate} />
          <div className="container">
            {children}
          </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
};


export default connect(
    state => {
        return {
            invoices     : state.invoices.all
        }
    },
    dispatch => {
        return {dispatch, pushState: bindActionCreators(pushState, dispatch)}
    }
)(App)