import React, { Component } from 'react'
import ServicesTypes from './components/ServicesTypes'
import './App.css';


class App extends Component {

    getServices = async () => {
        const url = await
        fetch('http://127.0.0.1:5000/api/services/', { mode: 'no-cors' });
        const data = await url.json();
        console.log(data);
    };



    render() {
        return (
            <div className="App">
                <ServicesTypes getfunc = { this.getServices }></ServicesTypes>
            </div>

        );
    }
}

export default App;
