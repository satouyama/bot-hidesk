module.exports= function(app){
app.get('/chat', function(req ,res){
	var dadosForm = req.body;




		app.get('io').emit(
			'msgParaCliente',
			{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
		)

		res.render("chat", {dadosForm : dadosForm});

});
app.post('/chat', function(req ,res){
	var dadosForm = {
	  apelido : req.body.apelido,
	  email : req.body.email,
	  telefone : req.body.telefone,
	  tipo : req.body.tipo,
	  cidade : req.body.cidade
	};

	res.render("chat", {dadosForm : dadosForm});

});
}
