const { Client, AddRoles, GatewayIntentBits, Partials } = require("../BlackCat");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
client.login(process.env.token).then(() => {
     client.on("ready", () => {
         console.log(`${client.user.username}`.red + ` Sẵn sàng hoạt động`.blue);
     });
     client.on("messageCreate", async(message) => {
       const { messageAPI } = require("./Handlers/commands");
       messageAPI(client, message, { prefix: "!" });
     });
     ["setups"].forEach(Blackcat => {
         require(`./Handlers/${Blackcat}`)(client);
     });
});