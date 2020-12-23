var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis((err, bicicletas) => {
        res.render('bicicletas/index', { bicis: bicicletas });
    });


}





exports.bicicleta_create_get = function(req, res) {

    res.render('bicicletas/create', { bicis: Bicicleta.allBicis });

}

exports.bicicleta_create_post = function(req, res) {

    biciNueva = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
    biciNueva.ubicacion = [req.body.lat, req.body.lng]
    Bicicleta.add(biciNueva);
    res.redirect("/bicicletas");

}


exports.bicicleta_update_get = function(req, res) {
    var bici = Bicicleta.findById(req.params.id).exec((err, bici) => {
        res.render('bicicletas/update', { bici: bici });
    })


}

exports.bicicleta_update_post = function(req, res) {

    Bicicleta.findById(req.body.id).exec((err, bici) => {



        //bici._id = req.body.id;
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng]

        bici.updateOne(bici, (err, biciUpdated) => {
            res.redirect("/bicicletas");

        })
    });





}
exports.bicicleta_delete = function(req, res) {

    console.log(req.body.id);
    Bicicleta.remove({ '_id': req.body.id }, (err, biciRemoved) => {

        res.redirect("/bicicletas");

    })


}