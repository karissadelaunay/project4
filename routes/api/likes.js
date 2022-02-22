const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes')


// /api/posts/someId/likes
router.post('/posts/:id/likes', likesCtrl.create)
// /api/likes/:id
router.delete('/likes/:id', likesCtrl.deleteLike)

module.exports = router;