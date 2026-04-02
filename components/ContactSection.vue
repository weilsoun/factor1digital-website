<template>
  <section id="contact" ref="sectionEl" class="py-32 bg-f1-dark relative overflow-hidden">
    <!-- Background glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.15), transparent 60%)"
    />

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Header -->
      <div ref="headerEl" class="text-center mb-16" style="opacity: 0; transform: translateY(30px)">
        <p class="text-xs font-exo font-semibold tracking-[0.3em] text-f1-cyan uppercase mb-4">Get In Touch</p>
        <h2 class="font-exo font-black text-4xl md:text-6xl text-white leading-tight mb-6">
          Let's build something<br />
          <span class="text-gradient">worth seeing</span>
        </h2>
        <p class="text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Tell us about your project. We'll come back with a clear scope and honest timeline — no runaround.
        </p>
      </div>

      <!-- Form + info grid -->
      <div ref="contentEl" class="grid grid-cols-1 lg:grid-cols-5 gap-10" style="opacity: 0; transform: translateY(30px)">
        <!-- Contact form (3/5) -->
        <div class="lg:col-span-3 bg-f1-card border border-f1-border rounded-3xl p-8">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-exo font-semibold text-slate-400 mb-2 tracking-wide uppercase">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Your name"
                  class="w-full px-4 py-3 bg-f1-dark border border-f1-border rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-f1-cyan transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs font-exo font-semibold text-slate-400 mb-2 tracking-wide uppercase">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-3 bg-f1-dark border border-f1-border rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-f1-cyan transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-exo font-semibold text-slate-400 mb-2 tracking-wide uppercase">Project Type</label>
              <select
                v-model="form.type"
                class="w-full px-4 py-3 bg-f1-dark border border-f1-border rounded-xl text-white text-sm focus:outline-none focus:border-f1-cyan transition-colors appearance-none"
              >
                <option value="" disabled>Select a service...</option>
                <option value="3d">3D Modeling &amp; Animation</option>
                <option value="dev">Web Development</option>
                <option value="motion">Motion Graphics &amp; Animation</option>
                <option value="design">Brand &amp; Creative Design</option>
                <option value="parametric">Parametric &amp; CAD</option>
                <option value="other">Multi-service / Other</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-exo font-semibold text-slate-400 mb-2 tracking-wide uppercase">Tell us about your project</label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                placeholder="What are you building? Timeline? Budget range?"
                class="w-full px-4 py-3 bg-f1-dark border border-f1-border rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-f1-cyan transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full py-4 rounded-xl font-exo font-semibold text-sm text-white bg-f1-gradient hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <template v-if="!submitting && !submitted">
                Send Message
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </template>
              <template v-else-if="submitting">Sending...</template>
              <template v-else>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Message sent!
              </template>
            </button>
          </form>
        </div>

        <!-- Contact info (2/5) -->
        <div class="lg:col-span-2 flex flex-col justify-between gap-8">
          <!-- Info cards -->
          <div class="space-y-4">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="p-5 rounded-2xl bg-f1-card border border-f1-border group hover:border-f1-cyan/40 transition-colors"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  :style="{ background: info.iconBg }"
                >
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="info.icon" />
                </div>
                <div>
                  <p class="text-xs font-exo font-semibold text-slate-500 uppercase tracking-wider mb-1">{{ info.label }}</p>
                  <p class="text-slate-200 text-sm font-medium">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA note -->
          <div class="p-6 rounded-2xl border border-dashed border-f1-border text-center">
            <div class="w-10 h-10 rounded-full bg-f1-gradient flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">
              We respond to all project inquiries within <strong class="text-white">24 hours</strong> on business days.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-f1-border flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="font-exo font-black text-white">
        Factor<span class="text-gradient">1</span> Digital
      </p>
      <p class="text-xs text-slate-600">
        © {{ new Date().getFullYear() }} Factor1 Digital. All rights reserved.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)
const headerEl = ref(null)
const contentEl = ref(null)

const submitting = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: '',
})

const contactInfo = [
  {
    label: 'Email',
    value: 'hello@factor1digital.com',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
    iconBg: 'linear-gradient(135deg, #06b6d4, #0284c7)',
  },
  {
    label: 'Based in',
    value: 'United States — Remote Worldwide',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
    iconBg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  },
  {
    label: 'Response time',
    value: 'Within 24 business hours',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    iconBg: 'linear-gradient(135deg, #22c55e, #16a34a)',
  },
]

async function handleSubmit() {
  submitting.value = true
  // Simulate submission (no backend yet)
  await new Promise((r) => setTimeout(r, 1200))
  submitting.value = false
  submitted.value = true
  // Reset after 4s
  setTimeout(() => {
    submitted.value = false
    Object.assign(form, { name: '', email: '', type: '', message: '' })
  }, 4000)
}

onMounted(() => {
  ScrollTrigger.create({
    trigger: headerEl.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(headerEl.value, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    },
  })
  ScrollTrigger.create({
    trigger: contentEl.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(contentEl.value, { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' })
    },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
