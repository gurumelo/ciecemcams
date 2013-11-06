$(function() {
			
	// setInterval's
	var bucles= new Array();

	function skyactualiza(url, selector, empieza) {
		var ahoraAct = new Date();
		$(selector).attr('src', url + ahoraAct.getTime());
		$(selector).error(function(){
			$(this).attr('src', empieza);
		});
	};


	function manual(mboton, mmensajecargando, murl, mimg, mempieza, mmensajeboton) {
		$(mboton).attr('disabled', 'disabled').html(mmensajecargando);
		skyactualiza(murl, mimg, mempieza);
		$(mimg).on('load', function() {
			$(mboton).html(mmensajeboton).removeAttr('disabled');
		});
	};


	function automatica(propioboton, idurl, idimg, idempieza, cadacuanto, idmensajeautomatico, idmensaje, posicionarray) {
		var estado = $(propioboton).attr('data-estado');
		if ( estado == 'apagado' ) {
			$(propioboton).attr('disabled', 'disabled');
			skyactualiza(idurl, idimg, idempieza);
						
			bucles[posicionarray] = setInterval( function() {
					skyactualiza(idurl, idimg, idempieza);
			}, cadacuanto);
			
			$(propioboton).attr({ 'data-estado': 'encendido', class: 'btn btn-success btn-sm' }).removeAttr('disabled').html(idmensajeautomatico);
		}
		else {
			$(propioboton).attr({ 'data-estado': 'apagado', class: 'btn btn-sm' }).html(idmensaje);
			clearInterval(bucles[posicionarray]);
		}
	};
	
	// Actualiza manualmente pulsando actualizar
	$('#skyact').on('click', function() {
		manual($(this), 'Cargando <span class="glyphicon glyphicon-asterisk"></span>', 'http://150.214.162.13/skycamera/goto/SONA%20CIECEM/img?', '#skyimg', 'img/empieza.jpg', 'Actualizar manualmente <span class="glyphicon glyphicon-floppy-save"></span>');
	});
	
	// Actualiza cada 5 minutos
	$('#skymatic').on('click', function() {
		automatica($(this), 'http://150.214.162.13/skycamera/goto/SONA%20CIECEM/img?', '#skyimg', 'img/empieza.jpg', 300000, 'Apagar automático <span class="glyphicon glyphicon-off"></span>', 'Actualizar cada 5 minutos <span class="glyphicon glyphicon-refresh"></span>', 0);
	});
	
	// Actualiza cada 2 segundos
	$('#donanamatic').on('click', function() {
		automatica($(this), 'http://150.214.162.14:8081/snapshot.cgi?user=visitor&pwd=&', '#camC', 'img/empieza1.jpg', 2000, 'Apagar automático <span class="glyphicon glyphicon-off"></span>', 'Actualizar cada 2 segundos <span class="glyphicon glyphicon-refresh"></span>', 1);
	});

	$('.cambio').on('click', function(e) {
		e.preventDefault();
		var relacion = $(this).attr('data-rel'),
			cualmuestro = $(this).attr('href');
		$('.pestanita').parent().removeClass('active');
		$('.pestanita[data-rel='+ relacion +']').parent().addClass('active');
		$('.flechita').removeAttr('disabled');
		$('.flechita[data-rel='+ relacion +']').attr('disabled', 'disabled');
		$('.diapositiva').hide();
		$(cualmuestro).show().removeClass('invisible');
	});


	// empieza
	skyactualiza('http://150.214.162.13/skycamera/goto/SONA%20CIECEM/img?', '#skyimg', 'img/empieza.jpg');
	skyactualiza('http://150.214.162.14:8081/snapshot.cgi?user=visitor&pwd=&', '#camC', 'img/empieza1.jpg');

	$('#slidedonana, #slideskye').tooltip({container: 'body'});
			
});
