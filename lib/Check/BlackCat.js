const { BlackCat, Commands: { compositeImage, dataImage, Economy }} = require("../BlackCat");
const client = new BlackCat({
  setToken: process.env.token || "token bot", // thiết lập token của bot
  setMongoURL: process.env.mongourl || "mongourl", // thiết lập kết nối mongodb
  setLanguage: "vi", // cài đặt ngôn ngữ của package
  setNewUpdate: true, // nhận trong báo khi có bản cập nhật mới
});
// economy
const { setDefaultSettings } = new Economy;
setDefaultSettings({
  setMaxBankAmount: 0,
  setMaxWalletAmount: 1000,
  setDefaultBankAmount: 1000,
  setDefaultWalletAmount: 1000,
});

client.on("messageCreate", async(message) => {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith("!")) return;
	const args = message.content.slice("!".length).trim().split(/ +/g);
	const command = args.shift();
  if(command === "e") {
    message.reply({ content: "zzz" });
  };
});