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
        <v-icon> mdi-book-plus </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-book-plus</v-icon>
        Create Category</v-card-title
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
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      dialog: false,
      name: '',
    }
  },
  mixins: [validationMixin],

  validations: {
    name: { required },
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
        this.$store.dispatch('categories/storeCategory', {
          name: this.name,
        })
        this.reset
      }
    },

    reset() {
      this.$v.$reset()
      this.name = ''
    },
  },
}
</script>

<style></style>
