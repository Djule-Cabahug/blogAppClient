import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function DeletePost({post, fetchData}){

    const notyf = new Notyf();

    const { user } = useContext(UserContext);

    const [postId, setPostId] = useState(post._id)

    const deletePost = () => {

        fetch(`https://blogappserver-tag3.onrender.com/posts/deletePost/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === 'Post not deleted'){

                fetchData();

                notyf.error("Post not deleted");

            } else if (data.message === 'Post deleted successfully') {

                fetchData();

                notyf.success("Post deleted successfully");

            } else {

                fetchData();

                notyf.error("Something went wrong. Contact System Admin.");
            }
        })
    }

    const deletePostAsAdmin = () => {

        fetch(`https://blogappserver-tag3.onrender.com/posts/deletePostAsAdmin/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === 'Post not deleted'){

                fetchData();

                notyf.error("Post not deleted");

            } else if (data.message === 'Post deleted successfully') {

                fetchData();

                notyf.success("Post deleted successfully");

            } else {

                fetchData();

                notyf.error("Something went wrong. Contact System Admin.");
            }
        })
    }

    return (

        (user.isAdmin === false)
        ?
        <Button variant='danger' onClick={deletePost}>Delete</Button>
        :
        <Button variant='danger' onClick={deletePostAsAdmin}>Delete</Button>
    )
}