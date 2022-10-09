'use strict'; 
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("./MessageOptions");
module.exports = async function EmbedPages(message, embeds, style = {}) {
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
            if (curPage !== embeds.length - 1) {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [new ActionRowBuilder().addComponents( but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(false), but5.setDisabled(false))] });
            } else {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [ new ActionRowBuilder().addComponents(but1.setDisabled(false), but2.setDisabled(false), but3.setDisabled(false), but4.setDisabled(true), but5.setDisabled(true))] });
            };
        } else if(b.customId === 'Trước') {
            curPage--;
            if (curPage !== 0) {
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
            if (sendMsg.editable) {
                await sendMsg.edit({ embeds: [embeds[curPage]], components: [row] });
            };
        });
    });
};