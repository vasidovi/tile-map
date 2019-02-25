// import {} from "./toolsButtons.js"

const root = "images/";

let map = [];

$.ajax({
	type: "GET",
	success: function (data) {
		map = data;
		if (map.length == 0) {
			createTestMap();
		}
		renderCurrentView(viewX, viewY);
	},
	url: "/map"
});

function createTestMap() {
	map = [];
	for (let x = 0; x < 100; x++) {
		map.push([]);
		for (let y = 0; y < 100; y++) {
			map[x].push({});
			map[x][y].type = "grass";
		}
	}

};

const tileSize = 40;
const mapWidth = 100;
const mapHeight = 100;
const wH = window.innerHeight;
const wW = window.innerWidth;
let isMouseDown = false;

$(document).on("mousedown", ".tile", function () {
	changeTileInMap(this);
	isMouseDown = true;
});

$(window).on("mouseup", function () {
	isMouseDown = false;
});

$(document).on("mouseenter", ".tile", function () {
	if (isMouseDown) {

		changeTileInMap(this);
	}
});

// $(document).on("click", ".tile", changeTileInMap);

function changeTileInMap(scope) {
	const x = $(scope).attr("x");
	const y = $(scope).attr("y");
	const type = activeTool;
	if (map[x][y].type != type) {
		map[x][y].type = type;
		changeTile(scope, x, y);
	}
}


function changeTile(scope, x, y) {
	// $(scope).remove();
	const tile = tiles[map[x][y].type];
	// $("#container").append(tile.clone().css({
	// 	"left": x * tileSize,
	// 	"top": y * tileSize
	// }).attr({
	// 	"x": viewX + x,
	// 	"y": viewY + y
	// }));
	$(scope).attr("src", tile.attr("src"));
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
			const tileType = map[viewX + x][viewY + y].type;
			const tile = tiles[tileType];
			 console.log(tiles);
			 console.log(tileType);
			$("#container").append(tile.clone().css({
				"left": x * tileSize,
				"top": y * tileSize
			}).attr({
				"x": viewX + x,
				"y": viewY + y
			}));
		}
	}

}