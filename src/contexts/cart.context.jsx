import { createContext, useState, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};


const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    // if found, increase quantity by 1
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return new array with modified cartItems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemCart = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // if found, decrease quantity by 1
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearItemCart = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

const totalCart = (cartItems) => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    cartCount: 0,
    cartTotal: 0
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // const setIsCartOpen = (isOpen) => {
    //     dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isOpen });
    // }

    // const setCartItems = (cartItems) => {
    //     dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems });
    // }

    // const setCartCount = (count) => {
    //     dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: count });
    // }

    // const setCartTotal = (total) => {
    //     dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: total });
    // }


    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + (cartItem.quantity || 0), 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {
        // generate newCartCount and newCartTotal
        const newCartCount = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity || 0), 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        // dispatch new action with payload = {
        //     newCartItems,
        //     newCartTotal,
        //     newCartCount
        // }

        dispatch(
            createAction( CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
            })
        );
    };

    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        // setCartItems(removeItemCart(cartItems, cartItemToRemove));
        const newCartItems = removeItemCart(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        // setCartItems(clearItemCart(cartItems, cartItemToClear));
        const newCartItems = clearItemCart(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const value = {
        isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart,
        clearItemFromCart, cartItems, cartCount, cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};