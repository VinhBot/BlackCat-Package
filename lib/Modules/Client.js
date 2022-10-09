/*-------------------------------------
# Author: Nguyễn Văn Vinh
--------------------------------------*/
'use strict';
const { Client: Xay_dung_vi_tri_khach_hang, Partials } = require(`../MainEvents`);
const { GatewayIntentBits } = require(`../Publish02/api`);
const Du_lieu = require("mongoose");
const colors = require("colors");
function kiem_tra_ket_noi(Cung_co, Dang_nhap = true, Mat_Khau) {
    let Ket_noi = true;
    Du_lieu.connect(Cung_co, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
    }).catch((e) => {
       Ket_noi = false;
       console.log(e);
    }).then(() => {
       if (Ket_noi && Dang_nhap);
    });
process.mongoURL = Mat_Khau;
};
const AddRoles = function(member, role = {}) {
  if(!member.guild) return;
  let roles = role.Roles;
  for(let i = 0; i < roles.length; i++ )
  member.roles.add(roles[i]);
  /*-------------------------
  # Tự động thêm role khi có thành viên mới vào máy chủ
  # Automatically add role when new members join the server
  # Thí dụ: 
  
  client.on("guildMemberAdd", async(member) => {
      AddRoles(member, {
          Roles: [
               "Roles ID"
          ],
      });
  });
  --------------------------*/
};
const setMongoURL = function(Mat_Khau, Dang_nhap = true) {
    try {
    if (!Mat_Khau.startsWith("mongodb"));
    } catch(e) {
      console.log("MongoURL không hợp lệ hoặc bạn chưa thêm mongourl vui lòng check lại giúp mình nhé 😜".red);
    };
    kiem_tra_ket_noi(Mat_Khau, Dang_nhap);
};

const NewUpdate = function(Dinh_dang = true) {
    if (Dinh_dang) kiem_tra_update();
    async function kiem_tra_update() {
      if (!require("node-fetch")) return;
      const Du_lieu_goi = await require("node-fetch")(`https://registry.npmjs.com/blackcat-club`).then((van_ban) => van_ban.json());
      if (require("../package.json").version !== Du_lieu_goi["dist-tags"].latest) {
        console.log("\n\n");
        console.log("\x1b[32m" + "---------------------------------------");
        console.log("\x1b[32m" + "|          @blackcat-club      - [] X |");
        console.log("\x1b[32m" + "---------------------------------------");
        console.log("\x1b[33m" + `|         Mô-đun đã lỗi thời!\x1b[33m         |`);
        console.log("\x1b[35m" + "|       Phiên bản mới đã có sẵn!      |");
        console.log("\x1b[34m" + `|          ${require("../package.json").version} --> ${Du_lieu_goi["dist-tags"].latest}           |`);
        console.log("\x1b[36m" + '|       Chạy "npm i blackcat-club"    |');
        console.log("\x1b[36m" + "|            để cập nhật!             |");
        console.log("\x1b[37m" + `|   Xem lại thay đổi trong hướng dẫn  |`);
        console.log("\x1b[32m" + "--------------------------------------\x1b[37m");
        console.log("\n\n");
       };
   };
};
class BlackCat extends Xay_dung_vi_tri_khach_hang {
  constructor(token, login, Phanhoitinnhan = {}) {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: Phanhoitinnhan.Reply,
      },
      partials: [ Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember ],
      intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent ],
    });
    this.login(token);
  };
  setMongoURL(Mat_Khau, Dang_nhap = true) {
    try {
       if (!Mat_Khau.startsWith("mongodb"));
    } catch(e) {
       console.log("MongoURL không hợp lệ hoặc bạn chưa thêm mongourl vui lòng check lại giúp mình nhé 😜".red);
    };
    kiem_tra_ket_noi(Mat_Khau, Dang_nhap);
  };
};

module.exports.BlackCat = BlackCat;
// auto commands
module.exports.AddRoles = AddRoles;
// setMongoURL
module.exports.setMongoURL = setMongoURL;
// NewUpdate
module.exports.NewUpdate = NewUpdate;
// Set Language
module.exports.Language = require("./Language/Language");
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