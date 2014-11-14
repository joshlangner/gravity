/*  -----------------------------------------

		Gravity.js

	-------------------------------------------*/
;(function(gravity, $, undefined) {



	// set mustache tags & do not cache templates by default
	EJSpeed.config({ type: '{{', cache: false });

	gravity.state = {
		url: null,
		module: null,
		id: null,
		action: null,
		params: null,
		reset: function() {
			gravity.state.url = null;
			gravity.state.module = null;
			gravity.state.id = null;
			gravity.state.action = null;
			gravity.state.params = null;
		}
	}

	gravity.app = '';

	gravity.init = function () {

		gravity.log({
			message: 'Booting Gravity.',
			type: 'info'
		})

		gravity.route.init();
	}

}(window.gravity = window.gravity || {}, jQuery));

/*  -----------------------------------------

		config.js

	-------------------------------------------*/
;gravity.config = {
	//app: ''
}
/*  -----------------------------------------

		compiler.js

	-------------------------------------------*/
;gravity.compile = function (o) {

	gravity.log({
		message: 'Compiling views.',
		type: 'info'
	})

	o = o || null;
	var compiledHtml = new EJSpeed({text: o}).render();

	gravity.dom({
		target: 'div#gravity-stage',
		compiledHtml: compiledHtml
	});
}

/*  -----------------------------------------

		core.js
		gravity assumes a module > id > action & params approach
	-------------------------------------------*/

;gravity.core = function (o) {

	gravity.log({
		message: 'Executing gravity core.',
		type: 'info'
	})

	/*
	o = {
		data: data
	}
	*/

	if (typeof gravity.app[gravity.state.module] === 'string') {
		// Just defines a route or HTML page to load

	} else {
		// run the index function on the module.
		// The index module will pick up sub-params based on state object.

		if (gravity.state.action && gravity.app[gravity.state.module][gravity.state.id]) {

			gravity.log({
				message: 'Running action on a module.',
				type: 'info'
			})

			// assume an id exists and run the action
			gravity.app[gravity.state.module][gravity.state.action];
		} else {

			gravity.log({
				message: 'Running module index.',
				type: 'info'
			})

			// execute the default (index) function
			gravity.app[gravity.state.module].index();
		}
	}

	if (!gravity.state.module || typeof gravity.app[gravity.state.module] === 'string') {
		// invoke default static module, no data required
		// skips compiler & data processing

		gravity.load({
			dataType: 'html',
			callback: function (response) {
				//gravity.render(response);
			}
		});

	} else {
		// invoke dynamic module
		type = 'dynamic';
	}

	// gravity.load(null, function(page) {
	// 	gravity.render(page);
	// });

	// gravity.load('views/'+route[0]+'.html', function(page) {
	// 	gravity.render(page);
	// });

}
/*  -----------------------------------------

		dom.js
		Attach HTML to the DOM, limit binding
		assignments to post-render

	-------------------------------------------*/
;gravity.dom = function (o) {

	gravity.log({
		message: 'Rendering to DOM.',
		type: 'info'
	})

	/* o = {
			target: '.element' or '#element',
			compiledHtml: '<compiledHtml></compiledHtml>'
		}
	*/
	if (o.target && typeof o.compiledHtml === 'string') {
		$(o.target).html(o.compiledHtml);
	}

}

// empties DOM item
;gravity.dom.empty = function (o) {
	// o = target html element, i.e. 'div#myDiv'
	$(o.target).empty();
}

/*  -----------------------------------------

		fn.js

	-------------------------------------------*/

;gravity.fn = {

	/* 
		gravity.fn.contains
		Checks an array to see if it contains a value. 
		Minimum of 2x faster, up to 20x faster than native Array.indexOf
	*/
	contains: function (a, v) {
		for (var i = 0, m = a.length; i < m; i++) {
			if (a[i] === v) {
				return true;
			}
		}
		return false;
	}
	
};
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

/*  -----------------------------------------

		log.js

	-------------------------------------------*/

;gravity.log = function (o) {
	/* o = {message:'',type:''} */
	var o = o || {};
	var log = {};

	// handle shortcutters :)
	if (typeof(o) === 'string') {
		log.message = o;
	} else {
		log.message = o.message;
	}
	log.type = o.type || 'log';
	log.message = 'GRAVITY: ' + log.message || 'GRAVITY: Unknown error';

	// valid types: error, log, warn, info
	console[log.type](log.message);
	
};
/*  -----------------------------------------

		processor.js

	-------------------------------------------*/

;gravity.process = function () {

	gravity.log({
		message: 'Processing...',
		type: 'info'
	})

}

/*  -----------------------------------------

		renderer.js

	-------------------------------------------*/
;gravity.render = function (o) {

	/*
		o = pre-processed, precompiled processed HTML STRING
	*/

	gravity.log({
		message: 'Rendering...',
		type: 'info'
	})

	if (typeof o === 'string') {
		$('div#gravity-stage').html(o);
	}

}

/*  -----------------------------------------

		router.js

	-------------------------------------------*/

;gravity.route = {
	init: function () {

		gravity.log({
			message: 'Initializing router.',
			type: 'info'
		})

		// bind to hashchange
		$(window).on('hashchange', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var hash = window.location.hash;
			var route = [];

			gravity.state.reset();

			if (hash.indexOf('#/') > -1) {

				route = (hash.substring(2)).split('/');
				gravity.state.url = hash.substring(2);
				gravity.log({
					message: 'Identified route: ' + route.join(),
					type: 'info'
				});

				if (/^[a-z0-9]+$/i.test(route[0]) && gravity.app.hasOwnProperty([route[0]])) {

					console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')

					// set up gravity state
					gravity.state.module = route[0];
					gravity.state.id = route[1] || null;
					gravity.state.action = route[2] || null;
					gravity.state.params = route[3] || null;

					gravity.core();

				} else {
					// module does not exist or bad module name
					gravity.log({
						message: 'The module "'+route[0]+'" does not exist, loading /' +route.join('/') +'.html instead.',
						type: 'log'
					});

					gravity.core();

					// if (gravity.app.hasOwnProperty(['404'])) {
					// 	gravity.app['404'];
					// } else {
					// 	gravity.log({
					// 		message: 'The application does not have a 404 file specified.',
					// 		type: 'error'
					// 	});
					// }
				}

			} else {
				gravity.log({
					message: 'No routes specified, loading default route.',
					type: 'log'
				});
				gravity.state.url = gravity.app.index;
				gravity.log('Routing to "'+gravity.app.index+'"');
				gravity.core();
			}
		});

		// Trigger first hashchange
		$(window).trigger('hashchange');

	},

	go: function () {

	}

}
