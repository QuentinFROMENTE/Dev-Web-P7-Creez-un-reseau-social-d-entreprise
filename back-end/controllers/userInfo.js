const Profile = require('../models/userInfo');

exports.getProfile = (req, res, next) => {
    Profile.findOne({userId: req.params.id})
        .then(profile => res.status(200).json(profile))
        .catch(error => res.status(500).json({error}));
}

exports.createProfile = (req, res, next) => {
    const quotesLikes = new Map();
    const profile = new Profile ({
        ...req.body,
        completeName: req.body.firstName + ' ' + req.body.lastName,
        myQuotes: [],
        quotesLikes: quotesLikes
    })
    profile.save()
        .then(() => res.status(201).json({message: "Profile créé"}))
        .catch((error) => res.status(400).json({error}));
    }

exports.updateProfile = (req, res, next) => {
    Profile.findOneAndUpdate({userId: req.body.userId}, {...req.body, userId: req.body.userId})
        .then(() => res.status(200).json({mesage: 'Mise à jours réussi'}))
        .catch(error => res.status(400).json({error}));
}