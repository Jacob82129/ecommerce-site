import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import crown from "../../assets/crown.svg";

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer
} from "./navigation.styles.jsx";

import CartIcon from "../../components/cart-icon/cart-icon.jsx";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.jsx";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    console.log(currentUser);

    return (
        <Fragment>
            <NavigationContainer>

                <LogoContainer to='/'>
                    <img className="logo" src={crown} alt="Crown" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>

                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}

                    <CartIcon />

                </NavLinks>

                {isCartOpen && <CartDropdown />}

            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;