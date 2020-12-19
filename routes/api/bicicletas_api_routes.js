var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicletacontrollerAPI')

router.get('/', bicicletaController.bicicleta_Api_list);
router.post('/create', bicicletaController.bicicleta_Api_create);
router.delete('/delete', bicicletaController.bicicleta_Api_delete);
router.put('/update', bicicletaController.bicicleta_Api_update);


module.exports = router;