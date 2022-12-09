const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "coletar-madeira",
  description: "Colete várias madeiras pra evoluir no rpg!",

  run: async(client, interaction) => {
    let userdb = await client.userdb.findOne({
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

    if (userdb.rpg.d === "Horas" || userdb.rpg.d === "Nether") return interaction.reply({
  content: `:x: | Você não está em Miras...`,
  ephemeral: true
})


let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`madeira_${interaction.user.id}`)
					.setLabel(' - Coletar Madeira')
          .setEmoji("🔨")
					.setStyle(ButtonStyle.Secondary)
			);

interaction.reply({
  content: `Para coletar madeira, clique no botão!`,
  components: [botao]
})
    
  }
}
