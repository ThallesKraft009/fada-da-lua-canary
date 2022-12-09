const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
  name: "novo-mundo",
  description: "Crie um novo mundo pra seu Rpg",

options: [
  {
    name: "mundo",
    description: "Me diga o nome de seu incrivel mundo",
    type: ApplicationCommandOptionType.String,
    required: true
  }
],

run: async(client, interaction) => {

let mundo = interaction.options.getString("mundo");


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

    if (userdb.rpg.mundoStatus === true) return interaction.reply({content: `Você já tem 1 mundo criado!`, ephemeral: true})

          

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mundo": mundo,
         "rpg.mundoStatus": true
         }
        })
            
     interaction.reply({
        content: ` Parabéns! Você criou seu incrível mini mundo com o nome ${mundo} !`
      })
  
   }
}
