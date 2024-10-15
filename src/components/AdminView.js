import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import DeletePost from './DeletePost';


export default function AdminView({ postsData, fetchData }) {


    const [posts, setPosts] = useState([])


    //Getting the postsData from the posts page
    useEffect(() => {
        console.log(postsData);

        const postsArr = postsData.map(post => {
            return (
                <tr key={post._id}>
                    <td>{post.author}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td className='text-center'><Link className="btn btn-info card-btn" to={`/posts/${post._id}/Posts`}>Read More</Link></td> 
                    <td className='text-center'><DeletePost post={post} fetchData={fetchData}/></td>
                </tr>
                )
        })

        setPosts(postsArr)

    }, [postsData])


    return(
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className='text-white bg-dark'>Author</th>
                        <th className='text-white bg-dark'>Title</th>
                        <th className='text-white bg-dark'>Content</th>
                        <th className='text-white bg-dark' colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {posts}
                </tbody>
            </Table>    
        </>

        )
}