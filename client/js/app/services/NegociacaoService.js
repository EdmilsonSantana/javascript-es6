class NegociacaoService {


	constructor() {
		this._http = new HTTPService();
	}

	obterNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()
		]).then(periodos => {

			let negociacoes = periodos
				.reduce((dados, periodo) => dados.concat(periodo), []);

			return negociacoes;

		}).catch(erro => {
			throw new Error(erro)
		});
	}
	
	obterNegociacoesDaSemana() {
		
		return this._http.get('negociacoes/semana')
				.then(negociacoes => {
					console.log(negociacoes)
					return negociacoes.map(objeto => 
						new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
				})
				.catch(erro => {
					console.log(erro);
					throw new Error('Não foi possível obter as negociações da semana.');
				});
		
	}

	obterNegociacoesDaSemanaRetrasada() {

		return this._http.get('negociacoes/retrasada')
				.then(negociacoes => {
					console.log(negociacoes)
					return negociacoes.map(objeto => 
						new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
				})
				.catch(erro => {
					console.log(erro);
					throw new Error('Não foi possível obter as negociações da semana retrasada.');
				});

	}

	obterNegociacoesDaSemanaAnterior() {

		return this._http.get('negociacoes/anterior')
				.then(negociacoes => {
					console.log(negociacoes)
					return negociacoes.map(objeto => 
						new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
				})
				.catch(erro => {
					console.log(erro);
					throw new Error('Não foi possível obter as negociações da semana anterior.');
				});
	}

	enviarNegociacao(negociacao) {
		let xhr = new XMLHttpRequest();

		xhr.open('POST', 'negociacoes', true);

		xhr.setRequestHeader('Content-type', 'application/json');

		xhr.onreadystatechange = () => {
			 if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        		console.log('Negociação enviada com sucesso');
   			 }	 
		};

		xhr.send(negociacao.stringfy());
	}
}