const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Professor = mongoose.model('Professor');

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