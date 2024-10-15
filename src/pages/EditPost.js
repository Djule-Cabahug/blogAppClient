import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function EditPost() {
	const notyf = new Notyf();

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const { postId } = useParams();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(()=> {
        console.log(postId);

        fetch(`https://blogappserver-tag3.onrender.com/posts/getPost/${postId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.hasOwnProperty("_id")){

                setTitle(data.title)
                setContent(data.content)

            } else {

                notyf.error("Internal Server Error. Notify System Admin.")
            }
        });

    }, [postId]);


	const editPost = (e) => {
		e.preventDefault();

		fetch(`https://blogappserver-tag3.onrender.com/posts/updatePost/${postId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title: title,
				content: content
			})
		})
		.then(res=> res.json())
		.then(data => {

			console.log(data)

			if (data.error === 'Post not found'){

				notyf.error("Post not found")

			} else if (data.message === 'Post updated successfully'){

				notyf.success("Post successfully added");

				navigate("/myPosts")

			} else {


				notyf.error("Something went wrong. Contact System Admin.");
			}
		})
	}


	return (

		(user.isAdmin === false)
		?
		<>
			<Link className='btn btn-dark mt-5 px-4' to="/myPosts">Back</Link>
			<h1 className="my-5 text-center">Update Post</h1>
			<Form onSubmit={e => editPost(e)}>
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
				<Button variant="success" type="submit" className="my-3">Update</Button>
			</Form>
		</>
		:
		<Navigate to="/posts" />
	)
}