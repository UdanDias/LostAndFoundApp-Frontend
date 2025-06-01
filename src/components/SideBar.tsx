// Sidebar.js
import React from 'react';
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { House, Person, BoxArrowRight, Puzzle } from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from './auth/AuthProvider';
import Swal from 'sweetalert2';

const Sidebar = () => {
  // const { isAuthenticated } = useAuth();
  // const { logout } = useAuth();
  // const handleOnClick = () => {

  // }
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleOnClick = async() => {
    logout();
    const Toast = await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: "warning",
      title: "You logged out"
    });
    // Clear auth context/session
    navigate("/login");   // Redirect to Login page
  };
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
        {
          isAuthenticated && (
            <>
              <Nav.Link as={NavLink} to="/home" style={linkStyle}>
                <House className="me-2" /> Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile" style={linkStyle}>
                <Person className="me-2" /> Profile
              </Nav.Link>
              <NavDropdown
                title={
                  <span style={linkStyle}>
                    <Puzzle className="me-2" /> Components
                  </span>
                }
                id="nav-dropdown-components"
                style={{ paddingLeft: "0.5rem", marginLeft: "-25px" }} // Optional, match Nav.Link padding
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


              <Button
                variant="secondary"
                style={{ marginLeft: "20px", marginTop: "10px" }}
                className="d-flex align-items-center"
                onClick={handleOnClick}
              >
                <BoxArrowRight className="me-2" />
                Logout
              </Button>

            </>
          )


        }
      </Nav>
      {/* <Nav className="flex-column" variant="pills" defaultActiveKey="/home">
        {isAuthenticated && (
          <>
            <Nav.Link as={NavLink} to="/home" style={linkStyle}>
              <House className="me-2" /> Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/profile" style={linkStyle}>
              <Person className="me-2" /> Profile
            </Nav.Link>

            <NavDropdown
              title={
                <span style={linkStyle}>
                  <Puzzle className="me-2" /> Components
                </span>
              }
              id="nav-dropdown-components"
              style={{ paddingLeft: "0.5rem", marginLeft: "-15px" }} // Adjust for alignment
            >
              <NavDropdown.Item as={NavLink} to="/items">
                Items
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/requests">
                Requests
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/users">
                Users
              </NavDropdown.Item>
            </NavDropdown>

            <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
              <Button
                variant="outline-danger"
                className="d-flex align-items-center"
                onClick={handleOnClick}
              >
                <BoxArrowRight className="me-2" />
                Logout
              </Button>
            </div>
          </>
        )}
      </Nav> */}

    </div>
  );
};

const linkStyle = {
  color: 'white',
  padding: '12px 20px',
  textDecoration: 'none'
};

export default Sidebar;
