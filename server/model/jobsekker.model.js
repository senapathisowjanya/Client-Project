const mongoose = require("mongoose")

const ImageSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    image:{
        type: String
    }
})

const ImageModel = mongoose.model("Image", ImageSchema)

module.exports = ImageModel