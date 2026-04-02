<template>
  <section id="about" ref="sectionEl" class="py-32 bg-gradient-to-b from-f1-dark via-[#08080f] to-f1-dark">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <!-- Left: Content -->
        <div>
          <div ref="headerEl" style="opacity: 0; transform: translateY(30px)">
            <p class="text-xs font-exo font-semibold tracking-[0.3em] text-f1-cyan uppercase mb-4">About</p>
            <h2 class="font-exo font-black text-4xl md:text-5xl text-white leading-tight mb-8">
              25 years of<br />
              <span class="text-gradient">making it real</span>
            </h2>
          </div>

          <div ref="bodyEl" class="space-y-5 text-slate-400 leading-relaxed" style="opacity: 0; transform: translateY(20px)">
            <p>
              Factor1 Digital was built on a single conviction: that the best creative work happens when technical
              mastery and artistic vision are in the same hands. For 25+ years, Mike Wilson has led projects across
              3D, motion, development, and design — without the handoff overhead of a fragmented agency.
            </p>
            <p>
              We specialize in healthcare marketing and digital platforms, where accuracy, trust, and engagement
              are non-negotiable. We've helped clinical teams visualize complex data, helped brands clarify their
              stories, and helped manufacturers move from concept to fabrication in record time.
            </p>
            <p class="text-white font-medium">
              We operate as a senior-level augmentation partner — plugging directly into your team for as long as
              the project demands, then stepping back. No bloat. No overhead. Just outcomes.
            </p>
          </div>

          <!-- Stats -->
          <div ref="statsEl" class="grid grid-cols-3 gap-6 mt-12" style="opacity: 0; transform: translateY(20px)">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="font-exo font-black text-3xl md:text-4xl text-gradient mb-1">{{ stat.value }}</div>
              <div class="text-xs text-slate-500 font-exo tracking-wider uppercase">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Right: Visual card -->
        <div ref="cardEl" class="relative" style="opacity: 0; transform: translateX(30px)">
          <!-- Main card -->
          <div class="relative rounded-3xl overflow-hidden bg-f1-card border border-f1-border p-8">
            <!-- Gradient background -->
            <div class="absolute inset-0 opacity-30"
              style="background: radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.4), transparent 60%), radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.3), transparent 50%)"
            />

            <div class="relative">
              <!-- Avatar placeholder -->
              <div class="w-20 h-20 rounded-2xl bg-f1-gradient flex items-center justify-center mb-6 font-exo font-black text-2xl text-white">
                MW
              </div>

              <h3 class="font-exo font-bold text-2xl text-white mb-1">Mike Wilson</h3>
              <p class="text-f1-cyan text-sm font-exo font-semibold mb-6">Founder &amp; Creative Director</p>

              <p class="text-slate-400 text-sm leading-relaxed mb-8">
                Multi-disciplinary creative technologist with deep expertise in 3D, motion, and digital
                development. Healthcare marketing specialist. Team augmentation practitioner.
              </p>

              <!-- Specialties -->
              <div class="space-y-2">
                <div v-for="spec in specialties" :key="spec.label" class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="{ background: spec.color }" />
                  <span class="text-sm text-slate-300 font-exo">{{ spec.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating accent card -->
          <div class="absolute -bottom-6 -right-6 bg-f1-card border border-f1-border rounded-2xl p-5 shadow-xl">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span class="text-sm font-exo text-slate-300">Available for projects</span>
            </div>
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
const bodyEl = ref(null)
const statsEl = ref(null)
const cardEl = ref(null)

const stats = [
  { value: '25+', label: 'Years' },
  { value: '200+', label: 'Projects' },
  { value: '50+', label: 'Tools' },
]

const specialties = [
  { label: '3D Modeling & Visualization', color: '#06b6d4' },
  { label: 'Healthcare Marketing', color: '#8b5cf6' },
  { label: 'Motion Graphics & Film', color: '#f59e0b' },
  { label: 'Interactive Development', color: '#ec4899' },
  { label: 'Parametric Design & CAD', color: '#22c55e' },
]

onMounted(() => {
  const els = [headerEl.value, bodyEl.value, statsEl.value]
  els.forEach((el, i) => {
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out' })
      },
    })
  })

  ScrollTrigger.create({
    trigger: cardEl.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(cardEl.value, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
    },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
