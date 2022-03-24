import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true},
    checked: { type: Boolean, required: true },
    links: { type: Array, required: true }
}, { timestamps: true })

const reel = mongoose.model('imaginaire', itemSchema);

export default reel;