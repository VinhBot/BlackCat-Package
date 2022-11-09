var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => { for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });};
var __copyProps = (to, from, except, desc) => { if (from && typeof from === "object" || typeof from === "function") { for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });}; return to; };
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) { function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }; return new (P || (P = Promise))(function (resolve, reject) { function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); }; }; function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); }; }; function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); } step((generator = generator.apply(thisArg, _arguments || [])).next());});};
var __importDefault = (this && this.__importDefault) || function (mod) { return (mod && mod.__esModule) ? mod : { "default": mod };};
/*========================================================
# Xác định các chức năng
========================================================*/
var src_exports = {};
__export(src_exports, {
  TicTacToe: () => TicTacToe,
  SnakeGame: () => SnakeGame,
  ConnectFour: () => ConnectFour,
  RockPaperScissors: () => RockPaperScissors,
});
module.exports = __toCommonJS(src_exports);
// import package
const localize = __importDefault(require("../../LanguageP/localize"));
const blackcat_club_1 = __importDefault(require("../../Resources/Discord"));
/*========================================================
# TicTacToe.js
========================================================*/
class TicTacToe {
    constructor(config) {
        this.config = config !== null && config !== void 0 ? config : {};
        this.eventHandler = new EventHandler();
        this.bot = new TicTacToeBot(this.config, this.eventHandler);
    }
    attach(client) {
        this.bot.attachToClient(client);
    }
    handleMessage(message) {
        this.bot.handleMessage(message);
    }
    handleInteraction(interaction) {
        this.bot.handleInteraction(interaction);
    }
    on(eventName, listener) {
        this.eventHandler.registerListener(eventName, listener);
    }
}
__name(TicTacToe, "TicTacToe");
// EventHandler.js
class EventHandler {
    constructor() {
        this.listeners = new Map();
        this.supportEvent('win');
        this.supportEvent('tie');
    }
    registerListener(eventName, callback) {
        const array = this.listeners.get(eventName);
        if (array) {
            array.push(callback);
        } else {
            throw new Error(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_22', {
              tictactoe__9: eventName
            }));
        }
    }
    emitEvent(eventName, data) {
        var _a;
        (_a = this.listeners.get(eventName)) === null || _a === void 0 ? void 0 : _a.forEach(listener => listener(data));
    }
    supportEvent(eventName) {
        this.listeners.set(eventName, []);
    }
}
__name(EventHandler, "EventHandler");
// Tictactoe Bot
class TicTacToeBot {
    constructor(configuration, eventHandler) {
        this._configuration = configuration;
        this._eventHandler = eventHandler;
        this.command = new GameCommand(new GameStateManager(this));
    }
    get configuration() {
        return this._configuration;
    }
    get eventHandler() {
        return this._eventHandler;
    }
    attachToClient(client) {
        const onReady = () => {
            var _a;
            if(client.application && this.configuration.command) {
                const register = new AppCommandRegister(client.application.commands, this.configuration.command, (_a = this.configuration.commandOptionName) !== null && _a !== void 0 ? _a : 'opponent');
                client.on('messageCreate', register.handleDeployMessage.bind(register));
                client.on('interactionCreate', this.command.handleInteraction.bind(this.command));
            }
            if (this.configuration.textCommand) {
                client.on('messageCreate', this.command.handleMessage.bind(this.command));
            }
        };
        if (client.readyAt) {
            onReady();
        } else {
            client.on('ready', onReady.bind(this));
        }
    }
    handleMessage(message) {
        this.command.handleMessage(message, true);
    }
    handleInteraction(interaction) {
        this.command.handleInteraction(interaction, true);
    }
}
__name(TicTacToeBot, "TicTacToeBot");
// AppCommandRegister
class AppCommandRegister {
    constructor(commandManager, name, optionName) {
        this.commandManager = commandManager;
        this.name = name;
        this.optionName = optionName;
    }
    handleDeployMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.guild && message.member && message.client.user && message.mentions.has(message.client.user) && message.member.permissions.has('Administrator')) {
                const words = message.content.split(' ');
                if (words.length === 2) {
                    if (words.includes('tttdeploy')) {
                        yield this.registerInGuild(message.guild.id);
                        yield message.reply(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_23', { tictactoe__10: this.name }));
                    } else if (words.includes('tttdelete')) {
                        const executed = yield this.deleteInGuild(message.guild.id);
                        if (executed) {
                            yield message.reply(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_24', { tictactoe__11: this.name }));
                        } else {
                            yield message.reply(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_25', { tictactoe__12: this.name }));
                        };
                    };
                };
            };
        });
    };
    registerInGuild(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commandManager.create({
                name: this.name,
                description: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_1'),
                options: [{ type: blackcat_club_1.ApplicationCommandOptionType.User, name: this.optionName, description: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_2') }]
            }, guildId);
        });
    };
    deleteInGuild(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = yield this.commandManager.fetch({ guildId });
            const command = commands === null || commands === void 0 ? void 0 : commands.find(cmd => cmd.name === this.name);
            if (command) {
                yield this.commandManager.delete(command.id, guildId);
                return true;
            } else {
                return false;
            };
        });
    };       
};
__name(AppCommandRegister, "AppCommandRegister");
// GameCommand
class GameCommand {
    constructor(manager) {
        this.manager = manager;
        this.config = manager.bot.configuration;
    }
    handleMessage(message, noTrigger = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (message.member && !message.author.bot && message.channel.isTextBased() && (noTrigger || (this.config.textCommand && message.content.startsWith(this.config.textCommand)))) {
                const tunnel = new TextMessagingTunnel(message);
                const invited = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
                return this.handleInvitation(tunnel, message.member, invited);
            }
        });
    }
    handleInteraction(interaction, noTrigger = false) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if ((interaction === null || interaction === void 0 ? void 0 : interaction.isChatInputCommand()) && interaction.inCachedGuild() && ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isTextBased()) && (noTrigger || interaction.commandName === this.config.command)) {
                const tunnel = new CommandInteractionMessagingTunnel(interaction);
                const member = yield interaction.member.fetch();
                const mentionned = (_c = interaction.options.getMember((_b = this.config.commandOptionName) !== null && _b !== void 0 ? _b : 'opponent')) !== null && _c !== void 0 ? _c : undefined;
                return this.handleInvitation(tunnel, member, mentionned);
            };
        });
    }
    handleInvitation(tunnel, inviter, invited) {
        return __awaiter(this, void 0, void 0, function*() {
            if (invited) {
                if (!invited.user.bot) {
                    if (inviter.user.id !== invited.user.id && invited.permissionsIn(tunnel.channel).has('ViewChannel')) {
                        if (!(yield this.manager.requestDuel(tunnel, invited))) {
                            yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_3') }, true);
                        }
                    } else {
                        yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_4', { username: invited.user.id })}, true);
                    };
                } else {
                    yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_5') }, true);
                };
            } else {
                if (!(yield this.manager.createGame(tunnel))) {
                    yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_3') }, true);
                };
            };
        });
    }
}
__name(GameCommand, "GameCommand");
// GameBoardBuilder
class GameBoardBuilder {
    constructor() {
        this.emojies = ['⬜', '🇽', '🅾️'];
        this.title = '';
        this.state = '';
        this.boardSize = 0;
        this.boardData = [];
    }
    withTitle(player1, player2) {
        this.title = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_6', { tictactoe__1: player1.displayName, tictactoe__2: player2.displayName }) + '\n\n';
        return this;
    }
    withEmojies(first, second) {
        this.emojies[1] = first;
        this.emojies[2] = second;
        return this;
    }
    withBoard(boardSize, board) {
        this.boardSize = boardSize;
        this.boardData = board;
        return this;
    }
    withEntityPlaying(entity) {
        if (entity instanceof AI) {
            this.state = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_7');
        } else if(!entity) {
            this.state = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_8');
        } else {
            this.state = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_9', { tictactoe__3: entity.toString() });
        }
        return this;
    }
    withEndingMessage(winner) {
        if (winner) {
            this.state = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_10', { 
              tictactoe__4: winner.toString()
            });
        } else {
            this.state = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_11');
        }
        return this;
    }
    toMessageOptions() {
        let board = '';
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            board += this.emojies[this.boardData[i]] + ' ';
            if ((i + 1) % this.boardSize === 0) {
                board += '\n';
            }
        }
        const state = this.state && board ? '\n' + this.state : this.state;
        return { allowedMentions: { parse: ['users'] }, content: this.title + board + state, components: [] };
    }
}
GameBoardBuilder.MOVE_REACTIONS = ['↖️', '⬆️', '↗️', '⬅️', '⏺️', '➡️', '↙️', '⬇️', '↘️'];
__name(GameBoardBuilder, "GameBoardBuilder")
class GameBoardButtonBuilder extends GameBoardBuilder {
    constructor() {
        super(...arguments);
        this.buttonLabels = ['X', 'O'];
        this.buttonStyles = [blackcat_club_1.ButtonStyle.Secondary, blackcat_club_1.ButtonStyle.Primary, blackcat_club_1.ButtonStyle.Danger];
        this.customEmojies = false;
        this.disableButtonsAfterUsed = false;
    }
    withButtonsDisabledAfterUse() {
        this.disableButtonsAfterUsed = true;
        return this;
    }
    withEntityPlaying(entity) {
        if (entity) {
            return super.withEntityPlaying(entity);
        } else {
            return this;
        }
    }
    withEmojies(first, second) {
        this.customEmojies = true;
        return super.withEmojies(first, second);
    }
    toMessageOptions() {
        return { content: this.title + this.state, components: [...Array(this.boardSize).keys()].map(row => new blackcat_club_1.ActionRowBuilder().addComponents([...Array(this.boardSize).keys()].map(col => this.createButton(row, col)))) };
    }
    createButton(row, col) {
        const button = new blackcat_club_1.ButtonBuilder();
        const buttonIndex = row * this.boardSize + col;
        const buttonData = this.boardData[buttonIndex];
        if (buttonData !== 0) {
            if (this.customEmojies) {
                button.setEmoji(this.emojies[buttonData]);
            } else {
                button.setLabel(this.buttonLabels[buttonData - 1]);
            }
            if (this.disableButtonsAfterUsed) {
                button.setDisabled(true);
            }
        } else {
            button.setLabel(' ');
        }
        return button.setCustomId(buttonIndex.toString()).setStyle(this.buttonStyles[buttonData]);
    }
}
__name(GameBoardButtonBuilder, "GameBoardButtonBuilder");
// DuelRequest
class DuelRequest {
    constructor(manager, tunnel, invited, expireTime, useReactions) {
        this.manager = manager;
        this.tunnel = tunnel;
        this.invited = invited;
        this.expireTime = expireTime !== null && expireTime !== void 0 ? expireTime : 60;
        this.useReactions = useReactions !== null && useReactions !== void 0 ? useReactions : false;
    }
    get content() {
        const content = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_12', { tictactoe__5: this.tunnel.author.displayName }) + '\n' + localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_13');
        const buttonYes = new blackcat_club_1.ButtonBuilder().setStyle(blackcat_club_1.ButtonStyle.Success).setCustomId('yes').setLabel(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_14'));
        const buttonNo = new blackcat_club_1.ButtonBuilder().setStyle(blackcat_club_1.ButtonStyle.Danger).setCustomId('no').setLabel(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_15'));
        return { allowedMentions: { parse: ['users'] }, components: !this.useReactions ? [new blackcat_club_1.ActionRowBuilder().addComponents([buttonYes, buttonNo])] : [], content: this.invited.toString(), embeds: [{ color: 2719929, title: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_16'), description: content }] };
    }
    attachTo(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.useReactions) {
                for (const reaction of DuelRequest.REACTIONS) {
                    yield message.react(reaction);
                }
                message.awaitReactions({ filter: (reaction, user) => reaction.emoji.name != null && DuelRequest.REACTIONS.includes(reaction.emoji.name) && user.id === this.invited.id, max: 1, time: this.expireTime * 1000, errors: ['time'] }).then(this.challengeEmojiAnswered.bind(this)).catch(this.challengeExpired.bind(this));
            } else {
                message.createMessageComponentCollector({
                    filter: interaction => interaction.user.id === this.invited.id, max: 1, time: this.expireTime * 1000
                }).on('collect', this.challengeButtonAnswered.bind(this)).on('end', (_, reason) => __awaiter(this, void 0, void 0, function* () {
                    if (reason !== 'limit') {
                        yield this.challengeExpired();
                    }
                }));
            }
        });
    }
    challengeButtonAnswered(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tunnel = new ComponentInteractionMessagingTunnel(interaction, this.tunnel.author);
            return this.challengeAnswered(interaction.customId === 'yes');
        });
    }
    challengeEmojiAnswered(collected) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.challengeAnswered(collected.first().emoji.name === DuelRequest.REACTIONS[0]);
        });
    }
    challengeAnswered(accepted) {
        return __awaiter(this, void 0, void 0, function* () {
            if (accepted) {
                yield this.manager.createGame(this.tunnel, this.invited);
            } else {
                return this.tunnel.end({ allowedMentions: { parse: [] }, components: [], content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_17', { tictactoe__6: this.invited.displayName }), embeds: [] });
            };
        });
    }
    challengeExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tunnel.end({ allowedMentions: { parse: [] }, components: [], content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_18', { tictactoe__7: this.invited.displayName }), embeds: [] });
        });
    }
}
DuelRequest.REACTIONS = ['👍', '👎'];
__name(DuelRequest, "DuelRequest");
// 
class GameBoard {
    constructor(manager, tunnel, member2, configuration) {
        this.manager = manager;
        this.tunnel = tunnel;
        this.game = new Game();
        this._entities = [tunnel.author, member2];
        this.reactionsLoaded = false;
        this.configuration = configuration;
    }
    get entities() {
        return this._entities;
    }
    get content() {
        const builder = this.configuration.gameBoardReactions ? new GameBoardBuilder() : new GameBoardButtonBuilder();
        builder.withTitle(this.entities[0], this.entities[1]).withBoard(this.game.boardSize, this.game.board).withEntityPlaying(this.reactionsLoaded ? this.getEntity(this.game.currentPlayer) : undefined);
        if (this.game.finished) {
            builder.withEndingMessage(this.getEntity(this.game.winner));
        }
        const emojies = this.configuration.gameBoardEmojies;
        if (emojies && emojies.length === 2) {
            builder.withEmojies(emojies[0], emojies[1]);
        }
        if (this.configuration.gameBoardDisableButtons &&
            builder instanceof GameBoardButtonBuilder) {
            builder.withButtonsDisabledAfterUse();
        }
        return builder.toMessageOptions();
    }
    static reactionToMove(reaction) {
        return GameBoardBuilder.MOVE_REACTIONS.indexOf(reaction);
    }
    static buttonIdentifierToMove(identifier) {
        var _a;
        return (_a = parseInt(identifier)) !== null && _a !== void 0 ? _a : -1;
    }
    attachTo(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.configuration.gameBoardReactions) {
                for (const reaction of GameBoardBuilder.MOVE_REACTIONS) {
                    try {
                        yield message.react(reaction);
                    } catch(_a) {
                        yield this.onExpire();
                        return;
                    }
                }
            }
            this.reactionsLoaded = true;
            yield this.update();
            yield this.attemptNextTurn();
        });
    }
    attemptNextTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentEntity = this.getEntity(this.game.currentPlayer);
            if (currentEntity instanceof AI) {
                const result = currentEntity.operate(this.game);
                if (result.move !== undefined) {
                    yield this.playTurn(result.move);
                };
            } else {
                this.awaitMove();
            };
        });
    }
    update(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction) {
                return interaction.update(this.content);
            } else {
                return this.tunnel.editReply(this.content);
            };
        });
    }
    getEntity(index) {
        return index && index > 0 ? this._entities[index - 1] : undefined;
    }
    onEmojiMoveSelected(collected) {
        return __awaiter(this, void 0, void 0, function* () {
            const move = GameBoardBuilder.MOVE_REACTIONS.indexOf(collected.first().emoji.name);
            return this.playTurn(move);
        });
    }
    onButtonMoveSelected(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const move = GameBoard.buttonIdentifierToMove(interaction.customId);
            return this.playTurn(move, interaction);
        });
    }
    playTurn(move, interaction) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.game.updateBoard(this.game.currentPlayer, move);
            if (this.game.finished) {
                const winner = this.getEntity(this.game.winner);
                if (this.configuration.gameBoardDelete) {
                    yield this.tunnel.end(new GameBoardBuilder().withEndingMessage(winner).toMessageOptions());
                } else {
                    yield ((_b = (_a = this.tunnel.reply) === null || _a === void 0 ? void 0 : _a.reactions) === null || _b === void 0 ? void 0 : _b.removeAll());
                    yield this.update(interaction);
                }
                this.manager.endGame(this, winner !== null && winner !== void 0 ? winner : null);
            } else {
                this.game.nextPlayer();
                yield this.update(interaction);
                yield this.attemptNextTurn();
            }
        });
    }
    onExpire() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tunnel.end({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_19'), components: [] });
            this.manager.endGame(this);
        });
    }
    awaitMove() {
        var _a, _b;
        const expireTime = ((_a = this.configuration.gameExpireTime) !== null && _a !== void 0 ? _a : 30) * 1000;
        if (!this.tunnel.reply) return;
        const currentEntity = (_b = this.getEntity(this.game.currentPlayer)) === null || _b === void 0 ? void 0 : _b.id;
        if (this.configuration.gameBoardReactions) {
            this.tunnel.reply.awaitReactions({ filter: (reaction, user) => reaction.emoji.name != null && user.id === currentEntity && this.game.isMoveValid(GameBoard.reactionToMove(reaction.emoji.name)), max: 1, time: expireTime, errors: ['time'] }).then(this.onEmojiMoveSelected.bind(this)).catch(this.onExpire.bind(this));
        } else {
            this.tunnel.reply.createMessageComponentCollector({
                filter: interaction => interaction.user.id === currentEntity && this.game.isMoveValid(GameBoard.buttonIdentifierToMove(interaction.customId)),
                max: 1,
                time: expireTime
            }).on('collect', this.onButtonMoveSelected.bind(this)).on('end', (_, reason) => __awaiter(this, void 0, void 0, function* () {
                if (reason !== 'limit') {
                    yield this.onExpire();
                }
            }));
        }
    }
}
__name(GameBoard, "GameBoard");
// MessagingTunnel
class MessagingTunnel {}
__name(MessagingTunnel, "MessagingTunnel");
// CommandInteractionMessagingTunnel
class CommandInteractionMessagingTunnel extends MessagingTunnel {
    constructor(interaction) {
        super();
        this.interaction = interaction;
    }
    get author() {
        return this.interaction.member;
    }
    get channel() {
        return this.interaction.channel;
    }
    get reply() {
        return this._reply;
    }
    replyWith(answer, direct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.reply && this.interaction.deferred) {
                this._reply = (yield this.interaction.fetchReply());
            }
            if (this.reply) {
                yield this.editReply(answer);
                return this.reply;
            }
            this._reply = (yield this.interaction.reply(Object.assign(Object.assign({ components: [], embeds: [] }, answer), { ephemeral: direct, fetchReply: true })));
            return this._reply;
        });
    }
    editReply(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reply) {
                yield this.interaction.editReply(answer);
            };
        });
    }
    end(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reply) {
                try {
                    yield this.editReply(reason);
                    yield this.reply.reactions.removeAll();
                } catch(_a) {}
            }
        });
    }
}
__name(CommandInteractionMessagingTunnel, "CommandInteractionMessagingTunnel");
// ComponentInteractionMessagingTunnel
class ComponentInteractionMessagingTunnel extends MessagingTunnel {
    constructor(interaction, originalAuthor) {
        super();
        this.interaction = interaction;
        this.originalAuthor = originalAuthor;
    }
    get author() {
        var _a;
        return (_a = this.originalAuthor) !== null && _a !== void 0 ? _a : this.interaction.member;
    }
    get channel() {
        return this.interaction.channel;
    }
    get reply() {
        return this._reply;
    }
    replyWith(answer, _direct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._reply) {
                yield this.interaction.editReply(answer);
            } else {
                this._reply = (yield this.interaction.update(Object.assign(Object.assign({ components: [], embeds: [] }, answer), { fetchReply: true })));
            }
            return this._reply;
        });
    }
    editReply(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.replyWith(answer);
        });
    }
    end(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.editReply(reason);
                yield this.interaction.message.reactions.removeAll();
            } catch (e) {}
        });
    }
}
__name(ComponentInteractionMessagingTunnel, "ComponentInteractionMessagingTunnel");
// TextMessagingTunnel
class TextMessagingTunnel extends MessagingTunnel {
    constructor(origin) {
        super();
        this.origin = origin;
    }
    get author() {
        return this.origin.member;
    }
    get channel() {
        return this.origin.channel;
    }
    get reply() {
        return this._reply;
    }
    replyWith(answer, direct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (direct) {
                this._reply = yield this.origin.reply(answer);
            } else {
                this._reply = yield this.origin.channel.send(answer);
            }
            return this._reply;
        });
    }
    editReply(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reply) {
                yield this.reply.edit(answer);
            }
        });
    }
    end(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reply) {
                if (this.reply.deletable) {
                    try {
                        yield this.reply.delete();
                    } catch (_a) { };
                }
                yield this.channel.send(reason);
                this._reply = undefined;
            }
        });
    }
}
__name(TextMessagingTunnel, "TextMessagingTunnel");
// GameStateManager
class GameStateManager {
    constructor(bot) {
        this.bot = bot;
        this.gameboards = [];
        this.memberCooldownEndTimes = new Map();
        this.validator = new GameStateValidator(this);
    }
    requestDuel(tunnel, invited) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validator.isInteractionValid(tunnel)) {
                if (!this.validator.isNewGamePossible(tunnel, invited)) {
                    return false;
                }
                const duel = new DuelRequest(this, tunnel, invited, this.bot.configuration.requestExpireTime, this.bot.configuration.requestReactions);
                const message = yield tunnel.replyWith(duel.content);
                yield duel.attachTo(message);
                const cooldown = (_a = this.bot.configuration.requestCooldownTime) !== null && _a !== void 0 ? _a : 0;
                if (cooldown > 0) {
                    this.memberCooldownEndTimes.set(tunnel.author.id, Date.now() + cooldown * 1000);
                }
            }
            return true;
        });
    }
    createGame(tunnel, invited) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validator.isInteractionValid(tunnel)) {
                if (!this.validator.isNewGamePossible(tunnel, invited)) {
                    return false;
                }
                const gameboard = new GameBoard(this, tunnel, invited !== null && invited !== void 0 ? invited : new AI(), this.bot.configuration);
                this.gameboards.push(gameboard);
                const message = yield tunnel.replyWith(gameboard.content);
                yield gameboard.attachTo(message);
            }
            return true;
        });
    }
    endGame(gameboard, winner) {
        if (winner) {
            this.bot.eventHandler.emitEvent('win', { winner, loser: gameboard.entities.find(entity => entity !== winner) });
        } else if (winner === null) {
            this.bot.eventHandler.emitEvent('tie', { players: gameboard.entities });
        }
        this.gameboards.splice(this.gameboards.indexOf(gameboard), 1);
    }
}
__name(GameStateManager, "GameStateManager")
// GameStateValidator
class GameStateValidator {
    constructor(manager) {
        this.manager = manager;
    }
    get config() {
        return this.manager.bot.configuration;
    }
    get cooldownEndTimes() {
        return this.manager.memberCooldownEndTimes;
    }
    isInteractionValid(tunnel) {
        return this.isMessagingAllowed(tunnel) && this.isMemberAllowed(tunnel.author);
    }
    isNewGamePossible(tunnel, invited) {
        return (!this.manager.gameboards.some(gameboard => [tunnel.author, invited].some(entity => entity && gameboard.entities.includes(entity))) && (this.config.simultaneousGames || !this.manager.gameboards.some(gameboard => gameboard.tunnel.channel === tunnel.channel)));
    }
    isMessagingAllowed(tunnel) {
        return (this.hasPermissionsInChannel(tunnel) && (!this.config.allowedChannelIds || this.config.allowedChannelIds.length === 0 || this.config.allowedChannelIds.includes(tunnel.channel.id)));
    }
    hasPermissionsInChannel(tunnel) {
        var _a, _b, _c;
        const allowed = (_c = (_b = (_a = tunnel.channel.guild.members.me) === null || _a === void 0 ? void 0 : _a.permissionsIn(tunnel.channel)) === null || _b === void 0 ? void 0 : _b.has(GameStateValidator.PERM_LIST)) !== null && _c !== void 0 ? _c : false;
        if (!allowed) {
            console.error(`${localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_20', { tictactoe__8: tunnel.channel.name })}`);
        }
        return allowed;
    }
    isMemberAllowed(member) {
        return this.isMemberAllowedByRole(member) && this.isMemberAllowedByCooldown(member);
    }
    isMemberAllowedByRole(member) {
        return (!this.config.allowedRoleIds || this.config.allowedRoleIds.length == 0 || member.permissions.has('Administrator') || member.roles.cache.some(role => this.config.allowedRoleIds.includes(role.id)));
    }
    isMemberAllowedByCooldown(member) {
        return (!this.config.requestCooldownTime || this.config.requestCooldownTime === 0 || !this.cooldownEndTimes.has(member.id) || this.cooldownEndTimes.get(member.id) < Date.now());
    }
}
GameStateValidator.PERM_LIST = ['AddReactions', 'ReadMessageHistory', 'SendMessages', 'ViewChannel' ];
__name(GameStateValidator, "GameStateValidator");
class AI {
    constructor() {
        this.id = 'AI';
        this.displayName = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_21');
    }
    operate(game) {
        if (!game.boardEmpty) {
            return AI.minimax(game.clone(), game.emptyCellAmount, game.currentPlayer);
        } else {
            return { move: Math.floor(Math.random() * game.boardSize), score: 0 };
        }
    }
    toString() {
        return this.displayName;
    }
    static minimax(game, depth, player) {
        const winner = game.winner;
        const type = AI.getComputeType(player);
        let best;
        if (type === 1) {
            best = { score: -1000 };
        } else {
            best = { score: +1000 };
        }
        if (depth === 0 || winner) {
            return { score: AI.getComputeType(winner) };
        }
        game.board.forEach((cell, index) => {
            if (cell === 0) {
                game.updateBoard(player, index);
                const deep = this.minimax(game, depth - 1, (0, getOpponent)(player));
                game.updateBoard(0, index);
                deep.move = index;
                if (type === 1) {
                    if (deep.score > best.score) {
                        best = deep;
                    }
                } else {
                    if (deep.score < best.score) {
                        best = deep;
                    }
                }
            }
        });
        return best;
    }
    static getComputeType(player) {
        if (player === 1) {
            return -1;
        } else if (player === 2) {
            return 1;
        } else {
            return 0;
        }
    }
}
__name(AI, "AI");
class Game {
    constructor(boardSize = 3) {
        this._boardSize = boardSize;
        this._board = [];
        this._winner = 0;
        this._currentPlayer = Math.random() < 0.5 ? 1 : 2;
        for (let i = 0; i < boardSize * boardSize; i++) {
            this._board[i] = 0;
        }
    }
    get boardSize() {
        return this._boardSize;
    }
    get board() {
        return this._board;
    }
    get finished() {
        return this.winner !== 0 || this.boardFull;
    }
    get currentPlayer() {
        return this._currentPlayer;
    }
    get winner() {
        return this._winner;
    }
    get boardFull() {
        return this.board.every(cell => cell !== 0);
    }
    get boardEmpty() {
        return this.board.every(cell => cell === 0);
    }
    get emptyCellAmount() {
        return this.board.filter(cell => cell === 0).length;
    }
    clone() {
        const game = new Game(this.boardSize);
        for (let i = 0; i < this.board.length; i++) {
            game.board[i] = this.board[i];
        }
        return game;
    }
    isMoveValid(position) {
        return position < this.board.length && this.board[position] === 0;
    }
    updateBoard(player, position) {
        this.board[position] = player;
        this._winner = this.computeWinner();
    }
    nextPlayer() {
        this._currentPlayer = (0, getOpponent)(this.currentPlayer);
    }
    computeWinner() {
        for (let row = 0; row < this.boardSize; row++) {
            const i1 = this.toIndex(row, 0);
            const i2 = this.toIndex(row, 1);
            const i3 = this.toIndex(row, 2);
            if(this.validEquals(i1, i2) && this.validEquals(i2, i3)) {
                return this.board[i1];
            }
        }
        for (let col = 0; col < this.boardSize; col++) {
            const i1 = this.toIndex(0, col);
            const i2 = this.toIndex(1, col);
            const i3 = this.toIndex(2, col);
            if(this.validEquals(i1, i2) && this.validEquals(i2, i3)) {
                return this.board[i1];
            }
        }
        const middle = this.toIndex(1, 1);
        const topLeft = this.toIndex(0, 0);
        const topRight = this.toIndex(0, 2);
        const bottomRight = this.toIndex(2, 2);
        const bottomLeft = this.toIndex(2, 0);
        if(this.validEquals(topLeft, middle) && this.validEquals(middle, bottomRight)) {
            return this.board[middle];
        };
        if(this.validEquals(topRight, middle) && this.validEquals(middle, bottomLeft)) {
            return this.board[middle];
        };
        return 0;
    }
    toIndex(row, column) {
        return row * this.boardSize + column;
    }
    validEquals(position1, position2) {
        return (this.board[position1] !== 0 && this.board[position1] === this.board[position2]);
    }
}
__name(Game, "Game");
function getOpponent(player) {
    if (player === 0) {
        return player;
    } else if (player === 1) {
        return 2;
    } else {
        return 1;
    };
};
__name(getOpponent, "getOpponent");
/*========================================================
# RockPaperScissors.js
========================================================*/
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
    let button1 = new blackcat_club_1.ButtonBuilder().setLabel("🪨").setCustomId(localize.default.Language_Changer('Modules.Game.rps.rps_6')).setStyle("Primary")
    let button2 = new blackcat_club_1.ButtonBuilder().setLabel("🧻").setCustomId(localize.default.Language_Changer('Modules.Game.rps.rps_7')).setStyle("Primary")
    let button3 = new blackcat_club_1.ButtonBuilder().setLabel("✂️").setCustomId(localize.default.Language_Changer('Modules.Game.rps.rps_8')).setStyle("Primary")
    const row = new blackcat_club_1.ActionRowBuilder().addComponents(button1, button2, button3)
    if(!this.opponent && !this.AI) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.rps.rps_5') });
    if(!this.opponent && this.AI) {
      let msg = await this.message.channel.send({ embeds: [{ title: `${this.message.author.username} V/S BlackCat` }], components: [row]});
      let filter = i => { return i.user.id === this.message.author.id };
      msg.awaitMessageComponent({ filter, componentType: blackcat_club_1.ComponentType.Button, time: 60000, max: 1, errors: ["time"]}).then(interaction => {
        let player1Choosed = interaction.customId
        let botChoosed = [localize.default.Language_Changer('Modules.Game.rps.rps_6'), localize.default.Language_Changer('Modules.Game.rps.rps_7'), localize.default.Language_Changer('Modules.Game.rps.rps_8')];
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
          msg.edit({embeds: [{ title: `${localize.default.Language_Changer('Modules.Game.rps.rps_9', { rps__1: player1Choosed, rps__2: player2Choosed })}`}], components: [] });
        } else if(winner === this.message.author.id) {
          interaction.reply(this.winMessage.replace("{winner}", this.message.author.username ));
          msg.edit({ embeds: [{title: localize.default.Language_Changer('Modules.Game.rps.rps_10', { rps__3: player1Choosed, rps__4: player2Choosed, rps__5: this.message.author.username })}], components: []});
        } else {
          interaction.reply(this.tieMessage)
          msg.edit({ embeds: [{title: localize.default.Language_Changer('Modules.Game.rps.rps_11', { rps__6: player1Choosed, rps__7: player2Choosed })}], components: []})
        };
      }).catch((e) => {
        this.message.channel.send(this.timeOutMessage);
        console.log(e);
      });
    } else if(this.opponent) {
       let msg = await this.message.channel.send({embeds: [{ title: `${this.message.author.username} V/S ${this.opponent.user.username}` }],  components: [row] });
       const collector = msg.createMessageComponentCollector({ componentType: blackcat_club_1.ComponentType.Button, time: 60000 });
       collector.on('collect', (i) => {
         if(i.user.id === this.message.author.id || i.user.id === this.opponent.user.id) {
           if(i.user.id === this.message.author.id) {
             if(player1Choosed) return i.reply({content: localize.default.Language_Changer('Modules.Game.rps.rps_12'), ephemeral: true });
             player1Choosed = i.customId 
             i.reply({content: localize.default.Language_Changer('Modules.Game.rps.rps_13', { rps__8: i.customId }), ephemeral: true })
           } else {
             if(player2Choosed) return i.reply({content: localize.default.Language_Changer('Modules.Game.rps.rps_14'), ephemeral: true });
             player2Choosed = i.customId
             i.reply({ content: localize.default.Language_Changer('Modules.Game.rps.rps_15', { rps__9: i.customId }), ephemeral: true })
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
               msg.edit({embeds: [{ title: localize.default.Language_Changer('Modules.Game.rps.rps_16', { rps__10: this.message.author.username, rps__11: player1Choosed, rps__12: this.opponent.user.username, rps__13: player2Choosed, rps__14: this.opponent.user.username })}], components: [] });
             } else if(winner === this.message.author.id) {
               this.message.reply(this.winMessage.replace("{winner}", this.message.author.username ))
               msg.edit({embeds: [{title: localize.default.Language_Changer('Modules.Game.rps.rps_16', { rps__10: this.message.author.username, rps__11: player1Choosed, rps__12: this.opponent.user.username, rps__13: player2Choosed, rps__14: this.opponent.user.username })}], components: []});
             } else {
               this.message.reply(this.tieMessage)
               msg.edit({embeds: [{ title: localize.default.Language_Changer('Modules.Game.rps.rps_17',{ rps__15: this.message.author.username, rps__16: player1Choosed, rps__17: this.opponent.user.username, rps__18: player2Choosed })}], components: [] });
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
__name(RockPaperScissors, "RockPaperScissors");
/*========================================================
# ConnectFour.js
========================================================*/
const ConnectFour = class  {
    constructor(options) {
        if (!options.message) console.log(localize.default.Language_Changer('Modules.Game.connect4.errMessage'));
        this.gameEmbed = null
        this.message = options.message
        this.player1 = options.player1 || '🔴'
        this.player2 = options.player2 || '🔞'
    }
    start() { 
        const challenger = this.message.author;
        const oppenent = this.message.mentions.users.first();
        if (!oppenent) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_2')}, true);
        const board = [
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
        ];
        const renderBoard = (board) => {
            let tempString = "";
            for (const boardSection of board) {
                tempString += `${boardSection.join("")}\n`;
            }
            tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");
            return tempString;
        }
        const initialState = renderBoard(board);
        const initial = new blackcat_club_1.EmbedBuilder().setTitle(`${localize.default.Language_Changer('Modules.Game.connect4.connect4_3', { connect4__1: this.player1, connect4__2: this.message.author.username })}`).setDescription(initialState).setFooter({ text: `${challenger.username} vs ${oppenent.username}`})
        this.message.channel.send({ embeds: [initial] }).then(gameMessage => {
            gameMessage.react("1️⃣");
            gameMessage.react("2️⃣");
            gameMessage.react("3️⃣");
            gameMessage.react("4️⃣");
            gameMessage.react("5️⃣");
            gameMessage.react("6️⃣");
            gameMessage.react("7️⃣");
            const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && (user.id === oppenent.id || user.id === challenger.id);
            const gameCollector = gameMessage.createReactionCollector({ filter: gameFilter });
            const gameData = [{ member: challenger, playerColor: this.player1 }, { member: oppenent, playerColor: this.player2 }];
            let player = 0;
            const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");
            const horizontalCheck = () => {
                for (let i = 0; i < 6; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]];
                    }
                }
            }
            const verticalCheck = () => {
                for (let j = 0; j < 7; j++) {
                    for (let i = 0; i < 3; i++) {
                        if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]]
                    }
                }
            }
            const diagonal1 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 0; row < 3; row++) {
                        if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]]
                    }
                }
            }
            const diagonal2 = () => {
                for (let col = 0; col < 4; col++) {
                    for (let row = 5; row > 2; row--) {
                        if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]]
                    }
                }
            }
            const tieCheck = () => {
                let count = 0;
                for (const el of board) {
                    for (const string of el) {
                        if (string !== "⚪") count++;
                    }
                }
                if (count === 42) return true;
                else return false;
            }
            const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];
            gameCollector.on("collect", (reaction, user) => {
                reaction.message.reactions.cache.get(reaction.emoji.name).users.remove(user.id);
                if (user.id === gameData[player].member.id) {
                    const openSpaces = [];
                    if(reaction.emoji.name === "1️⃣") {
                       for (let i = 5; i > -1; i--) {
                         if(board[i][0] === "⚪") openSpaces.push({ i, j: 0 });
                       }
                       if (openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', {
                          connect4__3: gameData[player].member
                       })}, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                       else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    } else if (reaction.emoji.name === "2️⃣") {
                       for (let i = 5; i > -1; i--) {
                          if(board[i][1] === "⚪") openSpaces.push({ i, j: 1 });
                       }
                       if(openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', { connect4__3: gameData[player].member })}, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                       else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    } else if (reaction.emoji.name === "3️⃣") {
                      for (let i = 5; i > -1; i--) {
                          if(board[i][2] === "⚪") openSpaces.push({ i, j: 2 });
                      }
                      if (openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', {
                         connect4__3: gameData[player].member
                      }) }, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                      else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    } else if (reaction.emoji.name === "4️⃣") {
                      for (let i = 5; i > -1; i--) {
                        if(board[i][3] === "⚪") openSpaces.push({ i, j: 3 });
                      }
                      if(openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', {
                        connect4__3: gameData[player].member
                      }) }, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                      else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    } else if (reaction.emoji.name === "5️⃣") {
                      for (let i = 5; i > -1; i--) {
                        if(board[i][4] === "⚪") openSpaces.push({ i, j: 4 });
                      }
                      if(openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', {
                        connect4__3: gameData[player].member
                      }) }, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                      else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    } else if (reaction.emoji.name === "6️⃣") {
                      for (let i = 5; i > -1; i--) {
                        if (board[i][5] === "⚪") openSpaces.push({ i, j: 5 });
                      }
                      if (openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', {
                        connect4__3: gameData[player].member
                      })}, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                      else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    } else if (reaction.emoji.name === "7️⃣") {
                      for (let i = 5; i > -1; i--) {
                        if(board[i][6] === "⚪") openSpaces.push({ i, j: 6 });
                      }
                      if(openSpaces.length == 0) return this.message.channel.send({ content: localize.default.Language_Changer('Modules.Game.connect4.connect4_4', {
                         connect4__3: gameData[player].member
                      }) }, true).then(msg1 => msg1.delete({ timeout: 3000000 }))
                      else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                    };
                    if (tieCheck()) {
                        gameMessage.reactions.removeAll()
                        const TieEmbed = new blackcat_club_1.EmbedBuilder().setTitle(localize.default.Language_Changer('Modules.Game.connect4.connect4_5')).setDescription(renderBoard(board)).setFooter({ text: `${challenger.username} vs ${oppenent.username}`})
                        gameCollector.stop(localize.default.Language_Changer('Modules.Game.connect4.connect4_6'))
                        return gameMessage.edit({ embeds: [TieEmbed] })
                    }
                    for (const func of checks) {
                        const data = func();
                        if (data) {
                            gameMessage.reactions.removeAll()
                            const WinEmbed = new blackcat_club_1.EmbedBuilder().setTitle(localize.default.Language_Changer('Modules.Game.connect4.connect4_7', { connect4__4: gameData[player].member.username })).setDescription(renderBoard(board)).setFooter({ text: `${challenger.username} vs ${oppenent.username}`})
                            gameCollector.stop(localize.default.Language_Changer('Modules.Game.connect4.connect4_8', {
                              connect4__5: gameData[player].member.id
                            }));
                            return gameMessage.edit({ embeds: [WinEmbed] })
                        }
                    }
                    player = (player + 1) % 2;
                    const newEmbed = new blackcat_club_1.EmbedBuilder().setTitle(localize.default.Language_Changer('Modules.Game.connect4.connect4_9', { connect4__6: gameData[player].playerColor, connect4__7: gameData[player].member.username })).setDescription(renderBoard(board)).setFooter({ text: `${challenger.username} vs ${oppenent.username}`})
                    gameMessage.edit({ embeds: [newEmbed] });
                }
            })
        })
    }
}
__name(ConnectFour, "ConnectFour");
/*========================================================
# Snake.js
========================================================*/
const disableButtons = (components) => {
  for (let x = 0; x < components.length; x++) {
      for (let y = 0; y < components[x].components.length; y++) {
        components[x].components[y].disabled = true;
      };
  };
  return components;
};
const WIDTH = 15;
const HEIGHT = 10;
const SnakeGame = class {
  constructor(options = {}) {
      if(!options.message) 
      if(typeof options.message !== 'object') 
      if(!options.slash_command) options.slash_command = false;
      if(typeof options.slash_command !== 'boolean') 
      if(!options.embed) options.embed = {};
      if(!options.embed.title) options.embed.title = 'Snake';
      if(typeof options.embed.title !== 'string')  
      if(!options.embed.color) options.embed.color = '#5865F2';
      if(typeof options.embed.color !== 'string')  
      if(!options.embed.overTitle) options.embed.overTitle = 'Game Over';
      if(typeof options.embed.overTitle !== 'string')  
      if(!options.snake) options.snake = {};
      if(!options.snake.head) options.snake.head = '🟢';
      if(typeof options.snake.head !== 'string')  
      if(!options.snake.body) options.snake.body = '🟩';
      if(typeof options.snake.body !== 'string')  
      if(!options.snake.tail) options.snake.tail = '🟢';
      if(typeof options.snake.tail !== 'string')  
      if(!options.snake.over) options.snake.over = '💀';
      if(typeof options.snake.over !== 'string')  
      if(!options.emojis) options.emojis = {};
      if(!options.emojis.board) options.emojis.board = '⬛';
      if(typeof options.emojis.board !== 'string')  
      if(!options.emojis.food) options.emojis.food = '🍎';
      if(typeof options.emojis.food !== 'string')  
      if(!options.emojis.up) options.emojis.up = '⬆️';
      if(typeof options.emojis.up !== 'string')  
      if(!options.emojis.left) options.emojis.left = '⬅️';
      if(typeof options.emojis.left !== 'string')  
      if(!options.emojis.down) options.emojis.down = '⬇️';
      if(typeof options.emojis.down !== 'string')  
      if(!options.emojis.right) options.emojis.right = '➡️';
      if(typeof options.emojis.right !== 'string') 
      if(!options.foods) options.foods = [];
      if(typeof options.foods !== 'object')  
      if(!options.othersMessage) options.othersMessage = localize.default.Language_Changer('Modules.Game.snake.snake_1');
      if(typeof options.othersMessage !== 'string') 
      if(!options.stopButton) options.stopButton = 'Stop';
      if(typeof options.stopButton !== 'string')
      this.snake = [{ x: 5, y: 5 }];
      this.apple = { x: 1, y: 1 };
      this.snakeLength = 1;
      this.isInGame = false;
      this.options = options;
      this.message = options.message;
      this.gameBoard = [];
      this.score = 0;
      for (let y = 0; y < HEIGHT; y++) {
          for (let x = 0; x < WIDTH; x++) {
              this.gameBoard[y * WIDTH + x] = this.options.emojis.board;
          }
      }
  }
  getGameBoard() {
      let str = '';
      let emojis =  this.options.snake;
      for (let y = 0; y < HEIGHT; y++) {
          for (let x = 0; x < WIDTH; x++) {
              if (x ==  this.apple.x && y == this.apple.y) {
                  str += this.options.emojis.food;
                  continue;
              }
              let flag = true;
              for (let s = 0; s < this.snake.length; s++) {
                  if (x === this.snake[s].x && y === this.snake[s].y) {
                      if (s == 0) {
                          if (this.isInGame || this.score == HEIGHT * WIDTH) {
                              str += emojis.head;
                          } else {
                              str += emojis.over; 
                          };
                      } else if (s === this.snake.length - 1) {
                          str += emojis.tail;
                      } else {
                          str += emojis.body
                      }
                      flag = false;
                  }
              }
              if (flag) str += this.gameBoard[y * WIDTH + x];
          }
          str += '\n'; 
      }
      return str;
  }
  checkSnake(pos) {
      return this.snake.find(sPos => sPos.x == pos.x && sPos.y == pos.y);
  };
  newFoodLoc() {
      let newApplePos = { x: 0, y: 0 };
      do {
          newApplePos = { x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) };
      } while (this.checkSnake(newApplePos))
      if (this.options.foods.length) {
          this.options.emojis.food = this.options.foods[Math.floor(Math.random()*this.options.foods.length)];
      }
      this.apple.x = newApplePos.x;
      this.apple.y = newApplePos.y;
  }
  async sendMessage(content) {
      if (this.options.slash_command) return await this.message.editReply(content)
      return await this.message.channel.send(content)
  }
  async startGame() {
      if (this.options.slash_command) {
          if (!this.message.deferred) await this.message.deferReply({ ephemeral: false});
          this.message.author = this.message.user;
      }
      const emojis = this.options.emojis;
      this.isInGame = true;
      this.snakeLength = 1;
      this.snake = [{ x: 5, y: 5 }];
      this.newFoodLoc();
      const embed = new blackcat_club_1.EmbedBuilder().setColor(this.options.embed.color).setTitle(this.options.embed.title).setDescription(`${localize.default.Language_Changer('Modules.Game.snake.snake_2')} ` + this.score + '\n\n' + this.getGameBoard()).setFooter({ text: `${this.message.author.tag}`, iconURL: `${this.message.author.displayAvatarURL({ dynamic: true })}`});
      const up = new blackcat_club_1.ButtonBuilder().setEmoji(emojis.up).setStyle('Primary').setCustomId('snake_up');
      const left = new blackcat_club_1.ButtonBuilder().setEmoji(emojis.left).setStyle('Primary').setCustomId('snake_left');
      const down = new blackcat_club_1.ButtonBuilder().setEmoji(emojis.down).setStyle('Primary').setCustomId('snake_down');
      const right = new blackcat_club_1.ButtonBuilder().setEmoji(emojis.right).setStyle('Primary').setCustomId('snake_right');
      const stop = new blackcat_club_1.ButtonBuilder().setLabel(this.options.stopButton).setStyle('Danger').setCustomId('snake_stop');
      const dis1 = new blackcat_club_1.ButtonBuilder().setLabel('\u200b').setStyle('Secondary').setCustomId('dis1').setDisabled(true);
      const dis2 = new blackcat_club_1.ButtonBuilder().setLabel('\u200b').setStyle('Secondary').setCustomId('dis2').setDisabled(true);
      const row1 = new blackcat_club_1.ActionRowBuilder().addComponents(dis1, up, dis2, stop);
      const row2 = new blackcat_club_1.ActionRowBuilder().addComponents(left, down, right);
      const msg = await this.sendMessage({ embeds: [embed], components: [row1, row2] });
      this.ButtonInteraction(msg);
  }
  move(msg) {
      if (this.apple.x == this.snake[0].x && this.apple.y == this.snake[0].y) {
          this.score += 1;
          this.snakeLength++;
          this.newFoodLoc();
      };
      msg.edit({ embeds: [new blackcat_club_1.EmbedBuilder()
         .setColor(this.options.embed.color)
         .setTitle(this.options.embed.title)
         .setDescription(`${localize.default.Language_Changer('Modules.Game.snake.snake_2')} ` + this.score + '\n\n' + this.getGameBoard())
         .setFooter({ text: `${this.message.author.tag}`, iconURL: `${this.message.author.displayAvatarURL({ dynamic: true })}`})], components: msg.components });
  }
  async gameOver(msg) {
      this.isInGame = false;
      const text = '' + this.options.embed.overTitle + `\n${localize.default.Language_Changer('Modules.Game.snake.snake_2')} ` + this.score.toString();
      const editEmbed = new blackcat_club_1.EmbedBuilder()
        .setColor(this.options.embed.color)
        .setTitle(this.options.embed.title)
        .setDescription(text + '\n\n' + this.getGameBoard())
        .setFooter({ text: `${this.message.author.tag}`, iconURL: `${this.message.author.displayAvatarURL({ dynamic: true })}`})
      return await msg.edit({ embeds: [editEmbed], components: disableButtons(msg.components) })
  }
  ButtonInteraction(msg) {
      const filter = m => m;
      const collector = msg.createMessageComponentCollector({ filter, idle: 60000 });
      collector.on('collect', async btn => {
          if (btn.user.id !== this.message.author.id) return btn.reply({ content: this.options.othersMessage.replace('{author}', this.message.author.tag),  ephemeral: true })
          await btn.deferUpdate();
          const snakeHead = this.snake[0];
          const nextPos = { x: snakeHead.x, y: snakeHead.y };
          if (btn.customId === 'snake_left') {
              let nextX = snakeHead.x - 1;
              if (nextX < 0) {
                  nextPos.x = 0;
                  return this.gameOver(msg);
              };
              nextPos.x = nextX;
          } else if (btn.customId === 'snake_right') {
              let nextX = snakeHead.x + 1;
              if (nextX >= WIDTH) {
                  nextPos.x = WIDTH - 1;
                  return this.gameOver(msg);
              };
              nextPos.x = nextX;
          } else if (btn.customId === 'snake_up') {
              let nextY = snakeHead.y - 1;
              if (nextY < 0) {
                  nextPos.y = 0;
                  return this.gameOver(msg);
              };
              nextPos.y = nextY;
          } else if (btn.customId === 'snake_down') {
              let nextY = snakeHead.y + 1;
              if (nextY >= HEIGHT) {
                  nextPos.y = HEIGHT - 1;
                  return this.gameOver(msg);
              };
              nextPos.y = nextY;
          } else if (btn.customId === 'snake_stop') {
              this.gameOver(msg)
              return collector.stop();
          };
          if (this.checkSnake(nextPos)) {
              this.gameOver(msg);
          } else {
              this.snake.unshift(nextPos);
              if (this.snake.length > this.snakeLength)
                  this.snake.pop();
              this.move(msg);    
          };
      });
      collector.on('end', async() => {
          if (this.isInGame == true) this.gameOver(msg);
      });
  }
}
__name(SnakeGame, "SnakeGame");
/*========================================================
#
========================================================*/
0 && (module.exports = {
  TicTacToe,
  SnakeGame,
  ConnectFour,
  RockPaperScissors
});