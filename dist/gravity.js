/*  -----------------------------------------

	Gravity.js

-------------------------------------------*/
;(function(gravity, $, undefined) {

	// set mustache tags & do not cache templates by default
	EJSpeed.config({ type: '{{', cache: false });

	gravity.state = {
		url: null,
		module: null,
		action: null,
		id: null,
		params: null,
		reset: function() {
			gravity.state.url = null;
			gravity.state.module = null;
			gravity.state.action = null;
			gravity.state.id = null;
			gravity.state.params = null;
		}
	}

	gravity.app = '';

	gravity.init = function () {

		gravity.log({
			message: 'BOOT',
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
		message: 'COMPILE',
		type: 'info'
	})

	/*
		o = {
			data: 'data to compile with view',
			template: 'pre-processed html template'
		}
	*/

	var template = '';
	var data = null;

	if (typeof o === 'string') {
		template = o;
	} else {
		template = o.template;
		data = o.data || null;
	}

	var compiledHtml = new EJSpeed({text: template}).render(data);

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
		message: 'CORE',
		type: 'info'
	});

	if (typeof gravity.app[gravity.state.module] === 'string' || (!gravity.app[gravity.state.module] && gravity.state.url)) {
		// Just defines a route or HTML page to load

		gravity.load({
			dataType: 'html'
		});

	} else if (gravity.app[gravity.state.module]) {

		// Only check one level down (action) to attempt to direct to action.
		// Convention assumes most apps will have module/action/id
		// Anything deeper will hand off to action to delegate additional module/action/subaction/subsubaction/id
		if (gravity.state.action && gravity.app[gravity.state.module][gravity.state.action]) {

			gravity.log({
				message: '['+gravity.state.module+'.'+gravity.state.action+']',
				type: 'info'
			});

			gravity.app[gravity.state.module][gravity.state.action]();

		} else {

			gravity.log({
				message: '['+gravity.state.module+'.index]',
				type: 'info'
			});

			// execute the default (index) function
			gravity.app[gravity.state.module].index();
		}
	}
}
/*  -----------------------------------------

	dom.js
	Attach HTML to the DOM, limit binding
	assignments to post-render

-------------------------------------------*/
;gravity.dom = function (o) {

	gravity.log({
		message: 'DOM',
		type: 'info'
	})

	/*
		o = {
			target: '.element' or '#element',
			compiledHtml: '<compiledHtml></compiledHtml>'
		}
	*/
	if (o.target && typeof o.compiledHtml === 'string') {
		$(o.target).html(o.compiledHtml);
	}

	gravity.render();

}

// empties DOM item
;gravity.dom.empty = function (o) {
	// o = target html element, i.e. 'div#myDiv'
	$(o.target).empty();
}

/*  -----------------------------------------

	error.js

-------------------------------------------*/
;gravity.error = function (o) {

	gravity.log({
		message: o.status,
		type: 'error'
	});

	gravity.state.reset();
	gravity.state.url = 'system/error.html';

	gravity.load({
		url: 'system/error.html',
		callback: function (template) {
			gravity.compile({
				data: o,
				template: template
			});
		}
	});
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
		message: 'PROCESS',
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
		message: 'RENDER',
		type: 'info'
	});

}

/*  -----------------------------------------

	router.js

-------------------------------------------*/

;gravity.route = {
	init: function () {

		gravity.log({
			message: 'ROUTE',
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

					// set up gravity state
					gravity.state.module = route[0];
					gravity.state.action = route[1] || null;
					gravity.state.id = route[2] || null;
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
					message: 'No routes specified, loading default ['+gravity.app.index+'] instead',
					type: 'log'
				});
				gravity.state.url = gravity.app.index;
				gravity.core();
			}
		});

		// Trigger first hashchange
		$(window).trigger('hashchange');

	},

	go: function () {

	}

}
