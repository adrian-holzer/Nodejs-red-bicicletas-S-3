var mongoose = require('mongoose');
var Bicicleta = require("../../models/bicicleta");
var request = require('request');
var server = require("../../bin/www");
const { json } = require('express');
const { base } = require('../../models/bicicleta');


var base_url = "http://localhost:3000/api/bicicletas";








describe('Biblioteca API', () => {


    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log("We are connected to test database ! ");
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if (err) console.log(err);
            mongoose.disconnect();
            done();
        });
    });

    beforeAll((done) => { mongoose.connection.close(done) });





    describe('GET BICICLETAS /', () => {

        it('Status 200', (done) => {


            request.get(base_url, function(error, response, body) {

                var result = JSON.parse(body);


                expect(response.statusCode).toBe(200);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toBe(0);
                    done();

                });


            });

        });
    });


    describe('POST BICICLETAS /create', () => {

        it('Status 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{"code":10,"color":"rojo","modelo":"urbano","lat":-34,"lng":-54}'

            request.post({

                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body) {

                expect(response.statusCode).toBe(200);

                var bici = JSON.parse(body).bici;


                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);

                done();
            })
        });
    });

    describe('DELETE BICICLETAS /delete', () => {


        it('Status 204', (done) => {
            var a = Bicicleta.createInstance(1, "negro", "urbana", [-34.675634, -58.234234234]);

            Bicicleta.add(a, function(err, newBici) {

                var headers = { 'content-type': 'application/json' };
                var idBici = '{"code": 1}'



                console.log(newBici);

                request.delete({

                    headers: headers,
                    url: base_url + '/delete',
                    body: idBici
                }, function(error, response, body) {

                    expect(response.statusCode).toBe(204);


                });

            });


            Bicicleta.allBicis(function(err, bicis) {

                console.log(bicis);
                expect(bicis.length).toBe(0);

                console.log(bicis);
                done();


            });




        });

    });
});



/* 




    describe('PUT BICICLETAS /update', () => {


        it('Status 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id":10, "color": "azul", "modelo": "playera", "lat": -34, "lng": -54 }'
            request.put({

                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici
            }, function(error, response, body) {

                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('azul');
                expect(Bicicleta.findById(10).modelo).toBe('playera');


                done();
            })
        });

    });


    setTimeout(() => {

    }, 2000);


    describe('DELETE BICICLETAS /delete', () => {


        it('Status 204', (done) => {
            var headers = { 'content-type': 'application/json' };
            var idBici = '{ "id": 10 }'
            request.delete({

                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: idBici
            }, function(error, response, body) {

                expect(response.statusCode).toBe(204);


                done();
            })
        });

    }); */