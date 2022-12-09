const client = require("../bot.js");
const c = require("colors")

client.on("ready", async () => {
  console.log(c.blue(`${client.user.username} está online!`));
  setTimeout(() => {
  client.user.setActivity({
    name: `@${client.user.username} /ajuda | Cluster 1 / ${client.ws.ping}ms `,
    type: 0,
  });
  }, 5000)
});
