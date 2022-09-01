const bcrypt = require('bcrypt');
const Account = require('../models/UserAuth');
const jwt = require('jsonwebtoken');

/*Middleware POST création de compte utilisateur*/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const account = new Account ({
            email: req.body.email,
            password: hash,
            administrator: false
        });
        account.save()
            .then(() => res.status(201).json({message: 'compte enregistré'}))
            .catch(error => res.status(400).json({error}));
    })       
    }

/*Middleware POST de login utilisateur*/
exports.login = (req, res, next) => {
    Account.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(404).json({error: 'Utilisateur inconnu'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe invalide'});
                    }
                    res.header('Authorization', 'Bearer '+ jwt.sign({userId: user._id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '24h'}));
                    res.status(200).json({
                        userId: user._id,
                        administrator: user.administrator,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}

/*Middleware de déconnexion utilisateur*/
exports.logout = (req, res, next) => {
    res.header('Authorization', 'Bearer');
    res.redirect('/');
}