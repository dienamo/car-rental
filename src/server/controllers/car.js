const Car = require('../database/models').Car;

module.exports = {
    create(req, res) {
        return Car
        .create({
            engine: req.body.engine
        })
        .then(todo => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Car
        .findAll({})
        .then(cars => res.status(200).send(cars))
        .catch(error => res.status(400).send(error));
    }
}