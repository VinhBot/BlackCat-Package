"use strict";
var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => { for (var name in all)  __defProp(target, name, { get: all[name], enumerable: true }); };
var __copyProps = (to, from, except, desc) => { if (from && typeof from === "object" || typeof from === "function") { for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable }); }; return to; };
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
/*========================================================
# function defined in this file
========================================================*/
var src_exports = {};
__export(src_exports, {
  Economy: () => Economy, 
  Ranking: () => Ranking,
  BlackCat: () => BlackCat,
  dataImage: () => dataImage,
  EmbedPages: () => EmbedPages,
  compositeImage: () => compositeImage,
});
module.exports = __toCommonJS(src_exports);
/*========================================================
# kết nối với các module khác
========================================================*/
const { Currency, Inventory, LevelSchema: Cap_bac } = require("../Schema/OptionsSchema");
const localize = require("../../LanguageP/localize").default.loadFromLocale;
const { setMongoURL, NewUpdate } = require("../Functions/functions");
const blackcat_club_1 = require("../../Resources/Discord");
const dataImage = require("./dataImage")._data;
/*========================================================
# BlackCat Client
========================================================*/
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
/*========================================================
# compositeImage.js
========================================================*/
const compositeImage = function(options = {}) {
  const _random = options.setImageFormat[Math.floor(Math.random() * options.setImageFormat.length)];
  return _random;
}
__name(compositeImage, "compositeImage");
/*========================================================
# Economy.js
========================================================*/
/*----------------------------------------------------------------
# @author Silent-Coder    -                 🧠😸                 -
# Editer Nguyễn Vinh      - --------------------------------------
# @license Apache-2.0     - Thank you very much to the publisher -
# @copyright Silent-Coder - --------------------------------------
# @file Economy.js        -
-------------------------*/ 
const { findUser, getInventory, connect, event, saveUser } = require("./Economy");
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
Object.assign(Economy.prototype, require("./Economy"));
__name(Economy, "Economy");
module.exports.cs = event;
/*========================================================
# Ranking.js
========================================================*/
class Ranking {
  static async fetchLeaderboard(ID_may_chu, Dat_gioi_han) {
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (!Dat_gioi_han) throw new TypeError("Giới hạn không được cung cấp.");
    const Thanh_vien = await Cap_bac.find({ guildID: ID_may_chu }).sort([['xp', 'descending']]).limit(Dat_gioi_han).exec();
    return Thanh_vien;
  };
  static async createUser(ID_thanh_vien, ID_may_chu) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    const La_nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (La_nguoi_dung) return false;
    const Nguoi_dung_moi = new Cap_bac({ userID: ID_thanh_vien, guildID: ID_may_chu });
    await Nguoi_dung_moi.save().catch(e => console.log(`Không tạo được người dùng: ${e}`));
    return Nguoi_dung_moi;
  };
  static async deleteUser(ID_thanh_vien, ID_may_chu) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    await Cap_bac.findOneAndDelete({ userID: ID_thanh_vien, guildID: ID_may_chu }).catch(e => console.log(`Không xóa được người dùng: ${e}`));
    return Nguoi_dung;
  };
  static async appendXp(ID_thanh_vien, ID_may_chu, xp) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (xp == 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("Một lượng xp không được cung cấp / không hợp lệ.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) {
      const Nguoi_dung_moi = new Cap_bac({ userID: ID_thanh_vien, guildID: ID_may_chu, xp: xp, level: Math.floor(0.1 * Math.sqrt(xp))});
      await Nguoi_dung_moi.save().catch(e => console.log(`Không lưu được người dùng mới.`));
      return (Math.floor(0.1 * Math.sqrt(xp)) > 0);
    };
    Nguoi_dung.xp += parseInt(xp, 10);
    Nguoi_dung.level = Math.floor(0.1 * Math.sqrt(Nguoi_dung.xp));
    Nguoi_dung.lastUpdated = new Date();
    await Nguoi_dung.save().catch(e => console.log(`Không nối được xp: ${e}`) );
    return (Math.floor(0.1 * Math.sqrt(Nguoi_dung.xp -= xp)) < Nguoi_dung.level);
  };
  static async appendLevel(ID_thanh_vien, ID_may_chu, Cap_do) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (!Cap_do) throw new TypeError("Một lượng cấp độ không được cung cấp.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    Nguoi_dung.level += parseInt(Cap_do, 10);
    Nguoi_dung.xp = Nguoi_dung.level * Nguoi_dung.level * 100;
    Nguoi_dung.lastUpdated = new Date();
    Nguoi_dung.save().catch(e => console.log(`Không nối được cấp độ: ${e}`) );
    return Nguoi_dung;
  };
  static async setXp(ID_thanh_vien, ID_may_chu, xp) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (xp == 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("Một lượng xp không được cung cấp / không hợp lệ.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    Nguoi_dung.xp = xp;
    Nguoi_dung.level = Math.floor(0.1 * Math.sqrt(Nguoi_dung.xp));
    Nguoi_dung.lastUpdated = new Date();
    Nguoi_dung.save().catch(e => console.log(`Không đặt được xp: ${e}`) );
    return Nguoi_dung;
  };
  static async setLevel(ID_thanh_vien, ID_may_chu, Cap_do_) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (!Cap_do_) throw new TypeError("Một cấp độ không được cung cấp.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    Nguoi_dung.level = Cap_do_;
    Nguoi_dung.xp = Cap_do_ * Cap_do_ * 100;
    Nguoi_dung.lastUpdated = new Date();
    Nguoi_dung.save().catch(e => console.log(`Không đặt được cấp độ: ${e}`) );
    return Nguoi_dung;
  };
  static async fetch(ID_thanh_vien, ID_may_chu, Tim_nap_vi_tri = false) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    if (Tim_nap_vi_tri === true) {
      const leaderboard = await Cap_bac.find({ guildID: ID_may_chu }).sort([['xp', 'descending']]).exec();
      Nguoi_dung.position = leaderboard.findIndex(i => i.userID === ID_thanh_vien) + 1;
    };
    Nguoi_dung.cleanXp = Nguoi_dung.xp - this.xpFor(Nguoi_dung.level);
    Nguoi_dung.cleanNextLevelXp = this.xpFor(Nguoi_dung.level + 1) - this.xpFor(Nguoi_dung.level);
    return Nguoi_dung;
  };
  static async subtractXp(ID_thanh_vien, ID_may_chu, xp) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (xp == 0 || !xp || isNaN(parseInt(xp))) throw new TypeError("Một lượng xp không được cung cấp / không hợp lệ.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    Nguoi_dung.xp -= xp;
    Nguoi_dung.level = Math.floor(0.1 * Math.sqrt(Nguoi_dung.xp));
    Nguoi_dung.lastUpdated = new Date();
    Nguoi_dung.save().catch(e => console.log(`Không trừ được xp: ${e}`) );
    return Nguoi_dung;
  };
  static async subtractLevel(ID_thanh_vien, ID_may_chu, Cap_do) {
    if (!ID_thanh_vien) throw new TypeError("Một id người dùng không được cung cấp.");
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    if (!Cap_do) throw new TypeError("Một lượng cấp độ không được cung cấp.");
    const Nguoi_dung = await Cap_bac.findOne({ userID: ID_thanh_vien, guildID: ID_may_chu });
    if (!Nguoi_dung) return false;
    Nguoi_dung.level -= Cap_do;
    Nguoi_dung.xp = Nguoi_dung.level * Nguoi_dung.level * 100;
    Nguoi_dung.lastUpdated = new Date();
    Nguoi_dung.save().catch(e => console.log(`Không thể trừ các cấp: ${e}`) );
    return Nguoi_dung;
  };
  static async computeLeaderboard(client, leaderboard, fetchUsers = false) {
    if (!client) throw new TypeError("Một client không được cung cấp.");
    if (!leaderboard) throw new TypeError("Id bảng xếp hạng không được cung cấp.");
    if (leaderboard.length < 1) return [];
    const computedArray = [];
    if (fetchUsers) {
      for (const key of leaderboard) {
        const user = await client.users.fetch(key.userID) || { username: "Unknown", discriminator: "0000" };
        computedArray.push({
          guildID: key.guildID,
          userID: key.userID,
          xp: key.xp,
          level: key.level,
          position: (leaderboard.findIndex(i => i.guildID === key.guildID && i.userID === key.userID) + 1),
          username: user.username,
          discriminator: user.discriminator
        });
      }
    } else {
      leaderboard.map(key => computedArray.push({
        guildID: key.guildID,
        userID: key.userID,
        xp: key.xp,
        level: key.level,
        position: (leaderboard.findIndex(i => i.guildID === key.guildID && i.userID === key.userID) + 1),
        username: client.users.cache.get(key.userID) ? client.users.cache.get(key.userID).username : "Unknown",
        discriminator: client.users.cache.get(key.userID) ? client.users.cache.get(key.userID).discriminator : "0000"
      }));
    };
    return computedArray;
  };
  static xpFor (Muc_tieu_cap_do) {
    if (isNaN(Muc_tieu_cap_do) || isNaN(parseInt(Muc_tieu_cap_do, 10))) throw new TypeError("Mức mục tiêu phải là một số hợp lệ.");
    if (isNaN(Muc_tieu_cap_do)) Muc_tieu_cap_do = parseInt(Muc_tieu_cap_do, 10);
    if (Muc_tieu_cap_do < 0) throw new RangeError("Mức mục tiêu phải là một số dương.");
    return Muc_tieu_cap_do * Muc_tieu_cap_do * 100;
  };
  static async deleteGuild(ID_may_chu) {
    if (!ID_may_chu) throw new TypeError("Id guild không được cung cấp.");
    const May_chu = await Cap_bac.findOne({ guildID: ID_may_chu });
    if (!May_chu) return false;
    await Cap_bac.deleteMany({ guildID: ID_may_chu }).catch(e => console.log(`Không xóa được bang hội: ${e}`));
    return May_chu;
  };
};
__name(Ranking, "Ranking");
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
/*========================================================
# Xác định lại các chức năng
========================================================*/
0 && (module.exports = {
  Economy,
  Ranking,
  BlackCat,
  EmbedPages,
  compositeImage,
  dataImage
}); 