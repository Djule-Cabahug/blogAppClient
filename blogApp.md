# Blog API - Documentation

## Resources

- App Base Url
    - 

- Regular User
    - email: "user@mail.com"
    - password: "user1234"

- Admin User
    - email: "admin@mail.com"
    - password: "admin1234"

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "username": "sampleusername123",
        "password": "samplePw123"
    }

    ```
      
### posts

#### [POST] - "/posts/addPost"

- Sample Request Body

    ```json

    {
        "title": "Top 10 Summer Activities",
        "content": "The beach is a classic outdoor summer highlight...",
        "author": "John Doe"
    }

    ```

#### [GET] - "/posts/getAllPosts"

- No Request Body

#### [GET] - "/posts/getMyPosts"

- No Request Body

#### [GET] - "/posts/getPost/:id"

- No Request Body

#### [PATCH] - "/posts/updatePost/:id"

- Sample Request Body

    ```json

    {
        "title": "Top 10 Summer Activities",
        "content": "The beach is a classic outdoor summer highlight...",
        "author": "John Doe"
    }

    ```

#### [DELETE] - "/posts/deletePost/:id"

- No Request Body

#### [POST] - "/posts/addComment/:id"

- Sample Request Body

    ```json

    {
        "comment": "I enjoyed reading this post. Thank you for sharing.",
    }

    ```
#### [GET] - "/posts/getComments/:id"

- No Request Body

#### [DELETE] - "/posts/deletePostAsAdmin/:id"

- No Request Body

#### [DELETE] - "/posts/deleteComment/:id"

- No Request Body