const client = require("../bot.js");
const { EmbedBuilder, AttachmentBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const tempo = require("ms");

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return



//=========== | Coletar Madeira | ===============

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
  content: `🌲 | Você coletou ${madeiraTotal}!\nVocê sabia que você pode atualizar as coletas pra coletar mais madeira que o normal?`
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

//========== | Sistema de Mineração | ==========
  if (interaction.customId === `minerar_${interaction.user.id}`){

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

        await interaction.deferUpdate()

  let minerios = ["mob", "Carvao", "mob", "Carvao", "Carvao", "Cobre","Carvao", "Cobre", "mob", "Cobre", "Ferro", "Ferro", "mob", "mob"];

  let minerio = minerios[Math.floor(Math.random() * minerios.length)];

const botaoRetornar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
			.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel(' - Pular')
.setEmoji("🔁")
					.setStyle(ButtonStyle.Secondary)
  )

    if (minerio === "Carvao"){

  let botaoCarvao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`picaretaPedraCarvao_${interaction.user.id}`)
					.setLabel('Pedra')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaCobreCarvao_${interaction.user.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaFerroCarvao_${interaction.user.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaTitanioCarvao_${interaction.user.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),
    );

interaction.editReply({content: `Parabens, você achou minério de carvão, selecione qual picareta irá utilizar para minerar.`, components: [botaoCarvao, botaoRetornar], ephemeral: true})
  

       }

if (minerio === "Cobre"){

  let botaocobre = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`picaretaPedraCobre_${interaction.user.id}`)
					.setLabel('Pedra')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaCobreCobre_${interaction.user.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaFerroCobre_${interaction.user.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaTitanioCobre_${interaction.user.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),
    );

interaction.editReply({content: `Parabens, você achou minério de cobre, selecione qual picareta irá utilizar para minerar.`, components: [botaocobre, botaoRetornar], ephemeral: true})
      }

if (minerio === "ferro"){
let botaoFerro = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
					.setCustomId(`picaretaCobreFerro_${interaction.user.id}`)
					.setLabel('Cobre')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaFerroFerro_${interaction.user.id}`)
					.setLabel('Ferro')
					.setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
					.setCustomId(`picaretaTitanioFerro_${interaction.user.id}`)
					.setLabel('Titanio')
					.setStyle(ButtonStyle.Secondary),
    );

interaction.editReply({content: `Parabens, você achou minério de ferro, selecione a picareta que você quer utilizar.`, components: [botaoFerro, botaoRetornar], ephemeral: true})
  
}

if (minerio === "mob"){

let atacar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`mob_${interaction.user.id}`)
					.setLabel(' - Atacar')
      .setEmoji('🗡')
					.setStyle(ButtonStyle.Secondary)
  )

interaction.editReply({
  content: `Você achou um monstro!! Ataque!!!`,
  ephemeral: true,
  components: [atacar]
})
    }
  }

//============== | Minerar Carvão | ============
  if (interaction.customId === `picaretaTitanioCarvao_${interaction.user.id}`){

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

        

if (userdb.rpg.picaretas.titanio === 0 || userdb.rpg.picaretas.titanio < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de titânio, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
let valor = Math.floor(Math.random() * 2) + 30

  await interaction.deferUpdate()
  
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )
  let fome = userdb.rpg.status.fome;
  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
  "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.titanio": userdb.rpg.picaretas.titanio - valor + 5,
   "rpg.status.fome": fome - 1
         }
        })



  interaction.editReply({
    content: `⛏️ | Você minerou ${valor} minérios de carvão utilizando uma picareta de titânio!`,
    components: [continuar],
    ephemeral: true
  })
}                         
}



  
if (interaction.customId === `picaretaFerroCarvao_${interaction.user.id}`){

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

        

if (userdb.rpg.picaretas.ferro === 0 || userdb.rpg.picaretas.ferro < 0) { interaction.reply({content: `:x: | Você não tem uma picareta de ferro, crie uma utizando **\`/criar-picareta\`**!`,ephemeral: true })
                                    } else {

  await interaction.deferUpdate()

let valor = Math.floor(Math.random() * 2) + 30

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

    let fome = userdb.rpg.status.fome;
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.ferro": userdb.rpg.picaretas.ferro - valor,
    "rpg.status.fome": fome - 1

         }
        })



  interaction.editReply({
    content: `⛏️ | Você minerou ${valor} minérios de carvão utilizando uma picareta de ferro!`,
    components: [continuar],
    ephemeral: true
  })
  }
}

  if (interaction.customId === `picaretaCobreCarvao_${interaction.user.id}`){

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

        

if (userdb.rpg.picaretas.cobre === 0 || userdb.rpg.picaretas.cobre < 0) { interaction.reply({content: `:x: | Você não tem uma picareta de cobre, crie uma utizando **\`/criar-picareta\`**!`,ephemeral: true })
                                    } else {

  await interaction.deferUpdate()

let valor = Math.floor(Math.random() * 2) + 30

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )
  let fome = userdb.rpg.status.fome;
  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.cobre": userdb.rpg.picaretas.cobre - valor,
    "rpg.status.fome": fome - 1

         }
        })



  interaction.editReply({
    content: `⛏️ | Você minerou ${valor} minérios de carvão utilizando uma picareta de cobre!`,
    components: [continuar],
    ephemeral: true
  })
    }      
  }

  if (interaction.customId === `picaretaPedraCarvao_${interaction.user.id}`){

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

     

if (userdb.rpg.picaretas.pedra === 0 || userdb.rpg.picaretas.pedra < 0) { interaction.reply({content: `:x: | Você não tem uma picareta de pedra, crie uma utizando **\`/criar-picareta\`**!`,ephemeral: true })
                                    } else {

  await interaction.deferUpdate()

let valor = Math.floor(Math.random() * 2) + 30

  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  let fome = userdb.rpg.status.fome;
  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.minerios.carvao": userdb.rpg.minerios.carvao + valor,
  "rpg.picaretas.pedra": userdb.rpg.picaretas.pedra - valor,
    "rpg.status.fome": fome - 1

         }
        })



  interaction.editReply({
    content: `⛏️ | Você minerou ${valor} minérios de carvão utilizando uma picareta de pedra!`,
    components: [continuar],
    ephemeral: true
  })
    }    
  }

//============= | Minerar Cobre | ===============
if (interaction.customId === `picaretaTitanioCobre_${interaction.user.id}`){

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

     if (userdb.rpg.picaretas.titanio === 0 || userdb.rpg.picaretas.titanio < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de titânio, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.titanio": userdb.rpg.picaretas.titanio - valor + 5,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de cobre utilizando uma picareta de titânio!`,
    components: [continuar],
    ephemeral: true
})

     }
   }


  if (interaction.customId === `picaretaFerroCobre_${interaction.user.id}`){

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

     if (userdb.rpg.picaretas.ferro === 0 || userdb.rpg.picaretas.ferro < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de ferro, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.ferro": userdb.rpg.picaretas.ferro - valor + 2,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de cobre utilizando uma picareta de ferro!`,
    components: [continuar],
    ephemeral: true
})

     }
  }


  if (interaction.customId === `picaretaCobreCobre_${interaction.user.id}`){

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

     if (userdb.rpg.picaretas.cobre === 0 || userdb.rpg.picaretas.cobrr < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de cobre, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.cobre": userdb.rpg.picaretas.cobre - valor + 1,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de cobre utilizando uma picareta de cobre!`,
    components: [continuar],
    ephemeral: true
})

       
     }
  }



  if (interaction.customId === `picaretaPedraCobre_${interaction.user.id}`){

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

     if (userdb.rpg.picaretas.pedra === 0 || userdb.rpg.picaretas.pedra < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de pedra, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

  
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.cobre": userdb.rpg.mineriosBloco.cobre + valor,
  "rpg.picaretas.pedra": userdb.rpg.picaretas.pedra - valor,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de cobre utilizando uma picareta de pedra!`,
    components: [continuar],
    ephemeral: true
})

      }
     }


  //============ | Minerar Ferro | ==============

  if (interaction.customId === `picaretaTitanioFerro_${interaction.user.id}`){


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

     if (userdb.rpg.picaretas.titanio === 0 || userdb.rpg.picaretas.titanio < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de titânio, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

       await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro + valor,
  "rpg.picaretas.titanio": userdb.rpg.picaretas.titanio - valor + 5,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de ferro utilizando uma picareta de titânio!`,
    components: [continuar],
    ephemeral: true
})


    }
  }



    if (interaction.customId === `picaretaFerroFerro_${interaction.user.id}`){


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

     if (userdb.rpg.picaretas.ferro === 0 || userdb.rpg.picaretas.ferro < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de ferro, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

       await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro + valor,
  "rpg.picaretas.ferro": userdb.rpg.picaretas.ferro - valor + 3,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de ferro utilizando uma picareta de ferro!`,
    components: [continuar],
    ephemeral: true
})
     }
    }




  if (interaction.customId === `picaretaCobreFerro_${interaction.user.id}`){


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

     if (userdb.rpg.picaretas.cobre === 0 || userdb.rpg.picaretas.cobre < 0) {
  interaction.reply({content: `:x: | Você não tem uma picareta de cobre, crie uma utizando **\`/criar-picareta\`**!`, ephemeral: true})
} else {
       
let valor = Math.floor(Math.random() * 2) + 20

  await interaction.deferUpdate()
       
  let continuar = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`minerar_${interaction.user.id}`)
					.setLabel('Continuar mineração')
					.setStyle(ButtonStyle.Secondary)
  )

       await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.mineriosBloco.ferro": userdb.rpg.mineriosBloco.ferro + valor,
  "rpg.picaretas.cobre": userdb.rpg.picaretas.cobre - valor + 5,
      "rpg.status.fome": userdb.rpg.status.fome - 1
         }
        })

interaction.editReply({
      content: `⛏️ | Você minerou ${valor} minérios de ferro utilizando uma picareta de cobre!`,
    components: [continuar],
    ephemeral: true
})


    }
  }



//============= | Atacar Monstros | ============
  if (interaction.customId === `mob_${interaction.user.id}`){

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

  let statust = ["matou", "f", "matou", "matou"];

  
let status = statust[Math.floor(Math.random() * statust.length)];

      await interaction.deferUpdate()
    
  if (status === "f"){

    let vidaa = Math.floor(Math.random() * 2) + 5

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.status.vida": userdb.rpg.status.vida - vidaa,
    "rpg.status.fome": userdb.rpg.status.fome - 2
         }
        })

    let botao1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder() .setCustomId(`minerar_${interaction.user.id}`) .setLabel('Continuar') .setStyle(ButtonStyle.Secondary) 
    )

interaction.editReply({
  content: `Você não consegiu matar o monstro, mas fugiu. No entanto, Você perdeu **\`${vidaa}\`** de vida!`,
  components: [botao1],
  ephemeral: true
})


  } else {
    
let vida = Math.floor(Math.random() * 2) + 5

  await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
         "rpg.status.vida": userdb.rpg.status.vida - vida,
        "rpg.status.fome": userdb.rpg.status.fome - 2
         }
        })

    let botao2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder() .setCustomId(`minerar_${interaction.user.id}`) .setLabel('Continuar') .setStyle(ButtonStyle.Secondary) 
    )

interaction.editReply({
  content: `Você  consegiu matar o monstro! No entanto, Você perdeu **\`${vida}\`** de vida!`,
  components: [botao2],
  ephemeral: true
})


  }
  
                 }
})


//============= | Explorar Mundo | ============
client.on("interactionCreate", async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	if (interaction.customId === `explorar_${interaction.user.id}`) {

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
await interaction.deferUpdate()

    let opcao = interaction.values[0];

    if (opcao === "1"){
      let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`explorar_${interaction.user.id}`)
					.setLabel('Sua exploração terminará em 1 minuto')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true)
			);

let f = new AttachmentBuilder("https://cdn.discordapp.com/attachments/1028756005556846632/1036807732998717471/aventura.png", {name: 'terminou.png'});

let comidas = Math.floor(Math.random() * 5) + 15

    interaction.editReply({
      content: `<a:Doguinhu:795105130311712829> | ${interaction.user}`,
      components: [botao]
    }).then(async(msg) => {
      setTimeout(async() => {


await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
    "rpg.status.fome": userdb.rpg.status.fome - 1,
    "rpg.item.comida": userdb.rpg.item.comida + comidas
         }
        })
        
        msg.reply({
           content: `${interaction.user} você explorou seu mundo pra achar comida e você achou ${comidas} comida!`,
           files: [f]
        })
      }, tempo("1m"));
    });
    } 

    if (opcao === "2"){
      let ilhas = ["Não", "Não", "Não", "Não", "Não", "Sim", "Não", "Não"];

    let ilha = ilhas[Math.floor(Math.random() * ilhas.length)];

let bioma = ["Em criação..."];

const comida = Math.floor(Math.random() * 5) + 15

let a = Math.floor(Math.random() * 50) + 500

let botao = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
					.setCustomId(`explorar_${interaction.user.id}`)
					.setLabel('Sua exploração terminará em 5 minutos')
					.setStyle(ButtonStyle.Primary)
          .setDisabled(true)
			);

let f = new AttachmentBuilder("https://cdn.discordapp.com/attachments/1028756005556846632/1036807732998717471/aventura.png", {name: 'terminou.png'});

let comidas = Math.floor(Math.random() * 5) + 15

    interaction.editReply({
      content: `<a:Doguinhu:795105130311712829> | ${interaction.user}`,
      components: [botao]
    }).then(async(msg) => {
      setTimeout(async() => {
        if (ilha === "Sim"){
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
    "rpg.status.fome": userdb.rpg.status.fome - 2,
    "rpg.item.comida": userdb.rpg.item.comida + comida,
        "explorar.ilhaflutuanteA": a
         }
        })

      msg.reply({content: `<a:Doguinhu:795105130311712829> | ${interaction.user}\n> Achou ilha flutuante? **\`${ilha}\`**\n> Achou novo bioma? **\`${bioma}\`**> Comida: **\`${comidas}\`**`, files: [f]})
         }
        if (ilha === "Não"){
await client.userdb.updateOne({
         userID: interaction.user.id
     }, { $set: {
    "rpg.status.fome": userdb.rpg.status.fome - 2,
    "rpg.item.comida": userdb.rpg.item.comida + comidas
         }
        })

  msg.reply({content: `<a:Doguinhu:795105130311712829> | ${interaction.user}\n> Achou ilha flutuante? **\`${ilha}\`**\n> Achou novo bioma? **\`${bioma}\`**> Comida: **\`${comida}\`**`, files: [f]})
         }
      }, tempo("5m"))
    })
      
    }
	}
});
