// import {} from "./toolsButtons.js"

const root = "../../images/";

let map = [];

$.ajax({
	type: "GET",
	success: function(data) {
		console.log(data);
		map = data; 
		renderCurrentView(viewX, viewY);
 },
	url: "/map"
});


const tileSize = 100;
const mapWidth = 100;
const mapHeight = 100;
const wH = window.innerHeight;
const wW = window.innerWidth;

const grassTile = makeTile("grass_tile.png");
const pavementTile = makeTile("pavement_tile.jpg");
const sandTile = makeTile("sand_waves_tile.jpg");
const clayTile = makeTile("dry_clay_tile.jpg");


$(document).on("click", ".tile", changeTileInMap);

function makeTile(tileName) {
	return $("<img>").attr({
		"src": root + tileName,
		"width": tileSize,
		"height": tileSize
	}).addClass("tile");
}

function changeTileInMap(){
 const x = $(this).attr("x");
 const y =  $(this).attr("y");
 const type = activeTool;
	
 map[x][y].type = type;
 renderCurrentView(viewX, viewY); 
}

const left = 37;
const up = 38;
const right = 39;
const down = 40;
let viewX = 0;
let viewY = 0;

$(window).keydown(function (event) {

	if (event.which === right && viewX < mapWidth) {
		viewX += 1;
	} else if (event.which == left && viewX > 0) {
		viewX -= 1;
	} else if (event.which == down && viewY < mapHeight) {
		viewY += 1;
	} else if (event.which == up && viewY > 0) {
		viewY -= 1;
	}
	renderCurrentView(viewX, viewY);

});


// render view using map and viewX, viewY as starting point 
function renderCurrentView(viewX, viewY) {

	$("#container").empty();

	for (let x = 0; x < mapWidth && (wW >= x * tileSize); x++) {
		for (let y = 0; y < mapHeight && (wH >= y * tileSize); y++) {
			const tileType = map[viewX+x][viewY+y].type;
			if (tileType == "grass"){
				$("#container").append(grassTile.clone().css({
					"left": x * tileSize,
					"top": y * tileSize
				}).attr({"x" : viewX + x, "y" : viewY + y})
				);
			} else if (tileType == "pavement"){
				$("#container").append(pavementTile.clone().css({
					"left": x * tileSize,
					"top": y * tileSize
				}).attr({"x" : viewX + x, "y" : viewY + y})
				);
			} 		
		}
	}

}