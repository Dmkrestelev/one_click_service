import React, { Component } from 'react'
import ServicesTypes from './components/ServicesTypes'
import OrderList from './components/OrderList'
import './App.css';


class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>Выберите услугу</h1>
                <ServicesTypes></ServicesTypes>
                <OrderList></OrderList>
            </div>
        );
    }
}

export default App;
