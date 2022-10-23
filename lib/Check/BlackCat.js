const { BlackCat, Commands, EmbedBuilder, GatewayIntentBits, Partials, Game } = require("../BlackCat");
const client = new BlackCat({
  setToken: process.env.token || "token bot", // thiết lập token của bot
  setMongoURL: process.env.mongourl || "mongourl", // thiết lập kết nối mongodb
  setLanguage: "vi", // cài đặt ngôn ngữ của package
  setNewUpdate: true, // nhận trong báo khi có bản cập nhật mới
});


client.on("ready", () => {
  console.log(`${client.user.username}`.red + ` Sẵn sàng hoạt động`.blue);
  setInterval(async function() { // lặp lại theo trình tự được cung cấp
     var _animal = new animalPictures().cat(); // defined animal  
     var channels = await client.channels.fetch("1022820390508175411");
     channels.send({ content: `${await _animal}` }).then(() => console.log("đã gởi ảnh vào channel lúc" + Date.now() )).catch((ex) => {});
   }, 50000);
});

client.on("messageCreate", async(message) => {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith("!")) return;
	const args = message.content.slice("!".length).trim().split(/ +/g);
	const command = args.shift();
  if(command === "b") {
    // :)))
  };
});