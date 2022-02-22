import tokenService from "./tokenService"

const BASE_URL = '/api/post/'

export function create(postInfoFromTheForm){
	// Make a post request to the server
	return fetch(BASE_URL, {
		method: 'POST',
		// We are sending over a picture
		// multipart/form-data < - is the content type
		body: postInfoFromTheForm, // <- postInfoFromTheForm has to be formData
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
		// Valid login if we have a status of 2xx (res.ok)
		if (res.ok) return res.json();
		throw new Error('Error submitting the Form! Hey Check the Express Terminal');
	  })
}

export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		if(res.ok) return res.json()
		throw new Error('Problem Fetching Gel All')
	})	
  }