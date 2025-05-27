// Sidebar.js
import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { House, Person, BoxArrowRight, Puzzle } from 'react-bootstrap-icons';
import { NavLink } from 'react-router';

const Sidebar = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '220px',
        backgroundColor: '#343a40',
        color: 'white',
        paddingTop: '20px',
        position: 'fixed'
      }}
    >
      <Nav className="flex-column" variant="pills" defaultActiveKey="/home">
        <Nav.Link as={NavLink} to="/home" style={linkStyle}>
          <House className="me-2" /> Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/profile" style={linkStyle}>
          <Person className="me-2" /> Profile
        </Nav.Link>

        {/* Dropdown for Components */}
        {/* <NavDropdown
          title={
            <span>
              <Puzzle className="me-2" /> Components
            </span>
          }
          id="nav-dropdown-components"
          style={linkStyle}
        >
          <NavDropdown.Item as={Link} to="/components/items">
            Items
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/components/requests">
            Requests
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/components/users">
            Users
          </NavDropdown.Item>
        </NavDropdown> */}
        <NavDropdown
          title={
            <span style={linkStyle}>
              <Puzzle className="me-2" /> Components
            </span>
          }
          id="nav-dropdown-components"
          style={{ paddingLeft: "0.5rem" ,marginLeft:"-25px"} } // Optional, match Nav.Link padding
        >
          <NavDropdown.Item as={NavLink} to="/items" >
            Items
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/requests" >
            Requests
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/users" >
            Users
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Link as={NavLink} to="/logout" style={linkStyle}>
          <BoxArrowRight className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

const linkStyle = {
  color: 'white',
  padding: '12px 20px',
  textDecoration: 'none'
};

export default Sidebar;
