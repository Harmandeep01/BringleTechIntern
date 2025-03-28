const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    mimetype: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', FileSchema);