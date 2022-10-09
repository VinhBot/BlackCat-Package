<p align="center">
	<a href="https://www.facebook.com/BlackCat.2k3">
	<img src="https://statics.voz.tech/data/avatars/o/1093/1093136.jpg?1584167722" width = "200" alt="TNT">
	</a>
</p>

# <p align="center">Simply Commands</p>
# Buttons
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/Preview/pages.jpg)
```js
const { Commands: { EmbedPages }, EmbedBuilder } = require("blackcat-club");
let Embed1 = new EmbedBuilder().setDescription("Page1").setColor("Random")
let Embed2 = new EmbedBuilder().setDescription("Page 2").setColor("Random")
let Embed3 = new EmbedBuilder().setDescription("Page 2").setColor("Random")
let embeds = [];
embeds.push(Embed1, Embed2, Embed3);
EmbedPages(message, embeds, {
    // but1: corresponds to custom emojis, leave blank to use default emoji
    but1: "", // First
    but2: "", // Before
    but3: "", // Xoá bỏ
    but4: "", // Next
    but5: "", // final
    butColor: "", // color of move node
    butColor: "" // color of delete button
});
```
# ......