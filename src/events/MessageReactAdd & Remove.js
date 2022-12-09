const client = require('../bot.js')
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');


client.on('messageReactionAdd', async (reaction, user) => {

let message = reaction.message, emoji = reaction.emoji;

	if (reaction.partial) {
	
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
		
			return;
		}
	}

if (reaction.message.author.bot) return;
//if (user === reaction.message.author) return;
if (user.bot) return;

  let chat = client.channels.cache.get(`${client.config.guild.logsReaction}`);

const botao = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Mensagem')
					.setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`),
        new ButtonBuilder()
        .setLabel("User")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/users/${user.id}`)
			);
  
  let usuario = client.users.cache.get(user.id)


if (emoji.name === "🖕"){

reaction.remove(`🖕`)

    reaction.message.channel.send({
      content: `🚫 | ${client.users.cache.get(`${user.id}`)} não reaja emojis inadequados.`
    })

  
  chat.send({
    embeds: [
      new EmbedBuilder()
      .setAuthor({ name: `${usuario.tag}`, iconURL: `  ${usuario.displayAvatarURL({ format: 'png' })}`})
      .setDescription(`Reagiram com emoji inadequado!\n
> Id: **\`${usuario.id}\`**
> Emoji: "${reaction.emoji}"`)
.setColor("Red")
    ],
  components: [botao]
  })
} else {
  
  chat.send({
    embeds: [
      new EmbedBuilder()
      .setAuthor({ name: `${usuario.tag}`, iconURL: `  ${usuario.displayAvatarURL({ format: 'png' })}`})
      .setDescription(`> Author: **\`${usuario.tag}\`**
> Id: **\`${usuario.id}\`**
> Emoji: "${reaction.emoji}"`)
.setColor("Green")
    ],
    components: [botao]
  })
 }
});
