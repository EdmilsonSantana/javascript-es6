import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory'
import {NegociacaoDao} from '../dao/NegociacaoDao'
import {Negociacao} from "../models/Negociacao";

export class NegociacaoService {


	constructor() {
		this._http = new HttpService();
	}

	importa(listaAtual) {
		return this.obterNegociacoes()
			.then(negociacoes => 
				negociacoes.filter(negociacao => 
					!listaAtual.some(negociacaoExistente =>
						negociacao.isEquals(negociacaoExistente)))
			)
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível buscar negociações para importar');
			});
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

	cadastrar(negociacao) {
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.adicionar(negociacao))
			.then(() => 'Negociação adicionada com sucesso')
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível adicionar a negociação');
			});
	}

	listar() {
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listarTodos())
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível obter as negociações');
			});
	}

	apagar() {
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagarTodos())
			.then(() => 'Negociações apagadas com sucesso')
			.catch(erro => {
				console.log(erro);
				throw new Error('Não foi possível apagar as negociações')
			});

	}

}