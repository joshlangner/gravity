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