const router = require('express').Router();
const cardController = require('../../controllers/card');

router.get('/', cardController.find);

router.get('/:cardId', cardController.getCardMiddleware, cardController.findOne);

router.delete('/:cardId', cardController.getCardMiddleware, cardController.deleteCard);

router.post('/', cardController.create);

module.exports = router;