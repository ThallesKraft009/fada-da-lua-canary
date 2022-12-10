const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: "coletar-rochas",
    description: "Colete rochas pra criar novos itens!",

	run: async (client, interaction) => {

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
    if (uid === null) return interaction.reply({content: `Você não salvou seu uid, salve utilizando \`/salvar-uid\`!`, ephemeral: true})

    if (userdb.rpg.mundoStatus === false) return interaction.reply({content: `Você precisa criar um mundo, utilize **\`/novo-mundo\`**!`, ephemeral: true})

    if (userdb.rpg.d === "Horas" || userdb.rpg.d === "Nether") return interaction.reply({
  content: `:x: | Você não está em Miras...`,
  ephemeral: true
})

let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`rochas_${interaction.user.id}`)
					.setLabel(' - Coletar Rochas')
          .setEmoji("🔨")
					.setStyle(ButtonStyle.Secondary)
			);

interaction.reply({
  content: `Colete rochas clicando no botão!`,
components: [botao]
})
    
	}
};
