const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'criar-gravetos',
    description: "Crie gravetos pra construir ferramentas",

options: [
  {
    name: "quantidade",
    description: 'Quantos gravetos você quer criar?',
    type: ApplicationCommandOptionType.Number,
    required: true

  }
],

    
	run: async (client, interaction) => {

    const userdb = await client.userdb.findOne({
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



    let uid = userdb.uid;
    if (uid === null) return interaction({content: `Você não salvou seu uid, salve utilizando \`/salvar-uid\`!`, ephemeral: true})

    if (userdb.rpg.mundoStatus === false) return interaction.reply({content: `Você precisa criar um mundo, utilize **\`/novo-mundo\`**!`, ephemeral: true})

    
    

    let quantidade = interaction.options.getNumber("quantidade");


    if (userdb.rpg.blocos.madeira < quantidade) {
      interaction.reply({
        content: `:x: | Você não tem **\`${quantidade}\`** blocos de madeiras para criar **\`${quantidade}\`** gravetos!`,
        ephemeral: true
      })
    } else {

      await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
       "rpg.blocos.madeira": userdb.rpg.blocos.madeira - quantidade,
        "rpg.item.graveto": userdb.rpg.item.graveto + quantidade
         }
        })


      interaction.reply({
        content: `<:YAY:753572428449448086> | Você criou **\`${quantidade}\`** gravetos!!`
      })
    }
    
	}
};
