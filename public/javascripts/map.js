var mymap = L.map('main_map').setView([-34.6012424, -58.3861497], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

/* L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup('Una linda ciudad')
    .openPopup();

L.marker([45.5, -0.09]).addTo(mymap)
    .bindPopup('Otra linda ciudad')
    .openPopup();
 */

$.ajax({

    url: "api/bicicletas",
    dataType: "json",
    success: function(response) {
        console.log(response);
        response.bicis.forEach(function(bici) {

            L.marker(bici.ubicacion, { title: bici.id }).addTo(mymap)
        });
    }
});