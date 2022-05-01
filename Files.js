const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({

    fileName: {
        contentType: String,
        //data: Buffer
    },
    dateUploaded: {
        type: Date,
        default: Date.now
    }
})

const Files = mongoose.model('Files', FileSchema);
module.exports = Files;