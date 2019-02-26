// import {} from "./toolsButtons.js"

const root = "images/tiles/";

let map = [];
let view = [];

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
	const x = parseInt($(scope).attr("x")) + viewX;
	const y = parseInt($(scope).attr("y")) + viewY;
	const type = activeTool;
	if (map[x][y].type != type) {
		map[x][y].type = type;
		changeTile(scope, x, y);
	}
}

function changeTile(scope, x, y) {
	const tile = tiles[map[x][y].type];
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

function createView(viewX, viewY) {

	for (let x = 0; x < mapWidth && (wW >= x * tileSize); x++) {
		for (let y = 0; y < mapHeight && (wH >= y * tileSize); y++) {
			const tileType = map[viewX + x][viewY + y].type;
			const tile = tiles[tileType];
			const viewInstance = tile.clone().css({
				"left": x * tileSize,
				"top": y * tileSize
			}).attr({
				"x": x,
				"y": y
			});
			$("#container").append(viewInstance);
			view.push(viewInstance);
		}
	}
}

function updateView(viewX, viewY) {

	for (let i = 0; i < view.length; i++) {

		const x = parseInt(view[i].attr("x")) + viewX;
		const y = parseInt(view[i].attr("y")) + viewY;

		if (x < 0) {
			x = 0;
		} else if (x >= mapWidth) {
			x = mapWidth - 1;
		}
		if (y < 0) {
			y = 0;
		} else if (y >= mapHeight) {
			y = mapHeight - 1;
		}

		const tileType = map[x][y].type;
		const src = tiles[tileType].attr("src");

		view[i].attr("src", src);
	}

}


// render view using map and viewX, viewY as starting point 
function renderCurrentView(viewX, viewY) {
	let now = new Date();

	// $("#container").empty();

	if (view.length == 0) {
		createView(viewX, viewY);
	} else {
		updateView(viewX, viewY);
	}
  
$(".object").remove();

	const objectsInView = objectMap.filter(object => (
		object.x >= viewX &&
		object.x < viewX + wW / tileSize &&
		object.y >= viewY &&
		object.y < viewY + wH / tileSize
	));

	for (let i = 0; i < objectsInView.length; i++) {
		const object = objects[objectsInView[i].type];
		$("#container").append(object.clone().css({
			"left": (objectsInView[i].x - viewX) * tileSize,
			"top": (objectsInView[i].y - viewY) * tileSize
		}));
	}

	console.log((new Date() - now) + "ms");
}