import tokenService from "./tokenService"

const BASE_URL = '/api/post/'

export function create(postInfoFromTheForm){

	return fetch(BASE_URL, {
		method: 'POST',
		body: postInfoFromTheForm, 
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
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


export function getRandomPost() {
	return fetch(`${BASE_URL}random`, {
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		  }
	})
	.then(res => {
		if(res.ok) return res.json()
		throw new Error('Problem Fetching randomPost')
	})	
}

// export function show(postId) {
// 	return fetch(`${BASE_URL}${postId}`, {
// 	headers: {
// 		'Authorization': 'Bearer ' + tokenService.getToken()
// 	  }
// })
// .then(res => {
// 	if(res.ok) return res.json()
// 	throw new Error('Problem fetching id')
// })
// }