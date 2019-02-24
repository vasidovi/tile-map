// import Vue from 'vue';
// import Tools from './Tools/Tools.mjs';

let tools = [{
	name: 'save',
	title: 'Save',
	src: 'https://cdn3.iconfinder.com/data/icons/vector-icons-for-mobile-apps-2/512/Save_black-512.png',
	action: saveMap
}];

 getImages();

function addTileTools(images) {

	// console.log(images);
	 for (img of images) {
		 // tool has {name: , title, src}	
	 	const tileTool = makeTileTool(img);
		  tools.push(tileTool);
		 console.log(tileTool);
	 }
};

function makeTileTool(imageName) {
	const name =  imageName.slice(0, imageName.length-4).replace("_tile", "").replace("_", " ");
	return {
		name,
		title: name.charAt(0).toUpperCase() + name.slice(1),
		src: root + imageName,
	}
};
	
	

function getImages(){

	$.ajax({
		type: "GET",
		success: addTileTools,
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