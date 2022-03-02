const Post = require('../models/post');

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
	getRandomPost,
	show
}

function create(req, res){
	console.log(req.body, " <- req.body", req.file, " <photo", req.user)

	const filePath = `${uuidv4()}${req.file.originalname}`;
	const params = {Bucket: BUCKET, Key: filePath, Body: req.file.buffer}

	s3.upload(params, async function(err, data){
		
		if (err) return res.status(400).json({err})
		
		try {
			let post = await Post.create({
				caption: req.body.caption,
				location: req.body.location,
				user: req.user,
				photoUrl: data.Location
			})

			post = await post.populate('user')
			res.status(201).json({post})


		} catch(err){
			console.log(err)
			res.status(400).json({err})
		}


	})


 }
 


async function index(req, res) {
	try {
	  const posts = await Post.find({}).populate("user").exec();
	  res.status(200).json({ posts: posts });
	} catch (err) {
	  res.status(400).json({ err });
	}
  }

  
async function getRandomPost(req, res) {
	console.log("this is my random post function")
	try{

			const numPosts = await Post.estimatedDocumentCount()
			const random = Math.floor(Math.random() * numPosts)
			const randomPost = await Post.find().skip(random).limit(1).populate('user').exec()
			res.status(200).json({ post: randomPost });


	} catch(err){
		res.status(400).json({ err });
	}
} 

async function show(req, res) {
	console.log(req.params, "<-------this is the params stuff")
	try{

		const showPost = await Post.findById(req.params.id).populate('user').exec()
		res.status(200).json({ showPost: showPost })

	}catch(err){
		res.status(400).json({ err });
	}
}