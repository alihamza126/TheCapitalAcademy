import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    question:{
        type: String,
        required: true,
        trim: true,
    },
    msg: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    isRead: {
        type: Boolean,
        default: false,
        required: false
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
});


// Prevent OverwriteModelError
const ReportModel = mongoose?.models?.Report || mongoose.model('Report', reportSchema)

export default ReportModel