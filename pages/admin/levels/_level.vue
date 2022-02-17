<template>
  <v-container>
    <custom-appbar title="Levels" :prominent="false"> </custom-appbar>
    <v-card flat width="900">
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-pll</v-icon> Edit
        Level</v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-card class="my-4">
              <v-card-title>
                <v-icon class="mr-3" color="#69BF88">mdi-pencil</v-icon>
                Level
              </v-card-title>
              <v-card-text>
                <v-textarea
                  label="Level"
                  v-model="_level"
                  @blur="$v._level.$touch()"
                  @input="$v._level.$touch()"
                  :error-messages="validation('required', $v._level)"
                  clearable
                  color="#69BF88"
                  outlined
                  dense
                >
                </v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#69BF88" @click="updateLevel()">
                  <v-icon class="mr-2">mdi-floppy</v-icon> Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <custom-alert></custom-alert>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import CustomAlert from '../../../components/custom-alert.vue'
export default {
  layout: 'dashboard',
  middleware: ['admin', 'user'],
  data() {
    return {
      dialog: false,
    }
  },
  mixins: [validationMixin],

  validations: {
    _level: { required },
  },

  created() {
    this.$store.dispatch('levels/fetchLevel', this.$route.params.level)
  },

  computed: {
    ...mapState({
      level: (state) => state.levels.level,
    }),
    _level: {
      get() {
        return this.level.level
      },
      set(value) {
        this.$store.commit('levels/SET_NAME', value)
      },
    },
  },
  components: {
    CustomAlert,
  },

  methods: {
    validation(rules, v) {
      const errors = []
      switch (rules) {
        case 'required':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          return errors
        default:
          break
      }
    },
    messageAlert(status, color, message) {
      this.$store.dispatch(
        'alerts/createAlert',
        {
          color: color,
          message: message,
          status: status,
          timeout: 5000,
          visible: true,
        },
        { root: true }
      )
    },
    updateLevel() {
      this.$store.dispatch('levels/updateLevel', {
        id: this.$route.params.level,
        data: {
          level: this._level,
        },
      })
    },
  },
}
</script>

<style></style>
