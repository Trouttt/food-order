import {useReducer} from 'react'

import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount:0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex]
        
        let updatedItems;
        
        if( existingCartItem ){
            console.log('eita')
            let updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            console.log('porra')
            console.log(action.items,'action items')
            console.log(state.items)
            updatedItems = state.items.concat(action.item)
        }
        
        const updatedNewTotalAmmount = state.totalAmount + action.item.price * action.item.amount; //total value
        console.log(updatedItems)
        console.log(updatedNewTotalAmmount)
        return {
            items: updatedItems,
            totalAmount: updatedNewTotalAmmount
        }

    }
    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        
        if (existingItem.amount === 1){
            
            updatedItems = state.items.filter(item =>item.id !== action.id );
        }else{
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem; 
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        console.log('TIKTOK', item)
        dispatchCartAction({type: 'ADD', item})
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id})
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };
    
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

 export default CartProvider;