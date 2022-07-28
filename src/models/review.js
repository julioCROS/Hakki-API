const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor'
    },
    comentario: {
        type: String,
        required: true
    },
    notaQualidade: {
        type: Number,
        required: true
    },
    notaFacilitacao: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', Review);