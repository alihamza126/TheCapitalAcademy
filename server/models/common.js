import mongoose from 'mongoose'

const topbarSchema = new mongoose.Schema({
    tcontent: {
        type: String,
        default: "Welcome Dear Student! May Your Journey Be Filled With Joy & Success"
    },
    createdAt: { type: Date, default: Date.now },
});



// Prevent OverwriteModelError
const Home = mongoose?.models?.topbarSchema || mongoose.model('Common', topbarSchema)

export { Home }
