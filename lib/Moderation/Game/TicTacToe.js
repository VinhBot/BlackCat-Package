"use strict";
var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

var src_exports = {};
__export(src_exports, {
  TicTacToe: () => TicTacToe,
  EventHandler: () => EventHandler,
  TicTacToeBot: () => TicTacToeBot,
  AppCommandRegister: () => AppCommandRegister,
  GameCommand: () => GameCommand,
  GameBoardBuilder: () => GameBoardBuilder,
  GameBoardButtonBuilder: () => GameBoardButtonBuilder,
  DuelRequest: () => DuelRequest,
  GameBoard: () => GameBoard,
  CommandInteractionMessagingTunnel: () => CommandInteractionMessagingTunnel,
  ComponentInteractionMessagingTunnel: () => ComponentInteractionMessagingTunnel,
  MessagingTunnel: () => MessagingTunnel,
  TextMessagingTunnel: () => TextMessagingTunnel,
  GameStateManager: () => GameStateManager,
  GameStateValidator: () => GameStateValidator,
  AI: () => AI, Game: () => Game, getOpponent: () => getOpponent
});
module.exports = __toCommonJS(src_exports);
// import package
const blackcat_club_1 = require("../../Publish01/Events");
const localize = __importDefault(require("../../LanguageP/localize"));
// tictactoe
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
                            yield message.reply(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_24', {
                              tictactoe__11: this.name
                            }));
                        } else {
                            yield message.reply(localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_25', {
                              tictactoe__12: this.name
                            }));
                        }
                    }
                }
            }
        });
    }
    registerInGuild(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commandManager.create({
                name: this.name,
                description: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_1'),
                options: [{
                  type: blackcat_club_1.ApplicationCommandOptionType.User,
                  name: this.optionName,
                  description: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_2')
                }]
            }, guildId);
        });
    }
    deleteInGuild(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = yield this.commandManager.fetch({ guildId });
            const command = commands === null || commands === void 0 ? void 0 : commands.find(cmd => cmd.name === this.name);
            if (command) {
                yield this.commandManager.delete(command.id, guildId);
                return true;
            } else {
                return false;
            }
        });
    }        
}
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
        return __awaiter(this, void 0, void 0, function* () {
            if (invited) {
                if (!invited.user.bot) {
                    if (inviter.user.id !== invited.user.id &&
                        invited.permissionsIn(tunnel.channel).has('ViewChannel')) {
                        if (!(yield this.manager.requestDuel(tunnel, invited))) {
                            yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_3') }, true);
                        }
                    } else {
                        yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_4') }, true);
                    }
                } else {
                    yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_5') }, true);
                }
            } else {
                if (!(yield this.manager.createGame(tunnel))) {
                    yield tunnel.replyWith({ content: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_3') }, true);
                }
            }
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
        this.title = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_6', {
                tictactoe__1: player1.displayName,
                tictactoe__2: player2.displayName
        }) + '\n\n';
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
            this.state = localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_9', { 
              tictactoe__3: entity.toString()
            });
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
//
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
        return {
            allowedMentions: { parse: ['users'] },
            components: !this.useReactions ? [
                    new blackcat_club_1.ActionRowBuilder().addComponents(new blackcat_club_1.ButtonBuilder({
                        style: blackcat_club_1.ButtonStyle.Success,
                        customId: 'yes',
                        label: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_14')
                    }), new blackcat_club_1.ButtonBuilder({
                        style: blackcat_club_1.ButtonStyle.Danger,
                        customId: 'no',
                        label: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_15')
                    }))
            ] : [],
            content: this.invited.toString(),
            embeds: [{ color: 2719929, title: localize.default.Language_Changer('Modules.Game.tictactoe.tictactoe_16'), description: content }]
        };
    }
    attachTo(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.useReactions) {
                for (const reaction of DuelRequest.REACTIONS) {
                    yield message.react(reaction);
                }
                message.awaitReactions({
                    filter: (reaction, user) => reaction.emoji.name != null && DuelRequest.REACTIONS.includes(reaction.emoji.name) && user.id === this.invited.id,
                    max: 1,
                    time: this.expireTime * 1000,
                    errors: ['time']
                }).then(this.challengeEmojiAnswered.bind(this)).catch(this.challengeExpired.bind(this));
            } else {
                message.createMessageComponentCollector({
                    filter: interaction => interaction.user.id === this.invited.id,
                    max: 1,
                    time: this.expireTime * 1000
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
            this.tunnel.reply.awaitReactions({
                filter: (reaction, user) => reaction.emoji.name != null && user.id === currentEntity && this.game.isMoveValid(GameBoard.reactionToMove(reaction.emoji.name)),
                max: 1,
                time: expireTime,
                errors: ['time']
            }).then(this.onEmojiMoveSelected.bind(this)).catch(this.onExpire.bind(this));
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
class MessagingTunnel {
}
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
            this.bot.eventHandler.emitEvent('tie', {
                players: gameboard.entities
            });
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
// AI
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
// Game
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
            if (this.validEquals(i1, i2) && this.validEquals(i2, i3)) {
                return this.board[i1];
            }
        }
        for (let col = 0; col < this.boardSize; col++) {
            const i1 = this.toIndex(0, col);
            const i2 = this.toIndex(1, col);
            const i3 = this.toIndex(2, col);
            if (this.validEquals(i1, i2) && this.validEquals(i2, i3)) {
                return this.board[i1];
            }
        }
        const middle = this.toIndex(1, 1);
        const topLeft = this.toIndex(0, 0);
        const topRight = this.toIndex(0, 2);
        const bottomRight = this.toIndex(2, 2);
        const bottomLeft = this.toIndex(2, 0);
        if (this.validEquals(topLeft, middle) && this.validEquals(middle, bottomRight)) {
            return this.board[middle];
        }
        if (this.validEquals(topRight, middle) && this.validEquals(middle, bottomLeft)) {
            return this.board[middle];
        }
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
// getOpponent
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
// 
0 && (module.exports = {
   TicTacToe,
   EventHandler,
   TicTacToeBot,
   AppCommandRegister,
   GameCommand,
   GameBoardBuilder,
   GameBoardButtonBuilder,
   DuelRequest,
   GameBoard,
   CommandInteractionMessagingTunnel,
   ComponentInteractionMessagingTunne,
   MessagingTunnel,
   TextMessagingTunnel,
   GameStateManager,
   GameStateValidator,
   AI, Game, getOpponent
});