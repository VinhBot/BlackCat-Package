var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => { for (var name in all) __defProp(target, name, { get: all[name], enumerable: true }); };
var __copyProps = (to, from, except, desc) => { if (from && typeof from === "object" || typeof from === "function") { for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable }); } return to; };
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
/*========================================================
# Bắt đầu xác định các chức năng 
========================================================*/
var src_exports = {};
__export(src_exports, {
  beg:                     () => beg,
  rob:                     () => rob,
  info:                    () => info,
  work:                    () => work,
  sleep:                   () => sleep,
  hafly:                   () => hafly,
  daily:                   () => daily,
  amount:                  () => amount,
  gamble:                  () => gamble,
  yearly:                  () => yearly,
  weekly:                  () => weekly,
  hourly:                  () => hourly,
  monthly:                 () => monthly,
  balance:                 () => balance,
  quaterly:                () => quaterly,
  addMoney:                () => addMoney,
  withdraw:                () => withdraw,
  findUser:                () => findUser,
  makeUser:                () => makeUser,
  saveUser:                () => saveUser,
  deposite:                () => deposite,
  removeMoney:             () => removeMoney,
  leaderboard:             () => leaderboard,
  setBankSpace:            () => setBankSpace,
  getUserItems:            () => getUserItems,
  parseSeconds:            () => parseSeconds, 
  getShopItems:            () => getShopItems,
  getInventory:            () => getInventory,
  makeInventory:           () => makeInventory,
  transferMoney:           () => transferMoney,
  globalLeaderboard:       () => globalLeaderboard,
  addMoneyToAllUsers:      () => addMoneyToAllUsers,
  setDefaultSettings:      () => setDefaultSettings,
  removeMoneyFromAllUsers: () => removeMoneyFromAllUsers,
});
module.exports = __toCommonJS(src_exports);
/*====================| require package |=================*/
const { Currency, Inventory } = require("../Schema/OptionsSchema");
const events = new (require("events").EventEmitter)();
/*========================================================*/
let maxWallet, workCooldown = 0, maxBank, bank, wallet;
/*========================================================
# parseSeconds.js
========================================================*/
const parseSeconds = function(seconds) {
  if (String(seconds).includes("-")) return "0 Giây";
  let days = parseInt(seconds / 86400);
  seconds = seconds % 86400;
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60);
  if (days) {
    return `${days} Ngày, ${hours} Giờ, ${minutes} Phút`;
  } else if (hours) {
    return `${hours} Giờ, ${minutes} Phút, ${seconds} Giây`;
  } else if (minutes) {
    return `${minutes} Phút, ${seconds} Giây`;
  };
  return `${seconds} Giây`;
};
__name(parseSeconds, "parseSeconds");
/*========================================================
# info.js
========================================================*/
async function info(userID, guildID) {
  let data = await findUser({}, userID, guildID, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  let lastHourlyy = true, lastHaflyy = true, lastDailyy = true, lastWeeklyy = true, lastMonthlyy = true, lastBeggedy = true, lastQuaterlyy = true, lastWorkk = true, lastYearlyy = true;
  if(data.lastBegged !== null && (data.begTimeout || 240) - (Date.now() - data.lastBegged) / 1000 > 0) lastBeggedy = false;
  if(data.lastHourly !== null && 3600 - (Date.now() - data.lastHourly) / 1000 > 0) lastHourlyy = false;
  if(data.lastDaily !== null && 86400 - (Date.now() - data.lastDaily) / 1000 > 0) lastDailyy = false;
  if(data.lastHafly !== null && 43200 - (Date.now() - data.lastHafly) / 1000 > 0) lastHaflyy = false;
  if(data.lastQuaterly !== null && 12600 - (Date.now() - data.lastQuaterly) / 1000 > 0) lastQuaterlyy = false;
  if(data.lastWeekly !== null && 604800 - (Date.now() - data.lastWeekly) / 1000 > 0) lastWeeklyy = false;
  if(data.lastMonthly !== null && 2.592e6 - (Date.now() - data.lastMonthly) / 1000 > 0) lastMonthlyy = false;
  if(data.lastWork !== null && workCooldown - (Date.now() - data.lastWork) / 1000 > 0) lastWorkk = false;
  if(data.lastYearly !== null && (31536000000 - (Date.now() - data.lastYearly)) / 1000 > 0) lastYearlyy = false;
  return {
    error: false,
    rawData: data,
    info: Object.entries({
      Hourly: { used: lastHourlyy, timeLeft: parseSeconds(Math.floor(3600 - (Date.now() - data.lastHourly) / 1000)) },
      Hafly: { used: lastHaflyy, timeLeft: parseSeconds(Math.floor(43200 - (Date.now() - data.lastHafly) / 1000)) },
      Daily: { used: lastDailyy, timeLeft: parseSeconds(Math.floor(86400 - (Date.now() - data.lastDaily) / 1000)) },
      Weekly: { used: lastWeeklyy, timeLeft: parseSeconds(Math.floor(604800 - (Date.now() - data.lastWeekly) / 1000)) },
      Monthly: { used: lastMonthlyy, timeLeft: parseSeconds(Math.floor(2.592e6 - (Date.now() - data.lastMonthly) / 1000)) },
      Begged: { used: lastBeggedy, timeLeft: parseSeconds(Math.floor((data.begTimeout || 240) - (Date.now() - data.lastBegged) / 1000)) },
      Quaterly: { used: lastQuaterlyy, timeLeft: parseSeconds(Math.floor(12600 - (Date.now() - data.lastQuaterly) / 1000)) },
      Work: { used: lastWorkk, timeLeft: parseSeconds(Math.floor(12600 - (Date.now() - data.lastWork) / 1000)) },
      Yearly: { used: lastYearlyy, timeLeft: parseSeconds(Math.floor((31536000000 - (Date.now() - data.lastYearly)) / 1000)) },
    }),
  };
};
__name(info, "info");
/*========================================================
# work.js
========================================================*/
async function work(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let lastWork = data.lastWork;
  let timeout = settings.cooldown;
  workCooldown = timeout;
  if (lastWork !== null && timeout - (Date.now() - lastWork) / 1000 > 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - lastWork) / 1000)) };
  } else {
    let amountt = Math.floor(Math.random() * settings.maxAmount || 100) + 1;
    data.lastWork = Date.now();
    data = amount(data, "add", "wallet", amountt, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    await saveUser(data);
    events.emit("userUpdate", oldData, data);
    let result = Math.floor(Math.random() * settings.replies.length);
    return { error: false, type: "success", workType: settings.replies[result], amount: amountt };
  };
}
__name(work, "work");
/*========================================================
# balance.js
========================================================*/
async function balance(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  if (!data.networth) data.networth = 0;
  data.networth = data.wallet + data.bank;
  return { rawData: data, bank: data.bank, wallet: data.wallet, networth: data.networth };
}
__name(balance, "balance");
/*========================================================
# leaderboard.js
========================================================*/
async function leaderboard(guildid) {
  let data = await Currency.find({ guildID: guildid || null });
  data.sort((a, b) => {
    return b.networth - a.networth;
  });
  return data;
};
__name(leaderboard, "leaderboard");
/*========================================================

========================================================*/
async function globalLeaderboard() {
  let array = await Currency.find();
  var output = [];
  array.forEach(function (item) {
    var existing = output.filter(function(v, i) {
      return v.userID == item.userID;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].bank = output[existingIndex].bank + item.bank;
      output[existingIndex].wallet = output[existingIndex].wallet + item.wallet;
      output[existingIndex].networth = output[existingIndex].wallet + output[existingIndex].bank;
    } else {
      output.push(item);
    };
  });
  output.sort((a, b) => {
    return b.networth - a.networth;
  });
  return output;
}
__name(globalLeaderboard, "globalLeaderboard");
/*========================================================
# getUserItems.js
========================================================*/
async function getUserItems(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  return { error: false, inventory: data.inventory, rawData: data };
};
__name(getUserItems, "getUserItems");
/*========================================================
# getShopItems.js
========================================================*/
async function getShopItems(settings) {
  let data = await getInventory(settings);
  return { error: false, inventory: data.inventory, rawData: data };
};
__name(getShopItems, "getShopItems");
/*========================================================
# getInventory.js
========================================================*/
async function getInventory(settings) {
  if(typeof settings.user === "string") settings.user = { id: settings.user };
  if(typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if(!settings.guild) settings.guild = { id: null };
  let find = await Inventory.findOne({ guildID: settings.guild.id || null });
  if (!find) find = await makeInventory(settings);
  if (find.inventory.length > 0)
    find.inventory.forEach((a) => {
      if (!a.description) a.description = "Không có mô tả.";
    });
  events.emit("guildInventoryFetch", find);
  return find;
};
__name(getInventory, "getInventory");
/*========================================================
# makeInventory.js
========================================================*/
async function makeInventory(settings) {
  if(typeof settings.user === "string") settings.user = { id: settings.user };
  if(typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if(!settings.guild) settings.guild = { id: null };
  const inventory = new inv({ guildID: settings.guild.id || null, inventory: [] });
  // await saveUser(inventory);
  events.emit("guildInventoryCreate", inventory);
  return inventory;
}
__name(makeInventory, "makeInventory");
/*========================================================
# updateInventory.js
========================================================*/
async function updateInventory(mongoURL, newData, settings, collection = "inventory-currencies") {
  events.emit("debug", `[ CS => Debug ] : UpdateInventory function is executed.`);
  if (typeof settings.user === "string") settings.user = { id: settings.user };
  if (typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if (!settings.guild) settings.guild = { id: null };
  let query = { guildID: settings.guild.id || null };
  if (settings.user) query = { userID: settings.user.id, guildID: settings.guild.id || null };
  new (require("mongodb").MongoClient)(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect(function (err, db) {
    if(err)return events.emit("debug", `[ CS => Error ] : Unable To Connect to MongoDB ( updateInventory Function )`, err);
    events.emit("debug", `[ CS => Debug ] : Connected to MongoDB ( updateInventory Function )`);
    db.db(mongoURL.split("/")[mongoURL.split("/").length - 1]).collection(collection).updateOne(query, { 
      $set: { inventory: newData } 
    },{ upsert: true },
        function (err, res) {
          if(err) return events.emit("debug", `[ CS => Error ] : Unable To Save Data to MongoDB ( updateInventory Function )`, err);
          if (res.result.n) {
            events.emit("debug", `[ CS => Debug ] : Dữ liệu được Lưu thành công (cập nhật Chức năng Kiểm kê)`);
          } else
            events.emit("debug", `[ CS => Error ] : MongoDB Didn't Update the DB. ( updateInventory Function )`);
          db.close();
          events.emit("debug", `[ CS => Debug ] : Closing DB  ( updateInventory Function )`);
        }
      );
  });
}
__name(updateInventory, "updateInventory");
/*========================================================
# setDefaultWalletAmount.js
========================================================*/
function _setDefaultWalletAmount(amount) {
  if(parseInt(amount)) wallet = amount || 0;
};
function _setDefaultBankAmount(amount) {
  if(parseInt(amount)) bank = amount || 0;
};
function _setMaxBankAmount(amount) {
  if(parseInt(amount)) maxBank = amount || 0;
};
function _setMaxWalletAmount(amount) { 
  if(parseInt(amount)) maxWallet = amount || 0;
};
function setDefaultSettings(options = {}) {
  _setDefaultWalletAmount(options.setDefaultWalletAmount);
  _setDefaultBankAmount(options.setDefaultBankAmount);
  _setMaxWalletAmount(options.setMaxWalletAmount);
  _setMaxBankAmount(options.setMaxBankAmount);
};
__name(setDefaultSettings, "setDefaultSettings");
/*========================================================
# findUser.js
========================================================*/
async function findUser(settings, uid, gid, by) {
  if (typeof settings.user === "string") settings.user = { id: settings.user };
  if (typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if (!settings.guild) settings.guild = { id: null };
  let find = await Currency.findOne({ userID: uid || settings.user.id, guildID: gid || settings.guild.id || null });
  if (!find) find = await makeUser(settings, false, uid, gid);
  if (maxBank > 0 && find.bankSpace == 0) find.bankSpace = maxBank;
  if (!find.streak) find.streak = {};
  if (!find.streak.hourly) find.streak.hourly = 0;
  if (!find.streak.daily) find.streak.daily = 0;
  if (!find.streak.weekly) find.streak.weekly = 0;
  if (!find.streak.monthly) find.streak.monthly = 0;
  if (!find.streak.yearly) find.streak.yearly = 0;
  if (!find.streak.hafly) find.streak.hafly = 0;
  if (!find.streak.quaterly) find.streak.quaterly = 0;
  try {event.emit("userFetch", find, by.split(" ").map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" "))} catch (e) {}
  return find;
}
__name(findUser, "findUser");
/*========================================================
# makeUser.js
========================================================*/
async function makeUser(settings, user2 = false, uid, gid) {
  if (typeof settings.user === "string") settings.user = { id: settings.user };
  if (typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if (!settings.guild) settings.guild = { id: null };
  let user = uid || settings.user.id;
  if (user2) user = settings.user2.id;
  const newUser = new Currency({
    userID: user,
    guildID: gid || settings.guild.id || null,
    wallet: wallet || 0,
    bank: bank || 0,
    bankSpace: maxBank || 0,
    streak: { hourly: 0, daily: 0, weekly: 0, monthly: 0, yearly: 0, hafly: 0, quaterly: 0 },
  });
  if (!newUser) throw new Error("Missing data to fetch from DB. (A function in Currency System is used and userID wasn't provided.)");
  // await saveUser(newUser);
  event.emit("userCreate", newUser);
  return newUser;
}
__name(makeUser, "makeUser");
/*========================================================
# saveUser.js
========================================================*/
async function saveUser(data, data2) {
  process.nextTick(async() => {
      await sleep(Math.floor(Math.random() * 10 + 1) * 100); // Trình tạo số ngẫu nhiên 100 - 1000
      data.save((_) => _ ? console.error(`ERROR Occured while saving data (Currency-system) \n${"=".repeat(50)}\n${_ + "\n" + "=".repeat(50)}`) : "No Error");
      if (data2)
        data2.save((_) => _ ? console.error(`ERROR Occured while saving data (Currency-system) \n${"=".repeat(50)}\n${_ + "\n" + "=".repeat(50)}`) : "No Error");
    }, data, data2);
};
__name(saveUser, "saveUser");
/*========================================================
# sleep.js
========================================================*/
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
__name(sleep, "sleep");
/*========================================================
# amount.js
========================================================*/
function amount(data, type = "add", where = "wallet", amount, by) {
  if (!data.bankSpace) data.bankSpace = maxBank || 0;
  if (where === "bank") {
    if (type === "add") data.bank += amount;
    else data.bank -= amount;
  } else {
    if (type === "add") data.wallet += amount;
    else data.wallet -= amount;
  }
  if (data.bankSpace > 0 && data.bank > data.bankSpace) {
    const a = data.bank;
    data.bank = data.bankSpace;
    data.wallet += Math.abs(a - data.bankSpace);
  }
  if (!data.networth) data.networth = 0;
  data.networth = data.bank + data.wallet;
  try {event.emit("balanceUpdate", data, by.split(" ").map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" "))} catch(E) {};
  return data;
}
__name(amount, "amount");
/*========================================================
# setBankSpace.js
========================================================*/
async function setBankSpace(userID, guildID, newAmount) {
  let data = await findUser({}, userID, guildID, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  newAmount = parseInt(newAmount);
  if (!newAmount && newAmount !== 0) return { error: true, type: "no-amount-provided", rawData: data };
  data.bankSpace = newAmount;
  await saveUser(data);
  event.emit("userUpdate", oldData, data);
  if (oldData.bankSpace !== data.bankSpace) {
    return { error: false, type: "success", amount: data.bankSpace, rawData: data };
  } else {
    return { error: true, type: "same-amount", rawData: data };
  };
};
__name(setBankSpace, "setBankSpace");
/*========================================================
# withdraw.js
========================================================*/
async function withdraw(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let money = String(settings.amount);
  if (!money) return { error: true, type: "money" };
  if (money.includes("-")) return { error: true, type: "negative-money" };
  if (money === "all" || money === "max") {
    if (data.bank < 1) return { error: true, type: "no-money" };
    data.wallet += data.bank;
    data.bank = 0;
    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;
    event.emit("userUpdate", oldData, data);
    await saveUser(data);
    return { error: false, rawData: data, type: "all-success" };
  } else {
    money = parseInt(money);
    if (data.bank < parseInt(money)) return { error: true, type: "low-money" };
    if (isNaN(money)) return { error: true, type: "money" };
    if (money > data.bank) return { error: true, type: "low-money" };
    data.wallet += money;
    data.bank -= money;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: money, rawData: data };
  };
};
__name(withdraw, "withdraw");
/*========================================================
# deposite.js
========================================================*/
async function deposite(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let money = String(settings.amount);
  if (!money) return { error: true, type: "money" };
  if (String(money).includes("-")) return { error: true, type: "negative-money" };
  if (money === "all" || money === "max") {
    if (data.wallet === 0) return { error: true, type: "no-money" };
    if (data.bankSpace > 0 && money === "all" && data.bank === data.bankSpace) {
      return { error: true, rawData: data, type: "bank-full" };
    }
    data.bank += data.wallet;
    data.wallet = 0;
    if (data.bankSpace > 0 && data.bank > data.bankSpace) {
      const a = data.bank;
      data.bank = data.bankSpace;
      data.wallet += Math.abs(a - data.bankSpace);
    }
    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, rawData: data, type: "all-success" };
  } else {
    money = parseInt(money);
    if(!money) return { error: true, type: "money" };
    if (money > data.wallet) return { error: true, type: "low-money" };
    if (data.bankSpace > 0 && data.bank == data.bankSpace) return { error: true, type: "bank-full", rawData: data };
    data.bank += money;
    if (data.wallet - money < 0) {
      const a = data.wallet;
      data.wallet = 0;
      data.bank -= Math.abs(a - money);
    }
    data.wallet -= money;
    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;
    if (data.bankSpace > 0 && data.bank > data.bankSpace) {
      const a = data.bank;
      data.bank = data.bankSpace;
      data.wallet += Math.abs(a - data.bankSpace);
    }
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, rawData: data, type: "success", amount: money };
  }
}
__name(deposite, "deposite");
/*========================================================
# addMoneyToAllUsers.js
========================================================*/
async function addMoneyToAllUsers(settings) {
  if(String(settings.amount).includes("-")) return { error: true, type: "negative-money" };
  let amountt = parseInt(settings.amount) || 0;
  if (typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if (!settings.guild) settings.guild = { id: null };
  let data = await Currency.find({ guildID: settings.guild.id || null });
  if (!data) return { error: true, type: "no-users" };
  const oldData = data;
  data.forEach(async (user) => {
    if (settings.wheretoPutMoney === "bank")
      user = amount(user, "add", "bank", amountt, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    else
      user = amount(user, "add", "wallet", amountt, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  });
  event.emit("usersUpdate", oldData, data);
  data.forEach((a) => {
    a.save(function(err, saved) {
      if (err) console.log(err);
    });
  });
  return { error: false, type: "success", rawData: data };
}
__name(addMoneyToAllUsers, "addMoneyToAllUsers");
/*========================================================
# removeMoneyFromAllUsers.js
========================================================*/
async function removeMoneyFromAllUsers(settings) {
  if (String(settings.amount).includes("-")) return { error: true, type: "negative-money" };
  let amountt = parseInt(settings.amount) || 0;
  if (typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if (!settings.guild) settings.guild = { id: null };
  let data = await Currency.find({ guildID: settings.guild.id || null });
  if (!data) return { error: true, type: "no-users" };
  const oldData = data;
  data.forEach(async (user) => {
    if (settings.wheretoPutMoney === "bank") {
      if (settings.amount === "all" || settings.amount === "max") user.bank = 0;
      else user = amount(user, "remove", "bank", parseInt(settings.amount) || 0, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    } else {
      if (settings.amount === "all" || settings.amount === "max") user.wallet = 0;
      else user = amount(user, "remove", "wallet", parseInt(settings.amount) || 0, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    }
  });
  event.emit("usersUpdate", oldData, data);
  data.forEach((a) => {
    a.save(function (err, saved) {
      if (err) console.log(err);
    });
  });
  return { error: false, type: "success", rawData: data };
}
__name(removeMoneyFromAllUsers, "removeMoneyFromAllUsers");
/*========================================================
# addMoney.js
========================================================*/
async function addMoney(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  if (String(settings.amount).includes("-")) return { error: true, type: "negative-money" };
  let amountt = parseInt(settings.amount) || 0;
  if (settings.wheretoPutMoney === "bank")
    data = amount(data, "add", "bank", amountt, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  else
    data = amount(data, "add", "wallet", amountt, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  event.emit("userUpdate", oldData, data);
  await saveUser(data);
  return { error: false, type: "success", rawData: data };
};
__name(addMoney, "addMoney");
/*========================================================
# removeMoney.js
========================================================*/
async function removeMoney(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  if (String(settings.amount).includes("-")) return { error: true, type: "negative-money" };
  if (settings.wheretoPutMoney === "bank") {
    if (settings.amount === "all" || settings.amount === "max") data.bank = 0;
    else data = amount(data, "remove", "bank", parseInt(settings.amount) || 0, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  } else {
    if (settings.amount === "all" || settings.amount === "max") data.wallet = 0;
    else data = amount(data, "remove", "wallet", parseInt(settings.amount) || 0, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  };
  await saveUser(data);
  event.emit("userUpdate", oldData, data);
  return { error: false, type: "success", rawData: data };
};
__name(removeMoney, "removeMoney");
/*========================================================
# transferMoney.js
========================================================*/
async function transferMoney(settings) {
  if (typeof settings.user === "string") settings.user = { id: settings.user };
  if (typeof settings.guild === "string") settings.guild = { id: settings.guild };
  if (!settings.guild) settings.guild = { id: null };
  let user1 = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = user1;
  let user2 = await Currency.findOne({ userID: settings.user2.id, guildID: settings.guild.id || null });
  if (!user2) user2 = await makeUser(settings, true);
  const oldData1 = user2;
  let money = parseInt(settings.amount);
  if (user1.wallet < money) return { error: true, type: "low-money" };
  user1 = amount(user1, "remove", "wallet", money, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  user2 = amount(user2, "add", "wallet", money, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  await saveUser(user1, user2);
  event.emit("userUpdate", oldData, user1, oldData1, user2);
  return { error: false, type: "success", money: money, user: settings.user, user2: settings.user2, rawData: user1, rawData1: user2 };
};
__name(transferMoney, "transferMoney");
/*========================================================
# quaterly.js
========================================================*/
async function quaterly(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let quaterly = data.lastQuaterly;
  let timeout = 21600;
  if (quaterly !== null && timeout - (Date.now() - quaterly) / 1000 > 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - quaterly) / 1000)) };
  } else {
    data.lastQuaterly = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - quaterly) / 1000 > timeout * 2) data.streak.quaterly = 0;
    data.streak.quaterly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  };
}; 
__name(quaterly, "quaterly");
/*========================================================
#
========================================================*/
async function hafly(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let hafly = data.lastHafly;
  let timeout = 43200;
  if (hafly !== null && timeout - (Date.now() - hafly) / 1000 > 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - hafly) / 1000)) };
  } else {
    data.lastHafly = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - data.lastHafly) / 1000 > timeout * 2) {
      data.streak.hafly = 0;
    };
    data.streak.hafly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  };
};
__name(hafly, "hafly");
/*========================================================
# daily.js
========================================================*/
async function daily(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let daily = data.lastDaily;
  let timeout = 86400;
  if (daily !== null && timeout - (Date.now() - daily) / 1000 > 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - daily) / 1000)) };
  } else {
    data.lastDaily = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - daily) / 1000 > timeout * 2) data.streak.daily = 0;
    data.streak.daily += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  };
};
__name(daily, "daily");
/*========================================================
# hourly.js
========================================================*/
async function hourly(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let lastHourly = data.lastHourly;
  let timeout = 3600;
  if (lastHourly !== null && timeout - (Date.now() - lastHourly) / 1000 > 0)
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - lastHourly) / 1000)) };
  else {
    data.lastHourly = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - lastHourly) / 1000 > timeout * 2) data.streak.hourly = 0;
    data.streak.hourly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  }
}
__name(hourly, "hourly");
/*========================================================
# weekly.js
========================================================*/
async function weekly(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let weekly = data.lastWeekly;
  let timeout = 604800;
  if (weekly !== null && timeout - (Date.now() - weekly) / 1000 > 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - weekly) / 1000)) };
  } else {
    data.lastWeekly = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - data.lastWeekly) / 1000 > timeout * 2)
      data.streak.weekly = 0;
    data.streak.weekly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  }
}
__name(weekly, "weekly");
/*========================================================
# monthly.js
========================================================*/
async function monthly(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let monthly = data.lastMonthly;
  let timeout = 2.592e6;
  if(monthly !== null && timeout - (Date.now() - monthly) / 1000 > 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - monthly) / 1000)) };
  } else {
    data.lastMonthly = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - monthly) / 1000 > timeout * 2) data.streak.monthly = 0;
    data.streak.monthly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  };
};
__name(monthly, "monthly");
/*========================================================
# yearly.js
========================================================*/
async function yearly(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let yearly = data.lastYearly;
  let timeout = 31536000000;
  if (yearly !== null && (timeout - (Date.now() - yearly)) / 1000 >= 0) {
    return { error: true, type: "time", time: parseSeconds(Math.floor((timeout - (Date.now() - yearly)) / 1000)) };
  } else {
    data.lastYearly = Date.now();
    data = amount(data, "add", "wallet", settings.amount, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    if ((Date.now() - yearly) / 1000 > timeout * 2) data.streak.yearly = 0;
    data.streak.yearly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: settings.amount, rawData: data };
  };
};
__name(yearly, "yearly");
/*========================================================
# rob.js
========================================================*/
// (testChance): cái này dành cho rob commands
function testChance(successPercentage) {
  let random = Math.random() * 10;
  return (random -= successPercentage) < 0;
};
// (rob) => ...
async function rob(settings) {
  if (typeof settings.guild === "string") settings.guild.id = settings.guild;
  if (typeof settings.user === "string") settings.user.id = settings.user;
  if (!settings.guild) settings.guild = { id: null };
  let user1 = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = user1;
  let user2 = await Currency.findOne({ userID: settings.user2.id, guildID: settings.guild.id || null });
  if (!user2) user2 = await makeUser(settings, true);
  const oldData2 = user2;
  let lastRob = user1.lastRob;
  let timeout = settings.cooldown;
  if (lastRob !== null && timeout - (Date.now() - lastRob) / 1000 > 0) return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - lastRob) / 1000)) };
  if (user1.wallet < settings.minAmount - 2) return { error: true, type: "low-money", minAmount: settings.minAmount };
  if (user2.wallet < settings.minAmount - 2) return { error: true, type: "low-wallet", user2: settings.user2, minAmount: settings.minAmount };
  let max = settings.maxRob;
  if (!max || max < 1000) max = 1000;
  let random = Math.floor(Math.random() * (Math.floor(max || 1000) - 99)) + 99;
  if (random > user2.wallet) random = user2.wallet;
  user1.lastRob = Date.now();
  // 5 ở đây là phần trăm thành công.
  if (testChance(settings.successPercentage || 5)) {
    // Thành công!
    user2 = amount(user2, "remove", "wallet", random, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    user1 = amount(user1, "add", "wallet", random, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    await saveUser(user1, user2);
    event.emit("userUpdate", oldData, user1, oldData2, user2);
    return { error: false, type: "success", user2: settings.user2, minAmount: settings.minAmount, amount: random };
  } else {
    // Thất bại :(
    if (random > user1.wallet) random = user1.wallet;
    user2 = amount(user2, "add", "wallet", random, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    user1 = amount(user1, "remove", "wallet", random, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    await saveUser(user1, user2);
    event.emit("userUpdate", oldData, user1, oldData2, user2);
    return { error: true, type: "caught", user2: settings.user2, minAmount: settings.minAmount, amount: random };
  };
};
__name(rob, "rob");
/*========================================================
# beg.js
========================================================*/
async function beg(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  let beg = data.lastBegged; // XDDDD
  let timeout = 240;
  if (parseInt(settings.cooldown)) timeout = parseInt(settings.cooldown);
  if (beg !== null && timeout - (Date.now() - beg) / 1000 > 0)
    return { error: true, type: "time", time: parseSeconds(Math.floor(timeout - (Date.now() - beg) / 1000)) };
  else {
    const amountt = Math.round((settings.minAmount || 200) + Math.random() * (settings.maxAmount || 400));
    data.lastBegged = Date.now();
    data.begTimeout = timeout;
    data = amount(data, "add", "wallet", amountt, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "success", amount: amountt };
  };
};
__name(beg, "beg");
/*========================================================
# Gameble.js
========================================================*/
async function gamble(settings) {
  let data = await findUser(settings, null, null, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
  const oldData = data;
  const money = parseInt(settings.amount);
  const result = Math.floor(Math.random() * 10);
  const balance = data.wallet;
  let lastGamble = data.lastGamble;
  let cooldown = settings.cooldown || 50;
  if (!money) return { error: true, type: "amount" };
  if (isNaN(money)) return { error: true,  type: "nan" };
  if (money > balance || !balance || balance === 0) return { error: true, type: "low-money", neededMoney: Math.abs(balance - money) };
  if (money < settings.minAmount || 0) return { error: true, type: "gamble-limit", minAmount: settings.minAmount || 0 };
  if (lastGamble !== null && cooldown - (Date.now() - lastGamble) / 1000 > 0) return { error: true, type: "time", second: parseSeconds(Math.floor(cooldown - (Date.now() - lastGamble) / 1000))};
  if (result <= 5) {
    data.lastGamble = Date.now();
    data = amount(data, "remove", "wallet", money, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    await saveUser(data);
    return { error: false, type: "lost", amount: money, wallet: data.wallet };
  } else if (result > 5) {
    data.lastGamble = Date.now();
    data = amount(data, "add", "wallet", money, arguments.callee.toString().substring(15, arguments.callee.toString().indexOf("(")));
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return { error: false, type: "won", amount: money, wallet: data.wallet };
  };
};
__name(gamble, "gamble");
// # sourceMappingURL=opp.js.map
0 && (module.exports = {
  beg, info, rob, work, sleep, gamble, amount, balance, removeMoney, quaterly, hafly,
  daily, addMoney, findUser, makeUser, saveUser, withdraw, deposite, monthly, weekly,
  leaderboard, setBankSpace, parseSeconds, getUserItems, transferMoney, hourly, yearly,
  getShopItems, getInventory, makeInventory, globalLeaderboard, addMoneyToAllUsers,
  removeMoneyFromAllUsers, setDefaultSettings
});