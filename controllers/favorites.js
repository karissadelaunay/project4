const Juice = require('../models/juice');

module.exports = {
    create,
    deleteFavorite
}

async function create(req, res){
 
    try {
        const juice = await Juice.findById(req.params.id);
        juice.likes.push({username: req.user.username, userId: req.user._id}); 
        await juice.save()
        res.status(201).json({data: 'favorite added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteFavorite(req, res){
    try {
        
        const juice = await Juice.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        juice.likes.remove(req.params.id) 
		console.log(post, " <-= juice in delete!")
        
        await juice.save()
        res.json({data: 'favorite removed'})
    } catch(err){
        res.status(400).json({err})
    }
}