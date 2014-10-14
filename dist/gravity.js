/*  -----------------------------------------

		Gravity.js

	-------------------------------------------*/
;(function(gravity, $, undefined) {

	gravity.state = {
		model: '',
		id: '',
		action: '',
		params: '',
		reset: function() {
			gravity.state = {
				model: '',
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

		dom.js

	-------------------------------------------*/

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

	-------------------------------------------*/
;gravity.load = function (o) {
	if (o) {

	} else {
		
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

/*  -----------------------------------------

		renderer.js

	-------------------------------------------*/

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
		if (hash.indexOf('#/') > -1) {
			route = (hash.substring(2)).split('/');
			gravity.log({message: route.join(), type: 'info'});
			if (/^[a-z0-9]+$/i.test(route[0]) && gravity.app.hasOwnProperty([route[0]])) {
				gravity.state = {
					model: route[0],
					id: route[1],
					action: route[2],
					params: route[3]
				}

				// module/id/action?[params]
				/* 

					EXECUTE DEFAULT RENDER STACK.......

				*/ 

			} else {
				// module does not exist or bad module name
				gravity.log({
					message: 'The module "'+route[0]+'" does not exist.',
					type: 'warn'
				});
				if (gravity.app.hasOwnProperty(['404'])) {
					gravity.app['404'];
				} else {
					gravity.log({message: 'The application does not have a 404 file specified.', type: 'error'});
				}
			}
			
		} else {
			gravity.log('Routing to "'+gravity.app.def+'"');
			gravity.app.def;
		}
	});

	// Trigger first hashchange
	$(window).trigger('hashchange');

}