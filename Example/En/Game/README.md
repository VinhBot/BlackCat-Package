<p align="center">
	<a href="https://www.facebook.com/BlackCat.2k3">
	<img src="https://camo.voz.tech/ee6526a020845971368d9843f7c96c8c9fb5c7fa/68747470733a2f2f692e696d6775722e636f6d2f3446476855756b2e676966/" width = "200" alt="TNT">
	</a>
</p>

# <p align="center">Game Commands</p>
`The game commands that the package supports, wish you a happy game`
# ConnectFour
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/Preview/connect4.jpg)
```js
const { Game: { ConnectFour }} = require("blackcat-club");

const game = new ConnectFour({
      message: message, // message = message
      player1: '🔴', // player 1
      player2: '🔞', // player 2 
})
game.start()
```
# SnakeGame
![Demo](https://raw.githubusercontent.com/VinhBot/BlackCat-Package/main/Preview/snake.jpg)
```js
const { Game: { SnakeGame }} = require("blackcat-club");

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
           head: '😋', // snake head
           body: '🟦', // snake body
           tail: '🔹', // snake tail
           over: '💀' // died
         },
         emojis: { board: '⬛',  food: '🍔', up: '🔼',  right: '▶️', down: '🔽', left: '◀️', },
         foods: ['🍎', '🍇', '🍊', "🍕", "🍔", "🥪", "🥙", "🥗", "🥐", "🍿", "🥓", "🌯", "🍗", "🥟"], // food 
         stopButton: `Stop`,
         othersMessage: `You are not allowed to use the buttons for this message`,
})
snake.startGame();
```