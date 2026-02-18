const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware")

// POST /api/posts [protected]
// req.body = {caption image-file}
// /api/posts/

postRouter.post(
  "/",
  identifyUser,
  upload.single("image"),
  postController.createPostController,
);

// @routes GET /api/posts/ [protected]
postRouter.get("/", identifyUser, postController.getPostController);

// @routes GET /api/posts/details/:postId
// return an detail about specific post with the id. also check whether the post belongs to the user that the request comes from
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailscontroller)

// @route POST /api/posts/like/:postid
// @description like a post with the id provided in the request params 
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter;
