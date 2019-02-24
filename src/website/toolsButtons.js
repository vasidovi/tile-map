// import Vue from 'vue';
// import Tools from './Tools/Tools.mjs';

let tools = [{
	name: 'save',
	title: 'Save',
	src: 'https://cdn3.iconfinder.com/data/icons/vector-icons-for-mobile-apps-2/512/Save_black-512.png',
	action: saveMap
}];

// addTileTools(tools);


function addTileTools() {

	// [of images]
	const images = getImages();
	console.log(images);

	// for (img in images) {
	// 	// tool has {name: , title, src}	
	// 	const tileTool = makeTileTool(tileImg);
	// 	tools.push(tileTool);
	// }
};


function getImages(){

	$.ajax({
		type: "GET",
		success: function(imageNames) {
			console.log(imageNames);
	 },
		url: "/images",
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

// data.setActiveTool(data.tools.find(e => e.name === 'pavement'));

const app = new Vue({
	el: '#tools',
	data
});

function saveMap() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "/map",
		data: JSON.stringify(map),
		// success: function(){},
		dataType: "json"
	});
}