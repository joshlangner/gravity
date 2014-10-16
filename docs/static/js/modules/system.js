/*  -----------------------------------------

		system.js
		required modules for gravity.

	-------------------------------------------*/
;docs['404'] = '404.html'
;docs['500'] = function(response, status, errorThrown) {
	gravity.log({message: response, type:'error'})
	gravity.log({message: status, type:'error'})
	gravity.log({message: errorThrown, type:'error'})
}
