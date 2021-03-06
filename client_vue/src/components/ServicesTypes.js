import React, { Component }  from 'react';


class ServicesTypes extends Component {


    constructor(props) {
        super(props);

        this.state ={
            data: {},
            isFetching: true,
            error: null,
            type_id: null,
            second_step: false,
            message: ''
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/services/')
            .then(response => response.json())
            .then(result => this.setState({data: result, isFetching: false }))
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = new FormData(event.target);


        const form_data = {
            username: data.get('username'),
            phone: data.get('phone'),
            description: data.get('description'),
            service_id: data.get('service_id'),
        };


        fetch('http://127.0.0.1:5000/api/request/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'dataType': 'application/json',
                'access_token': localStorage.getItem("access_token")
            },
            body: JSON.stringify(form_data)
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

    setType = (id) => {
        this.setState({type_id: id, second_step: true});
    }

    render() {
        const { data, isFetching, error, type_id, second_step} = this.state;

        if (isFetching) return <div>...Loading</div>;

        return <div>
            <div className="first_step">
                <h2>Вам нужна услуга...</h2>
                <div id="big-block">{data.services.map((key) => (
                    <div className="small-block" key={key.id} onClick={(e) => this.setType(key.id)}><h2>{key.name}</h2></div>
                ))}</div>
            </div>
            <div className={!second_step ? 'd_none' : 'second_step' }>
                <h2>Немного о вашей проблеме:</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="service_id" type="hidden" value={type_id}></input>
                    <br></br>
                    <input name="username" placeholder="Имя"></input>
                    <br></br>
                    <input name="phone" placeholder="Телефон"></input>
                    <br></br>
                    <textarea className="text_areas" name="description"></textarea>
                    <br></br>
                    <button>Оставить завяку</button>
                </form>
            </div>
        </div>
    }
}
export default ServicesTypes;