<template>
  <div class="text-center ma-2">
    <v-btn @click="visible = true"> Open Snackbar </v-btn>
    <v-snackbar
      v-model="visible"
      :timeout="alert.timeout"
      vertical
      light
      bottom
      right
    >
      <div align="start">
        <v-icon medium>mdi-cogs</v-icon>
        <span class="font-weight-bold subtitle-2">System Notification</span>
        <p class="pt-2">
          <span class="font-weight-lighter body-2">This is a Message</span>
        </p>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      alert: (state) => state.alert.alert,
    }),
    visible: {
      get() {
        return this.alert.visible
      },
      set(value) {
        this.$store.commit('alert/SET_ALERT_VISIBILITY', value)
      },
    },
  },
}
</script>

