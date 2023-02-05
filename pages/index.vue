<script lang="ts" setup>
const message = ref('Hello')
const change = () => {
  message.value = 'Goodbye'
}</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button v-on:click="change">Goodbye</button>
  </div>
</template>

<style scoped>

</style>
