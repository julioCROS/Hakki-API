const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Professor = new Schema({
    nome: {
        type: String,
        required: true
        match: [/^[a-zA-Z]{5,}+\s([a-zA-Z]+)+(\s[a-zA-Z]{0,})+$/, 'COPIE E COLE O NOME DO PROFESSOR COMO ELE APARECE NO SISTEMA DO CURSO'];
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    mediaQualidade: {
        type: Number,
    },
    mediaFacilitacao: {
        type: Number,
    }
});

module.exports = mongoose.model('Professor', Professor);
