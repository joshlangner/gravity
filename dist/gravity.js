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
;gravity.compile = function (o) {
	o = o || null;
	var compiledHtml = new EJSpeed({text: o}).render();
	gravity.render(compiledHtml);
}
/*  -----------------------------------------

		core.js

	-------------------------------------------*/

;gravity.core = function (o) {

	var type = o || 'static';


	if (!gravity.state.module || typeof gravity.app[gravity.state.module] === 'string') {
		// invoke default static module, no data required
		// skips compiler & data processing

		if (type == 'static') {
			gravity.load({
				dataType: 'html',
				callback: function (response) {
					gravity.render(response);
				}
			});
		}

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
		o = pre-processed, precompiled processed HTML STRING
	*/

	if (typeof o === 'string') {
		$('div#gravity-stage').html(o);
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

		gravity.state.reset();
		gravity.state.url = hash.substring(2);

		if (hash.indexOf('#/') > -1) {

			route = (hash.substring(2)).split('/');
			gravity.state.url = hash.substring(2);
			gravity.log({message: 'Route: ' + route.join(), type: 'info'});

			if (/^[a-z0-9]+$/i.test(route[0]) && gravity.app.hasOwnProperty([route[0]])) {

				// set up gravity state
				gravity.state.module = route[0];
				gravity.state.id = route[1];
				gravity.state.action = route[2];
				gravity.state.params = route[3];

				gravity.core();

			} else {
				// module does not exist or bad module name
				gravity.log({
					message: 'The module "'+route[0]+'" does not exist, loading '+route[0]+'.html instead.',
					type: 'info'
				});
				var url = gravity.state.url;
				gravity.state.reset();
				gravity.state.module = '404';
				
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
			gravity.state.url = gravity.app.index;
			gravity.log('Routing to "'+gravity.app.index+'"');
			gravity.core('static');
		}
	});

	// Trigger first hashchange
	$(window).trigger('hashchange');

}