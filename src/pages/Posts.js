import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

import UserContext from '../context/UserContext';

export default function Posts() {

	const {user} = useContext(UserContext);

	// Checks to see if the mock data was captured
	// console.log(postsData);
	// console.log(postsData[0]);

	const [posts, setPosts] = useState([]);
	//Create a function and add the fetch data here
	const fetchData = () => {

		//headers is included for both /posts/all and /posts/ to allow flexibility even if it is not needed.
		fetch(`http://localhost:4000/posts/getAllPosts`)
		.then(res => res.json())
		.then(data => {

			setPosts(data.posts)
		});
	}

	//Use the useEffect to render all available posts
	//add user global state as its dependency to ensure that in every refresh, we run the useEffect and the fetchData() method.
	useEffect(() => {

		fetchData()

	}, [user]);

	console.log(user);
	

	return(
		(user.isAdmin === true)
		?
			<AdminView postsData={posts} fetchData={fetchData} />
		:
			<UserView postsData={posts} />
	)
}