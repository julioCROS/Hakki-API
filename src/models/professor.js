const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Professor = new Schema({
    nome: {
        type: String,
        required: true,
        match: [/^[A-Za-z]{3,}(\s[A-Za-z]{2,}){2,}$/, "Copie e cole o nome inteiro do professor"]
        
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    mediaQualidade: {
        type: Number,
        default: null
    },
    mediaFacilitacao: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Professor', Professor);
