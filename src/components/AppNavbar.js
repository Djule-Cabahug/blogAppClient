import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);

	// const [ user, setUser ] = useState(localStorage.getItem('token'));
	// console.log(user);

	return (
		<Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
		  <Container>
		    <Navbar.Brand as={NavLink} to="/" className='fs-3'>Blog App</Navbar.Brand>
		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="me-auto">
		        <Nav.Link as={NavLink} to="/posts">Posts</Nav.Link>

		       {(user.id !== null) 
			   ? 
					user.isAdmin 
					?
					<>
						<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					</>
					:
					<>
						<Nav.Link as={NavLink} to="/myPosts">My Posts</Nav.Link>
						<Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
					</>
				:
				<>
				    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
				    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
				</>
			}
		        
		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}

/*
	React JS applis the concepts of Rendering and Mounting in order to display and create components.

	"Rendering" - refers to the process of calling/inovking a component returning a set of instructions for creating DOM.

	"Mounting" is when React JS "renders" or displays the component and builds the initial DOM based on the instructions.
*/