# <p align="center">BlackCat-Club</p>
<div align="center">
  <p>
	<a href="https://www.facebook.com/BlackCat.2k3"><img src="https://statics.voz.tech/data/avatars/o/1093/1093136.jpg?1584167722" width = "200" alt="TNT"></a>
  <a href="https://www.npmjs.com/package/blackcat-club" target="_blank"><img src="https://nodei.co/npm/blackcat-club.png?downloads=true&downloadRank=true&stars=true"></a>
  </p>
</div>

+ `đây là discord v14 sửa đổi thêm các events commands hỗ trợ giúp rút ngắn thời gian code và vẫn còn được update thêm...`
+ `Sử dụng gói hỗ trợ bot discord v14 cực kỳ đơn giản với BlackCat-club`
+ `xem lại những thay đổi` [tại đây](https://github.com/VinhBot/BlackCat-Club/blob/main/Example/UpdateNotice/README.md) 🔎
+ `List hỗ trợ: Ranking, Economy, Game, Buttons, Menu, Databases ...`

# <p align="center">Các phụ thuộc:</p>
- [`Discord = discord.js`](https://github.com/discordjs/discord.js)
```js
const { Client, EmbedBuilder, /* Vân vân ...*/ } = require("blackcat-club"); // discord.js
```
- [`DjsVoice = @discordjs/voice`](https://github.com/discordjs/discord.js)
```js
const { DjsVoice: { AudioPlayerStatus, joinVoiceChannel, createAudioResource, /* vân vân...*/}} = require("blackcat-club"); // @discordjs/voice
```
```js
// Tìm kiếm các bản cập nhật gói npm mới khi khởi động bot! Phiên bản mới nhất sẽ được hiển thị trong bảng điều khiển
NewUpdate(true);
```
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/Preview/update.jpg)
# <p align="center">Hướng Dẫn</p>
```
các lệnh commands
```
+  [Language cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/Vi/Language/README.md) 📚
+  [Economy Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/Vi/Economy/README.md) 💴
+  [Ranking Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/Vi/Ranking/README.md) 🏆
+  [Simply Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/Vi/Commands/README.md) 🔮
+  [Game Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/Vi/Game/README.md) 🎮
# <p align="center">Package Run</p>
```js
const { BlackCat, activity, setMongoURL, Collection, /*....*/ } = require("blackcat-club");
const client = new BlackCat("token bot của bạn", {
  Reply: true // có // fasle không // tag tin nhắn thành viên gởi 
});
setMongoURL(mongourl); // nếu bạn sử dụng ranking hoặc economy
// xem bot đã hoạt động hay là chưa 
client.on("ready", () => {
    console.log(client.user.username + " is ready 😊".blue);
    activity(client, {
      statuses: [
        `status 1`, 
        `status 2`,
        `Giới hạn 5 status`
      ], Type: "Playing"
    });
});

// prefix: tiền tố để gọi bot
const config = {
   "prefix": "prefix của bạn"
};
// messageCreate
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift();

  if (command === 'ping') {
		message.reply("ping của tôi là: " + client.ws.ping);
	};
  if (command === 'name') {
     // code
  };
  
});
```
# màu console
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/Preview/demoColors.jpg)
```js
console.log(`black`.black)
console.log(`red`.red)
console.log(`green`.green)
console.log(`yellow`.yellow)
console.log(`blue`.blue)
console.log(`magenta`.magenta)
console.log(`cyan`.cyan)
console.log(`white`.white)
console.log(`gray`.gray)
console.log(`grey`.grey)
```
# <p align="center">Hãy thiết kế bots theo ý thích của bạn</p>