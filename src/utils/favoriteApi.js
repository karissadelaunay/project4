import tokenService from "./tokenService";
const BASE_URL = '/api/favorites';

export function create(juiceId){
	return fetch(`${BASE_URL}/juice/${juiceId}`, { 
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
		if (res.ok) return res.json();
		throw new Error('Error in creating the like, Check your express terminal!')
	})
}

export function removeFavorite(favoritesId){
	return fetch(`${BASE_URL}/${favoritesId}`, {
		method: 'DELETE',
	    headers: {
			'Authorization': 'Bearer ' + tokenService.getToken() 
		}	
	}).then(res => {
		console.log(res.ok, " <- res.ok")
		if(res.ok) return res.json();
		throw new Error('Error in deleting the like, check your express terminal!')
	}).catch(err => {
        console.log(err)
    })
}