import React, { Component }  from 'react';


class OrderList extends Component {


    constructor(props) {
        super(props);

        this.state ={ data: {}, isFetching: true, error: null };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/request/')
            .then(response => response.json())
            .then(result => this.setState({data: result, isFetching: false }));

    }

    render() {
        const { data, isFetching, error } = this.state;
        console.log(data);
        if (isFetching) return <div>...Loading</div>;

        // return <h1>{data.services[0].id}</h1>;
        return <ul>{data.requests.map((key) => (<li key={key.id}>{key.date_create} {key.user} {key.status} {key.services}</li>))}</ul>
    }


}
export default OrderList;