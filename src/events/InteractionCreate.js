const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const client = require("../bot.js");

client.on("interactionCreate", async (interaction) => {

  if (interaction.isChatInputCommand()) {
  
  const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction);
    } catch (e) {
      console.error(e)
    };
  };
});
