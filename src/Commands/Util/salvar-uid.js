const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "salvar-uid",
  description: "Salve seu UID no servidor",

options: [
  {
    name: "uid",
    description: "Insira seu UID pra salvar",
    type: ApplicationCommandOptionType.Number,
    required: true
  }
],
  
  category: "Mw",
  cooldown: 5000,

  run: async(client, interaction) => {

uid = interaction.options.getNumber("uid");

    userdb = await client.userdb.findOne({
         userID: interaction.user.id
     }) 

      if(!userdb){
         const newuser = new client.userdb({ userID: interaction.user.id })
         await newuser.save();

        interaction.reply({
          content: `Eu salvei suas informações (Tag, Id, Avatar, Nome) em meu banco de dados, utilize o comando novamente pra funcionar.`,
          ephemeral: true
        })

         userdb = await client.userdb.findOne({ userID: interaction.user.id })

        
      }


await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "uid": uid
         }
        })

  interaction.reply({
  content: `<a:bop:788210473454796861> | Seu Uid  foi salvo em meu banco de dados!\n> Uid: **\`${uid}\`**!`,
  ephemeral: true
})

    
  }
};
