/*  -----------------------------------------

		renderer.js

	-------------------------------------------*/
;gravity.render = function (o) {

	/* 
		o = pre-processed, precompiled processed HTML
	*/

	if (typeof o === 'string') {
		// added settimeout due to livereload issues?????????
		window.setTimeout(function() {
			$('div#gravity-stage').html(o);
		})
	}

}