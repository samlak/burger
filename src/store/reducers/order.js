import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [
        {
            'abcde': {
                ingredients: {
                    salad: 1,
                    bacon: 2,
                    cheese: 0,
                    meat: 0
                },
                price: 5.0
            }
        },
        {
            'bcdef': {
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 3,
                    meat: 0
                },
                price: 7.6
            }
        },
        {
            'cdefg': {
                ingredients: {
                    salad: 0,
                    bacon: 2,
                    cheese: 2,
                    meat: 1
                },
                price: 17.0
            }
        },
    ],
    loading: false,
    purchased: false,
    error: false
}

const deleteOrder = (state, action) => {
        const newOrder = state.orders.filter(order => {
            for(let key in order){
                return key !== action.orderId;
            }
        });
        return {
            ...state,
            orders: newOrder
        }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                // orders: action.orders,
                error: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.DELETE_ORDER_START:
            return deleteOrder(state, action);
        default:
            return state
    }
};

export default reducer;