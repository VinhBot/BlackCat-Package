<p align="center">
	<a href="https://www.facebook.com/BlackCat.2k3">
	<img src="https://statics.voz.tech/data/avatars/o/1093/1093136.jpg?1584167722" width = "200" alt="TNT">
	</a>
</p>

# <p align="center">Simply Commands</p>
# Nút Buttons
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/lib/Resources/Preview/pages.jpg)
```js
const { Commands: { EmbedPages }, EmbedBuilder } = require("blackcat-club");
let Embed1 = new EmbedBuilder().setDescription("Page1").setColor("Random")
let Embed2 = new EmbedBuilder().setDescription("Page 2").setColor("Random")
let Embed3 = new EmbedBuilder().setDescription("Page 2").setColor("Random")
let embeds = [];
embeds.push(Embed1, Embed2, Embed3);
EmbedPages(message, embeds, {
    // but1: tương ứng với các emoji tùy chỉnh, để trống để dùng emoji mặc định
    but1: "", // Đầu tiên
    but2: "", // Trước
    but3: "", // Xoá bỏ
    but4: "", // Tiếp theo
    but5: "", // cuối cùng
    butColor: "", // màu của các nút chuyển động
    butColor: "" // màu của nút xoá
});
```
# animalPictures.
+ note: Các loại hình ảnh động, thực vật, ....
```js
const { Commands: { compositeImage }} = require("blackcat-club");
new compositeImage.<etc()>;
console.log(await etc());
```
+ `Danh sách ảnh hỗ trợ:`
+ `Animal: cat, dog, koala, lizard, bird, fox, bunny, panda, raccoon, kangaroo, duck, turtle, redpanda.`
+ `anime gif: baka`