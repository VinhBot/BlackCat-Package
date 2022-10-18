/*-------------------------------------
# Author: Nguyễn Văn Vinh
--------------------------------------*/
'use strict';
const { AddRoles, setup, NewUpdate, EmbedPages, clickBtn, btnRole } = require("./Functions/functions");
const localize = require("../LanguageP/localize");
const colors = require("colors");
/*==============================
# auto update role
==============================*/
module.exports.AddRoles = AddRoles;
/*==============================
# Cài đặt chung
==============================*/
module.exports.setDefaultSetting = setup;
/*==============================
# Set Language
==============================*/
module.exports.Language = require("./Language/LanguageYaml");
/*==============================
# Game Commands
==============================*/
module.exports.Game = {
  ConnectFour: require("./Game/connect4"),
  SnakeGame: require("./Game/snake"),
  RockPaperScissors: require("./Game/rps"),
};
/*==============================
# Function Commands
==============================*/
module.exports.Commands = {
    EmbedPages: EmbedPages,
    Economy: require("./Commands/Economy")
};
/*==============================
# path
==============================*/
module.exports.files_name = require("path");
/*-------------------------*/
/*==============================
#
==============================*/
module.exports.Options = require("../Publish01/Events");
/*--------------------------*/
/*==============================
#
==============================*/
module.exports.BlackCat = require("./Commands/Client");
/*==============================
# asscii-table
==============================*/
module.exports.ascii = require("./Functions/functionsAsciilog");
/*==============================
#
==============================*/
module.exports.btnRole = btnRole;
module.exports.clickBtn = clickBtn;
/*==============================
#
==============================*/
/*==============================
#
==============================*/