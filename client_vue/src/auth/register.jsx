import React, { Component } from "react";
import { Button, HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            phone:"",
            pass:"",
            name:""
        }

    }

    handleChange=event=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleRegistration = e =>{
        e.preventDefault() ;
        let url = "http://localhost:5000/api/register/";
        let formData  = new FormData();
        let data = this.state;
        for(let name in data) {
            formData.append(name, data[name]);
        }

        fetch(url, {
            method: 'POST',
            body: formData
        }).then( res => res.json())
            .then(data=>{
                localStorage.setItem('access_token', data.access_token);

                localStorage.setItem('name', data.name);

                if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
                    window.location.replace("/")
                }else{
                    alert(data.error)
                }
            }).catch(err => console.log(err));
    }

    render(){
        return (
            <div className="signin_signup_content">
                <div className="case_for_form">
                    <form>
                        <FieldGroup
                            id="formControlsName"
                            type="text"
                            name="name"
                            label="Имя"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Иван"
                        />
                        <FieldGroup
                            id="formControlsPhone"
                            type="text"
                            name="phone"
                            label="Номер телефона"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            placeholder="Телефон"/>
                        <FieldGroup
                            id="formControlsPass"
                            type="password"
                            name="pass"
                            label="Пароль"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Пароль" />

                        <Button onClick={this.handleRegistration}  className="pull-right"> Register</Button>
                    </form>
                </div>
            </div>
        );
    }
}