import mongoose from 'mongoose'

const topbarSchema = new mongoose.Schema({
    tcontent: {
        type: String,
        default: "Welcome Dear Student! May Your Journey Be Filled With Joy & Success"
    },
    createdAt: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema({
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
const Home = mongoose?.models?.topbarSchema || mongoose.model('Common', topbarSchema)
const Review = mongoose?.models?.reviewSchema || mongoose.model('Review', reviewSchema)

export { Home, Review }
