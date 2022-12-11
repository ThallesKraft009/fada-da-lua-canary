const { ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "bot-sugerir",
  description: "『💎 - Util』Envie uma sugestão pra a Fada da Lua",
  type: ApplicationCommandType.ChatInput,
  

run: async(client, interaction) => {

  const modal = new ModalBuilder()
			.setCustomId(`s_${interaction.user.id}`)
			.setTitle(`Envie uma sugestão`);

  

const nomeOption = new TextInputBuilder()
			.setCustomId('nome')
			.setLabel("Qual o nome do comando?")
			.setStyle(TextInputStyle.Short)
      .setRequired(true);

const descricaoOption = new TextInputBuilder()
			.setCustomId('descricao')
			.setLabel("Explique como o cmd vai funcionar")
			.setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

  

  const nome = new ActionRowBuilder()
    .addComponents(nomeOption)

   const descricao = new ActionRowBuilder()
     .addComponents(descricaoOption)

modal.addComponents(nome, descricao);


await interaction.showModal(modal);
  
  }
}
