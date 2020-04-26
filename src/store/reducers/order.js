import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../utility';

const initialState = {
    // orders: [
    //     {
    //         'abcde': {
    //             ingredients: {
    //                 salad: 1,
    //                 bacon: 2,
    //                 cheese: 0,
    //                 meat: 0
    //             },
    //             price: 5.0
    //         }
    //     },
    //     {
    //         'bcdef': {
    //             ingredients: {
    //                 salad: 0,
    //                 bacon: 0,
    //                 cheese: 3,
    //                 meat: 0
    //             },
    //             price: 7.6
    //         }
    //     },
    //     {
    //         'cdefg': {
    //             ingredients: {
    //                 salad: 0,
    //                 bacon: 2,
    //                 cheese: 2,
    //                 meat: 1
    //             },
    //             price: 17.0
    //         }
    //     },
    // ],
    orders: [],
    loading: false,
    purchased: false,
    error: false
}

// const deleteOrder = (state, action) => {
//         // eslint-disable-next-line array-callback-return
//         const newOrder = state.orders.filter(order => {
//             for(let key in order){
//                 return key !== action.orderId;
//             }
//         });
//         return {
//             ...state,
//             orders: newOrder
//         }
// }


const deleteOrderStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: false
    });
}

const deleteOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        // orders: action.orders,
        error: false
    });
}

const deleteOrderFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    });
}

const purchaseInit = (state, action) => {
    return updateObject(state, {
        purchased: false
    });
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: false
    });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders,
        error: false
    });
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT: 
            return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrderFail(state, action);
        case actionTypes.DELETE_ORDER_START:
            return deleteOrderStart(state, action);
        case actionTypes.DELETE_ORDER_SUCCESS:
            return deleteOrderSuccess(state, action);
        case actionTypes.DELETE_ORDER_FAIL:
            return deleteOrderFail(state, action);
        default:
            return state
    }
};

export default reducer;