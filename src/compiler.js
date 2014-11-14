/*  -----------------------------------------

		compiler.js

	-------------------------------------------*/
;gravity.compile = function (o) {

	gravity.log({
		message: 'Compiling views.',
		type: 'info'
	})

	o = o || null;
	var compiledHtml = new EJSpeed({text: o}).render();

	gravity.dom({
		target: 'div#gravity-stage',
		compiledHtml: compiledHtml
	});
}
