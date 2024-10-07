import express from 'express'
import comments from '../data/comments.json' with {type: "json"}

import posts from '../data/posts.json' with {type: "json"}
import error from "../utilities/error.js";

const postRouter = express.Router();

postRouter
  .route("/")
  .get((req, res) => {

    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    if (req.query) {
      let userPosts = posts.filter((u) => u.userId == req.query.userId);
      res.json({ userPosts, links });
      return
    }

    res.json({ posts, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

postRouter
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

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

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

postRouter
  .route("/:id/comments")
  .get((req, res, next) => {
    const { id } = req.params

    if (req.query) {
      const { userId } = req.query
      let userComments = comments.filter((u) => u.userId == userId && u.id == id);
      res.json({ userComments });
      return
    }

    const userComments = comments.filter((u) => u.id == id);
    res.json({ userComments });
  })



export default postRouter
