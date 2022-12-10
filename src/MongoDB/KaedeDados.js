module.exports = async(client) => {


  let conta = client.users.cache.get(`1038589877865959484`)

const dados = require("./Database/kaede.js");
  
 let cluster = await dados.findOne({
         kaedeID: "1038589877865959484"
     }) 

      if(!cluster){
         const carregar = new dados({ kaedeID: "1038589877865959484" })
         await carregar.save();

         cluster = await dados.findOne({ kaedeID: "1038589877865959484" })

        
      }

gatewayPing = cluster.info.gatewayPing;
apiPing = cluster.info.apiPing;
users = cluster.info.users;
guilds = cluster.info.guilds;


  client.cluster = (
    {
      GatewayPing: gatewayPing,
      ApiPing: apiPing,
      Users: users,
      Guilds: guilds
    }
   );

  
};
