/*-------------------------------------
# Author: Nguyễn Văn Vinh
--------------------------------------*/
'use strict';
const { AddRoles, clickBtn, btnRole } = require("./Functions/functions");
const localize = require("../LanguageP/localize");
const colors = require("colors");
/*==============================
# auto update role
==============================*/
module.exports.AddRoles = AddRoles;
/*==============================
# Set Language
==============================*/
module.exports.Language = require("./Language/LanguageYaml");
/*==============================
# Game Commands
==============================*/
module.exports.Game = require("./Client/Game");
/*==============================
# Function Commands
==============================*/
module.exports.Commands = require("./Client/Client");
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
module.exports.BlackCat = require("./Client/Client").BlackCat;
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