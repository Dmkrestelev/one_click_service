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

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            phone:"",
            pass:""
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


    handleSignIn = e =>{
        e.preventDefault() ;
        let url = "http://localhost:5000/api/auth/";
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
                    alert(data.error);
                }
            }).catch(err => console.log(err));
    }

    render(){
        return (
            <div className="signin_signup_content">
                <div className="case_for_form">
                    <form>
                        <FieldGroup
                            id="formControlsEmail"
                            type="text"
                            name="phone"
                            label="Номер телефона"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            placeholder="Enter email"
                        />
                        <FieldGroup
                            id="formControlsPassword"
                            type="password"
                            name="pass"
                            label="Пароль"
                            value={this.state.pass}
                            onChange={this.handleChange}
                            placeholder="Password"/>

                        <div className="signii_butn">
                            <Button   onClick={this.handleSignIn}>Log in</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}