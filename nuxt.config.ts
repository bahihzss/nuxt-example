import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: false,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
  ],
  srcDir: 'src',
}

export default config