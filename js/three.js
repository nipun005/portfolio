//create a scene
     var model;
    // var dVector;
    // var canvas = document.getElementById("canvas");
    // const scene = new THREE.Scene()

    
    // //loading 3D assets
    //   const moduleurl = "./assets/environment.glb";
       const ballurl = "./assets/soccer_ball.glb";
      var loader = new THREE.GLTFLoader();

    //   loader.load(
    //     moduleurl,
    //     function(gltf) {
    //      const mainModel = gltf.scene;
    //      mainModel.scale.set(60,60,60);
    //        //model.rotation.y = 90;
    //        mainModel.position.y = -1.1;
    //        console.log(gltf);
    //        scene.add(mainModel);
    //     },
    //     function(event) {
    //       console.log(event);
    //     },
    //     function(error) {
    //       console.log(error);
    //     }
    //   )

      loader.load(
        ballurl,
        function(gltf) {
          model = gltf.scene;
           model.scale.set(0.4,0.4,0.4);
           //model.rotation.y = 90;
           model.position.y = -0.5;
           model.position.z = -2.0;
           scene.add(model);
        },
        function(event) {
          console.log(event);
        },
        function(error) {
          console.log(error);
        }
      )

  

    // // document.addEventListener('keyup', (e)=> {
    // //       console.log("keyup");
    // //       if(model) {
    // //         model.translateZ(1);
    // //       }
      
    // //   })

    //   document.addEventListener('keydown', (e)=> {
    //       console.log("keydown");
    //       if(e.which == '38') {
    //        // model.translateZ(-0.05);
    //         model.rotateZ(0.05);
    //       }

    //       if(e.which == '39') {
    //         //model.translateX(0.05);
    //         model.rotateX(-0.05);
    //       }
      
    //       if(e.which == '37') {
    //        // model.translateX(-0.05);
    //         model.rotateX(0.05);
    //       }

    //       if(e.which == '40') {
    //         //model.translateZ(0.05);
    //         model.rotateZ(-0.05);
    //       }
      
    //   })

    
    // //light
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    // light.position.set(2,2,5);
    // scene.add(light);

    // const pointLight = new THREE.PointLight(0xffffff, 1);
    // light.position.set(4,10,8);
    // scene.add(pointLight);

    // //create camera
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // camera.position.set(0, 0, 0.5);
    // scene.add(camera);

    
    // //rendering
    // var renderer = new THREE.WebGLRenderer({alpha: true});
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    // console.log(navigator);
      

    // //animating 
    // const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.update();

    //   function animate() {
    //   requestAnimationFrame(animate);
    //   if(model){
    //     //model.rotation.y = model.rotation.y - 0.01;
    //   }
    //   controls.update();
    //   renderer.render(scene,camera);
    //   }

    //   animate();






const scene = new THREE.Scene();
const clock = new THREE.Clock();
let controls = null;

const target = new THREE.Vector2();
const mouse = new THREE.Vector2();
//var canvas = document.getElementById("threejsCanvas");

const renderer = new THREE.WebGL1Renderer({
  alpha: true
});
document.getElementById('webgl').appendChild(renderer.domElement);
/**
 * Objects
 */

// Rings and boxes
const params = {};
params.count = 500;
params.size = 88;
params.rotation = 10;

let ringGeometry = null;
let cubeGeometry = null;
let Material = null;
let ringMesh = null;
let cubeMesh = null;

let objectGroup = null;

function addObjects() {
  // if (objectGroup !== null) {
  //   ringGeometry.dispose();
  //   cubeGeometry.dispose();

  //   Material.dispose();
  //   scene.remove(objectGroup);
  // }
  objectGroup = new THREE.Group();

  ringGeometry = new THREE.TorusBufferGeometry(0.3, 0.17, 16, 120);
  cubeGeometry = new THREE.BoxBufferGeometry(0.6, 0.6, 0.6);

  Material = new THREE.MeshNormalMaterial();

  for (let i = 0; i < params.count; i++) {
    ringMesh = new THREE.Mesh(ringGeometry, Material);
    ringMesh.position.x = (Math.random() - 0.5) * params.size;
    ringMesh.position.y = (Math.random() - 0.5) * params.size;
    ringMesh.position.z = (Math.random() - 0.5) * params.size;

    ringMesh.rotation.z = Math.sin(Math.random() * params.rotation);
    ringMesh.rotation.y = Math.cos(Math.random() * params.rotation);
    ringMesh.rotation.x = Math.sin(Math.random() * params.rotation);
    objectGroup.add(ringMesh);

    cubeMesh = new THREE.Mesh(cubeGeometry, Material);
    cubeMesh.position.x = (Math.random() - 0.5) * params.size;
    cubeMesh.position.y = (Math.random() - 0.5) * params.size;
    cubeMesh.position.z = (Math.random() - 0.5) * params.size;

    cubeMesh.rotation.z = Math.sin(Math.random() * params.rotation);
    cubeMesh.rotation.y = Math.cos(Math.random() * params.rotation);
    objectGroup.add(cubeMesh);
  }
  scene.add(objectGroup);
}
addObjects();

// Particles
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 800;

const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 30;
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true,
  fog: false,
  color: 0xf7f7ff,
});

const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particlePoints);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.z = 20;

/**
 * Renderer
 */

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

/**
 * Controls
 */


// if (window.innerWidth <= 1024) {
//   //addControls();
// } else {
//   camera.position.set(0, 0, 20);

//   addEventListener("mousemove", (event) => {
//     mouse.x = event.clientX / window.innerWidth - 0.5;
//     mouse.y = -(event.clientY / window.innerHeight - 0.5);
//   });
// }


function addControls() {
  camera.position.y = 4;
  camera.position.x = 4;
  camera.position.z = 40;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  // controls.enablePan = false;
  // controls.enableDamping = true;
  // controls.minPolarAngle = (Math.PI * 1) / 3;
  // controls.maxPolarAngle = (Math.PI * 2) / 3;
  // controls.minDistance = 8;
  // controls.maxDistance = 45;

  // controls.addEventListener("change", () => {
  //   renderer.render(scene, camera);
  // });
}

function disposeMobileControls() {
  if (controls) controls.update();
}

/**
 * Update Canvas on Resize
 */
addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  //animate();
  


  // if (window.innerWidth <= 1024) {
  //   disposeMobileControls();
  //   addControls();
  // } else {
  //   disposeMobileControls();
  //   camera.position.set(0, 0, 20);

  //   addEventListener("mousemove", (event) => {
  //     mouse.x = event.clientX / window.innerWidth - 0.5;
  //     mouse.y = -(event.clientY / window.innerHeight - 0.5);
  //   });
  // }
});

animate();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  if (objectGroup !== null) {
    objectGroup.rotation.y += Math.sin(elapsedTime) * 0.01;
    objectGroup.rotation.x += Math.sin(elapsedTime) * 0.01;

    // if (window.innerWidth >= 1024) {
    //   camera.position.x += Math.sin(elapsedTime) * 3;
    //   camera.position.y += Math.sin(-elapsedTime) * 3;
    // }
    camera.position.z += Math.sin(elapsedTime) * 0.05;

    particlePoints.rotation.y += Math.sin(elapsedTime) * 0.01;
    particlePoints.rotation.x += Math.cos(elapsedTime) * 0.01;
  }
  // if (window.innerWidth <= 1024) {
  //   controls.update();
  // } else {
  //   disposeMobileControls();

  //   target.x = mouse.x * 50;
  //   target.y = mouse.y * 50;

  //   camera.position.x += 0.1 * (target.x - camera.position.x);
  //   camera.position.y += 0.1 * (target.y - camera.position.y);
  //   camera.lookAt(new THREE.Vector3());
  // }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
