import React from 'react';
import { Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand>
            <Link to="/">Longden Dev</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
);

export default Header;