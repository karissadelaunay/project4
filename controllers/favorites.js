const Juice = require('../models/juice');

module.exports = {
    create,
    deleteFavorite
}

async function create(req, res){
 
    try {
        const juice = await Juice.findById(req.params.id);
        juice.favorites.push({username: req.user.username, userId: req.user._id}); 
        await juice.save()
        res.status(201).json({data: 'favorite added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteFavorite(req, res){
    try {
        
        const juice = await Juice.findOne({'favorites._id': req.params.id, 'favorites.username': req.user.username});
        console.log(juice, '<-------this juice stuff favorites')
        juice.favorites.remove(req.params.id) 
		console.log(juice, " <-= juice in delete!")
        
        await juice.save()
        res.json({data: 'favorite removed'})
    } catch(err){
        res.status(400).json({err})
    }
}