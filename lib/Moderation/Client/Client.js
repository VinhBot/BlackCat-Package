"use strict";
var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
// run ....
var src_exports = {};
__export(src_exports, {
  Economy: () => Economy,
  BlackCat: () => BlackCat,
  EmbedPages: () => EmbedPages,
  compositeImage: () => compositeImage,
});
module.exports = __toCommonJS(src_exports);
// BlackCat.js 
const blackcat_club_1 = require("../../Publish01/Events");
const localize = require("../../LanguageP/localize").default.loadFromLocale;
const { setMongoURL, NewUpdate } = require("../Functions/functions");
const BlackCat = class extends blackcat_club_1.Client {
  constructor(options) {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false 
      },
      partials: Object.keys(blackcat_club_1.Partials),
      intents: Object.keys(blackcat_club_1.GatewayIntentBits)
    });
    this.login(options.setToken);
    localize(options.setLanguage);
    NewUpdate(options.setNewUpdate);
    setMongoURL(options.setMongoURL);
  };
};
__name(BlackCat, "BlackCat");
// compositeImage.js
const data = require("./data")._data;
const fetch = require('node-fetch');
const compositeImage = class {
    constructor() {};
    // anime
    async baka() {
      let _baka = data.baka[Math.floor(Math.random()*data.baka.length)];
      return _baka;
    };
    async wink() {
      const wink = await fetch(`https://some-random-api.ml/animu/wink`);
      const data = await wink.json();
      return data.link;
    };
    async pat() {
      const pat = await fetch(`https://some-random-api.ml/animu/pat`);
      const data = await pat.json();
      return data.link;
    };
    async hug() {
      const hug = await fetch(`https://some-random-api.ml/animu/hug`);
      const data = await hug.json();
      return data.link;
    };
    async facepalm() {
      const facepalm = await fetch(`https://some-random-api.ml/animu/face-palm`);
      const data = await facepalm.json();
      return data.link;
    };
    // animal
    async dog() {
      const dog = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await dog.json();
      return data.message;
    };
    async cat() {
      const cat = await fetch(`https://aws.random.cat/meow`);
      const data = await cat.json();
      return data.file;
    };
    async bird() {
      const api = await fetch('https://some-random-api.ml/img/bird');
      const data = await api.json();
      return data.link;
    };
    async koala() {
      const api = await fetch('https://some-random-api.ml/img/koala');
      const data = await api.json();
      return data.link;
    };
    async duck() {
      const api = await fetch('https://random-d.uk/api/v1/random?type=png');
      const data = await api.json();
      return data.url;
    };
    async kangaroo() {
      const api = await fetch('https://some-random-api.ml/animal/kangaroo');
      const data = await api.json();
      return data.image;
    };
    async panda() {
      const api = await fetch('https://some-random-api.ml/animal/panda');
      const data = await api.json();
      return data.image;
    };
    async lizard() {
      let _lizard = data.lizard[Math.floor(Math.random()*data.lizard.length)];
      return _lizard;
    };
    async raccoon() {
      let _raccoon = data.raccoon[Math.floor(Math.random() * data.raccoon.length)];
      return _raccoon;
    };
    async redpanda() {
      let _redpanda = data.redpanda[Math.floor(Math.random() * data.redpanda.length)];
      return _redpanda;
    };
    async turtle() {
      let _turtle = data.turtle[Math.floor(Math.random() * data.turtle.length)];
      return _turtle;
    };
    async bunny() {
      return `https://bunnies.media/poster/${Math.floor(Math.random() * 162)}.png`;
    };
    async fox() {
      return `https://randomfox.ca/images/${Math.floor(Math.random() * 122)}.jpg`;
    };
    // end
};
__name(compositeImage, "compositeImage");
// Economy.js
/*----------------------------------------------------------------
# @author Silent-Coder    -                 🧠😸                 -
# Editer Nguyễn Vinh      - --------------------------------------
# @license Apache-2.0     - Thank you very much to the publisher -
# @copyright Silent-Coder - --------------------------------------
# @file Economy.js        -
-------------------------*/ 
const { findUser, getInventory, connect, event, saveUser } = require("../FunctionEconomy/global");
const { Currency, Inventory } = require("../Schema/OptionsSchema");
const Economy = class {
  //=====================| 🇻🇳 Việt Nam 🇻🇳 |================================>
  vietnam(Con_so) {
     var Dinh_dang = new Intl.NumberFormat('vi-VN', {
	       style: 'currency',
	       currency: 'VND',
      });
      return Dinh_dang.format(Con_so);
  };
  //=====================| USA |===========================================>
  us(Con_so) {
      var Dinh_dang = new Intl.NumberFormat('US', {
	      style: 'currency',
	      currency: 'USD',
      });
      return Dinh_dang.format(Con_so);
  };
  //=====================| 🇯🇵 Japanese 🇯🇵 |================================>
  japanese(Con_so) {
      var Dinh_dang = new Intl.NumberFormat('JP', {
	      style: 'currency',
	      currency: 'JPY',
     });
     return Dinh_dang.format(Con_so);
  };
  //=====================| 🇰🇷 Korean 🇰🇷 |==================================>
  korean(Con_so) {
     var Dinh_dang = new Intl.NumberFormat('ko-KR', {
	      style: 'currency',
	      currency: 'KRW',
     });
     return Dinh_dang.format(Con_so);
  };
  //=====================| 🇷🇺 Russian 🇷🇺 |=================================>
  russian(Con_so) {
     var Dinh_dang = new Intl.NumberFormat('ru-RU', {
	      style: 'currency',
	      currency: 'RUB',
     });
     return Dinh_dang.format(Con_so);
  };
  //======================| 🇩🇪 German 🇩🇪 |=================================>
  german(Con_so) {
     var Dinh_dang = new Intl.NumberFormat('de-DE', {
	     style: 'currency',
	     currency: 'EUR',
     });
     return Dinh_dang.format(Con_so);
  }; 
  //======================| 🇬🇧 England 🇬🇧 |================================>
  england(Con_so) {
    var Dinh_dang = new Intl.NumberFormat('en-GB', {
 	     style: 'currency',
	     currency: 'GBP',
     });
    return Dinh_dang.format(Con_so);
  };
  //==============| Các Events hỗ trợ khác |===============================>
  async buy(settings) {
    return await _buy(settings);
  }
  async addUserItem(settings) {
    return await _buy(settings);
  }
  async addItem(settings) {
    if(!settings.inventory) return { error: true, type: "No-Inventory" };
    if(!settings.inventory.name) return { error: true, type: "No-Inventory-Name" };
    if(!settings.inventory.price) return { error: true, type: "No-Inventory-Price" };
    if(!parseInt(settings.inventory.price)) return { error: true, type: "Invalid-Inventory-Price" };
    const item = { name: String(settings.inventory.name) || "Air", price: parseInt(settings.inventory.price) || 0, description: String(settings.inventory.description) || "Không có mô tả" };
    if(typeof settings.guild === "string") settings.guild = { id: settings.guild };
    if(!settings.guild) settings.guild = { id: null };
    Inventory.findOneAndUpdate({
        guildID: settings.guild.id || null,
    },{
        $push: { inventory: item },
    },{
        upsert: true, useFindAndModify: false,
    },(e, d) => {
        if (e) return console.log(e);
    });
    return { error: false, item: item };
  };
  async removeItem(settings) {
    let inventoryData = await getInventory(settings);
    let thing = parseInt(settings.item);
    if(!thing) return { error: true, type: "Invalid-Item-Number" };
    thing = thing - 1;
    if(!inventoryData.inventory[thing]) return { error: true, type: "Unknown-Item" };
    const deletedDB = inventoryData.inventory[thing];
    inventoryData.inventory.splice(thing, 1);
    inventoryData.save();
    return { error: false, inventory: deletedDB };
  }
  async setItems(settings) {
    // let inventoryData = await getInventory(settings);
    if(!settings.shop) return { error: true, type: "No-Shop" };
    if(!Array.isArray(settings.shop)) return { error: true, type: "Invalid-Shop" };
    for (const x of settings.shop) {
      if(!x.name) return { error: true, type: "Invalid-Shop-name" };
      if(!x.price) return { error: true, type: "Invalid-Shop-price" };
      if(!x.description) x.description = "No Description.";
    };
    Inventory.findOneAndUpdate({
        guildID: settings.guild.id || null,
    },{
        $set: { inventory: settings.shop },
    },{
        upsert: true, useFindAndModify: false,
    },(e, d) => {
        if(e) return console.log(e);
    });
    return { error: false, type: "success" };
  }
  async removeUserItem(settings) {
    let data = await findUser(settings, null, null, "removeUserItem");
    let thing = parseInt(settings.item);
    if(!thing) return { error: true, type: "Invalid-Item-Number" };
    thing = thing - 1;
    if(!data.inventory[thing]) return { error: true, type: "Unknown-Item" };
    let done = false;
    // Lưu thay đổi
    let data_user = {};
    let data_error = { error: true, type: "Invalid-Item-Number" };
    // Nếu người dùng muốn xóa tất cả các mục
    if (settings.amount == "all") {
      // Tìm chỉ mục của mặt hàng
      let i = data.inventory.findIndex((i) => i === data.inventory.filter((inv) => inv.name === thing)) + 1;
      let data_to_save = { count: 0, name: data.inventory[i].name, deleted: data.inventory[i].amount };
      data_user = data_to_save;
      data.inventory.splice(i, 1);
      done = true;
    } else {
      for (let i in data.inventory) {
        if (data.inventory[i] === data.inventory[thing]) {
          // Nếu trong kho số lượng mặt hàng lớn hơn 1 và không có số lượng được chỉ định
          if(data.inventory[i].amount > 1 && !settings?.amount) {
            data.inventory[i].amount--;
            let data_to_save = { count: data.inventory[i].amount, name: data.inventory[i].name, deleted: 1 };
            data_user = data_to_save;
            done = true;
            // Nếu trong kho số lượng mặt hàng bằng 1 và không có số lượng được chỉ định
          } else if(data.inventory[i].amount === 1 && !settings?.amount) {
            let data_to_save = { count: 0, name: data.inventory[i].name, deleted: 1 };
            data_user = data_to_save;
            data.inventory.splice(i, 1);
            done = true;
            // Nếu số được chỉ định
          } else if(settings?.amount !== "all") {
            // Nếu số được chỉ định lớn hơn để đánh số mục trong kho
            if(settings.amount > data.inventory[i].amount) {
              done = false;
              data_error.type = "Invalid-Amount";
            } else if (String(settings.amount).includes("-")) {
              done = false;
              data_error.type = "Negative-Amount";
            } else if (parseInt(settings.amount) === 0) {
              done = false;
              data_error.type = "Invalid-Amount";
            } else {
              data.inventory[i].amount -= settings.amount;
              let data_to_save = { count: data.inventory[i].amount, name: data.inventory[i].name, deleted: settings.amount };
              data_user = data_to_save;
              done = true;
            };
          };
        };
      };
    };
    if (done == false) return data_error;
    Currency.findOneAndUpdate({ guildID: settings.guild.id || null, userID: settings.user.id || null },{$set: { inventory: data.inventory }},{upsert: true, useFindAndModify: false },(e, d) => {
      if(e) return console.log(e);
    });
    return { error: false, inventory: data_user, rawData: data };
  }
  async transferItem(settings) {
    if (!settings.guild) settings.guild = { id: null };
    event.emit("debug", `[CS => Debug] : chuyển Chức năng Mục được Thực hiện.`);
    event.emit("debug", `[CS => Debug] : Tìm nạp người dùng (Chức năng mua)`);
    let user1 = await findUser({ user: settings.user1, guild: settings.guild }, null, null, "transferItem");
    let user2 = await findUser({ user: settings.user2, guild: settings.guild }, null, null, "transferItem");
    let name, amount_to_transfer, itemsLeft;
    // mục
    let thing = parseInt(settings.item);
    if (!thing) return { error: true, type: "No-Item" };
    thing = thing - 1;
    // kiểm tra xem mặt hàng có tồn tại không
    if (!user1.inventory[thing]) return { error: true, type: "Invalid-Item" };
    amount_to_transfer = settings.amount;
    if (amount_to_transfer === "all" || amount_to_transfer === "max") {
      let user2_has_item = false;
      let ifHasItem_then_index = 0;
      for (let i = 0; i < user1.inventory.length; i++) {
        if (user2.inventory[i].name === user1.inventory[thing].name) {
          user2_has_item = true;
          ifHasItem_then_index = i;
        }
      }
      amount_to_transfer = user1.inventory[thing].amount;
      name = user1.inventory[thing].name;
      itemsLeft = 0;
      if (user2_has_item === false) {
        user2.inventory.push(user1.inventory[thing]);
      } else {
        user2.inventory[ifHasItem_then_index].amount += user1.inventory[thing].amount;
      };
      user1.inventory.splice(thing, 1);
    } else {
      amount_to_transfer = parseInt(amount_to_transfer) || 1;
      if (amount_to_transfer <= 0) return { error: true, type: "Invalid-Amount" };
      if (amount_to_transfer > user1.inventory[thing].amount) return { error: true, type: "In-Sufficient-Amount" };
      let user2_has_item = false;
      let ifHasItem_then_index = 0;
      for (let i = 0; i < user2.inventory.length; i++) {
        if (user2.inventory[i].name === user1.inventory[thing].name) {
          user2_has_item = true;
          ifHasItem_then_index = i;
        }
      }
      name = user1.inventory[thing].name;
      if (user2_has_item === false) {
         user2.inventory.push({ name: user1.inventory[thing].name, amount: amount_to_transfer });
      } else {
         user2.inventory[ifHasItem_then_index].amount += amount_to_transfer;
      };
      user1.inventory[thing].amount -= amount_to_transfer;
      itemsLeft = user1.inventory[thing].amount;
    };
    user1.markModified("inventory");
    user2.markModified("inventory");
    await saveUser(user1, user2);
    return { error: false, type: "success", transfered: amount_to_transfer, itemName: name, itemsLeft: itemsLeft };
  };
};
Object.assign(Economy.prototype, require("../FunctionEconomy/global"));
module.exports.cs = event;
function _getDbURL() {
  let url = process.mongoURL;
  if (require("mongoose").connections.length) url = require("mongoose").connections[0]._connectionString;
  return url;
};
async function _buy(settings) {
  event.emit("debug", `[ CS => Debug ] : Chức năng Mua được Thực thi.`);
  let inventoryData = await getInventory(settings);
  event.emit("debug", `[ CS => Debug ] : Tìm nạp hàng tồn kho. (Chức năng Mua hàng)`);
  event.emit("debug", `[ CS => Debug ] : Tìm nạp người dùng (Chức năng Mua hàng)`);
  let data = await findUser(settings, null, null, "buy");
  if (!settings.guild) settings.guild = { id: null };
  let amount_to_add = parseInt(settings.amount) || 1;
  let thing = parseInt(settings.item);
  if(!thing) return { error: true, type: "No-Item" };
  thing = thing - 1;
  if(!inventoryData.inventory[thing]) return { error: true, type: "Invalid-Item" };
  let price = inventoryData.inventory[thing].price;
  if(amount_to_add > 1) price = amount_to_add * inventoryData.inventory[thing].price;
  if(data.wallet < price) return { error: true, type: "low-money" };
  if(amount_to_add <= 0) return { error: true, type: "Invalid-Amount" };
  data.wallet -= price;
  let done = false;
  let makeItem = true;
  for (let j in data.inventory) {
    if(inventoryData.inventory[thing].name === data.inventory[j].name)
      makeItem = false;
  };
  if (makeItem == false) {
    for (let j in data.inventory) {
      if(inventoryData.inventory[thing].name === data.inventory[j].name) {
        data.inventory[j].amount += amount_to_add || 1;
        done = true;
      };
    };
  };
  if(done == false) {
    data.inventory.push({ name: inventoryData.inventory[thing].name, amount: amount_to_add || 1 });
  };
  Currency.findOneAndUpdate({ guildID: settings.guild.id || null, userID: settings.user.id || null },{$set: { inventory: data.inventory, wallet: data.wallet }},{ upsert: true, useFindAndModify: false },(e, d) => {
    if(e) return console.error(e);
  });
  event.emit("debug", `[CS => Debug] : Đang cập nhật hàng tồn kho ( Buy Function )`);
  return { error: false, type: "success", inventory: inventoryData.inventory[thing], price: price, amount: amount_to_add };
};
__name(Economy, "Economy");
/*========================================================
# EmbedPages.js
========================================================*/
const EmbedPages = async function(message, embeds, style = {}) {
    style.but1 ||= "⬅️"; // Đầu tiên
    style.but2 ||= "↩️"; // Trước
    style.but3 ||= "❌"; // Xóa bỏ 
    style.but4 ||= "↪️"; // Tiếp theo
    style.but5 ||= "➡️"; // Cuối Cùng
    style.butColor ||= blackcat_club_1.ButtonStyle.Primary; // màu nút chuyển động
    style.butColor2 ||= blackcat_club_1.ButtonStyle.Danger; // màu nút xoá bỏ
    let but1 = new blackcat_club_1.ButtonBuilder().setStyle(style.butColor).setCustomId("Đầu_tiên").setEmoji(style.but1).setDisabled(false);
    let but2 = new blackcat_club_1.ButtonBuilder().setStyle(style.butColor).setCustomId("Trước").setEmoji(style.but2).setDisabled(false);
    let but3 = new blackcat_club_1.ButtonBuilder().setStyle(style.butColor2).setCustomId("xóa_bỏ").setEmoji(style.but3).setDisabled(false);
    let but4 = new blackcat_club_1.ButtonBuilder().setStyle(style.butColor).setCustomId("tiếp_theo").setEmoji(style.but4).setDisabled(false);
    let but5 = new blackcat_club_1.ButtonBuilder().setStyle(style.butColor).setCustomId("Cuối_cùng").setEmoji(style.but5).setDisabled(false);
    const row = new blackcat_club_1.ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false));
    if(embeds.length == 1) return message.channel.send({ embeds: [embeds[0]], components: [new blackcat_club_1.ActionRowBuilder().addComponents([but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true), but5.setDisabled(true)])] });
    embeds = embeds.map((embed, index) => {
        return embed.setFooter({ text: `Page: ${index + 1}/${embeds.length}`, iconURL: message.guild.iconURL() });
    });
    let curPage = 0;
    let filter = (m) => m.member.id === message.member.id;
    const sendMsg = await message.channel.send({ embeds: [embeds[0]], components: [new blackcat_club_1.ActionRowBuilder().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
    const collector = sendMsg.createMessageComponentCollector({ filter: filter, time: 60000, componentType: blackcat_club_1.ComponentType.Button });
    collector.on("collect", async(b) => {
        await b.deferUpdate().catch((e) => null);
        if(b.customId === 'tiếp_theo') {
            curPage++;
            if(curPage !== embeds.length - 1) {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [new blackcat_club_1.ActionRowBuilder().addComponents( but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            } else {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [ new blackcat_club_1.ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(true), but5.setDisabled(true))] });
            };
        } else if(b.customId === 'Trước') {
            curPage--;
            if(curPage !== 0) {
                return sendMsg.edit({ embeds: [embeds[curPage]], components: [new blackcat_club_1.ActionRowBuilder().addComponents( but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            } else {
                sendMsg.edit({ embeds: [embeds[curPage]], components: [new blackcat_club_1.ActionRowBuilder().addComponents( but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            };
        } else if(b.customId === 'Đầu_tiên') {
            curPage = 0;
            await sendMsg.edit({ embeds: [embeds[curPage]], components: [new blackcat_club_1.ActionRowBuilder().addComponents( but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
        } else if(b.customId === 'Cuối_cùng') {
            curPage = embeds.length - 1;
            await sendMsg.edit({ embeds: [embeds[curPage]], components: [new blackcat_club_1.ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(true), but5.setDisabled(true) )] });
        } else if(b.customId === 'xóa_bỏ') {
            row.components.forEach((btn) => btn.setDisabled(true));
            await sendMsg.edit({ embeds: [embeds[curPage]], components: [row] });
        };
        collector.on("end", async() => {
            row.components.forEach((btn) => btn.setDisabled(true));
            if(sendMsg.editable) {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [row] });
            };
        });
    });
};
__name(EmbedPages, "EmbedPages");
//# sourceMappingURL=economy.js.map
0 && (module.exports = {
  Economy,
  BlackCat,
  EmbedPages,
  compositeImage
}); 