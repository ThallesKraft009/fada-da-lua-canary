const client = require("../bot.js");

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return



//============= | Coletar Madeira | ===============

  if (interaction.customId === `madeira_${interaction.user.id}`) {

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

    await interaction.deferUpdate()

let madeiraTotal = userdb.rpg.config.madeiraTotal;

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.blocos.madeira": userdb.rpg.blocos.madeira + madeiraTotal
         }
        })

    if (madeiraTotal === 1) madeiraTotal = `1 madeira`;
    if (madeiraTotal > 1) madeiraTotal = `${madeiraTotal} madeiras`;

interaction.editReply({
  content: `🌲 | Você coletou ${madeiraTotal}!\nVocê sabia que você pode atualizar as coletas pra coletar mais madeira que o normal?\n> Continue clicando no botão pra coletetar mais madeiras!`
})
  }

//============== | Coletar Pedra | ==============
  
  if (interaction.customId === `rochas_${interaction.user.id}`) {

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

    await interaction.deferUpdate()

let rochaTotal = userdb.rpg.config.madeiraTotal;

await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.blocos.pedra": userdb.rpg.blocos.pedra + rochaTotal
         }
        })

        if (rochaTotal === 1) rochaTotal = `1 rocha`;
    if (rochaTotal > 1) rochaTotal = `${rochaTotal} rochas`;

interaction.editReply({
  content: `⛰️ | Você coletou ${rochaTotal}!\nVocê sabia que você pode atualizar as coletas pra coletar mais rochas que o normal?`
})
  }
})
