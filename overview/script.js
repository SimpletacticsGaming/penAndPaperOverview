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

    var playerHeaderHp = document.createElement("h3");
    var playerHp = document.createTextNode("HP: " + player.hp);
    playerHeaderHp.appendChild(playerHp);

    var playerHeaderGg = document.createElement("h3");
    var playerGg = document.createTextNode("GG: " + player.gg);
    playerHeaderGg.appendChild(playerGg);

    var playerHeaderLoot = document.createElement("h3");
    var playerLoot = document.createTextNode("Loot: " + player.loot);
    playerHeaderLoot.appendChild(playerLoot);
    
    element = document.getElementById("first").appendChild(playerHeaderName)
    element = document.getElementById("first").appendChild(playerHeaderHp)
    element = document.getElementById("first").appendChild(playerHeaderGg)
    element = document.getElementById("first").appendChild(playerHeaderLoot)
}