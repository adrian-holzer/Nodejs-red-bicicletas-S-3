var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_Api_list = function(req, res) {

    res.status(200).json({
        bicis: Bicicleta.allBicis
    })

}



exports.bicicleta_Api_create = function(req, res) {

    console.log(req.body.lat)
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat, req.body.lng];

    Bicicleta.add(bici);

    res.status(200).json({
        bici: bici
    })

}


exports.bicicleta_Api_update = function(req, res) {

    var bici = Bicicleta.findById(req.body.id);

    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng]

    res.status(200).json({
        bici: bici
    })


}

exports.bicicleta_Api_delete = function(req, res) {

    console.log(req.body.id)


    Bicicleta.removeById(req.body.id)

    res.status(204).send();
}