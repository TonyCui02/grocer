const router = require('express').Router();
let CountProduct = require('../models/countProduct.model');
let PakProduct = require('../models/pakProduct.model')

// pak get & post
router.route('/pak').get((req, res) => {
    PakProduct.find({ $text: { $search: req.query.name } },
        { score: { $meta: "textScore" }})
        .sort( { score: { $meta: "textScore" }})
        .limit(parseInt(req.query.limit))

        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/pak/:id').get((req, res) => {
    PakProduct.findOne({ id: req.params.id })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/pak').post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const priceMode = req.body.priceMode;
    const volumeSize = req.body.volumeSize;
    const img = req.body.img;

    const newProduct = new PakProduct({
        id,
        name,
        price,
        priceMode,
        volumeSize,
        img,
    });

    newProduct.save()
        .then(() => res.json('product added!:'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// count get & post
router.route('/count').get((req, res) => {
    CountProduct.find({ $text: { $search: req.query.name } }, { score: { $meta: "textScore" }})
    .sort( { score: { $meta: "textScore" }})
    .limit(parseInt(req.query.limit))


        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/count/:id').get((req, res) => {
    CountProduct.findOne({ id: req.params.id })
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count').post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const priceMode = req.body.priceMode;
    const volumeSize = req.body.volumeSize;
    const img = req.body.img;

    const newProduct = new CountProduct({
        id,
        name,
        price,
        priceMode,
        volumeSize,
        img,
    });

    newProduct.save()
        .then(() => res.json('product added!:'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;