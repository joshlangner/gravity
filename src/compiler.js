/*  -----------------------------------------

	compiler.js

-------------------------------------------*/
;gravity.compile = function (o) {

	gravity.log({
		message: 'COMPILE',
		type: 'info'
	})

	/*
		o = {
			data: 'data to compile with view',
			template: 'pre-processed html template'
		}
	*/

	var template = '';
	var data = null;

	if (typeof o === 'string') {
		template = o;
	} else {
		template = o.template;
		data = o.data || null;
	}

	var compiledHtml = new EJSpeed({text: template}).render(data);

	gravity.dom({
		target: 'div#gravity-stage',
		compiledHtml: compiledHtml
	});
}
