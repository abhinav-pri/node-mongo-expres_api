const mongoose = require('mongoose');
const mongoDB =  'mongodb://abhinax:specnaz123@ds119662.mlab.com:19662/todolist-node';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;