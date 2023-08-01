// ----- libraries
// ---------------------------------------------------------------------------------------
import "./style.css";
import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// variables
// ---------------------------------------------------------------------------------------
let angle = 0;
const rotation_axis = new three.Vector3(1,1,1).normalize();


// ----- functions
// ---------------------------------------------------------------------------------------
function update_scene() {
    requestAnimationFrame(update_scene);

    angle += 0.005;
    const quaternion = new three.Quaternion().setFromAxisAngle(rotation_axis, angle);
    mesh.setRotationFromQuaternion(quaternion);
    wireframe.setRotationFromQuaternion(quaternion);


    orbitcontrols.update();

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

// base
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1.0,
    100.0
);
const renderer = new three.WebGL1Renderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

// light
const point_light = new three.PointLight(0xffffff);
point_light.position.set(0, 0, 0);

const ambient_light = new three.PointLight(0xffffff);

scene.add(point_light, ambient_light);

// helpers
const helper_point_light = new three.PointLightHelper(point_light);
const helper_grid = new three.GridHelper(200, 50);

// scene.add(helper_point_light, helper_grid);

// orbit controls
const orbitcontrols = new OrbitControls(camera, renderer.domElement);

// ----- geometry
const geometry = new three.BoxGeometry(10, 10, 10);

const mesh_material = new three.MeshBasicMaterial({
    color: 0xf2f2f2,
});
const wireframe_material = new three.MeshBasicMaterial({
    color: 0x121212,
    wireframe: true,
});

const wireframe = new three.Mesh(geometry, wireframe_material);
const mesh = new three.Mesh(geometry, mesh_material);

scene.add(mesh, wireframe);

// Array(200).fill().forEach(add_star);

const space_texture = new three.TextureLoader().load('space.jpg');
// scene.background = space_texture;

// ----- render
// ---------------------------------------------------------------------------------------
// renderer.render(scene, camera);
update_scene();
