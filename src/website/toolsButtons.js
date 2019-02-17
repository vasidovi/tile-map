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
