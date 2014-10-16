/*  -----------------------------------------

		dom.js
		Attach HTML to the DOM, limit binding 
		assignments to post-render

	-------------------------------------------*/
;gravity.dom = function (o) {

	/* o = {
			target: '.element' or '#element',
			payload: '<processedhtml></processedhtml>' 
		}
	*/

	$(o.target).html(o.payload)

}

// empties DOM item
;gravity.dom.empty = function (o) {
	$(o.target).empty();
}