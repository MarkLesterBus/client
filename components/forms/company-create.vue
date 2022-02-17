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
        <v-icon> mdi-domain-plus </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        <v-icon class="mr-3" color="#69BF88">mdi-domain-plus</v-icon> Add
        Company</v-card-title
      >
      <v-card-text class="mt-5">
        <v-text-field
          label="Name"
          v-model="name"
          @blur="$v.name.$touch()"
          @input="$v.name.$touch()"
          :error-messages="validate('required', $v.name)"
          prepend-inner-icon="mdi-domain"
          color="#69BF88"
          outlined
          clearable
          dense
        >
        </v-text-field>
        <tiptap-vuetify
          class="my-3"
          placeholder="All about the company."
          v-model="description"
          :extensions="extensions"
        />

        <template #placeholder> Loading... </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#69BF88" text @click="submit()">
          <v-icon color="#69BF88" class="mr-2">mdi-send</v-icon>
          Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, url } from 'vuelidate/lib/validators'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
export default {
  data() {
    return {
      name: '',
      description: `
      <h1>All about the Company </h1>
      <p>All these <strong>cool tags</strong> are working now.</p>`,
      dialog: false,
      // declare extensions you want to use
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      // starting editor's content
    }
  },
  mixins: [validationMixin],
  validations: {
    name: { required },
    description: { required },
    // yr_established: { required },
    // population: { required },
    website: { required, url },
  },
  components: {
    TiptapVuetify,
  },
  methods: {
    validate(rules, v) {
      const errors = []
      switch (rules) {
        case 'required':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          return errors
        case 'required, url':
          if (!v.$dirty) return errors
          !v.required && errors.push('This field is required!')
          !v.url && errors.push('Must be a valid url.')
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
            message: 'Please fill in the necessary fields before submitting.',
            status: 'WARNING',
            timeout: 5000,
            visible: true,
          },
          { root: true }
        )
      } else {
        this.$store.dispatch('companies/storeCompany', {
          name: this.name,
          description: this.description,
          // yr_established: this.yr_established,
          // population: this.population,
          website: this.website,
        })
        this.reset()
      }
    },
    reset() {
      this.dialog = false
      this.$v.$reset()
      this.name = ''
      this.description = ''
    },
  },
}
</script>
