import mongoose, { Schema } from 'mongoose'


const courseSchema = new Schema({
    cname: {
        type: String,
        enum: ['nums', 'mdcat', 'mdcat+nums'],
        required: true
    },
    cdesc: {
        type: String,
        required: true
    },
    cprice: {
        type: Number,
        required: true
    },
});



// Prevent OverwriteModelError
const CourseModel = mongoose?.models?.Course || mongoose.model('Course', courseSchema)

export default CourseModel
