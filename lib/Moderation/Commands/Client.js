const { Client, Partials } = require(`../../Publish01/Events`);
const { GatewayIntentBits } = require(`../../Publish02/api`);
const localize = require("../../LanguageP/localize");
const Du_lieu = require("mongoose");
const BlackCat = class extends Client {
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
  setMongoURL(url) {
		return Du_lieu.connect(url, {
			useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
		}).then(() => {
      console.log("Kết nối Mongodb thành công".green);
    }).catch((e) => {
      console.log("đã sảy ra lỗi khi kết nối mongodb".red);
    });
	};
};
module.exports = BlackCat;