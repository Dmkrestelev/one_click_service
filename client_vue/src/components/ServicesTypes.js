import React, { Component }  from 'react';


class ServicesTypes extends Component {


    constructor(props) {
        super(props);

        this.state ={ data: {}, isFetching: true, error: null };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/services/')
            .then(response => response.json())
            .then(result => this.setState({data: result, isFetching: false }))
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }

    createRequest() {
        fetch('http://127.0.0.1:5000/api/request/', {method: 'POST'})
            .then(response => response.json())
            .then(result => '')
    }

    render() {
        const { data, isFetching, error } = this.state;

        if (isFetching) return <div>...Loading</div>;

        // return <h1>{data.services[0].id}</h1>;
        return <div>{data.services.map((key) => (<button onClick={this.createRequest} key={key.id}>{key.name}</button>))}</div>
    }


}
export default ServicesTypes;