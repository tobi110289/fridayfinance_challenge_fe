import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
        strict: true,
    },
    modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss'],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:3007/graphql/',
            }
        }
    }
})
