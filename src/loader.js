/*  -----------------------------------------

		loader.js
		wraps jQuery AJAX function with 
		promise-focused API

		// currently used only for JSON calls
		// EJSpeed handles template loading & compiling

	-------------------------------------------*/
;gravity.load = function (o) {

		var data;
		var dataType = o.dataType || 'html';
		var url = '';

		if (gravity.state.url.indexOf('.html') > -1 || dataType == 'html') {
			url = 'views/' + gravity.state.url;
			if (url.indexOf('.html') === -1) {
				url = url + '.html';
			}
		}

		$.ajax({
			url: url,
			type: "GET",
			dataType: dataType,
			success: function(response, status, xhr) {
				data = response;
			},
			error: function(response, status, errorThrown) {
				gravity.log({
					message: response.status + ' ' + errorThrown + ' - ' + response.responseText,
					type: 'error'
				})
				// gravity.app['500'](response, status, errorThrown);
				return false;
			}
		}).done(function() {
			gravity.compile(data)
		});

	// } else {
	// 	gravity.log({
	// 		message: 'No resource defined to load, or no callback provided.',
	// 		type: 'error'
	// 	});
	// }
}