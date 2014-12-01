/*  -----------------------------------------

		index.js

	-------------------------------------------*/
;docs.tweet = {

	index: function () {

	},

	ping: function () {

		// option 2
		gravity.load({
			url: 'sample.json',
			callback: function (r) {
				console.log(typeof r)
			}
		});

		gravity.load('sample.json')

		// load template(s)
		// compile
	}
}