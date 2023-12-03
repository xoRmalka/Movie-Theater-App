const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const dbURI = 'mongodb://127.0.0.1:27017/CinemaDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to CinemaDB');
});

module.exports = mongoose;
