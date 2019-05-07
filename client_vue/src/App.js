// import React, { Component } from 'react'
// import './App.css';
// import {
//     Route,
//     NavLink,
//     HashRouter
// } from "react-router-dom";
//
// class App extends Component {
//
//     render() {
//         return (
//             <HashRouter>
//                 <div className="App">
//                     <h1>Simple SPA</h1>
//                     <ul className="header">
//                         <li><NavLink to="/">Home</NavLink></li>
//                         <li><NavLink to="/stuff">Stuff</NavLink></li>
//                     </ul>
//                     <div className="content">
//                         <Route exact path="/" component={ServicesTypes}/>
//                         <Route path="/stuff" component={OrderList}/>
//                     </div>
//                 </div>
//             </HashRouter>
//
//         );
//     }
// }
//
// export default App;

import React,{Component} from 'react';
import ServicesTypes from './components/ServicesTypes'
import OrderList from './components/OrderList'
import {BrowserRouter as Router, NavLink, Route} from "react-router-dom";
import Login from './login.jsx';
import './App.css';
import NavBar from './NavBar.jsx';
import { PrivateRoute } from "./PrivateRoute.jsx";
import {isLoggedIn} from './auth.js';

const Home = ()=> <h3>Logged in as {localStorage.getItem("username")}</h3>

export default class App extends Component{
    render(){
        return(
            <Router>
                <div>

                    <ul className="header">
                        <li><NavLink to="/services">Home</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                    </ul>
                    <PrivateRoute exact isloggedin={isLoggedIn()} path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/services" component={ServicesTypes}/>
                    <Route path="/stuff" component={OrderList}/>
                </div>
            </Router>
        )
    }
}