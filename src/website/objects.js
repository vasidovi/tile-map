 // tree 

 const treeSrc = "/images/objects/tree.png";
 
 const treeWidth = 40;
 const treeHeight = 60;
 const objects = {};
 const objectMap = [];
 const mapSize = 100;

 objects.tree = makeObject(treeSrc, treeWidth, treeHeight);


 function spawnRandomTrees(count){
	 while ( objectMap.length < count){
		 const x = getRandomInt(mapSize);
		 const y = getRandomInt(mapSize);
		 const tree = {
			 type: "tree",
			 x,
			 y,
			 width: treeWidth,
			 height: treeHeight
		 }
		 objectMap.push(tree);
	 }
 }

 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


 function makeObject(src, width, height) {
	return $("<img>").attr({
		src,
		width,
		height,
		ondragstart: "return false;",
	}).addClass("object");
}
