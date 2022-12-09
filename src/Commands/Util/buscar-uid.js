const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "buscar-uid",
  description: "Procure o UID de algum membro do servidor",

options: [
  {
    name: "membro",
    description: "Mencione ou insira o ID do membro",
    type: ApplicationCommandOptionType.User,
    required: true
  }
],
  
  category: "Mw",
  cooldown: 5000,

  run: async(client, interaction) => {

membro = interaction.options.getUser("membro");

    userdb = await client.userdb.findOne({
         userID: membro.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: membro.id })
         await newuser.save();
        interaction.reply({
          content: `Eu salvei as informações de ${membro.tag} (Tag, Id, Avatar, Nome) em meu banco de dados, utilize o comando novamente pra funcionar.`,
          ephemeral: true
        })

         userdb = await client.userdb.findOne({ userID: membro.id })

        
      }


if (userdb.uid === null) return interaction.reply({
  content: `${membro.tag} não possui um uid, peça pra ele utilizar o comando **\`/salvar-uid\`**!`,
  ephemeral: true
})
   
  interaction.reply({
  content: `<a:bop:788210473454796861> | O Uid de ${membro} é **\`${userdb.uid}\`**`,
  ephemeral: true
})


  }
};
