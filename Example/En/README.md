# <p align="center">BlackCat-Club</p>
<div align="center">
  <p>
	<a href="https://www.facebook.com/BlackCat.2k3"><img src="https://statics.voz.tech/data/avatars/o/1093/1093136.jpg?1584167722" width = "200" alt="TNT"></a>
  <a href="https://www.npmjs.com/package/blackcat-club" target="_blank"><img src="https://nodei.co/npm/blackcat-club.png?downloads=true&downloadRank=true&stars=true"></a>
  </p>
</div>

+ `this is open source code used and modified from discord.js@14 support apiv10 this is the best support at the moment` 🥰
+ `Using the discord v14 bot support is extremely simple with BlackCat-club`
+ `review the changes` [Click here](https://github.com/VinhBot/BlaCkcat-Package/blob/main/Example/UpdateNotice/README.md) 🔎
+ `Support List: Ranking, Economy, Game, Buttons, Menu, Databases ...`

# <p align="center">Dependencies:</p>
- [`Discord = discord.js`](https://github.com/discordjs/discord.js)
```js
const { Client, EmbedBuilder, /* etc ...*/} = require("blackcat-club"); // discord.js
```
- [`DjsVoice = @discordjs/voice`](https://github.com/discordjs/discord.js)
```js
const { DjsVoice: { AudioPlayerStatus, joinVoiceChannel, createAudioResource, /* vân vân...*/}} = require("blackcat-club"); // @discordjs/voice
```
```js
// Look for new npm package updates on bot startup! The latest version will be displayed in the dashboard
NewUpdate(true);
```
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/Preview/update.jpg)
# <p align="center">Guide</p>
```
Commands
```
+  [Language cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/En/Language/README.md) 📚
+  [Economy Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/En/Economy/README.md) 💴
+  [Ranking Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/En/Ranking/README.md) 🏆
+  [Simply Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/En/Commands/README.md) 🔮
+  [Game Cmds](https://github.com/VinhBot/BlackCat-Package/blob/main/Example/En/Game/README.md) 🎮
# <p align="center">Package Run</p>
```js
const { BlackCat, activity, Collection, /*....*/ } = require("blackcat-club");
const client = new BlackCat("your bot token", {
  Reply: false // Reply to the message you sent in the form 
});
setMongoURL(mongourl); // if you use ranking or economy
// see if the bot is working or not 
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

const config = {
   "prefix": "your prefix",
};
// messageCreate
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift();

  if (command === 'ping') {
		message.reply("my ping is: " + client.ws.ping);
	};
  if (command === 'name') {
     // code
  };
  
});
```
# console color
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

# <p align="center">Design bots to your liking</p>