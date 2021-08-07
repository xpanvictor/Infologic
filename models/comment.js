const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const commentSchema = new mongoose.Schema({
    commenter: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports('Comment', commentSchema)