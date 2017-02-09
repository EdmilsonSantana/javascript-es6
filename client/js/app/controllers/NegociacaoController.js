class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
			new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

		this._service = new NegociacaoService();

	}

	adiciona(event) {
		event.preventDefault();

		let negociacao = this._criaNegociacao();
		this._listaNegociacoes.adiciona(negociacao);
		this._mensagem.texto = "Negociação adicionada com sucesso";

		this._service.enviarNegociacao(negociacao);

		this._limpaFormulario();
	}


	apaga() {
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = 'Negociações apagadas com sucesso';
	}

	
	importaNegociacoes() {
		this._service.obterNegociacoes()
		.then(negociacoes => { negociacoes.forEach(negociacao => 
			this._listaNegociacoes.adiciona(negociacao));
			this._mensagem = 'Negociações importadas com sucesso.';
		})
		.catch(erro => this._mensagem.texto = erro);
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value);
	}

	_limpaFormulario() {
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}


}