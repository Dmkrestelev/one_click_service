import React from "react";
import {Navbar,Nav,NavItem, Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {isLoggedIn, deleteTokens} from './auth.js';

import './nav.css';

const Log = () =>{
    if(isLoggedIn()){
        return(
            <Button
          onClick={() => {
            deleteTokens();
            window.location.replace("/")
          }}
        >
          Sign out
        </Button>
        )
    }else{
        return(
            <Link to="/login">Login</Link>
        )
    }
}

const NavBar =  () =>{
    
        return(
            <Navbar className="nav-container">
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="#home"></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav className="pull-right">
                    <NavItem className="navitem" eventKey={1} href="#">
                    <Log/>
                    </NavItem>
                </Nav>
            </Navbar>
        )
}

export default NavBar