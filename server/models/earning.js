import mongoose, { Schema } from 'mongoose'



const earningsSchema = new Schema({
    course: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});




// Prevent OverwriteModelError
const EarningsModel = mongoose?.models?.Earnings || mongoose.model('Earnings', earningsSchema)

export default EarningsModel
