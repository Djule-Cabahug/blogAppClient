import { useState , useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Notyf } from 'notyf';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function PostView() {

    //create an instance of notyf to allow access to its methods and use
    const notyf = new Notyf();

    const { user } = useContext(UserContext);

    const { postId, page } = useParams()

    console.log(page);

    //an object with methods to redirect the user

	const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

     
    useEffect(()=> {
        console.log(postId);

        fetch(`https://blogappserver-tag3.onrender.com/posts/getPost/${postId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.hasOwnProperty("_id")){

                setTitle(data.title)
                setAuthor(data.author)
                setContent(data.content)
				setComments(data.comments.map(item => {
                    return (
                        <div className='my-5' key={item._id}>
                           <p className='fw-bold text-start d-flex justify-content-between'>
                                {item.userId}

                                {user.isAdmin
                                ?
                                <Button variant='danger' onClick={() => deleteComment(postId, item._id)}>Delete</Button>
                                :
                                null
                                }
                            </p>
                            <p className='text-start'>{item.comment}</p>
                        </div>
                    )
                }))

            } else {

                notyf.error("Internal Server Error. Notify System Admin.")
            }
        });

    }, [postId, user]);

    
    const getComments = () => {

        fetch(`https://blogappserver-tag3.onrender.com/posts/getComments/${postId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            setComments(data.comments.map(item => {
                return (
                    <div className='my-5'>
                       <p className='fw-bold text-start d-flex justify-content-between'>
                            {item.userId}

                            {user.isAdmin
                            ?
                            <Button variant='danger' onClick={() => deleteComment(postId, item._id)}>Delete</Button>
                            :
                            null
                            }
                        </p>
                        <p className='text-start'>{item.comment}</p>
                    </div>
                )
            }))
        })
    }

    
    function addComment(e){

        e.preventDefault();

        fetch(`https://blogappserver-tag3.onrender.com/posts/addComment/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                comment: comment
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === "Post not found"){

                notyf.error("Post not found")

            } else if (data.message === 'comment added successfully'){

                setComment("");
                getComments();

                notyf.success('Comment added successfully')

            } else {

                notyf.error("Internal Server Error. Notify System Admin.")
            }
        })
    }

    const deleteComment = (postId, commentId) => {

        fetch(`https://blogappserver-tag3.onrender.com/posts/deleteComment/${postId}/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            if (data.error === "Post not found"){

                notyf.error("Post not found");

            } else if (data.message === "Comment successfully deleted"){

                getComments();

                notyf.success("Comment successfully deleted");

            } else if (data.error === "Comment not found"){

                notyf.error("Comment not found")

            } else {

                notyf.error("Internal Server Error. Notify System Admin.")
            }
        })
    }


	return (
	<Container className="mt-5">
       <Row>
           <Col lg={{ span: 6, offset: 3 }}>
               <Card>
                   <Card.Body className="text-center">
                        <Link className='btn btn-dark back d-table me-auto' to={page === "Posts" ? "/posts" : "/myPosts"}>Back</Link>
                        <Card.Title className='mb-3'>{title}</Card.Title>
                        <Card.Text>By: {author}</Card.Text>
                        <Card.Text>{content}</Card.Text>
                        <Card.Subtitle className='fs-4 text-start mt-5'>Comments &#40;{comments.length}&#41;</Card.Subtitle>
                        <hr/>
                       
                        {user.isAdmin
                        ?
                            comments.length === 0
                            ?
                            "No Comments Yet"
                            :
                            null
                        :
                        <Form onSubmit={e => addComment(e)}>
                            <Form.Group className="mb-2" controlId="addComment">
                                <Form.Control 
                                    as="textarea" 
                                    rows={3}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                            </Form.Group>
                            {(user.id !== null)
                            ?
                            <Button type='submit' variant='success' className='d-block ms-auto my-3'>Add Comment</Button>
                            :
                            <Link className='btn btn-danger d-table ms-auto my-3' to="/login">Log in to Add Comment</Link>
                            }
                        </Form>
                        }
                        {comments}
                      
                    </Card.Body>        
               </Card>
           </Col>
       </Row>
   </Container>
           )	
	} 