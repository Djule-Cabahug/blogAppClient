import { useState, useEffect, useContext } from 'react';
import PostCard from '../components/PostCard';
import { Notyf } from 'notyf';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function Post() {

	const {user} = useContext(UserContext);

	const notyf = new Notyf();

	// Checks to see if the mock data was captured
	// console.log(postsData);
	// console.log(postsData[0]);
	const [posts, setPosts] = useState([]);

	//Use the useEffect to render all available posts
	//add user global state as its dependency to ensure that in every refresh, we run the useEffect and the fetchData() method.

	const fetchData = () => {

		fetch(`https://blogappserver-tag3.onrender.com/posts/getMyPosts`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if (data.hasOwnProperty("posts")) {
				
				const postsArr = data.posts.map(post => {
					return(
						<PostCard postProp={post} key={post._id} fetchData={fetchData}/>
					)
				})

				setPosts(postsArr)

			} else {

				notyf.error("Something went wrong. Contact System Admin.")
			}

		});
	}

	useEffect(() => {

		fetchData();

	}, [user]);

	console.log(user);


	return(
		<>
			<h2 className='posts-title text-center my-4'>My Posts</h2>
			<Link to="/addPost" className='btn btn-primary add-post-btn mb-3'>Add Post<span className='material-symbols-outlined'>add</span></Link>

			<Row>
				{ posts }
			</Row>
		</>
	)
}