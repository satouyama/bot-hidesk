module.exports = function(app){
const axios = require('axios');
app.get('/listar',function(req,res){
    axios.get('htpp://localhost:3000/posts', {
      })
      .then(function (response) {
         res.render('desk',{data : response.data});
      })
      .catch(function (error) {
        console.log(error);
      });    
});


}