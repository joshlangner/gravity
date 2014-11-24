/*  -----------------------------------------

	loader.js
	wraps jQuery AJAX function with
	promise-focused API

-------------------------------------------*/
;gravity.load = function (o) {

	var o = o || {
		url: gravity.state.url || null,
		dataType: 'html',
		data: null,
		callback: gravity.compile
	}

	o.callback = o.callback || gravity.compile;

	gravity.log({
		message: 'LOAD [' + gravity.state.url + ']',
		type: 'info'
	})

	if (gravity.state.url.indexOf('.html') > -1 || o.dataType == 'html') {
		o.url = 'views/' + gravity.state.url;
		if (o.url.indexOf('.html') === -1) {
			o.url = o.url + '.html';
		}
	}

	var responseData = null;
	$.ajax({
		url: o.url,
		type: "GET",
		dataType: o.dataType,
		success: function(response, status, xhr) {
			responseData = response;
		},
		error: function(response, status, errorThrown) {
			responseData = response;
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
					gravity.error(responseData);
					break;
			}
			return false;
		}
	}).done(function() {
		o.callback(responseData);
	});

}
