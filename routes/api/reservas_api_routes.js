var express = require('express');
var router = express.Router();
var reservaController = require('../../controllers/api/reservaControllerAPII')

router.get('/', reservaController.reservas_list);


module.exports = router;