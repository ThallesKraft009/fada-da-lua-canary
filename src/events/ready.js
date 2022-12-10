const client = require("../bot.js");
const c = require("colors");
const { EmbedBuilder, version } = require("discord.js");

client.on("ready", async () => {
  console.log(c.blue(`${client.user.username} está online!`));

setTimeout(async() => {
  
const activities = [
	{ name: `Nodejs: ${process.version}, Discordjs: ${version}`, type: 0 }, 
	{ name: `Mini World - [Cluster 1 | ${client.cluster.GatewayPing}]`, type: 0 },
	{ name: `De olho em ${client.users.cache.size} Usuários 👀`, type: 0 },
  { name: `Rpg 2.3.0 [Aventure Update]`, type: 0},

  { name: `Desvendando funcionalidades desvendadas`, type: 0},
  { name: `Verificando se o canal de memes é brabo`, type: 0},
  { name: `Fugindo do Ygor pra não ser sus`, type: 0},
  { name: `Verificando se a Kaede não caiu`, type: 0},
  { name: `Verificando se o Rpg é brabo`, type: 0},
{ name: `Reinventando a Roda`, type: 0},
{ name: `Verificando se ninguém quebrou as regras`, type: 0},
  { name: `To com sono`, type: 0},
    { name: `Tentando não dormir`, type: 0},
  { name: `Cluster 1 | ${client.cluster.GatewayPing}`, type: 0},
];

const status = [
	'online',
	'dnd',
	'idle'
];

let i = 0;
setInterval(() => {
	if(i >= activities.length) i = 0
	client.user.setActivity(activities[i])
	i++;
}, 15 * 1000); 

let s = 0;


setInterval(() => {
	if(s >= activities.length) s = 0
	client.user.setStatus(status[s])
	s++;
}, 30 * 1000);


  
 /* setTimeout(() => {
  client.user.setActivity({
    name: `@${client.user.username} /ajuda | Cluster 1 / ${client.ws.ping}ms `,
    type: 0,
  });*/
  }, 5000)


  let dev = client.users.cache.get(client.config.equipe.dev);

  dev.send({
    content: `🌧️ | Iniciando....`,
  }).then(async(msg) => {
       setTimeout(async() => {
         msg.edit({
           embeds: [
             new EmbedBuilder()
             .setDescription(`🌧️ | Logado em: **\`${client.user.tag}\`**\nPing de Login: **\`${client.ws.ping}ms\`**\nGerenciando ${client.users.cache.size} usuários.`)
           ]
         })
       }, 5000)
  })

  
});
  
