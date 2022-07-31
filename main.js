//import * as THREE from "../libs/three.js-r132/build/three.module.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
	const start = async () => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: "./assets/sucrilhos.mind",
		});
		const { renderer, scene, camera } = mindarThree;

		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
		const plane = new THREE.Mesh(geometry, material);

		const anchor = mindarThree.addAnchor(0);

		anchor.group.add(plane); // THREE.Group
		await mindarThree.start();

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	};
	start();
});
