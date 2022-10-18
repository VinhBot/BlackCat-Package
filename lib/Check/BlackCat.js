const { Client, setDefaultSetting, GatewayIntentBits, Partials } = require("../BlackCat");
const client = new Client({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: { parse: ["roles", "users", "everyone"], repliedUser: false },
      partials: Object.keys(Partials),
      intents: Object.keys(GatewayIntentBits)
}); 
/// 
client.login(process.env.token).then(() => {
  setDefaultSetting({
      setMongoURL: process.env.mongourl, // thiết lập kết nối mongodb
      setLanguage: "vi", // cài đặt ngôn ngữ của package
      setNewUpdate: true, // nhận trong báo khi có bản cập nhật mới
  });
  // Ready 
  client.on("ready", () => {
    console.log(`${client.user.username}`.red + ` Sẵn sàng hoạt động`.blue)
  });
  // MessageCreate
  client.on("messageCreate", async(message) => {
    if (message.author.bot || !message.inGuild()) return;
	  if (!message.content.startsWith("!")) return;
	  const args = message.content.slice("!".length).trim().split(/ +/g);
	  const command = args.shift();
    if (command === "zz") {
      
    }
  });
});