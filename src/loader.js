/*  -----------------------------------------

		loader.js
		wraps jQuery AJAX function with
		promise-focused API

		// currently used only for JSON calls
		// EJSpeed handles template loading & compiling

	-------------------------------------------*/
;gravity.load = function (o) {

	var responseData = null;
	var url = o.url || gravity.state.url || null;
	var dataType = o.dataType || 'html';
	var data = o.data || null;

	gravity.log({
		message: 'Loading [' + gravity.state.url + ']',
		type: 'info'
	})

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
			responseData = response;
		},
		error: function(response, status, errorThrown) {

			switch (response.status) {
				case 400:
					// bad request
				case 401:
					// unauthorized
				case 404:
					// not found
				case 408:
					// request timed out
				case 206:
					// not available yet (for polling)
				case 500:
					// server error
				case 501:
					// not implemented
				case 502:
					// bad gateway
				case 503:
					// service unavailable
				default:
					console.log(response)
					gravity.log({
						message: response.status,
						type: 'error'
					})
					gravity.state.reset();
					gravity.state.url = 'system/error.html';
					gravity.load({
						data: responseData
					});
			}

			return false;
		}
	}).done(function() {
		gravity.compile(responseData)
	});

	// } else {
	// 	gravity.log({
	// 		message: 'No resource defined to load, or no callback provided.',
	// 		type: 'error'
	// 	});
	// }
}
