import * as THREE from './node_modules/three/build/THREE.module.js';

document.addEventListener("DOMContentLoaded", async () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#0000FF" });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    cube.position.set(0, 0, -2);
    cube.rotation.set(0, Math.PI / 4, 0);

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(1, 1, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(500, 500);
    renderer.render(scene, camera);

    const video = document.createElement("video");
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
    });

    video.style.position = "absolute";
    video.style.width = "500px"; // Set width explicitly
    video.style.height = "500px"; // Set height explicitly
    renderer.domElement.style.position = "absolute";
    document.body.appendChild(video);
    document.body.appendChild(renderer.domElement);

    // Replace `SOME_AR_ENGINE` with your AR engine/library instance
    const ar = new SOME_AR_ENGINE();

    while(true) {
        await nextVideoFrameReady(); // This should be your function to wait for the next video frame

        const { position, rotation } = ar.computeObjPose(video);
        
        cube.position.copy(position);
        cube.rotation.copy(rotation);

        renderer.render(scene, camera); // Re-render the scene after updating cube pose
        requestAnimationFrame(updateCubePose); // Recursive call for continuous updates
    }

});
