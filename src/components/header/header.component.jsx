import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import OptionLink from './header.styles';

const Header = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand>
        <Navbar.Brand href="/">Longden Dev</Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <OptionLink to='/signin'>Sign In</OptionLink>
                <OptionLink to='/signup'>Sign Up</OptionLink>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;