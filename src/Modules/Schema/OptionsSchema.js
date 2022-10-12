const { model, Schema } = require('mongoose');
const Inventory = Schema({
   guildID: { type: String, default: null },
   inventory: { type: Array },
   lastUpdated: { type: Date, default: new Date() },
});
const Currency = Schema({
  userID: String,
  guildID: String, inventory: Array,
  wallet: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  networth: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: new Date() },
  lastGamble: { type: Number, default: 0 },
  lastHourly: { type: Number, default: 0 },
  lastQuaterly: { type: Number, default: 0 },
  lastHafly: { type: Number, default: 0 },
  lastRob: { type: Number, default: 0 },
  lastDaily: { type: Number, default: 0 },
  lastWeekly: { type: Number, default: 0 },
  lastMonthly: { type: Number, default: 0 },
  lastYearly: { type: Number, default: 0 },
  lastBegged: { type: Number, default: 0 },
  lastWork: { type: Number, default: 0 },
  bankSpace: { type: Number, default: 0 },
  begTimeout: { type: Number, default: 240 },
  streak: {
    hourly: { type: Number, default: 1 },
    daily: { type: Number, default: 1 },
    weekly: { type: Number, default: 1 },
    monthly: { type: Number, default: 1 },
    yearly: { type: Number, default: 1 },
    hafly: { type: Number, default: 1 },
    quaterly: { type: Number, default: 1 },
  }
});

module.exports = {
  Currency: model('currency', Currency),
  Inventory: model('Inventory-currency', Inventory),
};