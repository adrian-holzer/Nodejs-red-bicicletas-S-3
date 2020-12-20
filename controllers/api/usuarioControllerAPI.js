const { response } = require('express');
var Usuario = require('../../models/usuario');

exports.usuarios_list = function() {

    Usuario.find({}, function(err, usuarios) {

        response.status(200).json({
            usuarios: usuarios
        });
    });


}



exports.usuarios_create = function(req, res) {

    var usuario = new Usuario({
        nombre: req.body.nombre
    });

    usuario.save(function(err) {
        res.status(200).json(usuario);
    });


}



exports.usuarios_reservar = function(req, res) {

    Usuario.findById(req.body.id, function(err, usuario) {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err) {
            console.log('reserva!!!');
            res.status(200).send();
        });
    });


};