const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 8877;
app.use(cors());

const trataEndereco = (endereco) => {
	const parsed = endereco.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	return parsed;
}
const getMinutes = (seconds) => {
	const minutes = Math.floor(Number(seconds) / 60);
	return minutes +" min";
}
const formatDistance = (distance) => {
	distance = (distance / 1000);
	return distance.toFixed(1) + " km";
}
const getMaiorDistancia = (values) => {
	const maxValue = values.reduce(function(prev, current) {
		return Number((prev.distanciaMetros) > Number(current.distanciaMetros)) ? prev : current
	})
	const obj = {
		distancia: formatDistance(maxValue.distancia),
		distanciaMetros: Number(maxValue.distanciaMetros),
		partida: Number(maxValue.partida),
		destino: Number(maxValue.destino),
		tempo: maxValue.tempo
	};
	return obj;
}
const getMenorDistancia = (values) => {
	const minValue = values.reduce(function(prev, current) {
		return (Number(prev.distanciaMetros) < Number(current.distanciaMetros)) ? prev : current
	})
	const obj = {
		distancia: formatDistance(minValue.distancia),
		distanciaMetros: Number(minValue.distanciaMetros),
		partida: Number(minValue.partida),
		destino: Number(minValue.destino),
		tempo: minValue.tempo
	};
	return obj;
}

app.get('/getEnderecos/*', (request, response) => {
	(async () => {
		try {	
			const enderecos = request.params['0'] ? request.params['0'].split('/') : [];
			if(enderecos <= 1) return response.send({erro: "Estão faltando endereços como parâmetro"});
			const latLon = []

			const jsonRetorno = {
				enderecos: [],
				distancias: [],
				enderecosMaisProximos: [],
				enderecosMaisDistantes: [],
			};
			for(let i = 0 ; i < enderecos.length; i++){
				let resposta = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${trataEndereco(enderecos[i])}&apiKey=6a737a28a83443b3a58509459b56673f`)
				latLon.push(
					{
						lon: resposta.data.features[0].geometry.coordinates[0],
						lat: resposta.data.features[0].geometry.coordinates[1],
						endereco: resposta.data.query.text
					}
				);
				jsonRetorno.enderecos.push(
					{
						endereco: resposta.data.query.text,
						latitude: resposta.data.features[0].geometry.coordinates[1],
						longitude: resposta.data.features[0].geometry.coordinates[0],
						indice: i
					}
				)
			}

			let json = {"mode": "drive", "targets": [], "sources": []};
			for(let j = 0 ; j < latLon.length; j++){
				json['targets'].push({location: [latLon[j].lon, latLon[j].lat]})
				json['sources'].push({location: [latLon[j].lon, latLon[j].lat]})
			}
			const respostaDistancias = await axios.post('https://api.geoapify.com/v1/routematrix?apiKey=6a737a28a83443b3a58509459b56673f', json)
			const jsonDistancias = respostaDistancias.data;

			let maiorDistancia = [];
			let menorDistancia = [];

			for(let z = 0; z < jsonDistancias.sources_to_targets.length; z++){
				for(let k = 0; k < jsonDistancias.sources_to_targets[z].length; k++){
					if(z !== k){
						jsonRetorno.distancias.push(
							{
								distancia: formatDistance(jsonDistancias.sources_to_targets[z][k].distance),
								distanciaMetros: jsonDistancias.sources_to_targets[z][k].distance,
								tempo: getMinutes(jsonDistancias.sources_to_targets[z][k].time),
								partida: enderecos[jsonDistancias.sources_to_targets[z][k].source_index],
								destino: enderecos[jsonDistancias.sources_to_targets[z][k].target_index],
								indicePartida: jsonDistancias.sources_to_targets[z][k].source_index,
								indiceDestino: jsonDistancias.sources_to_targets[z][k].target_index
							}
						)
						maiorDistancia.push(
							{
								distancia: `${jsonDistancias.sources_to_targets[z][k].distance}`,
								distanciaMetros: `${Number(jsonDistancias.sources_to_targets[z][k].distance)}`,
								tempo: getMinutes(jsonDistancias.sources_to_targets[z][k].time),
								partida: `${jsonDistancias.sources_to_targets[z][k].source_index}`,
								destino: `${jsonDistancias.sources_to_targets[z][k].target_index}`
							}
						);
						menorDistancia.push(
							{
								distancia: `${jsonDistancias.sources_to_targets[z][k].distance}`,
								distanciaMetros: `${Number(jsonDistancias.sources_to_targets[z][k].distance)}`,
								tempo: getMinutes(jsonDistancias.sources_to_targets[z][k].time),
								partida: `${jsonDistancias.sources_to_targets[z][k].source_index}`,
								destino: `${jsonDistancias.sources_to_targets[z][k].target_index}`
							}
						);
					}
				}
			}
			jsonRetorno.enderecosMaisProximos.push(
				{
					partida: `${enderecos[getMenorDistancia(menorDistancia).partida]}`,
					destino: `${enderecos[getMenorDistancia(menorDistancia).destino]}`,
					distancia: `${getMenorDistancia(menorDistancia).distancia}`
				}
			)
			jsonRetorno.enderecosMaisDistantes.push(
				{
					partida: `${enderecos[getMaiorDistancia(maiorDistancia).partida]}`,
					destino: `${enderecos[getMaiorDistancia(maiorDistancia).destino]}`,
					distancia: `${getMaiorDistancia(maiorDistancia).distancia}`
				}
			)
			
			return response.send(jsonRetorno);
		} catch (error) {
			return response.send({error: error.toString()});
		}
	})();
});
app.get('*', (request, response) => {
	return response.send({erro: "Rota não encontrada"}
	);
})

app.listen(PORT, () => {
})