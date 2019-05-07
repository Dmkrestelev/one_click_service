import React,{Component} from 'react';
import ServicesTypes from './components/ServicesTypes'
import OrderList from './components/OrderList'
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import Login from './auth/login.jsx';
import Register from './auth/register.jsx';
import './App.css';

import { PrivateRoute } from "./PrivateRoute.jsx";
import {isLoggedIn} from './auth/auth.js';
import {deleteTokens, requiredAuth} from "./auth/auth";

const Log = () =>{
    if(isLoggedIn()){
        return(
            <header className="navbar navbar-fixed-top__">
                <div className="head_wrapper">
                    <span className="main_logo">One click service</span>
                    <span className="main_menu"> <NavLink to="/">Оставить заявку</NavLink></span>
                    <span className="main_menu"> <NavLink to="/stuff/">Список заявок</NavLink></span>

                    <span className="auth_block_header">
                        <span className="main_menu_right">
                            <NavLink to="/personal/">Вы авторизованы как {localStorage.getItem("name")}</NavLink>
                        </span>
                        <span className="main_menu_right">
                            <NavLink onClick={() => {
                                deleteTokens();
                                window.location.replace("/")
                            }} to="/logout/">Logout</NavLink>
                        </span>
                    </span>
                </div>
            </header>
        )
    }else{
        return(
            <header className="navbar navbar-fixed-top__">
                <div className="head_wrapper">
                    <span className="main_logo">One click service</span>
                    <span className="main_menu"> <NavLink to="/">Оставить заявку</NavLink></span>
                    <span className="main_menu"> <NavLink to="/stuff/">Список заявок</NavLink></span>

                    <span className="auth_block_header">
                        <span className="main_menu_right">
                            <NavLink to="/login/">Войдите</NavLink>
                        </span>
                        <span className="main_menu_right registrarion_button">
                            <NavLink to="/register/">Или зарегестрируйтесь</NavLink>
                        </span>
                    </span>
                </div>
            </header>
        )
    }
}

export default class App extends Component{


    render(){
        return(
            <Router>
                <div className="Menu">
                    <Log/>
                    <Route exact path="/login/" component={Login} />
                    <Route exact path="/register/" component={Register} />
                    <Route exact path="/" component={ServicesTypes}/>
                    <Route path="/stuff/" component={OrderList}/>

                    <PrivateRoute exact isloggedin={isLoggedIn()} path="/personal/" component={OrderList} />
                </div>
            </Router>
        )
    }
}