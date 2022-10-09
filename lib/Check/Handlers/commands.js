
async function messageAPI(client, message, config = {}) {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift();
  
  if(command === "cash") {
        let user = message.author;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = await message.guild.members.fetch(args[0]);
            if (user) user = user.user;
        }
        let result = await client.cs.balance({
            user: user,
            guild: { 
              id : null
            }
        });
      return message.reply(`${user.tag}, có ${await client.donvitiente(result.wallet)} trong ví và ${await client.donvitiente(result.bank)} trong ngân hàng`);
   };
};
module.exports = {messageAPI}