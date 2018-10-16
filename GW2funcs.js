// GW2funcs.js

function searchAndVerify(userQ) {
	var uIndex = -1;
	var userList;
	
	fs.readFile(path.join(__dirname, "secretsanta.json"), { encoding: "utf-8" }, function(err, data) {
		if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		
		userList = JSON.parse(data);
		for (var i = 0; i < userList.length; i++) {
			if (userQ === userList[i].uID) {
				uIndex = i;
			}
		}
	});
	
	if (uIndex == -1) { return "You are not a santa!"; }
	
	return userList[uIndex];
}



function addWishSyntax() {
}

function addSantaSyntax() {
}

function distributeSyntax(override) {
}

function purgewishesSyntax(confirmed) {
}


module.exports = {
	addWish: function(userID, wish) {
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		var uList = [];
		fs.readFile(path.join(__dirname, "secretsanta.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		var uIndex = -1;
		for (var i = 0; i < uList.length; i++) {
			if (userID === uList[i].uID) {
				uIndex = i;
			}
		}
		
		uList[i].list.push(newItem);
		
		fs.writeFile(path.join(__dirname, "secretsanta.json"), JSON.stringify(userList), function(err) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		});
		
		return uList[i].list;
	}

	getWishes: function(userID) {
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		return uInfo.list;
	}
	
	addSanta: function(userID, numSantas) {
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") {
			if (uInfo.includes("error")) { return uInfo; }
		}
		else {
			return "You are already registered as a Santa!";
		}
		
		var newSanta = {
			"uID": userID,
			"numLists": numSantas[0],
			"list": []
		}
		
		var uList = [];
		fs.readFile(path.join(__dirname, "secretsanta.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		uList.push(newSanta);
		
		fs.writeFile(path.join(__dirname, "secretsanta.json"), JSON.stringify(userList), function(err) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		});
		
		return "";
	}
	
	removeSanta: function(userID) {
		var uInfo = searchAndVerify(userID);
		if (typeof uInfo === "string") { return uInfo; }
		
		var uList = [];
		fs.readFile(path.join(__dirname, "secretsanta.json"), { encoding: "utf-8" }, function(err, data) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
			uList = JSON.parse(data);
		});
		
		for (var i = 0; i < uList.length; i++) {
			if (userID === uList[i].uID) {
				uList.splice(i, 1);
				break;
			}
		}
		
		fs.writeFile(path.join(__dirname, "secretsanta.json"), JSON.stringify(userList), function(err) {
			if (err) { return "File error. @Drecake#3278 good fuckin job"; }
		});
		
		return "";
	}
	
	distribute: function(override) {
		// TODO:
		// Check if we are short on santas or wishlists
		// Stop if so and override isn't given
		// Match each list to a santa
		// PM each santa with user-friendly list
		if (!override) {
			// Do the check
			// Refuse to distribute if wishlists > santas + extra santas
			// Refuse to distribute if santas > wishlists
		}
		
		return "";
	}

	purgewishes: function(confirmed) {
		// TODO:
		// If not confirmed, check date and ask for confirm
		// If confirmed, PM each list to the associated userID in a user-friendly way
	}
	
	return "";
};
