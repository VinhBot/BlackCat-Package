# <p align="center">BlackCat-Language</p>
<div align="center">
  <p>
	<a href="https://www.facebook.com/BlackCat.2k3"><img src="https://thumbs.gfycat.com/WindyEssentialHyracotherium-max-1mb.gif" width = "200" alt="TNT"></a>
  </p>
</div>

# <p align="center">Start</p>
+ `create a file with an arbitrary name and then define the index or similar or you can put it in the index or whatever as long as it works`
```js
module.exports = ( client ) => {
  const { files_name: { resolve, parse }, Language: { I18n }} = require("blackcat-club");
  LANGUAGE = {
   defaultLocale: "vi",  // default language 
   directory: resolve("Folder 1/Folder 2"), // folder/folder => in folder 1 there is folder2 in folder 2 there are files.yaml
  };
  client.i18n = new I18n(LANGUAGE);
};
```
+ `MessageCreate`
```js
const GLang = require('../../Folder/files.js');
let LANGUAGE = client.i18n; 
let guildModel = await GLang.findOne({ guild: message.guild.id });
if(guildModel && guildModel.language) LANGUAGE = guildModel.language;
client.language = LANGUAGE;
// command.run(client, message, args, language = client.language);
```
+ `Schema/Language.js`
```js
const { mongoose } = require('blackcat-club');
const CreateLang = mongoose.Schema({
    guild: {
		type: String,
		required: true,
		unique: true,
	},
    language: {
        type: String,
        default: "vi", // default language
        required: true,
    }
});
module.exports = mongoose.model('Language', CreateLang);
```
+ `Create a folder named Language in Language with folder en = english, vi = vietnam`
+ `Folder: vi: { in vi there is:`
    `files: utility.yaml` 
```yaml 
ping: "ping của bot đang là %{pingbot} ms"
```
`}`
+ `and en is the same as vi`
+ `en`
```yaml
ping: "my ping: %{pingbot}"
```
+ `in Commands ping.js`
```js
message.reply({ content: `${client.i18n.get(language, "utility", "ping",{
  pingbot: client.ws.ping
})}`})
```
+ `setLanguage.js`
```js
const { files_name, Discord: { ButtonBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder }} = require("blackcat-club");
module.exports = {
    name: files_name.parse(__filename).name,
    usage: `${files_name.parse(__filename).name}`,
    aliases: ["setlang", "changelang"], // aliases
    description: "", // command description
    category:"Settings", // folder name containing the command
    cooldown: 5, // time can reuse command
    run: async(client, message, args, language) => {
        /***
        *   client = Discord.Client
        *   message = MessageCreate.message
        *   language = MessageCreate.setlanguage = language
        ***/
        const GLang = require('../../Folder/Files.js'); // store data of mongoose 
        if(!args[0]) return message.reply(`${client.i18n.get(language, "settings", "lang_arg")}`);
        const languages = client.i18n.getLocales();
        if (!languages.includes(args[0])) return message.reply(`${client.i18n.get(language, "settings", "provide_lang", {
            languages: languages.join(', ')
        })}`);

        const newLang = await GLang.findOne({ guild: message.guild.id });
        if(!newLang) {
            const newLang = new GLang({
                guild: message.guild.id,
                language: args[0]
            });
            newLang.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "settings", "lang_set", {
                    language: args[0]
                })}`)
                .setColor("#FFF700")

                message.reply({ embeds: [embed] });
            }
            ).catch(() => {
                message.reply(`${client.i18n.get(language, "settings", "Lang_error")}`);
            });
        } else if(newLang) {
            newLang.language = args[0];
            newLang.save().then(() => {
                const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "settings", "lang_change", {
                    language: args[0]
                })}`)
                .setColor("#FFF700")
    
                message.reply({ embeds: [embed] });
            }
            ).catch((err) => {
                console.log("Error: " + err)
                message.reply(`${client.i18n.get(language, "settings", "Lang_error")}`);
            });
        };
    },
};
```
+ `extra promotion for setlanguage`
+ `files: settings`
```yaml
#language 
lang_perm: "You need `MANAGE_GUILD` permission to use this command."
lang_arg: "Please specify a language! <en, en>"
provide_lang: "Please provide languages: `%{languages}`"
lang_set: "`🔧` | *Language has been set to:* `%{language}`"
lang_change: "`🔧` | *Language has been changed to:* `%{language}`"
lang_error: "Something went wrong, please try again later."
```
+ `And about vi, ko, .... files, it's the same`