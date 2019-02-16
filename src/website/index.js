const root = "../../res/images/";
const grassTileSrc = root + "grass_tile.png";
const pavementTileSrc = root + "pavement_tile.jpg";

const size = 100;

const grassTile = $("<img>").attr({
	"src": grassTileSrc,
	"width": size,
	"height": size
}).addClass("tile");
const pavementTile = $("<img>").attr({
	"src": pavementTileSrc,
	"width": size,
	"height": size
}).addClass("tile");

const mapWidth = 100;
const mapHeight = 100;
const wH = window.innerHeight;
const wW = window.innerWidth;

const left = 37;
const up = 38;
const right = 39;
const down = 40;
let viewX = 0;
let viewY = 15;

renderCurrentMapView(viewX, viewY);

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
	renderCurrentMapView(viewX, viewY);
});

function renderCurrentMapView(viewX, viewY) {

	$("#container").empty();
	for (let x = 0; x < mapWidth && (wW >= x * size); x++) {
		for (let y = 0; y < mapHeight && (wH >= y * size); y++) {
			if (x === 10 - viewX || y === 20 - viewY) {
				$("#container").append(pavementTile.clone().css({
					"left": x * size,
					"top": y * size
				}));
			} else {
				$("#container").append(grassTile.clone().css({
					"left": x * size,
					"top": y * size
				}));
			}
		}
	}


}