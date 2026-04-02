<template>
  <nav
    ref="navEl"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-f1-dark/90 backdrop-blur-md border-b border-f1-border' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#hero" class="font-exo font-black text-xl tracking-tight">
        <span class="text-white">Factor</span><span class="text-gradient">1</span>
        <span class="text-white"> Digital</span>
      </a>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <li><a href="#work" class="hover:text-white transition-colors">Work</a></li>
        <li><a href="#services" class="hover:text-white transition-colors">Services</a></li>
        <li><a href="#skills" class="hover:text-white transition-colors">Skills</a></li>
        <li><a href="#about" class="hover:text-white transition-colors">About</a></li>
      </ul>

      <a
        href="#contact"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-exo font-semibold bg-f1-gradient text-white hover:opacity-90 transition-opacity"
      >
        Start a Project
      </a>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="mobileOpen ? 'opacity-0' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden bg-f1-dark/95 backdrop-blur-md border-t border-f1-border px-6 py-6 flex flex-col gap-4"
    >
      <a href="#work" class="text-lg font-medium text-slate-300 hover:text-white" @click="mobileOpen = false">Work</a>
      <a href="#services" class="text-lg font-medium text-slate-300 hover:text-white" @click="mobileOpen = false">Services</a>
      <a href="#skills" class="text-lg font-medium text-slate-300 hover:text-white" @click="mobileOpen = false">Skills</a>
      <a href="#about" class="text-lg font-medium text-slate-300 hover:text-white" @click="mobileOpen = false">About</a>
      <a
        href="#contact"
        class="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-exo font-semibold bg-f1-gradient text-white"
        @click="mobileOpen = false"
      >
        Start a Project
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navEl = ref(null)
const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
