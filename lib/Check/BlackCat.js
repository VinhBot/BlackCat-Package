const { BlackCat, AddRoles, consoles: example, LanguageP, GatewayIntentBits, Partials, Game: { SnakeGame, ConnectFour } } = require("../../BlackCat");
const client = new BlackCat(process.env.token);
// language 
LanguageP({ language: "vi" });
// 
client.on("ready", () => {
    console.log(`${client.user.username}`.red + ` Sẵn sàng hoạt động`.blue)
});
client.on("messageCreate", async(message) => {
  if (message.author.bot || !message.inGuild()) return;
	if (!message.content.startsWith("!")) return;
	const args = message.content.slice("!".length).trim().split(/ +/g);
	const command = args.shift();
  if(command === "snake") {
    const snake =  new SnakeGame({
         message: message,
         slash_command: false,
         embed: {
           title: 'Snake',
           color: "#FFFB00",
           footer: "blackcat",
           overTitle: 'end game',
         },
         snake: { 
           head: '😋', // đầu rắn
           body: '🟦', // thân rắn
           tail: '🔹', // đuôi rắn
           over: '💀' // chết
         },
         emojis: { board: '⬛',  food: '🍔', up: '🔼',  right: '▶️', down: '🔽', left: '◀️', },
         foods: ['🍎', '🍇', '🍊', "🍕", "🍔", "🥪", "🥙", "🥗", "🥐", "🍿", "🥓", "🌯", "🍗", "🥟"], // thức ăn 
         stopButton: `Dừng Chơi`,
    })
    snake.startGame();
  } else if(command === "connect4") {
    const game = new ConnectFour({
      message: message, // message = message
      player1: '🔴', // người chơi 1
      player2: '🔞', // người chơi 2 
    });
    game.start()
  }  
});
["setups"].forEach(Blackcat => {
      require(`./Handlers/${Blackcat}`)(client);
});