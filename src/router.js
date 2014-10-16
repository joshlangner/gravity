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

				// module/id/action?[params]

				gravity.state = {
					model: route[0],
					id: route[1],
					action: route[2],
					params: route[3]
				}

				if (typeof gravity.app[route[0]] === 'string') {
					// invoke default static module, no data required
					// skips compiler & data processing
					gravity.load(route[0], function(page) {
						gravity.render(page);
					});
				} else {
					// invoke dynamic module
					gravity.app[route[0]];
				}

			} else {
				// module does not exist or bad module name
				gravity.log({
					message: 'The module "'+route[0]+'" does not exist.',
					type: 'warn'
				});
				if (gravity.app.hasOwnProperty(['404'])) {
					gravity.app['404'];
				} else {
					gravity.log({
						message: 'The application does not have a 404 file specified.', 
						type: 'error'
					});
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