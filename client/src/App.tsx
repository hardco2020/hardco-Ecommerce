import React from 'react';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Product from './pages/product/Product';
import ProductList from './pages/productList/ProductList';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Success from './pages/success/Success';
import { useAppSelector } from './redux/hook';
import Admin from './pages/admin/Admin';

function App() {
  const user = useAppSelector((state) => state.auth.user)
  // console.log(process.env.REACT_APP_API_URL);
  // axios.defaults.baseURL=process.env.REACT_APP_API_URL
  // const token = Cookies.get('Authorization');
  // if(token !== undefined){
  //   console.log(jwt_decode(token))
  // }
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/login">
            {user!==null ? <Home /> : <Login /> }
          </Route>
          <Route path="/register">
            <Register />
          </Route >
          <Route path="/product/:id">
            <Product /> 
          </Route >
          <Route path="/cart">
            <Cart />
          </Route >
          <Route path="/products/:category">
            <ProductList />
          </Route >
          <Route path="/success">
            <Success />
          </Route >
        </Switch>
    </Router>
  );
}

export default App;

