# <p align="center">BlackCat-Language</p>
<div align="center">
  <p>
	<a href="https://www.facebook.com/BlackCat.2k3"><img src="https://thumbs.gfycat.com/WindyEssentialHyracotherium-max-1mb.gif" width = "200" alt="TNT"></a>
  </p>
</div>

# <p align="center">Bắt đầu nào</p>
+ `tạo 1 files có tên tùy ý rồi defined ra index hoặc tương tự hoặc bạn có thể đặt cmn vào index hay gì cũng được miễn là nó chạy được`
```js
module.exports = ( client ) => {
  const { files_name: { resolve, parse }, Language: { Language }} = require("blackcat-club");
  LANGUAGE = {
   defaultLocale: "vi",  // ngôn ngữ mặc định 
   directory: resolve("Folder 1/Folder 2"), // folder/folder => trong folder 1 có folder2 trong folder 2 có files.yaml
  };
  client.i18n = new Language(LANGUAGE);
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
        default: "vi", // ngôn ngữ mặc định
        required: true,
    }
});
module.exports = mongoose.model('Language', CreateLang);
```
+ `Tạo 1 folder có tên Language trong Language có folder en = tiếng anh, vi = việt nam`
+ `Folder: vi: { trong vi thì có:`
    `files: utility.yaml` 
```yaml 
ping: "ping của bot đang là %{pingbot} ms"
```
`}`
+ `và en cũng tương tự vi`
+ `en`
```yaml
ping: "my ping: %{pingbot}"
```
+ `trong Commands ping.js`
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
    aliases: ["setlang", "changelang"], // lệnh phụ
    description: "", // mô tả lệnh
    category:"Settings", // tên folder chứa lệnh
    cooldown: 5, // thời gian có thể tái sử dụng lệnh
    run: async(client, message, args, language) => {
        /***
        *   client = Discord.Client
        *   message = MessageCreate.message
        *   language = MessageCreate.setlanguage = language
        ***/
        const GLang = require('../../Folder/Files.js'); // lưu trữ data của mongoose 
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
                console.log("Lỗi: " + err)
                message.reply(`${client.i18n.get(language, "settings", "Lang_error")}`);
            });
        };
    },
};
```
+ `khuyến mại thêm cho setlanguage`
+ `files: settings`
```yaml
#language 
lang_perm: "Bạn cần quyền `MANAGE_GUILD` để sử dụng lệnh này."
lang_arg: "Vui lòng chỉ định một ngôn ngữ! <vi, en>"
provide_lang: "Vui lòng cung cấp các ngôn ngữ: `%{languages}`"
lang_set: "`🔧` | *Ngôn ngữ đã được đặt thành:* `%{language}`"
lang_change: "`🔧` | *Ngôn ngữ đã được thay đổi thành:* `%{language}`"
lang_error: "Đã xảy ra sự cố, vui lòng thử lại sau."
```
+ `còn về files en thì cũng tương tự`