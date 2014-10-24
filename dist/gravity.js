/*  -----------------------------------------

		Gravity.js

	-------------------------------------------*/
;(function(gravity, $, undefined) {

	// set mustache tags & do not cache templates by default
	EJSpeed.config({ type: '{{', cache: false });

	gravity.state = {
		url: '',
		module: '',
		id: '',
		action: '',
		params: '',
		reset: function() {
			gravity.state = {
				url: '',
				module: '',
				id: '',
				action: '',
				params: ''
			}
		}
	}

	gravity.app = '';

	gravity.init = function () {
		gravity.route();
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

/*  -----------------------------------------

		core.js

	-------------------------------------------*/

;gravity.core = function (o) {

	if (typeof o === 'string') {
		if (o == 'static') {
			gravity.load({
				type: 'html',
				callback: function (response) {
					gravity.render(response);
				}
			});
		}
		if (o == 'dynamic') {

		}
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

	/* o = {
			target: '.element' or '#element',
			payload: '<processedhtml></processedhtml>' 
		}
	*/

	$(o.target).html(o.payload)

}

// empties DOM item
;gravity.dom.empty = function (o) {
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

/*  -----------------------------------------

		renderer.js

	-------------------------------------------*/
;gravity.render = function (o) {

	/* 
		o = pre-processed, precompiled processed HTML
	*/

	if (typeof o === 'string') {
		// added settimeout due to livereload issues?????????
		window.setTimeout(function() {
			$('div#gravity-stage').html(o);
		})
	}

}
/*  -----------------------------------------

		router.js

	-------------------------------------------*/

;gravity.route = function (o) {

	// bind to hashchange
	$(window).on('hashchange', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var hash = window.location.hash;
		var route = [];

		gravity.state = {
			url: hash.substring(2)
		}

		if (hash.indexOf('#/') > -1) {
			route = (hash.substring(2)).split('/');
			gravity.log({message: route.join(), type: 'info'});

			if (/^[a-z0-9]+$/i.test(route[0]) && gravity.app.hasOwnProperty([route[0]])) {

				gravity.state = {
					module: route[0],
					id: route[1],
					action: route[2],
					params: route[3]
				}

				if (typeof gravity.app[route[0]] === 'string') {
					// invoke default static module, no data required
					// skips compiler & data processing
					gravity.core('static');
				} else {
					// invoke dynamic module
					gravity.core('dynamic');
				}

			} else {
				// module does not exist or bad module name
				gravity.log({
					message: 'The module "'+route[0]+'" does not exist, loading '+route[0]+'.html instead.',
					type: 'info'
				});
				
				gravity.core('static');

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
			gravity.log('Routing to "'+gravity.app.def+'"');
			gravity.app.def;
		}
	});

	// Trigger first hashchange
	$(window).trigger('hashchange');

}