/*  -----------------------------------------

		core.js

	-------------------------------------------*/

;gravity.core = function (o) {

	gravity.load(route[0], function(page) {
		gravity.render(page);
	});

}