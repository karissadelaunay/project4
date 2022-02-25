const express = require('express');
const router = express.Router();
const favoritesCtrl = require('../../controllers/favorites')

router.post('/juice/:id', favoritesCtrl.create)
router.delete('/:id', favoritesCtrl.deleteFavorite)

module.exports = router;