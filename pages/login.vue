<template>
  <v-container>
    <v-row style="height: 500px" align="center" justify="center">
      <v-card width="400">
        <v-row no-gutters justify="center" class="my-3">
          <v-col cols="2" align="center">
            <v-img
              class="my-4 mx-4"
              width="60"
              height="60"
              src="/logo.png"
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-card-title class="text-h4 font-weight-bold">OBFC</v-card-title>
            <v-card-subtitle class="font-weight-light"
              >Online Bus Fare Collection System</v-card-subtitle
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-text>
          <v-col>
            <v-text-field
              v-model="email"
              required
              :error-messages="validation('email', $v.email)"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              prepend-inner-icon="mdi-at"
              color="#49BF88"
              placeholder="Email"
              type="email"
              dense
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              required
              :error-messages="validation('minLength', $v.password)"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              prepend-inner-icon="mdi-lock"
              color="#49BF88"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show = !show"
              placeholder="Password"
              :type="show ? 'text' : 'password'"
              dense
              outlined
            ></v-text-field>
            <v-btn
              color="#49BF88"
              dark
              block
              large
              elevation="0"
              @keypress.enter="authenticate()"
              @click="authenticate()"
              class="text-capitalize body-1"
            >
              <v-icon class="mr-3">mdi-key</v-icon> Sign in
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-row>
    <custom-alert></custom-alert>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import CustomAlert from '../components/custom-alert.vue'
export default {
  layout: 'auth',
  components: { CustomAlert },
  data() {
    return {
      show: false,
      email: '',
      password: '',
      overlay: false,
    }
  },
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },

  computed: {},
  methods: {
    validation(rule, v) {
      const errors = []
      switch (rule) {
        case 'required':
          if (!v.$dirty) return errors
          !v.required && errors.push('Field is required!')
          return errors
        case 'email':
          if (!v.$dirty) return errors
          !v.email && errors.push('Must be a valid email.')
          return errors
        case 'minLength':
          if (!v.$dirty) return errors
          !v.minLength && errors.push('Minimum of 8 characters.')
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
    async authenticate() {
      this.overlay = true
      await this.$auth
        .loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((rs) => {
          this.messageAlert(
            'SUCCESS',
            'success',
            'Login success, ' + 'Welcome ' + this.$auth.user.name
          )
        })
        .catch((err) => {
          this.messageAlert('ERROR', 'error', err.message)
        })
      this.overlay = false
    },
  },
}
</script>
