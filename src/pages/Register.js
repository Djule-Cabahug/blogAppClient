import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';


export default function Register() {
	const notyf = new Notyf();

	const {user} = useContext(UserContext);
	//State hooks to store the values of the input fields
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	//checks if values are succesffuly binded
	console.log(email);
	console.log(username);
	console.log(password);
	console.log(confirmPassword);

	//useEffect() has two arguments, the first argument is the function and the second argument is the dependency.
	// - function -represents the side effect you want to perform. This will be executed when the component renders.
	// - dependency - optional array. The effects will run when there are changes in the component's dependencies. When there is no provided array, the effect will run on every render of the component.

	useEffect(() => {
		if((email !== "" && username !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)){

			setIsActive(true)

		} else {

			setIsActive(false)
		}
		//array of dependencies, the effect/side-effect/function will run when there are changes with our state
	},[email, password, confirmPassword])


	function registerUser(e) {
		//Prevents page redirection via form submission
		e.preventDefault();

		fetch(`https://blogappserver-tag3.onrender.com/users/register`, {

			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				username: username,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data.message === "Registered Successfully"){
				setEmail('');
				setUsername('');
				setPassword('');
				setConfirmPassword('');

				notyf.success("Registration successful")

			} else {

				notyf.error("Something went wrong. Please contact us for assistance.")
			}
		})
	}


	return (

		(user.id !== null) ?
		    <Navigate to="/posts" />
		    :
		<>
			<Form onSubmit={(e) => registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
						type="email" 
						placeholder="Enter your email" 
						required
						value={email}
						onChange={e => {setEmail(e.target.value)} }
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Enter your username" 
						required
						value={username}
						onChange={e => {setUsername(e.target.value)} }
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="Enter your password" 
						required
						value={password}
						onChange={e => {setPassword(e.target.value)} }
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Verify Password:</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="Verify your password" 
						required
						value={confirmPassword}
						onChange={e => {setConfirmPassword(e.target.value)} }
					/>
				</Form.Group>

				{ isActive ?
				<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
				:
				<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
				} 
			</Form>

			<p className='text-center'>Already have an account? <Link to="/login">Click here</Link> to log in.</p>
		</>
	)
}