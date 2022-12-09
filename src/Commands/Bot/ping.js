const { Client, CommandInteraction, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

  name: "ping",
  description: `Veja minha latência atual`,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    
 gatewayPing = client.ws.ping;
 apiPing = Date.now() - interaction.createdTimestamp

    botao = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('pingCommand')
					.setLabel(`Versão Canary`)
					.setStyle(ButtonStyle.Secondary)
        .setDisabled(true)
			);

    interaction.reply({
      content: `**🏓 Pong!** [Cluster 1]\n🌧️ | Gateway Ping: **\`${gatewayPing}ms\`**\n💎 | Api Ping: **\`${apiPing}ms\`**`,
      components: [botao]
    })

  },
};
