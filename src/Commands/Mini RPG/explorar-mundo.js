const { ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, StringSelectMenuBuilder } = require("discord.js")

module.exports = {
  name: "explorar-mundo",
  description: "『🌧️ - MiniRpg』Explore seu incrivel mundo!",

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

  if (userdb.rpg.status.vida < 10) return interaction.reply({content: `Você não pode minerar em seu mundo pois está com vida baixa, recupere vida utilizando **\`/comer\`**!`,
                               ephemeral: true                            })

    if (userdb.rpg.status.fome < 5) return interaction.reply({content: `Você não pode minerar em seu mundo pois está com fome, utilize **\`/comer\`** pra não ficar com fome.`,
                               ephemeral: true                            })

    const menu = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId(`explorar_${interaction.user.id}`)
					.setPlaceholder('Explore seu Mundo!')
					.addOptions(
						{
							label: 'Mini Exploração',
							description: 'Faça uma pequena exploração em seu mundo',
							value: '1',
						},
						{
							label: 'Exploração Completa',
							description: 'Explore muito mais seu incrivel mundo',
							value: '2',
						},
					)
        );
    
const img = new AttachmentBuilder("https://cdn.discordapp.com/attachments/893663610138685460/1037091539744202823/kmc_20221101_164457.jpg", {name: `explorar_${interaction.user.username}.png`}) 

interaction.reply({
  files: [img],
  components: [menu]
})
    
  }
};
