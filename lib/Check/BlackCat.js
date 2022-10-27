const { BlackCat, Commands: { compositeImage, dataImage, Economy }, EmbedBuilder } = require("../BlackCat");
const client = new BlackCat({
  setToken: process.env.token || "token bot", // thiết lập token của bot
  setMongoURL: process.env.mongourl || "mongourl", // thiết lập kết nối mongodb
  setLanguage: "vi", // cài đặt ngôn ngữ của package
  setNewUpdate: true, // nhận trong báo khi có bản cập nhật mới
});
// economy
const { setDefaultSettings, balance, vietnam } = new Economy;
setDefaultSettings({
  setMaxBankAmount: 0,
  setMaxWalletAmount: 1000,
  setDefaultBankAmount: 1000,
  setDefaultWalletAmount: 1000,
});
/////////////
client.on("ready", () => {
  console.log(`${client.user.username}`.red + ` Sẵn sàng hoạt động`.blue);
  setInterval(async function() { // lặp lại theo trình tự được cung cấp  
     var channels = await client.channels.fetch("1022820390508175411");
     channels.send({ content: `${await compositeImage({ setImageFormat: dataImage.cat })}` }).then(() => console.log("đã gởi ảnh vào channel lúc" + Date.now() )).catch((ex) => {});
   }, 50000);
});
////////////
client.on("messageCreate", async(message) => {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith("!")) return;
	const args = message.content.slice("!".length).trim().split(/ +/g);
	const command = args.shift();
  if(command === "c") {
      let user = message.author;
      if (message.mentions.users.first()) {
          user = message.mentions.users.first();
      } else if (args[0]) {
          user = await message.guild.members.fetch(args[0]);
          if(user) user = user.user;
      };
      let result = await balance({ user: user, guild: { id : null }});
      return message.reply(`${user.tag}, có ${await vietnam(result.wallet)} trong ví và ${await vietnam(result.bank)} trong ngân hàng ${(result.rawData.bankSpace.toLocaleString())}`);
  };
});