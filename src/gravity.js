/*  -----------------------------------------

		Gravity.js

	-------------------------------------------*/
;(function(gravity, $, undefined) {

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
