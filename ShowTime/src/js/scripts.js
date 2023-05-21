import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as dat from 'three/addons/libs/lil-gui.module.min.js'; 


const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0x000000, 1 );
renderer.shadowMap.enabled=true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,500);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(3,29,100);
orbit.target.set(0,75,-150);
scene.add(camera);
scene.add(orbit);
//orbit.position(3,29,100);

//var targetPosition = new THREE.Vector3( 0, 200, -150 );
//camera.lookAt(targetPosition);
// Disable panning and enable auto rotation
//orbit.enablePan = false;
//orbit.autoRotate = true;
//orbit.autoRotateSpeed = 0.5; // Adjust the rotation speed

// Disable damping if you want smooth continuous rotation
//orbit.enableDamping = false;


//Start Show option
const textureLoader = new THREE.TextureLoader();
const panelTexture = textureLoader.load('./images/welcome_image.png', function (texture) {
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearFilter;
});

const panelGeometry = new THREE.PlaneGeometry(150, 150);
const panelMaterial = new THREE.MeshBasicMaterial({ map: panelTexture, transparent: true });
let panelMesh = new THREE.Mesh(panelGeometry, panelMaterial);
scene.add(panelMesh);
panelMesh.castShadow = true;
panelMesh.receiveShadow = true;
//panelMesh.rotation.z = 0.5 * Math.PI;
panelMesh.position.set(0, 75, -145);

let woodTexture = textureLoader.load('./textures/wood-texture.jpg');
// Set texture repeat and wrap options for tiling
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(4, 4);

let fabricTexture = textureLoader.load('./textures/red-fabric.webp');
fabricTexture.wrapS = THREE.RepeatWrapping;
fabricTexture.wrapT = THREE.RepeatWrapping;
fabricTexture.repeat.set(1, 1);
let floorTexture = textureLoader.load('./textures/floor-texture.jpg');

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);
let wallTexture = textureLoader.load('./textures/wall-texture.webp');

wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(10, 10);

let roofTexture = textureLoader.load('./textures/roof-texture.jpg');
roofTexture.wrapS = THREE.RepeatWrapping;
roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(2, 2);

let trunkTexture = textureLoader.load('./textures/trunck-texture.jpeg');
trunkTexture.wrapS = THREE.RepeatWrapping;
trunkTexture.wrapT = THREE.RepeatWrapping;
trunkTexture.repeat.set(1, 1);

let leavesTexture = textureLoader.load('./textures/leaves-texture.jpeg');
leavesTexture.wrapS = THREE.RepeatWrapping;
leavesTexture.wrapT = THREE.RepeatWrapping;
leavesTexture.repeat.set(10, 10);

let houseTexture = textureLoader.load('./textures/house-texture.jpg');
houseTexture.wrapS = THREE.RepeatWrapping;
houseTexture.wrapT = THREE.RepeatWrapping;
houseTexture.repeat.set(1, 1);

let skyTexture = textureLoader.load('./textures/sky-texture.jpg');
skyTexture.wrapS = THREE.RepeatWrapping;
skyTexture.wrapT = THREE.RepeatWrapping;
skyTexture.repeat.set(1, 1);

let darkSkyTexture = textureLoader.load('./textures/darksky-texture.jpg');
darkSkyTexture.wrapS = THREE.RepeatWrapping;
darkSkyTexture.wrapT = THREE.RepeatWrapping;
darkSkyTexture.repeat.set(1, 1);

let grassTexture = textureLoader.load('./textures/grass-texture.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(10, 10);

let sunTexture = textureLoader.load('./textures/sun-texture.png');
sunTexture.wrapS = THREE.RepeatWrapping;
sunTexture.wrapT = THREE.RepeatWrapping;
sunTexture.repeat.set(1, 1);

let cloudTexture = textureLoader.load('./textures/cloud-texture.avif');
cloudTexture.wrapS = THREE.RepeatWrapping;
cloudTexture.wrapT = THREE.RepeatWrapping;
cloudTexture.repeat.set(1, 1);
let darkcloudTexture = textureLoader.load('./textures/darkCloud-texture.jpeg');
darkcloudTexture.wrapS = THREE.RepeatWrapping;
darkcloudTexture.wrapT = THREE.RepeatWrapping;
darkcloudTexture.repeat.set(1, 1);

let directionalLight = new THREE.DirectionalLight(0xffffff,1.2);
directionalLight.position.set(0,75,180); 
directionalLight.castShadow=true;
let pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 100, 0);
scene.add(pointLight);



//audio shit:
const listener = new THREE.AudioListener();
camera.add(listener);
const audioLoader = new THREE.AudioLoader();
const birdSingingSound = new THREE.Audio(listener);
let birdSingingSource;
audioLoader.load('./audio/bird_sounds.mp3', function(buffer) {
  birdSingingSound.setBuffer(buffer);
  birdSingingSound.setLoop(true);
  birdSingingSound.setVolume(0.7);
});

const listener_summer = new THREE.AudioListener();
camera.add(listener_summer);
const audioLoader_summer = new THREE.AudioLoader();
const summerSounds = new THREE.Audio(listener_summer);
let summerSoundsSource;

audioLoader_summer.load('./audio/summer_sounds.mp3', function(buffer) {
  summerSounds.setBuffer(buffer);
  summerSounds.setLoop(true);
  summerSounds.setVolume(0.5);

  summerSoundsSource = new THREE.PositionalAudio(listener_summer);
  summerSoundsSource.setBuffer(summerSounds.buffer);
  summerSoundsSource.setRefDistance(10); // Adjust the reference distance as needed
  //summerSoundsSource.setDistanceModel('linear'); // Adjust the distance model as needed

  // Attach summerSoundsSource to the listener
  listener_summer.add(summerSoundsSource);
});

const audioLoader_wind = new THREE.AudioLoader();
const strongWindSound = new THREE.Audio(listener);
let strongWindSource;
audioLoader_wind.load('./audio/strong_wind.mp3', function(buffer) {
  strongWindSound.setBuffer(buffer);
  strongWindSound.setLoop(true);
  strongWindSound.setVolume(0.5);
  strongWindSource = new THREE.PositionalAudio(listener);
  strongWindSource.setBuffer(strongWindSound.buffer);
  strongWindSource.setRefDistance(10); // Adjust the reference distance as needed
  strongWindSource.setDistanceModel('linear'); // Adjust the distance model as needed
});
//Thunder sound
const listener_lightning = new THREE.AudioListener();
camera.add(listener_lightning);
const audioLoader_lightning = new THREE.AudioLoader();
const lightningSound = new THREE.Audio(listener_lightning);
//let lightningSouce;
audioLoader_lightning.load('./audio/thunder.mp3', function(buffer) {
  lightningSound.setBuffer(buffer);
  lightningSound.setLoop(true);
  lightningSound.setVolume(0.7);
});
//Rain sound
const listener_rain = new THREE.AudioListener();
camera.add(listener_rain);
const audioLoader_rain = new THREE.AudioLoader();
const rainSound = new THREE.Audio(listener_rain);
//let lightningSouce;
audioLoader_rain.load('./audio/rain.mp3', function(buffer) {
  rainSound.setBuffer(buffer);
  rainSound.setLoop(true);
  rainSound.setVolume(0.6);
});


let material_body;
let triangleMaterial;
let canvas;
let plane_front;
let clouds =[];
let single_cloud;
let sun;
let trees=[];
let house;
let roof;
let hill;
let rainDrops = [];
let isLightningEnabled = false;
let lightningSoundPlaying = false;
let lightningMaterial;
createTheather();

let stats = initStats();
//Gui
const options = {
    shadow:true,
    bird:false,
    cloudy:false,
    startShow: false,
    createRain: false,
    createLightning:false,
    camera1: false,
    camera2: false,
    camera3: false,
    camera4: true,
};
let guiStartShow = new dat.GUI();
let guiOptions = new dat.GUI();

guiStartShow.add(options,'camera1').name('Stage Camera').onChange(function(value){
  camera.position.set(50,50,-50);
  orbit.target.set(0,65,-150);
  orbit.update();
});
guiOptions.add(options,'camera1').name('Stage Camera').onChange(function(value){
  camera.position.set(50,50,-50);
  orbit.target.set(0,65,-150);
  orbit.update();
});
guiStartShow.add(options,'camera2').name('Back Camera').onChange(function(value){
  camera.position.set(50,50,150);
  orbit.target.set(0,50,100);
  orbit.update();
});
guiOptions.add(options,'camera2').name('Back Camera').onChange(function(value){
  camera.position.set(50,50,150);
  orbit.target.set(0,50,100);
  orbit.update();
});
guiStartShow.add(options,'camera3').name('Front Row Camera').onChange(function(value){
  camera.position.set(0,30,30);
  orbit.target.set(0,75,-150);
  orbit.update();
});
guiOptions.add(options,'camera3').name('Front Row Camera').onChange(function(value){
  camera.position.set(0,20,10);
  orbit.target.set(0,75,-150);
  orbit.update();
});
guiStartShow.add(options,'camera4').name('Seat Camera').onChange(function(value){
  
    camera.position.set(3,29,100);
    orbit.target.set(0,75,-150);
    orbit.update();
  
});
guiOptions.add(options,'camera4').name('Seat Camera').onChange(function(value){

    camera.position.set(3,29,100);
    orbit.target.set(0,75,-150);
    orbit.update();
});

guiOptions.add(options, 'createLightning').name('Thunderstorm').onChange(function (value) {
  options.createLightning = value;
  isLightningEnabled = value;

  if (isLightningEnabled && options.cloudy) {
    createRandomLightning();
  }
});
guiOptions.add(options, 'createRain').name('Rainy').onChange(function (value) {
  if (value  && options.cloudy) {

    if(options.cloudy)
      for (let i = 0; i < 10; i++) {
        createRainDrop();
        if(options.shadow) clouds[i].material.color.set(0x000000);
        else{
          let cloudMaterial = new THREE.MeshLambertMaterial({ map:darkcloudTexture, side:THREE.DoubleSide });
          clouds[i].material = cloudMaterial;
        }
      }
      rainSound.play();
    } else {
    // Remove raindrops
    removeRainDrops();
    rainSound.stop();
  }
});



guiStartShow.add(options, 'startShow').name('Start Show').onChange(function(value) {
  options.startShow = value;
  toggleGUIVisibility();

  if (options.startShow) {
    sunnyWeather();
    scene.add(directionalLight);
    scene.remove(pointLight);
    
    scene.add(canvas);
    scene.add(summerSoundsSource);
    camera.add(summerSoundsSource); // Attach summer sounds to the camera
    summerSoundsSource.play(); // Play the summer sounds
    console.log("removing panel");
    scene.remove(panelMesh);
  } else {
    scene.add(panelMesh);
  }
});


guiOptions.add(options, 'bird').name('Add a bird to the scene').onChange(function(value) {
  if (birdSingingSource) {
    birdSingingSource.stop(); // Stop the previously playing sound, if any
  }
  birdSingingSource = new THREE.PositionalAudio(listener);
  birdSingingSource.setBuffer(birdSingingSound.buffer);
  birdSingingSource.setRefDistance(10); // Adjust the reference distance as needed
  birdSingingSource.setDistanceModel('linear'); // Adjust the distance model as needed
  birdSingingSource.play();
  birdSingingSource.position.set(0, 0, 0);
  bird(0, Math.floor(Math.random() * 101) + 50, -150);
  
});
guiOptions.add(options, 'cloudy').name('Cloudy').onChange(function(value) {
  options.cloudy = value;

  if (value) {
    if(options.shadow) {
      let darkMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide });
      plane_front.material= darkMaterial;
    }
    else {
      let darkskyMaterial = new THREE.MeshLambertMaterial({ map:darkSkyTexture, side:THREE.DoubleSide });
      plane_front.material = darkskyMaterial;
    }
  }
  else {
    let darkskyMaterial = new THREE.MeshLambertMaterial({ map:skyTexture, side:THREE.DoubleSide });
    plane_front.material = darkskyMaterial;
  }

  if (options.cloudy) {
    cloud(0, 120, -150);
    cloud(50, 100, -150);
    cloud(50, 130, -150);
    cloud(-50, 130, -150);
    cloud(-50, 100, -150);
    //clouds.push(cloud1);
    //clouds.push(cloud2);
    //clouds.push(cloud3);
    //clouds.push(cloud4);
    //clouds.push(cloud5);

    for (let i = 0; i < clouds.length; i++) {
      scene.add(clouds[i]);
    }

    if (summerSoundsSource && summerSoundsSource.isPlaying) {
      summerSoundsSource.stop(); // Stop the summer sounds if playing
    }

    if (strongWindSource && !strongWindSource.isPlaying) {
      console.log('playing strong wind');
      camera.add(strongWindSource); // Attach strong wind sound to the camera
      strongWindSource.play(); // Play the strong wind sound if not already playing
    }
  } else {
    for (let i = 0; i < clouds.length; i++) {
      scene.remove(clouds[i]);
    }
    clouds =[]; 
    if (strongWindSource && strongWindSource.isPlaying) {
      strongWindSource.stop(); // Stop the strong wind sound if playing
    }
    if (summerSoundsSource && !summerSoundsSource.isPlaying) {
      console.log('playing summer sounds');
      camera.add(summerSoundsSource); // Attach summer sounds to the camera
      summerSoundsSource.play(); // Play the summer sounds if not already playing
    }
  }
});

guiOptions.add(options, 'shadow').name('Shadow Mode').onChange( function( value ) {
  // Update the color of the material
  
  if(value) {
    sun.material.color.set( 0x000000 );
    hill.material.color.set( 0xffffff );
    house.material.color.set( 0x000000);
    roof.material.color.set(0x000000);
  }
  else{
    const houseMaterial = new THREE.MeshLambertMaterial({ map: houseTexture, side: THREE.DoubleSide });
    house.material = houseMaterial;
    const roofMaterial = new THREE.MeshLambertMaterial({ map: roofTexture, side: THREE.DoubleSide });
    roof.material = roofMaterial;
    const grassMaterial = new THREE.MeshLambertMaterial({ map: grassTexture, side: THREE.DoubleSide });
    hill.material = grassMaterial;
    const sunMaterial = new THREE.MeshLambertMaterial({ map: sunTexture, side: THREE.DoubleSide });
    sun.material = sunMaterial;
  }
  trees.forEach(function(tree) {
      tree.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
              if (child.name === "base") {
                if(value) {
                  child.material.color.set(0x000000); // Change color to brown
                }
                else {
                  let trunckMaterial = new THREE.MeshLambertMaterial({ map:trunkTexture, side:THREE.DoubleSide });
                  child.material = trunckMaterial;
                }
              } else {
                if(value){

                  child.material.color.set(value ? 0x000000 : 0x00ff00); // Change color to green
                }
                else{
                  let leavesMaterial = new THREE.MeshLambertMaterial({ map:leavesTexture, side:THREE.DoubleSide });
                  child.material = leavesMaterial;
                }
              }
          }
      });
  });
  if(value === true) {
    if(!scene.children.includes(canvas)) {
      scene.add(canvas);
    }
     // scene.add(canvas);
      scene.remove(hill);
  }
  if(value === false) {
      scene.remove(canvas);
      scene.add(hill);
  }
  if(options.cloudy) {
    if (value) {
      let darkMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide });
      plane_front.material= darkMaterial;
    }
    else {
      let darkskyMaterial = new THREE.MeshLambertMaterial({ map:darkSkyTexture, side:THREE.DoubleSide });
      plane_front.material = darkskyMaterial;
    }
  }
  else {
    if (value) {
      let darkMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide });
      plane_front.material= darkMaterial;
    }
    else {
      let skyMaterial = new THREE.MeshLambertMaterial({ map:skyTexture, side:THREE.DoubleSide });
      plane_front.material = skyMaterial;
    }
  }
  
  for (let i = 0; i < clouds.length; i++) {
    if(options.shadow) clouds[i].material.color.set(0x000000);
    else{
        let darkskyMaterial = new THREE.MeshLambertMaterial({ map:darkSkyTexture, side:THREE.DoubleSide });
        plane_front.material = darkskyMaterial;
    }
  }
  
  for(let i = 0; i < rainDrops.length; i++) {
    rainDrops[i].material.color.set(value ? 0x000000:0x66ccff)
  }
  if(options.createLightning) {
    lightningMaterial.color.set(value ? 0xffffff : 0xE6FF00);
  }
});
// Function to toggle the visibility of the GUI instances
function toggleGUIVisibility() {
  if (options.startShow) {
    guiStartShow.domElement.style.display = 'block';
    guiOptions.domElement.style.display = 'block';
  } else {
    guiStartShow.domElement.style.display = 'block';
    guiOptions.domElement.style.display = 'none';
  }
}
// Call the function initially to set the visibility of the GUI instances
toggleGUIVisibility();

//
function createLightning(x = 0, y = 0, z = 0) {
  var lightningGroup = new THREE.Group();

  lightningMaterial = new THREE.MeshBasicMaterial({ color: 0xE6FF00 });

  var rectangleGeometry = new THREE.BoxGeometry(10, 25, 2);
  var triangleGeometry = new THREE.BufferGeometry();
  var triangleVertices = [
    x+5 , y -10, z,
    x-5 , y -5, z,
    x - 15, y - 40, z
  ];
  triangleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(triangleVertices, 3));
  triangleGeometry.setIndex([0, 1, 2]);
  

  var rectangle1 = new THREE.Mesh(rectangleGeometry, lightningMaterial);
  rectangle1.position.set(x, y , z);
  rectangle1.rotation.z = 3/4* Math.PI;
  lightningGroup.add(rectangle1);

  var rectangle2 = new THREE.Mesh(rectangleGeometry, lightningMaterial);
  rectangle2.position.set(x, y+11, z);
  rectangle2.rotation.z = -3/4* Math.PI;
  lightningGroup.add(rectangle2);

  var triangle = new THREE.Mesh(triangleGeometry, lightningMaterial);
  lightningGroup.add(triangle);

  lightningMaterial.color.set(options.shadow ? 0xffffff : 0xE6FF00);
  
  return lightningGroup;
}
// Assuming you have a GUI option that triggers the lightning effect
// Function to create a random lightning
function createRandomLightning() {
  if (isLightningEnabled) {
    var x = Math.random() * 160 - 80; // Random value between -80 and 80
    var y = 130;
    var z = -130;

    var lightningGroup = createLightning(x, y, z);
    scene.add(lightningGroup);

    setTimeout(function () {
      scene.remove(lightningGroup);
      scene.remove(pointLight);
      lightningSound.stop();
    }, 1000); // Lightning lasts for 2 seconds
    scene.add(pointLight);
    if (!lightningSoundPlaying) {
      lightningSoundPlaying = true;
      lightningSound.play();
    }

    var delay = Math.random() * 6000 + 4000; // Random delay between 4 and 10 seconds (4000 and 10000 milliseconds)
    setTimeout(createRandomLightning, delay);
  } else {
    if (lightningSoundPlaying) {
      lightningSoundPlaying = false;
      lightningSound.stop();
    }
  }
}

// Function to create a raindrop
function createRainDrop() {
  const raindropGeometry = new THREE.CylinderGeometry(0.5, 0.5, 10);
  const raindropMaterial = new THREE.MeshBasicMaterial({ color: 0x66ccff });
  const raindropMesh = new THREE.Mesh(raindropGeometry, raindropMaterial);
  if(options.shadow) {
    raindropMesh.material.color.set(0x000000);
  }
  // Randomize raindrop position within the desired range (y=150 to y=0)
  const posX = Math.random() * 200 - 100; // Range: -100 to 100
  const posY = 150; // Range: 0 to 150
  const posZ =  - 140; // Range: -100 to 100
  raindropMesh.position.set(posX, posY, posZ);

  scene.add(raindropMesh);
  rainDrops.push(raindropMesh);
  raindropMesh.fallingSpeed = Math.random() * 5 + 2; // Range: 2 to 7
}

// Function to remove all raindrops
function removeRainDrops() {
  for (const raindrop of rainDrops) {
    scene.remove(raindrop);
  }
  rainDrops.length = 0;
}

//Animate
animate();
function animate(time) {
    orbit.update();
    stats.update();
    // Update raindrops positions
    for (const raindrop of rainDrops) {
      raindrop.position.y -= raindrop.fallingSpeed;

      // If raindrop reaches the ground (y=0), remove it from the scene
      if (raindrop.position.y < 0) {
        scene.remove(raindrop);
        rainDrops.splice(rainDrops.indexOf(raindrop), 1);
        createRainDrop(); // Create a new raindrop at the top
      }
    }
  
    requestAnimationFrame( animate );

    renderer.render(scene,camera);
}

//Creates a cloud
function cloud(x=0,y=0,z=0) {
    var cloudGeometry = new THREE.SphereGeometry(20, 32, 32);
    var cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud0 = new THREE.Mesh(cloudGeometry, cloudMaterial);  
    cloud0.position.set(x-10,y+10,z);
    const cloudMaterial1 = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial1);
    cloud1.position.set(x,y,z);
    const cloudMaterial2 = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud2 = new THREE.Mesh(cloudGeometry, cloudMaterial2);
    cloud2.position.set(x-15,y,z);
    const cloudMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud3 = new THREE.Mesh(cloudGeometry, cloudMaterial3);
    cloud3.position.set(x-5,y+10,z);
    const cloudMaterial4 = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud3 = new THREE.Mesh(cloudGeometry, cloudMaterial4);
    cloud3.position.set(x+10,y+15,z);
    const cloudMaterial5 = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud4 = new THREE.Mesh(cloudGeometry, cloudMaterial5);
    cloud4.position.set(x+10,y+15,z);
    const cloudMaterial6 = new THREE.MeshStandardMaterial({ color: 0xffffff});
    var cloud5 = new THREE.Mesh(cloudGeometry, cloudMaterial6);
    cloud5.position.set(x+15,y+5,z);

    single_cloud =new THREE.Object3D();
    single_cloud.add(cloud0);
    single_cloud.add(cloud1);
    single_cloud.add(cloud2);
    single_cloud.add(cloud3);
    single_cloud.add(cloud4);
    single_cloud.add(cloud5);
    clouds.push(cloud0);
    clouds.push(cloud1);
    clouds.push(cloud2);
    clouds.push(cloud3);
    clouds.push(cloud4);
    clouds.push(cloud5);
    if(options.shadow) {
      cloud0.material.color.set(0x000000);
      cloud1.material.color.set(0x000000);
      cloud2.material.color.set(0x000000);
      cloud3.material.color.set(0x000000);
      cloud4.material.color.set(0x000000);
      cloud5.material.color.set(0x000000);
    }
    return single_cloud;
}

//Creates a bird
function bird(x=0,y=0,z=0){
    //Body
    const geometry_body = new THREE.CapsuleGeometry( 1, 10, 10, 10 ); 
    material_body = new THREE.MeshBasicMaterial( {color: 0x000000} ); 
    const body = new THREE.Mesh( geometry_body, material_body ); 
    body.position.set(x,y,z);
    body.rotateX(Math.PI / 2); // Rotate 90 degrees around x-axis
    body.rotateZ(Math.PI / 2); // Rotate 90 degrees around x-axis
    scene.add(body);
    //Right wing
    const wing_right = new THREE.BufferGeometry();
    const vertices_right = new Float32Array([
        10, 0, 0, // first vertex
        0, 0, -5, // second vertex
        0, 0, 5, // third vertex
    ]);
    wing_right.setAttribute('position', new THREE.BufferAttribute(vertices_right, 3));
    triangleMaterial = new THREE.MeshBasicMaterial({ color:0x000000, side:THREE.DoubleSide });
    let right_wing = new THREE.Mesh(wing_right, triangleMaterial);
    right_wing.rotateY(Math.PI / 2); 
    scene.add(right_wing);
    right_wing.position.set(x,y,z);
    //Left Wing
    const wing_left = new THREE.BufferGeometry();
    const vertices_left = new Float32Array([-10, 0, 0,  0, 0, -5, 0, 0, 5]);
    wing_left.setAttribute('position', new THREE.BufferAttribute(vertices_left, 3));
    const left_wing = new THREE.Mesh(wing_left, triangleMaterial);
    scene.add(left_wing);
    left_wing.position.set(x,y,z);
    left_wing.rotateY(Math.PI / 2); // Rotate 90 degrees around x-axis
    
    // Variables for flaping wigs
    let flapDirection = 1; 
    let flapSpeed = 0.1; 
    let flapAngle = 0; 
    let birdX = 90;
    birdSingingSource = new THREE.PositionalAudio(listener);
    birdSingingSource.setBuffer(birdSingingSound.buffer);
    birdSingingSource.setRefDistance(10); // Adjust the reference distance as needed
    birdSingingSource.setDistanceModel('linear'); // Adjust the distance model as needed
    birdSingingSource.play();
    birdSingingSource.position.set(0, 0, 0);
    // Flap wings
    function flapWings() {
        if(options.shadow) {
            triangleMaterial.color.set( 0x000000);
            material_body.color.set(0x000000);
        }
        else {
          triangleMaterial.color.set(0x766A6A );
          material_body.color.set(0x766A6A );
        }
        right_wing.rotation.z = Math.sin(flapAngle) * Math.PI / 4;
        left_wing.rotation.z = -Math.sin(flapAngle) * Math.PI / 4;
        flapAngle += flapDirection * flapSpeed;
        if (flapAngle > Math.PI / 4 || flapAngle < -Math.PI / 4) {
            flapDirection = -flapDirection;
        }
        body.position.x = birdX;
        right_wing.position.x =birdX;
        left_wing.position.x =birdX
        birdX -= 0.5;
        if(birdX < -90) {
            scene.remove(left_wing);
            scene.remove(right_wing);
            scene.remove(body);
            birdSingingSource.stop();
        }
        requestAnimationFrame(flapWings);
    }
    flapWings();
}
//Sunny weather
function sunnyWeather() {
    //Creates the sun
    const geometry_sun = new THREE.SphereGeometry( 15, 50, 50 );
    const material_sun = new THREE.MeshStandardMaterial({color: 0x000000});
    sun = new THREE.Mesh( geometry_sun, material_sun );
    scene.add(sun);
    sun.receiveShadow = true;
    sun.castShadow = true;
    sun.position.set(55,130,-155);
    //Creates the house
    var geometry_house = new THREE.BoxGeometry(50, 60, 50);
    var material_house = new THREE.MeshLambertMaterial({ color: 0x000000,side:THREE.DoubleSide });
    house = new THREE.Mesh(geometry_house, material_house);
    house.position.set(30,40,-150);
    scene.add(house);
    house.castShadow = true;
    house.recieveShaddow = true;
    house.rotation.y = (3*Math.PI)/4;
    const geometry_houseRoof = new THREE.ConeGeometry( 50, 20, 4, 1,false, 6.283185307179586,6.283185307179586 ); 
    const material_houseRoof = new THREE.MeshBasicMaterial( {color: 0x000000} );
    roof = new THREE.Mesh(geometry_houseRoof, material_houseRoof ); 
    scene.add( roof );
    roof.position.set(30,80,-150);
    //Creates the trees
    let tree = createTree(8,40,-40,10,-150);
    scene.add(tree);
    trees.push(tree);
    let tree1 = createTree(5,20,-55,10,-152);
    scene.add(tree1);
    trees.push(tree1);
    let tree2 = createTree(8,40,-70,10,-150);
    scene.add(tree2);
    trees.push(tree2);
    //Creates hills
    const geometry_hill = new THREE.CircleGeometry( 140, 32 ); 
    const material_hill = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
    hill = new THREE.Mesh( geometry_hill, material_hill ); 
    //scene.add( hill);
    hill.position.set(-20,-70,-149);
}

//Creates a tree
function createTree(radius = 0, height =0,x = 0, y = 0, z=0) {
    // Creating a model by grouping basic geometries
    // Cylinder centered at the origin
    const cylinderRadius = radius;
    const cylinderHeight = height;
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, 32);
    let redMaterial = new THREE.MeshLambertMaterial({ color:0x000000 });
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
    var material = new THREE.MeshStandardMaterial({ map:fabricTexture});
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
    //Join everithing
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
    var material_floor = new THREE.MeshStandardMaterial({ map: woodTexture,side:THREE.DoubleSide });
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
    const material = new THREE.MeshLambertMaterial({map:floorTexture,side:THREE.DoubleSide});
    const plane = new THREE.Mesh(geometry,material);
    plane.castShadow = true;
    plane.recieveShaddow = true;
    plane.rotation.x = 0.5*Math.PI;
    plane.rotation.z = 0.5*Math.PI;
    plane.position.set(0,0,-50);
    scene.add(plane);
    //audiance
    const geometry_chairs = new THREE.PlaneGeometry(125,150);
    const material_chairs = new THREE.MeshLambertMaterial({map:floorTexture,side:THREE.DoubleSide});
    const plane_chairs = new THREE.Mesh(geometry_chairs,material_chairs);
    plane_chairs.castShadow = true;
    plane_chairs.recieveShaddow = true;
    plane_chairs.rotation.x = 0.5*Math.PI - 0.2 ;
    plane_chairs.rotation.z = 0.5*Math.PI;
    plane_chairs.position.set(0,10,75);
    scene.add(plane_chairs);
    //stage
    // Load wood texture
   

    // Create stage mesh with wood material
    const geometry_stage2 = new THREE.BoxGeometry(150, 10, 150);
    const material_stage2 = new THREE.MeshLambertMaterial({ map: woodTexture, side: THREE.DoubleSide });
    const cube_stage2 = new THREE.Mesh(geometry_stage2, material_stage2);
    cube_stage2.position.set(0, 5, -75);
    scene.add(cube_stage2);
    cube_stage2.castShadow = true;
    cube_stage2.receiveShadow = true;

    //top floor
    const geometry_floor = new THREE.PlaneGeometry(50,150);
    const material_floor = new THREE.MeshLambertMaterial({map:floorTexture,side:THREE.DoubleSide});
    const plane_floor = new THREE.Mesh(geometry_floor,material_floor);
    scene.add(plane_floor);
    plane_floor.castShadow = true;
    plane_floor.recieveShaddow = true;
    plane_floor.rotation.x = 0.5*Math.PI;
    plane_floor.rotation.z = 0.5*Math.PI;
    plane_floor.position.set(0,22.5,161);
    //celling
    const geometry_celling = new THREE.PlaneGeometry(336,150);
    const material_celling = new THREE.MeshLambertMaterial({map:wallTexture,side:THREE.DoubleSide, opacity:1});
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
    const material_right = new THREE.MeshLambertMaterial({map:wallTexture,side:THREE.DoubleSide});
    const plane_right = new THREE.Mesh(geometry_right,material_right);
    plane_right.castShadow = true;
    plane_right.recieveShaddow = true;
    plane_right.rotation.z = 0.5*Math.PI;
    plane_right.rotation.y = 0.5*Math.PI;
    plane_right.position.set(75,75,18);
    scene.add(plane_right);
    //Left wall
    const geometry1 = new THREE.PlaneGeometry(150,336);
    const material1 = new THREE.MeshLambertMaterial({map:wallTexture,side:THREE.DoubleSide});
    const plane1 = new THREE.Mesh(geometry1,material1);
    plane1.castShadow = true;
    plane1.recieveShaddow = true;
    plane1.rotation.z = 0.5*Math.PI;
    plane1.rotation.y = 0.5*Math.PI;
    plane1.position.set(-75,75,18);
    scene.add(plane1);
    //back wall
    const geometry_back = new THREE.PlaneGeometry(150,150);
    const material_back = new THREE.MeshLambertMaterial({map:wallTexture,side:THREE.DoubleSide});
    const plane_back = new THREE.Mesh(geometry_back,material_back);
    plane_back.castShadow = true;
    plane_back.recieveShaddow = true;
    plane_back.rotation.z = 0.5*Math.PI;
    plane_back.position.set(0,75,186);
    scene.add(plane_back);
    // Front wall and canvas
    const geometry_front = new THREE.PlaneGeometry(150,150);
    const material_front = new THREE.MeshLambertMaterial({color: 0xffffff ,side:THREE.DoubleSide});
    plane_front = new THREE.Mesh(geometry_front,material_front);
    plane_front.castShadow = true;
    plane_front.recieveShaddow = true;
    plane_front.rotation.z = 0.5*Math.PI;
    plane_front.position.set(0,75,-150);
    scene.add(plane_front);
    //Canvas
    const geometry_canvas = new THREE.PlaneGeometry(150,150);
    const material_canvas = new THREE.MeshBasicMaterial({color: 0xffffff ,side:THREE.DoubleSide,transparent: true, opacity: 0.8 });
    canvas = new THREE.Mesh(geometry_canvas,material_canvas);
    canvas.castShadow = true;
    canvas.recieveShaddow = true;
    canvas.rotation.z = 0.5*Math.PI;
    canvas.position.set(0,75,-100);
  }

//To show fps counter 
function initStats() {
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById("Stats-output").appendChild(stats.domElement);
  return stats;
}
