
var json = [{
   img:'http://storage.allmatech.com.br/villa-fotos/64580_4c1c2051-36d0-4acd-87ed-14a12b5691db_2x.jpg',
   tipo:'Casa de Condominio',
   negocio :'Venda',
   cidade:'Brasilia',
   codigo :'VILLA64580B01V01',
   preco :'R$2.699.000,00'
},{
    img:'http://storage.allmatech.com.br/villa-fotos/43392_aeadaf82-78f5-4294-9768-cb96910217f0_md.jpg',
   tipo:'Apartamento',
   negocio :'Compra',
   cidade:'Brasilia',
   codigo :'VILLA43392A01',
   preco :'R$>800'
}
];

var jsonQuery = require('json-query');

var dados = jsonQuery('[negocio = Compra]', {
    data: json});

    console.log(dados);
module.exports = json;