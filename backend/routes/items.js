const router = require('express').Router();
let Item = require('../models/item.model');


// get all items for user
router.route('/').get((req, res) => {
    Item.find({ user: req.query.user })
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err))
})

// create a new item for user
router.route('/').post((req, res) => {
    const count_id = req.body.count_id;
    const pak_id = req.body.pak_id;
    const name = req.body.name;
    const user = req.body.user;

    const newItem = new Item({
        count_id,
        pak_id,
        name,
        user
    });

    newItem.save()
        .then(() => res.json('item added!'))
        .catch(err => res.status(400).json('Error ' + err))
})

// delete an item for user
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('item deleted'))
        .catch(err => res.status(400).json('error' + err))
})

// modify an item for user
router.route('/:id').put((req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json('item updated'))
        .catch(err => res.status(400).json('error' + err)) 
})

module.exports = router;