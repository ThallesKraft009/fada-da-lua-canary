const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');


module.exports = {
  name: "criar-picareta",
  description: "Crie uma picareta e use-a pra minerar em seu mundo",

  options: [
    {
      name: "picareta",
      description: "Qual picareta você quer fabricar?",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Picareta de Pedra",
          value: "pedra"
        },{
          name: "Picareta de Cobre",
          value: "cobre"
        },{
          name: "Picareta de Ferro",
          value: "ferro"
        },{
          name: "Picareta de Titânio",
          value: "titanio"
        }
      ],
    }
  ],

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

    let picareta = interaction.options.getString("picareta");

//================| Picareta de Pedra | ============
    if (picareta === "pedra"){
      
  if (userdb.rpg.blocos.pedra < 3) return interaction.reply({
    content: `Você precisa ter 3 rochas pra criar uma picareta de pedra! Que tal utilizar o comando **\`/coletar-rochas\`** pra coletar mais rochas?`,
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `Você precisa ter pelo menos 2 gravetos pra criar uma picareta de pedra! Que tal criar mais gravetos com o comando **\`/criar-gravetos\`**?`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "rpg.blocos.pedra": userdb.rpg.blocos.pedra - 3,
  "rpg.item.graveto": userdb.rpg.item.graveto - 2,
  "rpg.picaretas.pedra": 500
         }
        })

   interaction.reply({
     content: `${interaction.user} você criou uma **__Picareta de Pedra__**, mas no processo, você gastou 3 pedras e 2 gravetos!`
   })
                              
    }

//===============| Picareta de Cobre | ============
    if (picareta === "cobre"){
      
  if (userdb.rpg.minerios.cobre < 3) return interaction.reply({
    content: `Você precisa ter 3 ingotes de cobre pra criar uma picareta de cobre! Que tal utilizar o comando **\`/explorar-caverna\`** pra minerar novos minérios?`,
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `Você precisa ter pelo menos 2 gravetos pra criar uma picareta de pedra! Que tal criar mais gravetos com o comando **\`/criar-gravetos\`**?`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
"rpg.minerios.cobre": userdb.rpg.minerios.cobre - 3,
"rpg.item.graveto": userdb.rpg.item.graveto - 2,
 "rpg.picaretas.cobre": 1000
         }
        })

   interaction.reply({
     content: `${interaction.user} você criou uma **__Picareta de Cobre__**, mas no processo, você gastou 3 ingotes de cobre e 2 gravetos!`
   })
                              
    }

//===============| Picareta de Ferro | ============
    if (picareta === "ferro"){
      
  if (userdb.rpg.minerios.ferro < 3) return interaction.reply({
    content: `Você precisa ter 3 ingotes de ferro pra criar uma picareta de ferro! Que tal utilizar o comando **\`/explorar-caverna\`** pra minerar novos minérios?`,
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `Você precisa ter pelo menos 2 gravetos pra criar uma picareta de pedra! Que tal criar mais gravetos com o comando **\`/criar-gravetos\`**?`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
"rpg.minerios.ferro": userdb.rpg.minerios.ferro - 3,
"rpg.item.graveto": userdb.rpg.item.graveto - 2,
"rpg.picaretas.ferro": 2000
         }
        })

   interaction.reply({
     content: `${interaction.user} você criou uma **__Picareta de Ferro__**, mas no processo, você gastou 3 ingotes de ferro e 2 gravetos!`
   })
                              
    }

//=============| Picareta de Titânio | ============
    if (picareta === "titanio"){
      
  if (userdb.rpg.minerios.titanio < 3) return interaction.reply({
    content: `Você precisa ter 3 ingotes de titânio pra criar uma picareta de titânio! Que tal utilizar o comando **\`/explorar-ilhaflutuante\`** pra achar novos minérios de titânio?`,
    ephemeral: true
  })

  if (userdb.rpg.item.graveto < 2) return interaction.reply({
    content: `Você precisa ter pelo menos 2 gravetos pra criar uma picareta de pedra! Que tal criar mais gravetos com o comando **\`/criar-gravetos\`**?`,
    ephemeral: true
  })

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
"rpg.minerios.titanio": userdb.rpg.minerios.titanio - 3,
"rpg.item.graveto": userdb.rpg.item.graveto - 2,
  "rpg.picaretas.titanio": 3000
         }
        })
   interaction.reply({
     content: `${interaction.user} você criou uma **__Picareta de Titânio__**, mas no processo, você gastou 3 ingotes de titânio e 2 gravetos!`
   })
                              
    }
  }
}
