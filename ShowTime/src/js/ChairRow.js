export function create_chair(x,y,z) { 
	//Bottom
	var geometry = new THREE.BoxGeometry(10, 10, 10);
	var material = new THREE.MeshLambertMaterial({ color: 0xFF0606});
	var cube = new THREE.Mesh(geometry, material);
	cube.position.set(x,y+5,z+5)
	
	cube.castShadow = true;
	cube.recieveShaddow = true;
	//Back
	var geometry2 = new THREE.BoxGeometry(10, 20, 3);
	var back = new THREE.Mesh(geometry2, material);
	back.position.set(x,y+10,z-1)
	back.rotation.x = -0.2;
	
	back.castShadow = true;
	back.recieveShaddow = tru
	let chair = new THREE.Object3D();
	chair.add(back);
	chair.add(cube);
	
	chair.rotation.y = Math.P
	
	return chair;
}