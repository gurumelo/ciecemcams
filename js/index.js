$(function() {
			
	// setInterval's
	var bucleActsky=0,
		bucleActdona=0;

	function skyactualiza(url, selector, empieza) {
		var ahoraAct = new Date();
		$(selector).attr('src', url + ahoraAct.getTime());
		$(selector).error(function(){
			$(this).attr('src', empieza);
		});
	};


	function manual() {
		$('#skyact').attr('disabled', 'disabled').html('Cargando <span class="glyphicon glyphicon-asterisk"></span>');
		skyactualiza('http://150.214.162.13/skycamera/goto/SONA%20CIECEM/img?', '#skyimg', 'img/empieza.jpg');
		$('#skyimg').on('load', function() {
			$('#skyact').html('Actualizar manualmente <span class="glyphicon glyphicon-floppy-save"></span>').removeAttr('disabled');
		});
	};

	// definir cada bucle
	function automatica(propioboton, idurl, idimg, idempieza, cadacuanto, idmensajeautomatico, idmensaje) {
		var estado = $(propioboton).attr('data-estado');
		if ( estado == 'apagado' ) {
			$(propioboton).attr('disabled', 'disabled');
			skyactualiza(idurl, idimg, idempieza);
			
			cualbu = $(propioboton).attr('data-inter');
			
			if ( cualbu == 'sky' ) {
				bucleActsky = setInterval( function() {
					skyactualiza(idurl, idimg, idempieza);
				}, cadacuanto);
			}
			else {
				bucleActdona = setInterval( function() {
					skyactualiza(idurl, idimg, idempieza);
				}, cadacuanto);
			}

			$(propioboton).attr({ 'data-estado': 'encendido', class: 'btn btn-success btn-sm' }).removeAttr('disabled').html(idmensajeautomatico);
		}
		else {
			$(propioboton).attr({ 'data-estado': 'apagado', class: 'btn btn-sm' }).html(idmensaje);
			cualbu = $(propioboton).attr('data-inter');
			if ( cualbu == 'sky' ) {
				clearInterval(bucleActsky);
			}
			else {
				clearInterval(bucleActdona);
			}
			
		}
	};
	
	// Actualiza manualmente pulsando actualizar
	$('#skyact').on('click', function() {
		manual();
	});
	
	
	// Actualiza cada 5 minutos
	$('#skymatic').on('click', function() {
		automatica($(this), 'http://150.214.162.13/skycamera/goto/SONA%20CIECEM/img?', '#skyimg', 'img/empieza.jpg', 300000, 'Apagar automático <span class="glyphicon glyphicon-off"></span>', 'Actualizar cada 5 minutos <span class="glyphicon glyphicon-refresh"></span>');
	});
	
	// Actualiza cada 2 segundos
	$('#donanamatic').on('click', function() {
		automatica($(this), 'http://150.214.162.14:8081/snapshot.cgi?user=visitor&pwd=&', '#camC', 'img/empieza1.jpg', 2000, 'Apagar automático <span class="glyphicon glyphicon-off"></span>', 'Actualizar cada 2 segundos <span class="glyphicon glyphicon-refresh"></span>');
	});

	//si pulsa algo del menú
	$('.cambio').on('click', function() {
		$('.cambio').parent().removeClass('active');
		$(this).parent().addClass('active');
		$('.diapositiva').hide();
		var cualmuestro = $(this).attr('href');
		$(cualmuestro).show().removeClass('invisible');
	});
	
	$('.cambioboton').on('click', function() {
		$('.cambioboton').removeAttr('disabled');
		$(this).attr('disabled', 'disabled');
		$('.diapositiva').hide();
		var cualmuestro = $(this).attr('href');
		$(cualmuestro).show().removeClass('invisible');
	});

	// empieza
	skyactualiza('http://150.214.162.13/skycamera/goto/SONA%20CIECEM/img?', '#skyimg', 'img/empieza.jpg', 0);
	skyactualiza('http://150.214.162.14:8081/snapshot.cgi?user=visitor&pwd=&', '#camC', 'img/empieza1.jpg', 1);

	$('#slidedonana, #slideskye').tooltip({container: 'body'});
			
});
