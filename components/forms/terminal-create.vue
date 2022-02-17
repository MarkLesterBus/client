<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        color="#49BF88"
        fab
        dark
        elevation="0"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon> mdi-domain-plus </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-domain</v-icon> Create
        Terminal</v-card-title
      >
      <v-card-text class="mt-5">
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="name"
              @blur="$v.name.$touch()"
              @input="$v.name.$touch()"
              :error-messages="validation('required', $v.name)"
              color="#69BF88"
              outlined
              clearable
              dense
            >
            </v-text-field>

            <v-text-field
              label="Email"
              v-model="email"
              @blur="$v.email.$touch()"
              @input="$v.email.$touch()"
              :error-messages="validation('required, email', $v.email)"
              color="#69BF88"
              clearable
              outlined
              dense
            ></v-text-field>
            <v-text-field
              label="Address"
              v-model="address"
              @blur="$v.address.$touch()"
              @input="$v.address.$touch()"
              :error-messages="validation('required', $v.address)"
              color="#69BF88"
              outlined
              clearable
              dense
            >
            </v-text-field>

            <v-text-field
              label="Contact No."
              v-model="contact_no"
              @blur="$v.contact_no.$touch()"
              @input="$v.contact_no.$touch()"
              :error-messages="validation('required', $v.contact_no)"
              color="#69BF88"
              clearable
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#69BF88" @click="submit()" text>
          <v-icon color="#69BF88" class="mr-2">mdi-send</v-icon> Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      dialog: false,

      name: '',
      email: '',
      address: '',
      contact_no: '',
    }
  },
  mixins: [validationMixin],

  validations: {
    name: { required },
    email: { required, email },
    address: { required },
    contact_no: { required },
  },

  computed: {},
  methods: {
    validation(rules, v) {
      const errors = []
      switch (rules) {
        case 'required':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          return errors
        case 'required, email':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.email && errors.push('Must be a valid email.')
          return errors
        default:
          break
      }
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$anyErrors) {
        this.$store.dispatch(
          'alerts/createAlert',
          {
            color: 'warning',
            message: 'Please fill in the necessary fields.',
            status: 'WARNING',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      } else {
        this.$store.dispatch('busses/storeBuss', {
          name: this.name,
          email: this.email,
          address: this.address,
          contact_no: this.contact_no,
        })
        this.reset()
      }
    },

    reset() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.address = ''
      this.contact_no = ''
    },
  },
}
</script>

<style></style>
