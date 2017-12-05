var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, index: true, trim: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  read: {type: Number, default: 0},
  address: {type: String, required: true},
  postcode: {type: String, required: true},
  address2: {type: String, required: true}, 
  sido: {type: String},
  pay: {type: String, required: true},
  stime: {type: String, required: true},
  ftime: {type: String, required: true},
  org: {type: String, required: true},
  orgn: {type: String, required: true},
  person:{type:String,required: true, trim: true},
  var:{type:String,required: true, trim: true},
  var1:{type:String,required: true, trim: true},
  fileupload:{type: Buffer, contentType: String}
}, {  
  toJSON: {virtuals : true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
