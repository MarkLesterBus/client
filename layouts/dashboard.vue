<template>
  <v-app dark>
    <custom-drawer></custom-drawer>
    <v-main>
      
        <Nuxt />
      
    </v-main>
  </v-app>
</template>

<script>
import CustomDrawer from '../components/custom-drawer.vue'
export default {
  components: { CustomDrawer },
}
</script>
