const db = require("../models");
const User = db.user;

// Create and Save a new USer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.tipo || !req.body.ruc ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const tipo = req.body.tipo;
  const ruc = req.body.ruc;

  const http = require("http");

  http.get("http://wsruc.com/Ruc2WS_JSON.php?ruc="+ruc+"&tipo="+tipo, (resp) => {
    if(resp.statusCode == 200){
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
  
      resp.on('end', () => {
        console.log(JSON.parse(data));
        const user = new User({
            ruc: JSON.parse(data).ruc,
            estado: JSON.parse(data).estado,
            razon_social: JSON.parse(data).razon_social,
            direccion: JSON.parse(data).direccion,
            ubigeo: JSON.parse(data).ubigeo,
            departamento: JSON.parse(data).departamento,
            provincia: JSON.parse(data).provincia,
            distrito: JSON.parse(data).distrito
            });
            // Save user in the database
            user
            .save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
                });
            });
      });
    }else{
        res.send({ message: "Ruc no encontrado" });
    }
    
    });
};