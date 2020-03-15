import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import  {OptionLink, LoggedInStatus } from './header.styles';

const Header = ({ currentUser, handleSignOut }) => {
    return (
        <Navbar bg="light" expand="sm">
        <Navbar.Brand>
        <Navbar.Brand href="/">Longden Dev</Navbar.Brand>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {
                    currentUser ?
                        <>
                            <LoggedInStatus>Signed in as {currentUser.displayName}</LoggedInStatus>
                            <OptionLink to='/' onClick={handleSignOut}>Sign Out</OptionLink>
                        </>
                    :
                        <>
                            <OptionLink to='/signin'>Sign In</OptionLink>
                            <OptionLink to='/signup'>Sign Up</OptionLink>
                        </>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
};

export default Header;