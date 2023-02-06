import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    ssr: false,
    typescript: {
        typeCheck: true,
        strict: true,
    },
    modules: ['@pinia/nuxt','@nuxtjs/apollo', '@nuxtjs/tailwindcss'],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:3007/graphql/',
            }
        }
    }
})
