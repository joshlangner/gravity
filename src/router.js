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