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