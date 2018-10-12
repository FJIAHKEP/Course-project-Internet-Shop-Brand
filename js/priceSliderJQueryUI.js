$( function() {
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 0, 500 ],
		slide: function( event, ui ) {
			$( "#minPriceRange" ).val( "$" + ui.values[ 0 ]);
			$( "#maxPriceRange" ).val( "$" + ui.values[ 1 ] );
		}
	});
	$( "#minPriceRange" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ));
	$( "#maxPriceRange" ).val( "$" + $( "#slider-range" ).slider( "values", 1 ));
} );