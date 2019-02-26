// import Vue from 'vue';
// import Tools from './Tools/Tools.mjs';


let tools = [{
	name: 'save',
	title: 'Save',
	src: 'https://cdn3.iconfinder.com/data/icons/vector-icons-for-mobile-apps-2/512/Save_black-512.png',
	action: saveMap
}];

getImages();

function addTilesAndTools(images) {
	for (img of images) {
		const name = img.slice(0, img.length - 4).replace("_tile", "").replace("_", " ");
		const src = root + img;
		const tileTool = makeTileTool(name, src);
		const tile = makeTile(src);
		tools.push(tileTool);
		tiles[name] = tile;
	}
	Tools.setActiveTool(Object.keys(tiles)[0]);
};

const tiles = {};

function makeTile(src) {
	return $("<img>").attr({
		src,
		width: tileSize,
		height: tileSize,
		ondragstart: "return false;",
	}).addClass("tile");
}

function makeTileTool(name, src) {
	return {
		name,
		title: name.charAt(0).toUpperCase() + name.slice(1),
		src,
	}
}

function getImages() {

	$.ajax({
		type: "GET",
		success: function (data) {
			addTilesAndTools(data);
			$.ajax({
				type: "GET",
				success: function (data) {

					if (data != undefined && data.map != undefined) {
						map = data.map;
					} else {
						createTestMap();
					}

					if (data != undefined && data.objectMap != undefined) {
						objectMap = data.objectMap;
					} else {
						spawnRandomTrees(1000);
					}
					renderCurrentView(viewX, viewY);
				},
				url: "/map"
			});
		},
		url: "/tiles",
	});
};

const data = {
	tools,
	setActiveTool: function (tool) {
		if (tool.action) {
			tool.action();
		} else {
			data.tools.forEach(e => {
				e.isActive = false;
			});
			tool.isActive = true;
			Tools.setActiveTool(tool.name);
		}
	}
};

const app = new Vue({
	el: '#tools',
	data
});

function saveMap() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "/map",
		data: JSON.stringify({
			map,
			objectMap
		}),
		// success: function(){},
		dataType: "json"
	});
}