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
    }

    createRequest() {

        fetch('http://127.0.0.1:5000/api/request/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: 1,
                    service_id: 1

                })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(function(response) {
                console.log("ok");
            }).catch(function(error) {
                console.log(error);
            });
    }

    render() {
        const { data, isFetching, error } = this.state;

        if (isFetching) return <div>...Loading</div>;

        // return <h1>{data.services[0].id}</h1>;
        return <div>{data.services.map((key) => (<button id={key.id} onClick={this.createRequest} >{key.name}</button>))}</div>
    }


}
export default ServicesTypes;