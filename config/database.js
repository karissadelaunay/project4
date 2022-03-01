const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://karissadelaunay:15183394Kd@cluster1.1aqka.mongodb.net/aryasapothecaryP4?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});