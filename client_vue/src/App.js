import React, { Component } from 'react'
import ServicesTypes from './components/ServicesTypes'
import OrderList from './components/OrderList'
import './App.css';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

class App extends Component {

    render() {
        return (


            <HashRouter>
                <div className="App">
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={ServicesTypes}/>
                        <Route path="/stuff" component={OrderList}/>
                    </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;
