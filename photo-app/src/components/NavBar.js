import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
    return(
        <Navbar bg="light" expand="md lg">
            <Navbar.Brand as={Link} to="/">Photo App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title="Photos" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/photoUpload">Upload Photo</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/photoList">View Photos</NavDropdown.Item>
              </NavDropdown>

            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;