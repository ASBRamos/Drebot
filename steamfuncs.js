// steamfuncs.js
var fs = require("fs");
var path = require("path");
var regex = /^[A-z0-9]+$/i;

// userQ can be uID, cName
// returns the JSON object corresponding to a user
function searchAndVerify(userQ) {
	var uIndex = -1;
	var userList;
	
	if (isNaN(parseInt(userQ, 10))) {
		fs.readFile(path.join(__dirname, "steamusers.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			
			userList = JSON.parse(data);
			for (var i = 0; i < userList.length; i++) {
				if (userQ === userList[i].cName) {
					uIndex = i;
				}
			}
		});
	}
	else {
		fs.readFile(path.join(__dirname, "steamusers.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			
			userList = JSON.parse(data);
			for (var i = 0; i < userList.length; i++) {
				if (userQ === userList[i].uID) {
					uIndex = i;
				}
			}
		});
	}	
	// Verify working API key
	
	if (uIndex == -1) { return "User \"" + userQ + "\" is not registered."; }
	
	return userList[uIndex];
}

function regSyntax(userInfo) {
	if (userInfo.length < 3) { return "Usage: ```[]reg Custom_Nickname Steam_API_Key Steam_ID```"; }
	for (var i = 0; i < 2; i++) {
		if (!regex.test(userInfo[i]) {
			return "Both your custom nickname and steam API key must be alphanumeric (A-Z, a-z, 0-9)";
		}
	}
	if (isNaN(parseInt(userInfo[2]))) { return "Your steam ID must be numeric."; }
}

function xrefSyntax(names) {
	if (names.length < 2) { return "Usage: ```[]xref Username1 Username2 [Username3] [Username4] ..."; }
	for (var i = 0; i < names.length; i++) {
		if (!regex.test(names[i])) {
			return "All names given must be alphanumeric (A-Z, a-z, 0-9)";
		}
	}
}

function addTodoSyntax(userID, newItem) {
	if (newItem.length < 1) { return "Usage: ```[]addtodo Name_of_Game```"; }
}

function blacklistSyntax(userID, newItem) {
	if (newItem.length < 1) { return "Usage: ```[]blist Name_of_Game```"; }
}

function searchGameSyntax(gameQ) {
	if (gameQ.length < 1) { return "Usage: ```[]game Name_of_Game```"; }
}


module.exports = {
	reg: function(userInfo) {
		var errors = regSyntax(userInfo);
		if (errors !== "") { return errors; }
		
		var uName = userInfo[0].tolowercase();
		var uInfo = searchAndVerify(uName);
		
		if (typeof uInfo === "string") {
			if (uInfo.includes("error")) { return uInfo; }
		}
		else {
			return "Username \"" + userInfo[0] + "\" is already taken.";
		}
		
		var uInfo = searchAndVerify(userInfo[3]);
		
		if (typeof uInfo === "string") {
			if (uInfo.includes("error")) { return uInfo; }
		}
		else {
			return "You're already registered! Please note users can only register themselves." +
				" If you'd like to remove your data, please use `[]deleteme`";
		}
		
		var uList = [];
		fs.readFile(path.join(__dirname, "steamusers.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		// check for steam valid API here, return 3
		uList.push({
			"cName": uName,
			"API": userInfo[1]
			"sID": userInfo[2]
			"uID": userInfo[3]
			"blacklist": []
			"toPlay": []
		});
		fs.writeFile(path.join(__dirname, "steamusers.json"), JSON.stringify(userList), function(err) {
			if (err) {
				return "File error. @Drecake#3278 good fuckin job";
			}
		});
		
		return "";	
	}

	xref: function(names) {
		var errors = xrefSyntax(names);
		if (errors !== "") { return errors; }
				
		const Http = new XMLHttpRequest();
		var url = "";
		var curAPI = "";
		var gameArray = [];
		var blacklistAll = [];
		
		for (var i = 0; i < names.length; i++) {
			var uInfo = searchAndVerify(names[i].toLowerCase());
			if (typeof uInfo === "string") { return uInfo; }
			
			url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
				uList[j].API + "&steamid=" + uList[j].sID + "&include_appinfo=true";
			blacklistAll.push(...uList[j].blacklist);
						
			Http.open("GET", url);
			Http.send();
			
			Http.onreadystatechange=function(){
				if (this.readyState == 4 && this.status == 200) {
					
					var curList = JSON.parse(Http.responseText);
					var curUserGames = [];		
					if (i = 0) { // first name, populate array		
						for (var k = 0; k < curList.games.length; k++) {
							gameArray.push(curList.games[k].name);
						}
					}
					else {	
						for (var k = 0; k < curList.games.length; k++) {
							curUserGames.push(curList.games[k].name);
						}
						gamearray = gameArray.filter(name => curUserGames.indexOf(name) != -1);
					}
				}
			}
		}
		
		gamearray = gameArray.filter(name => blacklistAll.indexOf(name) == -1);
		
		return gameArray;		
	}
	
	getWishlist: function(userID) {
		// TODO:
		// Query Steam
		// Return in user friendly format
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		var key = uInfo.API;
		var steamID = uInfo.sID;
		
		return "";
	}

	addTodo: function(userID, newItem) {
		var errors = addTodoSyntax(userID, newItem);
		if (errors !== "") { return errors; }
		
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		var uList = [];
		fs.readFile(path.join(__dirname, "steamusers.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		var uIndex = -1;
		for (var i = 0; i < uList.length; i++) {
			if (uInfo.cName === uList[i].cName) {
				uIndex = i;
			}
		}
		
		uList[uIndex].toPlay.push(newItem[0]);
		
		fs.writeFile(path.join(__dirname, "steamusers.json"), JSON.stringify(userList), function(err) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		});
		
		return uList[uIndex].toPlay;
	}

	getTodo: function(userID) {
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		return uInfo.toPlay;
	}

	blacklist: function(userID, newItem) {
		var errors = blacklistSyntax(userID, newItem);
		if (errors !== "") { return errors; }
		
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		var uList = [];
		fs.readFile(path.join(__dirname, "steamusers.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		var uIndex = -1;
		for (var i = 0; i < uList.length; i++) {
			if (uInfo.cName === uList[i].cName) {
				uIndex = i;
			}
		}
		
		uList[i].blacklist.push(newItem[0]);
		
		fs.writeFile(path.join(__dirname, "steamusers.json"), JSON.stringify(userList), function(err) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		});
		
		return "";
	}

	searchGame: function(gameQ) {
		var errors = searchGameSyntax(gameQ);
		if (errors !== "") { return errors; }
		// TODO:
		// Use steam API to get wanted game
		return "";
	}

	deleteUser: function(userID) {
		var errors = addTodoSyntax(userID, newItem);
		if (errors !== "") { return errors; }
		
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		
		var uList = [];
		fs.readFile(path.join(__dirname, "steamusers.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		for (var i = 0; i < uList.length; i++) {
			if (userID === uList[i].uID) {
				uList.splice(i, 1);
				break;
			}
		}
		
		fs.writeFile(path.join(__dirname, "steamusers.json"), JSON.stringify(userList), function(err) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		});
		
		return "";
	}
};

