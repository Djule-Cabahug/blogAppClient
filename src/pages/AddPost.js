import { useState, useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function AddPost(){

	const notyf = new Notyf();

	const navigate = useNavigate();

    const {user} = useContext(UserContext);

	//input states
	const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

	function createPost(e){

		//prevent submit event's default behavior
		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch(`https://blogappserver-tag3.onrender.com/posts/addPost`,{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				title: title,
				content: content
			})
		})
		.then(res => res.json())
		.then(data => {

			//data is the response of the api/server after it's been process as JS object through our res.json() method.
			console.log(data);


			if (data.hasOwnProperty("_id")) {
				
				setTitle("")
				setContent("");

				notyf.success("Post Creation Successful")

				navigate("/myPosts");

			} else {

				notyf.error("Something Went Wrong. Notify System Admin.")

			}

		})

	}

	return (

            (user.isAdmin === false)
            ?
            <>
				<Link className='btn btn-dark mt-5 px-4' to="/myPosts">Back</Link>
                <h1 className="my-5 text-center">Add Post</h1>
                <Form onSubmit={e => createPost(e)}>
                    <Form.Group controlId="postTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control 
							type="text"
							value = {title}
							onChange={e => setTitle(e.target.value)} 
							required/>
					</Form.Group>
					<Form.Group controlId="postContent">
						<Form.Label>Content</Form.Label>
						<Form.Control 
							as="textarea" 
							rows = {10}
							value = {content}
							onChange={e => setContent(e.target.value)} 
							required/>
					</Form.Group>
                    <Button variant="primary" type="submit" className="my-3 px-4">Add</Button>
                </Form>
		    </>
            :
            <Navigate to="/posts" />

	)


}