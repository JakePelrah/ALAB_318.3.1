Create the following routes, using good organizational and coding practices:
GET /api/users/:id/posts
Retrieves all posts by a user with the specified id.
GET /api/posts?userId=<VALUE>
Retrieves all posts by a user with the specified postId.
It is common for APIs to have multiple endpoints that accomplish the same task. This route uses a "userId" query parameter to filter posts, while the one above uses a route parameter.
GET /comments
Note that we do not have any comments data yet; that is okay! Make sure that you create a place to store comments, but you do not need to populate that data.
POST /comments
When creating a new comment object, it should have the following fields:
id: a unique identifier.
userId: the id of the user that created the comment.
postId: the id of the post the comment was made on.
body: the text of the comment.
GET /comments/:id
Retrieves the comment with the specified id.
PATCH /comments/:id
Used to update a comment with the specified id with a new body.
DELETE /comments/:id
Used to delete a comment with the specified id.
GET /comments?userId=<VALUE>
Retrieves comments by the user with the specified userId.
GET /comments?postId=<VALUE>
Retrieves comments made on the post with the specified postId.
GET /posts/:id/comments
Retrieves all comments made on the post with the specified id.
GET /users/:id/comments
Retrieves comments made by the user with the specified id.
GET /posts/:id/comments?userId=<VALUE>
Retrieves all comments made on the post with the specified id by a user with the specified userId.
GET /users/:id/comments?postId=<VALUE>
Retrieves comments made by the user with the specified id on the post with the specified postId