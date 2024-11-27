// Create a new renderer and append it to the coin-container
const coinContainer = document.getElementById('coin-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500); // Set the size of the renderer to match the container
coinContainer.appendChild(renderer.domElement); // Append the renderer to the coin container

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
camera.position.set(0.7, 3, 5); // Adjust camera position

// Load the 3D coin model
const loader = new THREE.GLTFLoader();
loader.load('ethereum_coin.glb', function (gltf) {
    console.log("Coin model loaded successfully!", gltf); // Debug log
    const coin = gltf.scene; // Get the loaded coin model

    // Adjust the position to center the coin's rotation
    coin.position.set(0, 0, 0); // Set initial position in the XY plane

    // Scale the coin to fit within the container
    coin.scale.set(2.0, 2.0, 2.0); // Adjust these values as needed

    scene.add(coin); // Add the coin to the scene

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Increase ambient light intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Stronger directional light
    directionalLight.position.set(3000, 1000, 10000).normalize();
    scene.add(directionalLight);

    // Toss function
    function tossCoin() {
        console.log("Tossing the coin..."); // Debug log

        const maxRotationX = 8 * Math.PI; // 4 full rotations (360 degrees * 4)
        const duration = 1000; // 1 second
        const start = performance.now();

        function animateToss(time) {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);

            // Move the coin vertically up along the Y-axis
            coin.position.y = Math.sin(progress * Math.PI) * 1.5; // Move up to 1 unit

            // Rotate the coin on the X-axis for 3-4 full rotations
            coin.rotation.y = maxRotationX * progress; // Spin along X-axis

            // Ensure the coin returns to its original position after the toss
            if (progress < 1) {
                requestAnimationFrame(animateToss);
            } else {
                // Set the final position to stop in the XY plane
                coin.position.y = 0; // Reset Y position to align with the XY plane
                coin.position.z = 0; // Ensure Z position is 0

                // Randomly determine the final rotation around the Y-axis
                const randomYRotation = Math.random() < 0.5 ? 0 : Math.PI; // 0 or Math.PI
                coin.rotation.y = randomYRotation; // Set the random rotation
            }
        }

        requestAnimationFrame(animateToss);
    }

   
    // Add click event listener to the coin
    coin.traverse((child) => {
        if (child.isMesh) {
            child.cursor = 'pointer'; // Change cursor to pointer on hover
            child.onClick = tossCoin; // Assign tossCoin function to click event
        }
    });

    // Add raycaster for detecting clicks on the coin
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            // If the coin is clicked, call the tossCoin function
            tossCoin();
        }
    }

    // Add event listener for mouse clicks
    window.addEventListener('click', onMouseClick, false);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();