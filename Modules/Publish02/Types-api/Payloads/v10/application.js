"use strict";
/**
 * Types extracted from https://discord.com/developers/docs/resources/application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationFlags = void 0;
/**
 * https://discord.com/developers/docs/resources/application#application-object-application-flags
 */
var ApplicationFlags;
(function (ApplicationFlags) {
    ApplicationFlags[ApplicationFlags["EmbeddedReleased"] = 2] = "EmbeddedReleased";
    ApplicationFlags[ApplicationFlags["ManagedEmoji"] = 4] = "ManagedEmoji";
    ApplicationFlags[ApplicationFlags["GroupDMCreate"] = 16] = "GroupDMCreate";
    ApplicationFlags[ApplicationFlags["RPCHasConnected"] = 2048] = "RPCHasConnected";
    ApplicationFlags[ApplicationFlags["GatewayPresence"] = 4096] = "GatewayPresence";
    ApplicationFlags[ApplicationFlags["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
    ApplicationFlags[ApplicationFlags["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
    ApplicationFlags[ApplicationFlags["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
    ApplicationFlags[ApplicationFlags["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
    ApplicationFlags[ApplicationFlags["Embedded"] = 131072] = "Embedded";
    ApplicationFlags[ApplicationFlags["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
    ApplicationFlags[ApplicationFlags["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
    ApplicationFlags[ApplicationFlags["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
    ApplicationFlags[ApplicationFlags["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
})(ApplicationFlags = exports.ApplicationFlags || (exports.ApplicationFlags = {}));