const cardModel = require('../models/card');
const userModel = require('../models/users');

const find = (req, res, next) =>{
    return cardModel.find({})
        .then(cards => {
            res.json(cards);
        })
}

const getCardMiddleware = (req, res, next) => {
    return cardModel.findOne({
        _id: req.params.cardId
    })
    .populate('user')
    .then(card => {
        if (!card){
            return next({status: 404, message: 'Card not found'});
        }

        req.card = card;
        next();
    })
    .catch((err)=>{
        next(err);
    })
}

const findOne = (req, res, next) =>{
    res.json(req.card);
}

const deleteCard = (req, res, next) => {
    cardModel.remove({_id: req.params.cardId})
        .then(data => res.json(data))
        .catch(next);
}

const create = (req, res, next) => {
    cardModel.create(req.body)
        .then((card) => {
            res.json(card);
        })
        .catch((err)=>{
            next(err);
        })
}

module.exports = {
    find,
    create,
    findOne,
    getCardMiddleware,
    deleteCard,
}