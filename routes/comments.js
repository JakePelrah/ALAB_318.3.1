import express from 'express'
import comments from '../data/comments.json' with {type: "json"}
import error from "../utilities/error.js";

const commentRouter = express.Router();

commentRouter
    .route("/")
    .get((req, res) => {
        res.json({ comments });
    })
    .post((req, res, next) => {
        if (req.body.userId && req.body.postId && req.body.comment) {
            const comment = {
                id: comments[comments.length - 1].id + 1,
                userId: req.body.userId,
                postId: req.body.postId,
                comment: req.body.comment,
            };

            comments.push(comment);
            res.json(comments[comments.length - 1]);
        } else next(error(400, "Insufficient Data"));
    });

commentRouter
    .route("/:id")
    .get((req, res, next) => {
        console.log(req.params)
        const userComments = comments.filter((p) => p.userId == req.params.id);

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

        if (userComments) res.json({ userComments, links });
        else next();
    })
    .patch((req, res, next) => {
        const comment = comments.find((p, i) => {
            if (p.id == req.params.id) {
                console.log(req.body)
                for (const key in req.body) {
                    comments[i][key] = req.body[key];
                }
                return true;
            }
        });

        if (comment) res.json(comment);
        else next();
    })
    .delete((req, res, next) => {
        const comment = comments.find((p, i) => {
            if (p.id == req.params.id) {
                comments.splice(i, 1);
                return true;
            }
        });

        if (comment) res.json(comment);
        else next();
    });




export default commentRouter
