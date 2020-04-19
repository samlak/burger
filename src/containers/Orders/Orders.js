import React, { Component } from 'react';

// import classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: null,
        loading: true,
        error: false
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(error => {
                this.setState({loading: false, error: true})
            });
    }
    render() {
        let order = <Spinner />;
        if(this.state.error) {
            order = <p style={{textAlign : 'center'}}>Orders can't be loaded!</p>;
        }
        if (this.state.orders) {
            order = this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                /> 
            ));
        }
        return (
            <div>
                {order}
            </div>
        );
    };
};

export default withErrorHandler(Orders, axios);