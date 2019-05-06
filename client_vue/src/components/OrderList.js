import React, { Component }  from 'react';


class OrderList extends Component {


    constructor(props) {
        super(props);

        this.state ={ data: {
                requests: [{
                    id: null,
                    date_create: null,
                    username: '',
                    userphone: '',
                    status: {
                        name: null
                    },
                    services: {
                        name: null
                    }



                }]
            }, isFetching: true, error: null, uinfo: null };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/request/')
            .then(response => response.json())
            .then(result => this.setState({data: result, isFetching: false }));

    }


    getUserInfo = (id, index) => {
        fetch('http://127.0.0.1:5000/api/user/?id='+1)

            .then(response => response.json())
            .then(result => this.setState({uinfo: result}))
            .catch(function(error) {
                console.log(error);
            });
            var new_data = this.state.data;

        debugger;
            new_data.requests[index].username = this.state.uinfo.username;
            this.setState({data: new_data});
    };

    render() {
        const { data, isFetching, error, uinfo } = this.state;
        if (isFetching) return <div>...Loading</div>;


        return <ul>{data.requests.map((key, index) => (<li index={index} key={key.id}
                                                    onClick={(e) => this.getUserInfo(key.id, index)}>
            {key.date_create} {key.status.name} {key.services.name}

        </li>))}</ul>
    }


}
export default OrderList;