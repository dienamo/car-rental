const express = require('express');
const app = express();
const router = express.Router();

router.route('/').get(function(req, res){
    const items = [
        {'_id': 1, 'name': 'name-1'},
        {'_id': 2, 'name': 'name-2'},
        {'_id': 3, 'name': 'name-3'}
    ];
    res.json(items);
});

router.route('/add').post(function(req, res){
    res.json('Adding item');
});

module.exports = router