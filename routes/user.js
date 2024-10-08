import express from 'express'
import users from '../data/users.json' with {type: "json"}
import posts from '../data/posts.json' with {type:"json"}
import error from '../utilities/error.js';
import comments from '../data/comments.json' with {type: "json"}

const userRouter = express.Router();

userRouter
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }

      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

     
      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });



userRouter
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });


  userRouter.route("/:id/posts")
  .get((req, res, next) => {

    const userPosts = posts.filter((u) => u.userId == req.params.id);
    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (userPosts) res.json({ userPosts, links });
    else next();
  
  })

  userRouter
  .route("/:id/comments")
  .get((req, res, next) => {

    const { id } = req.params
    
    if (req.query) {
      const { postId } = req.query
      console.log(postId, id)
      let userComments = comments.filter((u) => u.id == postId && u.userId == id);
      res.json({ userComments });
      return
    }


    const userComments = comments.filter((u) => u.userId == id);
    res.json({ userComments });
  })




export default userRouter