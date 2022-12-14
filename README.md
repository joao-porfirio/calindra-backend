API Desenvolvida utilizando Node.JS com o objetivo de calcular a distância entre N pontos inseridos como parâmetro.

Instruções para instalação e funcionamento do projeto:

1) Em um terminal node, executar o comando git clone https://github.com/joao-porfirio/calindra-backend.git
2) Acessar a pasta do projeto com o comando 'cd calindra-backend';
3) Executar o comando npm install
4) Após a instalação, acessar o projeto em um editor de texto como o "Visual studio code";
5) No terminal do Visual studio code ou no próprio terminal node aberto, executar o comando node app.js

Instruções para execução do projeto após a instalação:

1) Incluir no mínimo 2 endereços para a execução correta do projeto;
2) O projeto aceita N endereços como parâmetro;
3) Inserir endereços completos com Logradouro, Endereço, Número, Bairro, Estado e UF, CEP;
4) Inserir endereços separados por '/' para o cálculo da distância, km e tempo entre os pontos.

No exemplo de requisição foram escolhidos 3 endereços:

1) Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003
2) Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200
3) Rua Lauro Muller 116, Botafogo, Rio de Janeiro RJ, 22290160

Como executar: em um terminal node, digitar 'npm install', e ao fim das instalações, digitar o comando 'npm start' ou 'node app.js'

No navegador, visualizar o funcionamento do projeto com o link: localhost:8877/getEnderecos/Endereco1/EnderecoN
Seguindo os endereços de exemplo, a requisição ficaria com o link: 
http://localhost:8877/getEnderecos/Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003/Praça Mal. Ancora, 122 Centro, Rio de Janeiro RJ, 20021200/Rua Lauro Muller 116, Botafogo, Rio de Janeiro RJ, 22290160

Retorno JSON de uma requisição bem sucedida:

![Requisição bem sucedida](https://github.com/joao-porfirio/calindra-backend/blob/master/imagemProjeto.PNG?raw=true)

