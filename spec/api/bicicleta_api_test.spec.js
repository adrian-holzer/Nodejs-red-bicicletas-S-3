var Bicicleta = require("../../models/bicicleta");
var request = require('request');
var server = require("../../bin/www");




describe('Biblioteca API', () => {

    describe('GET BICICLETAS /', () => {

        it('Status 200', () => {


            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'negro', 'urbana', [-34.6012424, -58.3861497]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body) {

                expect(response.statusCode).toBe(200);
            });

        });
    });


    describe('POST BICICLETAS /create', () => {
        it('Status 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{"id":10,"color":"rojo","modelo":"urbano","lat":-34,"lng":-54}'
            request.post({

                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {

                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');

                done();
            })
        });
    });



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

    });
});