![Demo](https://i.pinimg.com/originals/7e/98/ba/7e98bac9f004c0c2ecaa7cd22980ce4c.gif)

# <p align="center">BlackCat-Economy</p>
# Start
```js
const { Commands: { Economy }} = require("blackcat-club");
client.cs = new Economy(); // Obligatory 
const { vietnam, setMaxWalletAmount, setDefaultBankAmount, setMaxBankAmount, setDefaultWalletAmount } = client.cs; //Obligatory //helps to shorten the code time
client.donvitiente = vietnam; // Vietnam is subject to change // Vietnam is the currency of Vietnam according to the exchange rate VND
// Set Default Bank Amount when new user is created!
setDefaultBankAmount(1000); // Bank // Obligatory
setDefaultWalletAmount(1000); // wallet // Obligatory
// Its bank space limit (can be changed per user) here 0 means infinite.
setMaxBankAmount(10000); // Obligatory
// Set the default maximum amount of wallet currency a user can have! (may vary per user) here 0 means infinite
setMaxWalletAmount(10000); // bắt buộc
```
## Currency unit
```js
// commands 
${await client.donvitiente( code... )}
// example 
// money = amount 
${await client.donvitiente(money)}
```
![Demo](https://raw.githubusercontent.com/VinhBot/blackcat-Package/main/Preview/donvitiente.jpg)

+ `Applies to each server`
```js
guild: message.guild,
```
+ `Applies to all participating server bots`
```js
guild: { id : null } 
```

## AddItem 💴
+ `Description: add item to shopee`
```js
    message.reply({ content: 'What should the item name be?'});
    let Name = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });

    message.reply({ content: 'What should its price be??' });
    let Price = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
    message.reply({ content: 'What should its description be?' });
    let description = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
    let result = await client.cs.addItem({
        guild: { id : null },
        inventory: {
            name: Name.first().content,
            price: parseInt(Price.first().content),
            description: description.first().content
        }
    });
    if (result.error) {
        if (result.type == 'No-Inventory-Name') return message.reply({ content: 'An error has occurred, Please enter the item name to correct the error.!'})
        if (result.type == 'Invalid-Inventory-Price') return message.reply({ content: 'An error occurred, the price is not valid!' })
        if (result.type == 'No-Inventory-Price') return message.reply({ content: 'An error occurred, You did not specify a price!' })
        if (result.type == 'No-Inventory') return message.reply({ contemt: 'An error occurred, No data received!' })
    } else { 
        message.reply({ content: `Làm xong! Add to public ${Name.first().Content} enter the store!` })
    };
```
# <p align="center">`Please translate the command yourself`</p>

## Addmoney 💴
+ `Description: Extra money for members`
```js
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.guild.members.cache.get(args[0]);
      if (user) user = user.user;;
    } else if (!args[0]) {
      return message.channel.send({ content: "Chỉ định một người dùng!" });
    }
    let wheretoPutMoney = args[2] || "ví tiền"; 
    let amount = parseInt(args[1]);
    if (!amount) return message.reply({ content: "Nhập số tiền để thêm." });
    let money = parseInt(amount);
    let result = await client.cs.addMoney({
       user: user,
       guild: {
          id : null
       },
       amount: money,
       wheretoPutMoney: wheretoPutMoney
    });
    if (result.error) return message.reply({ content: "Bạn không thể thêm tiền âm" });
    else message.reply({ content: `Thêm thành công ${money} cho ${user.username}, ( vào ${wheretoPutMoney} )` })
```
## Banknote 💴 
+ `Description: A way to increase your bank limit`
```js
    const arr = await client.cs.getUserItemscs.getUserItems({
        user: message.user,
        guild: message.guild.id
    });
    if (!arr.inventory.length) return message.reply("Bạn không có bất kỳ tiền giấy nào!");
    for (i in arr.inventory) {
        if (arr.inventory[i].name.toLowerCase().includes('banknote')) {
            i++
            const removeItem = await client.cs.removeUserItem({
                user: message.user,
                item: i,
                guild: message.guild.id
            });
            if (removeItem.error) {
                console.log('Bot đã cố gắng xóa số mục ' + i)
                return message.reply("Đã xảy ra lỗi không xác định, xem bảng điều khiển.")
            };
            const ToincreasedAmount = 5000 + removeItem.rawData.bankSpace;
            const result = await client.cs.setBankSpacecs.setBankSpace(message.user.id, message.guild.id, ToincreasedAmount);
            if (!result.error) return message.reply(`Đặt thành công Hạn mức ngân hàng thành ${result.amount}`);
            else return message.reply(`Xuất hiện lỗi: ${result.error}`);
        } else {
          return message.reply("Vui lòng mua hàng trước!")
        }
```
## Balance 💴
+ `Description: A way to know the amount in your wallet and bank.`
```js
 let result = await client.cs.balance({
    user: message.user.id,
    guild: message.guild.id
  });
  return message.reply(`${user.tag}, có ${(result.wallet).toLocaleString()} trong ví và ${(result.bank).toLocaleString()} trong ngân hàng. Tại đó Ngân hàng tối đa đã được đặt thành ${(result.rawData.bankSpace.toLocaleString())}`);
```
## Beg 💴
+ `Description: a way to make money, begging`
```js
    let result = await client.cs.beg({
        user: message.user,
        guild: message.guild,
        minAmount: 100,
        maxAmount: 400,
        cooldown: 10 // 60 seconds

    });
    if (result.error) return message.reply(`Gần đây bạn đã cầu xin Hãy thử lại sau ${result.time}`);
    else message.reply(`Bạn đã kiếm được: ${result.amount}.`)
```
## BulkAddMoney 💴
+ `Description: A way to add money in people's bank or wallet`
```js
    if(!args[0]) return message.reply("vui lòng nhập số tiền");
    let wheretoPutMoney = args[0];
    if (wheretoPutMoney) wheretoPutMoney = 'bank';
    else wheretoPutMoney = 'wallet';
    let amount = args.get('amount')
    let money = parseInt(amount);
    let result = await client.cs.addMoneyToAllUsers({
        guild: message.guild.id,
        amount: money,
        wheretoPutMoney: wheretoPutMoney
    });
    if (result.error) {
        if (result.type === 'negative-money') return message.reply("Bạn không thể thêm tiền âm");
        else return message.reply('Không tìm thấy người dùng');
    } else message.reply(`Thêm thành công ${money} cho ${result.rawData.length} Mọi người!, ( Trong ${wheretoPutMoney} )`)
```
## Buy 💴 
+ `Description: A way to buy from the store`
```js
    let thing = args[0].value
    if (!thing) return message.reply('Vui lòng cung cấp số mặt hàng')
    if (isNaN(thing)) return message.reply('Vui lòng cung cấp số mặt hàng hợp lệ')
    let result = await client.cs.buy({
        user: message.user,
        guild: message.guild,
        item: parseInt(args[0].value)
    });
    if (result.error) {
        if (result.type === 'No-Item') return message.reply('Vui lòng cung cấp số mặt hàng hợp lệ');
        if (result.type === 'Invalid-Item') return message.reply('mục không tồn tại');
        if (result.type === 'low-money') return message.reply(`**Bạn không có đủ số dư để mua mặt hàng này!**`);
    } else return message.reply(`**Đã mua thành công  \`${result.inventory.name}\` với ${result.inventory.price}**`)
```
## Daily 💴 
+ `Description: A way to make money`
```js
    let result = await client.cs.daily({
        user: message.user,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.reply(`Gần đây bạn đã sử dụng hàng ngày Hãy thử lại sau ${result.time}`);
    else message.reply(`Bạn đã kiếm được ${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.daily}`);
```
## Deposite 💴
+ `Description: A way to get money in the bank`
```js
   let money = args[0].value
   if (!money) return message.reply("Nhập số tiền bạn muốn gửi.");
   let result = await client.cs.deposite({
      user: message.user,
      guild: message.guild,
      amount: money
   });
   if (result.error) {
     if (result.type === 'money') return message.reply("Chỉ định số tiền để gửi");
     if (result.type === 'negative-money') return message.reply("Bạn không thể gửi tiền âm");
     if (result.type === 'low-money') return message.reply("Bạn không có nhiều tiền trong ví.");
     if (result.type === 'no-money') return message.reply("Bạn không có tiền để gửi");
     if (result.type === 'bank-full') return message.reply("Ngân hàng của bạn đã đầy. Nó đã đạt đến giới hạn của nó.");
  } else {
     if (result.type === 'all-success') return message.reply("Bạn đã gửi tất cả tiền vào ngân hàng của mình" + `\nBây giờ bạn $${result.rawData.wallet} Trong ví của bạn và $${result.rawData.bank} trong ngân hàng của bạn.`);
     if (result.type === 'success') return message.reply(`Bạn đã gửi tiền ${result.amount} tiền vào ngân hàng của bạn.\nBây giờ bạn có $${result.rawData.wallet} Trong ví của bạn và $${result.rawData.bank} trong ngân hàng của bạn.`);
  };
```
## Gameble 💴
+ `Description: An effective way to double your money`
```js
  let money = args[0].value
  if (isNaN(money)) return message.reply("Số tiền không phải là một con số.");
  let result = await client.cs.gamble({
            user: message.user,
            guild: message.guild,
            amount: money,
            minAmount: 1,
            cooldown: 25 //25 seconds
  });
  if (result.error) {
    if (result.type == 'amount') return message.reply("Vui lòng điền một số tiền trước.");
    if (result.type == 'nan') return message.reply("Số tiền không phải là một con số.");
    if (result.type == 'low-money') return message.reply(`Bạn không có đủ tiền. Bạn cần thêm ${result.neededMoney}$ nữa để thực hiện hành động. `);
    if (result.type == 'gamble-limit') return message.reply(`Bạn không có đủ tiền để đánh bạc. Mức tối thiểu là $${result.minAmount}.`);
    if (result.type == 'time') return message.reply(`Wooo quá nhanh. Bạn cần đợi **${result.second}** giây trước khi có thể đánh bạc lại.`);
  } else {
    if (result.type == 'lost') return message.reply(`Ahh, không. Bạn mất $${result.amount}. Bạn còn $${result.wallet}. Chúc may mắn lần sau.`);
    if (result.type == 'won') return message.reply(`Tuyệt vời! Bạn đã thắng $${result.amount}! Bạn đã $${result.wallet}. Chúc bạn vui vẻ!`);
  }
```
## GlobalLb 💴
+ `Description: the show's global rankings`
```js
  let data = await client.cs.globalLeaderboard();
  if (data.length < 1)
    return message.reply("Chưa có ai trong bảng xếp hạng toàn cầu.");
  const msg = new EmbedBuilder();
  let pos = 0;
  // This is to get the first 10 users )
  let arr = [];
  data.slice(0, 10).map((e) => {
    if (!client.users.cache.get(e.userID)) return;
    pos++;
    arr.push({ name: `${pos} - **${client.users.cache.get(e.userID).username}**`, value: `Trong ví: **${e.wallet}** - Ngân hàng: **${e.bank}**`, inline: true });
    msg.addFields(arr);
  });
  message.reply({ embeds: [msg] }).catch();
```
## Hafly 💴
+ `Description: a way to make money`
```js
    let result = await client.cs.hafly({
        user: message.user,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.reply(`Gần đây, bạn đã sử dụng hafly Hãy thử lại sau ${result.time}`);
    else return message.reply(`Bạn đã kiếm được $${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.hafly}`);
```
## hourly 💴
+ `Description: a way to make money by the hour`
```js
    let result = await client.cs.hourly({
        user: message.user,
        guild: message.guild,
        amount: 100,
    });
    if (result.error) return message.reply(`Bạn đã sử dụng hàng giờ gần đây Hãy thử lại sau ${result.time}`);
    else return message.reply(`Bạn đã kiếm được $${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.hourly}`);
```
## Info 💴
+ `Description: An informative way to shop`
```js
    let result = await client.cs.info(message.user.id, message.guild.id);
    const embed = new EmbedBuilder()
        .setDescription('Thông tin về: ' + message.user.tag);
    let unUsed = '';
    let cantBeUsed = '';
    for (const [key, value] of result.info) {
        if (value.used) unUsed += `- ${key}\n`;
        else cantBeUsed += `- ${key} ( ${value.timeLeft} )\n`;
    }
    embed.addFields([
        { name: 'Các lệnh bạn có thể sử dụng:', value: unUsed || 'Không có' },
        { name: 'Các lệnh mà bạn không thể sử dụng:', value: cantBeUsed || 'Không có' },
    ])
    message.reply({ embeds: [embed] })
```
## Inventory 💴
+ `Description: A way to view inventory`
```js
  let result = await client.cs.getUserItems({
    user: message.author,
    guild: message.guild,
  });
  let inv = result.inventory.slice(0, 10);
  const embed = new EmbedBuilder().setDescription("Khoảng không quảng cáo của bạn đang trống!");
  let arr = [];
  for (key of inv) {
    arr.push({ name: `**${key.name}:**`, value: `Số lượng: ${key.amount}` });
    embed.setDescription("Khoảng không quảng cáo của bạn!");
  }
  embed.addFields(arr);
  return message.reply({ embeds: [embed] });
```
## Leaderboard 💴 
+ `Description: guild leaderboard`
```js
  let data = await client.cs.leaderboard(message.guild.id);
  if (data.length < 1) return message.reply("Chưa có ai trong bảng xếp hạng.");
  const msg = new EmbedBuilder();
  let pos = 0;
  // This is to get the first 10 users)
  let arr = [];
  data.slice(0, 10).map((e) => {
    if (!client.users.cache.get(e.userID)) return;
    pos++;
    arr.push({
      name: `${pos} - **${client.users.cache.get(e.userID).username}**`,
      value: `Wallet: **${e.wallet}** - Bank: **${e.bank}**`,
      inline: true,
    });
  });
  msg.addFields(arr);
  message.reply({ embeds: [msg] }).catch();
```
## Monthly 💴
+ `Description: a way to make money every month`
```js
    let result = await client.cs.monthly({
        user: message.user,
        guild: message.guild,
        amount: 6000,

    });
    if (result.error) return message.reply(`Gần đây bạn đã sử dụng hàng tháng Hãy thử lại sau ${result.time}`);
    else message.reply(`Bạn đã kiếm được $${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.monthly}`);
```
## Quaterly 💴
+ `Description: a way to make money, quarterly`
```js
    let result = await client.cs.quaterly({
        user: message.user,
        guild: message.guild,
        amount: 100,
    });
    if (result.error) return message.reply(`Bạn đã sử dụng thứ tư gần đây Hãy thử lại sau ${result.time}`);
    else message.reply(`Bạn đã kiếm được $${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.quaterly}`);
```
## RemoveMoney 💴
+ `Description: A way to remove money from bank or wallet`
```js
       let user;
       if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
           user = message.guild.members.cache.get(args[0]);
           if (user) user = user.user;;
        } else if (!args[0]) {
             return message.reply({ content: "Chỉ định một người dùng!"});
        }
        let wheretoPutMoney = args[2] || "wallet"; 
        let amount = args[1];
        if (!amount) return message.reply({ content: "Nhập số tiền để Xóa."});
        let result = await client.cs.removeMoney({
           user: user,
           guild: { id: null},
           amount: amount,
           wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.reply({ content:"Bạn không thể xóa tiền tiêu cực"});
        else message.reply({ content: `Đã xóa thành công tất cả tiền khỏi ${user.username}, ( bằng ${wheretoPutMoney})`})
```
## Removeitem 💴
+ `Description: A way to get rid of Shopping Items`
 ```js
 if (!args[0].value) return message.reply('Mục nào cần loại bỏ?')
    let result = await client .cs.removeItem({
        guild: message.guild,
        item: parseInt(args[0].value)
    });
    if (result.error) {
        if (result.type == 'Invalid-Item-Number') return message.reply('Đã xảy ra lỗi, Vui lòng nhập số mục để loại bỏ.!')
        if (result.type == 'Unknown-Item') return message.reply('Đã xảy ra lỗi, Mục không tồn tại!')
    } else message.reply('Xong! Đã xóa thành công `' + result.inventory.name + '` từ cửa hàng!')
```
## Rob 💴 
+ `Description: A way to make money`
```js
    let user = args[0].user
    if (user.bot || user === client.user) return message.reply("Người dùng này là một bot.");
    if (!user) return message.reply('Xin lỗi, bạn đã quên đề cập đến ai đó.');
    let result = await client.cs.rob({
            user: message.user,
            user2: user,
            guild: message.guild,
            minAmount: 100,
            successPercentage: 5,
            cooldown: 25, //25 seconds,
            maxRob: 1000
     });
    if (result.error) {
      if (result.type === 'time') return message.reply(`Gần đây bạn đã bị cướp. Hãy thử lại trong ${result.time}`);
      if (result.type === 'low-money') return message.reply(`Bạn cần ít nhất $${result.minAmount} để cướp ai đó.`);
      if (result.type === 'low-wallet') return message.reply(`${result.user2.username} có ít hơn $${result.minAmount} để cướp.`)
      if (result.type === 'caught') return message.reply(`${message.user.username} bạn đã cướp ${result.user2.username} và bị bắt và bạn đã trả tiền ${result.amount} cho ${result.user2.username}!`)
   } else {
     if (result.type === 'success') return message.reply(`${message.user.username} bạn đã cướp ${result.user2.username} và bỏ trốn ${result.amount}!`)
   }
```
## Sell 💴 
+ `Description: A way to sell items`
```js
    if (!args[0].value) return message.reply('Mục nào cần loại bỏ?')
    let result = await client .cs.removeUserItem({
        user: message.user,
        guild: message.guild,
        item: parseInt(args[0].value)
    });
    if (result.error) {
        if (result.type == 'Invalid-Item-Number') return message.reply('Đã xảy ra lỗi, Vui lòng nhập số mục để loại bỏ.!')
        if (result.type == 'Unknown-Item') return message.reply('Đã xảy ra lỗi, Mục không tồn tại!')
    } else message.reply('Xong! Đã bán thành công `' + result.inventory.name + '`! Bây giờ bạn có ' + result.inventory.amount + ' trong số những mặt hàng còn lại!')
```
## SetItem 💴
+ `Description: lightning added items to the shop`
```js
    client.cs.setItems({
        guild: message.guild,
        shop: [{
            name: 'Watch',
            price: 20
        }, {
            name: 'Rolex',
            price: 1230
        }]
    });
    return message.reply('oke!!')
```
## Shop 💴
+ `Description: see what's in the store`
```js
  let result = await client.cs.getShopItems({ guild: message.guild });
  let inv = result.inventory;
  const embed = new EmbedBuilder().setDescription("Shop!");
  let arr = [];
  for (let key in inv) {
    arr.push({name: `${parseInt(key) + 1} - **${inv[key].name}:** vì $${inv[key].price}`, value: "mô tả: " + inv[key].description});
  }
  embed.addFields(arr);
  message.reply({embeds: [embed],});
```
## Slots 💴 🎰
+ `Description: fun game play`
```js
    const ifLostmoney = 5000;
    const user = await client.cs.findUsercs.findUser({
        user: message.user.id,
        guild: message.guild.id
    });
    if (user.wallet < ifLostmoney) return message.channel.send(`Bạn không có đủ tiền để chơi trò chơi này. Bạn cần $${Math.abs(user.wallet - ifLostmoney)} để chơi.`);
    const slotemoji = ":money_mouth:"; // Bạn thậm chí có thể sử dụng biểu tượng cảm xúc động!
    let items = ['💵', '💍', '💯'];
    
    let $ = items[Math.floor(items.length * Math.random())];
    let $$ = items[Math.floor(items.length * Math.random())];
    let $$$ = items[Math.floor(items.length * Math.random())];
    
    const play = new EmbedBuilder()
        .setTitle("máy đánh bạc")
        .setDescription("• " + slotemoji + "  " + slotemoji + "  " + slotemoji + " •")
        .setColor(0x00AE86)
        .setFooter({text:"Bạn có may mắn không?"})
    const $1 = new EmbedBuilder()
        .setTitle("máy đánh bạc")
        .setDescription("• " + $ + "  " + slotemoji + "  " + slotemoji + " •")
        .setColor(0x00AE86)
        .setFooter({text:"Bạn có may mắn không?"})
    const $2 = new EmbedBuilder()
        .setTitle("máy đánh bạc")
        .setDescription("• " + $ + "  " + $$ + "  " + slotemoji + " •")
        .setColor(0x00AE86)
        .setFooter({text:"Bạn có may mắn không?"})
    const $3 = new EmbedBuilder()
        .setTitle("máy đánh bạc")
        .setDescription("• " + $ + "  " + $$ + "  " + $$$ + " •")
        .setColor(0x00AE86)
        .setFooter({text:"Bạn có may mắn không?"})

    await message.deferReply();
    message.followUp({ embeds: [play] });
    setTimeout(() => {
        message.editReply({ embeds: [$1] });
    }, 600);
    setTimeout(() => {
        message.editReply({ embeds: [$2] });
    }, 1200);
    setTimeout(() => {
        message.editReply({ embeds: [$3] });
    }, 1800);

    /* DEDUCT RESULTS */
    if ($$ !== $ && $$ !== $$$) {
        setTimeout(async () => {
            let result = await client .cs.removeMoney({
                user: message.user,
                guild: message.guild, // { id: null }
                amount: ifLostmoney,
            });
            message.followUp(`Chết tiệt, ${message.user.tag} bạn đã mất $${money}! Bạn hiện có $${result.rawData.wallet} trong ví của mình!`);
        }, 3000);

    } else if ($ === $$ && $ === $$$) {
        setTimeout(async () => {
            const money = 10000;
            let result = await client .cs.addMoney({
                user: message.user,
                guild: message.guild, // { id: null }
                amount: money,
            });
            message.followUp(`Xin chúc mừng, ${message.user.tag} bạn đã thắng $${money}! Bạn hiện có $${result.rawData.wallet} trong ví của mình!`);
        }, 3000);

    } else {
        message.followUp("2 khe bằng nhau ... Bạn đã gần nhưng bạn đã mất! Bạn không giành được gì!")
    }
```
## Give money 💴
+ `Description: a way to transfer money to members`
```js
       let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = await message.guild.members.fetch(args[0]);
            if (user) user = user.user;
        };
        if (!user) return message.reply({ content: `vui lòng cung cấp người dùng` });

        if (user.bot || user === client.user) return message.reply({ content: `Bạn không thể chuyển tiền cho bots` });
        if (!client.users.cache.get(user.id) || !user) return message.reply({ content: ` Bạn quên đề cập tới ai đó` });

        let amount = args[1];
        if (!amount) return message.reply({ content: `vui lòng nhập số tiền bạn muốn gởi` });
        if (amount.includes("-")) return message.reply({ content: `Bạn không thể gửi tiền âm` })
        let money = parseInt(amount);

        let result = await client.cs.transferMoney({
            user: message.author,
            user2: user,
            guild: { id : null },
            amount: money
        });
        if (result.error) return message.reply({ content: `Bạn không có đủ tiền trong ví của mình` });
        else message.reply({ content: `**${message.author.username}**, đã chuyển thành công **${await client.cs.vietnam(result.money)}** cho **${result.user2.username}**` }) 
```
## Use 💴
+ `Description: use item`
```js
let item = args[0].value;
    if (!item) return message.reply("Bạn muốn sử dụng mặt hàng nào?")
    if (parseInt(item)) return message.reply("Vui lòng sử dụng tên của mặt hàng, không phải ID.")
    let haveItem = false;
    const arr = await  client .cs.getUserItemscs.getUserItems({
        user: message.user,
        guild: message.guild,
    });
    let i;
    for (key in arr.inventory) {
        if (arr.inventory[key].name.toLowerCase().includes(item.toLowerCase())) haveItem = true
        i = key;
    };
    if (haveItem) {
        let money = Math.floor((Math.random() * 10) + 1) * 100 // 100 - 1000
        let result = await client. cs.addMoney({
            user: message.user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: 'wallet'
        });
        let r2 = await client .cs.removeUserItem({
            user: message.user,
            guild: message.guild,
            item: i + 1
        });
        if (result.error || r2.error) {
            console.log(result);
            console.log(r2);
            return message.reply("Unknown error occured see console.")
        } else return message.reply("You've used " + item + " and earned $" + money)

    } else return message.reply("Please buy the item first!")
```
## Weekly 💴
+ `Description: a way to make money, weekly`
```js
    let result = await client.cs.weekly({
        user: message.user,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.reply(`Gần đây bạn đã sử dụng hàng tuần Hãy thử lại sau ${result.time}`);
    else message.reply(`Bạn đã kiếm được $${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.weekly}`);
```
## Withdraw 💴
+ `Description: withdraw money to wallet`
```js
       let money = args[0].value
        if (!money) return message.reply("Nhập số tiền bạn muốn rút.");

        let result = await client.cs.withdraw({
            user: message.user,
            guild: message.guild,
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.reply("Chỉ định số tiền để rút")
            if (result.type === 'negative-money') return message.reply("Bạn không thể rút tiền âm, vui lòng sử dụng lệnh gửi tiền")
            if (result.type === 'low-money') return message.reply("Bạn không có nhiều tiền trong ngân hàng.")
            if (result.type === 'no-money') return message.reply("Bạn không có tiền để rút")
        } else {
            if (result.type === 'all-success') return message.reply("Bạn đã rút hết tiền từ ngân hàng của mình " + `\nBây giờ bạn đã $${result.rawData.wallet} trong ví và $${result.rawData.bank} trong ngân hàng của mình.`)
            if (result.type === 'success') return message.reply(`Bạn đã rút $${result.amount} tiền từ ngân hàng của mình.\nBây giờ bạn còn $${result.rawData.wallet} trong ví và $${result.rawData.bank} trong ngân hàng của mình.`)

        }
  ```
## Work 💴
+ `Description: a way to make money`
```js
    let result = await cs.work({
        user: message.user,
        guild: message.guild,
        maxAmount: 100,
        replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
        cooldown: 25 //25 Giây,
     });
     if (result.error) return message.reply(`Gần đây bạn đã làm việc Hãy thử lại sau ${result.time}`);
     else message.reply(`Bạn đã làm việc với tư cách là ${result.workType} và kiếm được $${result.amount}.`)
```
## Yearly 💴
+ `Description: a way to make money every year`
+ ```js
    let result = await client .cs.yearly({
        user: message.user,
        guild: message.guild,
        amount: 27000,

    });
    if (result.error) return message.reply(`Gần đây bạn đã sử dụng hàng năm Hãy thử lại trong ${result.time}`);
    else message.reply(`Bạn đã kiếm được $${result.amount}. Kỉ lục của bạn bây giờ là ${result.rawData.streak.yearly}`);
  ```
