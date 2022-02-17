<template>
  <v-snackbar
    v-model="visible"
    :timeout="alert.timeout"
    :color="alert.color"
    center
    text
    top
  >
    <div align="start">
      <v-icon medium :color="alert.color" class="mr-2">mdi-cogs</v-icon>
      <span class="font-weight-normal subtitle-2">SYSTEM</span>
      <p class="pt-3">
        <span class="font-weight-light caption">[ {{ alert.status }} ]</span>
        <br />
        <span class="font-weight-light caption"> {{ alert.message }}</span>
      </p>
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="visible = false">
        <v-icon :color="alert.color">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      alert: (state) => state.alerts.alert,
    }),
    visible: {
      get() {
        return this.alert.visible
      },
      set(value) {
        this.$store.commit('alerts/SET_ALERT_VISIBILITY', value)
      },
    },
  },
}
</script>
