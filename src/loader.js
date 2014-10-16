/*  -----------------------------------------

		loader.js
		wraps jQuery AJAX function with 
		promise-focused API

		// currently used only for JSON calls
		// EJSpeed handles template loading & compiling

	-------------------------------------------*/
;gravity.load = function (url, callback, type) {
	if (url && callback) {

		if (type && type == 'html') {
			// loads template synchronously
			var template = new EJSpeed({url: view});
			callback(template);

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
					gravity.app['500'](response, status, errorThrown);
					return false;
				}
			}).done(function() {
				callback(data);
			});

		}

	} else {
		gravity.log({
			message: 'No resource defined to load, or no callback provided.',
			type: 'error'
		});
	}
}