const { removeMoney, addMoney, addMoneyToAllUsers, removeMoneyFromAllUsers, withdraw, deposite, gamble, setBankSpace, transferMoney, setDefaultBankAmount, setDefaultWalletAmount, setMaxBankAmount, findUser, makeUser, saveUser, amount } = require("./management");
const { getUserItems, getShopItems, globalLeaderboard, leaderboard, balance, getInventory, makeInventory, updateInventory } = require("./informative");
const { monthly, daily, weekly, quaterly, beg, rob, hafly, hourly, yearly } = require("./moneyMaking");
const events = new (require("events").EventEmitter)();
let maxWallet, workCooldown = 0;
// ===================================================================
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
// ===================================================================
function setMaxWalletAmount(amount) { 
  if (parseInt(amount)) maxWallet = amount || 0;
};
// ===================================================================
// ===================================================================
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
// ===================================================================
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
};
// ===================================================================
module.exports = { work, monthly, yearly, weekly, quaterly, hafly, daily, addMoney, rob, removeMoney, transferMoney, getUserItems, getShopItems, findUser, makeUser, saveUser, getInventory, leaderboard, globalLeaderboard, hourly, beg, setDefaultWalletAmount, setDefaultBankAmount, gamble, withdraw, deposite, balance, makeInventory, updateInventory, info, setMaxBankAmount, setMaxWalletAmount, setBankSpace,  addMoneyToAllUsers, removeMoneyFromAllUsers };