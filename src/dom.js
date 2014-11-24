/*  -----------------------------------------

	dom.js
	Attach HTML to the DOM, limit binding
	assignments to post-render

-------------------------------------------*/
;gravity.dom = function (o) {

	gravity.log({
		message: 'DOM',
		type: 'info'
	})

	/*
		o = {
			target: '.element' or '#element',
			compiledHtml: '<compiledHtml></compiledHtml>'
		}
	*/
	if (o.target && typeof o.compiledHtml === 'string') {
		$(o.target).html(o.compiledHtml);
	}

	gravity.render();

}

// empties DOM item
;gravity.dom.empty = function (o) {
	// o = target html element, i.e. 'div#myDiv'
	$(o.target).empty();
}
