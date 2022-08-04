const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor'
    },
    comentario: {
        type: String,
        required: true,
        maxlength: 250
    },
    notaQualidade: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    notaFacilitacao: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', Review);