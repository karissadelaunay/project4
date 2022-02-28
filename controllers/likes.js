const Post = require('../models/post');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id}); 
        await post.save()
        await post.populate('user')
        res.status(201).json({post: post})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        post.likes.remove(req.params.id) 
		console.log(post, " <-= post in delete!")
        
        await post.save()
        await post.populate('user')
        res.json({post: post})
    } catch(err){
        res.status(400).json({err})
    }
}