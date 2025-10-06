import { IconContainer, ShoppingIconImg, ItemCounts} from './cart-icon.styles';

// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context.jsx';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import ShoppingIcon from '../../assets/shopping-bag.svg';


// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <IconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconImg src={ShoppingIcon} alt="shoppingiconimage" />
            <ItemCounts>{cartCount}</ItemCounts>
        </IconContainer>
    );
};

export default CartIcon;