<template>
  <v-container>
    <custom-appbar title="Dashboard"></custom-appbar>
    Dashboard
  </v-container>
</template>

<script>
import CustomAppbar from '../../components/custom-appbar.vue'
export default {
  layout: 'dashboard',
  middleware: ['admin'],
  component: {
    CustomAppbar,
  },
}
</script>

<style></style>
