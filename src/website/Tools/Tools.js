let activeTool = {};

class Tools {
	static get activeTool() {
		return activeTool;
	}

	static setActiveTool(toolName) {
		activeTool = toolName;
		if (!activeTool) {
			console.log(`Couldn't find tool by name '${toolName}'`);
		}
	}
}
