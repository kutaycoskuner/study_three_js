// ----- libraries
// ---------------------------------------------------------------------------------------
// :: importing style
import "../styles/style.css";
// :: importing three.js
import * as three from "three";
// :: importing orbital control feature with mouse
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// :: import stats
import Stats from "three/examples/jsm/libs/stats.module";
// :: importing .gltf format model loading
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// :: import model paths
import model_data from "../data/maps/model_maps.json";

// variables
// ---------------------------------------------------------------------------------------
let angle = 0;
const rotation_axis = new three.Vector3(1, 1, 1).normalize();
const model = model_data.dolls;

// ----- functions
// ---------------------------------------------------------------------------------------
function update_scene() {
    requestAnimationFrame(update_scene);

    // angle += 0.005;
    const quaternion = new three.Quaternion().setFromAxisAngle(
        rotation_axis,
        angle
    );
    mesh.setRotationFromQuaternion(quaternion);
    wireframe.setRotationFromQuaternion(quaternion);

    orbitcontrols.update();
    stats.update();

    renderer.render(scene, camera);
}

function add_star() {
    const geometry = new three.SphereGeometry(0.25, 24, 24);
    const material = new three.MeshStandardMaterial({ color: 0xffffff });
    const star = new three.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => three.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

// ----- three js
// ---------------------------------------------------------------------------------------

// stats
const stats = Stats();
// document.body.appendChild(stats.dom);

// base
const scene = new three.Scene();

const fov = 60;
const aspect_ratio = window.innerWidth / window.innerHeight;
const near = 1.0;
const far = 1000.0;
const camera = new three.PerspectiveCamera(fov, aspect_ratio, near, far);
camera.position.set(-3, 4, 6);

const renderer = new three.WebGL1Renderer({
    canvas: document.querySelector("#bg"),
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



// :: model loader
const loader = new GLTFLoader();
loader.gammaOutput = true;

loader.load(
    `../data/models/${model.path}/scene.gltf`,
    (gltf) => {
        gltf.scene.scale.set(model.scale_factor, model.scale_factor,model.scale_factor,);
        // :: if the file is loaded add it to the scene
        scene.add(gltf.scene);
    }
);

// :: lights
const ambient_light = new three.AmbientLight(0xffffff, 0.5);
ambient_light.castShadow = true;
scene.add(ambient_light);

// const point_light = new three.PointLight(0xffffff);
// point_light.position.set(2, 2, 2);
// scene.add(point_light);

const spot_light = new three.SpotLight(0xffffff, 1);
spot_light.castShadow = true;
spot_light.power = 5;
spot_light.position.set(0, 1, 2);
scene.add(spot_light);

// helpers
// const helper_point_light = new three.PointLightHelper(point_light);
// scene.add(helper_point_light);

const helper_grid = new three.GridHelper(50, 50);
// scene.add(helper_grid);

// orbit controls
const orbitcontrols = new OrbitControls(camera, renderer.domElement);

// ----- geometry
const segments = 8;
const geometry = new three.BoxGeometry(1, 1, 1, segments, segments, segments);

// standard, basic, normal, phong
const mesh_material = new three.MeshPhongMaterial({
    color: 0xff0000,
});
const mesh = new three.Mesh(geometry, mesh_material);
// scene.add(mesh);

const wireframe_material = new three.MeshBasicMaterial({
    color: 0x414141,
    wireframe: true,
});
const wireframe = new three.Mesh(geometry, wireframe_material);
// scene.add(wireframe);



// Array(200).fill().forEach(add_star);

// const space_texture = new three.TextureLoader().load("space.jpg");
// scene.background = space_texture;

// ----- events
// ---------------------------------------------------------------------------------------
window.addEventListener('resize', ()=> {
    this._OnWindowResize();
}, false);

// ----- render
// ---------------------------------------------------------------------------------------
// renderer.render(scene, camera);
update_scene();
