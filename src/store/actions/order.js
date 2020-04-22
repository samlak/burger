import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
    
}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {  
                dispatch(purchaseBurgerSuccess(response.name, orderData));
            })
            .catch(error => {  
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
    
}
// export const fetchOrdersFail = (error) => {
//     return {
//         type: actionTypes.FETCH_ORDERS_FAIL,
//         error
//     }
// }
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (orders) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        dispatch(fetchOrdersSuccess(orders));
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         dispatch(fetchOrdersSuccess(fetchedOrders));
        //     })
        //     .catch(error => {
        //         dispatch(fetchOrdersFail(error));
        //     });
    }
}

export const deleteOrderSuccess = (orderId) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        orderId
    }
    
}
export const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error
    }
}
export const deleteOrderStart = (orderId) => {
    return {
        type: actionTypes.DELETE_ORDER_START,
        orderId
    }
}

export const deleteOrder = (orderId) => {
    return dispatch => {
        dispatch(deleteOrderStart(orderId));
    }
}