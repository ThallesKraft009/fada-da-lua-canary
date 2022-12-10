module.exports = (client) => {


  const c = require("colors")


const conectar = async() => {

const { connect } = require("mongoose");
  
  
    await connect(client.config.mongo).then(() => {
      console.log(c.blue("[INFO]: MongoDB Conectado ✅"));
      
    })
}


client.once("ready", () => {
  conectar()
})


client.userdb = require("./Database/user.js");


    require("./KaedeDados")(client);
 }
