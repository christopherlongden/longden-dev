import React from 'react';
import { Navbar } from "react-bootstrap";

const Header = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Longden Dev</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
);

export default Header;