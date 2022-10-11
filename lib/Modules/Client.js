/*-------------------------------------
# Author: Nguyễn Văn Vinh
--------------------------------------*/
'use strict';
const { AddRoles, setMongoURL, NewUpdate } = require("./Functions/functions");
const { Client: Xay_dung_vi_tri_khach_hang, Partials } = require(`../Publish01/Events`);
const localize = require("../LanguageP/localize");
const { GatewayIntentBits } = require(`../Publish02/api`);
const Du_lieu = require("mongoose");
const colors = require("colors");
class BlackCat extends Xay_dung_vi_tri_khach_hang {
  constructor(token) {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: { parse: ["roles", "users", "everyone"], repliedUser: false },
      partials: Object.keys(Partials),
      intents: Object.keys(GatewayIntentBits)
    });
    this.login(token);
  };
  setMongoURL(Mat_Khau, Dang_nhap = true) {
    try {
       if (!Mat_Khau.startsWith("mongodb"));
    } catch(e) {
       console.log("MongoURL không hợp lệ hoặc bạn chưa thêm mongourl vui lòng check lại giúp mình nhé 😜".red);
    };
    const kiem_tra_ket_noi = function(Cung_co, Dang_nhap = true, Mat_Khau) {
       let Ket_noi = true;
       Du_lieu.connect(Cung_co, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
       }).catch((e) => {
          Ket_noi = false;
          console.log(e);
       }).then(() => {
          if(Ket_noi && Dang_nhap);
       });
       process.mongoURL = Mat_Khau;
    };
    kiem_tra_ket_noi(Mat_Khau, Dang_nhap);
  };
};

module.exports.BlackCat = BlackCat;
// auto commands
module.exports.AddRoles = AddRoles;
// Setlamguage Package
module.exports.LanguageP = localize.default.LanguageP;
// setMongoURL
module.exports.setMongoURL = setMongoURL;
// NewUpdate
module.exports.NewUpdate = NewUpdate;
// Set Language
module.exports.Language = require("./Language/LanguageYaml");
// Game Commands
module.exports.Game = {
  ConnectFour: require("./Game/connect4"),
  SnakeGame: require("./Game/snake"),
};
// Function Commands
module.exports.Commands = {
    EmbedPages: require("./Commands/EmbedPages"),
    Economy: require("./Commands/Economy")
};
// asscii-table
module.exports.ascii = require("./Functions/functionsAsciilog");
// path 
module.exports.files_name = require("path");
/*-------------------------
cái này dành cho developer
*/
module.exports.Options = require("./Commands/MessageOptions");
/*--------------------------*/
module.exports.consoles = () => {
  console.log(localize.default.Language_Changer('consolez.logz'))
};