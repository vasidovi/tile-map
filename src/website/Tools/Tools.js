let activeTool = {};

class Tools {
	static get activeTool() {
		return activeTool;
	}

	static setActiveTool(toolName) {
		activeTool = tools[toolName];
		if (!activeTool) {
			console.log(`Couldn't find tool by name '${toolName}'`);
		}
	}
}

const tools = {
	pavement: "pavement",
	grass: "grass",
};