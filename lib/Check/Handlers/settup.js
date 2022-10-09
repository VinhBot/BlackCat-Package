module.exports = (client) => {
  const { Commands: { Economy }, setMongoURL } = require("../../lib/Client");
  client.cs = new Economy;
  const { vietnam, setMaxWalletAmount, setDefaultBankAmount, setMaxBankAmount, setDefaultWalletAmount } = client.cs;
    client.donvitiente = vietnam;
    setMaxWalletAmount(1000);
    setDefaultBankAmount(1000);
    setDefaultWalletAmount(1000);
    setMaxBankAmount(100000000000);
    /*--------------------
    # Events mongoose xem kết nối có thành công hay là không
    --------------------*/
    const mongoose = require("mongoose");
    setMongoURL(process.env.mongourl)
    mongoose.connection.on("connected", () => {
          console.log("Mongoose đã kết nối thành công!".red);
    });
    mongoose.connection.on("err", err => {
          console.error(`Lỗi kết nối Mongoose: \n${err.stack}`.red);
    });
    mongoose.connection.on("disconnected", () => {
          console.warn("Kết nối Mongoose không thành công".green);
    });
};