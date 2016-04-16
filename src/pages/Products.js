import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState, push } from 'redux-router';
import { bindActionCreators } from 'redux';
import { retrieveAll } from '../actions/productsAction';
import ProductList from '../components/ProductList';

const log = console.log.bind(console, 'Products ->');

class Products extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        products: PropTypes.array,
        pushState: PropTypes.func
    };

    componentDidMount() {
        this.retrieveData();
    };

    render() {
        const { products } = this.props;

        return (<ProductList
            products={products}/>);
    }

    retrieveData = () => {
        this.props.dispatch(retrieveAll());
    };
}

export default connect(
    state => {
        return {
            products     : state.products.all
        }
    },
    dispatch => {
        return {dispatch, pushState: bindActionCreators(pushState, dispatch)}
    }
)(Products)
