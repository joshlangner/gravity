/*  -----------------------------------------

		renderer.js

	-------------------------------------------*/
;gravity.render = function (o) {

	/*
		o = pre-processed, precompiled processed HTML STRING
	*/

	gravity.log({
		message: 'Rendering...',
		type: 'info'
	})

	if (typeof o === 'string') {
		$('div#gravity-stage').html(o);
	}

}
