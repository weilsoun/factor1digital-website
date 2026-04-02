<template>
  <section id="hero" ref="sectionEl" class="relative flex items-center justify-center min-h-screen overflow-hidden bg-f1-dark">
    <!-- Three.js canvas container -->
    <div ref="canvasWrap" class="absolute inset-0 z-0" />

    <!-- Gradient overlays for depth -->
    <div class="absolute inset-0 z-[1] bg-gradient-to-b from-f1-dark/30 via-transparent to-f1-dark pointer-events-none" />
    <div class="absolute inset-0 z-[1] bg-radial-center pointer-events-none" />

    <!-- Hero content -->
    <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <p
        ref="taglineEl"
        class="text-xs md:text-sm font-exo font-semibold tracking-[0.35em] text-f1-cyan uppercase mb-8"
        style="opacity: 0; transform: translateY(20px)"
      >
        3D &nbsp;·&nbsp; Animation &nbsp;·&nbsp; Development &nbsp;·&nbsp; Design
      </p>

      <h1
        ref="titleEl"
        class="font-exo font-black leading-none mb-6"
        style="opacity: 0; transform: translateY(30px)"
      >
        <span class="block text-5xl md:text-7xl lg:text-9xl text-white">Factor1</span>
        <span class="block text-5xl md:text-7xl lg:text-9xl text-gradient italic">Digital</span>
      </h1>

      <p
        ref="subEl"
        class="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        style="opacity: 0; transform: translateY(20px)"
      >
        We craft immersive 3D experiences, interactive platforms, and motion-driven design
        that move audiences and drive outcomes.
      </p>

      <div
        ref="ctaEl"
        class="flex flex-col sm:flex-row gap-4 justify-center"
        style="opacity: 0; transform: translateY(20px)"
      >
        <a
          href="#work"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-exo font-semibold bg-f1-gradient text-white hover:opacity-90 transition-opacity text-sm md:text-base"
        >
          View Our Work
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a
          href="#contact"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-exo font-semibold border border-slate-600 text-slate-300 hover:border-f1-cyan hover:text-white transition-colors text-sm md:text-base"
        >
          Start a Project
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      ref="scrollIndicatorEl"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      style="opacity: 0"
    >
      <span class="text-[10px] font-exo text-slate-500 tracking-[0.3em] uppercase">Scroll</span>
      <div class="w-px h-10 overflow-hidden">
        <div ref="scrollLineEl" class="w-full h-full bg-gradient-to-b from-f1-cyan to-transparent" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)
const canvasWrap = ref(null)
const taglineEl = ref(null)
const titleEl = ref(null)
const subEl = ref(null)
const ctaEl = ref(null)
const scrollIndicatorEl = ref(null)
const scrollLineEl = ref(null)

let renderer, scene, camera, mesh, light1, light2, animId
let geo, mat
let mouseX = 0
let mouseY = 0
let targetMouseX = 0
let targetMouseY = 0

onMounted(() => {
  initScene()
  initAnimations()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  geo?.dispose()
  mat?.dispose()
  renderer?.dispose()
  if (renderer?.domElement?.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement)
  }
  gsap.killTweensOf(light1?.position)
  gsap.killTweensOf(light2?.position)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  ScrollTrigger.getAll().forEach((t) => t.kill())
})

function initScene() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 7

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  canvasWrap.value.appendChild(renderer.domElement)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
  scene.add(ambientLight)

  light1 = new THREE.PointLight(0x06b6d4, 12, 25) // cyan
  light1.position.set(4, 4, 4)
  scene.add(light1)

  light2 = new THREE.PointLight(0x8b5cf6, 12, 25) // purple
  light2.position.set(-4, -4, 3)
  scene.add(light2)

  const light3 = new THREE.PointLight(0xffffff, 6, 15)
  light3.position.set(0, 6, -4)
  scene.add(light3)

  // Primary 3D object — TorusKnot with metallic phong material
  geo = new THREE.TorusKnotGeometry(1.6, 0.48, 256, 48, 2, 3)
  mat = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x0a0a1a),
    specular: new THREE.Color(0x06b6d4),
    shininess: 160,
    flatShading: false,
  })
  mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)

  // Orbiting light animations
  gsap.to(light1.position, { x: -4, y: -4, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  gsap.to(light2.position, { x: 4, y: 4, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 })

  // Animate loop
  const tick = () => {
    animId = requestAnimationFrame(tick)

    // Smooth mouse follow
    mouseX += (targetMouseX - mouseX) * 0.04
    mouseY += (targetMouseY - mouseY) * 0.04

    mesh.rotation.y += 0.004
    mesh.rotation.x += 0.002
    mesh.rotation.x += mouseY * 0.0008
    mesh.rotation.y += mouseX * 0.0008

    camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.03
    camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.03

    renderer.render(scene, camera)
  }
  tick()
}

function initAnimations() {
  // Entrance stagger
  const tl = gsap.timeline({ delay: 0.4 })
  tl.to(taglineEl.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    .to(titleEl.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
    .to(subEl.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to(ctaEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to(scrollIndicatorEl.value, { opacity: 1, duration: 0.6 }, '-=0.2')

  // Scroll line looping animation
  gsap.to(scrollLineEl.value, {
    y: '100%',
    duration: 1.2,
    ease: 'none',
    repeat: -1,
    delay: 1.8,
  })

  // Scroll-based 3D response
  ScrollTrigger.create({
    trigger: sectionEl.value,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      if (!mesh || !camera) return
      const p = self.progress
      mesh.scale.setScalar(1 - p * 0.25)
      camera.position.z = 7 + p * 3
      mesh.material.opacity = 1 - p * 0.5
    },
  })
}

function onMouseMove(e) {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
}

function onResize() {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>
