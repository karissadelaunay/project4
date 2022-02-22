import tokenService from "./tokenService";

// Create two function
// One to create a like 

// one to delete a like 

// both of these are going to make api calls to the like routes defined in the express app /route/likes.js routes

const BASE_URL = '/api';

export function create(postId){
	return fetch(`${BASE_URL}/posts/${postId}/likes`, { // <- this end point is communicating with the create route in /routes/likes.js on express server
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken() // <- the jwt contains the user who is sending the like
		}
	}).then(res => {
		if (res.ok) return res.json();
		throw new Error('Error in creating the like, Check your express terminal!')
	})
}

export function removeLike(likesId){
	return fetch(`${BASE_URL}/likes/${likesId}`, {
		method: 'DELETE',
	    headers: {
			'Authorization': 'Bearer ' + tokenService.getToken() // <- the jwt contains the user who is sending the like
		}	
	}).then(res => {
		console.log(res.ok, " <- res.ok")
		if(res.ok) return res.json();
		throw new Error('Error in deleting the like, check your express terminal!')
	})
}