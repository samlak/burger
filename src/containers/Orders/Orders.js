import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Orders.module.css'

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class Orders extends Component {
    state = {
        modalOpen: false
    }
    
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    openModal(){
        this.setState({modalOpen: true});
    }

    closeModal(){
        this.setState({modalOpen: false});
    }

    deleteHandler(orderId){
        this.props.onDeleteOrders(orderId, this.props.token);
        this.setState({modalOpen: false});
    }
    render() {
        let orders = <Spinner />;
        if(this.props.error) {
            orders = <p style={{textAlign : 'center'}}>Orders can't be loaded!</p>;
        }
        if (!this.props.loading && !this.props.error) {  
            orders = this.props.orders.map(order => (  
                <div>
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                        delete={() => this.openModal()}
                    /> 
                    <Modal show={this.state.modalOpen} modalClosed={() => this.closeModal()}>
                        <div className={classes.Modal}>
                            <p>This action is irreversible! Do you still want to continue?</p>
                            
                            <Button btnType="Success" clicked={() => this.closeModal()}>Cancel</Button>
                            <Button btnType="Danger" clicked={() => this.deleteHandler(order.id)}>Delete</Button>
                        </div>
                    </Modal>
                </div>
            ));
        }
        return (
            <Aux>
                {orders}
            </Aux>
        );
    };
};

const mapsStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        error: state.order.error,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrders: (orderId, token) => dispatch(actions.deleteOrder(orderId, token))
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));