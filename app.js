const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 8877;

app.get('/', (request, response) => {
	return response.send(
		"<body>" +
		"<h1>" + "Rotas disponíveis para consulta:" + "</h1>" +
		"<section style='text-indent: 25px'>"+
		"<h2>" + "Deputados" + "</h2>" +
		"<ul>" +
		"<li>" + "/deputados" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/despesas" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/discursos" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/eventos" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/frentes" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/ocupacoes" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/orgaos" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/profissoes" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/mesa" +
		"</ul>" +
		"<hr>" +
		"<h2>" + "Partidos Políticos" + "</h2>" +
		"<ul>" +
		"<li>" + "/partidos/" + "</li>" + "<br>" +
		"<li>" + "/partidoEspecifico/idPartido/" + "</li>" + "<br>" +
		"<li>" + "/partidoEspecifico/idPartido/politicos/" + "</li>" + "<br>" +
		"</ul>" +
		"</section>"+
		"</body>"
	);
})

app.get('/deputados', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=1&itens=1000`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/deputados/:id', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${request.params.id}`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/deputados/:id/:info', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${request.params.id}/${request.params.info}`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/votacoes', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/votacoes`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/partidos', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos?itens=100`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/partidoEspecifico/:id', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos/${request.params.id}`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/partidoEspecifico/:id/politicos', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/partidos/${request.params.id}/membros`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/queimadas', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://queimadas.dgi.inpe.br/home/download?id=focos_brasil&time=48h&outputFormat=json&utm_source=landing-page&utm_medium=landing-page&utm_campaign=dados-abertos&utm_content=focos_brasil_24h`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.listen(PORT, () => {
})