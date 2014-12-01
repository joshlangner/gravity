/*  -----------------------------------------

	Gravity.js

-------------------------------------------*/
;(function(gravity, $, undefined) {

	// set mustache tags & do not cache templates by default
	EJSpeed.config({ type: '{{', cache: false });

	gravity.state = {
		url: null,
		module: null,
		action: null,
		id: null,
		params: null,
		reset: function() {
			gravity.state.url = null;
			gravity.state.module = null;
			gravity.state.action = null;
			gravity.state.id = null;
			gravity.state.params = null;
		}
	}

	gravity.app = '';

	gravity.init = function () {

		gravity.log({
			message: 'BOOT',
			type: 'info'
		})

		gravity.route.init();
	}

}(window.gravity = window.gravity || {}, jQuery));
