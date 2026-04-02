<template>
  <section id="skills" ref="sectionEl" class="py-32 bg-f1-dark overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div ref="headerEl" class="mb-16" style="opacity: 0; transform: translateY(30px)">
        <p class="text-xs font-exo font-semibold tracking-[0.3em] text-f1-cyan uppercase mb-4">Tools & Technology</p>
        <h2 class="font-exo font-black text-4xl md:text-5xl text-white leading-tight">
          50+ tools. <span class="text-gradient">One team.</span>
        </h2>
      </div>

      <!-- Skill categories -->
      <div class="space-y-10">
        <div
          v-for="(category, i) in skillCategories"
          :key="category.name"
          :ref="(el) => (categoryRefs[i] = el)"
          style="opacity: 0; transform: translateX(-20px)"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-2 h-2 rounded-full"
              :style="{ background: category.color }"
            />
            <span class="text-xs font-exo font-semibold tracking-widest uppercase text-slate-500">
              {{ category.name }}
            </span>
          </div>

          <!-- Scrolling tag row -->
          <div class="flex gap-2.5 flex-wrap">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="px-4 py-2 rounded-full text-sm font-exo font-medium text-slate-300 border border-f1-border bg-f1-card hover:border-opacity-100 transition-all duration-300 cursor-default whitespace-nowrap hover:scale-105"
              :style="{ '--hover-color': category.color }"
              @mouseenter="($event.target as HTMLElement).style.borderColor = category.color"
              @mouseleave="($event.target as HTMLElement).style.borderColor = ''"
            >
              {{ skill }}
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
const categoryRefs = ref([])

const skillCategories = [
  {
    name: '3D & Visualization',
    color: '#06b6d4',
    skills: ['Blender', 'Cinema 4D', 'Maya', 'ZBrush', 'Substance Painter', 'KeyShot', 'V-Ray', 'Octane Render', 'Three.js', 'WebGL', 'GLSL'],
  },
  {
    name: 'Development',
    color: '#8b5cf6',
    skills: ['Vue 3', 'Nuxt 3', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Vercel', 'AWS', 'Docker'],
  },
  {
    name: 'Animation & Motion',
    color: '#f59e0b',
    skills: ['After Effects', 'GSAP', 'Lottie', 'Premiere Pro', 'DaVinci Resolve', 'Motion Bro', 'Rive', 'Framer Motion', 'CSS Animations'],
  },
  {
    name: 'Design',
    color: '#ec4899',
    skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Canva Pro', 'Spline', 'Framer', 'Webflow'],
  },
  {
    name: 'Parametric & CAD',
    color: '#22c55e',
    skills: ['Grasshopper', 'Rhino 3D', 'Fusion 360', 'AutoCAD', 'SolidWorks', 'FreeCAD', 'Python Scripting', 'DXF', 'STEP', 'STL'],
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

  categoryRefs.value.forEach((cat, i) => {
    if (!cat) return
    ScrollTrigger.create({
      trigger: cat,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(cat, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: i * 0.1,
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
