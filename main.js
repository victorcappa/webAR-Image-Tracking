import * as THREE from "../libs/three.js-r132/build/three.module.js";

// run js after the page is loaded
document.addEventListener("DOMContentLoaded", () => {
	const scene = new THREE.Scene();
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	const renderer = new THREE.WebGLRenderer({ alpha: true });
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	scene.add(cube);
	cube.position.set(0, 0, -2);
	cube.rotation.set(0, Math.PI / 4, 0);
	camera.position.set(1, 1, 1);

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);

	const video = document.createElement("video");
	navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
		video.srcObject = stream;
		video.play();
	});

	//Video Style
	video.style.position = "absolute";
	video.style.width = renderer.domElement.width;
	video.style.height = renderer.domElement.height;
	video.style.width = "70vw";
	video.style.left = "15vw";

	renderer.domElement.style.position = "absolute";
	document.body.appendChild(video);
	document.body.appendChild(renderer.domElement);
});
