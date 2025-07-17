import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});


// Prevent OverwriteModelError
const ReviewModel = mongoose?.models?.Review || mongoose.model('Review', reviewSchema)

export default ReviewModel
