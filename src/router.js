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
