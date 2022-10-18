const { ActionRowBuilder, ButtonBuilder, ButtonStyle, version } = require("../../Publish01/Events");
const { ComponentType } = require("../../Publish02/api");
const localize = require("../../LanguageP/localize");
/*==================================
# Run Events
==================================*/
/*==================================
# Cập nhật phiên bản mới nhất
==================================*/
const NewUpdate = function(Dinh_dang = true) {
    if(Dinh_dang) kiem_tra_update();
    async function kiem_tra_update() {
      if(!require("node-fetch")) return;
      const Du_lieu_goi = await require("node-fetch")(`https://registry.npmjs.com/blackcat-club`).then((van_ban) => van_ban.json());
      if(version !== Du_lieu_goi["dist-tags"].latest) {
        console.log("\n\n");
        console.log("\x1b[32m" + "---------------------------------------");
        console.log("\x1b[32m" + "|          @blackcat-club      - [] X |");
        console.log("\x1b[32m" + "---------------------------------------");
        console.log("\x1b[33m" + `|         Mô-đun đã lỗi thời!\x1b[33m         |`);
        console.log("\x1b[35m" + "|       Phiên bản mới đã có sẵn!      |");
        console.log("\x1b[34m" + `|          ${version} --> ${Du_lieu_goi["dist-tags"].latest}           |`);
        console.log("\x1b[36m" + '|       Chạy "npm i blackcat-club"    |');
        console.log("\x1b[36m" + "|            để cập nhật!             |");
        console.log("\x1b[37m" + `|   Xem lại thay đổi trong hướng dẫn  |`);
        console.log("\x1b[32m" + "--------------------------------------\x1b[37m");
        console.log("\n\n");
      };
   };
};
/*==================================
# EmbedPages
==================================*/
const EmbedPages = async function(message, embeds, style = {}) {
    style.but1 ||= "⬅️"; // Đầu tiên
    style.but2 ||= "↩️"; // Trước
    style.but3 ||= "❌"; // Xóa bỏ 
    style.but4 ||= "↪️"; // Tiếp theo
    style.but5 ||= "➡️"; // Cuối Cùng
    style.butColor ||= ButtonStyle.Primary; // màu nút chuyển động
    style.butColor2 ||= ButtonStyle.Danger; // màu nút xoá bỏ
    let but1 = new ButtonBuilder().setStyle(style.butColor).setCustomId("Đầu_tiên").setEmoji(style.but1).setDisabled(false);
    let but2 = new ButtonBuilder().setStyle(style.butColor).setCustomId("Trước").setEmoji(style.but2).setDisabled(false);
    let but3 = new ButtonBuilder().setStyle(style.butColor2).setCustomId("xóa_bỏ").setEmoji(style.but3).setDisabled(false);
    let but4 = new ButtonBuilder().setStyle(style.butColor).setCustomId("tiếp_theo").setEmoji(style.but4).setDisabled(false);
    let but5 = new ButtonBuilder().setStyle(style.butColor).setCustomId("Cuối_cùng").setEmoji(style.but5).setDisabled(false);
    const row = new ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false));
    if(embeds.length == 1) return message.channel.send({ embeds: [embeds[0]], components: [new ActionRowBuilder().addComponents([but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true), but5.setDisabled(true)])] });
    embeds = embeds.map((embed, index) => {
        return embed.setFooter({ text: `Page: ${index + 1}/${embeds.length}`, iconURL: message.guild.iconURL() });
    });
    let curPage = 0;
    let filter = (m) => m.member.id === message.member.id;
    const sendMsg = await message.channel.send({ embeds: [embeds[0]], components: [new ActionRowBuilder().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
    const collector = sendMsg.createMessageComponentCollector({ filter: filter, time: 60000, componentType: ComponentType.Button });
    collector.on("collect", async(b) => {
        await b.deferUpdate().catch((e) => null);
        if(b.customId === 'tiếp_theo') {
            curPage++;
            if(curPage !== embeds.length - 1) {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [new ActionRowBuilder().addComponents( but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            } else {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [ new ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(true), but5.setDisabled(true))] });
            };
        } else if(b.customId === 'Trước') {
            curPage--;
            if(curPage !== 0) {
                return sendMsg.edit({ embeds: [embeds[curPage]], components: [new ActionRowBuilder().addComponents( but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            } else {
                sendMsg.edit({ embeds: [embeds[curPage]], components: [new ActionRowBuilder().addComponents( but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            };
        } else if(b.customId === 'Đầu_tiên') {
            curPage = 0;
            await sendMsg.edit({ embeds: [embeds[curPage]], components: [new ActionRowBuilder().addComponents( but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
        } else if(b.customId === 'Cuối_cùng') {
            curPage = embeds.length - 1;
            await sendMsg.edit({ embeds: [embeds[curPage]], components: [new ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(true), but5.setDisabled(true) )] });
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
/*==================================
# Click Buttons
==================================*/
const clickBtn = async function(interaction, options = []) {
	if(interaction.isButton()) {
    try {
      if (interaction.customId.startsWith('role-')) {
				await interaction.deferUpdate({ ephemeral: true })
				let rle = interaction.customId.replace('role-', '')
				let real = interaction.guild.roles.cache.find((r) => r.id === rle);
				if(!real) { 
          return;
        } else {
					if(interaction.member.roles.cache.find((r) => r.id === real.id)) {
						interaction.followUp({ content: `${localize.default.Language_Changer('Modules.Functions.Addrole.addrole_1', { addrole__1: real })}`, ephemeral: true })
						interaction.member.roles.remove(real).catch((err) => interaction.message.channel.send({ content: localize.default.Language_Changer('Modules.Functions.Addrole.error_addrole'), ephemeral: true }));
					} else {
						interaction.followUp({ content: `${localize.default.Language_Changer('Modules.Functions.Addrole.addrole_2', {  
              addrole__2: real,
              addrole__3: real.id
            })}`, ephemeral: true });
						interaction.member.roles.add(real).catch((err) => interaction.message.channel.send({ content: localize.default.Language_Changer('Modules.Functions.Addrole.error_addrole'), ephemeral: true }));
					};
				};
      };
    } catch(error) {
      console.log(error);
    };
  };
  /*---------------------
  # Events Bắt buộc khi sử dụng BtnRole
  const { clickBtn } = require("blackcat-club");
  client.on("interactionCreate", interaction => {
     clickBtn(interaction);
  });
  ---------------------*/
};
/*==================================
# Cập nhật/thêm role tự động cho thành viên mới gia nhập
==================================*/
const AddRoles = function(member, role = {}) {
  if(!member.guild) return;
  let roles = role.Roles;
  for(let i = 0; i < roles.length; i++ )
  member.roles.add(roles[i]).then(() => {
    console.log(`Đã thêm role ${role.Roles} cho thành viên`.blue);
  }).catch((ex) => {});
  /*-------------------------
  # Tự động thêm role khi có thành viên mới vào máy chủ
  # Automatically add role when new members join the server
  # Thí dụ: 
  const { AddRoles } = require("blackcat-club");
  client.on("guildMemberAdd", async(member) => {
      AddRoles(member, {
          Roles: ["Roles ID"],
      });
  });
  --------------------------*/
};
/*==================================
# add role with button 
==================================*/
const btnRole = async(client, message, options = []) => {
	try {
		if(!options.data) return console.log(`${localize.default.Language_Changer('Modules.Functions.Addrole.addrole_3')}`.red);
		if(!message.member.permissions.has('Administrator')) return message.reply(localize.default.Language_Changer('Modules.Functions.Addrole.addrole_4'));
		let row = []
		let data = options.data
    var button;
    const btnroleengin = async(data, button, row) => {
			let current = 0
			for (let i = 0; i < data.length; i++) {
				if(button[current].length === 5) current++
				let role = message.guild.roles.cache.find((r) => r.id === data[i].role)
				let emoji = data[i].emoji || null
				let clr = data[i].color || 'Secondary'
				if(data[i].color === 'grey') {
					data[i].color = 'Secondary'
				} else if(data[i].color === 'red') {
					data[i].color = 'Danger'
				} else if(data[i].color === 'green') {
					data[i].color = 'Success'
				} else if(data[i].color === 'blurple') {
					data[i].color = 'Primary'
				};
				let label = data[i].label || role.name;
				button[current].push(createButton(label, role, clr, emoji))
				if(i === data.length - 1) {
					for (let btn of button) row.push(addRow(btn))
				};
      }
			if(!options.embed) return console.log(`${localize.default.Language_Changer('Modules.Functions.Addrole.addrole_5')}`.red);
			let emb = options.embed;
			if(message.commandId) {
				message.followUp({ embeds: [emb], components: row }).catch((ex) => {});
			} else if(!message.commandId) {
				message.channel.send({ embeds: [emb], components: row }).catch((ex) => {});
			};
			function addRow(btns) {
				let row1 = new ActionRowBuilder()
				for (let btn of btns) {
					row1.addComponents(btn)
				};
				return row1;
			};
			function createButton(label, role, color, emoji) {
        try {
          if (!emoji || emoji === null) {
					  const btn = new ButtonBuilder().setLabel(label).setStyle(color).setCustomId('role-' + role.id)
			  	  return btn
				  } else if (emoji && emoji !== null) {
				   	const btn = new ButtonBuilder().setLabel(label).setStyle(color).setCustomId('role-' + role.id).setEmoji(emoji)
				  	return btn
				  };
        } catch(error) {
          console.log(`${localize.default.Language_Changer('Modules.Functions.Addrole.addrole_7')}`.red)
        };
			};
		};
		if (data.length <= 5) {
			button = new Array([])
			btnroleengin(data, button, row)
		} else if (data.length > 5 && data.length <= 10) {
			button = new Array([], [])
			btnroleengin(data, button, row)
		} else if (data.length > 11 && data.length <= 15) {
			button = new Array([], [], [])
			btnroleengin(data, button, row)
		} else if (data.length > 16 && data.length <= 20) {
			button = new Array([], [], [], [])
			btnroleengin(data, button, row)
		} else if (data.length > 21 && data.length <= 25) {
			button = new Array([], [], [], [], [])
			btnroleengin(data, button, row)
		} else if (data.length > 25) {
			console.log(`${localize.default.Language_Changer('Modules.Functions.Addrole.addrole_6')}`.red);
		};
	} catch (err) {
		console.log(`btnrole err => ${err.stack}`.red)
	}
  /*----------------------------------------------
  # Yêu cầu / require
    const { clickBtn, btnRole } = require("blackcat-club");
    // InteractionCreate Events
    client.on("interactionCreate", interaction => {
        clickBtn(interaction);
    });
  # sau đó / then
    // Commands
    const embed = new EmbedBuilder().setTitle("Chọn role mong muốn");
    // defined: btnRole in blackcat-club
    // NOTE: khi bị trùng id role thì lệnh sẽ không được thực thi
    btnRole(client, message, {
      embed: embed,
      data: [
        { role: "Idrole_1", label: "name role", color: "Danger", emoji: "😵‍💫" },
        { role: "Idrole_2", label: "name role", color: "Danger", emoji: "🦊" },
      ]
    });
  ----------------------------------------------*/
}
/*==================================
# Thiết lập cài đăt, còn cập nhật thêm
==================================*/
const Du_lieu = require("mongoose");
const setup = (setup) => {
    Du_lieu.connect(setup.setMongoURL, {
		  useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
	  }).then(() => {
      console.log("Kết nối Mongodb thành công".green);
    }).catch((e) => {
      console.log("đã sảy ra lỗi khi kết nối mongodb".red);
    });
    localize.default.loadFromLocale(setup.setLanguage);
    NewUpdate(setup.setNewUpdate);
};
/*==================================
# 
==================================*/
module.exports = { setup, AddRoles, NewUpdate, clickBtn, btnRole, EmbedPages };