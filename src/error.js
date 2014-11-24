/*  -----------------------------------------

	error.js

-------------------------------------------*/
;gravity.error = function (o) {

	gravity.log({
		message: o.status,
		type: 'error'
	});

	gravity.state.reset();
	gravity.state.url = 'system/error.html';

	gravity.load({
		url: 'system/error.html',
		callback: function (template) {
			gravity.compile({
				data: o,
				template: template
			});
		}
	});
}
