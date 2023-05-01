import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'; 


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xffffff, 1 );
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0,30,100);
var targetPosition = new THREE.Vector3( 0, 150, -150 );
camera.lookAt(targetPosition);
orbit.update();



//const ambientLight = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);
//
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
scene.add(directionalLight);
directionalLight.position.set(0,75,180); 
directionalLight.castShadow=true;
//directionalLight.shadow.camera.bottom=-12;

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(directionalLightHelper);
const targetObject = new THREE.Object3D();
targetObject.position.set(0, 75, -150);
directionalLight.target = targetObject;
//
//const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
//scene.add(dLightShadowHelper);

//const spotlight = new THREE.SpotLight(0xffffff);
//scene.add(spotlight);
//spotlight.position.set(0,75,180); 
//spotlight.castShadow = true;
//spotlight.angle=0.2;
//
//const targetObject = new THREE.Object3D();
//targetObject.position.set(0, 75, -150);
//spotlight.target = targetObject;
//
//const spotlightHelper = new THREE.SpotLightHelper(spotlight);
//scene.add(spotlightHelper);

// Light that doesnt cast shaddow
//const light = new THREE.PointLight(0xffffff, 1);
//light.position.set(0, 100, -100);
//scene.add(light);

const gui = new dat.GUI();

const options = {
    shadow:true,
};



createTheather();
sunnyWeather();






let step = 0;

animate();
function animate(time) {
    requestAnimationFrame( animate );
    renderer.render(scene,camera);
}



//Sunny weather
function sunnyWeather() {
    //Creates the sun
    const geometry_sun = new THREE.SphereGeometry( 15, 50, 50 );
    const material_sun = new THREE.MeshStandardMaterial({color: 0x000000});
    const sun = new THREE.Mesh( geometry_sun, material_sun );
    scene.add(sun);
    sun.receiveShadow = true;
    sun.castShadow = true;
    sun.position.set(55,130,-150);
    //Creates the house
    var geometry_house = new THREE.BoxGeometry(50, 60, 50);
    var material_house = new THREE.MeshLambertMaterial({ color: 0x000000,side:THREE.DoubleSide });
    var house = new THREE.Mesh(geometry_house, material_house);
    house.position.set(30,30,-150);
    scene.add(house);
    house.castShadow = true;
    house.recieveShaddow = true;
    house.rotation.y = (3*Math.PI)/4;
    const geometry_houseRoof = new THREE.ConeGeometry( 50, 20, 4, 1,false, 6.283185307179586,6.283185307179586 ); 
    const material_houseRoof = new THREE.MeshBasicMaterial( {color: 0x000000} );
    const roof = new THREE.Mesh(geometry_houseRoof, material_houseRoof ); 
    scene.add( roof );
    roof.position.set(30,70,-150);
    //Creates the trees
    let trees=[];
    let tree = createTree(8,40,-40,10,-150);
    scene.add(tree);
    trees.push(tree);
    let tree1 = createTree(5,20,-55,10,-150);
    scene.add(tree1);
    trees.push(tree1);
    let tree2 = createTree(8,40,-70,10,-150);
    scene.add(tree2);
    trees.push(tree2);
    //Creates hills
    const geometry_hill = new THREE.CircleGeometry( 140, 32 ); 
    const material_hill = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
    const hill = new THREE.Mesh( geometry_hill, material_hill ); 
    scene.add( hill);
    hill.position.set(-20,-70,-149);
    //Gui options
    gui.add(options, 'shadow').name('Sun Shadow').onChange( function( value ) {
        // Update the color of the material
        sun.material.color.set( value ? 0x000000 : 0xFFFF00 );
        house.material.color.set( value ? 0x000000 : 0x838383 );
        roof.material.color.set( value ? 0x000000 : 0xba5625 );
        hill.material.color.set( value ? 0xffffff : 0x009900 );
        trees.forEach(function(tree) {
            tree.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    if (child.name === "base") {
                        child.material.color.set(value ? 0x000000 : 0xba5625); // Change color to brown
                    } else {
                        child.material.color.set(value ? 0x000000 : 0x00ff00); // Change color to green
                    }
                }
            });
        });
    });
}

//Creates a tree
function createTree(radius = 0, height =0,x = 0, y = 0, z=0) {
    // Creating a model by grouping basic geometries
    // Cylinder centered at the origin
    const cylinderRadius = radius;
    const cylinderHeight = height;
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
    let redMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const cylinder = new THREE.Mesh(cylinderGeometry, redMaterial);
    cylinder.name="base";
    // Move base of the cylinder to y = 0
    cylinder.position.y = cylinderHeight / 2.0;
    // Cone
    const baseConeRadius = 20;
    const coneHeight = 40;
    const coneGeometry = new THREE.ConeGeometry(baseConeRadius, coneHeight, 32);
    const greenMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const cone = new THREE.Mesh(coneGeometry, greenMaterial);
    cone.name="topo";
    // Move base of the cone to the top of the cylinder
    cone.position.y = cylinderHeight + coneHeight / 2.0;
    // Tree
    var tree = new THREE.Group();
    tree.add(cylinder);
    tree.add(cone);
    tree.position.x = x;
    tree.position.y = y;
    tree.position.z = z;
    tree.castShadow = true;
    tree.recieveShaddow = true;
    return tree;
}


//Creates the scene
function createTheather() {
    create_floor();
    createWall();
    
    chair_row(28.5,7.5,-50);
    chair_row(28.5,11,-65.5);
    chair_row(28.5,13.5,-158/2);
    chair_row(28.5,16.5,-187/2);
    chair_row(28.5,19.5,-216/2);
    chair_row(28.5,22,-245/2);

    chair_row(-90/2,15/2,-100/2);
    chair_row(-90/2,22/2,-129/2);
    chair_row(-90/2,27/2,-158/2);
    chair_row(-90/2,33/2,-187/2);
    chair_row(-90/2,39/2,-216/2);
    chair_row(-90/2,44/2,-245/2);

    chair_row(-16/2,15/2,-100/2);
    chair_row(-16/2,22/2,-129/2);
    chair_row(-16/2,27/2,-158/2);
    chair_row(-16/2,33/2,-187/2);
    chair_row(-16/2,39/2,-216/2);
    chair_row(-16/2,44/2,-245/2);
}

//Creates a single chair
function create_chair(x,y,z) { 
    //Bottom
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshStandardMaterial({ color: 0xFF0606});
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(x,y+2.5,z+2.5)
    
    cube.castShadow = true;
    cube.recieveShaddow = true;
    //Back
    var geometry2 = new THREE.BoxGeometry(5, 10, 1.5);
    var back = new THREE.Mesh(geometry2, material);
    back.position.set(x,y+5,z-0.5)
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
    var chair2 = create_chair(x+5.5,y,z);
    var chair3 = create_chair(x+11,y,z);
    var chair4 = create_chair(x+16.5,y,z);
    
    //Floor of chairs
    var geometry_floor = new THREE.BoxGeometry(22.5, 9, 15);
    var material_floor = new THREE.MeshStandardMaterial({ color: 0x8B4513,side:THREE.DoubleSide });
    var cube_floor = new THREE.Mesh(geometry_floor, material_floor);
    cube_floor.position.set(-x-8,y-4.5,-z-2.5);
    
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
    const geometry = new THREE.PlaneGeometry(150,150);
    const material = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry,material);
    plane.castShadow = true;
    plane.recieveShaddow = true;
    plane.rotation.x = 0.5*Math.PI;
    plane.rotation.z = 0.5*Math.PI;
    plane.position.set(0,0,-50);
    scene.add(plane);
    //audiance
    const geometry_chairs = new THREE.PlaneGeometry(125,150);
    const material_chairs = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_chairs = new THREE.Mesh(geometry_chairs,material_chairs);
    plane_chairs.castShadow = true;
    plane_chairs.recieveShaddow = true;
    plane_chairs.rotation.x = 0.5*Math.PI - 0.2 ;
    plane_chairs.rotation.z = 0.5*Math.PI;
    plane_chairs.position.set(0,10,75);
    scene.add(plane_chairs);
    //stage
    var geometry_stage2 = new THREE.BoxGeometry(150, 10, 150);
    var material_stage2 = new THREE.MeshLambertMaterial({ color: 0xA0522D,side:THREE.DoubleSide });
    var cube_stage2 = new THREE.Mesh(geometry_stage2, material_stage2);
    cube_stage2.position.set(0,5,-75);
    scene.add(cube_stage2);
    cube_stage2.castShadow = true;
    cube_stage2.recieveShaddow = true;

    //top floor
    const geometry_floor = new THREE.PlaneGeometry(50,150);
    const material_floor = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_floor = new THREE.Mesh(geometry_floor,material_floor);
    scene.add(plane_floor);
    plane_floor.castShadow = true;
    plane_floor.recieveShaddow = true;
    plane_floor.rotation.x = 0.5*Math.PI;
    plane_floor.rotation.z = 0.5*Math.PI;
    plane_floor.position.set(0,22.5,161);

    //celling
    const geometry_celling = new THREE.PlaneGeometry(336,150);
    const material_celling = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide, opacity:1});
    const plane_celling = new THREE.Mesh(geometry_celling,material_celling);
    plane_celling.castShadow = true;
    plane_celling.recieveShaddow = true;
    plane_celling.rotation.x = 0.5*Math.PI;
    plane_celling.rotation.z = 0.5*Math.PI;
    plane_celling.position.set(0,150,18);
    scene.add(plane_celling);
}

//Creates the walls
function createWall(){
    //Right wall
    const geometry_right = new THREE.PlaneGeometry(150,336);
    const material_right = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_right = new THREE.Mesh(geometry_right,material_right);
    plane_right.castShadow = true;
    plane_right.recieveShaddow = true;
    plane_right.rotation.z = 0.5*Math.PI;
    plane_right.rotation.y = 0.5*Math.PI;
    plane_right.position.set(75,75,18);
    scene.add(plane_right);
    //Left wall
    const geometry1 = new THREE.PlaneGeometry(150,336);
    const material1 = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane1 = new THREE.Mesh(geometry1,material1);
    plane1.castShadow = true;
    plane1.recieveShaddow = true;
    plane1.rotation.z = 0.5*Math.PI;
    plane1.rotation.y = 0.5*Math.PI;
    plane1.position.set(-75,75,18);
    scene.add(plane1);
    //back wall
    const geometry_back = new THREE.PlaneGeometry(150,150);
    const material_back = new THREE.MeshLambertMaterial({color:0x800000,side:THREE.DoubleSide});
    const plane_back = new THREE.Mesh(geometry_back,material_back);
    plane_back.castShadow = true;
    plane_back.recieveShaddow = true;
    plane_back.rotation.z = 0.5*Math.PI;
    plane_back.position.set(0,75,186);
    scene.add(plane_back);
    // Front wall and canvas
    const geometry_front = new THREE.PlaneGeometry(150,150);
    //var textureLoader = new THREE.TextureLoader();
    //var texture = textureLoader.load('../images/paper-texture.jpg');
    //const material_front = new THREE.MeshStandardMaterial({map: texture ,side:THREE.DoubleSide});
    const material_front = new THREE.MeshLambertMaterial({color: 0xffffff ,side:THREE.DoubleSide});
    const plane_front = new THREE.Mesh(geometry_front,material_front);
    plane_front.castShadow = true;
    plane_front.recieveShaddow = true;
    plane_front.rotation.z = 0.5*Math.PI;
    plane_front.position.set(0,75,-150);
    scene.add(plane_front);
}