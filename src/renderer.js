/*  -----------------------------------------

		renderer.js

	-------------------------------------------*/
;gravity.render = function (o) {

	/* 
		o = pre-processed, precompiled processed HTML STRING
	*/

	if (typeof o === 'string') {
		$('div#gravity-stage').html(o);
	}

}