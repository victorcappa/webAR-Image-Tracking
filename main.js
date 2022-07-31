import { loadGLTF, loadAudio } from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
	const start = async () => {
		// change background color of body to none
		document.body.style.backgroundColor = "transparent";
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.querySelector("#ar-container"),
			imageTargetSrc: "./assets//targets/uno.mind",
			// imageTargetSrc: "./assets//targets/uno_nulo.mind",
			maxTrack: 2,
		});

		const { renderer, scene, camera } = mindarThree;

		const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		scene.add(light);

		// audio

		const audioclip = await loadAudio("./assets/audio/queRabao.mp3");
		const listener = new THREE.AudioListener();
		const audioSource = new THREE.PositionalAudio(listener); //
		audioSource.setBuffer(audioclip);
		camera.add(listener);
		audioSource.setRefDistance(100);

		//models

		const bear = await loadGLTF("./assets/models/musicband-bear/scene.gltf");
		bear.scene.scale.set(0.1, 0.1, 0.1);
		//const bearAnchor = mindarThree.addAnchor(0);
		//bearAnchor.group.add(bear.scene);

		const raccoon = await loadGLTF("./assets/models/musicband-raccoon/scene.gltf");
		raccoon.scene.scale.set(0.1, 0.1, 0.1);
		const raccoonAnchor = mindarThree.addAnchor(1);
		raccoonAnchor.group.add(raccoon.scene, audioSource);

		const donut = await loadGLTF("./assets/models/d1.glb");
		donut.scene.scale.set(10, 10, 10);
		const donutAnchor = mindarThree.addAnchor(0);
		donutAnchor.group.add(donut.scene, audioSource);

		// gltf animations
		const mixer = new THREE.AnimationMixer(raccoon.scene);
		const action = mixer.clipAction(raccoon.animations[0]);
		//action.play();

		// handling events

		raccoonAnchor.onTargetFound = () => {
			action.play();
			audioSource.play();
			console.log("raccoon found");
		};
		raccoonAnchor.onTargetLost = () => {
			action.stop();
			audioSource.stop();
			console.log("raccoon lost");
		};

		const clock = new THREE.Clock();

		await mindarThree.start();

		renderer.setAnimationLoop(() => {
			const delta = clock.getDelta();
			mixer.update(delta);
			raccoon.scene.rotation.set(0, raccoon.scene.rotation.y + delta, 0);
			renderer.render(scene, camera);
		});
	};

	start();
});
