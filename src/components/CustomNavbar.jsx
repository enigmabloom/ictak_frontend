import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomNavbar.css';

const CustomNavbar = () => {
  return (
    <Navbar
    bg="light"
    expand="lg"
    className="shadow-sm sticky-top"

    style={{
      padding: '0rem 0rem', 
      height: '60px', 
    }}
  >
    <Container>
 
    <Navbar.Brand href="#" className="fw-bold" style={{ padding: '0' }}>
        <img
          src="\logo\iip-black.png"
          alt="Logo"
          style={{
            height: '40px',
            width: 'auto',
          }} 
  
        />
      </Navbar.Brand>

      {/* Toggle button for mobile */}
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{
          padding: '0.25rem 0.5rem'
        }}
      />

      <Navbar.Collapse id="basic-navbar-nav">
  
        <Nav
          className="m-auto text-center"
          style={{
            padding: '0',
            margin: '0', 
          }}
        >
        </Nav>
        <div className="d-flex gap-2">
          <Link to={'/login'}>
            <Button
              variant="outline"
              className="customNavbar-login-button btn-sm"
              style={{
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                borderColor: '#00acc1',
                color: '#00acc1'
              }}
            >
              Login
            </Button>
          </Link>
          <Link to={'/signup'}>
            <Button
              className="customNavbar-signup-button btn-sm"
              style={{
                color: 'white',
                backgroundColor: '#00acc1',
                borderColor: '#00acc1',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem', 
              }}
            >
              Signup
            </Button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default CustomNavbar;
