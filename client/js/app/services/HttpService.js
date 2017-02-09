class HTTPService {

	/*
		0: requisição ainda não iniciada 
	    1: conexão estabelecida com o servidor
		2: requisição recebida
		3: processando requisição
		4: requisição concluída e resposta esta pronta
	*/
	get(url) {

		return new Promise((resolve, reject) => {
			
			let xhr = new XMLHttpRequest();

			xhr.open('GET', url);

			xhr.onreadystatechange = () => {
						
				if(xhr.readyState == XMLHttpRequest.DONE) {

					if(xhr.status == 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject(xhr.responseText);
					}
				}
			};
			xhr.send();
		});
	}
}