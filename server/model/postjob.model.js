const mongoose = require("mongoose");

const PostJobSchema = mongoose.Schema({
  position: String,
  jobDescription: String,
  positionType: {
    type: Array,
   
   
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
  }
});

const PostJobModel = mongoose.model("PostJob", PostJobSchema);

module.exports = PostJobModel;
