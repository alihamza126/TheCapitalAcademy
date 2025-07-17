import mongoose, { Schema } from 'mongoose'

const referralCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    priceDiscount: {
        type: Number,
        required: true
    },
    expireDate: {
        type: Date,
        required: false
    }
});




// Prevent OverwriteModelError
const ReferalModel = mongoose?.models?.ReferralCode || mongoose.model('ReferralCode', referralCodeSchema)

export default ReferalModel