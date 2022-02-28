import tokenService from "./tokenService"

const BASE_URL = '/api/juices/'

export function getAll() {
	return fetch(BASE_URL, {
        method: "GET",
	    headers: {
		    'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		if(res.ok) return res.json()
		throw new Error('Problem Fetching Gel All')
	})	
  }