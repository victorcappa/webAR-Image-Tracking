import { GLTFLoader } from "../libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js";
import { loadGLTF } from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

// const loadGLTF = (path) => {
// 	return new Promise((resolve, reject) => {
// 		const loader = new GLTFLoader();
// 		loader.load(path, (gltf) => {
// 			resolve(gltf);
// 		});
// 	});
// };

document.addEventListener("DOMContentLoaded", () => {
	const start = async () => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.querySelector("#ar-container"),
			imageTargetSrc: "./assets/sucrilhos.mind",
		});

		const { renderer, scene, camera } = mindarThree;

		const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		scene.add(light);
		const anchor = mindarThree.addAnchor(0);
		const gltf = await loadGLTF("./assets/models/musicband-bear/scene.gltf");
		gltf.scene.scale.set(0.1, 0.1, 0.1);
		gltf.scene.rotation.x = Math.PI / 2;
		anchor.group.add(gltf.scene);

		const loader = new GLTFLoader();

		await mindarThree.start();

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	};
	start();
});
