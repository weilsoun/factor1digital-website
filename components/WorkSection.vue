<template>
  <section id="work" ref="sectionEl" class="py-32 bg-f1-dark">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section header -->
      <div ref="headerEl" class="mb-20" style="opacity: 0; transform: translateY(30px)">
        <p class="text-xs font-exo font-semibold tracking-[0.3em] text-f1-cyan uppercase mb-4">Selected Work</p>
        <h2 class="font-exo font-black text-4xl md:text-6xl text-white leading-tight">
          Projects that<br />
          <span class="text-gradient">move people</span>
        </h2>
      </div>

      <!-- Project grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div
          v-for="(project, i) in projects"
          :key="project.id"
          :ref="(el) => (cardRefs[i] = el)"
          class="group relative overflow-hidden rounded-2xl bg-f1-card border border-f1-border cursor-pointer hover:border-f1-cyan/50 transition-all duration-500"
          :class="i === 0 ? 'md:col-span-2' : ''"
          style="opacity: 0; transform: translateY(40px)"
        >
          <!-- Visual area -->
          <div
            class="relative overflow-hidden"
            :class="i === 0 ? 'h-72 md:h-96' : 'h-52 md:h-64'"
          >
            <!-- Gradient placeholder canvas -->
            <div
              class="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              :style="{ background: project.gradient }"
            />
            <!-- Overlay pattern -->
            <div class="absolute inset-0 opacity-20"
              style="background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)"
            />
            <!-- Category pill -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-xs font-exo font-semibold bg-black/40 backdrop-blur-sm text-white border border-white/20">
                {{ project.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="font-exo font-bold text-xl text-white mb-2 group-hover:text-f1-cyan transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2.5 py-1 rounded-md text-xs font-exo text-slate-400 bg-f1-border"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Hover arrow -->
          <div class="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-f1-border flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-f1-cyan transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <svg class="w-4 h-4 text-f1-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div ref="ctaEl" class="text-center" style="opacity: 0">
        <a
          href="#contact"
          class="inline-flex items-center gap-2 text-sm font-exo font-semibold text-slate-400 hover:text-f1-cyan transition-colors"
        >
          View full portfolio
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
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
const ctaEl = ref(null)
const cardRefs = ref([])

const projects = [
  {
    id: 1,
    title: 'Healthcare Analytics Platform — 3D Data Visualization',
    description:
      'Rebuilt a legacy healthcare dashboard with interactive Three.js data visualizations, reducing decision time by 40% for clinical teams across 12 facilities.',
    category: 'Development + 3D',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #06b6d4 50%, #0284c7 100%)',
    tags: ['Three.js', 'Vue 3', 'Node.js', 'WebGL', 'D3.js'],
  },
  {
    id: 2,
    title: 'Brand Identity Animation Suite',
    description:
      'Full motion identity system — logo reveals, broadcast bumpers, social templates, and a 3-minute brand film delivered in 6 weeks.',
    category: 'Animation + Design',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #8b5cf6 60%, #ec4899 100%)',
    tags: ['After Effects', 'Blender', 'Cinema 4D', 'Illustrator'],
  },
  {
    id: 3,
    title: 'Parametric Architecture Study',
    description:
      'Generative facade design for a commercial development, producing 200+ unique permutations and fabrication-ready DXF outputs for CNC manufacturing.',
    category: 'Parametric Modeling',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1e40af 50%, #06b6d4 100%)',
    tags: ['Grasshopper', 'Rhino 3D', 'Python', 'Laser CNC'],
  },
  {
    id: 4,
    title: 'Interactive Product Configurator',
    description:
      'Real-time 3D product builder for a furniture e-commerce brand — customers configure materials, finishes, and dimensions with live WebGL preview.',
    category: 'Development + 3D',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #22c55e 60%, #06b6d4 100%)',
    tags: ['Three.js', 'React', 'Shopify', 'GLSL Shaders'],
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
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
        })
      },
    })
  })

  ScrollTrigger.create({
    trigger: ctaEl.value,
    start: 'top 90%',
    onEnter: () => {
      gsap.to(ctaEl.value, { opacity: 1, duration: 0.6, delay: 0.3 })
    },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
