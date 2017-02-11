export class HttpService {

	/*
		0: requisição ainda não iniciada 
	    1: conexão estabelecida com o servidor
		2: requisição recebida
		3: processando requisição
		4: requisição concluída e resposta esta pronta
	*/
	get(url) {
		return fetch(url)
			.then(res => this._handleErrors(res))
			.then(res => res.json());
	}

	_handleErrors(res) {
		if(!res.ok) {
			throw new Error(res.statusText);
		} 
		return res;
	}

	post(url, dado) {
		
		return fetch(url, {
			headers: {'Content-Type' : 'application/json' },
			method: 'post',
			body: JSON.stringify(dado)
		})
		.then( res => this._handleErrors(res))
	}
}