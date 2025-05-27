import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavB() {
  return (
    <>
      <Navbar
        style={{
          background: 'linear-gradient(135deg, #2b1055, #1a1a40, #0f0c29)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
        }}
        variant="dark"
      >
        <Container>
          
          <Nav className="me-auto">
            <Nav.Link href="#items">items</Nav.Link>
            <Nav.Link href="#requests">requests</Nav.Link>
            <Nav.Link href="#users">users</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default NavB;