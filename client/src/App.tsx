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
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import User from './pages/admin/User';
import CreateUser from './pages/admin/CreateUser';
import CreateProduct from './pages/admin/CreateProduct';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProduct from './pages/admin/AdminProduct';
import jwt_decode from 'jwt-decode';

function App() {
  const user = useAppSelector((state) => state.auth.user)
  const token= useAppSelector((state)=> state.auth.token)
  // console.log(process.env.REACT_APP_API_URL);
  // axios.defaults.baseURL=process.env.REACT_APP_API_URL
  let isAdmin:boolean = false;
  if(token !== undefined && token!==null ){
    const admin:any = (jwt_decode(token))
    isAdmin = admin.isAdmin
  }
  console.log(isAdmin);
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/admin">
            {isAdmin ? <Dashboard/> :<Home/>}
          </Route>
          <Route path="/admin/users">
            {isAdmin ? <Users/> :<Home/>}
          </Route>
          <Route path="/admin/user/:id">
            {isAdmin ? <User/> :<Home/>}
          </Route>
          <Route path="/admin/createuser/">
          {isAdmin ? <CreateUser/> :<Home/>}
          </Route>
          <Route path="/admin/products/">
           {isAdmin ? <AdminProducts/>:<Home/> }
          </Route>
          <Route path="/admin/product/">
           {isAdmin ? <AdminProduct/> :<Home/>}
          </Route>
          <Route path="/admin/createproduct/">
            {isAdmin ? <CreateProduct/> :<Home/>}
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

