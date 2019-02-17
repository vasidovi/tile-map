// import Vue from 'vue';
// import Tools from './Tools/Tools.mjs';


const data = {
	tools: [{
		name: 'pavement',
		title: 'Pavement',
		src: '../../res/images/pavement_tile.jpg'
	},{
		name: 'grass',
		title: 'Grass',
		src: '../../res/images/grass_tile.png'
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
	const savedMap = "const map=" + JSON.stringify(map);

	var blob = new Blob([savedMap], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "map.js");
}
