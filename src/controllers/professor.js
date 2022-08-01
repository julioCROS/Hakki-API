const accents = require('remove-accents');
const mongoose = require('mongoose');
const Professor = mongoose.model('Professor');

exports.get = (req, res) => {
    Professor.find((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    }).populate('reviews');
}

exports.getById = (req, res) => {
    Professor.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    }).populate('reviews');
}

exports.getByNome = (req, res) => {
    req.params.nome = req.params.nome.toUpperCase().split('-').join(' ');
    Professor.findOne({ nome: req.params.nome }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    }).populate('reviews');
}

exports.post = (req, res) => {
    req.body.nome = accents.remove(req.body.nome);
    req.body.nome = req.body.nome.toUpperCase();
    const professor = new Professor(req.body);
    Professor.findOne({ nome: req.body.nome }, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else if (data) {
            res.status(400).send({
                message: "Professor já existe"
            });
        } else {
            professor.save((err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    res.status(201).send(data);
                }
            });
        }
    });
}