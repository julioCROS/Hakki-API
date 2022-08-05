const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Professor = mongoose.model('Professor');

const Piii = require("piii");
const piiiFilters = require("piii-filters");
const dotenv = require('dotenv');
dotenv.config();

const badWordsFilter = process.env.BAD_WORDS.split(" ");

const removeAccents = string => string
  .replace(/ç/g, "c")
  .replace(/ss/g, "c")

const piii = new Piii({
    filters: [
      Object.values(piiiFilters), badWordsFilter
    ],
    censor: badWord => {
        return "❤️";
    },
    repeatead: true,
    cleaner: removeAccents,
    aliases: {
        a: ["2", "4", "@", "Á", "Ã", "À", "Â", "Ä", "Å", "Æ"],
        e: ["3", "&", "i", "é", "ê", "è", "ë"],
        i: ["1", "!", "|", "l", "í", "ì", "ï", "î", "Ï", "Î", "Í", "Ì"],
        o: ["0", "*", "Ó", "Õ", "Ò", "Ô", "Ö"],
        c: ["k", "q", "ç", "č", "ć", "ĉ", "¢", "©"],
    }
  });

exports.getByProfessor = (req, res) => {
    Review.find({ professor: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
}

exports.post = (req, res) => {
    req.body.comentario = piii.filter(req.body.comentario);
    const review = new Review(req.body);
    review.save((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            Professor.findById(req.body.professor).then(professor => {
                if(professor.mediaFacilitacao == null) professor.mediaFacilitacao = req.body.notaFacilitacao;
                else professor.mediaFacilitacao = (professor.mediaFacilitacao + req.body.notaFacilitacao) / 2;
                
                if(professor.mediaQualidade == null) professor.mediaQualidade = req.body.notaQualidade;
                else professor.mediaQualidade = (professor.mediaQualidade + req.body.notaQualidade) / 2;

                professor.reviews.push(data._id);
                professor.save();
            });
            res.status(201).send(data);
        }
    });
}