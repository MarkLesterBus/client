<template>
  <v-dialog v-model="dialog" width="700">
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
        <v-icon> mdi-account-plus </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-account-plus</v-icon> Create
        User</v-card-title
      >
      <v-card-text class="mt-5">
        <v-row>
          <v-col>
            <v-combobox
              :items="roles"
              @blur="$v.role.$touch()"
              @input="$v.role.$touch()"
              :error-messages="validation('required', $v.role)"
              v-model="role"
              label="Role"
              color="#69BF88"
              outlined
              dense
            ></v-combobox>
            <v-combobox
              :items="titles"
              @blur="$v.title.$touch()"
              @input="$v.title.$touch()"
              :error-messages="validation('required', $v.title)"
              v-model="title"
              label="Position Title"
              color="#69BF88"
              outlined
              dense
            ></v-combobox>

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
              label="Password"
              v-model="password"
              @blur="$v.password.$touch()"
              @input="$v.password.$touch()"
              :error-messages="validation('required, minLength', $v.password)"
              color="#69BF88"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              outlined
              dense
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Contact #."
              color="#69BF88"
              v-model="contact_no"
              @blur="$v.contact_no.$touch()"
              @input="$v.contact_no.$touch()"
              :error-messages="validation('required', $v.contact_no)"
              outlined
              clearable
              dense
            >
            </v-text-field>

            <v-textarea
              label="Address"
              color="#69BF88"
              v-model="address"
              @blur="$v.address.$touch()"
              @input="$v.address.$touch()"
              :error-messages="validation('required', $v.address)"
              outlined
              dense
            ></v-textarea>
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
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      dialog: false,
      show: false,
      roles: ['Administrator', 'User'],
      titles: ['Manager', 'Staff'],

      name: '',
      email: '',
      password: '',
      address: '',
      contact_no: '',
      title: '',
      role: '',
    }
  },
  mixins: [validationMixin],

  validations: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    address: { required },
    contact_no: { required },
    title: { required },
    role: { required },
  },
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
        case 'required, minLength':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.minLength && errors.push('Minimum of 8 characters.')
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
        this.$store.dispatch('users/storeUser', {
          name: this.name,
          email: this.email,
          password: this.password,
          address: this.address,
          contact_no: this.contact_no,
          title: this.title,
          role: this.role,
        })
        this.reset
      }
    },

    reset() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.address = ''
      this.contact_no = ''
      this.title = ''
      this.role = ''
    },
  },
}
</script>

<style></style>
