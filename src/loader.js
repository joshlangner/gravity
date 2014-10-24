/*  -----------------------------------------

		loader.js
		wraps jQuery AJAX function with 
		promise-focused API

		// currently used only for JSON calls
		// EJSpeed handles template loading & compiling

	-------------------------------------------*/
;gravity.load = function (o) {
	if (o.type && o.type == 'html') {
		// loads template synchronously
		// EJSpeed currently handles the load + compiling
		var template = new EJSpeed({url: 'views/'+gravity.state.url+'.html'}).render();
		o.callback(template);

	} else {

		var data;
		$.ajax({
			url: url,
			type: "GET",
			dataType: 'json',
			success: function(response, status, xhr) {
				data = response;
			},
			error: function(response, status, errorThrown) {
				gravity.log({
					message: errorThrown,
					type: 'error'
				})
				// gravity.app['500'](response, status, errorThrown);
				return false;
			}
		}).done(function() {
			//callback(data);
		});

	}

	// } else {
	// 	gravity.log({
	// 		message: 'No resource defined to load, or no callback provided.',
	// 		type: 'error'
	// 	});
	// }
}