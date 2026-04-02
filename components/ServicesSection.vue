<template>
  <section id="services" ref="sectionEl" class="py-32 bg-gradient-to-b from-f1-dark via-[#070711] to-f1-dark">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div ref="headerEl" class="mb-20 text-center" style="opacity: 0; transform: translateY(30px)">
        <p class="text-xs font-exo font-semibold tracking-[0.3em] text-f1-cyan uppercase mb-4">What We Do</p>
        <h2 class="font-exo font-black text-4xl md:text-6xl text-white leading-tight">
          Creative services that<br />
          <span class="text-gradient">deliver results</span>
        </h2>
        <p class="mt-6 text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          From 3D modeling to web platforms — we cover the full creative and technical spectrum,
          so your project stays in one capable team.
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(service, i) in services"
          :key="service.id"
          :ref="(el) => (cardRefs[i] = el)"
          class="group relative p-8 rounded-2xl bg-f1-card border border-f1-border hover:border-f1-cyan/40 transition-all duration-500 overflow-hidden"
          :class="i === 0 ? 'lg:col-span-2' : ''"
          style="opacity: 0; transform: translateY(30px)"
        >
          <!-- Background glow on hover -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            :style="{ background: `radial-gradient(circle at 30% 30%, ${service.glowColor}15, transparent 60%)` }"
          />

          <!-- Icon -->
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white transition-transform duration-300 group-hover:scale-110"
            :style="{ background: service.iconBg }"
          >
            <component :is="'svg'" v-html="service.icon" class="w-7 h-7" />
          </div>

          <h3 class="font-exo font-bold text-xl text-white mb-3 group-hover:text-f1-cyan transition-colors">
            {{ service.title }}
          </h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-6">{{ service.description }}</p>

          <!-- Tech stack tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in service.tech"
              :key="tech"
              class="px-2.5 py-1 rounded-md text-xs font-exo text-slate-400 bg-f1-border"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)
const headerEl = ref(null)
const cardRefs = ref([])

const services = [
  {
    id: 1,
    title: '3D Modeling & Animation',
    description:
      'Photorealistic and stylized 3D models, product visualizations, architectural renders, and character animation — from concept to final deliverable. We work in Blender, Cinema 4D, and Maya, producing assets ready for broadcast, web, or manufacturing.',
    tech: ['Blender', 'Cinema 4D', 'Maya', 'ZBrush', 'Substance Painter', 'KeyShot'],
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3L2 7.5l10 4.5 10-4.5L12 3zM2 16.5L12 21l10-4.5M2 12l10 4.5L22 12"/>',
    iconBg: 'linear-gradient(135deg, #06b6d4, #0284c7)',
    glowColor: '#06b6d4',
  },
  {
    id: 2,
    title: 'Interactive Web Development',
    description:
      'WebGL-powered interactive experiences, custom platforms, and high-performance web apps. We bring together Three.js 3D, smooth animations, and solid engineering to build tools that engage and convert.',
    tech: ['Vue 3 / Nuxt', 'Three.js', 'GSAP', 'React', 'Node.js', 'TypeScript'],
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l-3 3 3 3m8-6l3 3-3 3M14 6l-4 12"/>',
    iconBg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    glowColor: '#8b5cf6',
  },
  {
    id: 3,
    title: 'Motion Graphics & Animation',
    description:
      'Brand films, explainer videos, broadcast graphics, and social content. From storyboard to final export, we deliver motion that communicates ideas with clarity and impact.',
    tech: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Lottie', 'Motion Bro'],
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>',
    iconBg: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    glowColor: '#f59e0b',
  },
  {
    id: 4,
    title: 'Brand & Creative Design',
    description:
      'Identity systems, print collateral, digital assets, and art direction. We build design systems with the structure to scale across every touchpoint — screen, print, and motion.',
    tech: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'Canva Pro'],
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.17-.61-1.59-.37-.41-.59-.96-.59-1.41 0-1.38 1.12-2.5 2.5-2.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>',
    iconBg: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    glowColor: '#ec4899',
  },
  {
    id: 5,
    title: 'Parametric & CAD Modeling',
    description:
      'Generative design, algorithmic architecture, and precision CAD for manufacturing. We use Grasshopper, Rhino, and scripting to produce parametric systems that output fabrication-ready files.',
    tech: ['Grasshopper', 'Rhino 3D', 'Fusion 360', 'AutoCAD', 'Python', 'DXF/STEP'],
    icon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>',
    iconBg: 'linear-gradient(135deg, #22c55e, #06b6d4)',
    glowColor: '#22c55e',
  },
]

onMounted(() => {
  ScrollTrigger.create({
    trigger: headerEl.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(headerEl.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    },
  })

  cardRefs.value.forEach((card, i) => {
    if (!card) return
    ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: (i % 3) * 0.12,
          ease: 'power3.out',
        })
      },
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
