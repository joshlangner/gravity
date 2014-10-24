/*  -----------------------------------------

		Gravity.js

	-------------------------------------------*/
;(function(gravity, $, undefined) {

	// set mustache tags & do not cache templates by default
	EJSpeed.config({ type: '{{', cache: false });

	gravity.state = {
		url: '',
		module: '',
		id: '',
		action: '',
		params: '',
		reset: function() {
			gravity.state = {
				url: '',
				module: '',
				id: '',
				action: '',
				params: ''
			}
		}
	}

	gravity.app = '';

	gravity.init = function () {
		gravity.route();
	}

}(window.gravity = window.gravity || {}, jQuery));
