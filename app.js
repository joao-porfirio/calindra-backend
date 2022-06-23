const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 8877;
app.use(cors());

app.get('/', (request, response) => {
	return response.send(
		"<body>" +
		"<h1>" + "Rotas disponíveis para consulta:" + "</h1>" +
		"<section style='text-indent: 25px'>"+
		"<h2>" + "Deputados" + "</h2>" +
		"<ul>" +
		"<li>" + "/deputados" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado" + "</li>" + "<br>" +
		"<li>" + "/deputados/idDeputado/gastosDeputado" + "</li>" + "<br>" +
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
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados`)
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

app.get('/deputados/:id/gastosDeputado', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${request.params.id}/despesas?pagina=1&itens=2000`)
			const json = resposta.data;
			const jsonFinal = [];

			for(let i=0; i<json.dados.length; i++){
				jsonFinal.push(
					{
						valor: json.dados[i].valorDocumento, 
						tipoDespesa: json.dados[i].tipoDespesa,
						ano: json.dados[i].ano,
						mes: json.dados[i].mes,
					}
				);
			}
			return response.send(jsonFinal);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/deputados/:id/gastosPorMes/:ano', (request, response) => {
	function formatarMoeda(valor){
		return valor.toLocaleString('pt-br', {minimumFractionDigits: 2})
	}
	  
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${request.params.id}/despesas?pagina=1&itens=2000`)
			const json = resposta.data;

			const valoresJaneiro = []; let valorFinalJan = 0;
			const valoresFevereiro = []; let valorFinalFev= 0;
			const valoresMarco = []; let valorFinalMar= 0;
			const valoresAbril = []; let valorFinalAbr= 0; 
			const valoresMaio = []; let valorFinalMai= 0; 
			const valoresJunho = []; let valorFinalJun= 0; 
			const valoresJulho = []; let valorFinalJul= 0;
			const valoresAgosto = []; let valorFinalAgo= 0;
			const valoresSetembro = []; let valorFinalSet= 0;
			const valoresOutubro = []; let valorFinalOut= 0;
			const valoresNovembro = []; let valorFinalNov= 0;
			const valoresDezembro = []; let valorFinalDez= 0;
			
			for(let i=0; i<json.dados.length; i++){
				if(json.dados[i].ano == `${request.params.ano}`){
					switch (json.dados[i].mes) {
						case 1:
							valoresJaneiro.push(json.dados[i].valorDocumento)
						break;
						case 2:
							valoresFevereiro.push(json.dados[i].valorDocumento)
						break;
						case 3:
							valoresMarco.push(json.dados[i].valorDocumento)
						break;
						case 4:
							valoresAbril.push(json.dados[i].valorDocumento)
						break;
						case 5:
							valoresMaio.push(json.dados[i].valorDocumento)
						break;
						case 6:
							valoresJunho.push(json.dados[i].valorDocumento)
						break;
						case 7:
							valoresJulho.push(json.dados[i].valorDocumento)
						break;
						case 8:
							valoresAgosto.push(json.dados[i].valorDocumento)
						break;
						case 9:
							valoresSetembro.push(json.dados[i].valorDocumento)
						break;
						case 10:
							valoresOutubro.push(json.dados[i].valorDocumento)
						break;
						case 11:
							valoresNovembro.push(json.dados[i].valorDocumento)
						break;
						case 12:
							valoresDezembro.push(json.dados[i].valorDocumento)
						break;
					}
				}
			}
			
			for (var x=0; x < valoresJaneiro.length; x++) {
				valorFinalJan += parseFloat(valoresJaneiro[x]);
			}
			for (var x=0; x < valoresFevereiro.length; x++) {
				valorFinalFev += parseFloat(valoresFevereiro[x]);
			}
			for (var x=0; x < valoresMarco.length; x++) {
				valorFinalMar += parseFloat(valoresMarco[x]);
			}
			for (var x=0; x < valoresAbril.length; x++) {
				valorFinalAbr += parseFloat(valoresAbril[x]);
			}
			for (var x=0; x < valoresMaio.length; x++) {
				valorFinalMai += parseFloat(valoresMaio[x]);
			}
			for (var x=0; x < valoresJunho.length; x++) {
				valorFinalJun += parseFloat(valoresJunho[x]);
			}
			for (var x=0; x < valoresJulho.length; x++) {
				valorFinalJul += parseFloat(valoresJulho[x]);
			}
			for (var x=0; x < valoresAgosto.length; x++) {
				valorFinalAgo += parseFloat(valoresAgosto[x]);
			}
			for (var x=0; x < valoresSetembro.length; x++) {
				valorFinalSet += parseFloat(valoresSetembro[x]);
			}
			for (var x=0; x < valoresOutubro.length; x++) {
				valorFinalOut += parseFloat(valoresOutubro[x]);
			}
			for (var x=0; x < valoresNovembro.length; x++) {
				valorFinalNov += parseFloat(valoresNovembro[x]);
			}
			for (var x=0; x < valoresDezembro.length; x++) {
				valorFinalDez += parseFloat(valoresDezembro[x]);
			}

			let valorTotalAno = valorFinalJan+valorFinalFev+
			valorFinalMar+valorFinalAbr+
			valorFinalMai+valorFinalJun+
			valorFinalJul+valorFinalAgo+
			valorFinalSet+valorFinalOut+
			valorFinalNov+valorFinalDez;
			
			return response.send(
				{
					"janeiro": formatarMoeda(valorFinalJan),
					"fevereiro": formatarMoeda(valorFinalFev),
					"marco": formatarMoeda(valorFinalMar),
					"abril": formatarMoeda(valorFinalAbr),
					"maio": formatarMoeda(valorFinalMai),
					"junho": formatarMoeda(valorFinalJun),
					"julho": formatarMoeda(valorFinalJul),
					"agosto": formatarMoeda(valorFinalAgo),
					"setembro": formatarMoeda(valorFinalSet),
					"outubro": formatarMoeda(valorFinalOut),
					"novembro": formatarMoeda(valorFinalNov),
					"dezembro": formatarMoeda(valorFinalDez),
					"totalAno": formatarMoeda(valorTotalAno)
				}
				);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.get('/deputados/:id/profissoes', (request, response) => {
	(async () => {
		try {
			const resposta = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${request.params.id}/profissoes`)
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
			const resposta = await axios.get(`https://queimadas.dgi.inpe.br/home/download?id=focos_brasil&time=48h&outputFormat=json&utm_source=landing-page&utm_medium=landing-page&utm_campaign=dados-abertos&utm_content=focos_brasil_48h`)
			return response.send(resposta.data);
		} catch (error) {
			console.log(error);
		}
	})();
});

app.listen(PORT, () => {
})