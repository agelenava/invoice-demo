import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState, push } from 'redux-router';
import { bindActionCreators } from 'redux';
import { retrieveAll } from '../actions/customerAction';
import CustomerList from '../components/customerList';

const log = console.log.bind(console, 'Customers ->');

class Customers extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        customers: PropTypes.array,
        pushState: PropTypes.func
    };

    componentDidMount() {
        this.retrieveData();
    };

    render() {
        const { customers } = this.props;

        return (<CustomerList
            customers={customers}/>);
    }

    retrieveData = () => {
        this.props.dispatch(retrieveAll());
    };
}

export default connect(
    state => {
        return {
            customers     : state.customers.all
        }
    },
    dispatch => {
        return {dispatch, pushState: bindActionCreators(pushState, dispatch)}
    }
)(Customers)
