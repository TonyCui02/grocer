const router = require('express').Router();
let User = require('../models/user.model'); // User variable is the imported user model


// @route GET api/v1/users
// @description: get all users
// @access Public
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/v1/users
// @description: create users
// @access Public
router.route('/').post((req, res) => {
    const id = req.body.id;
    const items = req.body.items;

    const newUser = new User({
        id,
        items,
    });

    newUser.save()
        .then(() => res.json({ 'created': newUser})) // return created user in json 
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/v1/users/:id
// @description: get a single user
// @access Public
router.route('/:id').get((req, res) => {
    User.findOne({ id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
})

// @route DELETE api/v1/users/:id
// @description: delete a single user
// @access Public
router.route('/:id').delete((req, res) => {
    User.findOneAndDelete({ id: req.params.id })
        .then(user => res.json({ 'deleted': user }))
        .catch(err => res.status(400).json('Error: ' + err));
})

// @route PUT api/v1/users/:id
// @description: update a single user
// @access Public
router.route('/:id').put((req, res) => {
    User.findOne({ id: req.params.id })
        .then(user => {
            user.items = req.body.items;

            user.save()
                .then(() => res.json({ 'User Updated': user }))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error' + err));
})


module.exports = router;