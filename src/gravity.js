/*  -----------------------------------------

		Gravity.js

	-------------------------------------------*/
;(function(gravity, $, undefined) {

	// set mustache tags by default
	// do not cache templates by default
	EJSpeed.config({ type: '{{', cache: false });

	gravity.state = {
		model: '',
		id: '',
		action: '',
		params: '',
		reset: function() {
			gravity.state = {
				model: '',
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
