const router = require("express").Router();

const {
  getAllthoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllthoughts);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId").get(getOneThought).put(updateThought);

// /api/thoughts/<userId>
router.route("/:userId").post(createThought);

// /api/thoughts/<userId>/<thoughtId>
router.route("/:userId/:thoughtId").delete(deleteThought);

// /api/thoughts/<thoughtId>/reaction
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/<thoughtId>/reaction/<reactionId>
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
