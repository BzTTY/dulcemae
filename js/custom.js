// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
    $('.filters_menu li').click(function () {
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
            columnWidth: ".all"
        }
    })
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

//funcion para mostrar/esconder las opciones especiales que vayan apareciendo segun lo elegido anteriormente
//controlador=tipo de producto
$('#controlador').change(function (e) {
    var selected = $(e.currentTarget).val();
    //aca el id de cada opcion
    $('#tamanioTorta').hide();
    $('#tipoTorta').hide();
    $('#cremaTorta').hide();
    $('#frutasTorta').hide();
    $('#especialesTorta').hide();
    $('#coberturaTorta').hide();

    $('#cantidadGalleta').hide();

    $('#tipoAlfajor').hide();
    $('#cantidadAlfajor').hide();
    
    $('#tipoTarta').hide();

    $('#tipoCheesecake').hide();

    $('#tipoPie').hide();

    $('#tamanioKuchen').hide();
    $('#tipoKuchen').hide();

    switch (selected) {
        case "Torta":
            $('#tamanioTorta').show();
            $('#tipoTorta').show();
            $('#cremaTorta').show();
            $('#frutasTorta').show();
            $('#especialesTorta').show();
            $('#coberturaTorta').show();
            break;

        case "Galletas surtidas":
            $('#cantidadGalleta').show();
            break;

        case "Alfajores":
            $('#tipoAlfajor').show();
            $('#cantidadAlfajor').show();
            break;

        case "Tarta":
            $('#tipoTarta').show();
            break;

        case "Cheesecake":
            $('#tipoCheesecake').show();
            break;

        case "Pie":
            $('#tipoPie').show();
            break;

        case "Kuchen":
            $('#tamanioKuchen').show();
            $('#tipoKuchen').show();
            break;

        default:
            break;
    }
})

/*controlador para mostrar direccion*/
$('#controlador2').change(function (e) {
    var selected = $(e.currentTarget).val();
    $('#direccionCliente').hide();

    switch (selected) {
        case "Envio":
            $('#direccionCliente').show();
            break;
        default:
            break;
    }
})