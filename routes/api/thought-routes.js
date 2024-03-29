const router = require('express').Router();
const {
  getAllThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactiondId').delete(deleteReaction);

module.exports = router;
