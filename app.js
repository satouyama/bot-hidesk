/* importar as configurações do servidor */
var app = require('./config/server');
// Listen PORT
var port = process.env.PORT || 3000;
var eterium = 0;
//dotenv
require('dotenv').config({silent: true});
// importar o package request
const request = require('request');
const axios = require('axios');
// Callwatson api
const watson = require('watson-developer-cloud');
const query = require('json-query');
//conversation params api
var conversation = watson.conversation({
	username: 'b41326bd-8e10-436f-9656-6fd8c349fef2',
	password: 'exzZi1p3OlsA',
	version: 'v1',
	version_date: '2018-01-09',
});

/* parametrizar a porta de escuta */
var server = app.listen(port, function () {
	console.log('Servidor online on port ' + port);
});

//connection socket
var io = require('socket.io').listen(server);

// set global io
app.set('io', io);


 // função que envia o ticket com as informações
 
 enviaTicket = function(ticketUser){
	axios.post('http://localhost:3000/posts', {
		"email": ticketUser.email,
		"tipo": ticketUser.tipo,
		"solicitante": ticketUser.nome,
		"descricaoMensagem": ticketUser.problema,
		"prioridade" : ticketUser.prioridade
	  })
	  .then(function (response) {
		console.log(response);
	  })
	  .catch(function (error) {
		console.log(error);
	  });       
 }
 

/* criar a conexão por websocket */
io.on('connection', function (socket) {

	// variavel que recebe as informações do ticket do usuario
  	let ticketUser = [{
		email : null,
		tipo: null,  
		problema: null,
		nome: null,
		prioridade : null
	}];

	//payload config watson conversation
	let payload = {
		workspace_id: '1c2345d7-6ff1-4f62-9446-7b68508ca955',
		input: {
			text: 'Oi'
		}
	}
	console.log('Usuário conectou');

	socket.on('disconnect', function () {
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function (data) {
		var msgCliente = data.mensagem;
		var apelido = data.apelido;
		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{ apelido: data.apelido, mensagem: data.mensagem }
		);

		//
		//Atualizando a mensagem no Payload
		payload.input.text = msgCliente;

		//Enviando mensagem pro watson e obtendo resposta
		conversation.message(payload, (error, response) => {
			let entity = response.intents[0];
			let entidade = response.entities[0];
			 ticketUser.nome = data.apelido;
			console.log(response);


			// se o problema for de desenvolviment guarda na variavel o input do usuario
			if (entity != null) {
				if (entity.intent == "ProblemaDev") {
					ticketUser.problema = response.input.text;
					ticketUser.tipo = "Dev";	
					ticketUser.prioridade = 'High';
					ticketUser.email = "douglas@gmail.com"		

					enviaTicket(ticketUser);
				}

			}
			// se o valor da entidade for Aguas Claras
			if (entidade != null) {
				
			}


			//E atualizar o contexto do payload
			payload.context = response.context

			// emite a mensagem para o usuario 
			socket.emit(
				'msgDoBot',
				{ apelido: "Assistente Virtual", mensagem: response.output.text[0] }
			);

		})

	});

});
