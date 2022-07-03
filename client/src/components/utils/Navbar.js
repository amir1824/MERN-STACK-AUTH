import React, { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import './Navbar.css'


const NavBar = (props) => {
    const auth = useContext(AuthContext)

    const logOutHandler= () =>{
       
        localStorage.removeItem("authToken")
       
    }

    return (
        <div>
            <>
                <Navbar className='color-nav' variant='light' expand="md" fixed='top'>
                    <Container>
                        <Navbar.Brand as={Link} to='/'>MERN STACK Authentication</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav"  >

                          
                            <Nav className='ms-auto'>
                                {!auth.isLoggedIn && (<Nav.Link as={Link} to='/login'>Login </Nav.Link>)}
                                {!auth.isLoggedIn && (<Nav.Link as={Link} to='/register'>Register </Nav.Link>)}
                                {auth.isLoggedIn && (<Nav.Link as={Link} to='/' onClick={logOutHandler()&& auth.logOut}> Logout </Nav.Link>)}

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>

        </div>
    )


}
export default NavBar