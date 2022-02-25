const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer = require('multer');
const upload = multer(); 


router.post('/', isAuthenticated, upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index);
router.get('/random', postsCtrl.getRandomPost);

function isAuthenticated(req, res, next){
	if(req.user){
		next()
	} else {
		res.status(401).json({data: 'Not Authorized!'})
	}
}



module.exports = router;