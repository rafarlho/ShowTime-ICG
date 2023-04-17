createTheather();

//Creates the scene
function createTheather() {
    create_floor();
    createWall();
    chair_row(57,15,-100);
    chair_row(57,22,-129);
    chair_row(57,27,-158);
    chair_row(57,33,-187);
    chair_row(57,39,-216);
    chair_row(57,44,-245);

    chair_row(-90,15,-100);
    chair_row(-90,22,-129);
    chair_row(-90,27,-158);
    chair_row(-90,33,-187);
    chair_row(-90,39,-216);
    chair_row(-90,44,-245);

    chair_row(-16,15,-100);
    chair_row(-16,22,-129);
    chair_row(-16,27,-158);
    chair_row(-16,33,-187);
    chair_row(-16,39,-216);
    chair_row(-16,44,-245);
}

//Creates a single chair
function create_chair(x,y,z) { 
    //Bottom
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshLambertMaterial({ color: 0xFF0606 });
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
    back.recieveShaddow = true;

    let chair = new THREE.Object3D();
    chair.add(back);
    chair.add(cube);
    
    chair.rotation.y = Math.PI;

    
    return chair;
}
//Creates a row with 4 chairs
function chair_row(x,y,z) { //Adds chairs to a row with a floor
    //Chairs
    var chair1 = create_chair(x,y,z);
    var chair2 = create_chair(x+11,y,z);
    var chair3 = create_chair(x+22,y,z);
    var chair4 = create_chair(x+33,y,z);
    
    //Floor of chairs
    var geometry_floor = new THREE.BoxGeometry(55, 18, 30);
    var material_floor = new THREE.MeshLambertMaterial({ color: 0x8B4513,side:THREE.DoubleSide });
    var cube_floor = new THREE.Mesh(geometry_floor, material_floor);
    cube_floor.position.set(-x-16,y-9,-z-5);
    
    cube_floor.castShadow = true;
    cube_floor.recieveShaddow = true;
    var chair_row = new THREE.Object3D();
    
    //Adds to chair row
    chair_row.add(chair1);
    chair_row.add(chair2);
    chair_row.add(chair3);
    chair_row.add(chair4);
    chair_row.add(cube_floor);
    chair_row.castShadow= true;
    chair_row.recieveShaddow =true;

    //Add scene
    scene.add(cube_floor);
    scene.add(chair_row);
}

//Creates the floor and the stage
function create_floor() {
    //Between stage and audiance
    const geometry = new THREE.PlaneGeometry(300,300);
    const material = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry,material);
    plane.castShadow = true;
    plane.recieveShaddow = true;
    plane.rotation.x = 0.5*Math.PI;
    plane.rotation.z = 0.5*Math.PI;
    plane.position.set(0,0,-100);
    scene.add(plane);
    //audiance
    const geometry_chairs = new THREE.PlaneGeometry(250,300);
    const material_chairs = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_chairs = new THREE.Mesh(geometry_chairs,material_chairs);
    plane_chairs.castShadow = true;
    plane_chairs.recieveShaddow = true;
    plane_chairs.rotation.x = 0.5*Math.PI - 0.2 ;
    plane_chairs.rotation.z = 0.5*Math.PI;
    plane_chairs.position.set(0,20,150);
    scene.add(plane_chairs);
    //stage
    var geometry_stage2 = new THREE.BoxGeometry(300, 20, 200);
    var material_stage2 = new THREE.MeshLambertMaterial({ color: 0xA0522D,side:THREE.DoubleSide });
    var cube_stage2 = new THREE.Mesh(geometry_stage2, material_stage2);
    cube_stage2.position.set(0,10,-200);
    scene.add(cube_stage2);
    cube_stage2.castShadow = true;
    cube_stage2.recieveShaddow = true;

    const length = 150, width = 200;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 7,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 4,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 3
    };
    var geometry_stage =new THREE. ExtrudeGeometry( shape, extrudeSettings )
    var material_stage = new THREE.MeshLambertMaterial({ color: 0xA0522D,side:THREE.DoubleSide });
    var cube_stage = new THREE.Mesh(geometry_stage, material_stage);
    cube_stage.position.set(100,16,-150);
    scene.add(cube_stage);
    cube_stage.castShadow = true;
    cube_stage.recieveShaddow = true;
    cube_stage.rotation.x = 0.5*Math.PI;
    cube_stage.rotation.z = 0.5*Math.PI;

    //top floor
    const geometry_floor = new THREE.PlaneGeometry(100,300);
    const material_floor = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_floor = new THREE.Mesh(geometry_floor,material_floor);
    scene.add(plane_floor);
    plane_floor.castShadow = true;
    plane_floor.recieveShaddow = true;
    plane_floor.rotation.x = 0.5*Math.PI;
    plane_floor.rotation.z = 0.5*Math.PI;
    plane_floor.position.set(0,45,322);

    //celling
    const geometry_celling = new THREE.PlaneGeometry(672,300);
    const material_celling = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_celling = new THREE.Mesh(geometry_celling,material_celling);
    plane_celling.castShadow = true;
    plane_celling.recieveShaddow = true;
    plane_celling.rotation.x = 0.5*Math.PI;
    plane_celling.rotation.z = 0.5*Math.PI;
    plane_celling.position.set(0,300,36);
    scene.add(plane_celling);
}

function createWall(){
    const geometry_right = new THREE.PlaneGeometry(300,672);
    const material_right = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_right = new THREE.Mesh(geometry_right,material_right);
    plane_right.castShadow = true;
    plane_right.recieveShaddow = true;
    plane_right.rotation.z = 0.5*Math.PI;
    plane_right.rotation.y = 0.5*Math.PI;
    plane_right.position.set(150,150,36);
    scene.add(plane_right);

    const geometry1 = new THREE.PlaneGeometry(300,672);
    const material1 = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane1 = new THREE.Mesh(geometry1,material1);
    plane1.castShadow = true;
    plane1.recieveShaddow = true;
    plane1.rotation.z = 0.5*Math.PI;
    plane1.rotation.y = 0.5*Math.PI;
    plane1.position.set(-150,150,36);
    scene.add(plane1);
    //back wall
    const geometry_back = new THREE.PlaneGeometry(300,300);
    const material_back = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_back = new THREE.Mesh(geometry_back,material_back);
    plane_back.castShadow = true;
    plane_back.recieveShaddow = true;
    plane_back.rotation.z = 0.5*Math.PI;
    plane_back.position.set(0,150,372);
    scene.add(plane_back);
    // Front wall
    const geometry_front = new THREE.PlaneGeometry(300,300);
    const material_front = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_front = new THREE.Mesh(geometry_front,material_front);
    plane_front.castShadow = true;
    plane_front.recieveShaddow = true;
    plane_front.rotation.z = 0.5*Math.PI;
    plane_front.position.set(0,150,-300);
    scene.add(plane_front);
}