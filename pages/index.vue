<template>
  <v-container>
    <custom-appbar title="OBFC"></custom-appbar>
    Home Page, please <a href="/login">login</a>
  </v-container>
</template>

<script>
import customAppbar from '../components/custom-appbar.vue'
export default {
  components: { customAppbar },
  layout: 'default',
}
</script>
