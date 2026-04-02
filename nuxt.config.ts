// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      formspreeId: process.env.NUXT_PUBLIC_FORMSPREE_ID || '',
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'static',
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Factor1 Digital — 3D · Animation · Development · Design',
      meta: [
        {
          name: 'description',
          content:
            'Factor1 Digital builds immersive 3D experiences, interactive platforms, and motion-driven design. 25+ years of creative digital expertise.',
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Open+Sans:wght@400;500;600&display=swap',
        },
      ],
    },
  },
})
