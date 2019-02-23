// import Vue from 'vue';
// import Tools from './Tools/Tools.mjs';


const data = {
	tools: [{
		name: 'pavement',
		title: 'Pavement',
		src: '../../images/pavement_tile.jpg'
	},{
		name: 'grass',
		title: 'Grass',
		src: '../../images/grass_tile.png'
	},
	{
		name: 'save',
		title: 'Save',
		src: 'https://cdn3.iconfinder.com/data/icons/vector-icons-for-mobile-apps-2/512/Save_black-512.png',
		action: saveMap
	}
	],
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

data.setActiveTool(data.tools.find(e => e.name === 'pavement'));

const app = new Vue({
	el: '#tools',
	data
});

function saveMap(){

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "/map",
		data: JSON.stringify(map),
		// success: function(){},
		dataType: "json"
	});
}
