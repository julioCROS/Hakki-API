const mongoose = require('mongoose');
const Professor = mongoose.model('Professor');

exports.get = async (req, res) => {
    await Professor.find((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    }).populate('reviews');
}

exports.getById = async (req, res) => {
    await Professor.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    }).populate('reviews');
}

exports.post = async (req, res) => {
    const professor = new Professor(req.body);
    await professor.save((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
}