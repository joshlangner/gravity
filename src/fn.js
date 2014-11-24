/*  -----------------------------------------

	fn.js

-------------------------------------------*/

;gravity.fn = {

	/*
		gravity.fn.contains
		Checks an array to see if it contains a value.
		Minimum of 2x faster, up to 20x faster than native Array.indexOf
	*/
	contains: function (a, v) {
		for (var i = 0, m = a.length; i < m; i++) {
			if (a[i] === v) {
				return true;
			}
		}
		return false;
	}

};