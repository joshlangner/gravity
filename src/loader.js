/*  -----------------------------------------

	loader.js
	wraps jQuery AJAX function, see jQuery API
	for reference

-------------------------------------------*/
;gravity.load = function (url, callback, options) {

	var url = url;
	var callback = callback;

	if (!options) {
		// nothing provided.
	} else if (options) {
		// set options
	}

	gravity.log({
		message: 'LOAD [' + gravity.state.url + ']',
		type: 'info'
	});

	// if (gravity.state.url.indexOf('.html') > -1 || o.dataType == 'html') {

	// 	// TODO: Refactor ------------------------------------------
	// 	o.url = 'views/' + gravity.state.url;
	// 	if (o.url.indexOf('.html') === -1) {
	// 		o.url = o.url + '.html';
	// 	}

	// }

	var responseData = null;
	$.ajax({
		url: url,
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
		callback(responseData)
	});


	/*
		getMultiple() Loads multiple Javascript files in a specific order, then executes a callback on completion.

		Example:
		getMultiple([
			'scripts/script-a.js',
			'scripts/script-b.js'
		], function() {
			alert('done!')
		})

	*/
	function getMultiple (o, callback) {
		var i = 0;
		check();
		function check() {
			$.when(getScript(o[i])).then(function() {
				if (i < o.length-1) {
					poll()
				} else {
					callback();
				}
			})
		}
		function poll() {
			i++;
			check();
		}
		function getScript(s) {
			return $.getScript(s);
		}
	}

}
