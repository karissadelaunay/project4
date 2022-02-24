const Juice = require('../models/juice');

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

	s3.upload(params, async function(err, data){
		
		if (err) return res.status(400).json({err})
		
		try {
			let juice = await Juice.create({
				photoUrl: data.Location
			})

			juice = await juice.populate('user')
			res.status(201).json({post})


		} catch(err){
			console.log(err)
			res.status(400).json({err})
		}


	})


 }

 async function index(req, res) {
	try {
	  const juices = await Juice.find({});
	  res.status(200).json({ juices: juices });
	} catch (err) {
	  res.status(400).json({ err });
	}
  }