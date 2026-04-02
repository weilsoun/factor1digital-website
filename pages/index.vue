<template>
  <main class="min-h-screen bg-black text-white">
    <div ref="canvasContainer" class="fixed inset-0 z-0" />
    <section ref="heroSection" class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-6xl font-bold tracking-tight">Factor1 Digital</h1>
        <p class="mt-4 text-xl text-gray-400">Creative digital experiences</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvasContainer = ref(null)
const heroSection = ref(null)

let renderer, scene, camera, animFrameId

onMounted(() => {
  // Three.js scene
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  canvasContainer.value.appendChild(renderer.domElement)

  const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32)
  const material = new THREE.MeshNormalMaterial({ wireframe: true })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const animate = () => {
    animFrameId = requestAnimationFrame(animate)
    mesh.rotation.x += 0.003
    mesh.rotation.y += 0.005
    renderer.render(scene, camera)
  }
  animate()

  // GSAP hero entrance
  gsap.from(heroSection.value.querySelector('.text-center'), {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
  })

  // Resize handler
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrameId)
  renderer?.dispose()
  window.removeEventListener('resize', onResize)
  ScrollTrigger.killAll()
})

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>
