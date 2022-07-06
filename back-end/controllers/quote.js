const Quote = require('../models/quote');
const fs = require('fs');

/*Middleware d'envoie du tableau des quotes à partir de la base de donnée*/
exports.getAll = (req, res, next) => {
    Quote.find()
        .then(quotes => res.status(200).json(quotes))
        .catch(error => res.status(500).json({error}));
}

/*Middleware de création d'une nouvelle entré sur la base de donnée*/
exports.createNewQuote = (req, res, next) => {
    let quoteObject = {};
    let newQuote = {};
    if(req.file) {
        quoteObject = JSON.parse(req.boby.quote);
        newQuote = new Quote ({
            ...quoteObject,
            userLiked: new Map(),
            responseTo: '',
            imageUrl: `${req.protocole}://${req.get('host')}/images/quote/${req.file.filename}`,
            })
    } else {
        quoteObject = req.boby.quote;
        newQuote = new Quote({
            ...quoteObject,
            userLiked: new Map(),
            responseTo: '',
            imageUrl: ''
        })
    }
    newQuote.save()
        .then(() => res.status(201).json({message: 'Quote postée'}))
        .cath(error => res.status(500).json({error}));
}

/*Middleware de modification d'une sauce existante*/
exports.updateOne = (req, res, next) => {
    if (req.file) {
        Quote.findOne({_id: req.params.id})
            .then((oldQuote) => {
                const update = JSON.parse(req.body.quote);
                const filename = oldQuote.imageUrl.split('/images/quote/')[1];
                fs.unlink(`/images/quote/${filename}`, () => {
                    Quote.updateOne({_id: req.params.id}, {...update, _id: req.params.id, imageUrl: `${req.protocole}://${req.get('host')}/images/quote/${req.file.filename}`})
                        .then(() => {res.status(201).json({message: 'mise à jour réussi'})})
                        .catch(error => res.status(400).jon({error}));
                })
            })
            .catch(error => res.status(500).json({error}));
    } else {
        Quote.updateOne({_id: req.params.id}, {...req.body.quote, _id: req.params.id})
            .then(() => {res.status(201).json({message: 'Mise à jour réussi'})})
            .catch(error => res.status(400).json({error}));
    }
}

/*Middlewware de suppression d'une sauce*/
exports.deleteOne = (req, res, next) => {
    Quote.findOne({_id: req.params.id})
    .then(quote => {
        const filename = quote.imageUrl.split('/images/quote/')[1];
        fs.unlink(`images/quote/${filename}`, () => {
            Quote.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet Supprimé'}))
                .catch((error) => res.status(401).json({error}));
        });
    })
    .catch((error) => res.status(500).json({error}));
}

/*Middleware d'ajout et suppression de like/dislike*/
exports.likeOne = (req, res, next) => {
    Quote.findOne({_id: req.params.id})
        .then(quote => {
            if (quote.usersLiked.has(req.params.id) && req.body.like == 0) {
                quote.userLiked.delete(req.params.id);
            } else if (quote.usersLiked.has(req.params.id) && req.body.like != 0) {
                res.status(400).json({message: 'Mention like/dislike déjà utilisée sur cette quote'});
            }
            if (req.body.like == 1) {
                quote.userLiked.set(req.body.userId, true);
            } else if (req.body.like == -1) {
                quote.userLiked.set(req.body.userId, false);
            }
            Quote.updateOne({_id: quote.id}, {...quote, _id: quote.id})
                .then(() => res.staus(201).json({message: 'Like/dislike mis à jour'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}