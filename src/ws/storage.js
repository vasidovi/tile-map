const nodePersist = require('node-persist');

exports.get = async function (key) {
	return nodePersist.getItem(key);
};
exports.set = async function (key, item) {
	await nodePersist.setItem(key, item);
}

;
(async () => {
	await nodePersist.init(/* optional parameters */);

})();
