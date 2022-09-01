const Quote = require('../models/quote');
const UserInfo = require('../models/userInfo');

/*Middleware d'envoie du tableau des quotes à partir de la base de donnée*/
exports.getAll = (req, res, next) => {
    Quote.find()
        .then(quotes => {
            const thread = quotes.reverse();
            res.status(200).json(thread);
        })
        .catch(error => res.status(500).json({error}));
}

/*Middleware de création d'une nouvelle quote sur la base de donnée*/
exports.createNewQuote = (req, res, next) => {
    let newQuote = new Quote ({...req.body})
    newQuote.save()
        .then((quote) => {
            UserInfo.findOne({userId: req.body.userId})
                .then(user => {
                    user.myQuotes.push(quote._id.toString());
                    UserInfo.updateOne({userId: req.body.userId}, {myQuotes: user.myQuotes})
                        .then(() => res.status(201).json({message: 'Quote postée', quoteId: quote._id}) )
                        .catch(error => res.status(500).json({error, message: "update user impossible"}));
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}

/*Middleware de modification d'une quote existante*/
exports.updateOne = (req, res, next) => {
    Quote.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => {res.status(201).json({message: 'Mise à jour réussi'})})
        .catch(error => res.status(400).json({error}));
}

/*Middlewware de suppression d'une quote*/
exports.deleteOne = (req, res, next) => {
    Quote.findOne({_id: req.params.id})
        .then(quote => {
            Quote.deleteOne({_id: req.params.id})
            .then(() => {
                UserInfo.findOne({userId: quote.userId})
                    .then(user => {
                        user.myQuotes = user.myQuotes.filter(function(i){return i !== req.params.id});
                        UserInfo.updateOne({userId: quote.userId}, {myQuotes: user.myQuotes})
                            .then(() => res.status(200).json({message: 'Objet Supprimé'}))
                            .catch(error => res.status(500).json({error, message: "update user impossible"}));
                    })
                    .catch(error => res.status(500).json({error, message: "2"}));
            })
            .catch((error) => res.status(401).json({error}))
        })
        .catch(error => res.status(500).json({error, message: "1"}));
}

/*Middleware d'ajout et suppression de like/dislike sur l'entré de la quote et de l'utilisateur*/
exports.likeOne = (req, res, next) => {
    Quote.findOne({_id: req.params.id})
        .then(quote => {
            if (quote.usersLiked.has(req.body.userId) && req.body.like == 0) {
                quote.usersLiked.delete(req.body.userId);
            } else if (quote.usersLiked.has(req.body.userId) && req.body.like != 0) {
                res.status(400).json({message: 'Mention like/dislike déjà utilisée sur cette quote'});
            }
            if (req.body.like == 1) {
                quote.usersLiked.set(req.body.userId, true);
            } else if (req.body.like == -1) {
                quote.usersLiked.set(req.body.userId, false);
            }
            Quote.updateOne({_id: req.params.id}, {usersLiked: quote.usersLiked})
                .then(() => {
                    UserInfo.findOne({userId: req.body.userId})
                        .then(userInfo => {
                            if (req.body.like == 1 ) {
                                userInfo.quotesLikes.set(req.params.id, true);
                            } else if (req.body.like == -1 ) {
                                userInfo.quotesLikes.set(req.params.id, false);
                            } else {
                                userInfo.quotesLikes.delete(req.params.id);
                            }
                            UserInfo.updateOne({userId: req.body.userId}, {quotesLikes: userInfo.quotesLikes})
                                .then(() => res.status(201).json({quotesLikes: userInfo.quotesLikes, usersLiked: quote.usersLiked}))
                                .catch(error => res.status(400).json({error, message: "Mise à jour impossible"}));
                        })
                        .catch(error => res.status(404).json({error, message: "Utilisateur non trouvé"}));
                })
                .catch(error => res.status(400).json({error, message: "Fuck"}));
        })
        .catch(error => res.status(404).json({error}));
}