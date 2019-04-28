import React, { Component } from 'react'
import ServicesTypes from './components/ServicesTypes'
import './App.css';


class App extends Component {

    render() {
        return (
            <div className="App">
                <h1>Выберите услугу</h1>
                <ServicesTypes></ServicesTypes>
            </div>
        );
    }
}

export default App;
