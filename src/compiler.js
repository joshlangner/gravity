/*  -----------------------------------------

		compiler.js

	-------------------------------------------*/
;gravity.compile = function (o) {
	o = o || null;
	var compiledHtml = new EJSpeed({text: o}).render();
	gravity.render(compiledHtml);
}