import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.jsx';
import CartItem from '../cart-item/cart-item.jsx';


import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context.jsx';

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => 
                        <CartItem key={item.id} cartItem={item} />
                    )) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }

            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;