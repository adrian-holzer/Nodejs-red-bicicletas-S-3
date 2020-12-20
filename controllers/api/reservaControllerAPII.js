var Reserva = require('../../models/reserva');

exports.reservas_list = function(req, res) {

    Reserva.find({}, (err, reservas) => {

        res.status(200).json({
            reservas: reservas
        });


    })



}