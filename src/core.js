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