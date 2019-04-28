import React, { Component }  from 'react';


class ServicesTypes extends Component {

    render(){
        return (
            <button onClick={this.props.getfunc}>компонент с блоками</button>
        )
    }

}

export default ServicesTypes;