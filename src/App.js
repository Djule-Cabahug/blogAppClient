import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Container from 'react-bootstrap/Container'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostView from './pages/PostView';
import MyPosts from './pages/MyPosts';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Logout from './pages/Logout';
import Error from './pages/Error';



function App() {

  //State hook for the user state is defined here to allow it to have a global context/scope
  //This can be achieved using prop drilling, or via react context
  //This will used to store the user information and will be used for validating if a user  is logged in on the app or not
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  //function for clearing localStorage on logout.
  function unsetUser(){
    localStorage.clear()
  }

  useEffect(() => {
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data.auth !== "Failed")
      if (data.auth !== "Failed") {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });

      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
  }, []) 


  //Used to check if the information is properly stored upon login and the localStorage information is cleared upon logout.
  useEffect(()=> {
    console.log(user);
    console.log(localStorage);
  }, [user])




  return (
      <>
        <UserProvider value={{ user, setUser, unsetUser}}>
          <Router>
            <AppNavbar/>
            <Container>
              <Routes>
              <Route path='/' element={<Home />} />
                <Route path="/posts" element={<Posts />}/>
                <Route path="/posts/:postId/:page" element={<PostView/>}/>
                <Route path='/myPosts' element={<MyPosts />}/>
                <Route path="/addPost" element={<AddPost />}/>
                <Route path="/editPost/:postId" element={<EditPost />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
          </Router> 

        </UserProvider>
      </>
  );
}

export default App;

/*
  IMPORTANT NOTE:
  - Storing information in a context object is done by providing any information such as states and functions using the corresponding "Provider" component
  - All information provided to the "provider" component can be accessed later on the from the context object as properties to componets "wrapped"
  - The "user" state, "setUser" function, and the "unsetUser" function will be available to all the pages since the "UserProvider" component
  "wraps" the router components and all of it's pages.
*/

// In react JS, multiple components rendered in a single component it should be wrapped in a parent component. Not doing so, will return an error in our application. The "JSX Fragment" component to render it properly.