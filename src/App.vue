<script setup>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ErrorToast from './components/ErrorToast.vue';

</script>

<template>
  <Header />
  <ErrorToast />
  <router-view />
  <Footer />
</template>

<style scoped>

</style>