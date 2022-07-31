//import * as THREE from "../libs/three.js-r132/build/three.module.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
	const start = async () => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.querySelector("#ar-container"),
			imageTargetSrc: "./assets/sucrilhos.mind",
		});

		const { renderer, scene, camera } = mindarThree;
		document.body.appendChild(renderer.domElement);

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 1 });
		const plane = new THREE.Mesh(geometry, material);

		plane.scale.set(0.35, 0.35, 0.35);
		plane.position.set(0, 0, 0.3);

		const anchor = mindarThree.addAnchor(0);

		anchor.group.add(plane); // THREE.Group

		await mindarThree.start();

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	};;
	start();
});


