/*  -----------------------------------------

		index.js

	-------------------------------------------*/
;docs.tweet = {

	index: function () {

	},

	ping: function () {

		var thePing;

		function wo (r) {
			thePing = r;
			console.log(thePing);
		}

		// callback case (not ideal due to nested nature of syntax)
		gravity.load('sample.json', wo);

		// blocking case
		// gravity.load('sample.json');

		// load template(s)
		// compile
	}
}