const Profile = require('../models/userInfo');
const Quote = require('../models/quote');
const fs = require('fs');

exports.getUserThread = (req, res, next) => {
    Profile.findOne({_id: req.body.userId})
        .then(profile => {
            let arrayOfQuote = profile.myQuotes;
            arrayOfQuote.push.apply(profile.quoteslikes);
            let entryMongoose = [];
            for (let idQuote of arrayOfQuote) {
                if(entryMongoose.indexOf(idQuotes) !== -1) {
                    entryMongoose.push(mongoose.Types.ObjectId(idQuote));
                }
            }
            Quote.find({_id: {$in: entryMongoose}})
                .then((thread) => res.status(200).json(thread))
                .catch((error) => res.status(500).json({error}));
                })
        .catch();
    }    

exports.getProfile = (req, res, next) => {
    Profile.findOne({userId: req.body.userId})
        .then(profile => res.status(200).json(profile))
        .catch(error => res.status(500).json({error}));
}

exports.updateProfile = (req, res, next) => {
    if(req.file) {
        Profile.findOne({_id: req.body.userId})
            .then((previousImage) => {
                const update = JSON.parse(req.body.profile);
                const filename = previousImage.imageUrl.split('/images/profile/')[1];
                fs.unlink(`images/images/${filename}`, () => {
                    Profile.updateOne({_id: req.body.userId}, {...update, _id: req.body.userId})
                        .then(() => {res.status(201).json({message: 'Mise à jour réussi'})})
                        .catch(error => res.status(400).json({error}));
                })
            })
            .catch(error => res.status(400).json({error}));
    }
    Profile.findOneAndUpdate({_id: req.body.userId}, {...req.body.profile, _id: req.body.userId})
        .then(() => res.status(200).json({mesage: 'Mise à jours réussi'}))
        .catch(error => res.status(400).json({error}));
}