const mongoose = require("mongoose");

const PostJobSchema = mongoose.Schema({
  position: String,
  jobDescription: String,
  positionType: {
    type: String,
    enum: ['W2', 'Contract to hire', 'Corp to Corp'],
  },
  benefits: {
    type: String,
    enum: ['Available', 'Not Available'],
  },
  addNewQuestion: Array,
  status:{
    type: String,
    default:"Draft",
    enum:["Draft", "Posted"]
  },
  userID: String
});

const PostJobModel = mongoose.model("PostJob", PostJobSchema);

module.exports = PostJobModel;
