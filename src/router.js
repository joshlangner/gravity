/*  -----------------------------------------

		router.js

	-------------------------------------------*/

;gravity.route = {

	init: function () {
		$(window).on('hashchange', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var hash = window.location.hash;
			var route = [];
			if (hash.indexOf('#!/') > -1) {
				route = (hash.substring(3)).split('/');

			} else {

			}
		});
		$(window).trigger('hashchange');
	}

}
