import React, { Component }  from 'react';
import './OrderList.css';

class OrderList extends Component {


    constructor(props) {
        super(props);

        this.state ={ data: {
                requests: [{
                    id: null,
                    date_create: null,
                    username: null,
                    phone: null,
                    status: {
                        name: null
                    },
                    services: {
                        name: null
                    }
                }]
            }, isFetching: true, error: null,
            uinfo: {
                username: null,
                phone: null
            } };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/request/')
            .then(response => response.json())
            .then(result => this.setState({data: result, isFetching: false }));

    }


    getUserInfo = (id, index) => {
        var res;
        var new_data = this.state.data;
        var tut = this;
        fetch('http://127.0.0.1:5000/api/request_info/?id='+id)
            .then(response => response.json())
            .then(function(data) {
                new_data.requests[index].username = data.username;
                new_data.requests[index].phone = data.phone;
                tut.setState({data: new_data});
            })
            .catch(function(error) {
                console.log(error);
            });

    };

    render() {
        const { data, isFetching, error, uinfo } = this.state;
        if (isFetching) return <div>...Loading</div>;

        return <ul className="ords">{data.requests.map((key, index) => (<li index={index} key={key.id}
                                                    onClick={(e) => this.getUserInfo(key.id, index)}>
            <span>{key.date_create}</span>
            <span>{key.status.name}</span>
            <span>{key.services.name}</span>
            <span>{key.username}</span>
            <span>{key.phone}</span>

        </li>))}</ul>
    }


}
export default OrderList;