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
  var data = JSON.parse(text); //parse JSON
  console.log(data);
  for (var player of data.players) {
    console.log(player)
    appendPlayers(player)
  }
});

function appendPlayers(player){
    var playerHeaderName = document.createElement("h1");
    var playerName = document.createTextNode(player.name + ":");
    playerHeaderName.appendChild(playerName);

    var playerHpProgressBar = addHpBar(player)
    var playerGgProgressBar = addGgBar(player)

    var playerHeaderLoot = document.createElement("h3");
    var playerLoot = document.createTextNode("Loot: " + player.loot);
    playerHeaderLoot.appendChild(playerLoot);
    
    element = document.getElementById("first").appendChild(playerHeaderName)
    element = document.getElementById("first").appendChild(playerHpProgressBar)

    var test = document.createElement("h3");
    element = document.getElementById("first").appendChild(test)
    element = document.getElementById("first").appendChild(playerGgProgressBar)
    element = document.getElementById("first").appendChild(playerHeaderLoot)
}

function addHpBar(player){
  var playerHpProgressBar = document.createElement("div")
  playerHpProgressBar.style = "width: 50%; background-color: grey"

  var playerHpBar = document.createElement("div")
  playerHpBar.style = " width: "+calculateLifeProzent(player.maxHp, player.hp)+"%; height: 30px; background-color: green"
  playerHpProgressBar.appendChild(playerHpBar)
  playerHpBar.textContent = player.hp + "/" + player.maxHp
  return playerHpProgressBar
}

function addGgBar(player){
  var playerHpProgressBar = document.createElement("div")
  var text = document.createElement("div")
  playerHpProgressBar.style = "width: 50%; background-color: grey"

  var playerHpBar = document.createElement("div")
  playerHpBar.style = " width: "+calculateLifeProzent(player.maxGg, player.gg)+"%; height: 30px; background-color: orange"
  playerHpProgressBar.appendChild(playerHpBar)
  playerHpBar.textContent = player.hp + "/" + player.maxHp
  return playerHpProgressBar
}

function calculateLifeProzent(max, current){
  return (current / max)*100
}