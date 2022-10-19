const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('../../Publish01/Events');
const { ComponentType } = require("../../Publish02/api");
const localize = require("../../LanguageP/localize");
/*===================================================================
=  const { Game: { RockPaperScissors }} = require("blackcat-club"); =
=  const game = new RockPaperScissors({                             =
=    message: message, // message = messageCreate 🦆;               =
=  });                                                              =
=  game.start();                                                    =
===================================================================*/
const RockPaperScissors = class {
  constructor(options) {
    if (!options.message) throw new TypeError(localize.default.Language_Changer('Modules.Game.rps.rps_1'));
    this.winMessage = options.Winmessage ? options.winMessage : localize.default.Language_Changer('Modules.Game.rps.rps_2');
    this.AI = options.AI ? options.AI : true;
    this.message = options.message;
    this.opponent = options.opponent || this.message.mentions.members.first();
    this.tieMessage = options.tieMessage ? options.tieMessage : localize.default.Language_Changer('Modules.Game.rps.rps_3');
    this.timeOutMessage = options.timeOutMessage ? options.timeOutMessage : localize.default.Language_Changer('Modules.Game.rps.rps_4');
  }
  async start() {
    let player1Choosed, player2Choosed, winner;      
    let button1 = new ButtonBuilder().setLabel("🪨").setCustomId(localize.default.Language_Changer('Modules.Game.rps.rps_6')).setStyle("Primary")
    let button2 = new ButtonBuilder().setLabel("🧻").setCustomId(localize.default.Language_Changer('Modules.Game.rps.rps_7')).setStyle("Primary")
    let button3 = new ButtonBuilder().setLabel("✂️").setCustomId(localize.default.Language_Changer('Modules.Game.rps.rps_8')).setStyle("Primary")
    const row = new ActionRowBuilder().addComponents(button1, button2, button3)
    if(!this.opponent && !this.AI) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.rps.rps_5') });
    if(!this.opponent && this.AI) {
      let msg = await this.message.channel.send({ embeds: [{ title: `${this.message.author.username} V/S BlackCat` }], components: [row]});
      let filter = i => { return i.user.id === this.message.author.id };
      msg.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000, max: 1, errors: ["time"]}).then(interaction => {
        let player1Choosed = interaction.customId
        let botChoosed = [
          localize.default.Language_Changer('Modules.Game.rps.rps_6'), 
          localize.default.Language_Changer('Modules.Game.rps.rps_7'),
          localize.default.Language_Changer('Modules.Game.rps.rps_8')
        ];
        player2Choosed = botChoosed[Math.floor(Math.random() * botChoosed.length)];
        if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8')) { winner = this.message.author.id;
        } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7')) { winner = this.message.author.id;
        } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6')) { winner = this.message.author.id;
        } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8')) { winner = "AI";
        } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6')) { winner = "AI";
        } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7')) { winner = "AI";
        };
        if(winner === "AI") {
          interaction.reply(this.winMessage.replace("{winner}", "AI"))
          msg.edit({embeds: [{ title: `${localize.default.Language_Changer('Modules.Game.rps.rps_9', {
            rps__1: player1Choosed,
            rps__2: player2Choosed
          })}`}], components: [] });
        } else if(winner === this.message.author.id) {
          interaction.reply(this.winMessage.replace("{winner}", this.message.author.username ));
          msg.edit({ embeds: [{title: localize.default.Language_Changer('Modules.Game.rps.rps_10', {
            rps__3: player1Choosed,
            rps__4: player2Choosed,
            rps__5: this.message.author.username
          })}], components: []});
        } else {
          interaction.reply(this.tieMessage)
          msg.edit({ embeds: [{title: localize.default.Language_Changer('Modules.Game.rps.rps_11', {
            rps__6: player1Choosed,
            rps__7: player2Choosed
          })}], components: []})
        };
      }).catch((e) => {
        this.message.channel.send(this.timeOutMessage);
        console.log(e);
      });
    } else if(this.opponent) {
       let msg = await this.message.channel.send({embeds: [{ title: `${this.message.author.username} V/S ${this.opponent.user.username}` }],  components: [row] });
       const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });
       collector.on('collect', (i) => {
         if(i.user.id === this.message.author.id || i.user.id === this.opponent.user.id) {
           if(i.user.id === this.message.author.id) {
             if(player1Choosed) return i.reply({content: localize.default.Language_Changer('Modules.Game.rps.rps_12'), ephemeral: true });
             player1Choosed = i.customId 
             i.reply({content: localize.default.Language_Changer('Modules.Game.rps.rps_13', {
               rps__8: i.customId
             }), ephemeral: true })
           } else {
             if(player2Choosed) return i.reply({content: localize.default.Language_Changer('Modules.Game.rps.rps_14'), ephemeral: true });
             player2Choosed = i.customId
             i.reply({ content: localize.default.Language_Changer('Modules.Game.rps.rps_15', {
               rps__9: i.customId
             }), ephemeral: true })
           };
           if(player1Choosed && player2Choosed) {
             if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8')){ winner = this.message.author.id
             } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7')) { winner = this.message.author.id;
             } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6')) { winner = this.message.author.id;
             } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8')) { winner = this.opponent.user.id;
             } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_8') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6')) { winner = this.opponent.user.id;
             } else if(player1Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_6') && player2Choosed === localize.default.Language_Changer('Modules.Game.rps.rps_7')) { winner = this.opponent.user.id;
             };
             if(winner === this.opponent.user.id) {
               this.message.reply(this.winMessage.replace("{winner}", this.opponent.user.username))
               msg.edit({embeds: [{ title: localize.default.Language_Changer('Modules.Game.rps.rps_16', {
                 rps__10: this.message.author.username,
                 rps__11: player1Choosed,
                 rps__12: this.opponent.user.username,
                 rps__13: player2Choosed,
                 rps__14: this.opponent.user.username
               })}], components: [] });
             } else if(winner === this.message.author.id) {
               this.message.reply(this.winMessage.replace("{winner}", this.message.author.username ))
               msg.edit({embeds: [{title: localize.default.Language_Changer('Modules.Game.rps.rps_16', {
                 rps__10: this.message.author.username,
                 rps__11: player1Choosed,
                 rps__12: this.opponent.user.username,
                 rps__13: player2Choosed,
                 rps__14: this.opponent.user.username
               })}], components: []});
             } else {
               this.message.reply(this.tieMessage)
               msg.edit({embeds: [{ title: localize.default.Language_Changer('Modules.Game.rps.rps_17',{
                 rps__15: this.message.author.username,
                 rps__16: player1Choosed,
                 rps__17: this.opponent.user.username,
                 rps__18: player2Choosed
               })}], components: [] });
             };
           };
         } else {
           i.reply({ content: localize.default.Language_Changer('Modules.Game.rps.rps_18'), ephemeral: true });
         };
      });
      collector.on('end', (collected) => {
        msg.edit({ embeds: [{ title: localize.default.Language_Changer('Modules.Game.rps.rps_19')}] });
      });
    };
  };
};

module.exports = RockPaperScissors;