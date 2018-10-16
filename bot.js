var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");
var SF = require("./steamfuncs")
var GW2 = require("./GW2funcs");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize:true });
logger.level = 'debug';


// Init Bot

var bot = new Discord.Client({
		token: auth.token,
		autorun: true
})
bot.on("ready", function(evt) {
	logger.info("Connected");
	logger.info("Logged in as: ");
	logger.info(bot.username + " (" + bot.id + ")");
});
bot.on("message", async function(user, userID, channelID, message, evt) {
	
	if (message.author.bot) return;
	var errors = "";
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with "[]"
	if (message.substring(0, 2) == "[]") {
		var args = message.substring(2).split(" ");
		var cmd = args[0];
		
		args = args.splice(0, 1);
		switch (cmd) {
			// Command definitions here
			
////////////////////////////////////////////////////////////
////////////////////// STEAM COMMANDS //////////////////////
////////////////////////////////////////////////////////////
			case "reg":
					errors = SF.reg(args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					break;
			case "steamlist":
					errors = SF.getWishlist(userID);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Print array in a readable format
					///////////////////////////////////
					break;
			case "addtodo":
					errors = SF.addTodo(userID, args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Print array in a readable format
					///////////////////////////////////
					break;
			case "todo":
					errors = SF.getTodo(userID);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Print array in a readable format
					///////////////////////////////////
					break;
			case "blist":
					errors = SF.blacklist(userID, args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// PM Blacklist
					///////////////////////////////////
					break;
			/*case "game":
					errors = SF.searchGame(args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Everything
					///////////////////////////////////
					break;
			*/
			case "xref":
					errors = SF.xref(args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Print array in a readable format
					///////////////////////////////////
					break;
			case "deleteme":
					errors = SF.deleteUser(args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					break;
				
////////////////////////////////////////////////////////////
/////////////////////// GW2 COMMANDS ///////////////////////
////////////////////////////////////////////////////////////
			case "addwish":
					if (!message.member.roles.some(r=>["Santa"].includes(r.name))) {
						bot.sendMessage({
							to: channelID,
							message: "You must have the Santa role to use this command!";
						});
						return;
					///////////////////////////////////
					// TODO:
					// PM Wishlist
					///////////////////////////////////
					}
					errors = GW2.addWish(userID, args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					break;
			case "santa":
					errors = GW2.addSanta(userID, args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					break;
			case "unsanta":
					errors = GW2.removeSanta(userID);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// PM Blacklist
					///////////////////////////////////
					break;
			case "distribute":
					if (!message.member.roles.some(r=>["Dre"].includes(r.name))) {
						bot.sendMessage({
							to: channelID,
							message: "Hey wait, you're not Dre!";
						});
						return;
					}
					errors = GW2.distribute(args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Everything
					///////////////////////////////////
					break;
			case "purgewishes":
					if (!message.member.roles.some(r=>["Dre"].includes(r.name))) {
						bot.sendMessage({
							to: channelID,
							message: "Hey wait, you're not Dre!";
						});
						return;
					}
					errors = GW2.purgewishes(args);
					if (typeof errors === "string" && errors !== "") {
						bot.sendMessage({
							to: channelID,
							message: errors
						});
						return;
					}
					///////////////////////////////////
					// TODO:
					// Everything
					///////////////////////////////////
					break;
			
			// Generic
			// TODO: think of fun commands
			
		}
		
	}
});
