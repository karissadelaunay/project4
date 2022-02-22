const Post = require('../models/post');

const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();

const BUCKET = process.env.BUCKET_NAME;

module.exports = {
    create,
    index
}

function create(req, res){
	console.log(req.body, " <- req.body", req.file, " <photo", req.user)

	const filePath = `${uuidv4()}${req.file.originalname}`;
	const params = {Bucket: BUCKET, Key: filePath, Body: req.file.buffer}

	// s3 making a request to aws s3 bucket
	s3.upload(params, async function(err, data){
		// check aws error
		if (err) return res.status(400).json({err})
		// We're inside of the response from aws 
		try {
			// model talking to mongodb
			let post = await Post.create({
				caption: req.body.caption,
				location: req.body.location,
				user: req.user,
				photoUrl: data.Location
			})

			post = await post.populate('user')

			// respond to the client
			// What file on the client can we log out this response?
			res.status(201).json({post})


		} catch(err){
			console.log(err)
			res.status(400).json({err})
		}


	})


 }
 


async function index(req, res) {
	try {
	  // this populates the user when you find the posts
	  // so you'll have access to the users information
	  // when you fetch teh posts
	  const posts = await Post.find({}).populate("user").exec();
	  res.status(200).json({ posts: posts });
	} catch (err) {
	  res.status(400).json({ err });
	}
  }