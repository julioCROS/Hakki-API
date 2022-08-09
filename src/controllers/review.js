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
    repeatead: true,
    cleaner: removeAccents,
    aliases: {
        a: ["2", "4", "@", "Á", "Ã", "À", "Â", "Ä", "Å", "Æ", "@"],
        e: ["3", "&", "i", "é", "ê", "è", "ë"],
        i: ["1", "!", "|", "l", "í", "ì", "ï", "î", "Ï", "Î", "Í", "Ì"],
        o: ["0", "*", "Ó", "Õ", "Ò", "Ô", "Ö", "@"],
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
    let facilitacao = req.body.notaFacilitacao;
    let qualidade = req.body.notaQualidade;

    const review = new Review(req.body);
    review.save((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            Professor.findById(req.body.professor)
            .populate('reviews')
            .then(professor => {
                if(professor.mediaFacilitacao == null) professor.mediaFacilitacao = req.body.notaFacilitacao;
                else {
                    for(let i = 0; i < professor.reviews.length; i++) {
                        facilitacao += professor.reviews[i].notaFacilitacao;
                    }
                    facilitacao = facilitacao / (professor.reviews.length + 1);
                    professor.mediaFacilitacao = facilitacao;
                }
    
                
                if(professor.mediaQualidade == null) professor.mediaQualidade = req.body.notaQualidade;
                else {                    
                    for(let i = 0; i < professor.reviews.length; i++) {
                        qualidade += professor.reviews[i].notaQualidade;
                    }
                    
                    qualidade = qualidade / (professor.reviews.length + 1);
                    professor.mediaQualidade = qualidade;
                }

                professor.reviews.push(data._id);
                professor.save();
            });
            res.status(201).send(data);
        }
    });
}