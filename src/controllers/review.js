const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.getByProfessor = async (req, res) => {
    await Review.find({ professor: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
}

exports.post = async (req, res) => {
    const review = new Review(req.body);
    await review.save((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
            const professor = mongoose.model('Professor');
            professor.findById(req.body.professor, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    if(data.reviews.length == 0){
                        data.mediaQualidade = req.body.notaQualidade;
                        data.mediaFacilitacao = req.body.notaFacilitacao;
                    } else {
                    data.mediaQuality = (data.mediaQuality * data.reviews.length + req.body.notaQualidade) / (data.reviews.length + 1);
                    data.mediaFacilitation = (data.mediaFacilitation * data.reviews.length + req.body.notaFacilitacao) / (data.reviews.length + 1);
                    data.reviews.push(review._id);
                    }
                    data.save((err, data) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message
                            });
                        } else {
                            res.status(200).send(data);
                        }
                    });
                }
            });
        }
    });
}