import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import PostCard from './PostCard';

export default function UserView({postsData}) {

	const [posts, setPosts] = useState([])

	useEffect(() => {
		console.log(postsData);

		const postsArr = postsData.map(post => {
			return(
				<PostCard postProp={post} key={post._id}/>
			)
		})

		//set the posts state to the result of our map function, to bring our returned post component outside of the scope of our useEffect where our return statement below can see.
		setPosts(postsArr)

	}, [postsData])


	return(
		<>
			<h2 className='posts-title text-center my-3'>Posts</h2>
			<Row>
				{ posts }
			</Row>
		</>
		)
}