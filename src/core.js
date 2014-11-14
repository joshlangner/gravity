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