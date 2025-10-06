import { Routes, Route } from 'react-router-dom';

import { useEffect } from "react";
import { useDispatch } from 'react-redux';
// import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils.js";

import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation.jsx';
import Authentication from './routes/authentication/authentication.jsx';
import Shop from './routes/shop/shop.jsx';
import Checkout from './routes/checkout/checkout.jsx';

// import { setCurrentUser } from './store/user/user.action';
import { checkUserSession } from './store/user/user.action.js';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(checkUserSession());

    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;

  }, []);

  

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>

    </Routes>
  );
}

export default App;
