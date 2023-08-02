// ----- libraries
// ---------------------------------------------------------------------------------------
// :: importing three.js
import * as three from "three";
// :: importing orbital control feature with mouse
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// :: import stats
import Stats from "three/examples/jsm/libs/stats.module";

export default class Application {
    constructor(canvas_id) {
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        // camera parameters
        this.fov = 60;
        this.near = 1;
        this.far = 1000;
        this.canvas_id = canvas_id;

        // additional components
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;

        // lighting
        this.ambient_light = undefined;
        this.directional_light = undefined;
        this.spot_light = undefined;
    }

    initialize() {}

    update_scene() {}

    render() {}
}
