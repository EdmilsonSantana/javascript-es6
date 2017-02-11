export class Negociacao {
	constructor(data, quantidade, valor) {
		this._data = new Date(data.getTime());
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this);
	}

	get volume() {
		return this._quantidade * this._valor;
	}

	get data() {
		return new Date(this._data.getTime());
	}

	get quantidade() {
		return this._quantidade;
	}

	get valor() {
		return this._valor;
	}

	isEquals(negociacao) {
		return this.stringfy() == negociacao.stringfy();
	} 

	stringfy() {

		return `{
				 "data": "${this.data}", 
				 "quantidade": ${this._quantidade}, 
				 "valor": ${this._valor}
				}`;
	}
}