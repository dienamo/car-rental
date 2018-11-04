const express = require('express');
const app = express();
const router = express.Router();

const car_controller = require('../controllers').car;

router.route('/add').post(car_controller.create);
router.route('/list').get(car_controller.list);

module.exports = router