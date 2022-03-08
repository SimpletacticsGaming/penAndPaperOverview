function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

readTextFile("input.json", function(text){
  var data = JSON.parse(text); 
  console.log(data);
  for (var player of data.players) {
    console.log(player)
    appendPlayers(player)
  }
});

function appendPlayers(player){
    var playerHeaderName = document.createElement("h2");
    var playerName = document.createTextNode(player.name + ":");
    playerHeaderName.appendChild(playerName);

    var playerHpProgressBar = addHpBar(player)
    var playerGgProgressBar = addGgBar(player)

    if(player.loot !== undefined){
      var playerHeaderLoot = document.createElement("h3");
      var playerLoot = document.createTextNode("Loot: " + player.loot);
      playerHeaderLoot.appendChild(playerLoot);
    }

    element = document.getElementById("first").appendChild(playerHeaderName)
    element = document.getElementById("first").appendChild(playerHpProgressBar)

    var test = document.createElement("h3");
    element = document.getElementById("first").appendChild(test)
    element = document.getElementById("first").appendChild(playerGgProgressBar)

    if(player.loot !== undefined){
      element = document.getElementById("first").appendChild(playerHeaderLoot)
    }
}

function addHpBar(player){
  let playerHpProgressBar = document.createElement("div")
  let percentage = calculateLifePercentage(player.maxHp, player.hp)
  let color = calculateColorForHp(percentage)
  playerHpProgressBar.style = "width: 50%; height: 30px; line-height: 30px; text-align: center; background-image: linear-gradient(90deg, "+color+" 0%, "+ color + " "+ percentage + "%, grey "+percentage+"%, grey 100%)"
  playerHpProgressBar.textContent = player.hp + "/" + player.maxHp
  return playerHpProgressBar
}

function addGgBar(player){
  let playerGgProgressBar = document.createElement("div")
  let percentage = calculateLifePercentage(player.maxGg, player.gg)
  let color = calculateColorForGg(percentage)
  playerGgProgressBar.style = "width: 50%; height: 30px; line-height: 30px; text-align: center; background-image: linear-gradient(90deg, "+color+" 0%, "+ color + " "+percentage+"%, grey "+percentage+"%, grey 100%)"
  playerGgProgressBar.textContent = player.gg + "/" + player.maxGg
  return playerGgProgressBar
}

function calculateLifePercentage(max, current){
  return (current / max)*100
}

function calculateColorForHp(percentage){
    if(percentage >= 25){
      return "green"
    } else if(percentage >= 15){
        return "orange"
    } else {
      return "red"
    }
}

function calculateColorForGg(percentage){
  if(percentage >= 25){
    return "blue"
  } else {
    return "darkblue"
  }
}