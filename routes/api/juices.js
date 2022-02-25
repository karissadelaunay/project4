const express = require('express');
const router = express.Router();
const juicesCtrl = require('../../controllers/juices');
const multer = require('multer');
const upload = multer(); 


router.post('/', isAuthenticated, upload.single('photo'), juicesCtrl.create);
router.get('/', juicesCtrl.index)

function isAuthenticated(req, res, next){
	if(req.user){
		next()
	} else {
		res.status(401).json({data: 'Not Authorized!'})
	}
}



module.exports = router;