/* =====================================================
   3D GLOBE — built with Three.js (loaded via CDN in services.html)
   Beginner note: Three.js is a library that lets you draw 3D
   graphics in the browser. This file does 4 things, in order:
     1. Set up a "scene" (like an empty 3D stage)
     2. Build a wireframe sphere (the globe) + glowing dots (cities)
     3. Spin the globe automatically, every frame
     4. Resize everything if the browser window changes size
   You don't need to fully understand Three.js to use this file —
   just know that changing the numbers below changes how it looks.
===================================================== */

// Only run this code if the globe's container actually exists on the page,
// so this script doesn't crash on pages that don't have a globe.

console.log("Globe JS Loaded");

const globeContainer = document.getElementById("globeContainer");

console.log(globeContainer);
console.log("THREE =", THREE);

console.log("Container Width:", globeContainer.clientWidth);
console.log("Container Height:", globeContainer.clientHeight);

const globeContainer = document.getElementById("globeContainer");

if (globeContainer) {

  /* ---------- 1. SCENE, CAMERA, RENDERER ---------- */

  // The "scene" is the empty 3D space everything gets placed into.
  const scene = new THREE.Scene();

  // The "camera" decides what part of the scene we actually see.
  // PerspectiveCamera(field-of-view, aspect-ratio, near-clip, far-clip)
  const camera = new THREE.PerspectiveCamera(
    45,
    globeContainer.clientWidth / globeContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 6; // move the camera back so we can see the globe

  // The "renderer" actually draws the scene onto our <canvas> element.
  const canvas = document.getElementById("globeCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // keeps it sharp on retina screens


  /* ---------- 2. BUILD THE GLOBE ---------- */

  // A "wireframe" sphere — just the grid lines, no solid surface.
  // This gives that clean, modern "tech globe" look instead of a solid ball.
  const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff7a50,      // coral, matches the site's accent color
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  // A second, slightly larger, faint solid sphere behind the wireframe —
  // this gives a subtle glow/depth effect rather than looking flat.
  const glowGeometry = new THREE.SphereGeometry(2.05, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x1b4b43,       // deep pine green, matches the brand color
    transparent: true,
    opacity: 0.15,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glow);

  // Add small glowing dots around the globe to represent destinations/cities.
  // We just scatter them at semi-random positions on the sphere's surface.
  const dotsGroup = new THREE.Group();
  const dotGeometry = new THREE.SphereGeometry(0.045, 8, 8);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const numberOfDots = 18;
  for (let i = 0; i < numberOfDots; i++) {
    // Convert random spherical coordinates into x/y/z so dots sit ON the sphere's surface.
    const theta = Math.random() * Math.PI * 2;       // angle around the equator
    const phi = Math.acos(Math.random() * 2 - 1);    // angle from top to bottom
    const radius = 2; // same radius as the globe, so dots sit right on its surface

    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    dotsGroup.add(dot);
  }
  scene.add(dotsGroup);


  /* ---------- 3. ANIMATE (this function runs ~60 times per second) ---------- */

  function animateGlobe() {
    // Slowly rotate the globe and its dots together, like a real spinning earth.
    globe.rotation.y += 0.003;
    glow.rotation.y += 0.003;
    dotsGroup.rotation.y += 0.003;

    // Tiny tilt on rotation.x gives it a more natural, less robotic spin.
    globe.rotation.x += 0.0006;
    glow.rotation.x += 0.0006;
    dotsGroup.rotation.x += 0.0006;

    renderer.render(scene, camera);

    // requestAnimationFrame asks the browser to call this function again
    // right before the next repaint — this is how smooth animation loops work.
    requestAnimationFrame(animateGlobe);
  }

  animateGlobe();


  /* ---------- 4. HANDLE WINDOW RESIZE ---------- */
  // Without this, the globe would look stretched if the user resizes
  // the browser window or rotates their phone.
  window.addEventListener("resize", function () {
    const width = globeContainer.clientWidth;
    const height = globeContainer.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}