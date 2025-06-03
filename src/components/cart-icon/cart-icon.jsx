import { IconContainer, ShoppingIconImg, ItemCounts} from './cart-icon.styles';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context.jsx';
import ShoppingIcon from '../../assets/shopping-bag.svg';


// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <IconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconImg src={ShoppingIcon} alt="shoppingiconimage" />
            <ItemCounts>{cartCount}</ItemCounts>
        </IconContainer>
    );
};

export default CartIcon;